import React from 'react';
import styled from 'styled-components';

const Gallery = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ImageWrapper = styled.div`
  margin: 10px;
  border: 1px solid #ddd;
  padding: 5px;
  border-radius: 4px;
`;

const Image = styled.img`
  max-width: 100px;
  max-height: 100px;
`;

const ImageGallery = ({ images }) => {
  return (
    <Gallery>
      {images.map(image => (
        <ImageWrapper key={image.image_id}>
          <Image src={image.path} alt="Cabin Image" />
        </ImageWrapper>
      ))}
    </Gallery>
  );
};

export default ImageGallery;
