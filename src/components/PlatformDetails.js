import React, { Component } from "react";

import Selector from "./Selector";
import FacebookDetails from "./FacebookDetails";
import InstagramDetails from "./InstagramDetails";
import GoogleDetails from "./GoogleDetails";

class PlatformDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      facebook: this.getPlatform("facebook", props.platforms),
      instagram: this.getPlatform("instagram", props.platforms),
      google: this.getPlatform("google", props.platforms),
      active: null,
      activeType: ""
    };
  }

  componentDidMount() {
    this.getActive();
  }

  getActive(platform) {
    const { facebook, instagram, google } = this.state;
    let active = null;
    if (!platform) {
      platform = facebook.type || instagram.type || google.type;
    }
    switch (platform) {
      case "facebook":
        active = <FacebookDetails platform={facebook} />;
        break;
      case "instagram":
        active = <InstagramDetails platform={instagram} />;
        break;
      case "google":
        active = <GoogleDetails platform={google} />;
        break;
    }
    this.setState({ active, activeType: platform });
  }

  getPlatform(type, platforms) {
    return platforms.find(platform => {
      if (type === platform.type) {
        return platform;
      }
    });
  }

  onSelected(platform) {
    this.getActive(platform);
  }

  render() {
    const { facebook, instagram, google, active, activeType } = this.state;

    return (
      <div className="mt-4">
        <div className="flex border-b">
          <Selector
            platform={"facebook"}
            selected={activeType}
            data={facebook}
            onSelected={this.onSelected.bind(this)}
          />
          <Selector
            platform={"instagram"}
            selected={activeType}
            data={instagram}
            onSelected={this.onSelected.bind(this)}
          />
          <Selector
            platform={"google"}
            selected={activeType}
            data={google}
            onSelected={this.onSelected.bind(this)}
          />
        </div>
        <div className="shadow p-2">{active}</div>
      </div>
    );
  }
}

export default PlatformDetails;
