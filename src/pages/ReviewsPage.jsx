import React, { useEffect, useState } from 'react';
import { MutatingDots } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchFilmsReviews } from 'services/api';
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
const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { postId } = useParams();

  useEffect(() => {
    if (!postId) return;

    const fetchPostData = async () => {
      try {
        setIsLoading(true);

        const casts = await fetchFilmsReviews(postId);
        setReviews(casts);
        toast.success('reviews details were successfully fetched!', toastConfig);
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
      <h1>CommentsPage</h1>
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
      {reviews.length > 0 ? (
        <ul>
          {reviews.map(review => {
            return (
              <li key={review.id}>
                <h2>Author: {review.author}</h2>
                <p>{review.content}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>We don't have any reviews for this movies</p>
      )}
    </div>
  );
};
export default ReviewsPage;
