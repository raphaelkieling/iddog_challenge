import React, { Component } from 'react';
import FeedPhotos from '../components/feed/FeedPhotos';
import FeedNavbar from '../components/feed/FeedNavbar';
import { feed as feedRequisition, feedPerCategory as feedPerCategoryRequisition } from '../api/feed';
import Loader from '../components/Loader';
import { ToastContainer, toast } from 'react-toastify';
import queryString from 'query-string';
import { isEmpty } from '../utils/object';
import Panel from 'muicss/lib/react/panel';
import { Link } from 'react-router-dom';

export default class Feed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: ['husky', 'labrador', 'hound', 'pug'],
      categorySelected: '',
      listPhotos: [],
      loading: false,
      image: undefined
    };

    this.feedPerCategory = this.feedPerCategory.bind(this);
    this.setStateForFeed = this.setStateForFeed.bind(this);
    this.feedPerCategoryLoading = this.feedPerCategoryLoading.bind(this);
    this.feed = this.feed.bind(this);
  }

  componentWillMount() {
    this.setPhotoContainerParameters();
  }

  setPhotoContainerParameters() {
    //use to get parameters in url
    const image = queryString.parse(this.props.location.search);
    
    if (!isEmpty(image))
      this.feedPerCategory(image.category)
        .then(() => {
          image['href'] = this.state.listPhotos[image.id];

          this.setState({
            image
          });
        });
  }

  componentDidMount() {
    this.setLoaderState(true);
    this.feed().then(() => this.setLoaderState(false));
  }


  setStateForFeed(response) {
    this.setState({
      categorySelected: response.category,
      listPhotos: [...response.list]
    });
  }

  setLoaderState(state) {
    this.setState({ loading: state });
  }

  feed() {
    return feedRequisition()
      .then(this.setStateForFeed)
      .catch(err => {
        toast('Ops... erro ao carregar o feed. Tento novamente mais tarde :)');
      });
  }

  feedPerCategory(category) {
    return feedPerCategoryRequisition(category)
      .then(this.setStateForFeed)
      .catch(err => {
        toast('Ops... erro ao carregar o feed. Tento novamente mais tarde :)');
      });
  }

  feedPerCategoryLoading(category) {
    this.setLoaderState(true);
    this.feedPerCategory(category)
      .then(() => this.setLoaderState(false));
  }

  feedContainer() {
    return (
      <div>
        <FeedNavbar categories={this.state.categories} selected={this.state.categorySelected} getCategory={this.feedPerCategoryLoading} />
        <FeedPhotos photos={this.state.listPhotos} category={this.state.categorySelected} />}
      </div>
    );
  }

  photoContainer() {
    return (
      <div className="photo__container">
        <Panel className="photo__container-panel animated fadeInRight">
          {this.state.loading
            ? <Loader />
            : <img src={this.state.image.href} alt="Cachorro"/>}

          <br />

          <Link to="/feed" onClick={() => this.setState({ image: undefined })}>
            Back to feed
          </Link>
        </Panel>
      </div>
    );
  }

  render() {
    return (
      <div className="mui-container-fluid">
        <ToastContainer />
        {this.state.loading
          ? <Loader />
          : (!this.state.image ? this.feedContainer() : this.photoContainer())
        }
      </div>
    );
  }
}


