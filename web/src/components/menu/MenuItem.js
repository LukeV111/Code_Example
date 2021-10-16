import "./../../App.css";
import React from "react";
import PropTypes from "prop-types";

function MenuItem(props) {
  const { item, selectedMenuItem } = props;

  return (
    <div
      className={
        selectedMenuItem.slug === item.slug
          ? "Menu-Item-Container-Selected"
          : "Menu-Item-Container"
      }
    >
      <p
        className={
          selectedMenuItem.slug === item.slug
            ? "Menu-Text-Selected"
            : "Menu-Text"
        }
      >
        {item.title}
      </p>
    </div>
  );
}

MenuItem.propTypes = {
  item: PropTypes.object.isRequired,
  selectedMenuItem: PropTypes.object.isRequired,
};


export default MenuItem;
