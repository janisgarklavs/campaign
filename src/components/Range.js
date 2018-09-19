import React from "react";

const Range = ({ range, green, noNumbers }) => {
  const [from, to] = range;

  let height = 40;
  let padding = 12;
  let top = 20;
  if (noNumbers) {
    height = 8;
    padding = 4;
    top = 2;
  }

  let color = "#2779BD";
  if (green) {
    color = "#1F9D55";
  }
  const styleCX = {
    width: "100%",
    boxSizing: "border-box",
    padding: padding
  };
  const styleTrack = {
    width: "100%",
    background: "#ccc",
    height: 4,
    position: "absolute",
    top: top,
    display: "block"
  };
  const styleSelection = {
    height: 4,
    background: color,
    position: "absolute",
    width: `${to - from}%`,
    left: `${from}%`,
    top: top,
    display: "block"
  };

  let numbers = null;
  if (!noNumbers) {
    numbers = () => (
      <>
        <span style={{ position: "absolute", left: -8, top: -22 }}>{from}</span>
        <span style={{ position: "absolute", right: -8, top: -22 }}>{to}</span>
      </>
    );
  }

  return (
    <div style={styleCX}>
      <div
        style={{
          width: "100%",
          display: "block",
          position: "relative",
          height: height,
          boxSizing: "border-box"
        }}
      >
        <div style={styleTrack} />
        <div style={styleSelection}>{numbers}</div>
      </div>
    </div>
  );
};

export default Range;
