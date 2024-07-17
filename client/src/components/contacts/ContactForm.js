import { useContext, useEffect, useState } from "react";
import contactContext from "../../contexts/contact/contactContext";

const ContactForm = (props) => {
  const { current, addContact, updateContact, clearCurrent } =
    useContext(contactContext);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });

  useEffect(() => {
    if (current !== null) setContact(current);
  }, current);

  const formAction = (e) => {
    setContact((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (current == null) addContact(contact);
    else updateContact(contact);

    clearAll();
  };

  const clearAll = (e) => {
    clearCurrent();
    setContact({
      name: "",
      email: "",
      phone: "",
      type: "personal",
    });
  };

  const { name, email, phone, type } = contact;
  return (
    <>
      <form onSubmit={submitForm}>
        <h2 className="text-primary">{current ? "Edit" : "Add"} Contact</h2>
        <input
          type="text"
          placeholder="name"
          value={name}
          name="name"
          onChange={formAction}
        />
        <input
          type="text"
          placeholder="email"
          value={email}
          name="email"
          onChange={formAction}
        />
        <input
          type="text"
          placeholder="phone"
          value={phone}
          name="phone"
          onChange={formAction}
        />
        <h5>Contact Type</h5>
        <input
          type="radio"
          name="type"
          value="personal"
          checked={type === "personal"}
          onChange={formAction}
        />
        {" Personal"}
        <input
          type="radio"
          name="type"
          value="professional"
          checked={type === "professional"}
          onChange={formAction}
        />
        {" Professional"}

        <div>
          <input
            type="submit"
            value={current ? "Update Contact" : "Add Contact"}
            className="btn btn-primary btn-block"
          />
        </div>
        {current && (
          <div>
            <button className="btn btn-light btn-block" onClick={clearAll}>
              Clear Form
            </button>
          </div>
        )}
      </form>
    </>
  );
};

export default ContactForm;
