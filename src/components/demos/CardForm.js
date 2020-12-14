import React, { useMemo, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import useResponsiveFontSize from "../../useResponsiveFontSize";

const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "#9e2146",
        },
      },
    }),
    [fontSize]
  );

  return options;
};

const CardForm = (CLIENT_SECRET) => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();
  const [payment, setPayment] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const result = await stripe.confirmCardPayment(
      CLIENT_SECRET.CLIENT_SECRET,
      {
        payment_method: {
          type: "card",
          card: elements.getElement(CardElement),
          billing_details: {
            address: {
              postal_code: "94103",
            },
            email: "test@example.com",
            name: "harry",
            phone: "+15555555555",
          },
        },
      }
    );
    setPayment(result.paymentIntent);

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log("error", result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === "succeeded") {
        console.log("succeeded", result);
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Card details
          <CardElement
            options={options}
            onReady={() => {
              console.log("CardElement [ready]");
            }}
            onChange={(event) => {
              console.log("CardElement [change]", event);
            }}
            onBlur={() => {
              console.log("CardElement [blur]");
            }}
            onFocus={() => {
              console.log("CardElement [focus]");
            }}
          />
        </label>
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
        <label> Do not click twice!</label>
      </form>
      <div>
        <h4>test card info.</h4>
        <li>Card number: 4242 4242 4242 4242</li>
        <li>date: any future date</li>
        <li>CVC: any 3 digits</li>
        <li>ZIP: 00001</li>
      </div>
      <div>
        <h1>Step 3</h1>
        <h4>payment result:</h4>
        {Object.keys(payment).map((key) => {
          const value = payment[key];
          return (
            <p>
              <strong>{key}</strong>: {value}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default CardForm;
