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
import ReactToPrint from "react-to-print";
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

import { getDataFromAPI, getDatafromAPINODEFile } from "../helper/asyncFunction";
import { convertDateFormat } from "../helper/basicFunction";

class InspectionReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inspection_report: [],
      foto_kendaraan: []
    };
  }

  componentDidMount() {
    this.getInspectionReport(this.props.match.params.id);
    document.title = 'Inspection Report | Borongboil';
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

  getInspectionReport = (id) => {
    getDataFromAPI(`/getInspectionReport/` + id).then(res => {
      if (res.data !== undefined && res.status >= 200 && res.status <= 300) {
        const items = res.data.data;
        this.setState({ inspection_report: items }, () => {
          this.checkFotoKendaraan(items);
          const keys_informasi_umum = Object.keys(this.state.inspection_report.informasi_umum);
          const keys_dokumen = Object.keys(this.state.inspection_report.dokumen);
          const keys_fitur = Object.keys(this.state.inspection_report.fitur);
          const keys_data_ban_tipe_velg = Object.keys(this.state.inspection_report.data_ban.tipe_velg);
          const keys_data_ban_ketebalan_ban = Object.keys(this.state.inspection_report.data_ban.ketebalan_ban);
          const keys_interior_dashboard_kelistrikan = Object.keys(this.state.inspection_report.interior.dashboard_kelistrikan);
          const keys_interior_instrumen = Object.keys(this.state.inspection_report.interior.instrumen);
          const keys_interior_jok_trim = Object.keys(this.state.inspection_report.interior.jok_trim);
          const keys_eksterior_body = Object.keys(this.state.inspection_report.eksterior.body);
          const keys_eksterior_kaca_lampu = Object.keys(this.state.inspection_report.eksterior.kaca_lampu);
          const keys_eksterior_under_body = Object.keys(this.state.inspection_report.eksterior.under_body);
          const keys_mesin_oli_dan_cairan = Object.keys(this.state.inspection_report.mesin.oli_dan_cairan);
          const keys_mesin_ruang_mesin = Object.keys(this.state.inspection_report.mesin.ruang_mesin);
          const keys_tambahan_kelengkapan = Object.keys(this.state.inspection_report.tambahan_kelengkapan);
          const keys_test_drive = Object.keys(this.state.inspection_report.test_drive);
          this.setState({
            keys_informasi_umum: keys_informasi_umum,
            keys_dokumen: keys_dokumen,
            keys_fitur: keys_fitur,
            keys_data_ban_tipe_velg: keys_data_ban_tipe_velg,
            keys_data_ban_ketebalan_ban: keys_data_ban_ketebalan_ban,
            keys_interior_dashboard_kelistrikan: keys_interior_dashboard_kelistrikan,
            keys_interior_instrumen: keys_interior_instrumen,
            keys_interior_jok_trim: keys_interior_jok_trim,
            keys_eksterior_body: keys_eksterior_body,
            keys_eksterior_kaca_lampu: keys_eksterior_kaca_lampu,
            keys_eksterior_under_body: keys_eksterior_under_body,
            keys_mesin_oli_dan_cairan: keys_mesin_oli_dan_cairan,
            keys_mesin_ruang_mesin: keys_mesin_ruang_mesin,
            keys_tambahan_kelengkapan: keys_tambahan_kelengkapan,
            keys_test_drive: keys_test_drive,
          })
        });
      }
    })
  }

  symbolConverter = (params) => {
    const list_param = ['OK', 'Perlu Diperhatikan', 'Tidak Tersedia']
    if (list_param.includes(params)) {
      let color = params === 'OK' ? 'green' : params === 'Perlu Diperhatikan' ? 'orange' : 'grey'
      return (<div style={{ height: 20, width: 20, backgroundColor: color, borderRadius: '50%', display: 'inline-block' }}></div>)
    }
  }

  keterangan = () => {
    return (
      <Row style={{ color: 'white', marginBottom: 20 }}>
        <Col md='2'><strong>Keterangan:</strong></Col>
        <Col md='1'><div style={{ height: 20, width: 20, backgroundColor: 'green', borderRadius: '50%', display: 'inline-block', verticalAlign: 'middle' }}></div> OK</Col>
        <Col md='2'><div style={{ height: 20, width: 20, backgroundColor: 'orange', borderRadius: '50%', display: 'inline-block', verticalAlign: 'middle' }}></div> Perlu Diperhatikan</Col>
        <Col md='2'><div style={{ height: 20, width: 20, backgroundColor: 'grey', borderRadius: '50%', display: 'inline-block', verticalAlign: 'middle' }}></div> Tidak Tersedia</Col>
      </Row>
    )
  }

  checkFotoKendaraan = async (items) => {
    if (items.foto_kendaraan) {
      if (items.foto_kendaraan.foto) {
        for (let i = 0; i < items.foto_kendaraan.foto.length; i++) {
          await this.getFotoKendaraan(items.informasi_umum.cl_id, i, items.foto_kendaraan.foto[i])
        }
      }
    }
  }

  getFotoKendaraan = async (cl_id, idx_photo, data_image) => {
    if (data_image) {
      const res = await getDatafromAPINODEFile('/getFotoKendaraan/' + cl_id + '/' + idx_photo)
      if (res !== undefined && res.data !== undefined) {
        this.showFotoKendaraan(res.data, data_image);
      } else {
        return null
      }
    }
  }

  showFotoKendaraan = (file, data_image) => {
    let images = this.state.foto_kendaraan;
    let data_image_file = data_image;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (e) => {
      const sfbase = reader.result.replace('application/octet-stream', 'image/png');
      data_image_file["image_view_file"] = sfbase;
      images.push(data_image_file)
      this.setState({ foto_kendaraan: images }, () => console.log("foto_kendaraan", this.state.foto_kendaraan));
    }
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
                <CardTitle tag="h4">Inspection Report</CardTitle>
              </CardHeader>
              <CardBody>
                {/* <ReactToPrint
                  trigger={() => <Button style={{ float: 'right' }} size="sm"><i className="tim-icons icon-single-02" style={{ marginRight: "8px" }}></i>Download Inspection Report</Button>}
                  content={() => this.componentRef}
                /> */}
                <div id_drf={this.props.match.params.id} ref={el => (this.componentRef = el)}>
                  <Table responsive>
                    <thead style={{ backgroundColor: 'red' }}>
                      <tr>
                        <th style={{ color: 'white', fontSize: 20 }}>Laporan Kondisi Kendaraan No. {this.state.inspection_report && this.state.inspection_report.informasi_umum && this.state.inspection_report.informasi_umum.cl_id}</th>
                        <th style={{ color: 'white', fontSize: 20, textAlign: 'right' }}>Tanggal Inspeksi: 08/11/2022</th>
                      </tr>
                    </thead>
                  </Table>
                  <Row>
                    <Col>
                      <Table responsive>
                        <tbody>
                          {this.state.keys_informasi_umum && this.state.inspection_report && this.state.inspection_report.informasi_umum && this.state.keys_informasi_umum.map((e, i) => (
                            e !== 'cl_id' && i < 10 && (
                              <tr>
                                <td style={{ textTransform: 'capitalize' }}>{e.replaceAll('_', ' ').replace('no', 'no.')}</td>
                                <td>{this.state.inspection_report.informasi_umum[e]}</td>
                              </tr>
                            )
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                    <Col>
                      <Table responsive>
                        <tbody>
                          {this.state.keys_informasi_umum && this.state.inspection_report && this.state.inspection_report.informasi_umum && this.state.keys_informasi_umum.map((e, i) => (
                            e !== 'cl_id' && i >= 10 && (
                              <tr>
                                <td style={{ textTransform: 'capitalize' }}>{e.replaceAll('_', ' ').replace('no', 'no.')}</td>
                                <td>{[14, 18].includes(i) ? convertDateFormat(this.state.inspection_report.informasi_umum[e]) : this.state.inspection_report.informasi_umum[e]}</td>
                              </tr>
                            )
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                  <Table responsive>
                    <thead style={{ backgroundColor: 'red' }}>
                      <tr>
                        <th style={{ color: 'white', fontSize: 20 }}>Dokumen</th>
                      </tr>
                    </thead>
                  </Table>
                  {this.keterangan()}
                  <Row>
                    <Col>
                      <Table responsive>
                        <tbody>
                          {this.state.keys_dokumen && this.state.inspection_report && this.state.inspection_report.dokumen && this.state.keys_dokumen.map((e, i) => (
                            i < Math.floor(this.state.keys_dokumen.length / 2) && (
                              <tr>
                                <td style={{ textTransform: 'capitalize' }}>{i === 0 ? e.toUpperCase() : e.replaceAll('_', ' ')}</td>
                                <td style={{ width: '50%' }}>{this.symbolConverter(this.state.inspection_report.dokumen[e])}</td>
                              </tr>
                            )
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                    <Col>
                      <Table responsive>
                        <tbody>
                          {this.state.keys_dokumen && this.state.inspection_report && this.state.inspection_report.dokumen && this.state.keys_dokumen.map((e, i) => (
                            i >= Math.floor(this.state.keys_dokumen.length / 2) && (
                              <tr>
                                <td style={{ textTransform: 'capitalize' }}>{i === 2 ? e.toUpperCase() : e.replaceAll('_', ' ')}</td>
                                <td style={{ width: '50%' }}>{this.symbolConverter(this.state.inspection_report.dokumen[e])}</td>
                              </tr>
                            )
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                  <Table responsive>
                    <thead style={{ backgroundColor: 'red' }}>
                      <tr>
                        <th style={{ color: 'white', fontSize: 20 }}>Fitur</th>
                      </tr>
                    </thead>
                  </Table>
                  {this.keterangan()}
                  <Row>
                    <Col>
                      <Table responsive>
                        <tbody>
                          {this.state.keys_fitur && this.state.inspection_report && this.state.inspection_report.fitur && this.state.keys_fitur.map((e, i) => (
                            i < Math.floor(this.state.keys_fitur.length / 2) && (
                              <tr>
                                <td style={{ textTransform: 'capitalize' }}>{e.replaceAll('_', ' ')}</td>
                                <td style={{ width: '50%' }}>{this.symbolConverter(this.state.inspection_report.fitur[e])}</td>
                              </tr>
                            )
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                    <Col>
                      <Table responsive>
                        <tbody>
                          {this.state.keys_fitur && this.state.inspection_report && this.state.inspection_report.fitur && this.state.keys_fitur.map((e, i) => (
                            i >= Math.floor(this.state.keys_fitur.length / 2) && (
                              <tr>
                                <td style={{ textTransform: 'capitalize' }}>{e.replaceAll('_', ' ')}</td>
                                <td style={{ width: '50%' }}>{this.symbolConverter(this.state.inspection_report.fitur[e])}</td>
                              </tr>
                            )
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                  <Table responsive>
                    <thead style={{ backgroundColor: 'red' }}>
                      <tr>
                        <th style={{ color: 'white', fontSize: 20 }}>Data Ban</th>
                      </tr>
                    </thead>
                  </Table>
                  {this.keterangan()}
                  <Row>
                    <Col md='6'>
                      <Table responsive>
                        <thead>
                          <tr>
                            <th style={{ textAlign: 'center' }}>Posisi Ban</th>
                            <th style={{ textAlign: 'center' }}>Tipe Velg</th>
                            <th style={{ textAlign: 'center' }}>Ketebalan Ban</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.keys_data_ban_tipe_velg && this.state.keys_data_ban_ketebalan_ban && this.state.inspection_report && this.state.inspection_report.data_ban && this.state.inspection_report.data_ban.tipe_velg && this.state.keys_data_ban_tipe_velg.map((e, i) => (
                            (
                              <tr>
                                <td style={{ textTransform: 'capitalize', textAlign: 'center' }}>{e.replaceAll('_', ' ')}</td>
                                <td style={{ textAlign: 'center' }}>{this.state.inspection_report.data_ban.tipe_velg[e]}</td>
                                <td style={{ textAlign: 'center' }}>{this.symbolConverter(this.state.inspection_report.data_ban.ketebalan_ban[e])}</td>
                              </tr>
                            )
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                  <Table responsive>
                    <thead style={{ backgroundColor: 'red' }}>
                      <tr>
                        <th style={{ color: 'white', fontSize: 20 }}>Poin Inspeksi</th>
                      </tr>
                    </thead>
                  </Table>
                  {this.keterangan()}
                  <div style={{ color: 'white', fontSize: 16, marginBottom: 16 }}><strong>Interior - Dashboard & Kelistrikan</strong></div>
                  <Row>
                    <Col>
                      <Table responsive>
                        <tbody>
                          {this.state.keys_interior_dashboard_kelistrikan && this.state.inspection_report && this.state.inspection_report.interior && this.state.inspection_report.interior.dashboard_kelistrikan && this.state.keys_interior_dashboard_kelistrikan.map((e, i) => (
                            i < Math.floor(this.state.keys_interior_dashboard_kelistrikan.length / 2) && (
                              <tr>
                                <td style={{ textTransform: 'capitalize' }}>{e.replaceAll('_', ' ')}</td>
                                <td style={{ width: '50%' }}>{this.symbolConverter(this.state.inspection_report.interior.dashboard_kelistrikan[e])}</td>
                              </tr>
                            )
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                    <Col>
                      <Table responsive>
                        <tbody>
                          {this.state.keys_interior_dashboard_kelistrikan && this.state.inspection_report && this.state.inspection_report.interior && this.state.inspection_report.interior.dashboard_kelistrikan && this.state.keys_interior_dashboard_kelistrikan.map((e, i) => (
                            i >= Math.floor(this.state.keys_interior_dashboard_kelistrikan.length / 2) && (
                              <tr>
                                <td style={{ textTransform: 'capitalize' }}>{e.replaceAll('_', ' ')}</td>
                                <td style={{ width: '50%' }}>{this.symbolConverter(this.state.inspection_report.interior.dashboard_kelistrikan[e])}</td>
                              </tr>
                            )
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                  <div style={{ color: 'white', fontSize: 16, marginBottom: 16 }}><strong>Interior - Instrumen</strong></div>
                  <Row>
                    <Col>
                      <Table responsive>
                        <tbody>
                          {this.state.keys_interior_instrumen && this.state.inspection_report && this.state.inspection_report.interior && this.state.inspection_report.interior.instrumen && this.state.keys_interior_instrumen.map((e, i) => (
                            i < Math.floor(this.state.keys_interior_instrumen.length / 2) && (
                              <tr>
                                <td style={{ textTransform: 'capitalize' }}>{e.replaceAll('_', ' ')}</td>
                                <td style={{ width: '50%' }}>{this.symbolConverter(this.state.inspection_report.interior.instrumen[e])}</td>
                              </tr>
                            )
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                    <Col>
                      <Table responsive>
                        <tbody>
                          {this.state.keys_interior_instrumen && this.state.inspection_report && this.state.inspection_report.interior && this.state.inspection_report.interior.instrumen && this.state.keys_interior_instrumen.map((e, i) => (
                            i >= Math.floor(this.state.keys_interior_instrumen.length / 2) && (
                              <tr>
                                <td style={{ textTransform: 'capitalize' }}>{e.replaceAll('_', ' ')}</td>
                                <td style={{ width: '50%' }}>{this.symbolConverter(this.state.inspection_report.interior.instrumen[e])}</td>
                              </tr>
                            )
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                  <div style={{ color: 'white', fontSize: 16, marginBottom: 16 }}><strong>Interior - Jok & Trim</strong></div>
                  <Row>
                    <Col>
                      <Table responsive>
                        <tbody>
                          {this.state.keys_interior_jok_trim && this.state.inspection_report && this.state.inspection_report.interior && this.state.inspection_report.interior.jok_trim && this.state.keys_interior_jok_trim.map((e, i) => (
                            i < Math.floor(this.state.keys_interior_jok_trim.length / 2) && (
                              <tr>
                                <td style={{ textTransform: 'capitalize' }}>{e.replaceAll('_', ' ')}</td>
                                <td style={{ width: '50%' }}>{this.symbolConverter(this.state.inspection_report.interior.jok_trim[e])}</td>
                              </tr>
                            )
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                    <Col>
                      <Table responsive>
                        <tbody>
                          {this.state.keys_interior_jok_trim && this.state.inspection_report && this.state.inspection_report.interior && this.state.inspection_report.interior.jok_trim && this.state.keys_interior_jok_trim.map((e, i) => (
                            i >= Math.floor(this.state.keys_interior_jok_trim.length / 2) && (
                              <tr>
                                <td style={{ textTransform: 'capitalize' }}>{e.replaceAll('_', ' ')}</td>
                                <td style={{ width: '50%' }}>{this.symbolConverter(this.state.inspection_report.interior.jok_trim[e])}</td>
                              </tr>
                            )
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                  <div style={{ color: 'white', fontSize: 16, marginBottom: 16 }}><strong>Eksterior - Body</strong></div>
                  <Row>
                    <Col>
                      <Table responsive>
                        <tbody>
                          {this.state.keys_eksterior_body && this.state.inspection_report && this.state.inspection_report.eksterior && this.state.inspection_report.eksterior.body && this.state.keys_eksterior_body.map((e, i) => (
                            i < Math.floor(this.state.keys_eksterior_body.length / 2) && (
                              <tr>
                                <td style={{ textTransform: 'capitalize' }}>{e.replaceAll('_', ' ')}</td>
                                <td style={{ width: '50%' }}>{this.symbolConverter(this.state.inspection_report.eksterior.body[e])}</td>
                              </tr>
                            )
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                    <Col>
                      <Table responsive>
                        <tbody>
                          {this.state.keys_eksterior_body && this.state.inspection_report && this.state.inspection_report.eksterior && this.state.inspection_report.eksterior.body && this.state.keys_eksterior_body.map((e, i) => (
                            i >= Math.floor(this.state.keys_eksterior_body.length / 2) && (
                              <tr>
                                <td style={{ textTransform: 'capitalize' }}>{e.replaceAll('_', ' ')}</td>
                                <td style={{ width: '50%' }}>{this.symbolConverter(this.state.inspection_report.eksterior.body[e])}</td>
                              </tr>
                            )
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                  <div style={{ color: 'white', fontSize: 16, marginBottom: 16 }}><strong>Eksterior - Kaca & Lampu</strong></div>
                  <Row>
                    <Col>
                      <Table responsive>
                        <tbody>
                          {this.state.keys_eksterior_kaca_lampu && this.state.inspection_report && this.state.inspection_report.eksterior && this.state.inspection_report.eksterior.kaca_lampu && this.state.keys_eksterior_kaca_lampu.map((e, i) => (
                            i < Math.floor(this.state.keys_eksterior_kaca_lampu.length / 2) && (
                              <tr>
                                <td style={{ textTransform: 'capitalize' }}>{e.replaceAll('_', ' ')}</td>
                                <td style={{ width: '50%' }}>{this.symbolConverter(this.state.inspection_report.eksterior.kaca_lampu[e])}</td>
                              </tr>
                            )
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                    <Col>
                      <Table responsive>
                        <tbody>
                          {this.state.keys_eksterior_kaca_lampu && this.state.inspection_report && this.state.inspection_report.eksterior && this.state.inspection_report.eksterior.kaca_lampu && this.state.keys_eksterior_kaca_lampu.map((e, i) => (
                            i >= Math.floor(this.state.keys_eksterior_kaca_lampu.length / 2) && (
                              <tr>
                                <td style={{ textTransform: 'capitalize' }}>{e.replaceAll('_', ' ')}</td>
                                <td style={{ width: '50%' }}>{this.symbolConverter(this.state.inspection_report.eksterior.kaca_lampu[e])}</td>
                              </tr>
                            )
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                  <div style={{ color: 'white', fontSize: 16, marginBottom: 16 }}><strong>Eksterior - Under Body</strong></div>
                  <Row>
                    <Col>
                      <Table responsive>
                        <tbody>
                          {this.state.keys_eksterior_under_body && this.state.inspection_report && this.state.inspection_report.eksterior && this.state.inspection_report.eksterior.under_body && this.state.keys_eksterior_under_body.map((e, i) => (
                            i < Math.floor(this.state.keys_eksterior_under_body.length / 2) && (
                              <tr>
                                <td style={{ textTransform: 'capitalize' }}>{e.replaceAll('_', ' ')}</td>
                                <td style={{ width: '50%' }}>{this.symbolConverter(this.state.inspection_report.eksterior.under_body[e])}</td>
                              </tr>
                            )
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                    <Col>
                      <Table responsive>
                        <tbody>
                          {this.state.keys_eksterior_under_body && this.state.inspection_report && this.state.inspection_report.eksterior && this.state.inspection_report.eksterior.under_body && this.state.keys_eksterior_under_body.map((e, i) => (
                            i >= Math.floor(this.state.keys_eksterior_under_body.length / 2) && (
                              <tr>
                                <td style={{ textTransform: 'capitalize' }}>{e.replaceAll('_', ' ')}</td>
                                <td style={{ width: '50%' }}>{this.symbolConverter(this.state.inspection_report.eksterior.under_body[e])}</td>
                              </tr>
                            )
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                  <div style={{ color: 'white', fontSize: 16, marginBottom: 16 }}><strong>Mesin - Oli & Cairan</strong></div>
                  <Row>
                    <Col>
                      <Table responsive>
                        <tbody>
                          {this.state.keys_mesin_oli_dan_cairan && this.state.inspection_report && this.state.inspection_report.mesin && this.state.inspection_report.mesin.oli_dan_cairan && this.state.keys_mesin_oli_dan_cairan.map((e, i) => (
                            i < Math.floor(this.state.keys_mesin_oli_dan_cairan.length / 2) && (
                              <tr>
                                <td style={{ textTransform: 'capitalize' }}>{e.replaceAll('_', ' ').replace('at', 'AT')}</td>
                                <td style={{ width: '50%' }}>{this.symbolConverter(this.state.inspection_report.mesin.oli_dan_cairan[e])}</td>
                              </tr>
                            )
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                    <Col>
                      <Table responsive>
                        <tbody>
                          {this.state.keys_mesin_oli_dan_cairan && this.state.inspection_report && this.state.inspection_report.mesin && this.state.inspection_report.mesin.oli_dan_cairan && this.state.keys_mesin_oli_dan_cairan.map((e, i) => (
                            i >= Math.floor(this.state.keys_mesin_oli_dan_cairan.length / 2) && (
                              <tr>
                                <td style={{ textTransform: 'capitalize' }}>{e.replaceAll('_', ' ')}</td>
                                <td style={{ width: '50%' }}>{this.symbolConverter(this.state.inspection_report.mesin.oli_dan_cairan[e])}</td>
                              </tr>
                            )
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                  <div style={{ color: 'white', fontSize: 16, marginBottom: 16 }}><strong>Mesin - Ruang Mesin</strong></div>
                  <Row>
                    <Col>
                      <Table responsive>
                        <tbody>
                          {this.state.keys_mesin_ruang_mesin && this.state.inspection_report && this.state.inspection_report.mesin && this.state.inspection_report.mesin.ruang_mesin && this.state.keys_mesin_ruang_mesin.map((e, i) => (
                            i < Math.floor(this.state.keys_mesin_ruang_mesin.length / 2) && (
                              <tr>
                                <td style={{ textTransform: 'capitalize' }}>{e.replaceAll('_', ' ')}</td>
                                <td style={{ width: '50%' }}>{this.symbolConverter(this.state.inspection_report.mesin.ruang_mesin[e])}</td>
                              </tr>
                            )
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                    <Col>
                      <Table responsive>
                        <tbody>
                          {this.state.keys_mesin_ruang_mesin && this.state.inspection_report && this.state.inspection_report.mesin && this.state.inspection_report.mesin.ruang_mesin && this.state.keys_mesin_ruang_mesin.map((e, i) => (
                            i >= Math.floor(this.state.keys_mesin_ruang_mesin.length / 2) && (
                              <tr>
                                <td style={{ textTransform: 'capitalize' }}>{e.replaceAll('_', ' ')}</td>
                                <td style={{ width: '50%' }}>{this.symbolConverter(this.state.inspection_report.mesin.ruang_mesin[e])}</td>
                              </tr>
                            )
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                  <div style={{ color: 'white', fontSize: 16, marginBottom: 16 }}><strong>Tambahan - Kelengkapan</strong></div>
                  <Row>
                    <Col>
                      <Table responsive>
                        <tbody>
                          {this.state.keys_tambahan_kelengkapan && this.state.inspection_report && this.state.inspection_report.tambahan_kelengkapan && this.state.keys_tambahan_kelengkapan.map((e, i) => (
                            i < Math.floor(this.state.keys_tambahan_kelengkapan.length / 2) && (
                              <tr>
                                <td style={{ textTransform: 'capitalize' }}>{e.replaceAll('_', ' ')}</td>
                                <td style={{ width: '50%' }}>{this.symbolConverter(this.state.inspection_report.tambahan_kelengkapan[e])}</td>
                              </tr>
                            )
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                    <Col>
                      <Table responsive>
                        <tbody>
                          {this.state.keys_tambahan_kelengkapan && this.state.inspection_report && this.state.inspection_report.tambahan_kelengkapan && this.state.keys_tambahan_kelengkapan.map((e, i) => (
                            i >= Math.floor(this.state.keys_tambahan_kelengkapan.length / 2) && (
                              <tr>
                                <td style={{ textTransform: 'capitalize' }}>{e.replaceAll('_', ' ')}</td>
                                <td style={{ width: '50%' }}>{this.symbolConverter(this.state.inspection_report.tambahan_kelengkapan[e])}</td>
                              </tr>
                            )
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                  <div style={{ color: 'white', fontSize: 16, marginBottom: 16 }}><strong>Test Drive</strong></div>
                  <Row>
                    <Col>
                      <Table responsive>
                        <tbody>
                          {this.state.keys_test_drive && this.state.inspection_report && this.state.inspection_report.test_drive && this.state.keys_test_drive.map((e, i) => (
                            i < Math.floor(this.state.keys_test_drive.length / 2) && (
                              <tr>
                                <td style={{ textTransform: 'capitalize' }}>{e.replaceAll('_', ' ')}</td>
                                <td style={{ width: '50%' }}>{this.symbolConverter(this.state.inspection_report.test_drive[e])}</td>
                              </tr>
                            )
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                    <Col>
                      <Table responsive>
                        <tbody>
                          {this.state.keys_test_drive && this.state.inspection_report && this.state.inspection_report.test_drive && this.state.keys_test_drive.map((e, i) => (
                            i >= Math.floor(this.state.keys_test_drive.length / 2) && (
                              <tr>
                                <td style={{ textTransform: 'capitalize' }}>{e.replaceAll('_', ' ')}</td>
                                <td style={{ width: '50%' }}>{this.symbolConverter(this.state.inspection_report.test_drive[e])}</td>
                              </tr>
                            )
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                  <div style={{ color: 'white', fontSize: 16, marginBottom: 16 }}><strong>Foto Kendaraan</strong></div>
                  <Row>
                    {this.state.foto_kendaraan.map((row, idx) =>
                      <Col md="3" lg="3" style={{ textAlign: 'center', margin: '20px 0px' }}>
                        <Row style={{ marginBottom: 16 }}>
                          <Col style={{ textAlign: 'center' }}>
                            <img key={idx} src={row.image_view_file} height="175"></img>
                          </Col>
                        </Row>
                        <span style={{ color: 'white' }}>Keterangan: {this.state.inspection_report.foto_kendaraan && this.state.inspection_report.foto_kendaraan.catatan && this.state.inspection_report.foto_kendaraan.catatan[idx] !== undefined && this.state.inspection_report.foto_kendaraan.catatan[idx].catatan}</span>
                      </Col>
                    )}
                  </Row>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default InspectionReport;
