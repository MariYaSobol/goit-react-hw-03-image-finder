import css from './Searchbar.module.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FcSearch } from 'react-icons/fc';
import { toast } from 'react-toastify';

class Searchbar extends Component {
  state = {
    searchName: '',
  };

  handleInput = e => {
    this.setState({ searchName: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchName.trim() === '') {
      toast.error('Request is empty!');
      return;
    }

    this.props.onSubmit(this.state.searchName);
    this.setState({ searchName: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchForm_button}>
            <FcSearch style={{ width: '2em', height: '2em' }} />
            <span className={css.SearchForm_button_label}>Search</span>
          </button>

          <input
            className={css.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchName}
            onChange={this.handleInput}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

export default Searchbar;
