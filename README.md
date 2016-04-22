# s3-image-vision-api

Check images uploaded to AWS S3 with Google Vision API then publish a specified AWS SNS topic.

## Config

Create `config.json` as:

```
{
  "API_KEY": "YourGoogleApiKey",
  "TOPIC_ARN": "arn:aws:sns:REGION:ID:TOPIC_NAME"
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
