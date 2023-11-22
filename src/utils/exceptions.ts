import { NextResponse } from "next/server";
import { INTERNAL_SERVER_ERROR, VALIDATION_ERROR } from "@/constants/exceptions";

export class FetchError extends Error {
  status: number;
  name: string;
  message: string;
  constructor(status: number, name: string, message: string) {
    super(message);
    this.status = status;
    this.name = name;
    this.message = message;
  }
}

export class ValidationError extends Error {
  status: number;
  constructor(message: string) {
    super(message);
    this.name = VALIDATION_ERROR.name;
    this.status = VALIDATION_ERROR.status;
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
        name: INTERNAL_SERVER_ERROR.name,
        message: INTERNAL_SERVER_ERROR.message,
      },
      { status: INTERNAL_SERVER_ERROR.status },
    );
  }
};
