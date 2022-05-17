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
import Dashboard from "views/Dashboard.js";
import CarDatabase from "views/CarDatabase.js";
import UploadCarDatabase from "views/UploadCarDatabase.js";
import UserDatabase from "views/UserDatabase.js";
// import Icons from "views/Icons.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/upload-car-database",
    name: "Upload Car Database",
    icon: "tim-icons icon-bus-front-12",
    component: UploadCarDatabase,
    layout: "/admin"
  },
  {
    path: "/car-database",
    name: "Car Database",
    icon: "tim-icons icon-bus-front-12",
    component: CarDatabase,
    layout: "/admin"
  },
  {
    path: "/user-database",
    name: "User Database",
    icon: "tim-icons icon-single-02",
    component: UserDatabase,
    layout: "/admin"
  },
  // {
  //   path: "/icon",
  //   name: "Icons",
  //   icon: "tim-icons icon-chart-pie-36",
  //   component: Icons,
  //   layout: "/admin"
  // },
];
export default routes;
