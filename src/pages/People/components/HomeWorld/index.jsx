import React, { useState, useEffect } from "react";
import { getPlanet } from "@/service/api";
import { Link } from "react-router-dom";

export default ({ homeWorld: propHomeWorld }) => {
  const [homeWorld, setHomeWorld] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log();
    const planetNumber = propHomeWorld.match(/[0-9]+/);
    const subscription = getPlanet(planetNumber).subscribe(
      setHomeWorld,
      (err) => {
        console.error(err);
        setError(err);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [propHomeWorld]);

  return (
    <div>
      {error && <div>Error Loading</div>}
      {homeWorld === undefined && !error && <div>... Loading</div>}
      {homeWorld && (
        <Link to={`/planets/${homeWorld.id}`}>{homeWorld.name}</Link>
      )}
    </div>
  );
};
