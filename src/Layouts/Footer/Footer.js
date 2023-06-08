import React from 'react'
import { Token } from '../../features/Token'
import { useLocation } from 'react-router-dom';

const Footer = () => {
    const UrlName =useLocation()
    // 
  return (
        <>
        {!Token()?null:UrlName.pathname=="/auth/student/quiz"?null:
          <footer className="bg-white border border-t-10" id="footer" aria-labelledby="footerHeading">
              <h2 id="footerHeading" className="sr-only">Footer</h2>
              <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                  <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                      <div className="space-y-8 xl:col-span-1">
                          <a href="/" className="flex items-center space-x-4">
                              <h3 className=" text-xl text-gray-900 px-2 pt-2 font-bold leading-8">LOGO</h3>
                          </a>
                      </div>
                      <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
                          <div className="md:grid md:grid-cols-2 md:gap-8">
                              <div>
                                  <h3 className="text-lg font-bold  tracking-wider ">
                                      Platform
                                  </h3>
                                  <ul className="mt-4 space-y-4">
                                      <li>
                                          <a className="text-base font-normal text-gray-900 hover:text-gray-900">
                                              Browse Mentors
                                          </a>
                                      </li>
                                      <li>
                                          <a className="text-base font-normal text-gray-900 hover:text-gray-900">
                                              Book a Session
                                          </a>
                                      </li>
                                      <li>
                                          <a className="text-base font-normal text-gray-900 hover:text-gray-900">
                                              Browse Mentors
                                          </a>
                                      </li>
                                      <li>
                                          <a className="text-base font-normal text-gray-900 hover:text-gray-900">
                                              Book a Session
                                          </a>
                                      </li>
                                  </ul>
                              </div>
                              <div className="mt-12 md:mt-0">
                                  <h3 className="text-lg font-bold  tracking-wider">
                                      Resources
                                  </h3>
                                  <ul className="mt-4 space-y-4">
                                      <li>
                                          <a className="text-base font-normal text-gray-900 hover:text-gray-900">
                                              Newsletter
                                          </a>
                                      </li>
                                      <li>
                                          <a className="text-base font-normal text-gray-900 hover:text-gray-900">
                                              Podcast
                                          </a>
                                      </li>
                                      <li>
                                          <a className="text-base font-normal text-gray-900 hover:text-gray-900">
                                              Newsletter
                                          </a>
                                      </li>
                                      <li>
                                          <a className="text-base font-normal text-gray-900 hover:text-gray-900">
                                              Podcast
                                          </a>
                                      </li>
                                  </ul>
                              </div>
                          </div>
                          <div className="md:grid md:grid-cols-2 md:gap-8">
                              <div>
                                  <h3 className="text-lg font-bold  tracking-wider ">
                                      Company
                                  </h3>
                                  <ul className="mt-4 space-y-4">
                                      <li>
                                          <a className="text-base font-normal text-gray-900 hover:text-gray-900">
                                              About
                                          </a>
                                      </li>
                                      <li>
                                          <a className="text-base font-normal text-gray-900 hover:text-gray-900">
                                              Partner Program
                                          </a>
                                      </li>
                                      <li>
                                          <a className="text-base font-normal text-gray-900 hover:text-gray-900">
                                              About
                                          </a>
                                      </li>
                                      <li>
                                          <a className="text-base font-normal text-gray-900 hover:text-gray-900">
                                              Partner Program
                                          </a>
                                      </li>
                                  </ul>
                              </div>
                              <div className="mt-12 md:mt-0">
                                  <h3 className="text-lg font-bold  tracking-wider ">
                                      Support
                                  </h3>
                                  <ul className="mt-4 space-y-4">
                                      <li>
                                          <a className="text-base font-normal text-gray-900 hover:text-gray-900">
                                              FAQ
                                          </a>
                                      </li>
                                      <li>
                                          <a className="text-base font-normal text-gray-900 hover:text-gray-900">
                                              Contact
                                          </a>
                                      </li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="mt-12 border-t border-gray-200 pt-8">
                      <p className="text-base font-normal text-gray-900 xl:text-center">© 2023
                          <a className="text-gray-900 normal-case">Skilllabs</a>. All Rights
                          Reserved.</p>
                  </div>
              </div>
          </footer>
        }
    </>
  )
}

export default Footer