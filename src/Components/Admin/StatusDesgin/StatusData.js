import React from 'react'

const StatusData = ({active,hold,deactive,icon}) => {
  return (
       <>
        <div className='container mt-10'>
            <div className='flex justify-around text-lg'>
                <div className='bg-stone-200/50 px-6 w-72 border border-stone-200/75 py-5 font-semibold flex justify-around gap-12 rounded shadow-lg shadow-green-400/25'>
                    <span><i className={`${icon} fa-4x text-green-400`}></i></span>
                <div>
                    <h1 className='mb-4 text-gray-600'>Activate</h1>
                    <p className='text-green-400'>{active}</p>
                </div>
                </div>
                <div className='bg-stone-200/50 px-6 w-72 border border-stone-200/75 py-5 font-semibold flex justify-around gap-12 rounded shadow-lg shadow-yellow-400/25'>
                    <span><i className={`${icon} fa-4x text-yellow-400`}></i></span>
                <div>
                    <h1 className='mb-4 text-gray-600'>OnHold</h1>
                    <p className='text-yellow-400'>{hold} </p>
                </div>
                </div>
                <div className='bg-stone-200/50 px-6 w-72 border border-stone-200/75 py-5 font-semibold flex justify-around gap-12 rounded shadow-lg shadow-red-400/25'>
                    <span><i className={`${icon} fa-4x text-red-400`}></i></span>
                <div>
                    <h1 className='mb-4 text-gray-600'>Deactivate</h1>
                    <p className='text-red-400'>{deactive}</p>
                </div>
            </div></div>
        </div>
    </>
  )
}

export default StatusData