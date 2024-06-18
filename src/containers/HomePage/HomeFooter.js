import React, { Component } from "react";
import { connect } from "react-redux";

class HomeFooter extends Component {
      changeLanguage = (language) => {
            this.props.changeLanguageAppRedux(language);
            // alert(language);
            //FIRE REDUX EVENT :ACTIONS
      };
      render() {
            return (
                  <div className="home-footer">
                        <p>
                              &copy; 2024 vietnam.com More information, please
                              visit my youtube chanel. &#11162;&#11162;&#11162;
                              <a
                                    target="_blank"
                                    href="https://www.youtube.com/watch?v=P0EbNJPbJmA"
                              >
                                    Click here !!!
                              </a>
                              &#11160;&#11160;&#11160;
                        </p>
                  </div>
            );
      }
}

const mapStateToProps = (state) => {
      return {
            isLoggedIn: state.user.isLoggedIn,
            language: state.app.language,
      };
};

const mapDispatchToProps = (dispatch) => {
      return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
