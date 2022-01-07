import React from "react";
import { getPlanet } from "@@/service/api.js";
import { Link } from "react-router-dom";

export default (props) => {
  const [homeWorld, setHomeWorld] = React.useState(null);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    setHomeWorld(null);

    const planetNumber = props.homeWorld.match(/[0-9]+/);
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
  }, [props.homeworld]);

  return (
    <div className="homeworld">
      {error && <div>Error Loading</div>}
      {homeWorld === undefined && !error && <div>... Loading</div>}
      {homeWorld && (
        <Link className="text-info" to={`/planets/${homeWorld.id}`}>
          {homeWorld.name}
        </Link>
      )}
    </div>
  );
};
