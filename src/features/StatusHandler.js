export const StatusHandler=(status)=>{
    switch(status){
        case "active" : return <span className='bg-green-100 p-2 px-4 rounded-full text-green-600'>Activate</span>
        case "deactive" : return <span className='bg-red-100 p-2 px-4 rounded-full text-red-600'>Deactive</span>
        case "onhold" : return <span className='bg-yellow-100 p-2 px-4 rounded-full text-yellow-600'>OnHold</span>
        case "terminate" : return <span className='bg-red-100 p-2 px-4 rounded-full text-red-600'>Terminate</span>
    }
}