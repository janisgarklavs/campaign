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
    fetch(`http://localhost:8081/campaign/${this.campaignID}`)
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
    return <h1>{campaign.id}</h1>;
  }
}
