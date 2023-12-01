import pino from "pino";

const logger = pino({
  level:
    process.env.NODE_ENV === "test"
      ? "silent"
      : process.env.NODE_ENV === "development"
      ? "debug"
      : "info",
  messageKey: "message",
  errorKey: "error",
  formatters: {
    level(label) {
      return { severity: label.toUpperCase() };
    },
  },
  base: null,
  transport:
    process.env.NODE_ENV !== "production"
      ? { target: "pino-pretty", options: { colorize: true } }
      : undefined,
});

export const handleErrorLogging = (status: number, error: unknown) => {
  status < 500 ? logger.warn(error) : logger.error(error);
};

export default logger;
