import React, { useEffect, useState } from 'react';
import { MutatingDots } from 'react-loader-spinner';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchFilmsByName } from 'services/api';



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

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('query');
  const location = useLocation();

  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchTerm) return;

    const fetchPostsData = async () => {
      try {
        setIsLoading(true);

        const post = await fetchFilmsByName(searchTerm);
        setFilms(post);
        toast.success(
          `Your films with name: "${searchTerm}" were successfully fetched!`,
          toastConfig
        );
      } catch (error) {
        setError(error.message);
        toast.error(error.message, toastConfig);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostsData();
  }, [searchTerm]);

  const handleSumbit = event => {
    event.preventDefault();
    const searchValue = event.target.children.search.value;

    setSearchParams({
      query: searchValue,
    });
  };

  return (
    <div>
      <h1>Search Page</h1>
      <form onSubmit={handleSumbit}>
        <input
          type="text"
          name="search"
          placeholder="Enter post id..."
          required
        />
        <button type="submit">Search</button>
      </form>

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
              <Link
                state={{ from: location }}
                className="film"
                key={film.id}
                to={`/movies/${film.id}`}
              >
                <li>
                  <h2>{film.original_title}</h2>
                </li>
              </Link>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Movies;
