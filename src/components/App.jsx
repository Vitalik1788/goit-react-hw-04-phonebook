import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Container, Title, ContactListTitle } from './App/App.styled';
import Form from './Form/Form';
import ContactsList from './Contact__List/Contact__List';
import Filter from './Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState(localStoragePageStart());
  const [filter, setFilter] = useState('');

  function localStoragePageStart() {
    const userContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(userContacts);
    return parsedContacts;
  }

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const normalizedName = name.toLowerCase().trim();

    if (
      contacts.find(contact => contact.name.toLowerCase() === normalizedName)
    ) {
      return alert(`${name} is already in contacts!`);
    }
    setContacts(prevState => [contact, ...prevState]);
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const onFilteredContact = () => {
    const normalizedFilter = filter.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContact = onFilteredContact();

  return (
    <Container>
      <Title>My Phonebook</Title>

      <Form onFormSubmit={addContact} />

      <ContactListTitle> My contacts list</ContactListTitle>

      <Filter value={filter} onChange={e => setFilter(e.currentTarget.value)} />

      <ContactsList
        contacts={filteredContact}
        onDeleteContact={deleteContact}
      />
    </Container>
  );
};

export default App;
