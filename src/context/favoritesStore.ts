import { createContext, useContext } from "react";

export type FavContextValue = {
  favs: any[];
  toggle: (movie: any) => void;
  isFav: (id: number) => boolean;
  clearAll: () => void;
};

export const FavCtx = createContext<FavContextValue | null>(null);

export const useFavs = (): FavContextValue => {
  const ctx = useContext(FavCtx);
  if (!ctx) throw new Error("useFavs must be used within FavProvider");
  return ctx;
};
