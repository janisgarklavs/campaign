import React from "react";

const AgeRange = ({ range }) => {
  const [from, to] = range;

  return (
    <svg width="100%" viewBox="0 0 100 20">
      <text x={from - 3} y="10" fontSize="5">
        {from}
      </text>
      <text x={to - 3} y="10" fontSize="5">
        {to}
      </text>
      <rect width="100" height="2" y="13" fill="#ccc" />
      <rect width={to - from} height="2" x={from} y="13" fill="#0078bc" />
    </svg>
  );
};

export default AgeRange;
