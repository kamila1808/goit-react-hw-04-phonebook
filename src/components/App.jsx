import { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import Notiflix from 'notiflix';

const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  );
  const [filter, setFilter] = useState(' ');


  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);


  const addContact = newContact => {
    const FoundContact = contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (FoundContact) {
      Notiflix.Notify.failure(`${newContact.name} is already in contacts`);
      return;
    }
    setContacts([...contacts, newContact]);
  };


  const deleteContact = ({ id }) => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };


  const filterChange = event => {
    setFilter(event.target.value);
  };

  const filterContacts = () => {
    const filteredContacts = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.trim().toLowerCase());
    });
    return filteredContacts;
  };


  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} contacts={contacts} />
      <h2>Contacts</h2>
      <Filter filterChange={filterChange} />
      {contacts.length > 0 && (
        <ContactList
          contacts={filterContacts()}
          deleteContact={deleteContact}
          filter={filter}
        />
      )}
    </div>
  );
};

export default App;
