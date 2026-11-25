import { useState } from "react";
import type { PosterProps } from "../types/movie";

type PosterComponentProps = PosterProps & {
  variant?: "card" | "detail";
};

const TMDB_POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

function Poster({
  posterPath,
  alt,
  variant = "card",
}: PosterComponentProps) {
  const [failedPosterPath, setFailedPosterPath] = useState<string | null>(null);
  const className =
    variant === "detail" ? "detail__poster" : "card__poster";

  return (
    <div className={className}>
      {posterPath && failedPosterPath !== posterPath ? (
        <img
          src={`${TMDB_POSTER_BASE_URL}${posterPath}`}
          alt={alt}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={() => setFailedPosterPath(posterPath)}
        />
      ) : (
        "Poster non disponibile"
      )}
    </div>
  );
}

export default Poster;
