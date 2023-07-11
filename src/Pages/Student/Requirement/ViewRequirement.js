import React, { useState,useEffect } from 'react'
import { authFetch } from '../../../Middleware/axios/intance'
import { Breathing } from 'react-shimmer'
import { useParams ,useNavigate } from 'react-router-dom'
import {ToastError,ToastSucess} from '../../../features/DisplayMessage'
import { loadStripe } from "@stripe/stripe-js";
import RazorPay from '../../../Assets/Images/R.png'
import Stripe from '../../../Assets/Images/S.png'
import { Token } from '../../../features/Token'
import jwtdecode from 'jwt-decode'


const ViewRequirement = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const {user} = jwtdecode(Token())
  const [singleProjectData,setSingleProjectData]=useState()
  const [description,setDescription]=useState()
  const [formData,setFormData]=useState()
  const [isRendered, setRendered] = useState(false);

  const DescriptionHandle =()=>{
    let description =singleProjectData.description.split(".")
        description.pop()
    setDescription(description)
   }
  const ApplySubmitData =async(event)=>{
    event.preventDefault()
    try {
      const resp = await authFetch.patch(`/student/internship/${id}`,{description:formData});
      ToastSucess("Enrolled Successfully")
      navigate('/auth/student/internship')
    } catch (error) { ToastError(error) }
  }

  const GetSingleProject =async()=>{
    try {
      const resp = await authFetch(`/student/internship/${id}`);
      const project =  resp.data.reduce((acc, curr) => {
        acc["data"] = curr;
        return acc;
      }, {});
      setSingleProjectData(project.data)
    } catch (error) {
      ToastError(error)
    }
  }

  const PaymentGatway=(event)=>{
    event.preventDefault()
    setRendered(true)
  }

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const PaymentWithRazorPay= async (event)=>{
        event.preventDefault()
        const res = await loadScript(
          'https://checkout.razorpay.com/v1/checkout.js'
        );
    
        if (!res) {
          ToastError('Razorpay SDK failed to load. Are you online?');
          return;
        }
    
        const result = await authFetch.patch(`/student/paid-internship-with-razorpay/${id}`, {projectUserdesciption:formData});
    
        if (!result) {
          ToastError('Server error. Are you online?');
          return;
        }
        const { amount, id: order_id, currency } = result.data;
        const options = {
          key: 'rzp_live_r2aV622VVCLhI2', // Enter the Key ID generated from the Dashboard
          amount: amount.toString(),
          currency: currency,
          name: 'Codesoftic Tech Private Limited',
          description: 'Internship',
          image: "",
          order_id: order_id,
          handler: async function (response) {
            const data = {
              orderCreationId: order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              data:response
            }
            const result = await authFetch.patch('/student/payment/sucess',data);
            if (result) {
               navigate('/auth/student/payment-success')
            }else{
              navigate('/auth/student/payment-failed')
            }
            
          },
          prefill: {
            name: user.name,
            email: user.email,
            contact: user.phoneNumber,
          },
          notes: {
            address:'A306 bestech business tower sector 66 sas nagar mohali',
          },
          theme: {
            color:'#61fbae',
          },
        };
    
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
  }

  const PaymentWithStipe =async(event)=>{
    event.preventDefault()
    const stripe = await loadStripe("pk_test_51IEpRgFDVtL6gGat1PJAaInNkYGWkaEmWRB0Kz7c4KNhiarRSShC8AhoGvfo93SeR0iyrqguXxW3831aha3vZn1f00q5M9mZhU"); 
    const response = await authFetch.patch(`/student/paid-internship-with-stripe/${id}`,{projectUserdesciption:formData});
    const result = stripe.redirectToCheckout({ 
      sessionId: response.data.id, 
    }); 
    if (result.error) { 
      ToastError(result.error); 
    } 
  }

 useEffect(()=>{
  GetSingleProject()
 },[])

  useEffect(() => {
    if(singleProjectData){
        DescriptionHandle()
    }
  },[singleProjectData])
  return (
        <>
        <div className="flex min-h-full items-center justify-center  px-4 sm:px-6 lg:px-8 ">
            <div className="w-full  space-y-8  rounded-lg px-5 py-5 ">
            <section className="border border-gray-200 rounded-lg px-4 py-5">
                <div className="grid grid-cols-2 gap-20">
                <div>
                    <h2 className=" text-start text-3xl font-bold tracking-tight text-gray-900">{!singleProjectData?<Breathing width={800} height={100} />:singleProjectData.title.toUpperCase()}</h2>
                </div>
                </div>
                <br />
                <div>
                {!singleProjectData?<Breathing width={1200} height={1000} />:singleProjectData.skilldata.map((tag,index)=>{
                    return <span key={index+1} className="bg-orange-100 text-orange-600 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-orange-600 dark:text-orange-300">{tag.name}</span>
                })}
                </div>
                <br />
                <hr />
                <br />
                <div>
                  <h3 className='text-start text-2xl font-bold tracking-tight text-gray-900 mb-6 underline'>Project Description</h3>  
                {!description?<Breathing width={1200} height={1000} />:description.map((data,index)=>{
                    return <><p key={index+1} className="break-word mt-2 mb-2 max-w-screen-md text-sm text-gray-600 leading-6" dangerouslySetInnerHTML={{ __html: data }} /></>
                })}
                </div>
                <br/>
                <div className="max-w-7xl mx-auto">
                  <div className=" ">
                    <h2 className="text-2xl font-bold underline">Mentors</h2>
                  </div>
                  {!singleProjectData?null:singleProjectData.MentorData.map((data)=>{
                    return <div className="sm:mx-auto sm:grid sm:grid-cols-2 sm:gap-8">
                    {/*---mentor 1*/}
                    <div className="max-w-md border-2 border-orange-500 shadow-lg rounded-lg  my-10 relative">
                      <div className="absolute top-0 -m-4 right-12 block  rounded-2xl bg-orange-500 text-white shadow  px-4 py-1 text-sm">
                        Skilllabs
                      </div>
                      <div className="flex flex-col mt-10 sm:mt-0 px-10 py-4  rounded-t shadow-lg ">
                        <div className="flex  space-x-4 ">
                          <img className="w-20 h-20 rounded-full" src={data.avatar} alt />
                          <div className="font-medium mb-2 ">
                            <div className="font-bold text-2xl mb-2">{data.name}</div>
                            <div className="font-semibold text-md mb-2">{data.location}</div>
                            <div className="flex items-center gap-8 mb-2">
                              <div>
                                <h3 className="text-sm font-semibold text-gray-900 ">Recent Activity</h3>
                              </div>
                              <div>
                                <i className="fa-solid fa-comment text-gray-900" />
                                <i className="fa-solid fa-comment text-gray-900" />
                                <i className="fa-solid fa-comment text-gray-900" />
                              </div>
                            </div>
                            <hr className="border-1 border-gray-200" />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center bg-orange-200 justify-between px-10 py-2  ">
                        <h1 className="font-bold text-xl pt-4">Skills</h1>
                      </div>
                      {/*----Grid*/}
                      <div className="grid grid-cols-3 px-10 py-4 bg-orange-200">
                        {/*-----------4*/}
                          {data.skills.map((data) => (<>
                            <div className="col-span-2 mb-2 ">
                              <h2 className="font-normal text-md">{data}</h2>
                            </div>
                            <div>
                              <div className="w-full bg-orange-100 rounded-full h-4 mb-4  mt-2">
                                <div className="bg-orange-500 h-4 rounded-full " style={{ width: '24%' }} />
                              </div>
                            </div>
                          </>))}
                      </div>
                    </div>
                   </div>
                  })}
                </div>
              <form onSubmit={!singleProjectData?null:singleProjectData.intershipType=="paid"?PaymentGatway:ApplySubmitData}>
                <div>
                  <textarea id="message" name='description' onChange={(event) => setFormData(event.target.value)} rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500 " placeholder="Write your project description here..." defaultValue={""} required/>
                </div>
                <div className="text-center mt-5">
                  <button type="submit" className="text-white text-end bg-orange-600 hover:bg-orange-400 focus:ring-4 focus:ring-orange-300 font-medium rounded-full text-md px-20 py-3 mr-2 mb-2"> {!singleProjectData?null:singleProjectData.intershipType=="paid"?`Pay ${singleProjectData.price}$`:"Enroll Now" }</button>
                </div>
              </form>
            {/* </form> */}
            </section>
            </div>
        </div>
      {isRendered ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="w-full max-w-md">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col   bg-white outline-none focus:outline-none">
                <div className="relative p-6 flex-auto">
                  <div className="grid gap-6 mb-6 md:grid-cols-1">
                    <div class="payment-form">
                      <div class="px-2">
                        <div className="mb-6">
                          <div>
                            <h1 className="text-2xl font-semibold">Payment</h1>
                          </div>
                        </div>
                        <div className="mb-6">
                          <h4>Choose payment method below</h4>
                        </div>
                        <div className="mb-6" onClick={PaymentWithRazorPay}>
                          <a className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
                            <img className="mb-4" src={RazorPay} />
                            <p className="font-medium text-gray-700 text-xs text-center">
                              PAY WITH RAZORPAY </p>
                          </a>
                        </div>
                        <div className="mb-6" onClick={PaymentWithStipe}>
                          <a className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
                            <img className="mb-4" src={Stripe} />
                            <p className="font-medium text-gray-700 text-xs text-center">
                              PAY WITH STRIPE</p>
                          </a>
                        </div>
                      </div>
                    </div></div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setRendered(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null} 
    </>
  )
}

export default ViewRequirement;