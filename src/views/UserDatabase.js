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

import { getDataFromAPI, postDataToAPI, patchDataToAPI, deleteDataFromAPI } from "../helper/asyncFunction";

class UserDatabase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_detail: [],
      create_form: {},
      edit_form: {},
      modalCreate: false,
      modalEdit: false,
      modalDelete: false,
      itemToBeEdited: null,
      itemToBeDeleted: null,
      dataLogin: {}
    };
  }

  componentDidMount() {
    this.getUser();
    document.title = 'User Database | Borongboil';
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

  toggleModalCreate = (e) => {
    this.setState({
      modalCreate: !this.state.modalCreate
    });
  }

  toggleModalEdit = (e) => {
    const modalEdit = this.state.modalEdit;
    const carDetailState = this.state.user_detail.find((f) => f._id === e);
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

  toggleModalDelete = (e) => {
    this.setState({
      modalDelete: !this.state.modalDelete,
      itemToBeDeleted: e
    });
  }

  handleChangeForm = (e) => {
    const value = e.target.value;
    const index = e.target.name;
    let dataForm = this.state.edit_form;
    dataForm[index] = value;
    this.setState({ edit_form: dataForm }, () => console.log(this.state.edit_form));
  }

  handleChangeFormCreate = (e) => {
    const value = e.target.value;
    const index = e.target.name;
    let dataForm = this.state.create_form;
    dataForm[index] = value;
    this.setState({ create_form: dataForm }, () => console.log(this.state.create_form));
  }

  getUser = () => {
    getDataFromAPI('/getUser').then(res => {
      if (res.data !== undefined) {
        const items = res.data.data;
        this.setState({ user_detail: items });
      }
    })
  }

  createUser = async () => {
    const dataForm = this.state.create_form;
    const respondPost = await postDataToAPI("/createUser", dataForm);
    if (respondPost.data !== undefined && respondPost.status >= 200 && respondPost.status <= 300) {
      this.notify('tc', 'success', 'User has been created!');
      setTimeout(function () {
        window.location.reload();
      }, 1500);
    } else {
      this.notify('tc', 'success', 'Failed to submit data!');
    }
  }

  updateUser = async () => {
    const dataEdit = this.state.edit_form;
    const respondPatch = await patchDataToAPI("/updateUser/" + this.state.itemToBeEdited, dataEdit);
    if (respondPatch.data !== undefined && respondPatch.status >= 200 && respondPatch.status <= 300) {
      this.notify('tc', 'success', 'User has been updated!');
      this.toggleModalEdit();
      setTimeout(function () {
        window.location.reload();
      }, 1500);
    } else {
      this.notify('tc', 'danger', 'Failed to update data!');
    }
  }

  deleteUser = () => {
    deleteDataFromAPI('/deleteUser/' + this.state.itemToBeDeleted).then(res => {
      if (res.data !== undefined) {
        this.notify('tc', 'success', 'User has been deleted!');
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
                <Row>
                  <Col lg="6" md="6" sm="6" xs="6">
                    <CardTitle tag="h4">User Database</CardTitle>
                  </Col>
                  <Col lg="6" md="6" sm="6" xs="6">
                    <Button color="primary" onClick={this.toggleModalCreate} style={{ float: "right" }}>
                      <i
                        className="tim-icons icon-simple-add"
                        style={{ cursor: "pointer", marginRight: "8px", marginTop: "-3px" }}
                      />
                      New User
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Name</th>
                      <th>Affiliate Link</th>
                      <th style={{ textAlign: 'center' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.user_detail && this.state.user_detail.length ? this.state.user_detail.map(e => (
                      <tr>
                        <td>{e.username}</td>
                        <td>{e.email}</td>
                        <td>{e.name}</td>
                        <td>{e.affiliate_link}</td>
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
                                hidden={this.state.dataLogin.role !== 'superadmin'}
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
            Are you sure you want to delete this user?
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
            <Button color="danger" onClick={this.deleteUser}>
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
            Update User Detail
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
              <Label for="username">Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                style={{ color: '#222a42' }}
                value={this.state.edit_form.username}
                onChange={this.handleChangeForm}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="text"
                name="email"
                id="email"
                style={{ color: '#222a42' }}
                value={this.state.edit_form.email}
                onChange={this.handleChangeForm}
              />
            </FormGroup>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                style={{ color: '#222a42' }}
                value={this.state.edit_form.name}
                onChange={this.handleChangeForm}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModalEdit}>
              Close
            </Button>
            <Button color="primary" onClick={this.updateUser}>
              Update
            </Button>
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={this.state.modalCreate}
          toggle={this.toggleModalCreate}
          style={{ marginBottom: '7%' }}
        >
          <ModalHeader>
            Create New User
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-hidden="true"
              onClick={this.toggleModalCreate}
            >
              <i className="tim-icons icon-simple-remove" />
            </button>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                style={{ color: '#222a42' }}
                value={this.state.create_form.username}
                onChange={this.handleChangeFormCreate}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                style={{ color: '#222a42' }}
                value={this.state.create_form.password}
                onChange={this.handleChangeFormCreate}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="text"
                name="email"
                id="email"
                style={{ color: '#222a42' }}
                value={this.state.create_form.email}
                onChange={this.handleChangeFormCreate}
              />
            </FormGroup>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                style={{ color: '#222a42' }}
                value={this.state.create_form.name}
                onChange={this.handleChangeFormCreate}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModalCreate}>
              Close
            </Button>
            <Button color="primary" onClick={this.createUser}>
              Create
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default UserDatabase;
