import React from "react";
import { Route, useNavigate } from "react-router-dom";
import userService from "../../services/userService";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  const currentUser = userService.getCurrentUser();
  const isBizRoute = rest.biz;
  const history = useNavigate();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!currentUser) {
          // Redirect to the signin page with a state indicating where the user tried to access
          history.push({
            pathname: "/signin",
            state: { from: props.location },
          });
          return null;
        }

        if (isBizRoute && !currentUser.biz) {
          // Redirect to a page indicating that the user doesn't have access to this route
          return <div>You do not have permission to access this page.</div>;
        }

        // Render the specified component or render function
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
