import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import { searchMovies, getTrending, getTrendingShows, discoverMoviesByGenre } from '../lib/api';
import { getMovieGenres } from '../lib/api'; // Keep for getting genre name

interface Props {
  searchParams?: { q?: string; genre?: string };
}

export default async function Home(props: Props) {
  
  const query = props.searchParams?.q;
  const genreId = props.searchParams?.genre;
  let data;
  let pageTitle = 'Trending Movies';

  if (genreId) {
    data = await discoverMoviesByGenre(genreId);
    const genres = await getMovieGenres();
    const currentGenre = genres.find((g: any) => g.id == genreId);
    if (currentGenre) {
      pageTitle = `${currentGenre.name} Movies`;
    }
  } else if (query) {
    data = await searchMovies(query);
    pageTitle = `Search Results for "${query}"`;
  } else {
    data = await getTrending();
  }

  const dataShows = query || genreId ? null : await getTrendingShows();

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4">
      <div className="w-full mb-4">
        <SearchBar initialQuery={query ?? ''} />
      </div>

      <h1 className="mb-2 text-3xl font-bold">{pageTitle}</h1>

      <div id="mainGrid" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2 sm:p-4">
        {data?.results?.map((movie: any) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            release_date={movie.release_date}
            isMovie={true}
          />
        ))}
      </div>
      {!query && !genreId && dataShows && (
        <>
          <h1 className="mb-2 text-3xl font-bold">Trending Shows</h1>
          <div id="showsGrid" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2 sm:p-4">
            {dataShows.results.map((show: any) => (
              <MovieCard
                key={show.id}
                id={show.id}
                title={show.name} // TV shows use 'name'
                poster_path={show.poster_path}
                release_date={show.first_air_date} // and 'first_air_date'
                isMovie={false}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}