import React from "react";

import { Typography } from "neetoui";
import { Header } from "neetoui/layouts";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { resetAuthTokens } from "src/apis/axios";

import authApi from "apis/auth";
import { getFromLocalStorage } from "helpers/storage";

import NavItem from "./NavItem";

const NavBar = () => {
  const userName = getFromLocalStorage("authUserName");
  const { slug } = useParams();
  const handleLogout = async () => {
    try {
      await authApi.logout();
      localStorage.clear();
      resetAuthTokens();
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
    }
  };
  return (
    <div className="px-10 shadow-md">
      <Header
        actionBlock={
          userName &&
          !slug && (
            <div className="flex space-x-8 ">
              <Link to="/reports">
                <NavItem name="Reports" />
              </Link>
              <Typography style="h5">{userName}</Typography>
              <NavItem name="Logout" onClick={handleLogout} />
            </div>
          )
        }
        title={
          <Link to="/">
            <Typography style="h2">Quizzy</Typography>
          </Link>
        }
      />
    </div>
  );
};

export default NavBar;
