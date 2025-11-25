import React from "react";
import { SiAlwaysdata } from "react-icons/si";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Input } from "@heroui/react";
import { Link } from "react-router-dom";

function SearchBar() {
  return (
    <div className="w-full bg-black">
      <Navbar
        className="w-full fixed grid gap-10 text-white z-9999"
        style={{ backgroundColor: "#09090b" }}>
        <NavbarBrand className="hidden md:block flex items-center text-5xl font-bold px-20">
          <SiAlwaysdata />
        </NavbarBrand>
        <NavbarItem className="px-20">
          <Link to="/">
            <h2>Home</h2>
          </Link>
        </NavbarItem>
        <NavbarItem className="px-20">
          <Link to="/school-dropout-rates">
            <h2>School Dropouts</h2>
          </Link>
        </NavbarItem>
        <NavbarItem className="px-20">
          <Link to="/education-quality">
            <h2>Education Quality</h2>
          </Link>
        </NavbarItem>
      </Navbar>
    </div>
  );
}

export default SearchBar;
