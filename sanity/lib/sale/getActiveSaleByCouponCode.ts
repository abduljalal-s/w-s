import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";
import { CouponCode } from "./couponCodes";

export const getActiveSaleByCouponCode = async (couponCode: CouponCode) => {
    const ACTIVE_SALE_BY_COUPON_QUERY = defineQuery(`
    *[
        _type == "sale" 
        && isActive == true
        && couponCode == $couponCode
    ] | order(validForm desc)[0] 
       `);
    try {
        const activeSale = await sanityFetch({
            query: ACTIVE_SALE_BY_COUPON_QUERY,
            params: {
                couponCode,
            },//pass the coupon code as a parameter
        });

        return activeSale ? activeSale.data : null; // Return the active sale or null if not found
    } catch (error) {
        console.error("Error fetching active sale by coupon code:", error);
        return null; // Return null in case of an error
    }

};