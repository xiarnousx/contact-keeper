import { useContext, useEffect, useRef } from "react";
import contactContext from "../../contexts/contact/contactContext";

const ContactFilter = ({}) => {
  const contactCtx = useContext(contactContext);
  const text = useRef();

  useEffect(() => {
    if (contactCtx.filtered === null) {
      text.current.value = "";
    }
  });

  const onChange = (e) => {
    if (text.current.value !== "") {
      contactCtx.filterContact(e.target.value);
    } else {
      contactCtx.clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type="text"
        placeholder="Filter Contacts..."
        onChange={onChange}
      />
    </form>
  );
};

export default ContactFilter;
