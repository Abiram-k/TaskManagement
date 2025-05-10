import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ProtectLogin = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
            toast.warning("Not token founded")

      navigate("/auth/login"); 
    }
  }, [token, navigate]);

  return <>{token && children}</>;
};

export default ProtectLogin;
