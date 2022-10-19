import { useState, useRef, useEffect } from 'react';

import { Carousel } from '../components/GamesStore/Carousel';
import { GamesSlider } from '../components/GamesStore/GamesSlider';
import { GamesList } from '../components/GamesStore/GamesList';
import { useGamesData } from '../hooks/useGamesData';
import { Error } from './Error';

export const sliderData = [
  ['Popular Games', 'popular'],
  ['Best of All Time', 'BOAT'],
  ['Best of the Year', 'BOTY'],
  ['New Releases', 'new'],
];

export const GamesStore = () => {
  const [page, setPage] = useState(1);
  const loader = useRef(null);
  const { gamesError } = useGamesData('all');

  useEffect(() => {
    const obsOptions = {
      root: null,
      rootMargin: '200px',
      threshold: 0,
    };

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) setPage(prev => prev + 1);
    }, obsOptions);

    if (loader.current) observer.observe(loader.current);
  }, []);

  if (gamesError) return <Error error={gamesError} />;

  return (
    <>
      <Carousel />
      {sliderData.map(([heading, category], i) => (
        <GamesSlider heading={heading} category={category} key={i} />
      ))}
      {[...Array(page)].map((_, i) => (
        <GamesList heading="All Games" category="all" page={i + 1} key={i} />
      ))}
      <div ref={loader}></div>
    </>
  );
};