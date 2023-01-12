import { Link } from 'react-router-dom';

function NotFound() {
  const style = {
    marginLeft: '40px'
  };

  return (
    <>
      <h1 style={style}>404 Not Found</h1>
      <Link className='locations__item-link' style={style} to='/'>Back to the main page</Link>
    </>
  );
}

export default NotFound;
