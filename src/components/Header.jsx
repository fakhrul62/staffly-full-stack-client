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

const Header = () => {
  const li = (
    <>
      <NavbarLink>
        <NavLink to="/">Home</NavLink>
      </NavbarLink>
      <NavbarLink>
        <NavLink to="/">Home</NavLink>
      </NavbarLink>
      <NavbarLink>
        <NavLink to="/">Home</NavLink>
      </NavbarLink>
      <NavbarLink>
        <NavLink to="/">Home</NavLink>
      </NavbarLink>
    </>
  );
  return (
    <div className="bg-zinc-200 rounded-lg overflow-hidden">
      <Navbar className="justify-around items-center hidden md:block bg-zinc-200 p-3">
        <div className="flex">
          <NavbarBrand href="/">
            <img src={logo} className="mr-3 h-6 sm:h-9" alt="Staffly" />
            <span className="font-head text-xl font-semibold dark:text-white">
              Staffly
            </span>
          </NavbarBrand>
        </div>
        <div className="flex items-center gap-5">
          <div className="md:order-2">
            <Button>Login</Button>
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
