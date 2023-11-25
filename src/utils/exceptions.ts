import { NextResponse } from "next/server";
import {
  INTERNAL_SERVER_ERROR_MESSAGE,
  INTERNAL_SERVER_ERROR_NAME,
  INTERNAL_SERVER_ERROR_STATUS,
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

export const commonErrorHandler = (error: unknown) => {
  if (error instanceof ValidationError) {
    return NextResponse.json(
      { name: error.name, message: error.message },
      { status: error.status },
    );
  } else {
    return NextResponse.json(
      {
        name: INTERNAL_SERVER_ERROR_NAME,
        message: INTERNAL_SERVER_ERROR_MESSAGE,
      },
      { status: INTERNAL_SERVER_ERROR_STATUS },
    );
  }
};
