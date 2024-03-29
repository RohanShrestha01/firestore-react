import { lazy, Suspense } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';

import { theme } from './styles/theme';
import { RootLayout } from './layouts/RootLayout';
import { GamesStore } from './pages/GamesStore';
import { PageNotFound } from './pages/PageNotFound';
import { GamesStoreLayout } from './layouts/GamesStoreLayout';

const GamesCategory = lazy(() => import('./pages/GamesCategory'));
const GamesSearch = lazy(() => import('./pages/GamesSearch'));
const Bookmarks = lazy(() => import('./pages/Bookmarks'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: Infinity,
      networkMode: 'always',
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
    },
  },
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Navigate to="store" replace />} />
      <Route path="store" element={<Navigate to="games" replace />} />
      <Route path="store/games" element={<GamesStoreLayout />}>
        <Route index element={<GamesStore />} />
        <Route
          path=":category"
          element={
            <Suspense fallback={<h2>Loading...</h2>}>
              <GamesCategory />
            </Suspense>
          }
        />
        <Route
          path="search"
          element={
            <Suspense fallback={<h2>Loading...</h2>}>
              <GamesSearch />
            </Suspense>
          }
        />
      </Route>
      <Route path="store/movies" element={<h1>Movies Store</h1>} />
      <Route path="store/music" element={<h1>Music Store</h1>} />
      <Route path="store/apps" element={<h1>Apps Store</h1>} />
      <Route path="home" element={<h1>Home</h1>} />
      <Route path="games" element={<h1>Games</h1>} />
      <Route path="movies" element={<h1>Movies</h1>} />
      <Route path="music" element={<h1>Music</h1>} />
      <Route
        path="bookmarks"
        element={
          <Suspense fallback={<h2>Loading...</h2>}>
            <Bookmarks />
          </Suspense>
        }
      />
      <Route path="settings" element={<h1>Settings</h1>} />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={true} />
        </StyledEngineProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
