import Link from "next/link";
import Container from "./ui/container";
import MainNav from "@/components/main-nav";
import getCategories from "@/actions/get-categories";
import NavbarActions from "./navbar-actions";

const revalidate = 0;

const Navbar = async () => {
    const categories = await getCategories();

    return ( 
        <div className="border-b">
            <Container>
                <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
                <Link href="/" className="ml-4 lg:ml-0 gap-x-2">
                <p className="font-bold text-xl">STORE</p>
                </Link>
                <MainNav data={categories} />
                <NavbarActions />
                </div>
            </Container>
        </div>
     );
}
 
export default Navbar;

// import Link from "next/link";
// import Image from "next/image";
// import Container from "./ui/container";
// import MainNav from "@/components/main-nav";
// import getCategories from "@/actions/get-categories";
// import NavbarActions from "./navbar-actions";

// const revalidate = 0;

// const Navbar = async () => {
//     const categories = await getCategories();

//     return (
//         <div className="border-b">
//             <Container>
//                 <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
//                     <Link href="/" className="ml-4 lg:ml-0 gap-x-2">
                        // <Image
                        //     src="/logo.png"
                        //     alt="Logo"
                        //     width={350} // Adjust width
                        //     height={100} // Adjust height
                        //     className="h-16 w-auto object-contain" // Use h-16 for a bigger size
                        // />

//                     </Link>
                    
//                     <MainNav data={categories} />
//                     <NavbarActions />
//                 </div>
//             </Container>
//             <h1>dede</h1>
//         </div>
//     );
// }

// export default Navbar;
