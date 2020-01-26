const video = document.getElementById('video')

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
  faceapi.nets.ageGenderNet.loadFromUri('/models')
]).then(startVideo)

async function getFaceMatcher() {
  const labeledFaceDescriptors = await loadLabeledImages()
  return new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
}

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

video.addEventListener('play', async () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  const faceMatcher = await getFaceMatcher()
  //This would put the canvas at the end of the page, but it doesn't matter because it is styled position absolute
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  //Repeat the drawing onto the video every 100 milliseconds
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video,
      new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks().withFaceExpressions().withFaceDescriptors().withAgeAndGender()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    //Clear the canvas so it can redraw itself
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    //Add the detections to the screen
    // Could draw face landmarks here
    // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    //Manually add gender age and person prediction
    resizedDetections.forEach((detection, i) => {
      const match = faceMatcher.findBestMatch(detection.descriptor)
      const box = resizedDetections[i].detection.box
      const drawBox = new faceapi.draw.DrawBox(box, {
        label: `${match} is a ${Math.round(detection.age)} year old ${detection.gender}`
      })
      drawBox.draw(canvas)
    })
  }, 1000)
})

function loadLabeledImages() {
  const labels = ['Black Widow', 'Captain America', 'Jim Rhodes', 'Thor', 'Tony Stark', 'James Taylor']
  return Promise.all(
    labels.map(async label => {
      const descriptions = []
      for (let i = 1; i <= 2; i++) {
        const img = await faceapi.fetchImage(`/labeled_images/${label}/${i}.jpg`)
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
        descriptions.push(detections.descriptor)
      }

      return new faceapi.LabeledFaceDescriptors(label, descriptions)
    })
  )
}