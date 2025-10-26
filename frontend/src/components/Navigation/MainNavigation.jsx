import { Link } from "react-router-dom";
import { useState } from "react";
import MainHeader from "./MainHeader.jsx";
import NavLinks from "./NavLinks.jsx";
import SideDrawer from "./SideDrawer.jsx";
import Backdrop from "../UI/Backdrop.jsx";
import "./MainNavigation.css";

const MainNavigation = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };
  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };
  return (
    <>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}

      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <h1 className="main-navigation__title">
          <Link to="/">Travel Journal</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
