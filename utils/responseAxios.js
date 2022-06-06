const response = require('./response');

exports.errorAxios = async function (Error) 
{
    if ((Error != null) && (Error.Name = "AxiosError") && (Error.response != null) && (Error.response.data != null))
    {
        return await response.error(Error.response.data.status, Error.response.data.code, Error.response.data.message);
    }
    else
    {
        return await response.error('Internal Service Error!!!', 500, Error);
    }
}