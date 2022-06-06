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
    const ClientID = "90f9aad444bb6f6b9e359c18d142b401d0ea6b131a0120391b4c36cc51b4bac1";
    const SecretID = "cc1064dbcda49ad2e01de2dba6bf2b65de3a8a984a1c60e0c89a70225332468e";
    const BaseURL = "https://dev-oolab-bizagiplatform.bizagi.com";
    const IDCase = 13312;
    const TaskName = "ApprovalManager";

    const bzApi = new bzApiMng(BaseURL, ClientID, SecretID);
    const tk = await bzApi.bzNextTask(IDCase, TaskName);
    console.log("Respuesta tk ==> ");
    console.log(tk);
    
    var success = RESPONSE(tk, null, 200);
    callback(success);
}

exports.invoke = invoke;

invoke();