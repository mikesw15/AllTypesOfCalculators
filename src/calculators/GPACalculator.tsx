import React, { useState } from 'react';

export default function GPACalculator() {
  const [courses, setCourses] = useState([{ id: 1, credits: 3, grade: 'A' }]);

  const gradePoints: Record<string, number> = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'F': 0.0
  };

  const addCourse = () => setCourses([...courses, { id: Date.now(), credits: 3, grade: 'A' }]);
  const removeCourse = (id: number) => setCourses(courses.filter(c => c.id !== id));
  const updateCourse = (id: number, field: string, value: any) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  let totalCredits = 0;
  let totalPoints = 0;
  courses.forEach(c => {
    totalCredits += c.credits;
    totalPoints += c.credits * gradePoints[c.grade];
  });
  const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 text-center mb-8">
        <p className="text-sm font-medium text-blue-600 uppercase mb-1">Your GPA</p>
        <div className="text-5xl font-extrabold text-blue-900">{gpa.toFixed(2)}</div>
      </div>

      <div className="space-y-3">
        {courses.map((course, index) => (
          <div key={course.id} className="flex gap-4 items-center">
            <div className="w-8 text-center text-gray-400 font-medium">{index + 1}</div>
            <input 
              type="number" 
              value={course.credits} 
              onChange={(e) => updateCourse(course.id, 'credits', Number(e.target.value))}
              className="w-24 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              placeholder="Credits"
            />
            <select 
              value={course.grade} 
              onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
            >
              {Object.keys(gradePoints).map(g => <option key={g} value={g}>{g} ({gradePoints[g]})</option>)}
            </select>
            <button onClick={() => removeCourse(course.id)} className="text-red-500 hover:text-red-700 px-2">✕</button>
          </div>
        ))}
      </div>
      
      <button onClick={addCourse} className="w-full py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-xl hover:bg-gray-50 hover:border-gray-400 font-medium">
        + Add Course
      </button>
    </div>
  );
}
