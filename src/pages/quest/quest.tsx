import React from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { someQuest as quest } from '../../mocks/data';
import { Link } from 'react-router-dom';
import { DifficultyLevel, QuestGenre } from '../../constants';
import { Helmet } from 'react-helmet-async';

function Quest() {
  return (
    <div className="wrapper">
      <Helmet>
        <title>Квест - Escape Room</title>
      </Helmet>
      <Header/>
      <main className="decorated-page quest-page">
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source
              type="image/webp"
              srcSet={quest.coverImgWebp}
            />
            <img
              src={quest.coverImg}
              width={1366}
              height={768}
              alt={quest.title}
            />
          </picture>
        </div>
        <div className="container container--size-l">
          <div className="quest-page__content">
            <h1 className="title title--size-l title--uppercase quest-page__title">
              {quest.title}
            </h1>
            <p className="subtitle quest-page__subtitle">
              <span className="visually-hidden">Жанр:</span>{QuestGenre[quest.type]}
            </p>
            <ul className="tags tags--size-l quest-page__tags">
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
            <p className="quest-page__description">
              {quest.description}
            </p>
            <Link
              className="btn btn--accent btn--cta quest-page__btn"
              to={`/quest/${quest.id}/booking`}
            >
              Забронировать
            </Link>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default Quest;
