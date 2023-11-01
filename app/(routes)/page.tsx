import getBillboards from "@/actions/get-billboards";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/billbooard";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  const billbooard = await getBillboards();

  return (
    <Container>
      <Billboard data={billbooard} />
      <div className="space-y-10 pb-10 mx-auto max-w-7xl mt-5">
        <div className="font-serif flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Featured Products" items={products} />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
