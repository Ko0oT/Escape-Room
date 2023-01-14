import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../constants';
import { Quest } from '../types/types';

export const loadQuests = createAction<Quest[]>('loadQuests');

export const setQuestsDataLoadingStatus = createAction<boolean>('setQuestsDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');
