"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store";
import { checkoutAction } from "./checkout-action";

export default function CheckoutPage() {
  const { items, removeItem, addItem } = useCartStore();
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center font-optima">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <Link href="/products" className="text-[#77b7ff] hover:underline">
          View the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 font-optima">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

      <Card className="w-full sm:max-w-lg mx-auto mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Order Summary</CardTitle>
        </CardHeader>

        <CardContent>
          <ul className="space-y-4">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center gap-4 border-b pb-2"
              >
                {/* 1) Thumbnail Preview */}
                {item.imageUrl && (
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 rounded overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                )}

                {/* 2) Name & Line Total */}
                <div className="flex-1 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <span className="font-medium">{item.name}</span>
                  <span className="font-semibold">
                    {((item.price * item.quantity) / 100).toFixed(2)} €
                  </span>
                </div>

                {/* 3) Quantity Controls */}
                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                  >
                    –
                  </Button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addItem({ ...item, quantity: 1 })}
                  >
                    +
                  </Button>
                </div>
              </li>
            ))}
          </ul>

          {/* Order Total */}
          <div className="mt-4 border-t pt-2 text-lg font-semibold">
            Total: {(total / 100).toFixed(2)} €
          </div>
        </CardContent>
      </Card>

      {/* Checkout Form */}
      <form
        action={checkoutAction}
        className="w-full sm:max-w-md mx-auto flex flex-col sm:flex-row sm:justify-center gap-4"
      >
        <input type="hidden" name="items" value={JSON.stringify(items)} />
        <Button
          type="submit"
          variant="default"
          className="w-full sm:w-auto bg-[#77b7ff] hover:bg-[#65a0e4] text-white"
        >
          Proceed to Payment
        </Button>
      </form>
    </div>
  );
}
