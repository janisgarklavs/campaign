import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./main.css";

import IndexPage from "./app/IndexPage";
import DetailsPage from "./app/DetailsPage";
import Header from "./app/Header";

const NotFound = () => <h1>Not Found!</h1>;

try {
  render(
    <BrowserRouter>
      <>
        <Header />
        <div className="container mx-auto font-sans">
          <Switch>
            <Route exact path="/" component={IndexPage} />
            <Route exact path="/details/:id" component={DetailsPage} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </>
    </BrowserRouter>,
    document.getElementById("app")
  );
} catch (e) {
  console.error(e);
}
