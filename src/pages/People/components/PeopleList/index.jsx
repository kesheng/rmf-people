import React from "react";
import { Link } from "react-router-dom";

export default ({ people, loadingPeople }) => {
  return (
    <div>
      {people.map((person, index) => {
        let borderClass = "border-b";
        if (index === 0) {
          borderClass = "border-t border-b";
        } else if (index + 1 === people.length) {
          borderClass = "";
        }
        return (
          <Link
            key={person.name}
            to={`/people/${window.encodeURIComponent(person.id)}`}
          >
            {person.name}
          </Link>
        );
      })}
      {loadingPeople && <div>Loading ...</div>}
    </div>
  );
};
