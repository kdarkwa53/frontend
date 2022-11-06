import { Alert, Button, notification } from "antd";
import { ERROR_ALERT, ERROR_NOTIFICATION, SUCCESS_NOTIFICATION } from "./types";

export const showErrorNotification = (title, description, position, width, button) => {
  return (dispatch) => {
    dispatch({ type: ERROR_NOTIFICATION });
    notification.error({
      message: title,
      description,
      btn: button,
      placement: position,
      style: width ? {
        width: 600,
      }: "",
    });
  };
};

export const showSuccessNotification = (title, description, position, width, button) => {
  return (dispatch) => {
    dispatch({ type: SUCCESS_NOTIFICATION });
    notification.success({
      message: title,
      description,
      btn: button,
      placement: position, 
      style: width ? {
        width: 600,
      } : "",
    });
  };
};

export const showErrorAlert = (title, description) => {
  return (dispatch) => {
    dispatch({ type: ERROR_ALERT });
    
    notification.open({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      className: 'custom-class',
      style: {
        width: 600,
      },
    });
  };
};


