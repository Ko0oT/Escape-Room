import { createReducer } from '@reduxjs/toolkit';
import { Quest } from '../types/types';
import { loadQuests, setQuestsDataLoadingStatus } from './action';

type InitialState = {
  quests: Quest[];
  isQuestsDataLoading: boolean;
}

const initialState: InitialState = {
  quests: [],
  isQuestsDataLoading: false
};

export const reducer = createReducer(initialState, (builfer) => {
  builfer
    .addCase(loadQuests, (state, action) => {
      state.quests = action.payload;
    })
    .addCase(setQuestsDataLoadingStatus, (state, action) => {
      state.isQuestsDataLoading = action.payload;
    });
});
