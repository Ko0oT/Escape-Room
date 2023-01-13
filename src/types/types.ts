import {DifficultyLevel, QuestDate, QuestGenre} from './../constants';

export type Location = {
  id: number;
  address: string;
  coords: number[];
}

export type Quest = {
  id: number;
  title: string;
  previewImg: string;
  previewImgWebp: string;
  level: keyof typeof DifficultyLevel;
  type: keyof typeof QuestGenre;
  peopleMinMax: number[];
}

export type ExtendedQuest = Quest & {
  description: string;
  coverImg: string;
  coverImgWebp: string;
}

export type BookedQuest = {
    id: number;
    date: keyof typeof QuestDate;
    time: string;
    contactPerson: string;
    phone: string;
    withChildren: boolean;
    peopleCount: number;
    location?: Location;
    quest: Quest;
}

export type Today = {
  time: string;
  isAvailable: boolean;
}

export type Tomorrow = {
  time: string;
  isAvailable: boolean;
}

export type Slots = {
  today: Today[];
  tomorrow: Tomorrow[];
}

export type BookingInfo = {
  id: number;
  locations: Location[];
  slots: Slots;
}
