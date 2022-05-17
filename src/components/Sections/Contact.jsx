import React, { Component } from "react";
import styled from "styled-components";
import styles from '../../style/index.module.css';
import Select from 'react-select';
import NotificationAlert from "react-notification-alert";

import { FormGroup } from "reactstrap";
import { getDataFromAPI, postDataToAPI } from "../../helper/asyncFunction";

const Wrapper = styled.section`
  width: 100%;
`;
const HeaderInfo = styled.div`
  padding: 70px 0 30px 0;
  @media (max-width: 860px) {
    text-align: center;
  }
`;
const Form = styled.form`
  padding: 0;
  input,
  textarea {
    width: 100%;
    background-color: transparent;
    border: 0px;
    outline: none;
    box-shadow: none;
    border-bottom: 1px solid #707070;
    height: 30px;
    margin-bottom: 30px;
  }
  textarea {
    min-height: 100px;
  }
  @media (max-width: 860px) {
    padding: 30px 0;
  }
`;
const ButtonInput = styled.input`
  border: 1px solid #7620ff;
  background-color: #7620ff;
  width: 100%;
  padding: 15px;
  outline: none;
  color: #fff;
  :hover {
    background-color: #580cd2;
    border: 1px solid #7620ff;
    color: #fff;
  }
  @media (max-width: 991px) {
    margin: 0 auto;
  }
`;
const ContactImgBox = styled.div`
  max-width: 180px; 
  align-self: flex-end; 
  margin: 10px 30px 10px 0;
`;
const SumbitWrapper = styled.div`
  @media (max-width: 991px) {
    width: 100%;
    margin-bottom: 50px;
  }
`;

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

class Contact extends Component {
  constructor(props) {
    super(props);
    const queryParams = new URLSearchParams(window.location.search);
    const aff = queryParams.get('m');
    const subAff = queryParams.get('sub');
    this.state = {
      data_form: {
        affiliate: aff,
        sub_affiliate: subAff
      },
      car_database: [],
      car_merk: [],
      car_model: [],
      car_varian: []
    };
  }

  componentDidMount() {
    this.getCarDatabase();
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
    let dataForm = this.state.data_form;
    dataForm[index] = value;
    this.setState({ data_form: dataForm }, () => console.log(this.state.data_form));
  }

  handleChangeFormSelect = (e) => {
    const value = e.value;
    const index = e.name;
    let dataForm = this.state.data_form;
    dataForm[index] = value;
    this.setState({ data_form: dataForm }, () => console.log(this.state.data_form));
    if (index === 'merk') {
      delete dataForm.model;
      delete dataForm.varian;
      const model = this.state.car_database.filter((e) => e.merk === this.state.data_form.merk).map((d) => d['model'])
      const distinctModel = [...new Set(model.filter((e, i) => model.indexOf(e) === i))]
      let car_model = [];
      for (let i of distinctModel) {
        let modelObject = {
          value: i,
          label: i,
          name: 'model'
        }
        car_model.push(modelObject);
      }
      this.setState({ car_model: car_model, data_form: dataForm });
    } else if (index === 'model') {
      delete dataForm.varian;
      const varian = this.state.car_database.filter((e) => e.model === this.state.data_form.model).map((d) => d['varian'])
      const distinctVarian = [...new Set(varian.filter((e, i) => varian.indexOf(e) === i))]
      let car_varian = [];
      for (let i of distinctVarian) {
        let varianObject = {
          value: i,
          label: i,
          name: 'varian'
        }
        car_varian.push(varianObject);
      }
      this.setState({ car_varian: car_varian, data_form: dataForm });
    }
  }

  getCarDatabase = () => {
    getDataFromAPI('/getCarDatabaseLandingPage').then(res => {
      if (res.data !== undefined) {
        const items = res.data.data;
        this.setState({ car_database: items }, () => {
          const merk = this.state.car_database.map((d) => d['merk'])
          const distinctMerk = [...new Set(merk.filter((e, i) => merk.indexOf(e) === i))]
          let car_merk = this.state.car_merk;
          for (let i of distinctMerk) {
            let merkObject = {
              value: i,
              label: i,
              name: 'merk'
            }
            car_merk.push(merkObject);
          }
        });
      }
    })
  }

  postCarDetail = async () => {
    const dataForm = this.state.data_form;
    const respondPost = await postDataToAPI("/createCarDetail", dataForm);
    if (respondPost.data !== undefined && respondPost.status >= 200 && respondPost.status <= 300) {
      this.notify('tc', 'success', 'Car detail has been submitted!');
      setTimeout(function () {
        window.location.reload();
      }, 1500);
    } else {
      this.notify('tc', 'success', 'Failed to submit data!');
    }
  }

  render() {
    if (window.location.host.split(".")[0] === "p") {
      window.location.replace('https://borongboil.id/?m=putri')
    }
    return (
      <Wrapper id="contact">
        <div className="react-notification-alert-container">
          <NotificationAlert ref="notificationAlert" />
        </div>
        <div className={`${styles.lightBg}`}>
          <div className={`${styles.container}`}>
            <HeaderInfo>
              <h1 className={`${styles.font40} ${styles.extraBold}`} style={{ color: '#0B093B' }}>Masukkan Detail Kendaraan Anda</h1>
            </HeaderInfo>
            <div className="row" style={{ paddingBottom: "30px" }}>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <Form>
                  <FormGroup>
                    <label className={`${styles.font13}`}>Merk</label>
                    <Select options={this.state.car_merk} onChange={this.handleChangeFormSelect} value={{ value: this.state.data_form.merk, label: this.state.data_form.merk }} />
                  </FormGroup>
                  <FormGroup>
                    <label className={`${styles.font13}`}>Model</label>
                    <Select options={this.state.car_model} onChange={this.handleChangeFormSelect} value={{ value: this.state.data_form.model, label: this.state.data_form.model }} />
                  </FormGroup>
                  <FormGroup>
                    <label className={`${styles.font13}`}>Varian</label>
                    <Select options={this.state.car_varian} onChange={this.handleChangeFormSelect} value={{ value: this.state.data_form.varian, label: this.state.data_form.varian }} />
                  </FormGroup>
                  <FormGroup>
                    <label className={`${styles.font13}`}>Transmisi</label>
                    <Select options={[{ value: 'AT', label: 'AT', name: 'transmisi' }, { value: 'MT', label: 'MT', name: 'transmisi' }]} onChange={this.handleChangeFormSelect} value={{ value: this.state.data_form.transmisi, label: this.state.data_form.transmisi }} />
                  </FormGroup>
                  <FormGroup>
                    <label className={`${styles.font13}`}>Area Inspeksi</label>
                    <Select options={[{ value: 'Jabodetabek', label: 'Jabodetabek', name: 'area_inspeksi' }, { value: 'Lain', label: 'Lain', name: 'area_inspeksi' }]} onChange={this.handleChangeFormSelect} value={{ value: this.state.data_form.area_inspeksi, label: this.state.data_form.area_inspeksi }} />
                  </FormGroup>
                </Form>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <Form>
                  <FormGroup>
                    <label className={`${styles.font13}`}>Tahun</label>
                    <input type="number" min={0} name="tahun" className={`${styles.font20} ${styles.extraBold}`} value={this.state.data_form.tahun} onChange={this.handleChangeForm} />
                  </FormGroup>
                  <FormGroup>
                    <label className={`${styles.font13}`}>Nama</label>
                    <input type="text" name="nama" className={`${styles.font20} ${styles.extraBold}`} value={this.state.data_form.nama} onChange={this.handleChangeForm} />
                  </FormGroup>
                  <FormGroup>
                    <label className={`${styles.font13}`}>Nomor Telepon</label>
                    <input type="text" name="nomor_telepon" className={`${styles.font20} ${styles.extraBold}`} value={this.state.data_form.nomor_telepon} onChange={this.handleChangeForm} />
                  </FormGroup>
                  <FormGroup hidden>
                    <label className={`${styles.font13}`}>Affiliate</label>
                    <input type="text" name="affiliate" className={`${styles.font20} ${styles.extraBold}`} value={this.state.data_form.affiliate} onChange={this.handleChangeForm} />
                  </FormGroup>
                  <FormGroup hidden>
                    <label className={`${styles.font13}`}>Sub Affiliate</label>
                    <input type="text" name="sub_affiliate" className={`${styles.font20} ${styles.extraBold}`} value={this.state.data_form.sub_affiliate} onChange={this.handleChangeForm} />
                  </FormGroup>
                </Form>
              </div>
              <div div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ marginTop: 16 }}>
                <SumbitWrapper className={`${styles.flex}`}>
                  <ButtonInput type="submit" value="Send Message" className={`${styles.pointer} ${styles.animate} ${styles.radius8}`} style={{ maxWidth: "220px" }} onClick={this.postCarDetail} />
                </SumbitWrapper>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default Contact;