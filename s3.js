const AWS = require("aws-sdk");
require("dotenv").config();

// Configure AWS SDK (replace with your own credentials from the AWS console)
// These credentials expire after approx 6 hours, so you will need to refresh them
// It is recommended to put these credentials in an env file and use process.env to retrieve them
// On EC2, you can assign the ec2SSMCab432 IAM role to the instance and the SDK will automatically retrieve the credentials. This will also work from inside a Docker container.
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sessionToken: process.env.AWS_SESSION_TOKEN,
  region: "ap-southeast-2",
});

// Create an S3 client
const s3 = new AWS.S3();

// Specify the S3 bucket and object key
const bucketName = "10578919-counter";
const objectKey = "text.json";

// JSON data to be written to S3
// const jsonData = {
//   count: 0,
// };

async function createS3bucket() {
  try {
    await s3.createBucket({ Bucket: bucketName }).promise();
    console.log(`Created bucket: ${bucketName}`);
  } catch (err) {
    if (err.statusCode === 409) {
      console.log(`Bucket already exists: ${bucketName}`);
    } else {
      console.log(`Error creating bucket: ${err}`);
    }
  }
}

// Upload the JSON data to S3
async function uploadJsonToS3(jsonData) {
  const params = {
    Bucket: bucketName,
    Key: objectKey,
    Body: JSON.stringify(jsonData), // Convert JSON to string
    ContentType: "application/json", // Set content type
  };

  try {
    await s3.putObject(params).promise();
    console.log("JSON file uploaded successfully.");
  } catch (err) {
    console.error("Error uploading JSON file:", err);
  }
}

// Retrieve the object from S3
async function getObjectFromS3() {
  const params = {
    Bucket: bucketName,
    Key: objectKey,
  };

  try {
    const data = await s3.getObject(params).promise();
    // Parse JSON content
    const parsedData = JSON.parse(data.Body.toString("utf-8"));
    console.log("Parsed JSON data:", parsedData);
    return parsedData;
  } catch (err) {
    console.error("Error:", err);
  }
}

async function getVisitCount() {
  const data = await getObjectFromS3();
  return data.count;
}

async function incrementVisitCount() {
  // If the object does not exist, create it and upload to S3
  let currentCount;
  try {
    currentCount = await getVisitCount();
  } catch (err) {
    console.log("Object does not exist, creating it...");
    const jsonData = {
      count: 0,
    };
    await uploadJsonToS3(jsonData);
    currentCount = 0;
  }
  const newCount = currentCount + 1;
  console.log(`New count: ${newCount}`);
  const jsonData = {
    count: newCount,
  };
  await uploadJsonToS3(jsonData);
  return newCount;
}

module.exports = {
  getVisitCount,
  incrementVisitCount,
  createS3bucket,
};
