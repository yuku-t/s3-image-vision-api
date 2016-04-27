# s3-image-vision-api

Check images uploaded to AWS S3 with Google Vision API then publish a specified AWS SNS topic.

## Config

Create `config.json` as:

```js
{
  "API_KEY": "YourGoogleApiKey",
  "TOPIC_ARN": "arn:aws:sns:REGION:ID:TOPIC_NAME",
  "FEATURES": [
    ["FACE_DETECTION", 10],
    ["LANDMARK_DETECTION", 10],
    ["LOGO_DETECTION", 10],
    ["LABEL_DETECTION", 10],
    ["TEXT_DETECTION", 10],
    ["SAFE_SEARCH_DETECTION", 1]
  ]
}
```

`FEATURES` are an array of Vision API features you need. For instance, if you need SAFE_SEARCH_DETECTION feature only:

```js
{
  "API_KEY": "YourGoogleApiKey",
  "TOPIC_ARN": "arn:aws:sns:REGION:ID:TOPIC_NAME",
  "FEATURES": [
    ["SAFE_SEARCH_DETECTION", 1]
  ]
}
```

## Build

```
npm run build
```

It creates pkg/s3-image-vision-api.zip

## Upload

Currently, this repository does not provide uploading feature. Please use aws cli or Web console.
Then attach s3 put event source to the uploaded lambda function.
In addition, you must attach a role which can access S3 and SNS.
