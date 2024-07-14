import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits, imagePathBase } from '../../api/tmdb';
import useLoad from '../../hooks/useLoad';
import toast from 'react-hot-toast';
import { ColorRing } from 'react-loader-spinner';

function MovieCast() {
  const [casts, setCasts] = useState([]);
  const { loading, setLoading, error, setError } = useLoad();

  const { movieId } = useParams();

  useEffect(() => {
    async function fetchCast() {
      setLoading(true);
      setError(false);
      try {
        const movieCast = await getMovieCredits(movieId);
        setCasts(movieCast);
      } catch (e) {
        setError(true);
        toast.error(e.message, {
          position: 'top-right',
        });
      }
      setLoading(false);
    }
    fetchCast();
  }, [movieId]);
  return (
    <ul className="casts-list flex flex-wrap gap-6 my-10">
      {loading && (
        <ColorRing
          visible={true}
          height="100"
          width="100"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper mx-auto"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      )}
      {!loading &&
        !error &&
        casts.map(cast => (
          <li
            key={cast.id}
            className="cast-item flex-[1_1_calc((100%-48px)_/_3)]
          border-2 border-gray-300 border-solid p-2 rounded-md"
          >
            <div className="cast-info flex flex-col">
              <figure className="cast-image-wrapper w-full">
                <img
                  src={imagePathBase + '/' + cast.profile_path}
                  className="object-cover w-full h-72"
                />
                <figcaption className="text-xl font-semibold text-center">
                  {cast.name}
                </figcaption>
              </figure>
              <span className="character text-sm text-center">
                Character: {cast.character}
              </span>
            </div>
          </li>
        ))}
    </ul>
  );
}

export default MovieCast;
