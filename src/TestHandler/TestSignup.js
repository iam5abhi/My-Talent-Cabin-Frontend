import React from 'react';
import { useNavigate } from 'react-router-dom';
import img1 from '../Assets/Images/sign-up1.jpg'
import img3 from '../Assets/Images/sign-up3.jpg'
import img2 from '../Assets/Images/sign-up2.jpg'


const TestSignup = () => {
    const navigate = useNavigate()
  return (
    <>
        <div className='container ml-9 py-10'>
            <h1 className='text-center text-3xl font-semibold mb-10'>Welcome to ....! Are you an Employer, Educator, or Student?</h1>
        <div class="grid gap-4 mb-6 md:grid-cols-4">
        <div className="max-w-sm rounded-md overflow-hidden border border-gray-600/20 shadow-lg">
                <img className="w-full h-56" src={img1} height={100} alt="Sunset in the mountains" />
                <div className="px-6 py-4 text-center bannerWrapper-3HsoT">
                    <div className='iconWrapper-3unkb'> 
                    <span className=''><i class="fa-sharp fa-solid fa-user-tie mr-1 text-4xl mt-5 text-gray-700"></i></span> 
                    </div>
                    <div className="font-bold text-xl mb-2 mt-8">I'm a Student</div>
                    <p className="text-gray-700 text-base TextAlignClass" >
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                    </p>
                </div>
                <div className=" w-full text-center mt-5">
                    <button type="button" className="text-white text-end bg-orange-500 hover:bg-orange-400
                    focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-md px-7 py-1.5 mr-2 
                        dark:bg-orange-600 dark:hover:bg-orange-600 focus:outline-none 
                    dark:focus:ring-orange-800">SIGN UP</button>
                    </div>
            </div>
            <div className="max-w-sm rounded-md overflow-hidden border border-gray-600/20 shadow-lg">
                <img className="w-full h-56" src={img2} height={100} alt="Sunset in the mountains" />
                <div className="px-6 py-4 text-center bannerWrapper-3HsoT">
                    <div className='iconWrapper-3unkb'>
                    <span className=''><i class="fa-regular fa-user text-4xl mt-5 text-gray-700"></i></span> 
                    </div>
                    <div className="font-bold text-xl mb-2 mt-8">I'm a Mentor</div>
                    <p className="text-gray-700 text-base TextAlignClass" >
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                    </p>
                </div>
                <div className=" w-full text-center mt-6">
                    <button type="button" className="text-white text-end bg-orange-500 hover:bg-orange-400
                    focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-md px-7 py-1.5 mr-2 
                        dark:bg-orange-600 dark:hover:bg-orange-600 focus:outline-none 
                    dark:focus:ring-orange-800">SIGN UP</button>
                    </div>
            </div>
            <div className="max-w-sm rounded-md overflow-hidden border border-gray-600/20 shadow-lg">
                <img className="w-full h-56" src={img3} height={100} alt="Sunset in the mountains" />
                <div className="px-6 py-4 text-center bannerWrapper-3HsoT">
                    <div className='iconWrapper-3unkb'>
                    <span className=''><i class="fa-regular fa-user text-4xl mt-5 text-gray-700"></i></span> 
                    </div>
                    <div className="font-bold text-xl mb-2 mt-8">I'm a Enterpricess</div>
                    <p className="text-gray-700 text-base TextAlignClass" >
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                    </p>
                </div>
                <div className=" w-full text-center mt-6 mb-5">
                    <button type="button" className="text-white text-end bg-orange-500 hover:bg-orange-400
                    focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-md px-7 py-1.5 mr-2 
                        dark:bg-orange-600 dark:hover:bg-orange-600 focus:outline-none 
                    dark:focus:ring-orange-800">SIGN UP</button>
                    </div>
            </div>
            <div className="max-w-sm rounded-md overflow-hidden border border-gray-600/20 shadow-lg">
                <img className="w-full h-56" src={img3} height={100} alt="Sunset in the mountains" />
                <div className="px-6 py-4 text-center bannerWrapper-3HsoT">
                    <div className='iconWrapper-3unkb'>
                    <span className=''><i class="fa-regular fa-user text-4xl mt-5 text-gray-700"></i></span> 
                    </div>
                    <div className="font-bold text-xl mb-2 mt-8">I'm a Campus</div>
                    <p className="text-gray-700 text-base TextAlignClass" >
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                    </p>
                </div>
                <div className=" w-full text-center mt-6 mb-5">
                    <button type="button" onClick={()=>navigate(`register?roll=campus`)} className="text-white text-end bg-orange-500 hover:bg-orange-400
                    focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-md px-7 py-1.5 mr-2 
                        dark:bg-orange-600 dark:hover:bg-orange-600 focus:outline-none 
                    dark:focus:ring-orange-800">SIGN UP</button>
                    </div>
            </div>
        </div>
        </div>
    </>
  )
}

export {TestSignup}