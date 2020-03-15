# Face recognition using Javascript
Uses [faceapi.js](https://github.com/justadudewhohacks/face-api.js/)

## To run
1. Install live-server: `npm install -g live-server`
2. Run live server from root of project: `live-server`

## To add more images
1. Add a new folder inside `labeled_images` folder.  Add two images labelled 1.jpg and 2.jpg to that folder of the person
2. Add the directory name to the `face_recognition.js` `loadLabeledImages()` function `labels` array.  The folder name is used as the onscreen label

## Running using raspberry pi
Attempted to run this on raspberry pi but when loading the images chromium would normally crash.  But the camera works fine connected to the pi.  Tried to update this to preload the image maps and arrays before hand but face-api does not provide a full json output of the image loading, so cannot preload it. See whats next section for the next plan as it works seamlessly on laptop but not always on pi

## What's next?
- Convert project to this: https://technodezi.co.za/Post/running-face-apijs-or-tfjs-node-on-a-raspberry-pi-and-nodejs and https://github.com/justadudewhohacks/face-api.js#face-api.js-for-nodejs
Just use the broswer for the camera but use node.js server side to load images and process recognition
- Add logic to perform some action when recognises someone. Maybe an IFTT command or a simple message on screen
- Don't display camera on screen but just use camera for recognition. Display gym busyness, countdown to something or weather to the screen
