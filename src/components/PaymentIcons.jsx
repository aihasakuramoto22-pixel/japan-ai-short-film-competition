import React from 'react';
import { CreditCard } from 'lucide-react';

export default function PaymentIcons() {
  return (
    <div className="flex items-center justify-center gap-4 py-4">
      {/* Credit Card */}
      <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg">
        <CreditCard className="w-6 h-6 text-gray-700" />
        <span className="text-xs font-medium text-gray-700">クレジット</span>
      </div>

      {/* Apple Pay */}
      <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg">
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.325 13.839c-.024-1.333.692-2.477 1.932-3.206-.742-1.071-1.898-1.709-3.126-1.752-1.308-.133-2.605.79-3.281.79-.693 0-1.74-.77-2.872-.744-1.463.024-2.826.87-3.577 2.205-1.547 2.698-.394 6.67 1.088 8.852.741 1.067 1.606 2.258 2.737 2.216 1.106-.046 1.522-.716 2.857-.716 1.318 0 1.707.716 2.872.69 1.19-.024 1.934-1.072 2.654-2.147.839-1.214 1.18-2.386 1.198-2.447-.026-.012-2.296-.898-2.322-3.54zm-2.117-6.283c.593-.742.992-1.748.883-2.767-.854.036-1.893.585-2.509 1.308-.553.654-1.038 1.689-.908 2.684.96.074 1.942-.503 2.534-1.225z"
            fill="currentColor"
            transform="translate(6, 3)"
          />
        </svg>
        <span className="text-xs font-medium text-gray-700">Apple Pay</span>
      </div>

      {/* Google Pay */}
      <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg">
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
            fill="#4285F4"
          />
        </svg>
        <span className="text-xs font-medium text-gray-700">Google Pay</span>
      </div>
    </div>
  );
}
