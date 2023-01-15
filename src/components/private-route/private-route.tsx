import { Navigate, useLocation } from 'react-router-dom';
import { AuthorizationStatus } from '../../constants';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

function PrivateRoute({authorizationStatus, children}: PrivateRouteProps): JSX.Element {
  const location = useLocation();

  return authorizationStatus === AuthorizationStatus.Auth ? children : <Navigate to='/login' replace state={{from: location}}/>;
}

export default PrivateRoute;
