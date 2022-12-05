
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...props }) {

  return (
    <Route>
      {localStorage.getItem('isLogged') ? <Component {...props} /> : <Redirect to="/" />}
    </Route>
  );
}

export default ProtectedRoute;

