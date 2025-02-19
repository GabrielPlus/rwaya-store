"use client";

import * as React from "react";
import * as FaIcons from "react-icons/fa";
import * as PiIcons from "react-icons/pi";
import * as MdIcons from "react-icons/md";
import * as IoIcons from "react-icons/io";
import * as Io5Icons from "react-icons/io5";
import * as RiIcons from "react-icons/ri";
import * as GiIcons from "react-icons/gi";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Category } from "@/types";

interface MobileNavProps {
  categories: Category[];
}

// Combine all icons into one object
const allIcons = {
  ...FaIcons,
  ...RiIcons,
  ...PiIcons,
  ...GiIcons,
  ...MdIcons,
  ...IoIcons,
  ...Io5Icons,
};

const MobileNav: React.FC<MobileNavProps> = ({ categories }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
      <button
  type="button"
  className="lg:hidden relative mr-0.5 -m-4 inline-flex items-center justify-center rounded-md "
>
  <span className="bg-gray-200 p-2 rounded-r-full w-14">☰</span> {/* Simple text-based menu icon */}
</button>
      </DrawerTrigger>

      <DrawerContent className="h-1/2 w-full fixed bottom-0 left-0 rounded-t-2xl bg-white shadow-lg">
        <DrawerHeader className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <DrawerTitle>Explore Categories</DrawerTitle>
          <DrawerClose asChild>
            <button className="p-2 text-gray-500 rounded-md hover:bg-gray-100">
              ✖ {/* Simple text-based close icon */}
            </button>
          </DrawerClose>
        </DrawerHeader>

        {/* Scrollable content area */}
        <div className="p-4 flex flex-col gap-4 overflow-y-auto max-h-[70%]">
          <UserButton />
          {categories.map((category) => {
  const iconKey = category.iconvalue as keyof typeof allIcons;
  const IconComponent = allIcons[iconKey];

  return (
    <Link
      key={category.id}
      href={`/category/${category.id}`}
      className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-100 text-gray-900"
      onClick={() => setIsOpen(false)}
    >
      {IconComponent ? <IconComponent className="h-5 w-5" /> : <span>🚫</span>} {/* Default if no icon */}
      <span>{category.name}</span>
    </Link>
  );
})}

        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNav;



// "use client";

// import * as React from "react";
// import { Button } from "@/components/ui/button2";
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "@/components/ui/drawer";
// import { UserButton } from "@clerk/nextjs";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Category } from "@/types";

// interface MobileNavProps {
//   categories: Category[];
// }

// const MobileNav: React.FC<MobileNavProps> = ({ categories }) => {
//   const [isOpen, setIsOpen] = React.useState(false);
//   const pathname = usePathname();

//   React.useEffect(() => {
//     setIsOpen(false);
//   }, [pathname]);

//   return (
//     <Drawer open={isOpen} onOpenChange={setIsOpen}>
//       <DrawerTrigger asChild>
//         <button
//           type="button"
//           className="lg:hidden relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
//         >
//           ☰ {/* Simple text-based menu icon */}
//         </button>
//       </DrawerTrigger>
      
//       <DrawerContent className="h-1/2 w-full fixed bottom-0 left-0 rounded-t-2xl bg-white shadow-lg">
//         <DrawerHeader className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
//           <DrawerTitle>Explore Categories</DrawerTitle>
//           <DrawerClose asChild>
//             <button className="p-2 text-gray-500 rounded-md hover:bg-gray-100">
//               ✖ {/* Simple text-based close icon */}
//             </button>
//           </DrawerClose>
//         </DrawerHeader>

//         {/* Scrollable content area */}
//         <div className="p-4 flex flex-col gap-4 overflow-y-auto max-h-[70%]">
//           <UserButton />

//           {categories.map((category) => (
//             <Link
//               key={category.id}
//               href={`/category/${category.id}`}
//               className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-100 text-gray-900"
//               onClick={() => setIsOpen(false)}
//             >
//               <span>{category.name}</span>
//             </Link>
//           ))}
//         </div>
//       </DrawerContent>
//     </Drawer>
//   );
// };

// export default MobileNav;
