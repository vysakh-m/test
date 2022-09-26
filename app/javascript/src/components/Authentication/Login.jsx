import React from "react";

import authApi from "apis/auth";
import { setAuthHeaders } from "apis/axios";
import LoginForm from "components/Authentication/Form/LoginForm";
import { setToLocalStorage } from "helpers/storage";

import Container from "../Container";

const Login = () => {
  const handleSubmit = async values => {
    try {
      const { data } = await authApi.login({ login: values });
      setToLocalStorage({
        authToken: data.authentication_token,
        authEmail: values.email,
        authUserId: data.id,
        authUserName: `${data.first_name} ${data.last_name}`,
      });
      setAuthHeaders();
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Container>
      <LoginForm handleSubmit={handleSubmit} />;
    </Container>
  );
};

export default Login;
