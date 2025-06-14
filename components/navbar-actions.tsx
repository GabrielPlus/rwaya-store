"use client";

import { ShoppingCart } from "lucide-react";
import Button from "./ui/button";
import { useEffect, useState } from "react";
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

const NavbarActions = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);


    const router = useRouter();
    const cart = useCart();

    if (!isMounted) {
        return null;
    }
    
    return ( 
<div className="ml-auto flex items-center gap-x-4">
  {/* Cart Button */}
  <Button
    onClick={() => router.push("/cart")}
    className="flex items-center rounded-full bg-black px-4 py-2"
  >
    <ShoppingCart size={20} color="white" />
    <span className="ml-2 text-sm font-medium text-white">
    {cart.getTotalQuantity()}
    </span>
  </Button>

  {/* Clerk User Avatar */}
  <UserButton />
</div>

     );
}
 
export default NavbarActions;