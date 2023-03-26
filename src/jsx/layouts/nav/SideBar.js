/// Menu
import MetisMenu from "metismenujs";
import React, { Component } from "react";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
/// Link
import { Link } from "react-router-dom";

class MM extends Component {
  componentDidMount() {
    this.$el = this.el;
    this.mm = new MetisMenu(this.$el);
  }
  componentWillUnmount() {}
  render() {
    return (
      <div className="mm-wrapper">
        <ul className="metismenu" ref={(el) => (this.el = el)}>
          {this.props.children}
        </ul>
      </div>
    );
  }
}

class SideBar extends Component {
  /// Open menu
  componentDidMount() {
    // sidebar open/close
    var btn = document.querySelector(".nav-control");
    var aaa = document.querySelector("#main-wrapper");
    function toggleFunc() {
      return aaa.classList.toggle("menu-toggle");
    }
    btn.addEventListener("click", toggleFunc);
  }
  state = {
    loveEmoji: false,
  };
  render() {
    /// Path
    let path = window.location.pathname;
    path = path.split("/");
    path = path[path.length - 1];

    /// Active menu
    let dashBoard = [
        "",
            "patient-list",
        "patient-details",
        "doctor-list",
        "doctor-details",
        "reviews",
        "task",
      ],
      users = [
        "users",
      ],
      email = ["email-compose", "email-inbox", "email-read"],
      shop = [
        "ecom-product-grid",
        "ecom-product-list",
        "ecom-product-list",
        "ecom-product-order",
        "ecom-checkout",
        "ecom-invoice",
        "ecom-customers",
        "ecom-product-detail",
      ],
      charts = [
        "chart-rechart",
        "chart-flot",
        "chart-chartjs",
        "chart-chartist",
        "chart-sparkline",
        "chart-apexchart",
      ],
      bootstrap = [
        "ui-accordion",
        "ui-badge",
        "ui-alert",
        "ui-button",
        "ui-modal",
        "ui-button-group",
        "ui-list-group",
        "ui-media-object",
        "ui-card",
        "ui-carousel",
        "ui-dropdown",
        "ui-popover",
        "ui-progressbar",
        "ui-tab",
        "ui-typography",
        "ui-pagination",
        "ui-grid",
      ],
      plugins = [
        "uc-select2",
        "uc-nestable",
        "uc-sweetalert",
        "uc-toastr",
        "uc-noui-slider",
        "map-jqvmap",
        //"post",
      ],
      redux = ["todo", "form-redux", "form-redux-wizard"],
      widget = ["widget-basic"],
      forms = [
        "form-element",
        "form-wizard",
        "form-editor-summernote",
        "form-pickers",
        "form-validation-jquery",
      ],
      table = [
        "table-bootstrap-basic",
        "table-datatable-basic",
        "table-sorting",
        "table-filtering",
      ],
      pages = [
        "page-register",
        "page-login",
        "page-lock-screen",
        "page-error-400",
        "page-error-403",
        "page-error-404",
        "page-error-500",
        "page-error-503",
      ],
      error = [
        "page-error-400",
        "page-error-403",
        "page-error-404",
        "page-error-500",
        "page-error-503",
      ];

    return (
      <div className="deznav">
        <PerfectScrollbar className="deznav-scroll">
          <MM className="metismenu" id="menu">
            <li className={`${dashBoard.includes(path) ? "mm-active" : ""}`}>
              <Link className="has-arrow ai-icon" to="#">
                <i className="flaticon-381-networking"></i>
                <span className="nav-text">Dashboard</span>
              </Link>
              <ul>
                <li>
                  <Link
                    className={`${path === "" ? "mm-active" : ""}`}
                    to="/"
                    onClick={() => this.props.onClick3()}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${path === "" ? "mm-active" : ""}`}
                    to="/users"
                    onClick={() => this.props.onClick3()}
                  >
                    User
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${path === "" ? "mm-active" : ""}`}
                    to="/companies"
                    onClick={() => this.props.onClick3()}
                  >
                    companies
                  </Link>
                </li>
              </ul>
            </li>
          
            
          </MM>
          <div className="plus-box">
            <p className="fs-16 font-w500 mb-1">Check your job schedule</p>
            <Link to={"#"} className="text-white fs-26">
              <i className="las la-long-arrow-alt-right" />
            </Link>
          </div>
          <div className="copyright">
            <p>
              <strong>Eres Hospital Admin Dashboard</strong> © 2021 All Rights
              Reserved
            </p>
            <p>
              Made with{" "}
              <span
                className={`${
                  this.state.loveEmoji ? "heart heart-blast" : "heart"
                }`}
                onClick={() =>
                  this.setState({ loveEmoji: !this.state.loveEmoji })
                }
              ></span>{" "}
              by DexignZone
            </p>
          </div>
        </PerfectScrollbar>
      </div>
    );
  }
}

export default SideBar;
