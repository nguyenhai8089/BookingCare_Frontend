/** @format */

import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from "../../services/userService";
import ModalUser from "./ModalUser";
import { emitter } from "../../utils/emitter";
import ModalEditUser from "./ModalEditUser";

class UserManage extends Component {
      constructor(props) {
            super(props);

            this.state = {
                  arrUsers: [],
                  isOpenModalUser: false,
                  isOpenModalEditUser: false,
                  userEdit: {},
            };
      }

      async componentDidMount() {
            await this.getAllUsersFromReact();
      }

      getAllUsersFromReact = async () => {
            let response = await getAllUsers("ALL");
            // console.log('get user from node.js : ', response);
            if (response && response.errCode === 0) {
                  this.setState(
                        {
                              arrUsers: response.users,
                        },
                        () => {
                              // console.log(this.state.arrUsers)
                        }
                  );

                  // console.log(this.state.arrUsers)
            }
      };

      handleAddNewUser = () => {
            this.setState({
                  isOpenModalUser: true,
            });
      };

      toggleUserModal = () => {
            this.setState({
                  isOpenModalUser: !this.state.isOpenModalUser,
            });
      };

      toggleUserEditModal = () => {
            this.setState({
                  isOpenModalEditUser: !this.state.isOpenModalEditUser,
            });
      };

      createNewUser = async (data) => {
            // alert('call me')
            try {
                  let response = await createNewUserService(data);
                  console.log("response create user: ", response);
                  if (response && response.errCode !== 0) {
                        alert(response.errMessage);
                  } else {
                        await this.getAllUsersFromReact();
                        this.setState({
                              isOpenModalUser: false,
                        });
                        // emitter.emit('Event_Clear_Modal_Data',{'id':'your id'})
                        emitter.emit("Event_Clear_Modal_Data");
                  }
            } catch (e) {
                  console.log(e);
            }

            console.log("check data from child: ", data);
      };

      handleDeleteUser = async (user) => {
            try {
                  let response = await deleteUserService(user.id);
                  if (response && response.errCode !== 0) {
                        alert(response.errMessage);
                  } else {
                        await this.getAllUsersFromReact();
                  }
            } catch (e) {
                  console.log(e);
            }
            alert("click delete");
            console.log("check id delete: ", user.id);
      };

      /** Life cycle
       * Run component+
       * 1. Run constructor ->init state
       * 2. Did mount (set state)
       * 3. Render
       *
       */
      handleEditUser = (user) => {
            console.log("check edit user: ", user);
            this.setState({
                  isOpenModalEditUser: true,
                  userEdit: user,
            });
      };

      doEditUser = async (user) => {
            try {
                  let res = await editUserService(user);
                  console.log("click save user: ", res);
                  if (res && res.errCode !== 0) {
                        alert(res.errMessage);
                  } else {
                        await this.getAllUsersFromReact();
                        this.setState({
                              isOpenModalEditUser: false,
                        });
                  }
            } catch (e) {
                  console.log(e);
            }
      };
      render() {
            // console.log('check render', this.state)
            let arrUsers = this.state.arrUsers;
            return (
                  <div className='users-container'>
                        <ModalUser
                              isOpen={this.state.isOpenModalUser}
                              toggleFromParent={this.toggleUserModal}
                              createNewUser={this.createNewUser} // truyền hàm thuần không có () sẽ ok nếu chuyền thêm dấu () sẽ gây lỗi.
                        />
                        {this.state.isOpenModalEditUser && (
                              <ModalEditUser
                                    isOpen={this.state.isOpenModalEditUser}
                                    toggleFromParent={this.toggleUserEditModal}
                                    currentUser={this.state.userEdit}
                                    editUser={this.doEditUser}
                                    // createNewUser = {this.createNewUser} // truyền hàm thuần không có () sẽ ok nếu chuyền thêm dấu () sẽ gây lỗi.
                              />
                        )}

                        <div className='title text-center'>Manage users with react </div>
                        <div className='mx-1'>
                              <button className='btn btn-primary px-3' onClick={() => this.handleAddNewUser()}>
                                    <i className='fas fa-plus mx-1'></i>Add new users
                              </button>
                        </div>
                        <div className='users-table mt-3 mx-1'>
                              <table id='customers'>
                                    <tbody>
                                          <tr>
                                                <th>Email</th>
                                                <th>First name</th>
                                                <th>Last name</th>
                                                <th>Address</th>
                                                <th>Actions</th>
                                          </tr>

                                          {arrUsers &&
                                                arrUsers.map((item, index) => {
                                                      // console.log('eric check map',item, index)
                                                      return (
                                                            <tr key={index}>
                                                                  <td>{item.email}</td>
                                                                  <td>{item.firstName}</td>
                                                                  <td>{item.lastName}</td>
                                                                  <td>{item.address}</td>
                                                                  <td>
                                                                        <button className='btn-edit' onClick={() => this.handleEditUser(item)}>
                                                                              <i className='fas fa-pencil-alt'></i>
                                                                        </button>
                                                                        <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}>
                                                                              <i className='fas fa-trash-alt'></i>
                                                                        </button>
                                                                  </td>
                                                            </tr>
                                                      );
                                                })}
                                    </tbody>
                              </table>
                        </div>
                  </div>
            );
      }
}

const mapStateToProps = (state) => {
      return {};
};

const mapDispatchToProps = (dispatch) => {
      return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
