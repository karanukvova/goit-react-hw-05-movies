import { Suspense, lazy } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { MutatingDots } from 'react-loader-spinner';
const HomePage = lazy(() => import('pages/HomePage'));
const Movies = lazy(() => import('pages/Movies'));
const MovieDetails = lazy(() => import('pages/MovieDetails'));

export const App = () => {
  return (
    <div>
      <header>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/search">Movies</NavLink>
        </nav>
      </header>
      <main>
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
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<Movies />} />
            <Route path="/movies/:postId/*" element={<MovieDetails />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};