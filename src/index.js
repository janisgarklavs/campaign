import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./main.css";

import IndexPage from "./pages/IndexPage";
import DetailsPage from "./pages/DetailsPage";
import Header from "./components/Header";

const NotFound = () => <h1>Not Found!</h1>;

try {
  render(
    <BrowserRouter>
      <>
        <Header />
        <div className="container mx-auto font-sans overflow-hidden h-full">
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
