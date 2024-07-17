import { useReducer } from "react";
import axios from "axios";
import { v4 } from "uuid";
import contactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  CLEAR_FILTER,
  CONTACT_ERROR,
  GET_CONTACT,
  CLEAR_CONTACT,
} from "../types";

const ContactState = (props) => {
  const initState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(contactReducer, initState);
  // Get Contact
  const getContacts = async () => {
    try {
      const res = await axios.get("/api/contacts");
      dispatch({ type: GET_CONTACT, payload: res.data });
    } catch (error) {}
  };

  // ADD Contact
  const addContact = async (contact) => {
    try {
      const res = await axios.post("/api/contacts", contact);
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  };

  // Delete Contact
  const deleteContact = async (id) => {
    try {
      await axios.delete("/api/contacts/" + id);
      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  };

  // Set Current Contact
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  // Clear Current Contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT, payload: null });
  };

  // Update Contact
  const updateContact = async (contact) => {
    try {
      const res = await axios.put(`/api/contacts/${contact._id}`, contact);
      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  };

  // Filter Contacts
  const filterContact = (text) => {
    dispatch({ type: FILTER_CONTACT, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER, payload: null });
  };

  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACT, payload: null });
  };
  return (
    <contactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        getContacts,
        addContact,
        updateContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        filterContact,
        clearFilter,
        clearContacts,
      }}
    >
      {props.children}
    </contactContext.Provider>
  );
};

export default ContactState;
