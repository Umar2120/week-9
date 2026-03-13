1. hey , i have a project can you please see the commands and adjust this in nextjs.
  a.Setup: Initialize a new Next.js 15 project using npx create-next-app@latest (Use the App Router).
  b.The Port: Copy your Week 8 "Cine-Stream" Movie App UI into this new Next.js project.
  c.Routing: Recreate your routes using Next.js file-based routing (e.g., creating a page.js inside an app/movie/ folder).
2.everything plus in previous command
  a.Server Components: Fetch the "Popular Movies" list from the TMDB API directly inside a Server Component (do not use useEffect for the initial load).
  b.Client Components: Use the "use client" directive only where necessary (e.g., for your search bar input state or favorite buttons).
3.last command for you deep search and apply it
  a.Dynamic SSR: Create a dynamic route /movie/[id].
  b.SEO Metadata: Fetch the specific movie details on the server and use the Next.js generateMetadata function to dynamically set the <title> and <meta name="description"> tags based on the movie data. (This proves your app is SEO-friendly).
4.have some eslint error in deploying on vercel homeclient.tsx have errors in line no. 91,136,156 resolve it.
