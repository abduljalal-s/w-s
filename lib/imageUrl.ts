import { client } from "@/sanity/lib/backendClient";
import ImageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const builder = ImageUrlBuilder(client);

export function ImageUrl(source: SanityImageSource) {
    return builder.image(source);
}