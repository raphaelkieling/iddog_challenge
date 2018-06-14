import React from 'react';

const FeedPhotos = ({ photos }) => (
  <div className="feed__photos-container">
    {photos.map((photo, i) =>
      <img key={i} src={photo} alt="Cachorro" />
    )}
  </div>
);

export default FeedPhotos;
