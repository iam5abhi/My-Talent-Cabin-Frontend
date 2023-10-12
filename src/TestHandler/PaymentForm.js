// import React, { useState } from 'react';
// import { useRazorpay } from 'react-razorpay';
// // import './PaymentForm.css'; // Import your CSS file if needed

// const PaymentForm = () => {
//   const [payment, setPayment] = useState(null);
//   const razorpay = useRazorpay();

//   const initializePayment = async () => {
//     try {
//       const response = await razorpay.createPayment({
//         amount: 1000, // Amount in paise (e.g., 1000 paise = ₹10)
//         currency: 'INR',
//         receipt: 'order_receipt',
//         payment_capture: 1,
//         key: 'YOUR_API_KEY', // Replace with your Razorpay API key
//         order_id: '1', // Replace with your order ID (optional)
//       });

//       setPayment(response);
//     } catch (error) {
//       console.error('Error initializing payment:', error);
//     }
//   };

//   const handlePayment = async () => {
//     if (payment) {
//       try {
//         await razorpay.open();
//       } catch (error) {
//         console.error('Error during payment:', error);
//       }
//     }
//   };

//   return (
//     <div className="payment-form">
//       <h2>Payment Form</h2>
//       <button onClick={initializePayment}>Initialize Payment</button>
//       <button onClick={handlePayment} disabled={!payment}>
//         Pay Now
//       </button>
//     </div>
//   );
// };

// export default PaymentForm;
