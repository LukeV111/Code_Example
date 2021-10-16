import "./../../App.css";
import MenuItem from "./MenuItem";
import PropTypes from "prop-types";

function Menu(props) {
  const { menuItems, loadingMenuItems, selectedMenuItem, setSelectedMenuItem } =
    props;

  return (
    <>
      {props.showMenu && (
        <div className="Menu-Container">
          {loadingMenuItems ? (
            <>
              <div className="Menu-Item-Loader" />
              <div className="Menu-Item-Loader" />
              <div className="Menu-Item-Loader" />
            </>
          ) : (
            <>
              {menuItems &&
                menuItems.map((item, index) => (
                  <div key={index}>
                    <MenuItem
                      selectedMenuItem={selectedMenuItem}
                      item={item}
                      setSelectedMenuItem={setSelectedMenuItem}
                    />
                  </div>
                ))}
            </>
          )}
        </div>
      )}
    </>
  );
}

Menu.propTypes = {
  menuItems: PropTypes.array.isRequired,
  loadingMenuItems: PropTypes.bool.isRequired,
  selectedMenuItem: PropTypes.object.isRequired,
  setSelectedMenuItem: PropTypes.func.isRequired,
};

export default Menu;
