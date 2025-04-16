import AddToBasketButton from "@/components/AddToBasketButton";
import { ImageUrl } from "@/lib/imageUrl";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";

async function ProductPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }
  const isOutOfStock = product.stock != null && product.stock <= 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Main Image (Mockup/Store Front) */}
        <div
          className={`relative aspect-square overflow-hidden rounded-lg shadow-lg ${
            isOutOfStock ? "opacity-50" : ""
          }`}
        >
          {product.image?.asset ? (
            <Image
              src={ImageUrl(product.image.asset, { width: 600, height: 600, quality: 90 }).url()}
              alt={product.name ?? "Product image"}
              fill
              className="object-contain transition-transform duration-300 hover:scale-105"
              quality={90}
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-500">No image</span>
            </div>
          )}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-white font-bold text-lg">Out of stock</span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="text-xl font-semibold mb-4">
              ₦{product.price?.toFixed(2)}
            </div>
            <div className="prose max-w-none mb-6">
              {product.description && <PortableText value={product.description} />}
            </div>
          </div>
          <div className="mt-6">
            <AddToBasketButton product={product} disabled={isOutOfStock} />
          </div>
        </div>
      </div>

      {/* Real Images Gallery */}
      {product.gallery && product.gallery.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Real-Life Images</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {product.gallery.map((image) => (
              <div
                key={image._key}
                className="relative aspect-square overflow-hidden rounded-lg shadow-lg"
              >
                <Image
                  src={ImageUrl(image.asset, { width: 600, height: 600, quality: 90 }).url()}
                  alt="Real-life product image"
                  fill
                  className="object-contain transition-transform duration-300 hover:scale-105"
                  quality={90}
                />
                <span className="absolute top-2 left-2 bg-black text-white text-sm px-2 py-1 rounded">
                  Real
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductPage;