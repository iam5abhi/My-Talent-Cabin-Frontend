import * as React from 'react';
import { Breathing } from 'react-shimmer'
import { authFetch } from '../../../../Middleware/axios/Interceptors';
import { ToastError } from '../../../../features/DisplayMessage';
import jwtDecode from 'jwt-decode';
import { Token } from '../../../../features/Token';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import FormatCertificate from './FormatCertificate'


const Certificate = () => {
    const { user } = jwtDecode(Token())
    const [getData, setGetData] = React.useState()


    const ProfileSubmit = async () => {
        try {
            const res = await authFetch('/student/internship');
            const filteredInternships = res.data.filter(internship =>
                internship.enrollStudent.some(student => student.studentId === user._id)
            );
            setGetData(filteredInternships)
        } catch (error) { ToastError(error.data) }
    }

    React.useEffect(() => {
        ProfileSubmit();
    }, [])
    return (
        <>

            <div className=" grid grid-cols-1 gap-6">
                <div className="text-sm font-medium text-slate-600 ">
                    <div className="grid grid-cols-2 gap-4 bg-slate-100">
                        <div>
                            <h5 className="  p-2 font-medium leading-tight text-xl mt-0 mb-2 text-black">Certificate</h5>
                        </div>
                    </div>
                    <hr />
                    <div className="ml-2 p-4 grid grid-cols-1 gap-2">
                        {!getData ? <Breathing width={1200} height={250} /> :
                            getData.map((data) => {
                                if (data.status === "complete") {
                                    return (
                                        <>
                                            <div className="grid grid-cols-5 gap-4">
                                                <div className="col-span-4 ...">
                                                    <p className=" text-black text-base ">{data.description}</p>
                                                </div>
                                                <div className=" col  text-end text-slate-600 text-xs ">
                                                    <PDFDownloadLink document={<FormatCertificate
                                                        internName="John Doe"
                                                        companyName="ABC Company"
                                                        internshipDuration="June 2023 - August 2023"
                                                        signatoryName="Jane Smith"
                                                        signatoryTitle="HR Manager"
                                                        companyLogo="/path/to/company_logo.png" />}
                                                        fileName="my_document.pdf">
                                                        {({ blob, url, loading, error }) =>
                                                            loading ? 'Loading document...' : <i className="fa-solid fa-download border-solid  ring-2 ring-gray-200 p-2 rounded-full" />
                                                        }
                                                    </PDFDownloadLink>
                                                </div>
                                            </div>
                                            <br />
                                        </>
                                    )
                                }
                            })}
                    </div>
                </div>
            </div>
            <hr />
        </>
    )
}

export default Certificate;
