import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/billboard";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  const billboard = await getBillboard("7616b8e9-e147-4d30-a83e-22192ff03b84");

  // Handle the case where billboard is null or undefined
  if (!billboard) {
    return (
      <Container>
        <div className="space-y-10 pb-10">
          <div>No billboard found</div>
          <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
            <ProductList title="Featured Products" items={products} />
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Featured Products" items={products} />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
// import getBillboard from "@/actions/get-billboard";
// import getProducts from "@/actions/get-products";
// import Billboard from "@/components/billboard";
// import ProductList from "@/components/product-list";
// import Container from "@/components/ui/container";

// export const revalidate = 0;

// const HomePage = async () => {
//   const products = await getProducts({ isFeatured: true });
//   const billboard = await getBillboard("85bc7190-88ba-45c0-9151-ec018453249c");

//   return ( 
//     <Container>
//       <div className="space-y-10 pb-10">
//         <Billboard data={billboard} />
//       <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
//           <ProductList title="Featured Products" items={products} />
//       </div>
//       </div>
//     </Container>
//    );
// }
 
// export default HomePage;