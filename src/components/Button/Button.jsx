import css from './Button.module.css';
import React, { Component } from 'react';

export default class Button extends Component {
  onLoadMore = e => {
    e.preventDefault();
    this.props.onClick(e);
  };

  render() {
    return (
      <button type="button" className={css.Button} onClick={this.onLoadMore}>
        Load more
      </button>
    );
  }
}
