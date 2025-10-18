import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Check, X, Loader } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder');

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (error) {
      setMessage(error.message);
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      // Confirm payment with backend
      try {
        const response = await axios.post(`${API_URL}/confirm-payment`, {
          paymentIntentId: paymentIntent.id
        });

        if (response.data.success) {
          navigate('/success');
        } else {
          setMessage('支払いの確認に失敗しました');
          setIsLoading(false);
        }
      } catch (err) {
        setMessage('支払いの確認中にエラーが発生しました');
        setIsLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <PaymentElement />

      <button
        disabled={isLoading || !stripe || !elements}
        className="w-full mt-6 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            処理中...
          </>
        ) : (
          <>
            <Check className="w-5 h-5" />
            支払いを完了する（¥2,000）
          </>
        )}
      </button>

      {message && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
          <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-800">{message}</p>
        </div>
      )}
    </form>
  );
}

export default function StripePaymentPage() {
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get client secret from session storage
    const secret = sessionStorage.getItem('clientSecret');

    if (!secret) {
      // Redirect to home if no payment session
      navigate('/');
      return;
    }

    setClientSecret(secret);
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-gray-600" />
      </div>
    );
  }

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#000000',
      },
    },
    locale: 'ja',
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 py-4">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-black">
            Japan AI Short Film Competition
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black mb-2">
            お支払い
          </h2>
          <p className="text-gray-600">
            応募料 ¥2,000をお支払いください。クレジットカード、Apple Pay、Google Payがご利用いただけます。
          </p>
        </div>

        {/* Payment Icons */}
        <div className="flex items-center justify-center gap-3 mb-8 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <span>クレジットカード</span>
          </div>
          <span className="text-gray-400">・</span>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.325 13.839c-.024-1.333.692-2.477 1.932-3.206-.742-1.071-1.898-1.709-3.126-1.752-1.308-.133-2.605.79-3.281.79-.693 0-1.74-.77-2.872-.744-1.463.024-2.826.87-3.577 2.205-1.547 2.698-.394 6.67 1.088 8.852.741 1.067 1.606 2.258 2.737 2.216 1.106-.046 1.522-.716 2.857-.716 1.318 0 1.707.716 2.872.69 1.19-.024 1.934-1.072 2.654-2.147.839-1.214 1.18-2.386 1.198-2.447-.026-.012-2.296-.898-2.322-3.54zm-2.117-6.283c.593-.742.992-1.748.883-2.767-.854.036-1.893.585-2.509 1.308-.553.654-1.038 1.689-.908 2.684.96.074 1.942-.503 2.534-1.225z" transform="translate(6, 3)" />
            </svg>
            <span>Apple Pay</span>
          </div>
          <span className="text-gray-400">・</span>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="#4285F4" />
            </svg>
            <span>Google Pay</span>
          </div>
        </div>

        {/* Stripe Payment Form */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )}
        </div>

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800 text-center">
            <span className="inline-block w-4 h-4 mr-2">🔒</span>
            お支払い情報はStripeによって安全に処理されます
          </p>
        </div>
      </main>
    </div>
  );
}
