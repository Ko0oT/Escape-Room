import Main from '../../pages/main/main';
import Booking from '../../pages/booking/booking';
import Contacts from '../../pages/contacts/contacts';
import Login from '../../pages/login/login';
import MyQuests from '../../pages/my-quests/my-quests';
import QuestPage from '../../pages/quest-page/quest-page';
import PrivateRoute from '../private-route/private-route';
import NotFound from '../../pages/not-found/not-found';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import LoadingScreen from '../loading-screen/loading-screen';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { checkAuthAction, fetchQuestsAction } from '../../store/api-action';
import { getQuestsDataLoadingStatus } from '../../store/app-data/app-data-selectors';
import { getAuthorizationStatus } from '../../store/user-process/user-process-selectors';

function App(): JSX.Element {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchQuestsAction());
    dispatch(checkAuthAction());
  }, []);

  const isQuestsDataLoading = useAppSelector(getQuestsDataLoadingStatus);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

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
            element={<QuestPage />}
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
            path='/404'
            element={<NotFound />}
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
