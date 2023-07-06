const fetch = require("node-fetch");

const USER_ID = "terence_cws";
// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = process.env.PAT;
const APP_ID = "fra";
const MODEL_ID = "face-detection";

const makeApiCall = async (req, res) => {
  const { imageLink } = req.body;
  // Change this to whatever image URL you want to process
  const IMAGE_URL = imageLink;

  ///////////////////////////////////////////////////////////////////////////////////
  // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
  ///////////////////////////////////////////////////////////////////////////////////
  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
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

  try {
    const clarifaiResponse = await fetch(
      "https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs",
      requestOptions
    );
    const clarifaiData = await clarifaiResponse.json();
    const facePositionArray = clarifaiData.outputs[0].data.regions;
    // console.log(data.outputs[0].data.regions)
    res.json(facePositionArray);
  } catch (err) {
    console.log(err);
    res.status(400).json("Could not connect to Clarifai");
  }
};

module.exports = {
  makeApiCall,
};
