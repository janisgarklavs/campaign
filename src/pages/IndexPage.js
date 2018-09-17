import React, { Component } from "react";

import CampaignCard from "../components/CampaignCard";

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
    fetch("/campaign")
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
      <div className="mt-8 flex flex-wrap -mx-2 justify-between">
        {campaigns.map(campaign => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    );
  }
}
