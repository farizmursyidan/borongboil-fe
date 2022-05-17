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

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";

import { postDataToAPI, setWithExpiry } from "../helper/asyncFunction";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login_form: {}
    };
  }

  componentDidMount() {
    document.title = 'Login | Borongboil';
  }

  handleChangeForm = async (e) => {
    const name = e.target.name;
    let value = e.target.value;
    let login_form = this.state.login_form;
    login_form[name.toString()] = value;
    this.setState({ login_form: login_form }, () => console.log('login_form', this.state.login_form));
  }

  login = async () => {
    const dataLogin = this.state.login_form;
    const respondLogin = await postDataToAPI("/loginUser", dataLogin);

    if (respondLogin.data !== undefined && respondLogin.status >= 200 && respondLogin.status <= 300) {
      // localStorage.setItem('login_status', JSON.stringify(respondLogin));
      const oneDay = 1000 * 60 * 60 * 24;
      setWithExpiry('login_status', JSON.stringify(respondLogin.data), oneDay)
      window.location.replace('/admin/dashboard')
    }
  }

  render() {
    return (
      <>
        <Row style={{ margin: 0, marginTop: "10%" }} className="d-flex justify-content-center">
          <Col md="4">
            <Card>
              <CardHeader>
                <h5 className="title">Borongboil Login</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Username</label>
                        <Input
                          placeholder="Username"
                          type="text"
                          name="username"
                          value={this.state.login_form.username}
                          onChange={this.handleChangeForm}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Password</label>
                        <Input
                          placeholder="Password"
                          type="password"
                          name="password"
                          value={this.state.login_form.password}
                          onChange={this.handleChangeForm}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter className="d-flex justify-content-center">
                <Button className="btn-fill" color="primary" onClick={this.login}>
                  Login
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

export default Login;
