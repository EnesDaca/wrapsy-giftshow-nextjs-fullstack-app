import { ProductList } from "@/components/ProductList";
import { stripe } from "@/lib/stripe";

export default async function ProductsPage() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 15,
  });
  return (
    <div className="pb-8">
      <h1 className="text-3xl font-bold leading-none text-foreground text-center mb-8 font-optima tracking-[1px]">
        All Gifts
      </h1>
      <ProductList products={products.data} />
    </div>
  );
}
