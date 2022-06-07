const axios = require('axios');
const response = require('./utils/response');
const responseAxios = require('./utils/responseAxios');


/*
METODOS BIZAGI.
*/
class BzApiMng 
{
  constructor (URLBase, IDClient, IDSecret) 
  {
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
        return await response.error(resAxi.AxiosError, resAxi.status, null);
      }else{
        if (resAxi.data.http_status_code != 200) {
          return await response.error(resAxi.data.error, resAxi.data.http_status_code, resAxi.data.error_description);
        }else{
          this.token = resAxi.data;
          return await response.success(resAxi.data, 200);
        }
      }
    } catch (error) {
      return await responseAxios.errorAxios(error);
    }
  }

  async bzGetWorkItems(IDCase)
  {
    try 
    {
      if (this.token == null)  
        await this.bzToken();
  
      const resAxi = await axios({
        url: this.URLBase + "/odata/data/cases(" + IDCase + ")/workitems",
        method: 'get',
        timeout: 10000,
        headers: {
          'Authorization': "Bearer " + this.token.access_token
        }
      });
  
      if (resAxi.status != 200)
      {
        return await response.error(resAxi.AxiosError, resAxi.status, null);
      }
      else
      {
        if (!resAxi.data)
        {
          return await response.success(resAxi.data, 201);
        }
        else
        {
          return await response.success(resAxi.data, 200);;
        }
      }
    } catch (error) {
      return await responseAxios.errorAxios(error);
    }
  }

  async bzNextWorkitem(IDCASE, IDWI, bzParams)
  {
    try {
      if (this.token == null)  
        await this.bzToken();


      const resAxi = await axios({
        url: this.URLBase + "/odata/data/cases(" + IDCASE + ")/workitems(" + IDWI + ")/next",
        method: 'post',
        timeout: 35000,
        headers: {
          'Authorization': "Bearer " + this.token.access_token,
          'Content-Type': 'application/json'
        },
        data: bzParams
      });
  
      if (resAxi.status != 200)
      {
        return await response.error(resAxi.AxiosError, resAxi.status, null);
      }
      else
      {
        if (resAxi.data)
        {
          return await response.success({ rIDCase: resAxi.data.value }, resAxi.status);
        }
        else
        {
          return await response.error('No information on next workite.', 500);
        }
      }
    } catch (error) {
      return await responseAxios.errorAxios(error);
    }
  }


/*
METODOS COMPLEMENTARIOS.
*/

  async bzGetWIforTaskName(IDCase, tskName)
  {
    try 
    {
      if (this.token == null)  
      {
        const ResTK = await this.bzToken();
        if (ResTK.status != 200)
          return ResTK;
      }

      const oWorkItems = await this.bzGetWorkItems(IDCase);

      if (oWorkItems.data.value.length > 0)
      {
        for(let task of oWorkItems.data.value)
        {
          if (task.taskName == tskName)
            return await response.success({ idWI: task.id }, 200);
        }
        return await response.error('No instance of this activity was found for the case.', 400);
      }
      else
      {
        return await response.error('No instance of this activity was found for the case.', 400);
      }
    } catch (error) {
      return await responseAxios.errorAxios(error);
    }
  }

  async bzNextTask(IDCase, TaskName, bzParams)
  {

    if (this.token == null)
    {
      const ResTK = await this.bzToken();
      if (ResTK.status != 200)
        return ResTK;
    }
    const IDWi = await this.bzGetWIforTaskName(IDCase,TaskName);

    if (IDWi.status == 200)
    {
      const resNextWI = await this.bzNextWorkitem(IDCase, IDWi.data.idWI, bzParams);
      return resNextWI;
    }
    else
    {
      return IDWi;
    }
  }
}

module.exports = BzApiMng;