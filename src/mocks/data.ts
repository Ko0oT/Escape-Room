import { BookedQuest, BookingInfo, ExtendedQuest, Quest } from '../types/types';

export const quests: Quest[] = [
  {
    id: 1,
    title: 'Склеп',
    previewImg: 'https://grading.design.pages.academy/static/quest/crypt.jpg',
    previewImgWebp: 'https://grading.design.pages.academy/static/quest/crypt.webp',
    level: 'hard',
    type: 'adventures',
    peopleMinMax: [
      2,
      5
    ]
  },
  {
    id: 2,
    title: 'Маньяк',
    previewImg: 'https://grading.design.pages.academy/static/quest/maniac.jpg',
    previewImgWebp: 'https://grading.design.pages.academy/static/quest/maniac.webp',
    level: 'medium',
    type: 'horror',
    peopleMinMax: [
      3,
      6
    ]
  },
  {
    id: 3,
    title: 'Ритуал',
    previewImg: 'https://grading.design.pages.academy/static/quest/ritual.jpg',
    previewImgWebp: 'https://grading.design.pages.academy/static/quest/ritual.webp',
    level: 'hard',
    type: 'mystic',
    peopleMinMax: [
      3,
      5
    ]
  },
  {
    id: 4,
    title: 'Тайны старого особняка',
    previewImg: 'https://grading.design.pages.academy/static/quest/palace.jpg',
    previewImgWebp: 'https://grading.design.pages.academy/static/quest/palace.webp',
    level: 'easy',
    type: 'detective',
    peopleMinMax: [
      2,
      5
    ]
  },
  {
    id: 5,
    title: 'Хижина в лесу',
    previewImg: 'https://grading.design.pages.academy/static/quest/hut.jpg',
    previewImgWebp: 'https://grading.design.pages.academy/static/quest/hut.webp',
    level: 'medium',
    type: 'mystic',
    peopleMinMax: [
      4,
      7
    ]
  },
  {
    id: 6,
    title: 'Фатальный эксперимент',
    previewImg: 'https://grading.design.pages.academy/static/quest/experiment.jpg',
    previewImgWebp: 'https://grading.design.pages.academy/static/quest/experiment.webp',
    level: 'hard',
    type: 'adventures',
    peopleMinMax: [
      5,
      8
    ]
  },
  {
    id: 7,
    title: 'Метро 2033',
    previewImg: 'https://grading.design.pages.academy/static/quest/metro.jpg.jpg',
    previewImgWebp: 'https://grading.design.pages.academy/static/quest/metro.jpg.webp',
    level: 'medium',
    type: 'sci-fi',
    peopleMinMax: [
      6,
      8
    ]
  },
  {
    id: 8,
    title: 'Старый чердак',
    previewImg: 'https://grading.design.pages.academy/static/quest/loft.jpg',
    previewImgWebp: 'https://grading.design.pages.academy/static/quest/loft.webp',
    level: 'easy',
    type: 'detective',
    peopleMinMax: [
      2,
      3
    ]
  },
  {
    id: 9,
    title: 'Марс-2056',
    previewImg: 'https://grading.design.pages.academy/static/quest/mars.jpg',
    previewImgWebp: 'https://grading.design.pages.academy/static/quest/mars.webp',
    level: 'easy',
    type: 'sci-fi',
    peopleMinMax: [
      2,
      5
    ]
  },
  {
    id: 10,
    title: 'Последний рубеж',
    previewImg: 'https://grading.design.pages.academy/static/quest/frontier.jpg',
    previewImgWebp: 'https://grading.design.pages.academy/static/quest/frontier.webp',
    level: 'medium',
    type: 'adventures',
    peopleMinMax: [
      4,
      7
    ]
  },
  {
    id: 11,
    title: 'История призраков',
    previewImg: 'https://grading.design.pages.academy/static/quest/ghosts.jpg',
    previewImgWebp: 'https://grading.design.pages.academy/static/quest/ghosts.webp',
    level: 'easy',
    type: 'mystic',
    peopleMinMax: [
      5,
      6
    ]
  }
];

export const bookedQuests: BookedQuest[] = [
  {
    id: 3,
    date: 'today',
    time: '14:00',
    contactPerson: 'Oliver',
    phone: '899911122233',
    withChildren: true,
    peopleCount: 3,
    location: {
      id: 1,
      address: 'наб. реки Карповки 5, лит П, м. Петроградская',
      coords: [
        59.968456,
        30.31759
      ]
    },
    quest: {
      id: 1,
      title: 'Склеп',
      previewImg: 'https://grading.design.pages.academy/static/quest/crypt.jpg',
      previewImgWebp: 'https://grading.design.pages.academy/static/quest/crypt.webp',
      level: 'hard',
      type: 'horror',
      peopleMinMax: [
        2,
        5
      ]
    }
  },
  {
    id: 4,
    date: 'today',
    time: '19:00',
    contactPerson: 'Oliver',
    phone: '899911122233',
    withChildren: true,
    peopleCount: 3,
    location: {
      id: 2,
      address: 'пр. Большевиков, 18 лит. А, м. Дыбенко',
      coords: [
        59.90840521851865,
        30.48297378898692
      ]
    },
    quest: {
      id: 2,
      title: 'Маньяк',
      previewImg: 'https://grading.design.pages.academy/static/quest/maniac.jpg',
      previewImgWebp: 'https://grading.design.pages.academy/static/quest/maniac.webp',
      level: 'medium',
      type: 'horror',
      peopleMinMax: [
        3,
        6
      ]
    }
  },
  {
    id: 6,
    date: 'tomorrow',
    time: '16:00',
    contactPerson: 'Oliver',
    phone: '899911122233',
    withChildren: true,
    peopleCount: 3,
    quest: {
      id: 1,
      title: 'Склеп',
      previewImg: 'https://grading.design.pages.academy/static/quest/crypt.jpg',
      previewImgWebp: 'https://grading.design.pages.academy/static/quest/crypt.webp',
      level: 'hard',
      type: 'horror',
      peopleMinMax: [
        2,
        5
      ]
    }
  }
];

export const someQuest: ExtendedQuest = {
  id: 1,
  title: 'Склеп',
  description: 'Средневековое кладбище таит в себе много страшных тайн. Местные жители говорят, что в склепе похоронен граф вампир, который по ночам выходит на охоту, чтобы испить человеческой крови. Через час солнце опустится за горизонт, успеете ли вы убить вампира и выбраться из склепа?',
  previewImg: 'https://grading.design.pages.academy/static/quest/crypt.jpg',
  previewImgWebp: 'https://grading.design.pages.academy/static/quest/crypt.webp',
  coverImg: 'https://grading.design.pages.academy/static/quest/crypt@2x.jpg',
  coverImgWebp: 'https://grading.design.pages.academy/static/quest/crypt@2x.webp',
  level: 'hard',
  type: 'horror',
  peopleMinMax: [
    2,
    5
  ]
};

export const bookingInfo: BookingInfo = {
  id: 1,
  locations: [
    {
      id: 1,
      address: 'Аллея 100 летия Комсомола, м. Политехническая',
      coords: [
        60.022639880785924,
        30.365151487500537
      ]
    },
    {
      id: 2,
      address: 'Большой Смоленский пр., м. Елизаровская',
      coords: [
        59.89808568733451,
        30.412126503541884
      ]
    },
    {
      id: 3,
      address: 'Полюстровский пр.,84, м. Лесная',
      coords: [
        59.987803542201036,
        30.352889458736357
      ]
    }
  ],
  slots: {
    today: [
      {
        time: '14:00',
        isAvailable: false
      },
      {
        time: '15:00',
        isAvailable: true
      },
      {
        time: '16:00',
        isAvailable: true
      },
      {
        time: '17:00',
        isAvailable: true
      },
      {
        time: '18:00',
        isAvailable: true
      },
      {
        time: '19:00',
        isAvailable: true
      },
      {
        time: '20:00',
        isAvailable: true
      }
    ],
    tomorrow: [
      {
        time: '14:00',
        isAvailable: true
      },
      {
        time: '15:00',
        isAvailable: true
      },
      {
        time: '16:00',
        isAvailable: true
      },
      {
        time: '17:00',
        isAvailable: false
      },
      {
        time: '18:00',
        isAvailable: true
      },
      {
        time: '19:00',
        isAvailable: true
      },
      {
        time: '20:00',
        isAvailable: false
      }
    ]
  }
};
