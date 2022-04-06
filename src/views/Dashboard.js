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

class Dashboard extends Component {
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
    this.getCarDetail();
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

  getCarDetail = () => {
    getDataFromAPI('/getCarDetail').then(res => {
      if (res.data !== undefined) {
        const items = res.data.data;
        this.setState({ car_detail: items });
      }
    })
  }

  patchCarDetail = async () => {
    const dataEdit = this.state.edit_form;
    const respondPatch = await patchDataToAPI("/updateCarDetail/" + this.state.itemToBeEdited, dataEdit);
    if (respondPatch.data !== undefined && respondPatch.status >= 200 && respondPatch.status <= 300) {
      this.notify('tc', 'success', 'Car detail has been updated!');
      this.toggleModalEdit();
      setTimeout(function () {
        window.location.reload();
      }, 1500);
    } else {
      this.notify('tc', 'danger', 'Failed to update data!');
    }
  }

  deleteCarDetail = () => {
    deleteDataFromAPI('/deleteCarDetail/' + this.state.itemToBeDeleted).then(res => {
      if (res.data !== undefined) {
        this.notify('tc', 'success', 'Car detail has been deleted!');
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
                <CardTitle tag="h4">Dashboard</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Merk</th>
                      <th>Model</th>
                      <th>Varian</th>
                      <th>Tahun</th>
                      <th>Transmisi</th>
                      <th>Nama</th>
                      <th>Nomor Telepon</th>
                      <th>Area Inspeksi</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.car_detail && this.state.car_detail.length ? this.state.car_detail.map(e => (
                      <tr>
                        <td>{e.merk}</td>
                        <td>{e.model}</td>
                        <td>{e.varian}</td>
                        <td>{e.tahun}</td>
                        <td>{e.transmisi}</td>
                        <td>{e.nama}</td>
                        <td>{e.nomor_telepon}</td>
                        <td>{e.area_inspeksi}</td>
                        <td>
                          <Row>
                            <Col md="6">
                              <i
                                className="tim-icons icon-pencil"
                                style={{ cursor: "pointer" }}
                                onClick={(f) => this.toggleModalEdit(e._id)}
                              />
                            </Col>
                            <Col md="6">
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
          style={{ top: '-30%', marginBottom: '7%' }}
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
            <FormGroup>
              <Label for="tahun">Tahun</Label>
              <Input
                type="number"
                name="tahun"
                id="tahun"
                style={{ color: '#222a42' }}
                value={this.state.edit_form.tahun}
                onChange={this.handleChangeForm}
              />
            </FormGroup>
            <FormGroup>
              <Label for="transmisi">Transmisi</Label>
              <Input
                type="select"
                name="transmisi"
                id="transmisi"
                style={{ color: '#222a42' }}
                value={this.state.edit_form.transmisi}
                onChange={this.handleChangeForm}
              >
                <option value="AT">AT</option>
                <option value="MT">MT</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="nama">Nama</Label>
              <Input
                type="text"
                name="nama"
                id="nama"
                style={{ color: '#222a42' }}
                value={this.state.edit_form.nama}
                onChange={this.handleChangeForm}
              />
            </FormGroup>
            <FormGroup>
              <Label for="nomor_telepon">Nomor Telepon</Label>
              <Input
                type="number"
                name="nomor_telepon"
                id="nomor_telepon"
                style={{ color: '#222a42' }}
                value={this.state.edit_form.nomor_telepon}
                onChange={this.handleChangeForm}
              />
            </FormGroup>
            <FormGroup>
              <Label for="area_inspeksi">Area Inspeksi</Label>
              <Input
                type="select"
                name="area_inspeksi"
                id="area_inspeksi"
                style={{ color: '#222a42' }}
                value={this.state.edit_form.area_inspeksi}
                onChange={this.handleChangeForm}
              >
                <option value="Jabodetabek">Jabodetabek</option>
                <option value="Lain">Lain</option>
              </Input>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModalEdit}>
              Close
            </Button>
            <Button color="primary" onClick={this.patchCarDetail}>
              Update
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Dashboard;
