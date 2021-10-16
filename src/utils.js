require('dotenv').config();
const jwt = require('jsonwebtoken');


function getTokenPayload(token) {
  return jwt.verify(token, process.env.APP_SECRET);
}


// function getUserId(req, authToken) {

// takes in the HTTP request object and pulls out the authorization
// token. From the token use JWT to pull out user id
// req > authorization header > token > payload > userId
function getUserId(req) {
  if (req && req.headers.authorization) {
    const authHeader = req.headers.authorization;

    const token = authHeader.replace('Bearer ', '');

    if (!token) {
      throw new Error('No token found');
    }

    const { userId } = getTokenPayload(token);

    return userId;
  }

  // May need this later
  // else if (authToken) {
  //   const { userId } = getTokenPayload(authToken);

  //   return userId;
  // }

  // throw new Error('Not authenticated');
}

module.exports = {
  getUserId
};
