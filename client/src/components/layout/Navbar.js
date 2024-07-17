import { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/auth/authContext";
import ContactContext from "../../contexts/contact/contactContext";

const Navbar = ({ title = "Contact Keeper", icon = "fas fa-id-card-alt" }) => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const { clearContacts } = useContext(ContactContext);
  const onLogout = () => {
    clearContacts();
    logout();
  };

  const authLinks = (
    <>
      <li>Hello, {user && user.name}</li>
      <li>
        <a onClick={onLogout} href="#!">
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </>
  );
  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon}></i> {title}
      </h1>
      <ul>
        {isAuthenticated && authLinks}
        {!isAuthenticated && guestLinks}
      </ul>
    </div>
  );
};

export default Navbar;
