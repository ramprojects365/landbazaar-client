import React from "react";

interface ErrorType {
  message: string | undefined;
}

const ErrorMessage = ({ message }: ErrorType) => {
  return (
    <div style={{ color: "#d20023", textAlign: "start", fontSize: "14px" }}>
      {message}
    </div>
  );
};

export default ErrorMessage;
