# Face recognition using Javascript
Uses [faceapi.js](https://github.com/justadudewhohacks/face-api.js/)

## To run
1. Install live-server: `npm install -g live-server`
2. Run live server from root of project: `live-server`

## To add more images
1. Add a new folder inside `labeled_images` folder.  Add two images labelled 1.jpg and 2.jpg to that folder of the person
2. Add the directory name to the `face_recognition.js` `loadLabeledImages()` function `labels` array.  The folder name is used as the onscreen label

## What's next?
Remake this with React