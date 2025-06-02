"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import toast from "react-hot-toast";
import axios from "axios";

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

  useEffect(() => {
    // Load Paystack script
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
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

  const totalPrice = items.reduce((total, item) => total + Number(item.price), 0);

  const handlePayment = async () => {
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          productIds: items.map((item) => item.id),
          customerEmail: email
        },
        {
          headers: { "Content-Type": "application/json" }
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
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:ml-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order Total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <div className="mt-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full p-2 border rounded-md"
          required
        />
      </div>
      <Button
        disabled={items.length === 0 || loading || !email}
        onClick={handlePayment}
        className="w-full mt-6 rounded-full"
      >
        {loading ? "Processing..." : "Pay Now"}
      </Button>
    </div>
  );
};

export default Summary;

// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import Button from "@/components/ui/button";
// import Currency from "@/components/ui/currency";
// import useCart from "@/hooks/use-cart";
// import toast from "react-hot-toast";
// import axios from "axios";

// declare global {
//   interface Window {
//     PaystackPop: {
//       setup: (options: any) => { openIframe: () => void };
//     };
//   }
// }

// const Summary = () => {
//   const searchParams = useSearchParams();
//   const items = useCart((state) => state.items);
//   const removeAll = useCart((state) => state.removeAll);
//   const [loading, setLoading] = useState(false);
//   const [email, setEmail] = useState("");

//   useEffect(() => {
//     if (searchParams.get("success")) {
//       toast.success("Payment completed");
//       removeAll();
//     }
//     if (searchParams.get("canceled")) {
//       toast.error("Payment was canceled");
//     }
//   }, [searchParams, removeAll]);

//   const totalPrice = items.reduce((total, item) => total + Number(item.price), 0);

//   const handlePayment = async () => {
//     if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
//       toast.error("Please enter a valid email");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
//         {
//           productIds: items.map((item) => item.id),
//           customerEmail: email
//         },
//         {
//           headers: { "Content-Type": "application/json" }
//         }
//       );

//       if (response.data.success) {
//         const { reference, email, amount } = response.data;
        
//         const handler = window.PaystackPop.setup({
//           key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
//           email,
//           amount,
//           ref: reference,
//           currency: "KES",
//           callback: () => {
//             window.location.href = `${window.location.origin}/cart?success=1`;
//           },
//           onClose: () => {
//             window.location.href = `${window.location.origin}/cart?canceled=1`;
//           },
//         });

//         handler.openIframe();
//       } else {
//         throw new Error(response.data.error || "Payment failed");
//       }
//     } catch (error) {
//       toast.error(
//         axios.isAxiosError(error) 
//           ? error.response?.data?.error || "Payment failed"
//           : "An error occurred"
//       );
//       console.error("Payment error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:ml-0 lg:p-8">
//       <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
//       <div className="mt-6 space-y-4">
//         <div className="flex items-center justify-between border-t border-gray-200 pt-4">
//           <div className="text-base font-medium text-gray-900">Order Total</div>
//           <Currency value={totalPrice} />
//         </div>
//       </div>
//       <div className="mt-4">
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Enter your email"
//           className="w-full p-2 border rounded-md"
//           required
//         />
//       </div>
//       <Button
//         disabled={items.length === 0 || loading || !email}
//         onClick={handlePayment}
//         className="w-full mt-6 rounded-full"
//       >
//         {loading ? "Processing..." : "Pay Now"}
//       </Button>
//     </div>
//   );
// };

// export default Summary;