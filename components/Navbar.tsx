import Link from "next/link";
import Image from "next/image";
import React from "react";

const navIcons = [
  { src: "/assets/icons/search.svg", alt: "search" },
  { src: "/assets/icons/black-heart.svg", alt: "heart" },
  { src: "/assets/icons/user.svg", alt: "user" },
];

const Navbar = () => {
  return (
    <>
      <header className="w-full">
        <nav className="nav">
          <Link href="/" className="flex items-center gap-1">
            <Image
              src="/assets/icons/logo.svg"
              height={27}
              width={27}
              alt="logo"
            ></Image>

            <p className="nav-logo">
              Track<span className="text-orange-600">Azon</span>
            </p>
          </Link>

          <div className="flex items-center gap-5">
            {navIcons.map((icon) => (
              <Image
                key={icon.alt}
                src={icon.src}
                alt={icon.alt}
                height={28}
                width={28}
                className="object-contain"
              ></Image>
            ))}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
