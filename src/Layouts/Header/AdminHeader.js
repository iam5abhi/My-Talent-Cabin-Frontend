import React,{useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastError } from '../../features/DisplayMessage';
import { AdminToken } from '../../features/Token';
import img from "../../Assets/Images/avatar.png"

const AdminHeader = () => {
    const navigate = useNavigate()
    const [dropdownIcon, setDropdownIcon] = useState(false)

    const Routes = [
        {
            name: "Dashboard",
            to: "/auth/admin"
        }, {
            name: "Students",
            to: "/auth/admin/students"
        }, {
            name: "Mentors",
            to: "/auth/admin/mentors"
        }, {
            name: "Company",
            to: "/auth/admin/company"
        }, {
            name: "Applied Students",
            to: "/auth/admin/applied-students"
        }, {
            name: "Category",
            to: "/auth/admin/category"
        }, {
            name: "Internship",
            to: "/auth/admin/internship"
        },
    ]

    const DropdownIconHandler = () => {
        if (dropdownIcon === true) {
            setDropdownIcon(false)
        } else {
            setDropdownIcon(true)
        }
    }

    const LogoutHandler = () => {
        localStorage.clear()
        setTimeout(() => {
            ToastError('logout SuccessFully');
            navigate('/auth/admin/login')
        }, 1000);
    }
    return (
        <>
        {!AdminToken ? navigate('/auth/admin/login') :
            <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded shadow-lg ">
                <div className="container flex flex-wrap items-center justify-between mx-auto ">
                    <a href="#" className="flex items-center">
                        <span className="self-center text-xl font-semibold whitespace-nowrap">Logo</span>
                    </a>
                    <div className="items-center justify-between hidden w-full gap-4 md:flex md:w-auto md:order-1" id="mobile-menu-2">
                        <div className="flex items-center md:order-2 relative">
                            <button type="button" onClick={DropdownIconHandler} className="show dropdown-toggle text-gray-900 text-sm leading-10 pr-4 pl-0 h-16 flex items-center">
                                <span className="mr-1 relative inline-flex	items-center">
                                    <img className="rounded-full w-10 h-10 border p-0.5" src={img} width={31} alt="Ryan Taylor" />
                                    <div className="ml-2">
                                        <p className="mb-0 leading-5 text-xs font-medium text-gray-400">admin</p>
                                    </div>
                                    <div className='ml-2'>
                                        {dropdownIcon === false ? <i className="fa-solid fa-caret-down"></i>
                                            : <i className=" fa-solid fa-caret-down fa-rotate-180"></i>
                                        }
                                    </div>
                                </span>
                            </button>
                            {/* Dropdown menu */}
                            {dropdownIcon === true ?
                                <div className="text-sm w-52 p-0 border rounded-md origin-top-left shadow-inherit bg-white z-50 m-0 text-left	bg-clip-padding	list-none"
                                    style={{ position: 'absolute', inset: '0px auto auto -49px', margin: 0, transform: 'translate(0px, 62px)' }}>
                                    <div className="bg-gray-100/50 flex pl-2.5 pr-3.5 py-2">
                                        <div className="w-10 h-10 relative inline-block	">
                                            <img src={img} alt="User Image" className="rounded-full h-ful w-full object-cover	" />
                                        </div>
                                        <div className="ml-2.5">
                                            <p className="mb-0 text-gray-500">admin</p>
                                        </div>
                                    </div>
                                    <NavLink className="flex items-center border border-t clear-both font-normal text-inherit decoration-0 bg-transparent	border-0 text-cyan-800 w-full pl-3 pr-4 py-2 hover:bg-orange-500 hover:text-white" ><span><i className="fa-solid fa-user fa-sm"></i></span>&nbsp; Profile</NavLink>
                                    <NavLink to="/auth/admin/change-password" className="flex items-center border border-t clear-both font-normal text-inherit decoration-0 bg-transparent	border-0 text-cyan-800 w-full pl-3 pr-4 py-2 hover:bg-orange-500 hover:text-white" ><span><i className="fa-solid fa-unlock fa-sm"></i></span>&nbsp; Change Password</NavLink>
                                    <button onClick={LogoutHandler} className=" flex items-center border border-t clear-both font-normal text-inherit decoration-0 bg-transparent	border-0 text-cyan-800 w-full pl-3 pr-4 py-2 hover:bg-orange-500 hover:text-white"><span><i className="fa-solid fa-power-off fa-sm"></i></span>&nbsp; Logout</button>
                                </div>
                                : null}
                        </div>
                        <ul className="flex flex-col mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
                            {Routes.map((data) => {
                                return <li>
                                    <NavLink to={data.to} end isActive className={({ isActive }) => !isActive ? "block px-2 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    : "block px-2 py-2 text-sm text-gray-700 bg-gray-100 border-b-2 border-orange-500"}>{data.name}</NavLink>
                                </li>
                            })}
                        </ul>
                    </div>
                </div>
            </nav>
        }
        </>
    )
}

export default React.memo(AdminHeader);