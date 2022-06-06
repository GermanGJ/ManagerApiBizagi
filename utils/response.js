exports.success = async function (message, status) 
{

    let OutStatus = status || 201;
    let OutMessage = message || 'Succesful.';
    
    const res = {
        status: OutStatus,
        error: '',
        data: OutMessage
    };

    return res;
}

exports.error = async function (message, status, details) 
{

    let OutStatus = status || 500;
    let OutMessage = message || 'Unidentified error.';
    let OutDetails = details || 'no details.';

    const res = {
        status: OutStatus,
        error: {
            error: OutMessage,
            errorDescription: OutDetails.toString()
        },
        data: ''
    };

    return res;
}