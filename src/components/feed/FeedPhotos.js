import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import Modal from 'react-modal';
import query from 'querystringify';
Modal.setAppElement('body');

class FeedPhotos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      modalImage: ''
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(photo) {
    this.setState({ modalIsOpen: true, modalImage: photo });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  modalContainer() {
    let { modalImage } = this.state;
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        contentLabel="Example Modal"
        className="Modal"
        overlayClassName="Overlay"
      >
        <img src={modalImage} alt="Cachorro" className="animated fadeIn" />
      </Modal>
    );
  }

  render() {
    let { photos, category } = this.props;
    return (
      <div className="feed__photos-container">
        {this.modalContainer()}
        {photos.map((photo, i) =>
          <div key={i} className="feed__photos-photo" onClick={() => this.openModal(photo)}>
            <Link to={`/feed?` + query.stringify({ category, id: i })} >
              <LazyLoad throttle={200} height={300}>
                <img key={i} src={photo} alt="Cachorro" className="animated fadeIn" />
              </LazyLoad>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default FeedPhotos;
