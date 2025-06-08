"use client"

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

const ThankYouPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (!orderId) {
      // If no orderId, redirect to homepage or cart
      router.replace("/"); // or "/" if you prefer
    }
  }, [orderId, router]);

  if (!orderId) return null; // Prevent showing anything before redirect

  return (
    <main className="relative lg:min-h-full">
      <div className="h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12">
        <Image
          fill
          src="/checkout-thank-you.jpg"
          className="h-full w-full object-cover object-center"
          alt="thank you for your order"
          priority
        />
      </div>

      <div className="relative z-10 mt-96 lg:mt-0 lg:ml-[52%] p-8">
        <h1 className="text-2xl font-semibold text-green-700">Thank you for your order!</h1>
        <p className="mt-2 text-gray-700">
          Your order ID is <span className="font-mono font-bold">{orderId}</span>.
        </p>
      </div>
    </main>
  );
};

export default ThankYouPage;
