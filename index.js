//.const fs = require("fs");

import fs from "fs";

//const speech = require("@google-cloud/speech");

import speech from "@google-cloud/speech";

const client = new speech.SpeechClient();

const filename = "audio.flac";
const encoding = "FLAC";
const sampleRateHertz = 48000;
const languageCode = "en-US";

const request = {
  config: {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
    audioChannelCount: 1,
  },
  interimResults: false,
};

// Stream the audio to the Google Cloud Speech API
const recognizeStream = client
  .streamingRecognize(request)
  .on("error", console.error)
  .on("data", (data) => {
    console.log(`Transcription: ${data.results[0].alternatives[0].transcript}`);
  });

//create stream of audio and pipe to google for transcribe
fs.createReadStream(filename).pipe(recognizeStream);
