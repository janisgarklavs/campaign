import React, { Component } from "react";

import Campaign from "./Campaign";
import CampaignListHeader from "./CampaignListHeader";

export default class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      campaigns: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:8081/campaign")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            campaigns: result
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
    const { error, isLoaded, campaigns } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    }
    return (
      <div className="mt-4">
        <CampaignListHeader />
        {campaigns.map(campaign => (
          <Campaign key={campaign.id} campaign={campaign} />
        ))}
      </div>
    );
  }
}
