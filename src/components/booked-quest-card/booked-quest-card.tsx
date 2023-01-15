import { useState } from 'react';
import { BookedQuest } from '../../types/types';
import { Link } from 'react-router-dom';
import { APIRoute, DifficultyLevel, QuestDate } from '../../constants';
import { createAPI } from '../../services/api';

type BookedQuestCardProps = {
  bookedQuest: BookedQuest;
  onUpdateHandler: () => void;
}

function BookedQuestCard({bookedQuest, onUpdateHandler}: BookedQuestCardProps) {
  const {quest, id} = bookedQuest;

  const api = createAPI();

  const [isSendingData, setIsSendingData] = useState(false);

  const handleDeteleBookingButtonClick = () => {
    setIsSendingData(true);
    api.delete(`${APIRoute.Booked}/${id}`)
      .then(() => onUpdateHandler())
      .finally(() => setIsSendingData(false));
  };

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
            {bookedQuest.peopleCount}&nbsp;чел
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
          onClick={handleDeteleBookingButtonClick}
          disabled={isSendingData}
        >
          {isSendingData ? 'Отменяю...' : 'Отменить'}
        </button>
      </div>
    </div>
  );
}

export default BookedQuestCard;
