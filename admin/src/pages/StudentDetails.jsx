import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';

const StudentDetails = () => {
  const { getStudents, students, loading, token } = useContext(AdminContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!token) {
      navigate('/login');
    } else {
      // Fetch student details
      const fetchStudents = async () => {
        try {
          await getStudents();
        } catch (err) {
          setError('Failed to fetch student details');
        }
      };
      fetchStudents();
    }
  }, [token, navigate, getStudents]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-[#F7CFD8] text-[#73C7C7]">
      <div className="text-2xl font-semibold">Loading students...</div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center min-h-screen bg-[#F7CFD8]">
      <div className="text-red-600 text-2xl font-semibold">{error}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F4F8D3] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-12 text-[#73C7C7]">
          Student Directory
        </h1>

        {students.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {students.map((student) => (
              <div 
                key={student._id} 
                className="bg-white rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="p-6 bg-[#A6F1E0] rounded-t-2xl">
                  <h2 className="text-xl font-bold text-[#4d8080] break-words">
                    {student.name}
                  </h2>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#73C7C7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-600 break-words">{student.email}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#73C7C7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <p className="text-gray-600">{student.phone}</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#73C7C7] mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-gray-600 break-words">{student.address}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <p className="text-2xl text-[#73C7C7] font-semibold">
              No students found in the directory
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDetails;