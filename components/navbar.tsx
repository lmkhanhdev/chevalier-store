import Link from "next/link";

import Container from "@/components/ui/container";
import MainNav from "@/components/main-nav";
import getCategories from "@/actions/get-categories";
import NavbarActions from "@/components/navbar-actions";
import { useEffect, useState } from "react";
import Loading from "./ui/loading";

const Navbar = async () => {
  const categories = await getCategories();

  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center z-99">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <p
              className="font-serif text-2xl  transition-transform transform hover:scale-105
             hover:text-indigo-950 rounded-lg shadow-md p-2"
            >
              CHEVALIER
            </p>
          </Link>
          <MainNav data={categories} />
          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};
export default Navbar;
