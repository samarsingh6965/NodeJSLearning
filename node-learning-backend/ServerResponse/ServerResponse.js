class ServerResponseHandler {
    // success
    handleSuccess(res, message, data) {
        return res.status(200).json({
            success: true,
            data: data,
            message: message ? message : 'Request Successful'
        });
    }

    // not found
    handleNotFound(res, message) {
        return res.status(404).json({
            success: false,
            error: {
                message: message ? message : 'Resource not found.',
            },
        });
    }

    // something went wrong
    somethingWentWrong(res, message) {
        return res.status(500).json({
            success: false,
            error: {
                message: message ? message : 'Something Went Wrong.',
            },
        });
    }
    // bad request
    badRequest(res, message) {
        return res.status(400).json({
            success: false,
            error: {
                message: message ? message : 'Bad Request',
            },
        });
    }

    // unAuthorized
    unAuthorized(res, message) {
        return res.status(401).json({
            success: false,
            error: {
                message: message ? message : 'Token Not Found',
            },
        });
    }
}

module.exports = ServerResponseHandler;
