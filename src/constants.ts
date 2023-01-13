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
