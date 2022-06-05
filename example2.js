//var bizagiUtil = require('bz-util');
//var REQUIRED = bizagiUtil.REQUIRED;
//var ERROR = bizagiUtil.error;
//var RESPONSE = bizagiUtil.getResponse;

const bzApiMng = require('./bzApiMng');
 
/**
 * @author German Gomez
 */ 

async function invoke(globals, actionName, data, authenticationType, LOG, callback) 
{
    const ClientID = "123";
    const SecretID = "876";

    const bzApi = new bzApiMng(ClientID, SecretID);
    const tk = await bzApi.bzToken();
    //const tk = await bzApiMng.GetToken();
    console.log("Respuesta: " + tk);

    /*

    if (InTMP == 1)
    {
        var output = { resInfo: tk };
        var success = RESPONSE(output, null, 200);
        callback(success);
    }
    else
    {
        var errorOutput = { error: 'Error response 2GJ.'}
        var error = RESPONSE(null, errorOutput, 404, errorOutput.error);
        callback(error);
    }
    */
}

exports.invoke = invoke;

invoke();