import { StyledLink } from 'components/App';
import React, { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { MutatingDots } from 'react-loader-spinner';
import { Link,  Route,  Routes, useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchFilmsDetails } from 'services/api';
const CastsPage = lazy(() => import('./CastsPage'));
const ReviewsPage = lazy(() => import('./ReviewsPage'));

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
const MovieDetails = () => {
    const [filmDetails, setFilmDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { postId } = useParams();
    const location = useLocation();
    const [genres, setGenres] = useState('')
  const backLinkHref = useRef(location.state?.from ?? '/');

  useEffect(() => {
    if (!postId) return;

    const fetchPostData = async () => {
      try {
        setIsLoading(true);

        const postData = await fetchFilmsDetails(postId);
        setFilmDetails(postData);
          toast.success('Films details were successfully fetched!', toastConfig);
          for (const genreN of postData.genres) {
            setGenres(prevGenres=>prevGenres + `${genreN.name} `);
          }
      } catch (error) {
        setError(error.message);
        toast.error(error.message, toastConfig);
      } finally {
        setIsLoading(false);
        }
    };

    fetchPostData();
  }, [postId]);
  return (
    <div>
      <Link to={backLinkHref.current}>Go back</Link>
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
      {filmDetails !== null && (
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500${filmDetails.poster_path}`}
            alt=""
          />
          <div>
            <h2>{filmDetails.original_title}</h2>
            <ul>
              <li>
                <p>Vote / Votes</p>
                <p>
                  <span>{filmDetails.vote_average.toFixed(1)}</span>
                  <span>/</span>
                  <span>{filmDetails.vote_count}</span>
                </p>
              </li>
              <li>
                <p>Popularity</p>
                <p>{filmDetails.popularity.toFixed(1)}</p>
              </li>
              <li>
                <p>Genre</p>
                <p>{genres}</p>
              </li>
            </ul>
            <h3>About</h3>
            <p>{filmDetails.overview}</p>
          </div>
          <StyledLink to="casts">Casts</StyledLink>
          <StyledLink to="reviews">Reviews</StyledLink>
        </div>
      )}
      <Suspense
        fallback={
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
        }
      >
        <Routes>
          <Route path="casts" element={<CastsPage />} />
          <Route path="reviews" element={<ReviewsPage />} />
        </Routes>{' '}
      </Suspense>
    </div>
  );
}
export default MovieDetails
