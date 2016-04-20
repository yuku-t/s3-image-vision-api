'use strict';

const aws = require('aws-sdk');
const vision = require('node-cloud-vision-api');
const config = require('./config.json');
const s3 = new aws.S3();

vision.init({ auth: config.API_KEY });

exports.handler = (event, context, callback) => {
  const record = event.Records[0];

  s3.getSignedUrl('getObject', {
    Bucket: record.s3.bucket.name,
    Key: record.s3.object.key,
    Expires: 60
  }, (err, url) => {

    if (!err) {
      let req = new vision.Request({
        image: new vision.Image({ url: url }),
        features: [
          new vision.Feature('SAFE_SEARCH_DETECTION', 10)
        ]
      });
      vision.annotate(req).then(res => {
        console.log(JSON.stringify(res.responses));
      });
    }
  });
};
