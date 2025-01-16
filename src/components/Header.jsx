import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import "../css/Header.css";

const Header = () => {
  const li = (
    <>
      <NavbarLink>
        <NavLink to="/">Home</NavLink>
      </NavbarLink>
      <NavbarLink>
        <NavLink to="/about">About</NavLink>
      </NavbarLink>
      <NavbarLink>
        <NavLink to="/blog">Blog</NavLink>
      </NavbarLink>
      <NavbarLink>
        <NavLink to="/contact">Contact</NavLink>
      </NavbarLink>
    </>
  );
  return (
    <div className="border border-zinc-200 rounded-xl overflow-hidden">
      <Navbar className="justify-around items-center hidden md:block bg-blue-50 p-3">
        <div className="flex">
          <NavbarBrand href="/">
            <img src={logo} className="mr-3 h-6 sm:h-9" alt="Staffly" />
            <span className="font-body text-xl font-semibold dark:text-white ">
              Staffly
            </span>
          </NavbarBrand>
        </div>
        <div className="flex items-center gap-5">
          <div className="md:order-2">
            <Button color="blue" pill>Login</Button>
          </div>
          <NavbarCollapse>{li}</NavbarCollapse>
        </div>
      </Navbar>
      <Navbar fluid rounded className=" md:hidden block">
        <NavbarBrand href="/">
          <img src={logo} className="mr-3 h-6 sm:h-9" alt="Staffly" />
          <span className="font-head text-xl font-semibold dark:text-white">
            Staffly
          </span>
        </NavbarBrand>
        <div className="flex md:order-2">
          <Button>Get started</Button>
          <NavbarToggle />
        </div>
        <NavbarCollapse>
          <NavbarLink href="#" active>
            Home
          </NavbarLink>
          {li}
        </NavbarCollapse>
      </Navbar>
    </div>
  );
};

export default Header;
