import React from "react";
import classnames from "classnames";
import Range from "./Range";

const Selector = ({ platform, onSelected, selected, data }) => {
  const styleCX = classnames(
    "p-4 w-1/3  flex justify-center shadow flex flex-col",
    {
      "bg-grey cursor-not-allowed opacity-25": !data,
      "cursor-pointer bg-grey-lighter": data,
      "hover:bg-blue-lightest": data && selected !== platform,
      "bg-white": selected === platform
    }
  );

  if (!data) {
    return (
      <div className={styleCX}>
        <div className="text-xl mx-auto">
          <i className={platformIcon(platform)} />
        </div>
      </div>
    );
  }
  return (
    <div onClick={() => onSelected(platform)} className={styleCX}>
      <div className="text-xl mx-auto">
        <i className={platformIcon(platform)} />
      </div>
      <div className="w-full md:w-1/2 lg:w-1/3 mx-auto">
        <Range range={budgetRange(data)} noNumbers green />
      </div>
    </div>
  );
};

const budgetRange = platform => {
  let min = 0;
  let max = 0;

  let spent =
    ((platform.total_budget - platform.remaining_budget) /
      platform.total_budget) *
    100;

  max = spent.toFixed(0);
  return [min, max];
};

const platformIcon = platform => {
  switch (platform) {
    case "facebook":
      return "fab fa-2x fa-facebook-square";
    case "instagram":
      return "fab fa-2x fa-instagram";
    case "google":
      return "fab fa-2x fa-google";
  }
};

export default Selector;
