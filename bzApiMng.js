const axios = require('axios');
const response = require('./utils/response');

class BzApiMng 
{
  constructor (URLBase, IDClient, IDSecret) {
    this.URLBase = URLBase;
    this.ClienteID = IDClient;
    this.SecretID = IDSecret;
    this.Encode = "basic " + Buffer.from(this.ClienteID + ":" + this.SecretID, 'utf8').toString('base64');
    this.token = null; 
  }
  
  async bzToken()
  {
    try {
      const resAxi = await axios({
        url: this.URLBase + "/oauth2/server/token",
        method: 'post',
        timeout: 10000,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': this.Encode
        },
        data: 'grant_type=client_credentials&scope=api'
      });
  
      if (resAxi.status != 200) {
        return response.error(resAxi.AxiosError, resAxi.status, null);
      }else{
        if (resAxi.data.http_status_code != 200) {
          return response.error(resAxi.data.error, resAxi.data.http_status_code, resAxi.data.error_description);
        }else{
          this.token = resAxi.data;
          return resAxi.data;
        }
      }
    } catch (error) {
      console.log("ERROR TRY");
      return response.error('Internal Service Error!!!', error.response.status, error);
    }
  }
}

module.exports = BzApiMng;