import { useState, ChangeEvent, useEffect } from 'react';
import QuestCard from '../../components/quest-card/quest-card';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../hooks';

function Main() {
  const quests = useAppSelector((state) => state.quests);

  const [state, setState] = useState({
    type: 'all',
    level: 'any',
    data: quests
  });

  useEffect(() => {
    setState({...state, data: quests});
  }, [quests]);

  function handleFilterChange({ target: { name, id }}: ChangeEvent<HTMLFieldSetElement>) {
    setState((prev) => ({ ...prev, [name]: id }));
  }

  let data = state.data;
  if (state.type !== 'all') {
    data = data.filter((d) => d.type === state.type);
  }
  if (state.level !== 'any') {
    data = data.filter((d) => d.level === state.level);
  }

  return (
    <div className="wrapper">
      <Helmet>
        <title>Escape Room</title>
      </Helmet>
      <Header />
      <main className="page-content">
        <div className="container">
          <div className="page-content__title-wrapper">
            <h1 className="subtitle page-content__subtitle">
              квесты в Санкт-Петербурге
            </h1>
            <h2 className="title title--size-m page-content__title">
              Выберите тематику
            </h2>
          </div>
          <div className="page-content__item">
            <form className="filter" action="#" method="get">
              <fieldset className="filter__section" onChange={handleFilterChange}>
                <legend className="visually-hidden">Тематика</legend>
                <ul className="filter__list">
                  <li className="filter__item">
                    <input
                      type="radio"
                      name="type"
                      id="all"
                      defaultChecked
                    />
                    <label className="filter__label" htmlFor="all">
                      <svg
                        className="filter__icon"
                        width={26}
                        height={30}
                        aria-hidden="true"
                      >
                        <use xlinkHref="#icon-all-quests" />
                      </svg>
                      <span className="filter__label-text">Все квесты</span>
                    </label>
                  </li>
                  <li className="filter__item">
                    <input type="radio" name="type" id="adventures"/>
                    <label className="filter__label" htmlFor="adventures">
                      <svg
                        className="filter__icon"
                        width={36}
                        height={30}
                        aria-hidden="true"
                      >
                        <use xlinkHref="#icon-adventure" />
                      </svg>
                      <span className="filter__label-text">Приключения</span>
                    </label>
                  </li>
                  <li className="filter__item">
                    <input type="radio" name="type" id="horror" />
                    <label className="filter__label" htmlFor="horror">
                      <svg
                        className="filter__icon"
                        width={30}
                        height={30}
                        aria-hidden="true"
                      >
                        <use xlinkHref="#icon-horror" />
                      </svg>
                      <span className="filter__label-text">Ужасы</span>
                    </label>
                  </li>
                  <li className="filter__item">
                    <input type="radio" name="type" id="mystic" />
                    <label className="filter__label" htmlFor="mystic">
                      <svg
                        className="filter__icon"
                        width={30}
                        height={30}
                        aria-hidden="true"
                      >
                        <use xlinkHref="#icon-mystic" />
                      </svg>
                      <span className="filter__label-text">Мистика</span>
                    </label>
                  </li>
                  <li className="filter__item">
                    <input type="radio" name="type" id="detective" />
                    <label className="filter__label" htmlFor="detective">
                      <svg
                        className="filter__icon"
                        width={40}
                        height={30}
                        aria-hidden="true"
                      >
                        <use xlinkHref="#icon-detective" />
                      </svg>
                      <span className="filter__label-text">Детектив</span>
                    </label>
                  </li>
                  <li className="filter__item">
                    <input type="radio" name="type" id="sci-fi" />
                    <label className="filter__label" htmlFor="sci-fi">
                      <svg
                        className="filter__icon"
                        width={28}
                        height={30}
                        aria-hidden="true"
                      >
                        <use xlinkHref="#icon-sci-fi" />
                      </svg>
                      <span className="filter__label-text">Sci-fi</span>
                    </label>
                  </li>
                </ul>
              </fieldset>
              <fieldset className="filter__section" onChange={handleFilterChange}>
                <legend className="visually-hidden">Сложность</legend>
                <ul className="filter__list">
                  <li className="filter__item">
                    <input
                      type="radio"
                      name="level"
                      id="any"
                      defaultChecked
                    />
                    <label className="filter__label" htmlFor="any">
                      <span className="filter__label-text">Любой</span>
                    </label>
                  </li>
                  <li className="filter__item">
                    <input type="radio" name="level" id="easy" />
                    <label className="filter__label" htmlFor="easy">
                      <span className="filter__label-text">Лёгкий</span>
                    </label>
                  </li>
                  <li className="filter__item">
                    <input type="radio" name="level" id="medium" />
                    <label className="filter__label" htmlFor="medium">
                      <span className="filter__label-text">Средний</span>
                    </label>
                  </li>
                  <li className="filter__item">
                    <input type="radio" name="level" id="hard" />
                    <label className="filter__label" htmlFor="hard">
                      <span className="filter__label-text">Сложный</span>
                    </label>
                  </li>
                </ul>
              </fieldset>
            </form>
          </div>
          <h2 className="title visually-hidden">Выберите квест</h2>
          <div className="cards-grid">
            {data.length ? data.map((quest) => <QuestCard quest={quest} key={quest.id}/>) : <p style={{fontSize: 30}}>Нет подходящих квестов</p>}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Main;
