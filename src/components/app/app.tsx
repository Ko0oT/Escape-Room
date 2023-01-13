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

function App(): JSX.Element {
  const hasAccess = true;
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
              <PrivateRoute hasAccess={hasAccess}>
                <Booking />
              </PrivateRoute>
            }
          />
          <Route
            path='/my-quests'
            element={
              <PrivateRoute hasAccess={hasAccess}>
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
