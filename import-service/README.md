### Using NPM

- Run `npm i` to install the project dependencies
- Run `sls deploy` to deploy this stack to AWS
- Run `sls deploy function --function importProductsFile` to deploy this stack to AWS
- Run `sls deploy function --function importFileParser` to deploy this stack to AWS

### Usage deploy importProductsFile

for example:
https://1axgx2yhe8.execute-api.eu-west-1.amazonaws.com/dev/import?fileName=biostats3.csv

or check in FE deploy https://d2genrld4ab82i.cloudfront.net/admin/products

### Usage deploy importFileParser

parse file.scv, copy to s3 bucket folder: 'parsed' and delete this file from folder 'uploaded'

### Locally

In order to test the getProductsList function locally, run the following command:

- `sls invoke local -f importProductsFile --path src/functions/importProductsFile/mock.json` if you're using NPM

### Test

- Run `npm run test` to run test
