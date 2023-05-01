import React, { Component } from "react";
import { nanoid } from 'nanoid';
import { Container, Title, ContactListTitle } from "./App/App.styled";
import Form from "./Form/Form";
import ContactsList from "./Contact__List/Contact__List";
import Filter from "./Filter/Filter";


class App extends Component {

  state = {
    contacts: [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  }

  componentDidMount() {
    const userContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(userContacts);

    if (parsedContacts) {
      this.setState({contacts: parsedContacts}) 
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
     localStorage.setItem('contacts', JSON.stringify(this.state.contacts)) 
    }
  }
  
  addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    }
    const normalizedName = name.toLowerCase().trim();
    if (this.state.contacts.find(contact => contact.name.toLowerCase() === normalizedName)) {
      return alert(`${name} is already in contacts!`);
    }

    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts]
    }))
  }  

  onFilterChange = (e) => {
    this.setState({filter: e.currentTarget.value})
  }

  deleteContact = (contactId) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId)
    }))
  }

  onFilteredContact = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase().trim();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
    
  }


  render() { 
    const { filter } = this.state;    
    const filteredContact = this.onFilteredContact();

    return (
    
      <Container>

        <Title>My Phonebook</Title>

        <Form onFormSubmit={this.addContact} />

        <ContactListTitle> My contacts list</ContactListTitle>

        <Filter value={filter} onChange={this.onFilterChange}/>

        <ContactsList contacts={filteredContact} onDeleteContact={this.deleteContact} />      
      
      </Container>)
    
  }
};

export default App;
