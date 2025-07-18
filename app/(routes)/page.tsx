import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import BillboardSwiper from "@/components/billboard-swiper";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  
  // Fetch two billboards
  const billboard1 = await getBillboard("7616b8e9-e147-4d30-a83e-22192ff03b84");
  const billboard2 = await getBillboard("9c8aea9a-d969-4cd7-9221-f03621fc4591"); // Replace with your second billboard ID
  
  // Filter out any null billboards
  const billboards = [billboard1, billboard2].filter(Boolean);

  // Handle the case where no billboards are found
  if (billboards.length === 0) {
    return (
      <Container>
        <div className="space-y-10 pb-10">
          <div>No billboards found</div>
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
        <BillboardSwiper billboards={billboards} />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Featured Products" items={products} />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;