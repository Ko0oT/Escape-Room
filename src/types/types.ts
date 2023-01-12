import {DifficultyLevel} from './../constants';

export type Quest = {
  id: number;
  title: string;
  previewImg: string;
  previewImgWebp: string;
  level: keyof typeof DifficultyLevel;
  type: string;
  peopleMinMax: number[];
}
