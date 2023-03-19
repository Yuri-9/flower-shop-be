import ProductService from '@service/product';
import AWS from 'aws-sdk';
import { REGION } from '@constants/index';

export const catalogBatchProcess = async (event) => {
  const sns = new AWS.SNS({ region: REGION });

  console.log(' --event:', JSON.stringify(event));
  try {
    const products = event.Records || [];

    const productsValid = products
      .map(({ body }) => JSON.parse(body))
      .filter((product) => ProductService.isValidProduct(product));

    for await (const product of productsValid) {
      await ProductService.putProductToDB(product);
    }

    sns.publish(
      {
        Subject: 'SNS reports that the products have been created successfully ',
        Message: JSON.stringify(productsValid),
        TopicArn: process.env.SNS_ARN,
      },
      (error, data) => {
        if (error) {
          console.log('SNS error', error);
        } else {
          console.log('SNS sent email: ', data);
        }
      }
    );
  } catch (err) {
    console.log('catalogBatchProcess: error', err);
  }
};

export const main = catalogBatchProcess;
