const { connectDB, disconnectDB } = require("./database");
const Review = require("./models/Review");
const Photo = require("./models/Photo");
const Characteristic = require("./models/Characteristic");

function populateReviewSchema2() {
  connectDB()
    .then(() => {
      const cursor = Review.find();

      function processNextReview() {
        cursor
          .hasNext()
          .then((hasNext) => {
            if (!hasNext) {
              return disconnectDB().then(() => console.log("Disconnected from MongoDB"));
            }

            cursor.next().then((review) => {
              Photo.find({ review_id: review.review_id })
                .toArray()
                .then((photos) => {
                  const photoArray = photos.map((photo) => ({
                    id: photo.id,
                    url: photo.url,
                  }));

                  Characteristic.find({ review_id: review.review_id })
                    .toArray()
                    .then((characteristics) => {
                      const characteristicsMap = {};
                      characteristics.forEach((char) => {
                        characteristicsMap[char.characteristic_name] = {
                          id: char.id,
                          value: char.value,
                        };
                      });

                      Review.updateOne(
                        { review_id: review.review_id },
                        {
                          $set: {
                            photos: photoArray,
                            characteristics: characteristicsMap,
                          },
                        }
                      ).then(() => processNextReview());
                    });
                });
            });
          })
          .catch((error) => handleError(error));
      }

      processNextReview();
    })
    .catch((error) => handleError(error));
}

function handleError(error) {
  console.error("An error occurred:", error);
  disconnectDB().then(() => console.log("Disconnected from MongoDB"));
}

populateReviewSchema2();
