// ログメッセージのプレフィックス
const LOG_PREFIX = "[Google Calendar Event Copy Extension]";

const logError = (message, error) => {
  if (error) {
    console.error(`${LOG_PREFIX} ${message}`, error);
  } else {
    console.error(`${LOG_PREFIX} ${message}`);
  }
};

const logInfo = (message) => console.log(`${LOG_PREFIX} ${message}`);
