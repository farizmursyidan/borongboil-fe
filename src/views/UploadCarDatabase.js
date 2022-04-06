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
import React, { Component } from "react";
import NotificationAlert from "react-notification-alert";
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardFooter
} from "reactstrap";

import { ExcelRenderer } from "react-excel-renderer";
import { postDataToAPI } from "../helper/asyncFunction";

class UploadCarDatabase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowsXLS: []
    };
  }

  componentDidMount() {
    document.title = 'Upload Car Database | Borongboil';
  }

  notify = (place, type, message) => {
    let options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            {message}
          </div>
        </div>
      ),
      type: type,
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7
    };
    this.refs.notificationAlert.notificationAlert(options);
  };

  handleChangeForm = (e) => {
    const value = e.target.value;
    const index = e.target.name;
    let dataForm = this.state.input_form;
    dataForm[index] = value;
    this.setState({ input_form: dataForm }, () => console.log(this.state.input_form));
  };

  postCarDatabase = async () => {
    const BulkXLSX = this.state.rowsXLS;
    console.log('bulk', BulkXLSX)
    const respondPost = await postDataToAPI("/createCarDatabase", { data: BulkXLSX });
    if (respondPost.data !== undefined && respondPost.status >= 200 && respondPost.status <= 300) {
      this.notify('tc', 'success', 'Car database has been submitted!');
      setTimeout(function () {
        window.location.replace('/admin/dashboard');
      }, 1500);
    } else {
      this.notify('tc', 'danger', 'Failed to submit data!');
    }
  }

  fileHandlerMaterial = (event) => {
    let fileObj = event.target.files[0];
    if (fileObj !== undefined) {
      ExcelRenderer(fileObj, (err, rest) => {
        if (err) {
          console.log(err);
        } else {
          this.setState({ rowsXLS: rest.rows });
        }
      });
    }
  };

  render() {
    return (
      <div className="content">
        <div className="react-notification-alert-container">
          <NotificationAlert ref="notificationAlert" />
        </div>
        <Row>
          <Col md="6">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Upload Car Database</CardTitle>
              </CardHeader>
              <CardBody>
                <FormGroup>
                  <span class="btn btn-round btn-primary btn-file">
                    <span>Select file</span>
                    <input type="file" onChange={this.fileHandlerMaterial.bind(this)} />
                  </span>
                </FormGroup>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={this.postCarDatabase} disabled={this.state.rowsXLS.length === 0}>
                  Submit
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default UploadCarDatabase;