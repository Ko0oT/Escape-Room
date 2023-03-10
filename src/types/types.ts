import { LatLngTuple } from 'leaflet';
import { Location as LocationRouter } from 'react-router-dom';
import {DifficultyLevel, QuestDate, QuestGenre} from './../constants';

export type Location = {
  id: number;
  address: string;
  coords: LatLngTuple;
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

export type FormControllableInput = {
  date: 'today' | 'tomorrow' | undefined;
  time: string | undefined;
  locationId: number | undefined;
  questId: number;
  id: number;
}

export type FormUncontrollableInput = {
  contactPerson: string;
  phone: string;
  withChildren: boolean;
  peopleCount: number;
}

export type LocationProps = {
  state: {
    from: LocationRouter;
  };
};
