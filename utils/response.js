exports.success = function (req, res, message, status) {
    res.status(status || 200).send({
        error: '',
        data: message
    });
}

exports.error = function (message, status, details) {

    let OutStatus = status || 500;
    let OutMessage = message || 'Unidentified error.';
    let OutDetails = details.toString() || 'no details.';

    res = {
        error: {
            status: OutStatus,
            error: OutMessage,
            errorDescription: OutDetails
        },
        data: ''
    };

    return res;
}