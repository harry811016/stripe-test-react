import React, { useMemo, useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";

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

const SplitForm = (CLIENT_SECRET) => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();
  const [payment, setPayment] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    const result = await stripe.confirmCardPayment(
      CLIENT_SECRET.CLIENT_SECRET,
      {
        payment_method: {
          type: "card",
          card: elements.getElement(CardNumberElement),
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
          Card number
          <CardNumberElement
            options={options}
            onReady={() => {
              console.log("CardNumberElement [ready]");
            }}
            onChange={(event) => {
              console.log("CardNumberElement [change]", event);
            }}
            onBlur={() => {
              console.log("CardNumberElement [blur]");
            }}
            onFocus={() => {
              console.log("CardNumberElement [focus]");
            }}
          />
        </label>
        <label>
          Expiration date
          <CardExpiryElement
            options={options}
            onReady={() => {
              console.log("CardExpiryElement [ready]");
            }}
            onChange={(event) => {
              console.log("CardExpiryElement [change]", event);
            }}
            onBlur={() => {
              console.log("CardExpiryElement [blur]");
            }}
            onFocus={() => {
              console.log("CardExpiryElement [focus]");
            }}
          />
        </label>
        <label>
          CVC
          <CardCvcElement
            options={options}
            onReady={() => {
              console.log("CardCvcElement [ready]");
            }}
            onChange={(event) => {
              console.log("CardCvcElement [change]", event);
            }}
            onBlur={() => {
              console.log("CardCvcElement [blur]");
            }}
            onFocus={() => {
              console.log("CardCvcElement [focus]");
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
      </div>
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
  );
};

export default SplitForm;
