import "./../../App.css";
import React from "react";
import Photo from "./Photo";
import PropTypes from "prop-types";

function PhotoGrid(props) {
  const { images, loadingImages, selectedImage } = props;

  return (
    <div>
      {loadingImages ? (
        <div className="Loader-Container">
          <div className="Loader" />
        </div>
      ) : (
        <>
          <div className="Image-Grid-Container">
            {images &&
              images.slice(0, images.length / 2).map((item, index) => (
                <div key={index}>
                  <Photo
                    selected={selectedImage?.id === item.id}
                    image={item}
                  />
                </div>
              ))}
          </div>
          <div className="Image-Grid-Container">
            {images &&
              images
                .slice(images.length / 2, images.length)
                .map((item, index) => (
                  <div key={index}>
                    <Photo
                      image={item}
                      selected={selectedImage?.id === item.id}
                    />
                  </div>
                ))}
          </div>
        </>
      )}
    </div>
  );
}

Photo.propTypes = {
  images: PropTypes.array,
  loadingImages: PropTypes.bool,
  selectedImage: PropTypes.object,
};


export default PhotoGrid;
