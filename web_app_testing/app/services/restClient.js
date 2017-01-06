const axios = require('axios');
const restClient = {

  request: (options) => {
    return axios(options);
  }
  
};

module.exports = restClient;

