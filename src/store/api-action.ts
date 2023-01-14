import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../constants';
import { AppDispatch, State } from '../types/state';
import { loadQuests, setQuestsDataLoadingStatus } from './action';
import { AxiosInstance } from 'axios';
import { Quest } from '../types/types';


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
