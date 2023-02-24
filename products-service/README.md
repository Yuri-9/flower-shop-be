### Using NPM

- Run `npm i` to install the project dependencies
- Run `sls deploy` to deploy this stack to AWS
- Run `sls deploy function --function getProductsList` to deploy this stack to AWS

### Locally

In order to test the hello function locally, run the following command:

- `sls invoke local -f getProductsList --path src/functions/getProductsList/mock.json` if you're using NPM

### Remotely

`https://m5lllv4o01.execute-api.eu-west-1.amazonaws.com/dev/products`
