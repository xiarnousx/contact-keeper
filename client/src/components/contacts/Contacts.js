import { useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import contactContext from "../../contexts/contact/contactContext";
import ContactItem from "./ContactItem";
import Spinner from "../layout/Spinner";

const Contacts = (props) => {
  const contactCtx = useContext(contactContext);
  const { contacts, filtered, getContacts, loading } = contactCtx;

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

  if (contacts?.length === 0) {
    return <h4>Please add contacts</h4>;
  }

  return (
    <>
      {loading && <Spinner />}
      <TransitionGroup>
        {filtered &&
          !loading &&
          filtered?.map((contact) => (
            <CSSTransition key={contact._id} timeout={500} classNames="item">
              <ContactItem contact={contact} />
            </CSSTransition>
          ))}
        {!filtered &&
          !loading &&
          contacts?.map((contact) => (
            <CSSTransition key={contact._id} timeout={500} classNames="item">
              <ContactItem contact={contact} />
            </CSSTransition>
          ))}
      </TransitionGroup>
    </>
  );
};

export default Contacts;
