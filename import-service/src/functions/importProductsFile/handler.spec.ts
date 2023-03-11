import { importProductsFileFunction as importProductsFile } from "./index";
import { defaultHeaders } from "@libs/api-gateway";
import AWS from "aws-sdk-mock";

AWS.mock("S3", "getSignedUrl", (_action, _params, callback) => {
  console.log("S3", "getSignedUrl", "mock called");
  callback(null, { test: "getSignedUrl" });
});

jest.mock("@constants/index");

const getMockEvent = (pathParameters) => {
  return {
    pathParameters,
    httpMethod: "GET",
    path: "import",
    headers: undefined,
    multiValueHeaders: undefined,
    isBase64Encoded: false,
    queryStringParameters: undefined,
    multiValueQueryStringParameters: undefined,
    stageVariables: undefined,
    requestContext: undefined,
    resource: "",
    body: undefined,
  };
};

describe("importProductsFile", () => {
  test("should be return body with url", async () => {
    const data = await importProductsFile({
      queryStringParameters: {
        fileName: "testFile.csv",
      },
    });
    expect(data).toEqual({
      statusCode: 200,
      headers: defaultHeaders,
      body: JSON.stringify({
        url: {},
      }),
    });
  });

  test("should be return a status code 403 and error message", async () => {
    const badParams = { name: "badParams.scv" };
    const event = getMockEvent(badParams);
    const response = await importProductsFile(event);

    expect(response).toEqual({
      statusCode: 403,
      headers: defaultHeaders,
      body: JSON.stringify({
        message: 'Missing query "fileName" in the path',
      }),
    });
  });
});
