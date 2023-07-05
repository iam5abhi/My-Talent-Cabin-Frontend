import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
} from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  EyeIcon,
  PowerIcon,
  Bars2Icon,
  HomeIcon
} from "@heroicons/react/24/outline";
import { MentorContext } from "../../Routes/MentorRouting/MentorRouting";
import { MentorToken } from "../../features/Token";
import jwtDecode from "jwt-decode";

// profile menu component


function ProfileMenu() {
  const username = useContext(MentorContext)
  const [userId,setUserId]=React.useState()
  const profileMenuItems = [
    {
      label: "My Profile",
      to: `/auth/mentor/view-profile/${userId}`,
      icon: UserCircleIcon,
    },
    {
      label: "Edit Profile",
      to: '/auth/mentor/profile',
      icon: Cog6ToothIcon,
    },
    {
      label: "Change Password",
      to: '/auth/mentor/change-password',
      icon: EyeIcon,
    },
    {
      label: "Logout",
      icon: PowerIcon,
    },
  ];
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  React.useEffect(()=>{
    if(MentorToken()){
      let {user} =jwtDecode(MentorToken())
      setUserId(user._id)
    }
  },[MentorToken()])

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="candice wu"
            className="border border-orange-500 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        <MenuItem className="text-center bg-orange-500 text-gray-500">
          <Avatar
            variant="circular"
            size="sm"
            alt="candice wu"
            className="mt-3 border border-white-500 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <Typography
            variant="small"
            className="font-normal"
            color={"white"}
          >
           {username.name}
          </Typography> 
          <Typography
            variant="small"
            className="font-normal text-gray-200"
          >
           {username.email}
          </Typography>   
        </MenuItem>
        {profileMenuItems.map(({ label, icon, to }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${isLastItem
                ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                : ""
                }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as={NavLink}
                to={to}
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

// nav list component
const navListItems = [
  {
    label: "Dashboard",
    to: "/auth/mentor",
    icon: HomeIcon,
  },
  {
    label: "Mentors",
    to: "/auth/mentor/students",
    icon: CubeTransparentIcon,
  },
  {
      label: "Internship",
      to: "/auth/mentor/internship",
      icon: CodeBracketSquareIcon,
  }
];


function NavList() {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {navListItems.map(({ label, icon,to }, key) => (
        <Typography
          key={label}
          as={NavLink}
          to={to}
          variant="small"
          color="gray"
          className="font-normal"
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
            {label}
          </MenuItem>
        </Typography>
      ))}
    </ul>
  );
}

export default function ComplexNavbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <Navbar className="mx-auto p-2 lg:pl-6">
      <div className="relative mx-auto flex items-center text-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
          Logo
        </Typography>
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
        <ProfileMenu />
      </div>
      <MobileNav open={isNavOpen} className="overflow-scroll">
        <NavList />
      </MobileNav>
    </Navbar>
  );
}