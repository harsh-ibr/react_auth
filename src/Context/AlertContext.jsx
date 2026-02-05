import { createContext, useRef, useState, useMemo } from "react";

export const AlertContext = createContext();

export const AlertProvide = ({ children }) => {
  const [alert, setAlert] = useState({
    isShow: false,
    type: "danger",
    message: "Something went to wrong",
  });

  const timerRef = useRef(null);
  const callAlert = (isShow, type, message) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setAlert({ isShow, type, message });

    if (isShow) {
      timerRef.current = setTimeout(() => {
        setAlert((prev) => ({ ...prev, isShow: false }));
      }, 5000);
    }
  };

  const value = useMemo(() => ({ alert, callAlert }), [alert]);

  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
};
