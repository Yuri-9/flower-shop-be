import { getProductById } from "./handler";
import { productList } from '@model/data-product-list';
import { defaultHeaders } from "@libs/api-gateway";
import { Context } from "aws-lambda";

const getMockEvent = (pathParameters) => {
 return ({
    pathParameters,
    httpMethod: "GET",
    path: "products",
    headers: undefined,
    multiValueHeaders: undefined,
    isBase64Encoded: false,
    queryStringParameters: undefined,
    multiValueQueryStringParameters: undefined,
    stageVariables: undefined,
    requestContext: undefined,
    resource: "",
    body: undefined
  }) 
};


describe("getProductById", () => {
  test("should return a current product from list of products", async () => {
    const res = await getProductById(getMockEvent({ productId: "3bbeb93f-5c38-40b1-8c74-a5461efb7e23" }),  {} as Context, jest.fn());
    expect(res).toEqual({
      statusCode: 200,
      headers: {
        ...defaultHeaders,
      },
      body: JSON.stringify(productList[0]),
    });
  });
  test("should return a current product from list of products", async () => {
    const res = await getProductById(getMockEvent({ productId: "3" }),  {} as Context, jest.fn());
    expect(res).toEqual({
      statusCode: 403,
      headers: {
        ...defaultHeaders,
      },
      body: JSON.stringify( {message: `Product with id:${3} not founded`}),
    });
  });
});
