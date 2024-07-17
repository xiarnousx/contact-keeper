import { useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import contactContext from "../../contexts/contact/contactContext";
import ContactItem from "./ContactItem";

const Contacts = (props) => {
  const contactCtx = useContext(contactContext);
  const { contacts, filtered } = contactCtx;
  if (contacts.length === 0) {
    return <h4>Please add contacts</h4>;
  }
  return (
    <>
      <TransitionGroup>
        {filtered &&
          filtered.map((contact) => (
            <CSSTransition key={contact.id} timeout={500} classNames="item">
              <ContactItem contact={contact} />
            </CSSTransition>
          ))}
        {!filtered &&
          contacts.map((contact) => (
            <CSSTransition key={contact.id} timeout={500} classNames="item">
              <ContactItem contact={contact} />
            </CSSTransition>
          ))}
      </TransitionGroup>
    </>
  );
};

export default Contacts;
