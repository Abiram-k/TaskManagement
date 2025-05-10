import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectHome = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return <>{!token && children}</>;
};

export default ProtectHome;
