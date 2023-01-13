import React from 'react';
import { BookedQuest } from '../../types/types';
import { Link } from 'react-router-dom';
import { DifficultyLevel, QuestDate } from '../../constants';

type BookedQuestCardProps = {
  bookedQuest: BookedQuest;
}

function BookedQuestCard({bookedQuest}: BookedQuestCardProps) {
  const {quest} = bookedQuest;

  return (
    <div className="quest-card">
      <div className="quest-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={quest.previewImgWebp}
          />
          <img
            src={quest.previewImg}
            width={344}
            height={232}
            alt={quest.title}
          />
        </picture>
      </div>
      <div className="quest-card__content">
        <div className="quest-card__info-wrapper">
          <Link
            className="quest-card__link"
            to={`/quest/${quest.id}`}
          >
            {quest.title}
          </Link>
          <span className="quest-card__info">
            {`[${QuestDate[bookedQuest.date]} ${bookedQuest.time}. ${bookedQuest.location ? bookedQuest.location.address : ''}]`}
          </span>
        </div>
        <ul className="tags quest-card__tags">
          <li className="tags__item">
            <svg width={11} height={14} aria-hidden="true">
              <use xlinkHref="#icon-person" />
            </svg>
            {quest.peopleMinMax[0]}-{quest.peopleMinMax[1]}&nbsp;чел
          </li>
          <li className="tags__item">
            <svg width={14} height={14} aria-hidden="true">
              <use xlinkHref="#icon-level" />
            </svg>
            {DifficultyLevel[quest.level]}
          </li>
        </ul>
        <button
          className="btn btn--accent btn--secondary quest-card__btn"
          type="button"
        >
          Отменить
        </button>
      </div>
    </div>
  );
}

export default BookedQuestCard;
