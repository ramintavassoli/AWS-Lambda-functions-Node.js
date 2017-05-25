'use strict';

const awsServerlessExpress = require('aws-serverless-express');
const app = require('./stripe-app');
const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context, callback) => {
	console.log("EVENT: " + JSON.stringify(event));
	awsServerlessExpress.proxy(server, event, context);
};