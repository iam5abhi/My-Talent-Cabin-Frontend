import React from 'react';

const Copyright = () => {
  return (
        <>
        <div className="bg-white p-8 mt-12">
            <div className="md:flex justify-between px-6 py-4 text-center">
            <h6 className="font-medium">Stuck with something?
                <a href="#" className="learn text-blue-500 font-medium">Get Help</a>
            </h6>
            <div className="flex items-center justify-center gap-4 mt-4 md:mt-0">
                <h6 className>Follow us</h6>
                <a href="#">
                <i className="fa-brands fa-facebook hover:text-blue-600 cursor-pointer" />
                </a>
                <a href="#">
                <i className="fa-brands fa-linkedin hover:text-blue-600 cursor-pointer" />
                </a>
                <a href="#">
                <i className="fa-brands fa-twitter hover:text-blue-600 cursor-pointer" />
                </a>
            </div>
            </div>
            <hr className="mx-8" />
            <div className="lg:flex gap-12 px-6 py-2 text-gray-500">
            <p>Copyright 2023 All rights reserved by the company</p>
            <a href="#" className="hover:text-blue-400">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 ml-4 lg:ml-0">Terms of Service</a>
            </div>
        </div>
    </>
  )
}

export default Copyright;