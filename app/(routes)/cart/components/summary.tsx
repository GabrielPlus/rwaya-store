"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import { Label } from "@/components/ui/label"
import useCart from "@/hooks/use-cart";
import toast from "react-hot-toast";
import axios from "axios";
import { useUser, useClerk } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";

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
  const [customerName, setCustomerName] = useState("");
  const [county, setCounty] = useState("");
  const [idNumber, setIdNumber] = useState("");

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
    const success = searchParams.get("success");
    const canceled = searchParams.get("canceled");
  
    if (success) {
      toast.success("Payment completed", { id: "payment-status" });
      removeAll();
      window.history.replaceState(null, '', window.location.pathname);
    } else if (canceled) {
      toast.error("Payment was canceled", { id: "payment-status" });
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, [searchParams, removeAll]);

  useEffect(() => {
    const pending = localStorage.getItem("pendingCheckout");
    if (pending === "true" && user) {
      localStorage.removeItem("pendingCheckout");
      if (user.primaryEmailAddress?.emailAddress) {
        setEmail(user.primaryEmailAddress.emailAddress);
      } else {
        toast.error("Unable to retrieve user email");
      }
    }
  }, [user]);

  const totalPrice = items.reduce((total, item) => total + Number(item.price) * item.quantity, 0);

  const handlePayment = async (overrideEmail?: string) => {
    if (!user) {
      localStorage.setItem("pendingCheckout", "true");
      await openSignIn();
      return;
    }
  
    const finalEmail = overrideEmail || email || user.primaryEmailAddress?.emailAddress;
  
    if (!finalEmail || !/^\S+@\S+\.\S+$/.test(finalEmail)) {
      toast.error("Please enter a valid email");
      return;
    }
  
    if (!customerName || !phone || !address || !county || !idNumber) {
      toast.error("Please fill in all required fields");
      return;
    }
  
    setLoading(true);
  
    const requestData = {
      items: items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      })),
      customerEmail: finalEmail,
      phone,
      address,
      county,
      customerName,
      idNumber,
    };
  
    console.log("Full checkout request:", requestData); // 🔍 Debug
  
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        requestData,
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
    <>
      {/* Main content area with padding at bottom to avoid button overlap on mobile */}
      <div className="mt-20 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:ml-0 lg:p-8 pb-32 lg:pb-8">
        <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
        
        {/* Cart Items Display */}

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <div className="text-base font-medium text-gray-900">Order Total</div>
            <Currency value={totalPrice} />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Account
          </label>
          <p className="w-full p-2 border rounded-md bg-white text-gray-700">
            {user?.primaryEmailAddress?.emailAddress || "Sign In"}
          </p>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <Input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Name"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <Input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="0712345678"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <Input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="1234 Street Name"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            County
          </label>
          <Input
            type="text"
            value={county}
            onChange={(e) => setCounty(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Nairobi"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ID Number
          </label>
          <Input
            type="text"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="12345678"
          />
        </div>

        {/* Desktop Checkout Button - Hidden on mobile */}
        <div className="hidden lg:block">
          <Button
            disabled={items.length === 0 || loading}
            onClick={() => handlePayment()}
            className="w-full mt-6 rounded-full flex justify-center items-center bg-black hover:bg-gray-800 text-white py-3 font-medium transition-colors duration-200"
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
                Processing...
              </>
            ) : (
              <>{user ? "Checkout" : "Sign In to Checkout"}</>
            )}
          </Button>
        </div>
      </div>

      {/* Floating/Sticky Checkout Button - Only on mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 lg:hidden">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          {/* Show order total in the floating bar */}
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-gray-600">
              Total: <Currency value={totalPrice} />
            </div>
            <div className="text-xs text-gray-500">
              {items.length} item{items.length !== 1 ? 's' : ''}
            </div>
          </div>
          
          <Button
            disabled={items.length === 0 || loading}
            onClick={() => handlePayment()}
            className="w-full rounded-full flex justify-center items-center bg-black hover:bg-gray-800 text-white py-3 font-medium transition-colors duration-200"
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
                Processing...
              </>
            ) : (
              <>{user ? "Checkout" : "Sign In to Checkout"}</>
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Summary;