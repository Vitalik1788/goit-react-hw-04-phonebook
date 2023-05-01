import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  FormContainer,
  NameFormLabel,
  FormNameInput,
  FormSubmitBtn,
  NumberFormLabel,
  FormNumberInput,
} from './Form.styled';

class Form extends Component {

  static propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
  }

  state = {
    name: '',
    number: '',
  }

  onInputChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value})
  }

  onSubmitForm = e => {
    e.preventDefault();
    const { name, number } = this.state;
    this.props.onFormSubmit(name, number);
    this.reset();
  }

  reset = () => {
    this.setState({
      name: '',
      number: '',});
  }

  render() {
    return (
      <FormContainer autoComplete="off" onSubmit={this.onSubmitForm}>
        <NameFormLabel htmlFor="name"> Name </NameFormLabel>
        <FormNameInput
              id='name'
              type="text"
              name="name"
              value={this.state.name}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              placeholder="Enter name"
              onChange={this.onInputChange}
            />
        <NumberFormLabel htmlFor="number">Phone number</NumberFormLabel>
        <FormNumberInput
          id='number'
          type="tel"
          name="number"
          value={this.state.number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          placeholder="Enter phone number"
          onChange={this.onInputChange}
        />

        <FormSubmitBtn type="submit">Add contact</FormSubmitBtn>
        
      </FormContainer>
    )
  }
}

export default Form;
