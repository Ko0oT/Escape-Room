import { createAction } from '@reduxjs/toolkit';
import { Quest } from '../types/types';

export const loadQuests = createAction<Quest[]>('loadQuests');

export const setQuestsDataLoadingStatus = createAction<boolean>('setQuestsDataLoadingStatus');
