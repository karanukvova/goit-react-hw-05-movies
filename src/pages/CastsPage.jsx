import React, { useEffect, useState } from 'react'
import { MutatingDots } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchFilmsCasts } from 'services/api';
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
const CastsPage = () => {
  const [casts, setCasts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { postId } = useParams();

  useEffect(() => {
    if (!postId) return;

    const fetchPostData = async () => {
      try {
        setIsLoading(true);

        const casts = await fetchFilmsCasts(postId);
        setCasts(casts);
        toast.success('casts details were successfully fetched!', toastConfig);
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
      <h1>CastsPage</h1>
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
      {casts.length > 0 ? (
        <ul>
          {casts.map(cast => {
            return (
              <li key={cast.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                  alt={cast.original_name}
                />
                <h2>{cast.original_name}</h2>
                <h2>Character: {cast.character}</h2>
              </li>
            );
          })}
        </ul>
      ):(<p>We don't have any casts for this movies</p>)}
    </div>
  );
}
export default CastsPage
