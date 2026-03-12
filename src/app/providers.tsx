"use client";

import { FavProvider } from "../context/FavoritesContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <FavProvider>{children}</FavProvider>;
}
