
import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productTypes = defineType({
    name: 'product',
    title: 'Products',
    type: 'document',
    icon: TrolleyIcon,
    fields: [
        defineField({
            name: "name",
            title: "Product Name",
            type: "string",
            validation: (Rule) => Rule.required().min(5).max(50),
        }),
        defineField({
            name: "slug",
            title: "slug",
            type: "slug",
            options: {
                source: "name",
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "image",
            title: "product image",
            type: "image",
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: "description",
            title: "Product description",
            type: "blockContent",
        }),
        defineField({
            name: "price",
            title: "Product price",
            type: "number",
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: "category",
            title: "Product category",
            type: "array",
            of: [{
                type: "reference", to: { type: "category" }
            }],
        }),
        defineField({
            name: "stock",
            title: "stock",
            type: "number",
            validation: (Rule) => Rule.min(0),
        }),
    ],
    preview: {
        select: {
            title: "name",
            media: "image",
            price: "price",
        },
        prepare(select) {
            return {
                title: select.title,
                subtitle: `$${select.price}`,
                media: select.media,
            };
        },
    },

});

