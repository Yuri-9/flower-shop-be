import { getProductsList } from "./handler";
import {productList} from '@model/data-product-list';
import { defaultHeaders } from "@libs/api-gateway";
import { Context } from "aws-lambda";

describe("getProductsList", () => {
  test("should return a list of products", async () => {
    const res = await getProductsList({} as any,  {} as Context, jest.fn());     
    expect(res).toEqual({
      statusCode: 200,
      headers: {
        ...defaultHeaders,
      },
      body: JSON.stringify(productList),
    });
  });
});
