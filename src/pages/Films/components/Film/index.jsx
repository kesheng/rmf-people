import React, { useState } from "react";
import { imageMap } from "@@/constants/film";

export default ({ film }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  const mouseOn = () => {
    setShowOverlay(true);
  };

  const mouseOut = () => {
    setShowOverlay(false);
  };

  return (
    <div onMouseEnter={mouseOn} onMouseLeave={mouseOut}>
      <img src={imageMap[film.episode_id]} alt={film.title} />
      {showOverlay && (
        <div>
          <div>
            <div>Directed By</div>
            <div className="font-bold">{film.director}</div>
          </div>
          <div>
            <div>Released on</div>
            <div>{film.release_date}</div>
          </div>
          <div>
            <div>Produced by</div>
            <div>{film.producer}</div>
          </div>
        </div>
      )}
    </div>
  );
};
