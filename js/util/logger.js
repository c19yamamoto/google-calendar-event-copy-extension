// ログメッセージのプレフィックス
const LOG_PREFIX = "[Google Calendar Event Copy Extension]";

const logError = (message, error) =>
  error
    ? console.error(`${LOG_PREFIX} ${message}`, error)
    : console.error(`${LOG_PREFIX} ${message}`);

const logInfo = (message) => console.log(`${LOG_PREFIX} ${message}`);
