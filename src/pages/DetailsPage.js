import React, { Component } from "react";

import FacebookDetails from "../components/FacebookDetails";
import InstagramDetails from "../components/InstagramDetails";
import GoogleDetails from "../components/GoogleDetails";
import CampaignStatus from "../components/CampaignStatus";

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

  componentByPlatform(platform) {
    if (platform.type === "facebook") {
      return <FacebookDetails platform={platform} />;
    }
    if (platform.type === "instagram") {
      return <InstagramDetails platform={platform} />;
    }
    if (platform.type === "google") {
      return <GoogleDetails platform={platform} />;
    }
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
        <div className="mt-8 p-4 bg-white flex flex-col rounded shadow">
          <div className="border-b border-blue-lighter flex justify-between w-full pb-1 items-center">
            <div className="text-4xl font-semi">
              {campaign.name}
              &nbsp;
              <span className="text-sm text-grey">
                (#
                {campaign.id})
              </span>
            </div>
            <div>
              <CampaignStatus status={campaign.status} large />
            </div>
          </div>
          <div className="mt-2 p-4">
            <div className="text-sm text-grey-darkest mb-4">
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
        </div>
        <div className="flex mt-1 -mx-1 justify-between">
          {campaign.platforms.map(platform => (
            <div className="px-1 w-full" key={platform.type}>
              <div className="bg-white shadow rounded p-4">
                {this.componentByPlatform(platform)}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
