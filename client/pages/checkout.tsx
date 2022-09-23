import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import axios from 'axios';

import CheckoutForm from '../components/CheckoutForm';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

export default function Checkout() {
  const [clientSecret, setClientSecret] = React.useState('');

  React.useEffect(() => {
    async function initReq() {
      const items =
        { items: JSON.parse(localStorage.getItem('cart-items')) } || {};
      const res = await axios.post(
        'https://5000-psmoke2-psmoke2-cv5fj266ne3.ws-eu67.gitpod.io/stripe/create-payment-intent',
        items,
      );
      const data = await res.data;
      setClientSecret(data.clientSecret);
    }
    initReq();
  }, []);

  const appearance = {
    theme: 'stripe',
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
