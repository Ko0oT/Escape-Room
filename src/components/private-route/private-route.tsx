import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  hasAccess: boolean;
  children: JSX.Element;
}

function PrivateRoute({hasAccess, children}: PrivateRouteProps): JSX.Element {
  return hasAccess ? children : <Navigate to='/login' />;
}

export default PrivateRoute;
