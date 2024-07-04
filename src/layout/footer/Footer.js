import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="nk-footer">
      <div className="container-fluid">
        <div className="nk-footer-wrap">
          <div className="nk-footer-copyright">
            {" "}
            &copy;<a href="https://appynex.com">اپینکس</a> ۱۴۰۱-۱۴۰۲. تمامی حقوق محفوظ است.
          </div>
          <div className="nk-footer-links">
            <ul className="nav nav-sm">
              <li className="nav-item">
                <Link
                  to={`#`}
                  className="nav-link"
                >
                  قوانین و مقررات
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  // to={`${process.env.PUBLIC_URL}/pages/terms-policy`}
                  to={`#`}
                  className="nav-link">
                  راهنما
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
