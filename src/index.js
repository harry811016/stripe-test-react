import React from "react";
import ReactDOM from "react-dom";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { BrowserRouter } from "react-router-dom";

import ElementDemos from "./components/ElementDemos";
import CardForm from "./components/demos/CardForm";
import SplitForm from "./components/demos/SplitForm";

import "./styles.css";

const stripePromise = loadStripe(
  "pk_test_51Hx6rgJm09sZXIFALmaQ3iRq7bWLvclF97l5F0u7HYziO21ndGIuJHFqnAE4VwRhQRwbE13c0s05id7y1Kvqdj1N00SfVSpCFc"
);

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
