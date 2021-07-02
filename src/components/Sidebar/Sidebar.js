import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useAuthContext } from "context/authContext";

// import logo from "assets/img/reactlogo.png";

function Sidebar({ color, image, routes }) {
  const { user } = useAuthContext();
  // const location = useLocation();
  // const activeRoute = (routeName) => {
  //   return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  // };
  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        // style={{
        //   backgroundImage: "url(" + image + ")",
        // }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <a
            href="https://www.creative-tim.com?ref=lbd-sidebar"
            className="simple-text logo-mini mx-1"
          >
            <div className="logo-img">
              <img
                src={require("assets/img/reactlogo.png").default}
                alt="..."
              />
            </div>
          </a>
          <a className="simple-text" href="http://www.creative-tim.com">
            REACTJS APP
          </a>
        </div>
        <Nav>
          {routes.map((route, key) => {
            return route.roles ? (
              route.roles.indexOf(user.role) !== -1 && (
                <li key={key}>
                  <NavLink
                    to={route.layout + route.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={route.icon} />
                    <p>{route.name}</p>
                  </NavLink>
                </li>
              )
            ) : (
              <li key={key}>
                <NavLink
                  to={route.layout + route.path}
                  className="nav-link"
                  activeClassName="active"
                >
                  <i className={route.icon} />
                  <p>{route.name}</p>
                </NavLink>
              </li>
            );
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
