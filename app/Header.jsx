import Link from "next/link";
import React from "react";
import { LogoutBtn } from "@/components/Client";

const Header = () => {
  return (
    <>
      <header className="header">
        <div>
          <h2>ToDo</h2>
        </div>

        <article>
          <Link href={"/"}>Home</Link>
          <Link href={"/profile"}>Profile</Link>
          {/* <Link href={"/login"}>LogIn</Link> */}
          <LogoutBtn />
        </article>
      </header>
    </>
  );
};

export default Header;
