import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductBySlug = async (slug: string) => {
  const PRODUCT_BY_SLUG_QUERY = defineQuery(`
    *[_type == "product" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      image {
        asset-> {
          _id,
          url,
          metadata
        }
      },
      gallery[tag == "real"] {
        _key,
        asset-> {
          _id,
          url,
          metadata {
            lqip,
            dimensions,
            palette
          }
        },
        tag
      },
      description,
      price,
      category[]-> {
        _id,
        title
      },
      stock
    }
  `);

  try {
    const product = await sanityFetch({
      query: PRODUCT_BY_SLUG_QUERY,
      params: {
        slug,
      },
    });
    return product.data || null;
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
};