import React, { Component } from 'react'
import FeedPhotos from '../components/feed/FeedPhotos'
import FeedNavbar from '../components/feed/FeedNavbar'
import { feed as feedRequisition, feedPerCategory as feedPerCategoryRequisition } from '../api/feed';
import Loader from '../components/Loader'

export default class Feed extends Component {
  constructor() {
    super()
    this.state = {
      categories: ['husky', 'labrador', 'hound', 'pug'],
      categorySelected: '',
      listPhotos: [],
      loading:false
    }

    this.feedPerCategory = this.feedPerCategory.bind(this)
    this.setStateForFeed = this.setStateForFeed.bind(this)
    this.feed = this.feed.bind(this) 
  }

  componentDidMount() {
    this.feed()
  }

  setStateForFeed(response) {
    this.setState({
      categorySelected: response.category,
      listPhotos: response.list.slice(0, 2)
    })

    this.setLoaderState(false)
  }

  setLoaderState(state) {
    this.setState({ loading: state })
  }

  feed() {
    this.setLoaderState(true)
    feedRequisition()
      .then(this.setStateForFeed)
      .catch(err => {
        console.log(err)
      })
  }

  feedPerCategory(category) {
    this.setLoaderState(true)
    feedPerCategoryRequisition(category)
      .then(this.setStateForFeed)
      .catch(err => {
        console.log(err)
      })
  }



  render() {
    return (
      <div className="mui-container-fluid">
        <FeedNavbar categories={this.state.categories} selected={this.state.categorySelected} getCategory={this.feedPerCategory} />
        {this.state.loading 
        ? <Loader/>
        : <FeedPhotos photos={this.state.listPhotos} />}
      </div>
    )
  }
}
