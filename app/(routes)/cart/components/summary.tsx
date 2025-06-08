"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import toast from "react-hot-toast";
import axios from "axios";
import { useUser, useClerk } from "@clerk/nextjs";

declare global {
  interface Window {
    PaystackPop: {
      setup: (options: any) => { openIframe: () => void };
    };
  }
}

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [shippingMethod, setShippingMethod] = useState("pickup");

  const { user } = useUser();
  const { openSignIn } = useClerk();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed");
      removeAll();
    }
    if (searchParams.get("canceled")) {
      toast.error("Payment was canceled");
    }
  }, [searchParams, removeAll]);

  useEffect(() => {
    const pending = localStorage.getItem("pendingCheckout");
    if (pending === "true" && user) {
      localStorage.removeItem("pendingCheckout");

      if (user.primaryEmailAddress?.emailAddress) {
        setEmail(user.primaryEmailAddress.emailAddress);
        handlePayment(user.primaryEmailAddress.emailAddress);
      } else {
        toast.error("Unable to retrieve user email");
      }
    }
  }, [user]);

  const totalPrice = items.reduce((total, item) => total + Number(item.price) * item.quantity, 0) + (shippingMethod === "courier" ? 300 : 0);

  const handlePayment = async (overrideEmail?: string) => {
    if (!user) {
      localStorage.setItem("pendingCheckout", "true");
      await openSignIn();
      return;
    }

    const finalEmail = overrideEmail || email || user.primaryEmailAddress?.emailAddress;

    if (!finalEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(finalEmail)) {
      toast.error("Please enter a valid email");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          items: items.map((item) => ({
            id: item.id,
            quantity: item.quantity,
          })),
          customerEmail: finalEmail,
          phone,
          address,
          shippingMethod,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.success && window.PaystackPop) {
        const handler = window.PaystackPop.setup({
          key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
          email: response.data.email,
          amount: response.data.amount,
          ref: response.data.reference,
          currency: "KES",
          callback: () => {
            window.location.href = `${window.location.origin}/cart?success=1`;
          },
          onClose: () => {
            window.location.href = `${window.location.origin}/cart?canceled=1`;
          },
        });

        handler.openIframe();
      } else {
        throw new Error(response.data.error || "Payment failed");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(
        axios.isAxiosError(error)
          ? error.response?.data?.error || "Payment failed"
          : "An error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-23 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:ml-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border rounded-md bg-white"
          placeholder="Enter your phone number"
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 border rounded-md bg-white"
          placeholder="Enter delivery address"
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Method</label>
        <div className="space-y-2">
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="shipping"
              value="pickup"
              checked={shippingMethod === "pickup"}
              onChange={() => setShippingMethod("pickup")}
              className="form-radio"
            />
            <span>Pickup point (Free)</span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="shipping"
              value="courier"
              checked={shippingMethod === "courier"}
              onChange={() => setShippingMethod("courier")}
              className="form-radio"
            />
            <span>Courier A (KES 300)</span>
          </label>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order Total</div>
          <Currency value={totalPrice} />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Email Account</label>
        <p className="w-full p-2 border rounded-md bg-white text-gray-700">
          {user?.primaryEmailAddress?.emailAddress || "Sign In"}
        </p>
      </div>

      <Button
        disabled={items.length === 0 || loading}
        onClick={() => handlePayment()}
        className="w-full mt-6 rounded-full flex justify-center items-center bg-black hover:bg-grey-700 text-white"
      >
        {loading ? (
          <>
            <svg
              className="mr-3 h-5 w-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          </>
        ) : (
          <>{user ? "Checkout" : "Sign In to Checkout"}</>
        )}
      </Button>
    </div>
  );
};

export default Summary;
