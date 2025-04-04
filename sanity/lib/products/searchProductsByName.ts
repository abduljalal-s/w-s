import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const searchProductsByName = async (searchParam: string) => {


    const PRODUCT_SEARCH_QUERY = defineQuery(`    
        *[
            _type == "product"
            && name match $searchParam
        ] | order(name asc)
        `);

    try {

        // use sanity to send the query and pass the searchParam with a wildcard
        const product = await sanityFetch({
            query: PRODUCT_SEARCH_QUERY,
            params: {
                searchParam: `*${searchParam}*`//append wildcard for partial matching
            },
        });

        // return the list of za products or an empty array if none found
        return product.data || [];
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];

    }

};