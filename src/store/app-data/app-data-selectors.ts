import { NameSpace } from '../../constants';
import { State } from '../../types/state';
import { Quest } from '../../types/types';

export const getQuests = (state: State): Quest[] => state[NameSpace.Data].quests;
export const getQuestsDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isQuestsDataLoading;
