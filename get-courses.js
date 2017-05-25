'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {

const decoded_USERNAME = decodeURIComponent(event.USERNAME);
  const params = {
    TableName: '*********',
    Key: {
      username: decoded_USERNAME
    }
  };

  dynamoDb.get(params, (error,result) => {
    if (error) {
      callback(error);
    }
    const response = {
      statuscode: 200,
      body: JSON.stringify(result.Item)
    };
    callback(null, response);
  });
};
