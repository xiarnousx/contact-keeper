import PropTypes from "prop-types";
import { useContext } from "react";
import contactContext from "../../contexts/contact/contactContext";

const ContactItem = ({ contact }) => {
  const contactCtx = useContext(contactContext);

  const { id, name, email, phone, type } = contact;
  const onDelete = (e) => {
    contactCtx.deleteContact(id);
    contactCtx.clearCurrent();
  };
  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{" "}
        <span
          style={{ float: "right" }}
          className={
            "badge " +
            (type === "professional" ? "badge-success" : "badge-primary")
          }
        >
          {type?.toUpperCase()}
        </span>
      </h3>
      <ul className="list">
        {email && (
          <li>
            <i className="fas fa-envelope-open"></i> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className="fas fa-phone"></i> {phone}
          </li>
        )}
      </ul>
      <button
        className="btn btn-dark btn-sm"
        onClick={(e) => contactCtx.setCurrent(contact)}
      >
        Edit
      </button>
      <button className="btn btn-danger btn-sm" onClick={onDelete}>
        Delete
      </button>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
