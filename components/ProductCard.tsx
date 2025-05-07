import Link from "next/link";
import Stripe from "stripe";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

interface Props {
  product: Stripe.Product;
}

export const ProductCard = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price;

  return (
    <Link href={`/products/${product.id}`} className="block h-full">
      <Card className="group hover:shadow-2xl transition duration-300 border-gray-300 h-full flex flex-col gap-0 py-0 font-optima">
        {/* 1) Image */}
        {product.images?.[0] && (
          <div className="relative h-80 w-full">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="group-hover:opacity-90 transition-opacity duration-300 rounded-t-lg object-cover"
              quality={100}
              unoptimized
            />
          </div>
        )}

        {/* 2) Header (just the title) */}
        <CardHeader className="p-4">
          <CardTitle className="text-xl font-bold text-gray-800">
            {product.name}
          </CardTitle>
        </CardHeader>

        {/* 3) Body (grows) */}
        <CardContent className="p-4 flex flex-col flex-grow">
          {price?.unit_amount && (
            <p className="text-lg font-semibold text-gray-900 mb-2">
              {(price.unit_amount / 100).toFixed(2)} €
            </p>
          )}

          {product.description && (
            <p className="text-gray-600 text-sm mb-4">{product.description}</p>
          )}

          {/* 4) Button always at bottom */}
          <Button className="mt-auto bg-[#77b7ff] hover:bg-[#65a0e4] text-white w-full">
            View Details
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
};
