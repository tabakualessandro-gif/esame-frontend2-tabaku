import { Link } from "react-router-dom";
import Poster from "./Poster";
import type { MovieCardProps } from "../types/movie";

function formatReleaseDate(releaseDate: string): string {
  if (!releaseDate) {
    return "N/D";
  }

  const date = new Date(`${releaseDate}T00:00:00`);

  return Number.isNaN(date.getTime())
    ? releaseDate
    : new Intl.DateTimeFormat("it-IT").format(date);
}

function MovieCard({ movie }: MovieCardProps) {
  return (
    <article className="card">
      <Poster posterPath={movie.poster_path} alt={movie.title} />
      <div className="card__body">
        <h2 className="card__title">{movie.title}</h2>
        <p className="card__meta">
          Uscita: {formatReleaseDate(movie.release_date)} · Voto:{" "}
          {movie.vote_average.toFixed(1)}
        </p>
        <p className="card__overview">{movie.overview}</p>
        <Link className="card__cta" to={`/movies/${movie.id}`}>
          Dettaglio
        </Link>
      </div>
    </article>
  );
}

export default MovieCard;
