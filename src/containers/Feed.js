import React, { Component } from 'react'
import FeedPhotos from '../components/feed/FeedPhotos'
import FeedNavbar from '../components/feed/FeedNavbar'

export default class Feed extends Component {
  render() {
    return (
      <div>
        <FeedNavbar />
        <FeedPhotos />
      </div>
    )
  }
}
