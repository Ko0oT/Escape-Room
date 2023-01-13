import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { AppRoute } from '../../constants';

function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <div className="container container--size-l">
        {location.pathname === AppRoute.Root
          ?
          <span className="logo header__logo">
            <svg width={134} height={52} aria-hidden="true">
              <use xlinkHref="#logo" />
            </svg>
          </span>
          :
          <Link
            className="logo header__logo"
            to={AppRoute.Root}
            aria-label="Перейти на Главную"
          >
            <svg width={134} height={52} aria-hidden="true">
              <use xlinkHref="#logo" />
            </svg>
          </Link>}
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link
                className={location.pathname === AppRoute.Root ? 'link active' : 'link'}
                to={AppRoute.Root}
              >
              Квесты
              </Link>
            </li>
            <li className="main-nav__item">
              <Link
                className={location.pathname === AppRoute.About ? 'link active' : 'link'}
                to={AppRoute.About}
              >
              Контакты
              </Link>
            </li>
            <li className="main-nav__item">
              <Link
                className={location.pathname === AppRoute.MyQuests ? 'link active' : 'link'}
                to={AppRoute.MyQuests}
              >
              Мои бронирования
              </Link>
            </li>
          </ul>
        </nav>
        <div className="header__side-nav">
          <Link
            className="btn btn--accent header__side-item"
            to="#"
          >
          Выйти
            {/* TODO менять в зависимости от статуса авторизации*/}
          </Link>
          <a
            className="link header__side-item header__phone-link"
            href="tel:88003335599"
          >
          8 (000) 111-11-11
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
