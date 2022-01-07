import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { getPeople } from "@@/service/api";
import PeopleList from "@@/pages/People/components/PeopleList";
import SelectedPerson from "@@/pages/People/components/SelectedPerson";
import { Button } from "@ks/components";

const initialState = {
  pageNum: 1,
  nextPage: true,
  loadingPeople: true,
  selectedPerson: undefined,
  people: [],
};

export default () => {
  const { personId } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);

  const { nextPage, loadingPeople, people, selectedPerson, pageNum } = state;

  useEffect(() => {
    if (nextPage && loadingPeople) {
      dispatch({ type: "loadingPeople" });

      const subscription = getPeople(pageNum).subscribe(
        (results) => {
          dispatch({ type: "newPeople", results });
        },
        (err) => {
          console.log("err", err); // eslint-disable-line
        }
      );

      return () => subscription.unsubscribe();
    }
  }, [pageNum, nextPage, loadingPeople]);

  useEffect(() => {
    if (
      (selectedPerson === undefined && personId !== undefined) ||
      (selectedPerson && personId !== selectedPerson.id)
    ) {
      console.log("here 1", personId, people);
      const person = people.find((p) => parseInt(p.id) === parseInt(personId));
      if (person) {
        console.log("here 2");
        dispatch({ type: "selectPerson", person });
      }
    }
  }, [people, selectedPerson, personId]);

  return (
    <div>
      <div>
        <div>
          {nextPage ? (
            <Button
              loading={loadingPeople}
              onClick={fetchMore}
              disabled={!nextPage || loadingPeople}
            >
              Fetch More people
            </Button>
          ) : null}
          {loadingPeople && people.length === 0 ? (
            <div>Loading ...</div>
          ) : (
            <PeopleList
              people={people}
              loadingPeople={loadingPeople}
              selectPerson={selectPerson}
            />
          )}
        </div>
        <div>
          <div>
            <SelectedPerson selectedPerson={selectedPerson} />
          </div>
        </div>
      </div>
    </div>
  );

  function selectPerson(index) {
    dispatch({ type: "selectPersonByIndex", index });
  }

  function fetchMore() {
    dispatch({ type: "fetchMore" });
  }
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "loadingPeople":
      return { ...state, loadingPeople: true };
    case "newPeople":
      return {
        ...state,
        people: state.people.concat(action.results.results),
        nextPage: Boolean(action.results.next),
        loadingPeople: false,
      };
    case "selectPerson":
      return {
        ...state,
        selectedPerson: action.person,
      };
    case "fetchMore":
      return {
        ...state,
        loadingPeople: true,
        pageNum: state.pageNum + 1,
      };
    default:
      throw Error(`Unknown action type '${action.type}'`);
  }
}
