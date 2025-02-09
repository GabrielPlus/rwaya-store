"use client";

import { BookOpen, Briefcase, Home, Inbox, Calendar, Search, Settings } from "lucide-react";
import { Menu, X } from "lucide-react";
import IconButton from "./icon-button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { Category } from "@/types";

interface MobileNavProps {
  categories: Category[];
}

const MobileNav: React.FC<MobileNavProps> = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const iconMap: Record<string, any> = {
    "Home": Home,
    "Inbox": Inbox,
    "Calendar": Calendar,
    "Search": Search,
    "Settings": Settings,
    "Books": BookOpen,
    "Business": Briefcase
  };
  

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  if (!isOpen)
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="lg:hidden relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>
    );

  return (
    <div>
      <div className="relative z-40 lg:hidden">
        <div className="fixed inset-0 bg-black bg-opacity-25" />
      </div>

      <div className="fixed inset-0 z-40 flex">
        <div className="w-4/5 h-full flex flex-col bg-white shadow-xl">
          <div className="flex px-4 pb-2 pt-5">
            <div className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400">
              <IconButton icon={<X size={15} />} onClick={() => setIsOpen(false)} aria-hidden="true" />
            </div>
          </div>

          <div className="space-y-6 border-t border-gray-200 px-4 py-6 flex-1 overflow-y-auto">
            <div className="font-medium text-gray-900">MY RWAYA ACCOUNT</div>
            <UserButton />

            {categories.map((category) => {
  const IconComponent = iconMap[category.name] || Search; // Default to Search if no match
  return (
    <div key={category.id} className="flow-root">
      <Link
        onClick={() => closeOnCurrent(`/category/${category.id}`)}
        href={`/category/${category.id}`}
        className="-m-2 flex items-center space-x-2 p-2 font-medium text-gray-900"
      >
        <IconComponent className="h-5 w-5" /> {/* Render the icon */}
        <span>{category.name}</span>
      </Link>
    </div>
  );
})}


          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;


// 'use client'

// import { Menu, X, Calendar, Home, Inbox, Search, Settings } from 'lucide-react'
// import IconButton from "./icon-button";
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import { useEffect, useState } from 'react'
// import { UserButton } from '@clerk/nextjs';

// const menuItems = [
//   { title: "Home", url: "#", icon: Home },
//   { title: "Inbox", url: "#", icon: Inbox },
//   { title: "Calendar", url: "#", icon: Calendar },
//   { title: "Search", url: "#", icon: Search },
//   { title: "Settings", url: "#", icon: Settings },
// ];

// const MobileNav = () => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const pathname = usePathname();

//   useEffect(() => {
//     setIsOpen(false);
//   }, [pathname]);

//   const closeOnCurrent = (href: string) => {
//     if (pathname === href) {
//       setIsOpen(false);
//     }
//   };

//   useEffect(() => {
//     if (isOpen) document.body.classList.add('overflow-hidden');
//     else document.body.classList.remove('overflow-hidden');
//   }, [isOpen]);

//   if (!isOpen)
//     return (
//       <button
//         type='button'
//         onClick={() => setIsOpen(true)}
//         className='lg:hidden relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400'>
//         <Menu className='h-6 w-6' aria-hidden='true' />
//       </button>
//     );

//   return (
//     <div>
//       <div className='relative z-40 lg:hidden'>
//         <div className='fixed inset-0 bg-black bg-opacity-25' />
//       </div>

//       <div className='fixed inset-0 z-40 flex'>
//         <div className='w-4/5 h-full flex flex-col bg-white shadow-xl'>
//           <div className='flex px-4 pb-2 pt-5'>
//             <div className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400">
//               <IconButton 
//                 icon={<X size={15} />} 
//                 onClick={() => setIsOpen(false)} 
//                 aria-hidden='true' 
//               />
//             </div>
//           </div>
          
//           <div className='space-y-6 border-t border-gray-200 px-4 py-6 flex-1 overflow-y-auto'>
//             <div className='font-medium text-gray-900'>MY RWAYA ACCOUNT</div>
//             <UserButton />

//             {menuItems.map((item) => (
//               <div key={item.title} className='flow-root'>
//                 <Link
//                   onClick={() => closeOnCurrent(item.url)}
//                   href={item.url}
//                   className='-m-2 flex items-center space-x-2 p-2 font-medium text-gray-900'>
//                   <item.icon className='w-5 h-5' />
//                   <span>{item.title}</span>
//                 </Link>
//               </div>
//             ))}

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MobileNav;