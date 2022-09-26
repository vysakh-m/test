import React, { useEffect, useState } from "react";

import { PageLoader } from "neetoui";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { registerIntercepts, setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";
import Login from "components/Authentication/Login";
import PrivateRoute from "components/Common/PrivateRoute";

import Dashboard from "./components/Dashboard";
import Public from "./components/Public";
import Attempt from "./components/Public/Attempt";
import Result from "./components/Public/Attempt/Result";
import Create from "./components/Quizzes/Create";
import Edit from "./components/Quizzes/Edit";
import Show from "./components/Quizzes/Show";
import Report from "./components/Report";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setIsLoading);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/public/:slug" component={Public} />
        <Route exact path="/public/:slug/attempt/new" component={Attempt} />
        <Route exact path="/public/:slug/attempt/result" component={Result} />
        <PrivateRoute exact path="/quizzes/create" component={Create} />
        <PrivateRoute exact path="/quizzes/:id/edit" component={Edit} />
        <PrivateRoute exact path="/quizzes/:id" component={Show} />
        <PrivateRoute exact path="/reports" component={Report} />
        <PrivateRoute exact path="/" component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default App;
