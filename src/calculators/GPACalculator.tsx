import React, { useState } from 'react';
import { GraduationCap, Plus, Trash2, BookOpen } from 'lucide-react';
import CalculatorResult from '../components/calculator/CalculatorResult';

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
    <div className="max-w-3xl mx-auto space-y-8">
      <CalculatorResult
        label="Your Cumulative GPA"
        value={gpa.toFixed(2)}
        color="blue"
        icon={<GraduationCap className="w-8 h-8 text-blue-600" />}
      />

      <div className="bg-white rounded-2xl border-2 border-gray-100 p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-500" />
            Course List
          </h3>
          <div className="text-sm font-medium text-gray-500">
            Total Credits: <span className="text-gray-900 font-bold">{totalCredits}</span>
          </div>
        </div>

        <div className="space-y-4">
          {courses.map((course, index) => (
            <div key={course.id} className="flex gap-4 items-center p-4 bg-gray-50 rounded-xl border-2 border-transparent hover:border-blue-100 transition-all group">
              <div className="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-sm font-bold text-gray-400 shadow-sm border border-gray-100">
                {index + 1}
              </div>
              
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="relative">
                  <label className="absolute -top-2 left-3 px-1 bg-white text-[10px] font-bold text-gray-400 uppercase">Credits</label>
                  <input 
                    type="number" 
                    value={course.credits} 
                    onChange={(e) => updateCourse(course.id, 'credits', Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-100 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition-all font-bold text-gray-900"
                    placeholder="Credits"
                    min={0}
                  />
                </div>
                
                <div className="relative">
                  <label className="absolute -top-2 left-3 px-1 bg-white text-[10px] font-bold text-gray-400 uppercase">Grade</label>
                  <select 
                    value={course.grade} 
                    onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-100 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition-all font-bold text-gray-900 appearance-none"
                  >
                    {Object.keys(gradePoints).map(g => <option key={g} value={g}>{g} ({gradePoints[g]})</option>)}
                  </select>
                </div>
              </div>

              <button 
                onClick={() => removeCourse(course.id)} 
                className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                title="Remove course"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
        
        <button 
          onClick={addCourse} 
          className="w-full mt-6 py-4 border-2 border-dashed border-gray-200 text-gray-500 rounded-2xl hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all font-bold flex items-center justify-center gap-2 group"
        >
          <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
          Add Another Course
        </button>
      </div>
    </div>
  );
}
