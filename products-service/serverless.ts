import type { AWS } from '@serverless/typescript';

import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });

import getProductsList from '@functions/getProductsList';
import getProductById from '@functions/getProductById';
import createProduct from '@functions/createProduct';

const serverlessConfiguration: AWS = {
  service: 'products-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  // plugins: ['serverless-webpack', 'serverless-offline'],
  useDotenv: true,
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: 'dev',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      TABLE_NAME_PRODUCT: process.env.TABLE_NAME_PRODUCT,
      TABLE_NAME_STOCK: process.env.TABLE_NAME_STOCK,
    },
  },
  // import the function via paths
  functions: { getProductsList, getProductById, createProduct },
  package: { individually: true },
  custom: {
    // webpack: {
    //   excludeFiles: ['**/*.spec.ts'],
    // },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
