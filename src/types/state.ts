import { AuthorizationStatus } from '../constants';
import { store } from '../store';
import { Quest } from './types';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
}

export type AppData = {
  quests: Quest[];
  isQuestsDataLoading: boolean;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
