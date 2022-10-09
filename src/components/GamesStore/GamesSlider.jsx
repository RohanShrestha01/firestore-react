import classes from './GamesSlider.module.css';
import { GameCard } from './GameCard';
import { IconButton } from '@mui/material';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { useState } from 'react';
import { useGamesData } from '../../hooks/useGamesData';
import { Link } from 'react-router-dom';

/* SwiperJS */
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

export const GamesSlider = ({ heading, category }) => {
  const { games, gamesError } = useGamesData(category);
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);
  const [slideProgress, setSlideProgress] = useState(0);

  const resultsCount = games?.length ?? 40;

  if (gamesError) return;

  return (
    <section className={classes['games-slider']}>
      <div className={classes['games-slider__heading']}>
        <Link to={category} className={classes['games-slider__link']}>
          <h1 className={classes.heading}>{heading}</h1>
          <ChevronRightRoundedIcon fontSize="medium" />
        </Link>
        <div>
          <IconButton
            color="primary"
            ref={node => setPrevEl(node)}
            disabled={slideProgress === 0}
            sx={{ '&.Mui-disabled': { color: 'grey.text' } }}
          >
            <ChevronLeftRoundedIcon fontSize="large" />
          </IconButton>
          <IconButton
            color="primary"
            ref={node => setNextEl(node)}
            disabled={slideProgress === 1}
            sx={{ '&.Mui-disabled': { color: 'grey.text' } }}
          >
            <ChevronRightRoundedIcon fontSize="large" />
          </IconButton>
        </div>
      </div>
      <Swiper
        className={classes['game-cards']}
        slidesPerView={5}
        slidesPerGroup={5}
        spaceBetween={30}
        simulateTouch={false}
        modules={[Navigation]}
        navigation={{ prevEl, nextEl }}
        onSlideChange={e => setSlideProgress(e.progress)}
      >
        {[...Array(resultsCount)].map((_, i) => (
          <SwiperSlide key={i}>
            <GameCard category={category} id={i} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};