import React, { Component } from "react"

import Paper from "@material-ui/core/Paper";

export default class CampaignList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            campaigns: []
        }
    }

    componentDidMount() {
        fetch("http://localhost:8081/campaign")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        campaigns: result
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
    }

    render() {
        const {error, isLoaded, campaigns} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>
        }
        return  (
            <Paper>
                {campaigns.map(campaign => (
                    <>
                        <div>{campaign.id}</div>
                        <div>{campaign.goal}</div>
                    </>
                ))}
            </Paper>   

        )
        
    }
}