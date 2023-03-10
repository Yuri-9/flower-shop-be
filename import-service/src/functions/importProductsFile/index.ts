import AWS from "aws-sdk";
const BUCKET = "import-service-flower";
import { middyfy } from "@libs/lambda";

const importProductsFileFunction = async function () {
  const s3 = new AWS.S3({ region: "eu-west-1" });
  let statusCode = 200;
  let body = {};
  let files = [];
  const params = {
    Bucket: BUCKET,
    Prefix: "files/",
  };

  try {
    const s3Response = await s3.listObjectsV2(params).promise();
    files = s3Response.Contents;
    body = JSON.stringify(
      files
        .filter((file) => file.Size)
        .map((file) => `https://${BUCKET}.s3.amazonaws.com/${file.Key}`)
    );
  } catch (error) {
    console.error("Error appears:");
    console.error(error);
    statusCode = 500;
    body = error;
  }

  return {
    statusCode,
    body,
    headers: { "Access-Control-Allow-Origin": "*" },
  };
};

export const importProductsFile = middyfy(importProductsFileFunction);
