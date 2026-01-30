import React, { useEffect, useState } from "react";

const Toast = ({ toastConfig }) => {
  const [toast, setToastMessage] = useState(toastConfig.message);

  useEffect(() => {
    if (!toastConfig) return;

    setToastMessage(toastConfig.message);

    const timer = setTimeout(() => {
      setToastMessage(null);
    }, toastConfig.duration || 2000);

    return () => clearTimeout(timer);
  }, [toastConfig]);

  return (
    toast && (
      <>
        <div className={`toast toast-center toast-bottom z-50 mx-auto mb-50`}>
          <div
            className={`alert  ${toastConfig.type === "error" ? "alert-error" : "alert-success"}`}
          >
            <span>{toast}</span>
          </div>
        </div>
      </>
    )
  );
};

export default Toast;
