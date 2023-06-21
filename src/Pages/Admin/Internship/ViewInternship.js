import React, { useState, useEffect } from 'react';
import { authFetch } from '../../../Middleware/axios/Interceptors';
import { useParams } from 'react-router-dom';
import { ToastError } from '../../../features/DisplayMessage';

const ViewInternship = () => {
    const { id } = useParams()
    const [formData, setFormData] = useState()

    const GetInternshipData = async () => {
        try {
            const resp = await authFetch(`/admin/intership/${id}`);
            setFormData(resp.data.enrollStudent)
        } catch (error) { ToastError(error.data.message) }
    }

    useEffect(() => {
        GetInternshipData()
    }, [])
    return (
            <>
            <div class="container mt-4 mx-auto">
                <h1 classname="text-2xl font-bold mb-4">Applied Students</h1>
                {!formData?"loading":formData.map((data) => {
                    return <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        <div class="card m-2 cursor-pointer border border-gray-400 rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200">
                            <div class="m-3">
                                <h2 class="text-lg mb-2">{data.studentId.name}</h2>
                                <p class="font-light font-mono text-sm text-gray-700 hover:text-gray-900 transition-all duration-200">{data.description}</p>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </>
    )
}

export default ViewInternship