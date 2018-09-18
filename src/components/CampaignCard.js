import React from "react";
import { Link } from "react-router-dom";

import Platforms from "./Platforms";
import CampaignStatus from "./CampaignStatus";

const Campaign = ({ campaign }) => {
  const detailsUrl = `/details/${campaign.id}`;
  return (
    <div className="md:w-1/2 lg:w-1/3 w-full px-4 sm:px-2 pb-4">
      <Link
        className="flex-none rounded shadow hover:shadow-md xs:w-full min-w-xs p-4 flex flex-col no-underline text-black bg-white"
        to={detailsUrl}
      >
        <div className="flex items-center mb-2 pb-1 border-b flex justify-between border-blue-lighter">
          <span className="text-xl font-semi">
            {campaign.name}
            &nbsp;
            <span className="text-xs text-grey">
              (#
              {campaign.id})
            </span>
          </span>
          <span className="ml-2">
            <CampaignStatus status={campaign.status} />
          </span>
        </div>
        <div className="pb-2 text-sm text-grey-darkest mb-4">
          <span className="text-grey text-xs">Goal: </span>
          <i>{campaign.goal}</i>
        </div>

        <div className="flex justify-between">
          <div>
            $
            <span className="border-b">{campaign.total_budget.toFixed(2)}</span>
          </div>
          <div className="">
            <Platforms platforms={campaign.platforms} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Campaign;
