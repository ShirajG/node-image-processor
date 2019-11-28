require('dotenv').config();
const thumbnailWidth = 200;
const thumbnailHeight = 150;
const Jimp = require('jimp');
const express = require('express')
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const app = express();
const port = 3000;
const bucketParams = {
  Bucket: "shirajganguly.com",
}

app.get('/thumbnail/:image_id', (req, res) =>{
  s3.getObject({...bucketParams, ...{Key: `images/${req.params.image_id}`}},(error, data) => {
    if(!error) {
      var imageData = Buffer.from(data.Body);
      Jimp.read(imageData)
          .then(image => {
              image.cover(thumbnailWidth, thumbnailHeight)
              .getBufferAsync(Jimp.AUTO)
              .then((imageBuffer) => {
                res.write(imageBuffer);
                res.send();
              })
          });
    } else {
      console.error(error);
    }
  })
});
app.listen(port, () => console.log(`App listening on port ${port}!`));

