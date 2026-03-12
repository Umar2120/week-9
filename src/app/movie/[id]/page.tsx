import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || "a767fbc283ae5a7b588872bbc2d175b0";
const TMDB_BASE = "https://api.themoviedb.org/3";
const TMDB_IMG = "https://image.tmdb.org/t/p";

type MovieDetails = {
  id: number;
  title: string;
  overview?: string;
  release_date?: string;
  vote_average?: number;
  runtime?: number;
  backdrop_path?: string | null;
  poster_path?: string | null;
  genres?: Array<{ id: number; name: string }>;
};

const getMovieDetails = cache(async (id: string): Promise<MovieDetails | null> => {
  if (!/^\d+$/.test(id)) return null;

  const url = new URL(`${TMDB_BASE}/movie/${id}`);
  url.searchParams.set("api_key", TMDB_API_KEY);
  url.searchParams.set("language", "en-US");

  try {
    const response = await fetch(url.toString(), {
      cache: "no-store",
    });

    if (!response.ok) return null;
    return (await response.json()) as MovieDetails;
  } catch {
    return null;
  }
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const movie = await getMovieDetails(id);

  if (!movie) {
    return {
      title: "Movie Not Found | MOVIEDEKHO",
      description: "The requested movie could not be found.",
    };
  }

  const description =
    (movie.overview && movie.overview.trim()) || `Explore ${movie.title} details, ratings, and release info.`;

  return {
    title: `${movie.title} | MOVIEDEKHO`,
    description: description.slice(0, 160),
    openGraph: {
      title: `${movie.title} | MOVIEDEKHO`,
      description: description.slice(0, 160),
      images: movie.backdrop_path ? [`${TMDB_IMG}/w1280${movie.backdrop_path}`] : undefined,
      type: "video.movie",
    },
  };
}

export default async function MovieDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await getMovieDetails(id);

  if (!movie) notFound();

  const backdropUrl = movie.backdrop_path ? `${TMDB_IMG}/w1280${movie.backdrop_path}` : null;
  const posterUrl = movie.poster_path ? `${TMDB_IMG}/w500${movie.poster_path}` : null;
  const year = movie.release_date ? movie.release_date.slice(0, 4) : "N/A";
  const rating = typeof movie.vote_average === "number" ? movie.vote_average.toFixed(1) : "N/A";
  const runtime = movie.runtime ? `${movie.runtime} min` : "N/A";
  const genres = movie.genres?.map((item) => item.name).join(", ") || "N/A";

  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: "24px 16px 48px" }}>
      <Link href="/" style={{ display: "inline-block", marginBottom: 16 }}>
        Back to Home
      </Link>

      {backdropUrl && (
        <img
          src={backdropUrl}
          alt={movie.title}
          style={{ width: "100%", borderRadius: 12, display: "block", marginBottom: 20 }}
        />
      )}

      <section style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 20 }}>
        {posterUrl && (
          <img
            src={posterUrl}
            alt={movie.title}
            style={{ width: "100%", borderRadius: 12, display: "block" }}
          />
        )}

        <div>
          <h1 style={{ margin: "0 0 10px" }}>{movie.title}</h1>
          <p style={{ margin: "0 0 14px", opacity: 0.85 }}>
            {year} · {runtime} · Rating {rating}
          </p>
          <p style={{ margin: "0 0 12px", opacity: 0.9 }}>
            <strong>Genres:</strong> {genres}
          </p>
          <p style={{ margin: 0, lineHeight: 1.7 }}>{movie.overview || "No overview available."}</p>
        </div>
      </section>
    </main>
  );
}
