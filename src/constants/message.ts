export const enum ErrorMessage {
    nonExistEndpoint = 'Endpoint does not exist',
    nonExistUuid = 'uuid does not exist',
    serverError = 'An unexpected error has occurred. Please try again later.',
    nonExistUser = 'User does not exist',
    nonExistRequiredFields = 'Request body does not contain required fields',
    methodNotSupported = 'Method not supported by API'
}

export const enum code {
    ok = 200,
    created = 201,
    noContent = 204,
    badRequest = 400,
    notFound = 404,
    internalServerError = 500
}