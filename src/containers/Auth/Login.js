import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

// import * as actions from "../store/actions";
import * as actions from "../../store/actions"
import './Login.scss';
// import { FormattedMessage } from 'react-intl';
import  {handleLoginApi}  from '../../services/userService';


class Login extends Component {
    constructor(props) {
        super(props);   
        this.state={
            username:'',
            password:"",
            isShowPassword:false,
            errMessage:''
        }     
    }

    handleOnchangeUsername =(e) =>{
        this.setState({
            username:e.target.value
        })
        // console.log(e.target.value)
    }

    handleOnchangePassword =(e) =>{
        this.setState({
            password:e.target.value
        })
        // console.log(e.target.value)
    }

    handleLogin = async() =>{
        this.setState({
            errMessage:''
        })
        // alert('nguyenphuhai')
        // console.log('username : ', this.state.username, " password : ",this.state.password)
        // console.log('all state', this.state)
        try {
            let data = await handleLoginApi(this.state.username, this.state.password)
            // console.log('ok, data: ', data)
            if(data.errCode === 1 || data.errCode === 2 || data.errCode === 3){
                this.setState({
                    errMessage:data.message
                })
            }
            if(data.errCode === 0){
              this.props.userLoginSuccess (data.user)
                console.log('login success! ')
            }
        }catch(error) {
            if(error.response){
                if(error.response.data){
                    this.setState({
                        errMessage:error.response.data.message
                    })
                }
            }            
            console.log('errorMessage: ', error.response)
            
            }
        
    }

    handleShowPassword =() =>{
        this.setState({
            isShowPassword : !this.state.isShowPassword
        })
    }

    render() {
        return (
           <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content'>
                        <div className="col-12 text-login">Login</div>
                        <div className="col-12 form-group login-input">
                            <label>Username</label>
                            <input type="text" 
                                className='form-control' 
                                placeholder='Enter your username'
                                value={this.state.username}
                                onChange={(e)=>this.handleOnchangeUsername(e)}
                            />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password</label>
                            <div className='custom-input-password'>
                                <input type={this.state.isShowPassword ? 'text' : "password"} 
                                    className='form-control' 
                                    placeholder='Enter your password'
                                    value={this.state.password}
                                    onChange={(e)=>this.handleOnchangePassword(e)}
                                />
                                <span onClick={()=>{this.handleShowPassword()}}>
                                    <i className={this.state.isShowPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                                </span>                            
                            </div>                            
                        </div>
                        <div className='col-12' style={{color:'red'}}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12 '>
                            <button className="btn-login" onClick={()=>{this.handleLogin()}}>Login</button>
                        </div>                        
                        <div className='col-12 forgot-password'>
                            <span>Forgot your password?</span>
                        </div>
                        <div className='col-12 text-center'>
                            <span className='text-center'>Or login with:</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div> 
                    </div>
                </div>
           </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),        
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
