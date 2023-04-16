import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';

class App extends Component {
  state = {
    searchName: '',
    searchArr: [],
    showModal: false,
    pickedImg: '',
    currentPage: 1,
    totalHits: null,
  };

  handleFormSubmit = searchName => {
    this.setState(({ searchArr }) => ({
      searchArr: [],
      currentPage: 1,
    }));
    this.setState({ searchName });
  };

  handlePickedImg = url => {
    this.setState({ pickedImg: url });
  };

  toggleModal = img => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      pickedImg: img,
    }));
  };

  addImages = res => {
    this.setState(({ searchArr }) => ({
      searchArr: [...searchArr, ...res],
    }));
  };

  addTotalHits = res => {
    this.setState(({ totalHits }) => ({
      totalHits: res,
    }));
  };

  loadMoreImg = e => {
    e.preventDefault();
    this.setState(({ currentPage }) => ({
      currentPage: currentPage + 1,
    }));
  };

  render() {
    const {
      searchName,
      showModal,
      pickedImg,
      currentPage,
      searchArr,
      totalHits,
    } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          searchName={searchName}
          toggleModal={this.toggleModal}
          imgPick={this.handlePickedImg}
          addImages={this.addImages}
          currentPage={currentPage}
          searchArr={searchArr}
          totalHits={this.addTotalHits}
        />
        {searchArr.length > 0 && totalHits - currentPage * 12 > 0 && (
          <Button onClick={this.loadMoreImg} />
        )}
        <ToastContainer autoClose={3000} />
        {showModal && (
          <Modal onClose={this.toggleModal} imgToShow={pickedImg} />
        )}
      </div>
    );
  }
}

export default App;
