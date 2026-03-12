import HomeClient from "./HomeClient";

type Movie = {
  id: number;
  title?: string;
  poster_path?: string | null;
  [key: string]: unknown;
};

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || "a767fbc283ae5a7b588872bbc2d175b0";

async function getPopularMovies() {
  if (!TMDB_API_KEY) {
    return { movies: [] as Movie[], totalPages: 1 };
  }

  const url = new URL("https://api.themoviedb.org/3/movie/popular");
  url.searchParams.set("api_key", TMDB_API_KEY);
  url.searchParams.set("language", "en-US");
  url.searchParams.set("page", "1");

  try {
    const response = await fetch(url.toString(), {
      next: { revalidate: 300 },
    });
    if (!response.ok) {
      return { movies: [] as Movie[], totalPages: 1 };
    }

    const data = await response.json();
    const results = Array.isArray(data?.results) ? data.results : [];

    return {
      movies: results.filter((movie: Movie) => movie.poster_path),
      totalPages: Number(data?.total_pages) || 1,
    };
  } catch {
    return { movies: [] as Movie[], totalPages: 1 };
  }
}

export default async function Page() {
  const { movies, totalPages } = await getPopularMovies();
  return <HomeClient initialPopularMovies={movies} initialPopularTotalPages={totalPages} />;
}
