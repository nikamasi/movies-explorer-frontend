import { Navigate, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...props }) {

  return (
    <Route>
      {props.isLogged ? <Component {...props} /> : <Navigate to="/sign-in" />}
    </Route>
  );
}

export default ProtectedRoute;
