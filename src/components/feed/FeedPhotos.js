import React from 'react';

const FeedPhotos = ({ photos }) => (
  photos.map((photo, i) =>
    <img key={i} src={photo} alt="Image from feed"/>
  )
);

export default FeedPhotos;
