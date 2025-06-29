import { getUserFromCookie } from '@/lib/authCheck';
import api from '@/lib/api';

export default async function ProfilePage() {
  const user = await getUserFromCookie();

  if (!user) {
    return <div className="text-red-500 p-4">Not logged in</div>;
  }

  const res = await api.get(`/students/${user.id}`);
  const student = res.data;

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-2">👤 My Profile</h1>
      <p><strong>Name:</strong> {student.name}</p>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Age:</strong> {student.age}</p>

      <h2 className="mt-4 text-xl font-semibold">📚 Enrolled Courses</h2>
      <ul className="list-disc ml-6">
        {student.enrollments.map((enroll: any) => (
          <li key={enroll.course.id}>{enroll.course.title}</li>
        ))}
      </ul>
    </div>
  );
}
