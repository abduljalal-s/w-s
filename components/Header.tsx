"use client";

import useBasketStore from "@/app/(store)/store";
import { ClerkLoaded, SignedIn, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { PackageIcon, TrolleyIcon } from "@sanity/icons";
import Form from "next/form";
import Link from "next/link";



function Header() {
    const { user } = useUser();
    const itemCount = useBasketStore((state) =>
        state.items.reduce((total, item) => total + item.quantity, 0));

    const createClerkPasskey = async () => {
        try {
            const response = await user?.createPasskey();
            console.log("Passkey created:", response);
        } catch (err) {
            console.error("Error:", JSON.stringify(err, null, 2));
        }
    };


    return (
        <header className=" flex flex-wrap justify-between items-center px-4 py-2">
            <div className=" flex w-full flex-wrap justify-between items-center">
                <Link href="/"
                    className="
                    text-2xl
                    font-bold
                    text-black
                    hover:opacity-50
                    cursor-pointer
                    mx-auto
                    sm:mx-0"
                >
                    Wayward-steeze
                </Link>

                <Form action="/search"
                    className=" w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0"
                >
                    <input type="text"
                        name="query"
                        placeholder="Search..."
                        className="bg-grey-100
                        text-grey-800
                        px-4
                        py-2
                        rounded
                        focus:outline-none
                      focus:ring-2
                      focus:ring-red-500
                      focus:ring-opacity-50
                      border
                      w-full
                      max-w-4xl"

                    />
                </Form>


                <div className="flex items-center space-x-4 mt-4 sm:mt-0 flex-1
                 sm:flex-none">
                    <Link href="/basket"
                        className="flex-1 relative  flex justify-center sm:jutstify-start
                    sm:flex-none
                    iems-center
                    space-x-2
                    bg-gray-900
                    hover:bg-gray-700
                    text-white
                    font-bold py-2
                    px-4 rounded"
                    >
                        <TrolleyIcon className="w-6 h-6" />

                        <span className=" absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">{itemCount}
                        </span>
                        <span>My Basket</span>
                    </Link>

                    { /* User area*/}
                    <ClerkLoaded>
                        <SignedIn>
                            <Link
                                href="/orders"
                                className="flex-1 relative  flex justify-center sm:
                            jutstify-start sm:flex-none items-center space-x-2
                            bg-red-500
                         hover:bg-red-700 text
                         text-white font-bold py-2 px-4 rounded"
                            >

                                <PackageIcon className="w-6 h-6" />
                                <span> My Orders</span>
                            </Link>
                        </SignedIn>
                        {user ? (
                            <div className="flex items-center space-x-2">

                                <UserButton />
                                <div className="hidden sm:block text-xs">
                                    <p className="text-gray-500">Welcom Back</p>
                                    <p className="font-bold">{user?.fullName}!</p>
                                </div>
                            </div>
                        ) : (
                            <SignInButton mode="modal" />
                        )}
                        {user?.passkeys.length === 0 && (
                            <button
                                onClick={createClerkPasskey}
                                className="bg-white hover:bg-amber-700 hover:text-white animate-pulse text-amber-500 font-bold py-2 px-4 rounded border-amber-300 border">
                                Create a Passkey now
                            </button>
                        )}
                    </ClerkLoaded>
                </div >
            </div>
        </header >
    )
}

export default Header 