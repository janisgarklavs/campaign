import React, { Component } from "react";

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
      <>
        <div>{campaign.name}</div>
        <div>{campaign.id}</div>
        <div>{campaign.goal}</div>
        <div>{campaign.status}</div>
        <div>{campaign.total_budget}</div>

        {campaign.platforms.map(platform => (
          <>
            <div>
              <div>{platform.type}</div>
              <div>{platform.status}</div>
              <div>{platform.total_budget}</div>
              <div>{platform.remaining_budget}</div>
              <div>{platform.start_date}</div>
              <div>{platform.end_date}</div>
            </div>
            <br />
          </>
        ))}
      </>
    );
  }
}
