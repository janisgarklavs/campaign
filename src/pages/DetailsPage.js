import React, { Component } from "react";

import CampaignStatus from "../components/CampaignStatus";
import PlatformDetails from "../components/PlatformDetails";

export default class DetailsPage extends Component {
  constructor(props) {
    super(props);

    this.campaignID = props.match.params.id;

    this.state = {
      error: null,
      isLoaded: false,
      campaign: null
    };
  }

  componentDidMount() {
    fetch(`/campaign/${this.campaignID}`)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            campaign: result
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const { error, isLoaded, campaign } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    }
    return (
      <div className="container max-w-xl mx-auto">
        <div className="mx-2 mt-8 p-4 bg-white flex flex-col rounded shadow">
          <div className="border-b border-blue-lighter flex justify-between w-full pb-1 items-center">
            <div className="text-xl sm:text-2xl lg:text-4xl font-semi">
              {campaign.name}
              &nbsp;
              <span className="text-sm text-grey">
                (#
                {campaign.id})
              </span>
            </div>
            <div>
              <CampaignStatus status={campaign.status} />
            </div>
          </div>
          <div className="mt-2 p-4 flex justify-between items-center flex-row">
            <div className="text-sm text-grey-darkest">
              <span className="text-grey text-xs">Goal: </span>
              <i>{campaign.goal}</i>
            </div>
            <div>
              <span className="text-grey text-xs">Budget: </span>$
              <span className="border-b text-sm text-grey-darkest">
                {campaign.total_budget.toFixed(2)}
              </span>
            </div>
          </div>
          <PlatformDetails platforms={campaign.platforms} />
        </div>
      </div>
    );
  }
}
