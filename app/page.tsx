import Image from "next/image";
import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe";
import Link from "next/link";
import { Carousel } from "@/components/Carousel";

export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5,
  });

  return (
    <div>
      <section className="rounded bg-[#e6e3e1] py-8 sm:py-12 font-optima">
        <div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-8 px-8 sm:px-16 md:grid-cols-2">
          <div className="max-w-md space-y-4">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Unique Present Emporium
            </h2>
            <p className="text-neutral-600">
              {" "}
              Discover unique and thoughtful gifts for every occasion at our
              one-stop-shop. A treasure trove of carefully curated gifts to suit
              all tastes and budgets.
            </p>
            <Button
              asChild
              variant="default"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-[#77b7ff] hover:bg-[#65a0e4] text-white"
            >
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full px-6 py-3"
              >
                Browse Gifts
              </Link>
            </Button>
          </div>
          <Image
            alt="Banner Image"
            width={450}
            height={450}
            src={products.data[0].images[0]}
            priority={true}
            className="rounded"
          />
        </div>
      </section>
      <section className="py-8">
        <Carousel products={products.data} />
      </section>
    </div>
  );
}
