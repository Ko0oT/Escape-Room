import { createReducer } from '@reduxjs/toolkit';
import { quests } from './../mocks/data';
import { getAllQuests } from './action';

const initialState = {
  quests: quests
};

export const reducer = createReducer(initialState, (builfer) => {
  builfer
    .addCase(getAllQuests, (state) => {
      state.quests = quests;
    });
});
