import csvParser from 'csv-parser';
import { BUCKET_NAME, FolderName, REGION } from '@constants/index';
import s3ObjectService from 'src/services/s3ObjectService';
import AWS from 'aws-sdk';

export const importFileParser = async (event) => {
  const s3 = new AWS.S3({ region: REGION });
  const sqs = new AWS.SQS();

  console.log(' -- event.Records', JSON.stringify(event.Records));

  try {
    for await (const record of event.Records) {
      const { name } = record.s3.bucket;
      const { key }: { key: string } = record.s3.object;

      const s3Object = s3.getObject({
        Bucket: name,
        Key: key,
      });

      s3Object
        .createReadStream()
        .pipe(csvParser())
        .on('data', (product) => {
          console.log(' -- Product: ', JSON.stringify(product));
          sqs.sendMessage(
            {
              QueueUrl: process.env.SQS_URL,
              MessageBody: JSON.stringify(product),
            },
            (error, data) => {
              if (error) {
                console.log('error', error);
              } else {
                console.log('Send product to queue: ', data);
              }
            }
          );
        });

      await s3ObjectService.copyObject(s3, {
        bucketName: BUCKET_NAME,
        objectKey: key,
        prefixOld: FolderName.UPLOADED,
        prefixNew: FolderName.PARSED,
      });

      await s3ObjectService.deleteObject(s3, {
        bucketName: BUCKET_NAME,
        objectKey: key,
      });
    }
  } catch (err) {
    console.log(` -- Error importFileParser: ${err} `);
  }
};
