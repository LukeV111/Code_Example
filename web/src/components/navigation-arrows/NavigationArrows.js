import "./../../App.css";
import React from "react";
import PropTypes from "prop-types";

function NavigationArrows(props) {
  const { showMenu, loadingImages, endOfRow } = props;

  return (
    <>
      {!showMenu && !loadingImages && (
        <div className="Navigation-Container">
          {/* Left */}
          <div className="Navigation-Left">
            <div className="Navigation-Arrow">&lt;</div>
          </div>
          {/* Right */}
          {!endOfRow && (
            <div className="Navigation-Right">
              <div className="Navigation-Arrow">&gt;</div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

NavigationArrows.propTypes = {
  showMenu: PropTypes.bool.isRequired,
  loadingImages: PropTypes.bool.isRequired,
  endOfRow: PropTypes.bool.isRequired,
};

export default NavigationArrows;
