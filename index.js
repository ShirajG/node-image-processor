require('dotenv').config();
const Jimp = require('jimp');
const express = require('express')
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const app = express();
const port = 3000;
const bucketParams = {
  Bucket: "portfolio-images.shirajganguly.com",
}

app.get('/:size/:image_id', (req, res, next) =>{
  var imageHeight, imageWidth;
  switch (req.params.size) {
    case 'thumbnail':
      imageWidth = 200;
      imageHeight = 150;
      break;
    case 'full':
      imageWidth = 2000;
      imageHeight = 1500;
      break;
    default:
      imageWidth = 200;
      imageHeight = 150;
  }
  s3.getObject({...bucketParams, ...{Key: `${req.params.image_id}`}},(error, data) => {
    if(!error) {
      var imageData = Buffer.from(data.Body);
      Jimp.read(imageData).then(image => {
        image.cover(imageWidth, imageHeight)
             .getBufferAsync(Jimp.AUTO)
             .then((imageBuffer) => {
               res.write(imageBuffer);
               res.send();
             }).catch(err => next(err))
      }).catch(err => next(err));
    } else {
      next(error);
    }
  })
});
app.listen(port, () => console.log(`App listening on port ${port}!`));

