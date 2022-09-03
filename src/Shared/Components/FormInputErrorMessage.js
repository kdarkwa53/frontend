import React from "react";

const FormInputErrorMessage = ({ message }) => {
  return (
    <div class="ant-form-item-explain ant-form-item-explain-error">
      <div role="alert">{message}</div>
    </div>
  );
};

export default FormInputErrorMessage;
