import css from './ImageGalleryItem.module.css';
import React, { Component } from 'react';
import shortid from 'shortid';

export default class ImageGallery extends Component {
  elClick = e => {
    this.props.toggleModal(this.props.largeImageURL);
  };

  render() {
    const { id, webformatURL, largeImageURL } = this.props;
    return (
      <>
        <li
          className={css.ImageGalleryItem}
          key={shortid.generate()}
          onClick={this.elClick}
        >
          <img
            className={css.ImageGalleryItem_image}
            src={webformatURL}
            alt={id}
            srcSet={largeImageURL}
          />
        </li>
      </>
    );
  }
}
