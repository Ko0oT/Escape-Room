import { LatLngTuple } from 'leaflet';

export const DifficultyLevel = {
  easy: 'Легкий',
  medium: 'Средний',
  hard: 'Сложный',
} as const;

export const QuestDate = {
  today: 'Сегодня',
  tomorrow: 'Завтра'
} as const;

export const QuestGenre = {
  adventures: 'Приключения',
  horror: 'Ужасы',
  mystic: 'Мистика',
  detective: 'Детектив',
  'sci-fi': 'Sci-fi',
} as const;

export const AppRoute = {
  Root: '/',
  Login: '/login',
  MyQuests: '/my-quests',
  Quest: '/quest/:id',
  Booking: '/quest/:id/booking',
  About: '/about'
} as const;

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';


export const COMPANY_LOCATION: LatLngTuple = [59.968268, 30.317413];
export const COMPANY_LOCATION_ZOOM = 17;
export const DEFAULT_ZOOM = 10;
