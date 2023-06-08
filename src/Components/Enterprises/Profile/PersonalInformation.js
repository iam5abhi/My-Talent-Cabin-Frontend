import React from 'react';
import jwtDecode from 'jwt-decode';
import { Token } from '../../../features/Token';
import { NavLink } from 'react-router-dom';

const PersonalInformation = () => {
    const decode = jwtDecode(Token())
  return (
        <>
        <div className="p-4 bg-white w-full">
        <section>
            <div className="w-full py-4 ">
            <h2 className="text-xl py-4 font-bold sm:mb-4 mt-2 sm:mt-0">
              Business Details
            </h2>
            <form >
                <div className="mb-6">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Business Name</label>
                <input type="text" id="name" name='name' disabled value={decode.user.name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Enter name" required />
                </div>
                <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Business Email </label>
                <input type="email" id="email" name='email' disabled value={decode.user.email} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Enter email" required />
                </div>
                <div className="mb-6">
                <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Business Mobile Number
                </label>
                <input type="text" id="mobile" name='phoneNumber' disabled value={decode.user.phoneNumber} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Enter mobile" required />
                </div>
                <div className="mt-12 mb-2 sm:flex">
                <NavLink to="/auth/enterpricess/profile/business-information"><button type='button' className="block w-full sm:w-auto px-6 py-2 font-medium rounded bg-orange-600
                hover:bg-orange-700 text-white">Next</button></NavLink>
                </div>
            </form>
            </div>
        </section>
        </div>
    </>
  )
}

export default PersonalInformation;