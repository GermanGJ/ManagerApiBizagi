//var bizagiUtil = require('bz-util');
//var REQUIRED = bizagiUtil.REQUIRED;
//var ERROR = bizagiUtil.error;
//var RESPONSE = bizagiUtil.getResponse;

const bzApiMng = require('./mngapibz/bzApiMng');
 
/**
 * @author German Gomez
 */ 

async function invoke(globals, actionName, data, authenticationType, LOG, callback) 
{
    const ClientID = "123";
    const SecretID = "876";

    const bzApi = new bzApiMng(ClientID, SecretID);

    const tk = await bzApi.bzToken();
    console.log("Respuesta: " + tk);
}

exports.invoke = invoke;

invoke();