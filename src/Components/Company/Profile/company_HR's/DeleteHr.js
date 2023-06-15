import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { authFetch } from '../../../../Middleware/axios/Interceptors'
import { ToastError } from '../../../../features/DisplayMessage'


export default function DeleteHr({setOpen,open,id,ProfileSubmit}) {
  const cancelButtonRef = useRef(null)


  const DeleteQuesSubmit = async ()=>{ 
    try {
      const resp = await authFetch.patch(`/company/delete-hr`,{_id:id})
      ToastError("Delete Successfully")
      setTimeout(() => {
        setOpen(false)
        ProfileSubmit()
      },1000);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 mt-12 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="max-w-screen mx-auto">
                  <div className="container mx-auto">
                    <div className="  bg-white border col-span-2">
                      <div className=" border-b border-gray-200 rounded p-7">
                        <div className="text-center">
                          <h3 className='text-2xl font-medium mb-2'>Delete Human resorse</h3>
                          <p className=" text-base font-medium mb-6">
                            If u delete the file you can't recover it
                          </p>
                        </div>
                        <div className="">
                        <div className="grid grid-cols-2 gap-6">
                          <button
                            type="button"
                            class="bg-transparent hover:bg-blue-500 text-blue-500 font-medium text-lg px-2.5 hover:text-white py-2.5 border border-blue-500 hover:border-transparent rounded-full"
                            onClick={DeleteQuesSubmit}
                          >
                            Delete
                          </button>
                          <button
                            type="button"
                            class="bg-transparent hover:bg-blue-500 text-blue-500 font-medium text-lg hover:text-white py-2.5 px-2.5 border border-blue-500 hover:border-transparent rounded-full"
                            onClick={() => setOpen(false)}
                            ref={cancelButtonRef}
                          >
                            Cancel
                          </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}