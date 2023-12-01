import { NextResponse } from "next/server";
import {
  INTERNAL_SERVER_ERROR_MESSAGE,
  INTERNAL_SERVER_ERROR_NAME,
  INTERNAL_SERVER_ERROR_STATUS,
  NOT_FOUND_ERROR_MESSAGE,
  NOT_FOUND_ERROR_NAME,
  NOT_FOUND_ERROR_STATUS,
  VALIDATION_ERROR_NAME,
  VALIDATION_ERROR_STATUS,
} from "@/constants/exceptions";

export class ServerComponentError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class ValidationError extends Error {
  status: number;
  constructor(message: string) {
    super(message);
    this.name = VALIDATION_ERROR_NAME;
    this.status = VALIDATION_ERROR_STATUS;
  }
}

export class NotFoundError extends Error {
  status: number;
  constructor() {
    super(NOT_FOUND_ERROR_MESSAGE);
    this.name = NOT_FOUND_ERROR_NAME;
    this.status = NOT_FOUND_ERROR_STATUS;
  }
}

export const adjustErrorResponse = (error: unknown) => {
  let name: string, message: string, status: number;
  if (error instanceof ValidationError || error instanceof NotFoundError) {
    name = error.name;
    message = error.message;
    status = error.status;
  } else if (error instanceof Error) {
    name = error.name;
    message = error.message;
    status = INTERNAL_SERVER_ERROR_STATUS;
  } else {
    name = INTERNAL_SERVER_ERROR_NAME;
    message = INTERNAL_SERVER_ERROR_MESSAGE;
    status = INTERNAL_SERVER_ERROR_STATUS;
  }
  return { name, message, status };
};
