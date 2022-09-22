import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CheckoutForm from '../components/CheckoutForm';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

export default function Checkout() {
  const [clientSecret, setClientSecret] = React.useState('');

  React.useEffect(() => {
    fetch(
      'https://5000-psmoke2-psmoke2-cv5fj266ne3.ws-eu67.gitpod.io/stripe/create-payment-intent/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(localStorage.getItem('cart-items')),
      },
    )
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  });

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
