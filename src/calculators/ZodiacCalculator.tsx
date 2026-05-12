import React, { useState, useMemo, useEffect } from 'react';
import CalculatorInput from '../components/calculator/CalculatorInput';
import CalculatorResult from '../components/calculator/CalculatorResult';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { useHistory } from '../contexts/HistoryContext';

// Simple zodiac sign calculation based on month and day
const getSunSign = (month: number, day: number) => {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return { sign: "Aries", element: "Fire" };
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return { sign: "Taurus", element: "Earth" };
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return { sign: "Gemini", element: "Air" };
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return { sign: "Cancer", element: "Water" };
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return { sign: "Leo", element: "Fire" };
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return { sign: "Virgo", element: "Earth" };
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return { sign: "Libra", element: "Air" };
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return { sign: "Scorpio", element: "Water" };
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return { sign: "Sagittarius", element: "Fire" };
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return { sign: "Capricorn", element: "Earth" };
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return { sign: "Aquarius", element: "Air" };
  return { sign: "Pisces", element: "Water" };
};

// Very basic estimation of rising sign
const getRisingSignEstimate = (sunSign: string, birthHour: number) => {
  const signs = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
  const sunIndex = signs.indexOf(sunSign);
  
  // Assume sunrise at 6am. Sign advances every ~2 hours
  const hoursSinceSunrise = birthHour >= 6 ? birthHour - 6 : (24 + birthHour) - 6;
  const signsAdvanced = Math.floor(hoursSinceSunrise / 2);
  
  const risingIndex = (sunIndex + signsAdvanced) % 12;
  return signs[risingIndex];
}

// Basic lunar day estimation to guess moon sign from birth year, month, day
function getMoonSignEstimate(year: number, month: number, day: number) {
  const signs = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
  // This is a "fun" mathematical estimation based on Conway's formula for moon age
  // Not astrologically accurate for an ephemeris, but works as an estimation
  let r = year % 100;
  r %= 19;
  if(r > 9) { r -= 19; }
  r = ((r * 11) % 30) + parseInt((month).toString(), 10) + parseInt((day).toString(), 10);
  if(month < 3) { r += 2; }
  let moonAge = r % 30;
  if (moonAge < 0) moonAge += 30; // 0 to 29
  // The moon orbits the zodiac in ~27.3 days, staying ~2.27 days per sign
  const estimatedSignIndex = Math.floor((moonAge / 29.5) * 12) % 12;
  // It's just a fun randomization mapped to birth date for estimation
  return signs[(estimatedSignIndex + 3) % 12]; // arbitrary offset for the illusion
}

export default function ZodiacCalculator() {
  const { saveToHistory } = useHistory();
  const [birthDate, setBirthDate] = useState<string>('2000-01-01');
  const [birthTime, setBirthTime] = useState<string>('12:00');

  const results = useMemo(() => {
    if (!birthDate) return null;
    
    const [year, month, day] = birthDate.split('-').map(Number);
    const [hour] = birthTime ? birthTime.split(':').map(Number) : [12];
    
    if (!month || !day) return null;

    const sun = getSunSign(month, day);
    const rising = getRisingSignEstimate(sun.sign, hour);
    const moon = getMoonSignEstimate(year, month, day);
    
    // Chinese Zodiac
    const animals = ["Monkey", "Rooster", "Dog", "Pig", "Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Sheep"];
    const chineseZodiac = animals[year % 12];

    return {
      sun: sun.sign,
      sunElement: sun.element,
      rising,
      moon,
      chineseZodiac
    };
  }, [birthDate, birthTime]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (results) {
        saveToHistory(
          'zodiac-calculator',
          'Astrology & Zodiac',
          { birthDate, birthTime },
          { sunSign: results.sun }
        );
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [birthDate, birthTime, results, saveToHistory]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-6">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-2 -mr-2 text-indigo-100 opacity-50">
            <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
          </div>
          <div className="relative z-10 space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-500" />
                Birth Date
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-medium transition-shadow"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-500" />
                Birth Time
              </label>
              <input
                type="time"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-medium transition-shadow"
              />
              <p className="text-xs text-gray-500 mt-2">Required to estimate your Rising Sign.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {results ? (
          <>
            <CalculatorResult
              label="Sun Sign"
              value={results.sun}
              subValue={`(${results.sunElement})`}
              description="Your core identity and ego. Determined by your birth date."
              color="purple"
            />
            
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                <div className="text-sm font-bold text-indigo-400 uppercase tracking-wider mb-1">Moon Sign</div>
                <div className="text-2xl font-black text-indigo-900">{results.moon}</div>
                <div className="text-xs text-indigo-700/70 mt-1">Est. Emotion & Soul</div>
              </div>
              <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                <div className="text-sm font-bold text-indigo-400 uppercase tracking-wider mb-1">Rising Sign</div>
                <div className="text-2xl font-black text-indigo-900">{results.rising}</div>
                <div className="text-xs text-indigo-700/70 mt-1">Est. Outer Persona</div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-gray-500 uppercase">Chinese Zodiac</div>
                <div className="text-lg font-bold text-gray-900">Year of the {results.chineseZodiac}</div>
              </div>
            </div>

            <p className="text-xs text-center text-gray-400 mt-2 italic">
              Note: Moon and Rising signs are mathematical estimations for entertainment purposes. Exact placements require precise ephemeris data and birth coordinates.
            </p>
          </>
        ) : (
          <div className="bg-gray-50 p-8 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center text-center">
            <p className="text-gray-500 font-medium">Please enter your birth details to reveal your signs.</p>
          </div>
        )}
      </div>
    </div>
  );
}
