/** @format */

import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserRedux.scss";
import { LANGUAGES } from "../../../utils/";
import * as actions from "../../../store/actions";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app
class UserRedux extends Component {
      constructor(props) {
            super(props);
            this.state = {
                  genderArr: [],
                  positionArr: [],
                  roleArr: [],
                  previewImgURL: "",
                  isOpen: false,
            };
      }

      async componentDidMount() {
            this.props.getGenderStart();
            this.props.getPositionStart();
            this.props.getRoleStart();
            // try {
            //       let res = await getAllCodeService("gender");
            //       if (res && res.errCode === 0) {
            //             this.setState({
            //                   genderArr: res.data,
            //             });
            //       }
            // } catch (e) {
            //       console.log(e);
            // }
      }

      componentDidUpdate(prevProps, prevState, snapshot) {
            //render => didupdate
            //hiện tại(this) và quá khứ (previous)
            //[] [3]
            if (prevProps.genderRedux !== this.props.genderRedux) {
                  this.setState({
                        genderArr: this.props.genderRedux,
                  });
            }
            if (prevProps.positionRedux !== this.props.positionRedux) {
                  this.setState({
                        positionArr: this.props.positionRedux,
                  });
            }
            if (prevProps.roleRedux !== this.props.roleRedux) {
                  this.setState({
                        roleArr: this.props.roleRedux,
                  });
            }
      }

      Loading = () => {
            return (
                  <div className='col-12'>
                        <span className='fa fa-spinner fa-pulse fa-3x fa-fw text-primary'></span>
                        <p>Loading . . .</p>
                  </div>
            );
      };
      handleOnchangeImage = (event) => {
            let data = event.target.files;
            let file = data[0];
            if (file) {
                  let objectUrl = URL.createObjectURL(file);
                  this.setState({
                        previewImgURL: objectUrl,
                  });
            }

            // console.log("checking file 0 : ", objectUrl);
      };

      openPreviewImage = () => {
            if (!this.state.previewImgURL) return null;
            this.setState({
                  isOpen: true,
            });
      };
      render() {
            let genders = this.state.genderArr;
            let positions = this.state.positionArr;
            let roles = this.state.roleArr;
            // let genders = this.props.genderRedux;
            let language = this.props.language;
            let isLoadingGenderReact = this.props.isLoadingGender;
            console.log("hoidanit check props from redux : ", this.props);
            return (
                  <div className='user-redux-container'>
                        <div className='title'>User Redux Hỏi Dân IT YouTuBe Channel</div>
                        <div className='title'>{isLoadingGenderReact === true ? <this.Loading /> : ""}</div>
                        <div className='user-redux-body'>
                              <div className='container'>
                                    <div className='row'>
                                          <div className='col-12 my-3'>
                                                <FormattedMessage id='manage-user.add' />
                                          </div>
                                          <div className='col-3'>
                                                <label>
                                                      <FormattedMessage id='manage-user.email' />
                                                </label>
                                                <input className='form-control' type='email' />
                                          </div>
                                          <div className='col-3'>
                                                <label>
                                                      <FormattedMessage id='manage-user.password' />
                                                </label>
                                                <input className='form-control' type='password' />
                                          </div>
                                          <div className='col-3'>
                                                <label>
                                                      <FormattedMessage id='manage-user.first-name' />
                                                </label>
                                                <input className='form-control' type='text' />
                                          </div>
                                          <div className='col-3'>
                                                <label>
                                                      <FormattedMessage id='manage-user.last-name' />
                                                </label>
                                                <input className='form-control' type='text' />
                                          </div>
                                          <div className='col-3'>
                                                <label>
                                                      <FormattedMessage id='manage-user.phone-number' />
                                                </label>
                                                <input className='form-control' type='text' />
                                          </div>
                                          <div className='col-9'>
                                                <label>
                                                      <FormattedMessage id='manage-user.address' />
                                                </label>
                                                <input className='form-control' type='text' />
                                          </div>
                                          <div className='col-3'>
                                                <label>
                                                      <FormattedMessage id='manage-user.gender' />
                                                </label>
                                                <select className='form-control'>
                                                      {genders &&
                                                            genders.length > 0 &&
                                                            genders.map((item, index) => {
                                                                  return <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>;
                                                            })}
                                                </select>
                                          </div>
                                          <div className='col-3'>
                                                <label>
                                                      <FormattedMessage id='manage-user.position' />
                                                </label>
                                                <select className='form-control'>
                                                      {positions &&
                                                            positions.length > 0 &&
                                                            positions.map((item, index) => {
                                                                  return <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>;
                                                            })}
                                                </select>
                                          </div>
                                          <div className='col-3'>
                                                <label>
                                                      <FormattedMessage id='manage-user.role' />
                                                </label>
                                                <select className='form-control'>
                                                      {roles &&
                                                            roles.length > 0 &&
                                                            roles.map((item, index) => {
                                                                  return <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>;
                                                            })}
                                                </select>
                                          </div>
                                          <div className='col-3'>
                                                <label>
                                                      <FormattedMessage id='manage-user.image' />
                                                </label>
                                                <div className='preview-img-container'>
                                                      <input id='previewImg' type='file' hidden onChange={(event) => this.handleOnchangeImage(event)} />
                                                      <label className='label-upload' htmlFor='previewImg'>
                                                            Tải ảnh <i class='fa fa-upload' aria-hidden='true'></i>
                                                      </label>
                                                      <div
                                                            className='preview-image'
                                                            style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                                            onClick={() => {
                                                                  this.openPreviewImage();
                                                            }}></div>
                                                </div>
                                          </div>
                                          <div className='col-12 mt-3'>
                                                <button className='btn btn-primary '>
                                                      <FormattedMessage id='manage-user.save' />
                                                </button>
                                          </div>
                                    </div>
                              </div>
                        </div>
                        {this.state.isOpen === true && <Lightbox mainSrc={this.state.previewImgURL} onCloseRequest={() => this.setState({ isOpen: false })} />}
                  </div>
            );
      }
}

const mapStateToProps = (state) => {
      return {
            language: state.app.language,
            genderRedux: state.admin.genders,
            positionRedux: state.admin.positions,
            roleRedux: state.admin.roles,
            isLoadingGender: state.admin.isLoadingGender,
      };
};

const mapDispatchToProps = (dispatch) => {
      return {
            getGenderStart: () => dispatch(actions.fetchGenderStart()),
            getPositionStart: () => dispatch(actions.fetchPositionStart()),
            getRoleStart: () => dispatch(actions.fetchRoleStart()),
      };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
