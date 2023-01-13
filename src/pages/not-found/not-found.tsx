import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

function NotFound() {
  const style = {
    marginLeft: '40px'
  };

  return (
    <>
      <Helmet>
        <title>Страница не найдена - Escape Room</title>
      </Helmet>
      <h1 style={style}>404 Not Found</h1>
      <Link className='locations__item-link' style={style} to='/'>Вернуться на главную</Link>
    </>
  );
}

export default NotFound;
