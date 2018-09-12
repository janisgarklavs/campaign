import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";


import CampaignList from "./app/CampaignList";
import CampaignDetails from "./app/CampaignDetails";

const NotFound = () => (
    <h1>Not Found!</h1>
)
  

try {
    render(
        <BrowserRouter>
            <>
                <CssBaseline/>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="title" color="inherit">
                            <NavLink to="/" style={{ textDecoration: 'none', color: 'unset' }}>
                                Nanos
                            </NavLink>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Switch>
                    <Route exact path="/" component={CampaignList}/>
                    <Route exact path="/details/:id" component={CampaignDetails}/>
                    <Route component={NotFound} />
                </Switch>
            </>  
        </BrowserRouter>
    ,document.getElementById("app"))
} catch (e) {
    console.error(e)
}