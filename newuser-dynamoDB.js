'use strict';

const AWS = require('aws-sdk');
// const dynamoDb = new AWS.DynamoDB.DocumentClient();
const dynamoDb = new AWS.DynamoDB();

exports.handler = (event, context) => {
    
  const USERNAME = event.userName;
  const EMAIL = event.request.userAttributes.email;
  const course = "test";


  const params = {
    
    TableName: '*******',
    Key: {
      "username": {
         S : USERNAME
        }
    },    
    AttributeUpdates:{
        "email":{
            "Action": "PUT",
            "Value" : {
                S : EMAIL
            }
        },
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
        context.done(null, event);
      });
    };
