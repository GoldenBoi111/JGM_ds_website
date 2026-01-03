import React, { useState } from "react";
import { SiAlwaysdata } from "react-icons/si";
import {
  FiHome,
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
import Tooltip from "@mui/material/Tooltip";
import { Link, useLocation } from "react-router-dom";
import Search from "./Search";
import UserPreferencesModal from "./UserPreferencesModal";

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
      to: "/blog/education-quality",
      icon: FiAward,
      label: "Education Quality",
    },
  ];

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="w-full fixed text-white bg-zinc-950/80 backdrop-blur-sm border-b border-zinc-800 z-[9999]"
      maxWidth="full">
      <NavbarContent className="w-full max-w-full px-4">
        {/* Left Section - Logo and menu toggle */}
        <div className="flex items-center gap-4">
          <NavbarMenuToggle
            srOnlyText=" "
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
            icon={isMenuOpen ? <FiX /> : <FiMenu />}
          />
          <Link to="/" aria-label="JGM Innovation Home">
            <NavbarBrand>
              <SiAlwaysdata className="text-3xl" aria-hidden="true" />
              <span className="ml-2 font-bold text-xl">JGM Innovation</span>
            </NavbarBrand>
          </Link>
        </div>

        {/* Center Section - Now properly centered on desktop, hidden on mobile */}
        <div className="hidden sm:flex justify-center flex-1">
          <div className="flex gap-4">
            {menuItems.map((item, index) => (
              <Tooltip title={item.label} key={`${item.name}-${index}`} arrow>
                <NavbarItem
                  isActive={location.pathname === item.to}
                  aria-label={item.label}
                  tabIndex={0}>
                  <Link
                    to={item.to}
                    aria-current={
                      location.pathname === item.to ? "page" : undefined
                    }>
                    <item.icon
                      className={`text-2xl ${
                        location.pathname === item.to
                          ? "text-blue-500"
                          : "text-white"
                      }`}
                      aria-label={item.label}
                    />
                  </Link>
                </NavbarItem>
              </Tooltip>
            ))}
          </div>
        </div>

        {/* Right Section - Using flex-grow to balance the layout */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <UserPreferencesModal />
            <Search />
          </div>
          <NavbarItem className="hidden lg:flex">
            <Link
              to="/login"
              aria-label="Login to your account"
              onTouchStart={() => {}} // Enable proper touch behavior
            >
              Login
            </Link>
          </NavbarItem>
          <NavbarItem className="hidden lg:flex">
            <Link
              to="/signup"
              aria-label="Create a new account"
              onTouchStart={() => {}} // Enable proper touch behavior
            >
              Sign Up
            </Link>
          </NavbarItem>
        </div>
      </NavbarContent>

      <NavbarMenu
        className="bg-zinc-950/90 backdrop-blur-sm z-[10000] w-full max-w-full fixed top-[var(--navbar-height)] left-0 right-0"
        aria-label="Main navigation menu">
        <div className="flex justify-center gap-4 py-4 border-b border-zinc-700">
          <UserPreferencesModal />
          <Search />
        </div>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              className="w-full flex items-center gap-2"
              to={item.to}
              onClick={() => setIsMenuOpen(false)}
              aria-label={`Navigate to ${item.label}`}>
              <item.icon
                className={`text-xl ${
                  location.pathname === item.to ? "text-blue-500" : "text-white"
                }`}
                aria-label={item.label}
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
            onClick={() => setIsMenuOpen(false)}
            aria-label="Login to your account">
            <FiLogIn className="text-xl text-white" aria-hidden="true" />
            <span className="text-white">Login</span>
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            className="w-full flex items-center gap-2"
            to="/signup"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Create a new account">
            <FiUserPlus className="text-xl text-white" aria-hidden="true" />
            <span className="text-white">Sign Up</span>
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}

export default React.memo(NavigationBar);
