import 'express-serve-static-core';

declare module 'express-serve-static-core' {
    interface Request {
        userId?: string | object;
    }
    interface Response {
        ok(data: object): Response;
        created(data: object): Response;
        noContent(): Response;
        badRequest(data: string | object): Response;
        unauthorized(data?: string): Response;
        forbidden(data?: string): Response;
        notFound(data?: string): Response;
        conflict(data?: string): Response;
        internalError(data?: string): Response;
        unknownEndpoint(): Response;
    }
}
