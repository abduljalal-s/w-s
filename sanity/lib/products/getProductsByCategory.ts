import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductsByCategory = async (categorySlug: string) => {


    const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`    
        *[
            _type == "product"
            && references(*[_type == "category" && slug.current == $categorySlug]._id)
        ] | order(name asc)
        `);

    try {
        // use sanityfetch to send the query and pass the searchParam with a wildcard
        const product = await sanityFetch({
            query: PRODUCTS_BY_CATEGORY_QUERY,
            params: {
                categorySlug,
            },
        });

        // return the list of za products or an empty array if none found
        return product.data || [];
    } catch (error) {
        console.error("Error fetching products by category:", error);
        return [];

    }

};