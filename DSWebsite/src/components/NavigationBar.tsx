import React, { useState } from "react";
import { SiAlwaysdata } from "react-icons/si";
import {
  FiHome,
  FiTrendingDown,
  FiAward,
  FiLogIn,
  FiUserPlus,
  FiMenu,
  FiX,
  FiEdit,
} from "react-icons/fi";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/react";
import Tooltip from "@mui/material/Tooltip";
import { Link, useLocation } from "react-router-dom";

function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems: {
    name: string;
    to: string;
    icon: React.ElementType;
    label: string;
  }[] = [
    { name: "Home", to: "/", icon: FiHome, label: "Home" },
    {
      name: "Blog",
      to: "/blog",
      icon: FiEdit,
      label: "Blog",
    },
    {
      name: "Education Quality",
      to: "/education-quality",
      icon: FiAward,
      label: "Education Quality",
    },
  ];

  return (
    <div className="py-2 w-full bg-black">
      <Navbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className="w-full fixed text-white bg-zinc-950/80 backdrop-blur-sm border-b border-zinc-800 z-[9999]"
        maxWidth="full">
        <NavbarContent className="w-full" justify="center">
          {/* Left Section */}
          <div className="flex items-center gap-4 pl-4">
            <NavbarMenuToggle
              srOnlyText=" "
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="sm:hidden"
              icon={isMenuOpen ? <FiX /> : <FiMenu />}
            />
            <Link to="/">
              <NavbarBrand>
                <SiAlwaysdata className="text-3xl" />
                <span className="ml-2 font-bold text-xl pl-2">
                  JGM Innovation
                </span>
              </NavbarBrand>
            </Link>
          </div>

          {/* Center Section */}
          <div className="hidden sm:flex flex-grow justify-center gap-4">
            {menuItems.map((item, index) => (
              <Tooltip title={item.label} key={`${item.name}-${index}`} arrow>
                <NavbarItem isActive={location.pathname === item.to}>
                  <Link to={item.to}>
                    <item.icon
                      className={`text-2xl ${
                        location.pathname === item.to
                          ? "text-blue-500"
                          : "text-white"
                      }`}
                    />
                  </Link>
                </NavbarItem>
              </Tooltip>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <NavbarItem className="hidden lg:flex">
              <Link to="/login">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                to="/signup"
                color="primary"
                variant="flat"
                className="text-white">
                Sign Up
              </Button>
            </NavbarItem>
          </div>
        </NavbarContent>

        <NavbarMenu className="bg-zinc-950/90 backdrop-blur-sm">
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.name}-${index}`}>
              <Link
                className="w-full flex items-center gap-2"
                to={item.to}
                onClick={() => setIsMenuOpen(false)}>
                <item.icon
                  className={`text-xl ${
                    location.pathname === item.to
                      ? "text-blue-500"
                      : "text-white"
                  }`}
                />
                {
                  <span
                    className={`${
                      location.pathname === item.to
                        ? "text-blue-500"
                        : "text-white"
                    }`}>
                    {item.label}
                  </span>
                }
              </Link>
            </NavbarMenuItem>
          ))}
          <NavbarMenuItem>
            <Link
              className="w-full flex items-center gap-2"
              to="/login"
              onClick={() => setIsMenuOpen(false)}>
              <FiLogIn className="text-xl text-white" />
              <span className="text-white">Login</span>
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link
              className="w-full flex items-center gap-2"
              to="/signup"
              onClick={() => setIsMenuOpen(false)}>
              <FiUserPlus className="text-xl text-white" />
              <span className="text-white">Sign Up</span>
            </Link>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
