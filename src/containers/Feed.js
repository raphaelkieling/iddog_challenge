import React, { Component } from 'react';
import FeedPhotos from '../components/feed/FeedPhotos';
import FeedNavbar from '../components/feed/FeedNavbar';
import { feed as feedRequisition, feedPerCategory as feedPerCategoryRequisition } from '../api/feed';
import Loader from '../components/Loader';
import { ToastContainer, toast } from 'react-toastify';
import { Panel } from 'muicss/react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import query from 'querystringify';
import { isEmpty } from '../utils/object';
import { connect } from 'react-redux';
import * as feedAction from '../actions/feed';

class Feed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };

    this.feedPerCategoryLoading = this.feedPerCategoryLoading.bind(this);
  }

  componentWillMount() {
    this.setPhotoContainerParameters();
  }

  setPhotoContainerParameters() {
    const image = query.parse(this.props.location.search);
    if (!isEmpty(image))
      this.props.feedPerCategory(image.category)
        .then(() => {
          this.props.getImageId(image);
        })
        .catch(err => toast.error(err.message));
  }

  componentDidMount() {
    this.setLoaderState(true);
    this.props.feed()
      .then(() => this.setLoaderState(false))
      .catch(err => toast.error(err.message));
  }

  setLoaderState(state) {
    this.setState({ loading: state });
  }

  feedPerCategoryLoading(category) {
    this.setLoaderState(true);

    this.props.feedPerCategory(category)
      .then(() => this.setLoaderState(false))
      .catch(err => toast.error(err.message));
  }

  feedContainer() {
    let { categories, listPhotos, categorySelected } = this.props;

    return (
      <div>
        <FeedNavbar categories={categories} selected={categorySelected} getCategory={this.feedPerCategoryLoading} />
        <FeedPhotos photos={listPhotos} category={categorySelected} />
      </div>
    );
  }

  photoContainer() {
    let { clearImage, image } = this.props;

    return (
      <div className="photo__container">
        <Panel className="photo__container-panel animated fadeInRight">
          {this.state.loading
            ? <Loader />
            : <img src={image.href} alt="Cachorro" />}

          <br />

          <Link to="/feed" onClick={() => clearImage()}>
            Back to feed
          </Link>
        </Panel>
      </div>
    );
  }

  render() {
    let { image } = this.props;
    return (
      <div>
        <ToastContainer />
        {this.state.loading
          ? <Loader />
          : (!image ? this.feedContainer() : this.photoContainer())
        }
      </div>
    );
  }
}

Feed.contextTypes = { store: PropTypes.object };

const mapStateToProps = state => {
  return {
    listPhotos: state.feed.listPhotos,
    categories: state.feed.categories,
    categorySelected: state.feed.categorySelected,
    image: state.feed.image
  };
};

const mapDispatchToProps = dispatch => {
  return {
    feed: () => dispatch(feedRequisition),
    clearImage: () => dispatch(feedAction.clearImage({})),
    feedPerCategory: (category) => dispatch(feedPerCategoryRequisition(category)),
    getImageId: (image) => dispatch(feedAction.getImageId(image))
  };
};

const FeedContainer = connect(mapStateToProps, mapDispatchToProps)(Feed);

export default FeedContainer;

