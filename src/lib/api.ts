
// const API_KEY = process.env.TMDB_API_KEY;//process.env.TMDB_API_KEY; // My API key.
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';



export async function searchMovies(query: string) { //searching for a movie by name
  if (!API_KEY) {
    console.error('API key not available'); 
    return { results: [] };
  }
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
  return res.json();
  
}

export async function getMovieById(id: string) { //Getting movie details with its ID. 

  if (!API_KEY) {
    console.error('API key not available');
    console.log("INSIDE api key not available");
    return null;
  }
  
  try {
    console.log(API_KEY);
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
    if (!res.ok) {
      console.error('Failed to fetch movie:', res.status, res.statusText);
      return null;
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie:', error);
    return null;
  }
}

export async function getShowById(id: string) {
  if (!API_KEY) {
    console.error('API key not available');
    return null;
  }
  
  try {
    const res = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`);
    if (!res.ok) {
      console.error('Failed to fetch show:', res.status, res.statusText);
      return null;
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching show:', error);
    return null;
  }
}

export async function getTrending(){
  if (!API_KEY) {
    console.error('API key not available');
    return { results: [] };
  }
  const res= await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
  return res.json();
}

export async function getTrendingShows(){
  if (!API_KEY) {
    console.error('API key not available');
    return { results: [] };
  }
  const res= await fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`);
  return res.json();
}

export async function getMovieCastById(id: string) {
  if (!API_KEY) {
    console.error('API key not available');
    return [];
  }
  const res = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);
  const data = await res.json();
  return data.cast; // array of cast members
}

export async function getMovieGenres() {
  if (!API_KEY) {
    console.error('API key not available for genres');
    return [];
  }
  
  try {
    const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    if (!res.ok) {
      console.error('Failed to fetch genres:', res.status, res.statusText);
      return [];
    }
    const data = await res.json();
    return data.genres || []; // Return empty array if genres is undefined
  } catch (error) {
    console.error('Error fetching genres:', error);
    return []; // Return empty array on error
  }
}

export async function discoverMoviesByGenre(genreId: string) {
  if (!API_KEY) {
    console.error('API key not available');
    return { results: [] };
  }

  //returns first page with the requested genre. 
  
  const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
  return res.json();
}