const express = require("express");
const app = express();
const port = 4000;
const axios = require("axios").default;
require("dotenv").config();

// Base URL that you can hit to see if the server is up.
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Get the image topics to be displayed in the menu.
app.get("/image-topics", (req, res) => {
  // This would change in a production environment.
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");

  axios
    .get(`https://api.unsplash.com/topics`, {
      headers: {
        Authorization: `Client-ID ${process.env.ACCESS_KEY}`,
        "Accept-Version": "v1",
      },
    })
    .then(function (response) {
      // Reduce the size of the object to send to the front end.
      let filteredTopicObject = response.data.map((topic) => {
        return { title: topic.title, slug: topic.slug };
      });

      res.send({ code: 200, data: filteredTopicObject });
    })
    .catch(function (error) {
      // Catch the error
      res.send({ code: error.code, message: error.message });
    });
});

// Get the images for a particular topic.
// Takes in 'topic' as a parameter which is the 'slug' from the result of the /image-topics request.
app.get("/images-in-topic", (req, res) => {
  // This would change in a production environment.
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  const topic = req.query.topic;

  axios
    .get(`https://api.unsplash.com/topics/${topic}/photos`, {
      headers: {
        Authorization: `Client-ID ${process.env.ACCESS_KEY}`,
        "Accept-Version": "v1",
      },
      params: { page: 1, per_page: 20 },
    })
    .then(function (response) {
      let filteredImagesObject = response.data.map((image) => {
        return {
          color: image.color,
          url: image.urls.regular,
          blurHash: image.blur_hash,
          description: image.description,
          id: image.id
        };
      });
      res.send({ code: 200, data: filteredImagesObject });
    })
    .catch(function (error) {
      res.send({ code: error.code, message: error.message });
    });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
