import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
// Component Imports
import Menu from "./components/menu/Menu";
import PhotoGrid from "./components/photo-grid/PhotoGrid";
import NavigationArrows from "./components/navigation-arrows/NavigationArrows";

function App() {
  const [showMenu, setShowMenu] = useState(true);
  const [loadingMenuItems, setLoadingMenuItems] = useState(true);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState({});
  const [position, setPosition] = useState(0);
  const [loadingImages, setLoadingImages] = useState(true);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePosition, setImagePosition] = useState(0);
  const [imageRow, setImageRow] = useState(0);

  // Get menu items (Photo topics);
  useEffect(() => {
    axios
      .get("http://localhost:4000/image-topics")
      .then(function (response) {
        setMenuItems(response.data.data);
        if (response.data.data.length > 0) {
          setSelectedMenuItem(response.data.data[0]);
          getImagesForTopic(response.data.data[0].slug);
        }
        setTimeout(() => {
          setLoadingMenuItems(false);
        }, 1000);
      })
      .catch(function (error) {
        alert(error.message);
      });
  }, []);

  // Listen for the key events.
  useEffect(() => {
    document.addEventListener("keydown", navigateWithArrowKeys);
    return () => document.removeEventListener("keydown", navigateWithArrowKeys);
  }, [showMenu, menuItems, position, images, imagePosition, imageRow]);

  // Get images for selected topic.
  useEffect(() => {
    getImagesForTopic(selectedMenuItem.slug);
  }, [selectedMenuItem]);

  const navigateWithArrowKeys = (event) => {
    const arrowCode = event.keyCode;

    // Down
    if (arrowCode === 40) {
      handleDown();
    }

    // Up
    if (arrowCode === 38) {
      handleUp();
    }

    // Left
    if (arrowCode === 37) {
      handleLeft();
    }

    // Right
    if (arrowCode === 39) {
      handleRight();
    }
  };

  const handleDown = () => {
    if (showMenu && position + 1 < menuItems.length) {
      var newPosition = position + 1;
      setSelectedMenuItem(menuItems[newPosition]);
      setPosition(newPosition);
    } else {
      if (imageRow > 0) {
        return;
      } else {
        var newImagePosition = imagePosition + images.length / 2;
        setImageRow(imageRow + 1);
        setSelectedImage(images[newImagePosition]);
        setImagePosition(newImagePosition);
      }
    }
  };

  const handleUp = () => {
    if (showMenu && position > 0) {
      var newPosition = position - 1;
      setSelectedMenuItem(menuItems[newPosition]);
      setPosition(newPosition);
    } else {
      if (imageRow < 1) {
        return;
      } else {
        var newImagePosition = imagePosition - images.length / 2;
        setImageRow(imageRow - 1);
        setSelectedImage(images[newImagePosition]);
        setImagePosition(newImagePosition);
      }
    }
  };

  const handleLeft = () => {
    if (!showMenu && (imagePosition === 0 || imagePosition === 10)) {
      setShowMenu(true);
      resetImageSelection();
    } else {
      var newPosition = imagePosition - 1;
      setSelectedImage(images[newPosition]);
      setImagePosition(newPosition);
    }
  };

  const handleRight = () => {
    if (showMenu) {
      setShowMenu(false);
      resetImageSelection();
      setSelectedImage(images[0]);
    } else {
      if (!isEndOfRow()) {
        var newPosition = imagePosition + 1;
        setSelectedImage(images[newPosition]);
        setImagePosition(newPosition);
      }
    }
  };

  const resetImageSelection = () => {
    setSelectedImage(null);
    setImagePosition(0);
    setImageRow(0);
    window.scroll(0, 0);
  };

  const getImagesForTopic = (slug) => {
    if (slug) {
      setLoadingImages(true);
      axios
        .get(`http://localhost:4000/images-in-topic?topic=${slug}`)
        .then(function (response) {
          if (response.data.data) {
            setImages(response.data.data);
            setLoadingImages(false);
            window.scroll(0, 0);
            setSelectedImage(null);
          }
        })
        .catch(function (error) {
          alert(error.message);
        });
    }
  };

  const isEndOfRow = () => {
    return !(
      (imageRow === 0 && imagePosition < images.length / 2 - 1) ||
      (imageRow === 1 && imagePosition !== images.length - 1)
    );
  };

  return (
    <div className="App">
      <Menu
        showMenu={showMenu}
        menuItems={menuItems}
        loadingMenuItems={loadingMenuItems}
        selectedMenuItem={selectedMenuItem}
        setSelectedMenuItem={setSelectedMenuItem}
      />
      <NavigationArrows
        showMenu={showMenu}
        loadingImages={loadingImages}
        endOfRow={isEndOfRow()}
      />
      <div
        style={{
          marginLeft: showMenu ? "15%" : "5rem",
          paddingRight: "5rem",
        }}
      >
        <PhotoGrid
          images={images}
          selectedImage={selectedImage}
          loadingImages={loadingImages}
        />
      </div>
    </div>
  );
}

export default App;
