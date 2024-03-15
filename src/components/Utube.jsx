import React from 'react';

const Utube = ({ videoId, width, height }) => {
  return (
    <iframe
      width={width || '560'}
      height={height || '315'}
      src={`https://www.youtube.com/embed/${videoId}`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  );
};

export default Utube;
