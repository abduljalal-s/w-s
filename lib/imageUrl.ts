import { client } from '@/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);

export function ImageUrl(source: any, options: { width?: number; height?: number; quality?: number } = {}) {
  const { width, height, quality = 90 } = options; // Default quality to 90
  let image = builder.image(source).auto('format').fit('max').quality(quality);
  if (width) image = image.width(width);
  if (height) image = image.height(height);
  return image;
}