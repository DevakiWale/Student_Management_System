'use client';

import React from 'react';

interface StudentProfileProps {
  student: {
    name: string;
    email: string;
    age: number;
    enrollments?: { course: { title: string } }[];
  };
}

const StudentProfile: React.FC<StudentProfileProps> = ({ student }) => {
  if (!student) return <p>Loading profile...</p>; // ✅ Safety check

  return (
    <div className="p-8 bg-white bg-opacity-80 rounded shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Welcome, {student.name}</h1>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Age:</strong> {student.age}</p>
      {student.enrollments && student.enrollments.length > 0 && (
        <>
          <h2 className="text-xl mt-4 mb-2 font-semibold">Enrolled Courses:</h2>
          <ul className="list-disc ml-6">
            {student.enrollments.map((enroll, idx) => (
              <li key={idx}>{enroll.course.title}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default StudentProfile;
