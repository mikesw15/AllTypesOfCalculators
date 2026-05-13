import React, { useState, useMemo } from 'react';

export default function ProteinCalculator() {
  const [unit, setUnit] = useState<'metric' | 'us'>('metric');
  const [age, setAge] = useState<number>(30);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [height, setHeight] = useState<number>(175);
  const [weight, setWeight] = useState<number>(70);
  const [activity, setActivity] = useState<string>('moderate');
  const [goal, setGoal] = useState<string>('maintain');

  const [hasCalculated, setHasCalculated] = useState(false);

  const handleUnitChange = (newUnit: 'metric' | 'us') => {
    if (newUnit === unit) return;
    
    if (newUnit === 'us') {
      setHeight(Math.round(height / 2.54));
      setWeight(Math.round(weight * 2.20462));
    } else {
      setHeight(Math.round(height * 2.54));
      setWeight(Math.round(weight / 2.20462));
    }
    setUnit(newUnit);
  };

  const results = useMemo(() => {
    const weightKg = unit === 'us' ? weight * 0.453592 : weight;

    let minMult = 0.8;
    let maxMult = 2.0;
    let recMult = 0.8;

    switch (activity) {
      case 'sedentary': recMult = 0.8; break;
      case 'light': recMult = 1.0; break;
      case 'moderate': recMult = 1.2; break;
      case 'active': recMult = 1.4; break;
      case 'very': recMult = 1.6; break;
    }

    switch (goal) {
      case 'lose':
        recMult += 0.2;
        break;
      case 'gain':
        recMult += 0.4;
        if (recMult < 1.6) recMult = 1.6;
        break;
      case 'athlete':
        recMult += 0.4;
        if (recMult < 1.8) recMult = 1.8;
        break;
    }

    if (recMult > maxMult) recMult = maxMult;
    if (recMult < minMult) recMult = minMult;

    return {
      min: Math.round(weightKg * minMult),
      recommended: Math.round(weightKg * recMult),
      max: Math.round(weightKg * maxMult)
    };
  }, [weight, unit, activity, goal]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-center gap-4 mb-8">
        <button 
          onClick={() => handleUnitChange('metric')} 
          className={`px-6 py-2 rounded-full font-medium transition-colors ${unit === 'metric' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          Metric
        </button>
        <button 
          onClick={() => handleUnitChange('us')} 
          className={`px-6 py-2 rounded-full font-medium transition-colors ${unit === 'us' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          US
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input 
                type="number" 
                value={age} 
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                min="15" max="100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="gender" 
                    value="male" 
                    checked={gender === 'male'} 
                    onChange={() => setGender('male')}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span>Male</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="gender" 
                    value="female" 
                    checked={gender === 'female'} 
                    onChange={() => setGender('female')}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span>Female</span>
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Height ({unit === 'metric' ? 'cm' : 'inches'})
              </label>
              <input 
                type="number" 
                value={height} 
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weight ({unit === 'metric' ? 'kg' : 'lbs'})
              </label>
              <input 
                type="number" 
                value={weight} 
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Activity Level</label>
            <select 
              value={activity} 
              onChange={(e) => setActivity(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
            >
              <option value="sedentary">Sedentary (little or no exercise)</option>
              <option value="light">Lightly active (light exercise 1-3 days/week)</option>
              <option value="moderate">Moderately active (moderate exercise 3-5 days/week)</option>
              <option value="active">Active (hard exercise 6-7 days/week)</option>
              <option value="very">Very active (very hard exercise & physical job)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fitness Goal</label>
            <select 
              value={goal} 
              onChange={(e) => setGoal(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
            >
              <option value="maintain">Maintain current weight</option>
              <option value="lose">Lose weight / body fat</option>
              <option value="gain">Build muscle / gain weight</option>
              <option value="athlete">Athlete / intense training</option>
            </select>
          </div>

          <button 
            onClick={() => setHasCalculated(true)}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
          >
            Calculate Protein Intake
          </button>
        </div>

        {hasCalculated ? (
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Your Daily Protein Intake</h3>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <div className="text-3xl font-bold text-gray-600">{results.min}<span className="text-lg">g</span></div>
                  <div className="text-xs text-gray-500 mt-1 uppercase font-semibold tracking-wider">Minimum</div>
                </div>
                <div className="bg-white rounded-xl p-3 shadow-sm border border-blue-100 transform scale-110">
                  <div className="text-4xl font-extrabold text-blue-600">{results.recommended}<span className="text-xl">g</span></div>
                  <div className="text-xs text-blue-600 mt-1 uppercase font-bold tracking-wider">Recommended</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-600">{results.max}<span className="text-lg">g</span></div>
                  <div className="text-xs text-gray-500 mt-1 uppercase font-semibold tracking-wider">Maximum</div>
                </div>
              </div>
              
              <div className="text-sm text-gray-600 text-left space-y-2 mt-6">
                <p><strong>Minimum (0.8g/kg):</strong> The RDA to prevent deficiency.</p>
                <p><strong>Recommended:</strong> Based on your activity and goals.</p>
                <p><strong>Maximum (2.0g/kg):</strong> Safe upper limit for long-term consumption.</p>
              </div>
            </div>
            
            <img 
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800&h=400" 
              alt="Healthy protein rich food" 
              className="w-full h-48 object-cover rounded-2xl shadow-sm"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        ) : (
          <div className="bg-gray-50 rounded-2xl border border-gray-200 flex flex-col items-center justify-center p-8 text-center h-full min-h-[400px]">
            <img 
              src="https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=400&h=400" 
              alt="Protein shake" 
              className="w-32 h-32 object-cover rounded-full mb-6 shadow-md"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to optimize your diet?</h3>
            <p className="text-gray-500">Enter your details and click calculate to see your personalized protein recommendations.</p>
          </div>
        )}
      </div>

      {hasCalculated && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <h3 className="text-lg font-bold text-gray-900">Common Protein Food Sources</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3">Food</th>
                  <th className="px-6 py-3">Serving Size</th>
                  <th className="px-6 py-3">Protein</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium text-gray-900">Chicken breast, cooked</td>
                  <td className="px-6 py-3 text-gray-600">3 oz (85g)</td>
                  <td className="px-6 py-3 font-bold text-blue-600">26g</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium text-gray-900">Beef, cooked</td>
                  <td className="px-6 py-3 text-gray-600">3 oz (85g)</td>
                  <td className="px-6 py-3 font-bold text-blue-600">22g</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium text-gray-900">Salmon, cooked</td>
                  <td className="px-6 py-3 text-gray-600">3 oz (85g)</td>
                  <td className="px-6 py-3 font-bold text-blue-600">21g</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium text-gray-900">Greek yogurt, plain</td>
                  <td className="px-6 py-3 text-gray-600">1 cup (240g)</td>
                  <td className="px-6 py-3 font-bold text-blue-600">20g</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium text-gray-900">Tofu, firm</td>
                  <td className="px-6 py-3 text-gray-600">1/2 cup (126g)</td>
                  <td className="px-6 py-3 font-bold text-blue-600">10g</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium text-gray-900">Lentils, cooked</td>
                  <td className="px-6 py-3 text-gray-600">1/2 cup (99g)</td>
                  <td className="px-6 py-3 font-bold text-blue-600">9g</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium text-gray-900">Milk</td>
                  <td className="px-6 py-3 text-gray-600">1 cup (240ml)</td>
                  <td className="px-6 py-3 font-bold text-blue-600">8g</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium text-gray-900">Egg</td>
                  <td className="px-6 py-3 text-gray-600">1 large</td>
                  <td className="px-6 py-3 font-bold text-blue-600">6g</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium text-gray-900">Almonds</td>
                  <td className="px-6 py-3 text-gray-600">1 oz (28g)</td>
                  <td className="px-6 py-3 font-bold text-blue-600">6g</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
