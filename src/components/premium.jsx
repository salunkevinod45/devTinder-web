import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants';

const Premium = () => {

  const [isPremiumUser, setIsPremiumUser] = useState(false);

  const checkPremiumStatus = async () => {
    try {
      const response = await axios.get(`${BASE_URL}payments/check-is-premium-user`, { withCredentials: true });
      setIsPremiumUser(response.data.isPremium);
    } catch (error) {
      console.error('Error checking premium status:', error);
    }
  };

  useEffect(() => {
    checkPremiumStatus();
  }, []);

  const handleBuy = async(plan) => {
    try {
      const payload = {
      "amount": plan === 'Silver' ? 49900 : 99900, // Amount in paise (e.g., ₹499.00 or ₹999.00)
      "currency": "INR",
      "receipt": "order_rcptid_11",
      "memberShipType":plan
    }
      const orderData = await axios.post(`${BASE_URL}payments/create-order`, payload ,{ withCredentials: true });
      console.log(orderData.data)
      const {amount,currency,razorpayOrderId,keyId,name,email} = orderData.data.order;
      console.log(plan)

        // Open Razorpay Checkout
      const options = {
        key: keyId, // Replace with your Razorpay key_id
        amount: amount, // Amount is in currency subunits.
        currency: currency,
        name: name,
        description: 'Connect with other developers',
        order_id: razorpayOrderId, // This is the order_id created in the backend
        prefill: {
          name,
          email,
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        },
        handler: (res)=> {
          console.log('razorpay res ',res);
          // After successful payment, check premium status again to update UI
          checkPremiumStatus();
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error('Error processing payment:', error);
    }
  }

  return (
    isPremiumUser ? (
      <div className="bg-base-200 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Thank You for Upgrading!</h1>
          <p className="text-lg text-gray-600">
            You are now a premium member. Enjoy all the exclusive features and benefits!
          </p>
        </div>
      </div>
    ) :
    <>
       <div className="bg-base-200 min-h-screen">

      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <h1 className="text-4xl font-bold mb-4">
          Flexible Payment Options
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Choose the payment method that works best for you. Secure,
          flexible and convenient.
        </p>
      </section>

      {/* Payment Options */}
      <section className="px-6 pb-16">
        <div className="grid md:grid-cols-3 gap-8">

          {/* Credit/Debit Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Bronz</h2>
              <p>Free account creation</p>

              <ul className="mt-4 space-y-2 text-sm">
                <li>✔ 10 days free explore our products</li>
                <li>✔ Promotional 5 connection requests</li>
                <li>✔ Worldwide Acceptance</li>
              </ul>

              <div className="card-actions justify-end mt-4">
                <button className="btn btn-outline btn-primary">
                  Free
                </button>
              </div>
            </div>
          </div>

          {/* Digital Wallet */}
          <div className="card bg-base-100 shadow-xl border-2 border-primary relative">
            <div className="badge badge-primary absolute right-4 top-4">
              Most Popular
            </div>

            <div className="card-body">
              <h2 className="card-title">Silver</h2>
              <p>
                Use razorPay for quick checkout.
              </p>

              <ul className="mt-4 space-y-2 text-sm">
                <li>✔ chat with other people</li>
                <li>✔ 100 connection requests per day</li>
                <li>✔ Blue tick</li>
                <li>✔ valid for 3 months</li>
              </ul>

              <div className="card-actions justify-end mt-4">
                <button className="btn btn-primary" onClick={()=> handleBuy('Silver')}>Buy</button>
              </div>
            </div>
          </div>

          {/* Bank Transfer */}
          <div className="card bg-base-100 shadow-xl">
                    <div className="badge badge-primary absolute right-4 top-4">
              Most Popular
            </div>
            <div className="card-body">
              <h2 className="card-title">Gold</h2>
              <p>
                Use razorPay for quick checkout.
              </p>

              <ul className="mt-4 space-y-2 text-sm">
      <li>✔ chat with other people</li>
                <li>✔ 500 connection requests per day</li>
                <li>✔ Blue tick</li>
                <li>✔ valid for 6 months</li>
              </ul>

              <div className="card-actions justify-end mt-4">
                <button className="btn btn-primary" onClick={()=> handleBuy('Gold')}>
                  Buy
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-base-100 py-16 px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Why Choose Us?</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">

          <div>
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="font-semibold text-lg mb-2">
              Secure Payments
            </h3>
            <p className="text-gray-600">
              All transactions are encrypted and protected.
            </p>
          </div>

          <div>
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="font-semibold text-lg mb-2">
              Fast Processing
            </h3>
            <p className="text-gray-600">
              Quick checkout and instant confirmations.
            </p>
          </div>

          <div>
            <div className="text-4xl mb-4">🌍</div>
            <h3 className="font-semibold text-lg mb-2">
              Global Access
            </h3>
            <p className="text-gray-600">
              Pay from anywhere in the world with ease.
            </p>
          </div>

        </div>
      </section>

    </div>
    </>
  )
}

export default Premium