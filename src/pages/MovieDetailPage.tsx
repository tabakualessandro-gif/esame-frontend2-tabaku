import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Poster from "../components/Poster";
import type { MovieDetail } from "../types/movieDetail";

type DetailState =
  | { id: number; status: "success"; movie: MovieDetail }
  | { id: number; status: "error"; message: string };

const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";

function formatReleaseDate(releaseDate: string): string {
  if (!releaseDate) {
    return "N/D";
  }

  const date = new Date(`${releaseDate}T00:00:00`);

  return Number.isNaN(date.getTime())
    ? releaseDate
    : new Intl.DateTimeFormat("it-IT").format(date);
}

function getOriginalLanguageName(movie: MovieDetail): string {
  const language = movie.spoken_languages.find(
    (item) => item.iso_639_1 === movie.original_language,
  );

  return (
    language?.english_name ||
    language?.name ||
    movie.original_language.toUpperCase() ||
    "N/D"
  );
}

function MovieDetailPage() {
  const { id } = useParams();
  const movieId = id && /^\d+$/.test(id) ? Number(id) : null;
  const isValidId =
    movieId !== null && Number.isSafeInteger(movieId) && movieId > 0;
  const apiKey = import.meta.env.VITE_TMDB_API_KEY?.trim();
  const [detailState, setDetailState] = useState<DetailState | null>(null);
  const currentState =
    movieId !== null && detailState?.id === movieId ? detailState : null;
  const movie =
    currentState?.status === "success" ? currentState.movie : null;
  const requestError =
    currentState?.status === "error" ? currentState.message : null;
  const errorMessage = !isValidId
    ? "ID film non valido."
    : !apiKey
      ? "API key TMDB non configurata. Imposta VITE_TMDB_API_KEY nel file .env.local."
      : requestError;
  const isLoading = isValidId && Boolean(apiKey) && currentState === null;

  useEffect(() => {
    if (
      movieId === null ||
      !Number.isSafeInteger(movieId) ||
      movieId <= 0 ||
      !apiKey
    ) {
      return;
    }

    const validMovieId = movieId;
    const controller = new AbortController();

    async function fetchMovie() {
      try {
        const response = await fetch(
          `${TMDB_API_BASE_URL}/movie/${validMovieId}?api_key=${encodeURIComponent(apiKey)}`,
          { signal: controller.signal },
        );

        if (response.status === 404) {
          setDetailState({
            id: validMovieId,
            status: "error",
            message: "Film non trovato.",
          });
          return;
        }

        if (!response.ok) {
          throw new Error(`Richiesta TMDB non riuscita (${response.status}).`);
        }

        const detail: MovieDetail = await response.json();
        setDetailState({
          id: validMovieId,
          status: "success",
          movie: detail,
        });
      } catch (requestError) {
        if (
          requestError instanceof Error &&
          requestError.name === "AbortError"
        ) {
          return;
        }

        setDetailState({
          id: validMovieId,
          status: "error",
          message:
            requestError instanceof Error
              ? requestError.message
              : "Errore durante il caricamento del film.",
        });
      }
    }

    void fetchMovie();

    return () => controller.abort();
  }, [apiKey, movieId]);

  return (
    <>
      <Link className="back-link" to="/">
        ← Torna all’elenco
      </Link>

      {isLoading && <p role="status">Caricamento dettagli film...</p>}
      {errorMessage && <p role="alert">{errorMessage}</p>}

      {movie && (
        <article className="detail">
          <div>
            <Poster
              posterPath={movie.poster_path}
              alt={movie.title}
              variant="detail"
            />
          </div>

          <div>
            <h1 className="detail__title">{movie.title}</h1>
            {movie.tagline && (
              <p className="detail__tagline">{movie.tagline}</p>
            )}

            <ul className="detail__meta">
              <li>Uscita: {formatReleaseDate(movie.release_date)}</li>
              <li>Durata: {movie.runtime ? `${movie.runtime} min` : "N/D"}</li>
              <li>Voto: {movie.vote_average.toFixed(1)}</li>
              <li>Voti: {movie.vote_count.toLocaleString("it-IT")}</li>
              <li>
                Stato: {movie.status === "Released" ? "Uscito" : movie.status}
              </li>
              <li>Lingua: {getOriginalLanguageName(movie)}</li>
            </ul>

            {movie.genres.length > 0 && (
              <div className="detail__genres">
                {movie.genres.map((genre) => (
                  <span className="genre" key={genre.id}>
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            <p className="detail__overview-label">Trama</p>
            <p className="detail__overview">
              {movie.overview || "Trama non disponibile."}
            </p>

            <p className="card__meta">
              Produzione:{" "}
              {movie.production_companies.map((company) => company.name).join(" · ") ||
                "N/D"}
            </p>
          </div>
        </article>
      )}
    </>
  );
}

export default MovieDetailPage;
