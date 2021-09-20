import React from "react";
import Signup from "./features/auth/signup/Signup";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./features/auth/login/Login";
import PrivateRoute from "./features/layout/PrivateRoute";
import ForgotPassword from "./features/auth/forgotPassword/ForgotPassword";
import Home from "./features/home/Home";
import Layout from "./features/layout/Layout";
import Test from "./features/test/Test";
import MyData from "./features/mydata/MyData";
import GlucoseForm from "./features/dataForm/GlucoseForm";
import PersonalDataForm from "./features/dataForm/PersonalDataForm";
import ActivityFormData from "./features/dataForm/ActivityFormData";
import TestFormData from "./features/dataForm/TestFormData";
import Result from "./features/result/Result";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <Router>
        <AuthProvider>
          <Switch>
            <Layout>
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/" component={Home} />
              <Route exact path="/test" component={Test} />
              <Route exact path="/result" component={Result} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <PrivateRoute exact path="/my-data" component={MyData} />
              <PrivateRoute exact path="/data-form" component={GlucoseForm} />
              <PrivateRoute
                exact
                path="/update-personal-data"
                component={PersonalDataForm}
              />
              <PrivateRoute
                exact
                path="/smartwatch-data-form"
                component={ActivityFormData}
              />
              <PrivateRoute exact path="/test-form" component={TestFormData} />
            </Layout>
          </Switch>
        </AuthProvider>
      </Router>
    </React.Fragment>
  );
}

export default App;
