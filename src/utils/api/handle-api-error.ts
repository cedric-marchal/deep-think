import { NextResponse } from "next/server";
import { ZodError, type ZodIssue } from "zod";

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ForbiddenError";
  }
}

export class ConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConflictError";
  }
}

export class TooManyRequestsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TooManyRequestsError";
  }
}

export class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BadRequestError";
  }
}

export function handleApiError(error: unknown): NextResponse {
  // 400 Bad Request
  if (error instanceof ZodError) {
    return new NextResponse(
      JSON.stringify({
        type: "ValidationError",
        errors: error.errors.reverse().map((err: ZodIssue) => err.message),
      }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  // 400 Bad Request
  if (error instanceof BadRequestError) {
    return new NextResponse(
      JSON.stringify({ type: "BadRequestError", message: error.message }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  // 401 Unauthorized
  if (error instanceof UnauthorizedError) {
    return new NextResponse(
      JSON.stringify({ type: "UnauthorizedError", message: error.message }),
      { status: 401, headers: { "Content-Type": "application/json" } },
    );
  }

  // 403 Forbidden
  if (error instanceof ForbiddenError) {
    return new NextResponse(
      JSON.stringify({ type: "ForbiddenError", message: error.message }),
      { status: 403, headers: { "Content-Type": "application/json" } },
    );
  }

  // 404 Not Found
  if (error instanceof NotFoundError) {
    return new NextResponse(
      JSON.stringify({ type: "NotFoundError", message: error.message }),
      { status: 404, headers: { "Content-Type": "application/json" } },
    );
  }

  // 409 Conflict
  if (error instanceof ConflictError) {
    return new NextResponse(
      JSON.stringify({ type: "ConflictError", message: error.message }),
      { status: 409, headers: { "Content-Type": "application/json" } },
    );
  }

  // 429 Too Many Requests
  if (error instanceof TooManyRequestsError) {
    return new NextResponse(
      JSON.stringify({ type: "TooManyRequestsError", message: error.message }),
      { status: 429, headers: { "Content-Type": "application/json" } },
    );
  }

  // 500 Server Error
  if (error instanceof Error) {
    return new NextResponse(
      JSON.stringify({
        type: "ServerError",
        message: error.message,
        ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  // 500 Server Error
  return new NextResponse(
    JSON.stringify({
      type: "UnknownError",
      message: "An unexpected error occurred",
    }),
    { status: 500, headers: { "Content-Type": "application/json" } },
  );
}
