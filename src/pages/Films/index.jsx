import React, { useState, useEffect } from "react";
import { forkJoin } from "rxjs";
import { getFilm } from "@@/service/api";
import Film from "@@/pages/Films/components/Film";

export default ({ films: propFilms }) => {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    setFilms([]);

    const subscription = forkJoin(
      propFilms.map((film) => {
        const filmNumber = film.match(/[0-9]+/);
        return getFilm(filmNumber);
      })
    ).subscribe(setFilms, setError);

    return () => {
      subscription.unsubscribe();
    };
  }, [propFilms]);

  return (
    <div>
      {error && <div>Error</div>}
      {films.length !== propFilms.length && !error && <div>... Loading</div>}
      {films.length === propFilms.length && !error && (
        <>
          {films.map((film) => {
            return <Film key={film.episode_id} film={film} />;
          })}
        </>
      )}
    </div>
  );
};
