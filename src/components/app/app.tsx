import Main from '../../pages/main/main';
import Booking from '../../pages/booking/booking';
import Contacts from '../../pages/contacts/contacts';
import Login from '../../pages/login/login';
import MyQuests from '../../pages/my-quests/my-quests';
import Quest from '../../pages/quest/quest';
import PrivateRoute from '../private-route/private-route';
import NotFound from '../../pages/not-found/not-found';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import LoadingScreen from '../loading-screen/loading-screen';
import { useAppSelector } from '../../hooks';

function App(): JSX.Element {

  const isQuestsDataLoading = useAppSelector((state) => state.isQuestsDataLoading);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  if (isQuestsDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={<Main />}
          />
          <Route
            path='/login'
            element={<Login />}
          />
          <Route
            path='/quest/:id'
            element={<Quest />}
          />
          <Route
            path='/about'
            element={<Contacts />}
          />
          <Route
            path='/quest/:id/booking'
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <Booking />
              </PrivateRoute>
            }
          />
          <Route
            path='/my-quests'
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <MyQuests />
              </PrivateRoute>
            }
          />
          <Route
            path='*'
            element={<NotFound />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
