import React, { useState } from "react";
import AuthForm from "../components/AuthForm";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthMode = () => {
    setIsLogin((current) => !current);
  };

  return (
    <div className="min-h-[calc(100vh-73px)] bg-slate-950 px-4 py-12 text-white">
      <div className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center">
        <div className="w-full">
          <AuthForm
            mode={isLogin ? "login" : "signup"}
            onToggleMode={toggleAuthMode}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
