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
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

import { getDataFromAPI, patchDataToAPI, deleteDataFromAPI } from "../helper/asyncFunction";

class CarDatabase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      car_detail: [],
      edit_form: {},
      modalEdit: false,
      modalDelete: false,
      itemToBeEdited: null,
      itemToBeDeleted: null
    };
  }

  componentDidMount() {
    this.getCarDatabase();
    document.title = 'Car Detail | Borongboil';
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
  }

  toggleModalDelete = (e) => {
    this.setState({
      modalDelete: !this.state.modalDelete,
      itemToBeDeleted: e
    });
  }

  toggleModalEdit = (e) => {
    const modalEdit = this.state.modalEdit;
    const carDetailState = this.state.car_detail.find((f) => f._id === e);
    const dataEdit = { ...carDetailState }
    if (!modalEdit) {
      this.setState({ edit_form: dataEdit });
    } else {
      this.setState({ edit_form: {} });
    }
    this.setState({
      modalEdit: !this.state.modalEdit,
      itemToBeEdited: e
    });
  }

  handleChangeForm = (e) => {
    const value = e.target.value;
    const index = e.target.name;
    let dataForm = this.state.edit_form;
    dataForm[index] = value;
    this.setState({ edit_form: dataForm }, () => console.log(this.state.edit_form));
  }

  getCarDatabase = () => {
    getDataFromAPI('/getCarDatabase').then(res => {
      if (res.data !== undefined) {
        const items = res.data.data;
        this.setState({ car_detail: items });
      }
    })
  }

  patchCarDatabase = async () => {
    const dataEdit = this.state.edit_form;
    const respondPatch = await patchDataToAPI("/updateCarDatabase/" + this.state.itemToBeEdited, dataEdit);
    if (respondPatch.data !== undefined && respondPatch.status >= 200 && respondPatch.status <= 300) {
      this.notify('tc', 'success', 'Car item has been updated!');
      this.toggleModalEdit();
      setTimeout(function () {
        window.location.reload();
      }, 1500);
    } else {
      this.notify('tc', 'danger', 'Failed to update data!');
    }
  }

  deleteCarDetail = () => {
    deleteDataFromAPI('/deleteCarDatabase/' + this.state.itemToBeDeleted).then(res => {
      if (res.data !== undefined) {
        this.notify('tc', 'success', 'Car item has been deleted!');
        this.toggleModalDelete();
        setTimeout(function () {
          window.location.reload();
        }, 1500);
      } else {
        this.notify('tc', 'danger', 'Failed to delete data!');
      }
    })
  }

  render() {
    return (
      <div className="content">
        <div className="react-notification-alert-container">
          <NotificationAlert ref="notificationAlert" />
        </div>
        <Row>
          <Col lg="12" md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Car Database</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Merk</th>
                      <th>Model</th>
                      <th>Varian</th>
                      <th style={{ textAlign: 'center' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.car_detail && this.state.car_detail.length ? this.state.car_detail.map(e => (
                      <tr>
                        <td>{e.merk}</td>
                        <td>{e.model}</td>
                        <td>{e.varian}</td>
                        <td>
                          <Row>
                            <Col md="6" className="d-flex justify-content-center">
                              <i
                                className="tim-icons icon-pencil"
                                style={{ cursor: "pointer" }}
                                onClick={(f) => this.toggleModalEdit(e._id)}
                              />
                            </Col>
                            <Col md="6" className="d-flex justify-content-center">
                              <i
                                className="tim-icons icon-trash-simple"
                                style={{ cursor: "pointer" }}
                                onClick={(f) => this.toggleModalDelete(e._id)}
                              />
                            </Col>
                          </Row>
                        </td>
                      </tr>
                    )) : <tr><td colSpan="9" className="text-center">No Data Available</td></tr>}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Modal
          isOpen={this.state.modalDelete}
          toggle={this.toggleModalDelete}
        >
          <ModalHeader>
            Are you sure you want to delete this item?
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-hidden="true"
              onClick={this.toggleModalDelete}
            >
              <i className="tim-icons icon-simple-remove" />
            </button>
          </ModalHeader>
          <ModalBody>
            <p>This action cannot be undone</p>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModalDelete}>
              No
            </Button>
            <Button color="danger" onClick={this.deleteCarDetail}>
              Yes
            </Button>
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={this.state.modalEdit}
          toggle={this.toggleModalEdit}
          style={{ marginBottom: '7%' }}
        >
          <ModalHeader>
            Update Car Detail
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-hidden="true"
              onClick={this.toggleModalEdit}
            >
              <i className="tim-icons icon-simple-remove" />
            </button>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="merk">Merk</Label>
              <Input
                type="text"
                name="merk"
                id="merk"
                style={{ color: '#222a42' }}
                value={this.state.edit_form.merk}
                onChange={this.handleChangeForm}
              />
            </FormGroup>
            <FormGroup>
              <Label for="model">Model</Label>
              <Input
                type="text"
                name="model"
                id="model"
                style={{ color: '#222a42' }}
                value={this.state.edit_form.model}
                onChange={this.handleChangeForm}
              />
            </FormGroup>
            <FormGroup>
              <Label for="varian">Varian</Label>
              <Input
                type="text"
                name="varian"
                id="varian"
                style={{ color: '#222a42' }}
                value={this.state.edit_form.varian}
                onChange={this.handleChangeForm}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModalEdit}>
              Close
            </Button>
            <Button color="primary" onClick={this.patchCarDatabase}>
              Update
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default CarDatabase;
