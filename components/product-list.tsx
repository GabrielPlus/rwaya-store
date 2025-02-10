import { Product } from "@/types";
import NoResults from "./ui/no-result";
import ProductCard from "./ui/product-card";

interface ProductListProps {
    title: string;
    items: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ title, items }) => {
  return ( 
    <div className="space-y-4">
      <h3 className="font-bold text-3xl">{title}</h3>
      {items.length === 0 && <NoResults />}

      {/* Horizontal scroll on mobile, grid on larger screens */}
      <div className="flex overflow-x-auto sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 scrollbar-hide">
        {items.map((item) => (
          <div key={item.id} className="flex-shrink-0 w-64 sm:w-auto">
            <ProductCard data={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
