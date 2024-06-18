import React, { Component } from "react";
import { connect } from "react-redux";

class About extends Component {
      changeLanguage = (language) => {
            this.props.changeLanguageAppRedux(language);
            // alert(language);
            //FIRE REDUX EVENT :ACTIONS
      };
      render() {
            return (
                  <div className="section-share section-about">
                        <div className="section-about-header">
                              Truyền thông nói về Tôi
                        </div>
                        <div className="section-about-content">
                              <div className="content-left">
                                    <iframe
                                          width="100%"
                                          height="250"
                                          src="https://www.youtube.com/embed/hCLtgW-2yZg"
                                          title="Live Concert Hà Nội Riêng Tôi - Vũ Thắng Lợi"
                                          frameborder="0"
                                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                          referrerpolicy="strict-origin-when-cross-origin"
                                          allowfullscreen
                                    ></iframe>
                              </div>
                              <div className="content-right">
                                    <p>
                                          "Vợ hiền, bóng dáng luôn bên ta Tấm
                                          lòng ấm áp, sẻ chia nhọc nhằn Dịu dàng
                                          như hoa, mạnh mẽ như sơn Chia vui, san
                                          sẻ những lúc gian nan"
                                    </p>
                              </div>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
