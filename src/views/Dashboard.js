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
import Pagination from "react-js-pagination";
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
      user_list: [],
      edit_form: {},
      modalEdit: false,
      modalDelete: false,
      itemToBeEdited: null,
      itemToBeDeleted: null,
      activePage: 1,
      totalData: 0,
      perPage: 10,
    };
  }

  componentDidMount() {
    this.getCarDetail();
    this.getUser();
    document.title = 'Car Detail | Borongboil';
    if (localStorage.getItem('login_status')) {
      const getLoginStatus = JSON.parse(localStorage.getItem('login_status'))
      const getLoginData = JSON.parse(getLoginStatus.value)
      this.setState({ dataLogin: getLoginData })
    }
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

  handlePageChange = (pageNumber) => {
    this.setState({ activePage: pageNumber }, () => {
      this.getCarDetail();
    });
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
    const page = this.state.activePage;
    const maxPage = this.state.perPage;
    getDataFromAPI(`/getCarDetail?srt=_id:-1&lmt=${maxPage}&pg=${page}`).then(res => {
      if (res.data !== undefined && res.status >= 200 && res.status <= 300) {
        const items = res.data.data;
        const totalData = res.data.totalResults;
        this.setState({ car_detail: items, totalData: totalData });
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

  getUser = () => {
    getDataFromAPI('/getUser').then(res => {
      if (res.data !== undefined && res.status >= 200 && res.status <= 300) {
        const items = res.data.data;
        this.setState({ user_list: items });
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
                      <th style={{ textAlign: 'center' }}>Action</th>
                      <th style={{ minWidth: 150, textAlign: 'center' }}>ID</th>
                      <th style={{ minWidth: 150, textAlign: 'center' }}>Merk</th>
                      <th style={{ minWidth: 150, textAlign: 'center' }}>Model</th>
                      <th style={{ minWidth: 150, textAlign: 'center' }}>Varian</th>
                      <th style={{ minWidth: 150, textAlign: 'center' }}>Tahun</th>
                      <th style={{ minWidth: 150, textAlign: 'center' }}>Transmisi</th>
                      <th style={{ minWidth: 150, textAlign: 'center' }}>Nama</th>
                      <th style={{ minWidth: 150, textAlign: 'center' }}>Nomor Telepon</th>
                      <th style={{ minWidth: 150, textAlign: 'center' }}>Area Inspeksi</th>
                      <th style={{ minWidth: 150, textAlign: 'center' }}>Affiliate</th>
                      <th style={{ minWidth: 150, textAlign: 'center' }}>Sub Affiliate</th>
                      <th style={{ minWidth: 150, textAlign: 'center' }}>Marketing Handler</th>
                      <th style={{ minWidth: 150, textAlign: 'center' }}>Inspector Handler</th>
                      <th style={{ minWidth: 150, textAlign: 'center' }}>Flag</th>
                      <th style={{ minWidth: 150, textAlign: 'center' }}>Update Status</th>
                      <th style={{ minWidth: 150, textAlign: 'center' }}>Harga Permintaan</th>
                      <th style={{ minWidth: 150, textAlign: 'center' }}>Harga Penawaran Terakhir</th>
                      <th style={{ minWidth: 150, textAlign: 'center' }}>Harga Final</th>
                      <th style={{ textAlign: 'center' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.car_detail && this.state.car_detail.length ? this.state.car_detail.map(e => (
                      <tr>
                        <td style={{ textAlign: 'center' }}>
                          <Row>
                            <Col lg="12" md="12" sm="12" xs="12">
                              <i
                                className="tim-icons icon-paper"
                                style={{ cursor: "pointer", float: "right" }}
                              />
                            </Col>
                          </Row>
                        </td>
                        <td style={{ textAlign: 'center' }}>{e.cl_id}</td>
                        <td style={{ textAlign: 'center' }}>{e.merk}</td>
                        <td style={{ textAlign: 'center' }}>{e.model}</td>
                        <td style={{ textAlign: 'center' }}>{e.varian}</td>
                        <td style={{ textAlign: 'center' }}>{e.tahun}</td>
                        <td style={{ textAlign: 'center' }}>{e.transmisi}</td>
                        <td style={{ textAlign: 'center' }}>{e.nama}</td>
                        <td style={{ textAlign: 'center' }}>{e.nomor_telepon}</td>
                        <td style={{ textAlign: 'center' }}>{e.area_inspeksi}</td>
                        <td style={{ textAlign: 'center' }}>{e.affiliate}</td>
                        <td style={{ textAlign: 'center' }}>{e.sub_affiliate}</td>
                        <td style={{ textAlign: 'center' }}>{e.marketing_handler}</td>
                        <td style={{ textAlign: 'center' }}>{e.inspector_handler}</td>
                        <td style={{ textAlign: 'center' }}>{e.flag}</td>
                        <td style={{ textAlign: 'center' }}>{e.update_status}</td>
                        <td style={{ textAlign: 'center' }}>{e.harga_permintaan}</td>
                        <td style={{ textAlign: 'center' }}>{e.harga_penawaran_terakhir}</td>
                        <td style={{ textAlign: 'center' }}>{e.harga_final}</td>
                        <td>
                          <Row>
                            <Col lg="6" md="6" sm="6" xs="6">
                              <i
                                className="tim-icons icon-pencil"
                                style={{ cursor: "pointer", float: "right" }}
                                onClick={(f) => this.toggleModalEdit(e._id)}
                              />
                            </Col>
                            <Col lg="6" md="6" sm="6" xs="6">
                              <i
                                className="tim-icons icon-trash-simple"
                                style={{ cursor: "pointer", float: "left" }}
                                onClick={(f) => this.toggleModalDelete(e._id)}
                                hidden={this.state.dataLogin.data.role !== 'superadmin'}
                              />
                            </Col>
                          </Row>
                        </td>
                      </tr>
                    )) : <tr><td colSpan="20" className="text-center">No Data Available</td></tr>}
                  </tbody>
                </Table>
                <Pagination
                  activePage={this.state.activePage}
                  itemsCountPerPage={this.state.perPage}
                  totalItemsCount={this.state.totalData}
                  pageRangeDisplayed={5}
                  onChange={this.handlePageChange}
                  itemClass="page-item"
                  linkClass="page-link"
                />
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
          style={{ top: '-50%', marginBottom: '7%' }}
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
            <FormGroup>
              <Label for="marketing_handler">Marketing Handler</Label>
              <Input
                type="select"
                name="marketing_handler"
                id="marketing_handler"
                style={{ color: '#222a42' }}
                value={this.state.edit_form.marketing_handler}
                onChange={this.handleChangeForm}
              >
                <option disabled selected hidden>Please select a user</option>
                {this.state.user_list.map((e) => (
                  <option value={e.username}>{e.name + ' (' + e.username + ')'}</option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="inspector_handler">Inspector Handler</Label>
              <Input
                type="select"
                name="inspector_handler"
                id="inspector_handler"
                style={{ color: '#222a42' }}
                value={this.state.edit_form.inspector_handler}
                onChange={this.handleChangeForm}
              >
                <option disabled selected hidden>Please select a user</option>
                {this.state.user_list.map((e) => (
                  <option value={e.username}>{e.name + ' (' + e.username + ')'}</option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="update_status">Update Status</Label>
              <Input
                type="select"
                name="update_status"
                id="update_status"
                style={{ color: '#222a42' }}
                value={this.state.edit_form.update_status}
                onChange={this.handleChangeForm}
              >
                <option disabled selected hidden>Please select a status</option>
                <option value="Menunggu Konfirmasi">Menunggu Konfirmasi</option>
                <option value="Siap Di lakukan Inspeksi">Siap Di lakukan Inspeksi</option>
                <option value="Proses Negosiasi">Proses Negosiasi</option>
                <option value="Selesai - Mobil Di bayar">Selesai - Mobil Di bayar</option>
                <option value="Selesai - Batal">Selesai - Batal</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="harga_permintaan">Harga Permintaan</Label>
              <Input
                type="number"
                min={0}
                name="harga_permintaan"
                id="harga_permintaan"
                style={{ color: '#222a42' }}
                value={this.state.edit_form.harga_permintaan}
                onChange={this.handleChangeForm}
              />
            </FormGroup>
            <FormGroup>
              <Label for="harga_penawaran_terakhir">Harga Penawaran Terakhir</Label>
              <Input
                type="number"
                min={0}
                name="harga_penawaran_terakhir"
                id="harga_penawaran_terakhir"
                style={{ color: '#222a42' }}
                value={this.state.edit_form.harga_penawaran_terakhir}
                onChange={this.handleChangeForm}
              />
            </FormGroup>
            <FormGroup>
              <Label for="harga_final">Harga Final</Label>
              <Input
                type="number"
                min={0}
                name="harga_final"
                id="harga_final"
                style={{ color: '#222a42' }}
                value={this.state.edit_form.harga_final}
                onChange={this.handleChangeForm}
              />
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
