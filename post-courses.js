'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB();

exports.handler = (event, context, callback) => {
    
    const bdy = event.BODY;
    
    const info = bdy.split('&');
    
    const usr = info[0].split('=');
    const username = decodeURIComponent(usr[1]);
    
    const crs = info[1].split('=');
    const course = crs[1];
    
  const params = {
    
    TableName: '********',
    Key: {
      "username": {
         S : username
        }
    },    
    AttributeUpdates:{
        "courses":{
            "Action": "ADD",
            "Value": {
                SS : [course]
            }
        }
    },
    ReturnValues: 'ALL_NEW'
  };

    dynamoDb.updateItem(params, (error,result) => {
    if (error) {
      context.done(error);
    }
    const response = {
      statuscode: 200,
      body: JSON.stringify(result)
    };
    context.done(null, response);
  });
};