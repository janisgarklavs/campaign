import React from "react";
import { Link } from "react-router-dom";

import Platforms from "./Platforms";
import CampaignStatus from "./CampaignStatus";

const Campaign = ({ campaign }) => {
  const detailsUrl = `/details/${campaign.id}`;
  return (
    <Link
      className="p-2 flex justify-between text-black no-underline hover:bg-grey-lightest"
      to={detailsUrl}
    >
      <p className="w-1/5 font-medium">{campaign.name}</p>
      <p className="w-1/5 font-light text-xs">{campaign.goal}</p>
      <p className="w-1/5">
        $ <span className="border-b">{campaign.total_budget.toFixed(2)}</span>
      </p>
      <p className="w-1/5 font-light text-xs">
        <CampaignStatus status={campaign.status} />
      </p>
      <p className="w-1/5 text-lg">
        <Platforms platforms={campaign.platforms} />
      </p>
    </Link>
  );
};

export default Campaign;
