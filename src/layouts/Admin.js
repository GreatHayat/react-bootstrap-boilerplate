import React from "react";
import { useLocation, Route, Switch } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import PrivateRoute from "components/hoc/privateRoute";
import routes from "routes";
import { ROLES } from "utils/constants";

function Admin() {
  const location = useLocation();
  const mainPanel = React.useRef(null);
  const getRoutes = (routes) => {
    return routes.map((route, key) => {
      if (route.layout === "/appcountants") {
        return route.routeType === "public" ? (
          <Route
            path={route.layout + route.path}
            component={route.component}
            key={key}
          />
        ) : (
          <PrivateRoute
            path={route.layout + route.path}
            component={route.component}
            roles={route.roles || [ROLES.SUPER, ROLES.ADMIN, ROLES.USER]}
          />
        );
      } else {
        return null;
      }
    });
  };
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  }, [location]);
  return (
    <>
      <div className="wrapper">
        <Sidebar color="azure" routes={routes} />
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="content">
            {/* <Routes /> */}
            <Switch>{getRoutes(routes)}</Switch>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Admin;
