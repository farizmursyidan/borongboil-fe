/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.js";
import RTLLayout from "layouts/RTL/RTL.js";
import Login from "views/Login.js";
import LandingPage from "views/Landing.jsx";

import "assets/scss/black-dashboard-react.scss";
// import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";

import { getWithExpiry } from "helper/asyncFunction";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>

      <Route exact path="/rtl" render={props => <RTLLayout {...props} />} />
      <Route exact path="/login" render={props => <Login {...props} />} />
      <Route exact path="/" render={props => <LandingPage {...props} />} />
      {getWithExpiry('login_status') === null && (
        <Redirect from="/admin" to="/login" />
      )}
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
