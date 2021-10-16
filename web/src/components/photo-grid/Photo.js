import "./../../App.css";
import React, { useState, useRef, useEffect } from "react";
import { Blurhash } from "react-blurhash";
import PropTypes from "prop-types";

function Photo(props) {
  const { image, selected } = props;
  const [loaded, setLoaded] = useState(false);
  const imageDimension = window.innerHeight * 0.45;
  const myRef = useRef(null);

  const scrollToRef = (ref) => {
    ref.current.scrollIntoView({ behaviour: "smooth", block: "end" });
  };

  const executeScroll = () => {
    scrollToRef(myRef);
  };

  useEffect(() => {
    if (!selected) {
      return;
    }
    executeScroll();
  }, [selected]);

  return (
    <div style={{ paddingLeft: 20 }} ref={myRef}>
      <div>
        <img
          style={{
            backgroundColor: `${image.color}`,
            display: loaded ? "block" : "none",
            height: loaded ? imageDimension : 0,
            width: loaded
              ? !selected
                ? imageDimension
                : imageDimension - 4
              : 0,
          }}
          onLoad={() => {
            setTimeout(() => {
              setLoaded(true);
            }, 1000);
          }}
          alt={image.description}
          className={selected ? "Selected-Image" : "Image"}
          src={image.url}
        />
      </div>
      {image.blurHash && !loaded && (
        <div className={"Blur-Container"}>
          <Blurhash
            hash={image.blurHash}
            width={imageDimension + 2}
            height={imageDimension + 2}
            resolutionX={32}
            resolutionY={32}
            punch={1}
          />
        </div>
      )}
    </div>
  );
}

Photo.propTypes = {
  image: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
};


export default Photo;
