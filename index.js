'use strict';

const aws = require('aws-sdk');
const vision = require('node-cloud-vision-api');
const config = require('./config.json');
const s3 = new aws.S3();
const sns = new aws.SNS();

vision.init({ auth: config.API_KEY });

exports.handler = (event, context, callback) => {
  const record = event.Records[0];
  const bucket = record.s3.bucket.name;
  const objectKey = record.s3.object.key;
  const fullName = 's3://' + bucket + '/' + objectKey;

  s3.getSignedUrl('getObject', {
    Bucket: bucket,
    Key: objectKey,
    Expires: 60
  }, (err, url) => {
    if (err) {
      console.log('Error: s3.getSignedUrl', err);
    } else {
      let req = new vision.Request({
        image: new vision.Image({ url: url }),
        features: config.FEATURES.map(arr => new vision.Feature(arr[0], arr[1]))
      });
      vision.annotate(req).then(res => {
        sns.publish({
          Message: JSON.stringify(res),
          TopicArn: config.TOPIC_ARN
        }, (err, data) => {
          if (err) {
            console.log('Error: sns.publish', err);
          } else {
            console.log('Success');
          }
        });
      });
    }
  });
};
