import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import type { Movie, MovieSearchResponse } from "../types/movie";

function MovieListPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const isLoading = loading && Boolean(apiKey);
  const visibleError =
    error ??
    (!apiKey
      ? "API key TMDB non configurata. Imposta VITE_TMDB_API_KEY nel file .env.local."
      : null);

  useEffect(() => {
    if (!apiKey) {
      return;
    }

    const controller = new AbortController();

    async function fetchMovies() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=The%20Lord%20of%20the%20Rings&include_adult=false&language=en-US&page=1&api_key=${encodeURIComponent(apiKey)}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error(`Richiesta TMDB non riuscita (${response.status}).`);
        }

        const data: MovieSearchResponse = await response.json();
        setMovies(data.results.slice(0, 20));
      } catch (fetchError) {
        if (
          fetchError instanceof Error &&
          fetchError.name === "AbortError"
        ) {
          return;
        }

        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Errore durante il caricamento dei film.",
        );
      } finally {
        setLoading(false);
      }
    }

    void fetchMovies();

    return () => controller.abort();
  }, [apiKey]);

  return (
    <>
      <h1 className="page-title">The Lord of the Rings</h1>
      <p className="page-sub">
        Risultati fissi da API, query=The Lord of the Rings, page=1, max 20
        items, senza filtri/paginazione.
      </p>

      {isLoading && <p role="status">Caricamento film...</p>}
      {visibleError && <p role="alert">{visibleError}</p>}

      <div className="movie-grid">
        {!isLoading &&
          !visibleError &&
          movies.map((movie, index) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              detailEnabled={index === 0}
            />
          ))}
      </div>
    </>
  );
}

export default MovieListPage;
