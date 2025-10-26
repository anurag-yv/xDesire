export default function SuccessPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center">
      <h1 className="text-4xl font-bold text-green-600 mb-4">✅ Payment Successful!</h1>
      <p className="text-lg text-gray-700 mb-6">
        Thank you for your purchase. Your order will be processed soon.
      </p>
      <a
        href="/"
        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
      >
        Back to Home
      </a>
    </div>
  );
}
