import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../constants';
import { AppData } from '../../types/state';
import { fetchQuestsAction } from './../api-action';

const initialState: AppData = {
  quests: [],
  isQuestsDataLoading: false,
};

export const appData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchQuestsAction.pending, (state) => {
        state.isQuestsDataLoading = true;
      })
      .addCase(fetchQuestsAction.fulfilled, (state, action) => {
        state.quests = action.payload;
        state.isQuestsDataLoading = false;
      });
  }
});
