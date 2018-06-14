import React, { Component } from 'react'
import FeedPhotos from '../components/feed/FeedPhotos'
import FeedNavbar from '../components/feed/FeedNavbar'
import { feed as feedRequisition, feedPerCategory as feedPerCategoryRequisition } from '../api/feed';

export default class Feed extends Component {
  constructor() {
    super()
    this.state = {
      categories: ['husky', 'labrador', 'hound', 'pug'],
      categorySelected: '',
      listPhotos: []
    }

    this.feedPerCategory = this.feedPerCategory.bind(this)
    this.setStateForFeed = this.setStateForFeed.bind(this)
    this.feed = this.feed.bind(this) 
  }

  setStateForFeed(response) {
    this.setState({
      categorySelected: response.category,
      listPhotos: response.list.slice(0, 2)
    })
  }

  componentDidMount() {
    // this.feed()
  }

  feed() {
    feedRequisition()
      .then(this.setStateForFeed)
      .catch(err => {
        console.log(err)
      })
  }

  feedPerCategory(category) {
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
        <FeedPhotos photos={this.state.listPhotos} />
      </div>
    )
  }
}
