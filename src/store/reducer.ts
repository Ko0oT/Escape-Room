import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../constants';
import { Quest } from '../types/types';
import { loadQuests, requireAuthorization, setQuestsDataLoadingStatus } from './action';

type InitialState = {
  quests: Quest[];
  isQuestsDataLoading: boolean;
  authorizationStatus: AuthorizationStatus;
}

const initialState: InitialState = {
  quests: [],
  isQuestsDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const reducer = createReducer(initialState, (builfer) => {
  builfer
    .addCase(loadQuests, (state, action) => {
      state.quests = action.payload;
    })
    .addCase(setQuestsDataLoadingStatus, (state, action) => {
      state.isQuestsDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});
