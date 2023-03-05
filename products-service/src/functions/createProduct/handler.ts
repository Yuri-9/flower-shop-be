import { errorResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { successResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { dataBase, getPutParams } from '@db/db';
import schema from './schema';

const { TABLE_NAME_PRODUCT, TABLE_NAME_STOCK } = process.env;

export const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    if (!event.body) {
      return errorResponse({ statusCode: 400, message: 'Missing body' });
    }

    const { id, title, description, price, count } = (event.body as any) || {};

    if (
      typeof id !== 'string' ||
      typeof title !== 'string' ||
      typeof description !== 'string' ||
      typeof price !== 'number' ||
      typeof count !== 'number'
    ) {
      return errorResponse({
        statusCode: 403,
        message:
          'Missing some property  (id: string,  title: string, description: string, price: number, count: number)',
      });
    }

    const productItem = { id, title, description, price };
    const stockItem = { product_id: id, count };

    await dataBase.put(getPutParams(TABLE_NAME_PRODUCT, productItem));
    await dataBase.put(getPutParams(TABLE_NAME_STOCK, stockItem));

    return successResponse<any>(`Product ${id} successful created`);
  } catch (err) {
    return errorResponse(err);
  }
};

export const main = middyfy(createProduct);
