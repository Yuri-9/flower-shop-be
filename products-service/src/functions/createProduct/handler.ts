import { errorResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { successResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import ProductService from '@service/product';

export const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    if (!event.body) {
      return errorResponse({ statusCode: 400, message: 'Missing body' });
    }

    const product = event.body;

    if (!ProductService.isValidProduct(product))
      return errorResponse({
        statusCode: 403,
        message: 'Missing some property (id: string, title: string, description: string, price: number, count: number)',
      });

    await ProductService.putProductToDB(product);

    return successResponse<any>(`Product ${product?.id} successful created`);
  } catch (err) {
    return errorResponse(err);
  }
};

export const main = middyfy(createProduct);
