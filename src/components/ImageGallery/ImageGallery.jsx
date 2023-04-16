import css from './ImageGallery.module.css';
import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { Audio } from 'react-loader-spinner';
import shortid from 'shortid';

const ENDPOINT = `https://pixabay.com/api/?key=33770559-c394114938a05872ba356bd5c`;

export default class ImageGallery extends Component {
  state = {
    error: null,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.searchName !== this.props.searchName) {
      this.setState({ loading: true, error: null });
      fetch(
        `${ENDPOINT}&q=${
          this.props.searchName
        }&page=${this.props.currentPage.toString()}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            return Promise.reject(new Error('Something went wrong'));
          }
        })
        .then(res => {
          this.props.addImages(
            res.hits.map(({ id, webformatURL, largeImageURL }) => {
              return { id, webformatURL, largeImageURL };
            })
          );
          this.props.totalHits(res.totalHits);
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    } else if (prevProps.currentPage !== this.props.currentPage) {
      this.setState({ loading: true, error: null });
      fetch(
        `${ENDPOINT}&q=${
          this.props.searchName
        }&page=${this.props.currentPage.toString()}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            return Promise.reject(new Error('Something went wrong'));
          }
        })
        .then(res => {
          this.props.addImages(
            res.hits.map(({ id, webformatURL, largeImageURL }) => {
              return { id, webformatURL, largeImageURL };
            })
          );
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    const { loading, error } = this.state;
    const { searchArr } = this.props;
    return (
      <ul className={css.ImageGallery}>
        {error && (
          <li>
            <h3>There are no matches with your request</h3>
          </li>
        )}
        {loading && (
          <li>
            <Audio
              height="80"
              width="80"
              radius="9"
              color="green"
              ariaLabel="loading"
              $wrapperStyle
              $wrapperClass
            />
          </li>
        )}
        {searchArr &&
          searchArr.map(item => (
            <ImageGalleryItem
              key={shortid.generate()}
              id={item.id}
              webformatURL={item.webformatURL}
              largeImageURL={item.largeImageURL}
              toggleModal={this.props.toggleModal}
              imgPick={this.props.imgPick}
            />
          ))}
      </ul>
    );
  }
}
