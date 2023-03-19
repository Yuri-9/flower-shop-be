import ProductService from '@service/product';
import AWS from 'aws-sdk';
import { REGION } from '@constants/index';

export const catalogBatchProcess = async (event) => {
  const sns = new AWS.SNS({ region: REGION });

  console.log(' --event:', JSON.stringify(event));
  try {
    const records = event.Records || [];

    const productsValid = records
      .map(({ body }) => JSON.parse(body))
      .filter((product) => ProductService.isValidProduct(product));

    for await (const product of productsValid) {
      await ProductService.putProductToDB(product);
    }

    const hasRose = productsValid.some(({ title }) => title === 'Rose');

    await sns
      .publish({
        Subject: 'SNS reports that the products have been created successfully ',
        Message: JSON.stringify(productsValid),
        MessageAttributes: {
          title: {
            DataType: 'String',
            StringValue: hasRose ? 'Rose' : 'Lily',
          },
        },
        TopicArn: process.env.SNS_ARN,
      })
      .promise();
  } catch (err) {
    console.log('catalogBatchProcess: error', err);
  }
};

export const main = catalogBatchProcess;
