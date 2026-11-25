import type { PosterProps } from "../types/movie";

const TMDB_POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

function Poster({ posterPath, alt }: PosterProps) {
  return (
    <div className="card__poster">
      {posterPath ? (
        <img
          src={`${TMDB_POSTER_BASE_URL}${posterPath}`}
          alt={alt}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        "Poster non disponibile"
      )}
    </div>
  );
}

export default Poster;
