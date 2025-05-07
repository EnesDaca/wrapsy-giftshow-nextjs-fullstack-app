"use client";

import { useState } from "react";
import Stripe from "stripe";
import Image from "next/image";
import { Button } from "./ui/button";
import { useCartStore } from "@/store/cart-store";
import { CartItem } from "@/store/cart-store";

interface Props {
  product: Stripe.Product;
}

export const ProductDetail = ({ product }: Props) => {
  const { items, addItem, removeItem } = useCartStore();
  const price = product.default_price as Stripe.Price;

  const cartItem = items.find((item) => item.id === product.id);
  const inCartQuantity = cartItem?.quantity ?? 0;

  // state to track which image is currently “zoomed” or large
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const onAddItem = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: price.unit_amount as number,
      imageUrl: product.images?.[currentImageIndex] ?? null,
      quantity: 1,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 items-start font-optima">
      {/* Left column: main image + thumbnails */}
      <div className="md:w-1/2">
        {/* Main large image */}
        {product.images && product.images.length > 0 && (
          <div className="relative h-64 sm:h-96 w-full rounded-lg overflow-hidden mb-4">
            <Image
              src={product.images[currentImageIndex]}
              alt={`${product.name} image ${currentImageIndex + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-contain transition-opacity duration-300"
              quality={100}
              unoptimized
            />
          </div>
        )}

        {/* Thumbnails list */}
        {product.images && product.images.length > 1 && (
          <div className="flex justify-center space-x-2 overflow-x-auto flex-wrap">
            {product.images.map((url, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`relative h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 rounded-md overflow-hidden border-3 ${
                  idx === currentImageIndex
                    ? "border-[#77b7ff]"
                    : "border-transparent"
                }`}
              >
                <Image
                  src={url}
                  alt={`${product.name} thumbnail ${idx + 1}`}
                  fill
                  sizes="(max-width: 640px) 3rem, 5rem"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right column: details and controls */}
      <div className="md:w-1/2 flex flex-col">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        {product.description && (
          <p className="mb-4 text-gray-700">{product.description}</p>
        )}

        {price?.unit_amount != null && (
          <p className="text-2xl font-semibold mb-6">
            €{(price.unit_amount / 100).toFixed(2)}
          </p>
        )}

        <span className="text-gray-700 mr-2">Quantity:</span>
        <div className="mb-6 border border-gray-400 w-fit">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeItem(product.id)}
          >
            –
          </Button>
          <span className="mx-2 font-semibold">{inCartQuantity}</span>
          <Button variant="ghost" size="sm" onClick={onAddItem}>
            +
          </Button>
        </div>

        {inCartQuantity > 0 && (
          <p className="text-sm text-gray-600 font-bold">
            You have {inCartQuantity}{" "}
            {inCartQuantity === 1 ? product.name : `${product.name}'s`} in your
            cart.
          </p>
        )}
      </div>
    </div>
  );
};
