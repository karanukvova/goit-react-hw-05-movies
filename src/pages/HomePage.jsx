import React, { useEffect, useState } from 'react';
import { MutatingDots } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchFilmsWeeklyTrends } from 'services/api';

const toastConfig = {
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark',
};

const HomePage = () => {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostsData = async () => {
      try {
        setIsLoading(true);

        const films = await fetchFilmsWeeklyTrends();

        setFilms(films);
        toast.success('Your films were successfully fetched!', toastConfig);
      } catch (error) {
        setError(error.message);
        toast.error(error.message, toastConfig);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostsData();
  }, []);

  return (
    <div>
      {error !== null && (
        <p className="c-error">
          Oops, some error occured. Please, try again later. Error: {error}
        </p>
      )}
      {isLoading && (
        <MutatingDots
          height="100"
          width="100"
          color="#5800a5"
          secondaryColor="#e08e00"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      )}
      {films.length > 0 && (
        <ul>
          {films.map(film => {
            return (
              <Link className="film" key={film.id} to={`/movies/${film.id}`}>
                <li>
                  <h2>{film.title}</h2>
                </li>
              </Link>
            );
          })}
        </ul>
      )}
    </div>
  );
};
export default HomePage
