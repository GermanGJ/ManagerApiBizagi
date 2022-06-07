//var bizagiUtil = require('bz-util');
//var REQUIRED = bizagiUtil.REQUIRED;
//var ERROR = bizagiUtil.error;
//var RESPONSE = bizagiUtil.getResponse;

const bzApiMng = require('../bzApiMng');
 
/**
 * @author German Gomez
 */ 

async function invoke(globals, actionName, data, authenticationType, LOG, callback) 
{
    //const BaseURL = "https://dev-support-bizagi.bizagi.com/";
    //const ClientID = "90a8d5cd5c103ca72785e6954929b8be0fb989b4476e4e2a487ec3d0f7f618ef";
    //const SecretID = "75f36b1bcba55f5750aa2b2a231b816fd6521bd99d2cfe1b76c29bac1b9813db";
    
    const BaseURL = "https://dev-oolab-bizagiplatform.bizagi.com/";
    const ClientID = "90f9aad444bb6f6b9e359c18d142b401d0ea6b131a0120391b4c36cc51b4bac1";
    const SecretID = "cc1064dbcda49ad2e01de2dba6bf2b65de3a8a984a1c60e0c89a70225332468e";

    const IDCase = 14002;
    const TaskName = "ApprovalManager";

    const objA = {xpath: "Nombre", value: "German"};
    const objB = {xpath: "Apellido", value: "Gomez"};

    const TestJS = [objA, objB];


    if (TestJS.length > 0)
    {
      for(let obj of TestJS)
      {
        console.log(obj.xpath); 
        console.log(obj.value);  
      }
    }

    var objeto = { "startParameters": TestJS};

    console.log(objeto);


    const bzParams = JSON.stringify({ "startParameters": [{
      "xpath": "M_CAT_APIBZ.IDM_APIBZ_NextTask.sDatoPruebaA",
      "value": "German VSC",
    }]});

    console.log(bzParams);

/*
    
    const bzApi = new bzApiMng(BaseURL, ClientID, SecretID);
    const tk = await bzApi.bzNextTask(IDCase, TaskName, bzParams);
    console.log("Respuesta tk ==> ");
    console.log(tk);
    
    var success = RESPONSE(tk, null, 200);
    callback(success);

  */

}

exports.invoke = invoke;

invoke();