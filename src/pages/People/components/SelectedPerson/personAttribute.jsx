import React from "react";

const PersonAttribute = ({ children }) => {
  return <div>{children}</div>;
};

function Title({ children }) {
  return <div>{children}</div>;
}

function Value({ children }) {
  return <div>{children}</div>;
}

PersonAttribute.Title = Title;
PersonAttribute.Value = Value;

export default PersonAttribute;
