import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import csvParser from "csv-parser";
import { REGION } from "src/constants";
import { asStream } from "src/types";

export const importFileParser = async (event) => {
  const client = new S3Client({ region: REGION });

  console.log(" -- event", event);

  try {
    for await (const record of event.Records) {
      const { name } = record.s3.bucket;
      const { key } = record.s3.object;

      // Read file
      const response = await client.send(
        new GetObjectCommand({
          Bucket: name,
          Key: key,
        })
      );

      // Parsing records
      const stream = asStream(response).pipe(csvParser({}));

      for await (const record of stream) {
        console.log(" -- Product: ", record);
      }
    }
  } catch (err) {
    console.log(` -- Error importFileParser: ${err} `);
  }
};
