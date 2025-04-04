import { searchProductsByName } from "@/sanity/lib/products/searchProductsByName";

async function searchPage({
    searchParams,
}: {
    searchParams: {
        query: string;
    };
}) {
    const { query } = await searchParams;
    const products = await searchProductsByName(query);


    return <div>SearchPage for  {query} </div>;
}

export default searchPage;