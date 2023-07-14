import React from "react";
import "../scss/components.scss";

function Footer() {
  return (
    <footer className="footer-container">
      <div className="row">
        <div className="column">
          <div className="footer-icon">
            <img
              className="footer-logo"
              src={require("../assets/logo.png")}
              alt="Logo"
            />
            <div className="Social-icon">
              <ul>
                <li>
                  <a href="/">
                    <img
                      className="social-icon"
                      src={require("../assets/facebook.png")}
                      alt="facebook"
                    />
                  </a>
                </li>
                <li>
                  <a href="/">
                    <img
                      className="social-icon"
                      src={require("../assets/instagram.png")}
                      alt="Instagram"
                    />
                  </a>
                </li>
                <li>
                  <a href="/">
                    <img
                      className="social-icon"
                      src={require("../assets/github.png")}
                      alt="Github"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <p style={{ marginTop: "-10px", marginLeft: "5px" }}>
            &copy;{new Date().getFullYear()} Verified
          </p>
        </div>

        <div className="column">
          <h4>Resources</h4>
          <ul>
            <li>
              <a href="/">Track my order</a>
            </li>
            <li>
              <a href="/">Return policy</a>
            </li>
            <li>
              <a href="/">Shipping policy</a>
            </li>
            <li>
              <a href="/">Coupon policy and price guarantee</a>
            </li>
            <li>
              <a href="/">Terms and conditions</a>
            </li>
          </ul>
        </div>

        <div className="column">
          <h4>Contact Info</h4>
          <ul>
            <li>Address:</li>
            <li>225 Nguyen Tri Phuong</li>
            <li>District 5</li>
            <li>Ho Chi Minh City</li>
            <li>Phone:(+84)974 506 002</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
