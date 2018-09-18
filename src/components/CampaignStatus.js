import React from "react";

import classnames from "classnames";

const CampaignStatus = ({ status, large }) => {
  const styleCX = classnames(
    "border",
    "px-1 text-center rounded font-bold opacity-75",
    { "bg-blue-dark text-white border-blue-dark": status === "Delivering" },
    { "bg-green-dark text-white border-green-dark": status === "Ended" },
    { "bg-orange-dark text-white border-orange-dark": status === "Scheduled" },
    { "text-xs": !large },
    { "text-md": large }
  );

  return <span className={styleCX}>{status}</span>;
};

export default CampaignStatus;
