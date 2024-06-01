import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import {
      Button,
      Modal,
      ModalHeader,
      ModalBody,
      ModalFooter,
      Input,
} from "reactstrap";
import { emitter } from "../../utils/emitter";
import _ from "lodash";

class ModalEditUser extends Component {
      constructor(props) {
            super(props);
            this.state = {
                  id: "",
                  email: "",
                  password: "",
                  firstName: "",
                  lastName: "",
                  address: "",
            };
            // this.listenToEmitter();
      }

      componentDidMount() {
            let user = this.props.currentUser;
            // let {currentUser} = this.props;
            if (user && !_.isEmpty(user)) {
                  this.setState({
                        id: user.id,
                        email: user.email,
                        password: "hardcode",
                        firstName: user.firstName,
                        lastName: user.lastName,
                        address: user.address,
                  });
            }
            // console.log('check didMount edit modal: ', this.props.currentUser);
      }
      toggle = () => {
            this.props.toggleFromParent();
      };

      handleOnChangeInput = (event, id) => {
            // bad code
            // this.state[id] =event.target.value;
            // this.setState({
            //     ...this.state},() => {
            //         console.log('check bad state: ',this.state);
            // })
            // good code
            let copyState = { ...this.state };
            copyState[id] = event.target.value;
            console.log("check even: ", event);
            this.setState(
                  {
                        ...copyState,
                  },
                  () => {
                        // console.log('check good state: ',this.state);
                  }
            );
      };

      checkValidateInput = () => {
            let isValid = true;
            let arrInput = [
                  "email",
                  "password",
                  "firstName",
                  "lastName",
                  "address",
            ];
            for (let i = 0; i < arrInput.length; i++) {
                  console.log(
                        "check inside loop: ",
                        this.state[arrInput[i]],
                        arrInput[i]
                  );
                  if (!this.state[arrInput[i]]) {
                        isValid = false;

                        alert("missing parameter");
                        break;
                  }
            }
            return isValid;
      };

      handleSaveUser = (event) => {
            let isValid = this.checkValidateInput();
            if (isValid === true) {
                  //call API edit user
                  this.props.editUser(this.state);
                  // console.log('check props child:',this.props)
                  // console.log('data modal: ', this.state);
            }
      };

      render() {
            // console.log('check child props', this.props);
            // console.log('check child open modal', this.props.isOpen);
            console.log("check props from parent", this.props);
            return (
                  <Modal
                        isOpen={this.props.isOpen}
                        toggle={() => this.toggle()}
                        className={"modal-user-container"}
                        size="lg"
                        centered={true}
                  >
                        <ModalHeader toggle={() => this.toggle()}>
                              Edit a new user
                        </ModalHeader>
                        <ModalBody>
                              <div className="modal-user-body">
                                    <div className="input-container ">
                                          <label>Email</label>
                                          <input
                                                type="text"
                                                placeholder="Enter your email"
                                                onChange={(event) => {
                                                      this.handleOnChangeInput(
                                                            event,
                                                            "email"
                                                      );
                                                }}
                                                value={this.state.email}
                                                disabled
                                          />
                                    </div>
                                    <div className="input-container">
                                          <label>Password</label>
                                          <input
                                                type="password"
                                                placeholder="Enter your password"
                                                onChange={(event) => {
                                                      this.handleOnChangeInput(
                                                            event,
                                                            "password"
                                                      );
                                                }}
                                                value={this.state.password}
                                                disabled
                                          />
                                    </div>
                                    <div className="input-container">
                                          <label>First name</label>
                                          <input
                                                type="text"
                                                placeholder="Enter your password"
                                                onChange={(event) => {
                                                      this.handleOnChangeInput(
                                                            event,
                                                            "firstName"
                                                      );
                                                }}
                                                value={this.state.firstName}
                                          />
                                    </div>
                                    <div className="input-container">
                                          <label>Last name</label>
                                          <input
                                                type="text"
                                                placeholder="Enter your email"
                                                onChange={(event) => {
                                                      this.handleOnChangeInput(
                                                            event,
                                                            "lastName"
                                                      );
                                                }}
                                                value={this.state.lastName}
                                          />
                                    </div>
                                    <div className="input-container max-width-input">
                                          <label>Address</label>
                                          <input
                                                type="text"
                                                placeholder="Enter your password"
                                                onChange={(event) => {
                                                      this.handleOnChangeInput(
                                                            event,
                                                            "address"
                                                      );
                                                }}
                                                value={this.state.address}
                                          />
                                    </div>
                              </div>
                        </ModalBody>
                        <ModalFooter>
                              <Button
                                    color="primary"
                                    className="px-3"
                                    onClick={() => this.handleSaveUser()}
                              >
                                    Save changes
                              </Button>{" "}
                              <Button
                                    color="secondary"
                                    className="px-3"
                                    onClick={() => this.toggle()}
                              >
                                    close
                              </Button>
                        </ModalFooter>
                  </Modal>
            );
      }
}

const mapStateToProps = (state) => {
      return {};
};

const mapDispatchToProps = (dispatch) => {
      return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
