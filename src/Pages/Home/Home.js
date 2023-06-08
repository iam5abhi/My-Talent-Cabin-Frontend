import React  from 'react';
import { NavLink } from 'react-router-dom';

const data = [
    {
        name:"ADMIN",
        path:"/auth/admin/login",
    },
    {
        name:"REGISTER",
        path:"/register",
    },
    {
        name:"LOGIN",
        path:"/login",
    }
]

const Home = () => {
  return (
        <>
        <div className="px-2 py-4 max-w-screen-lg mx-auto">
            <div className="grid grid-cols-3 gap-4 border border-gray-300/75 rounded px-6  py-6 bg-white shadow">
                {data.map(datas=>(
                    <div className="text-center">
                    <span className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{datas.name}</h5>
                        <NavLink to={datas.path}><button type="button" className="text-white text-end bg-orange-600 hover:bg-orange-400 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none">{datas.name}</button></NavLink>
                    </span>
                    </div>
                )
                )}
            </div> 
        </div>
    </>
  )
}

export default Home;