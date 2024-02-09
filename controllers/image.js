const PAT = "5d21f67eb0b148358ea61ef676ee3c3e"; // Move your Clarifai PAT here
const USER_ID = "mxcrts_66"; // Your Clarifai User ID
const APP_ID = "test"; // Your Clarifai App ID

const handleApiCall = (req, res) => {
  const imageURL = req.body.imageURL;
  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: imageURL,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };

  fetch(
    "https://api.clarifai.com/v2/models/face-detection/outputs",
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => res.json(data))
    .catch((error) => console.log("error", error));
};

const handleImage = (db) => (req, res) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0].entries);
    })
    .catch((err) => res.status(400).json("Unable to get entries!"));
};

module.exports = {
  handleImage,
  handleApiCall,
};
