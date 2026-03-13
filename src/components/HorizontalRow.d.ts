import type { JSX } from "react";

type HorizontalRowProps = {
  title: string;
  fetchFn: (page: number) => Promise<unknown>;
  onMovieClick: (movie: unknown) => void;
  initialMovies?: unknown[];
  initialTotalPages?: number;
};

declare function HorizontalRow(props: HorizontalRowProps): JSX.Element;

export default HorizontalRow;
