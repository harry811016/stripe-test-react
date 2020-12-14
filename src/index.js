import React from "react";
import ReactDOM from "react-dom";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { BrowserRouter } from "react-router-dom";

import ElementDemos from "./components/ElementDemos";
import CardForm from "./components/demos/CardForm";
import SplitForm from "./components/demos/SplitForm";

import "./styles.css";
const stripePromise = loadStripe(process.env.REACT_APP_API_KEY);

const demos = [
  {
    path: "/card-element",
    label: "CardElement",
    component: CardForm,
  },
  {
    path: "/split-card-elements",
    label: "Split Card Elements",
    component: SplitForm,
  },
];

const App = () => {
  return (
    <BrowserRouter>
      <Elements stripe={stripePromise}>
        <ElementDemos demos={demos} />
      </Elements>
    </BrowserRouter>
  );
};

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);
