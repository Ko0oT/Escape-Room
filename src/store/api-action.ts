import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, AuthorizationStatus } from '../constants';
import { AppDispatch, State } from '../types/state';
import { loadQuests, requireAuthorization, setQuestsDataLoadingStatus } from './action';
import { AxiosInstance } from 'axios';
import { Quest } from '../types/types';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { dropUser, saveUser } from '../services/user';


export const fetchQuestAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchQuests',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setQuestsDataLoadingStatus(true));
    const {data} = await api.get<Quest[]>(APIRoute.Quests);
    dispatch(setQuestsDataLoadingStatus(false));
    dispatch(loadQuests(data));
  }
);

export const checkAuth = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'checkAuth', async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  }
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveUser(data);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropUser();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
