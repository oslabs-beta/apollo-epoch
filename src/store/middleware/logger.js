import { LOG, ERROR } from '../messagesAndActionTypes/loggerActions';

const logger = (store) => (next) => (action) => {
  console.log('Action Type', action.type);
  // Error actions should have a payload of shape:
  // { title: Where Error From, message: Error Message, error: Error Object}
  if (action.type === ERROR) {
    const { title, message, error } = action.payload;
    return console.log(title, message, error);
  }

  // All Log payloads should be in shape:
  // {title: Title to be Displayed Data: Data to log}
  if (action.type === LOG) {
    const { title, data } = action.payload;
    return console.log(title, data);
  }

  return next(action);
};

export default logger;
