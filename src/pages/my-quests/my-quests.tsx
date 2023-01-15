import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import BookedQuestCard from '../../components/booked-quest-card/booked-quest-card';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import { APIRoute, AppRoute } from '../../constants';
import { createAPI } from '../../services/api';
import { BookedQuest } from '../../types/types';

function MyQuests() {
  const api = createAPI();
  const navigate = useNavigate();

  const [bookedQuests, setBookedQuests] = useState<BookedQuest[] | null>(null);

  const [needToUpdate, setNeedToUpdate] = useState(false);

  const onUpdateHandler = () => {
    setNeedToUpdate(true);
  };

  useEffect(() => {
    api.get<BookedQuest[]>(`${APIRoute.Booked}`)
      .then((response) => setBookedQuests(response.data))
      .then(() => setNeedToUpdate(false))
      .catch(() => navigate(AppRoute.NotFound));
  }, [needToUpdate]);

  if (bookedQuests === null) {
    return (<LoadingScreen />);
  }

  return (
    <div className="wrapper">
      <Helmet>
        <title>Мои бронирования - Escape Room</title>
      </Helmet>
      <Header/>
      <main className="page-content decorated-page">
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source
              type="image/webp"
              srcSet="img/content/maniac/maniac-bg-size-m.webp, img/content/maniac/maniac-bg-size-m@2x.webp 2x"
            />
            <img
              src="img/content/maniac/maniac-bg-size-m.jpg"
              srcSet="img/content/maniac/maniac-bg-size-m@2x.jpg 2x"
              width={1366}
              height={1959}
              alt=""
            />
          </picture>
        </div>
        <div className="container">
          <div className="page-content__title-wrapper">
            <h1 className="title title--size-m page-content__title">
              Мои бронирования
            </h1>
          </div>
          <div className="cards-grid">
            {bookedQuests.length
              ?
              bookedQuests.map((bookedQuest) => <BookedQuestCard bookedQuest={bookedQuest} key={bookedQuest.id} onUpdateHandler={onUpdateHandler}/>)
              :
              <p style={{fontSize: 30}}>
                У вас еще нет забронированных квестов.
                Сделайте это прямо сейчас!
              </p>}
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default MyQuests;
