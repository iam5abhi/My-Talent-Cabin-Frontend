import React, { useEffect, useState } from 'react';
import Razorpay from 'razorpay';
import assert from 'assert';

const PaymentForm = () => {
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = initializePayment;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initializePayment = () => {
    const options = {
      key: 'YOUR_API_KEY', // Replace with your Razorpay API key
      amount: 1000, // Amount in paise (e.g., 1000 paise = ₹10)
      currency: 'INR',
      name: 'Acme Corp', // Merchant name
      description: 'Purchase Description',
      image: 'https://your-logo-url.com/logo.png', // Merchant logo URL (optional)
      handler: handlePaymentSuccess,
      prefill: {
        email: 'customer@example.com',
        contact: '1234567890',
      },
      theme: {
        color: '#F37254', // Set the desired theme color
      },
    };

    const paymentObject = new Razorpay(options);
    setPayment(paymentObject);
  };

  const handlePaymentSuccess = (response) => {
    console.log('Payment Successful:', response);
    // Perform necessary actions after successful payment
  };

  const handlePayment = () => {
    if (payment) {
      payment.open();
    }
  };

  return (
    <div>
      <h2>Payment Form</h2>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default PaymentForm;
