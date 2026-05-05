import { CalculatorMeta } from '../types';
import MortgageCalculator from './MortgageCalculator';
import BMICalculator from './BMICalculator';
import ImageGenerator from './ImageGenerator';
import BMRCalculator from './BMRCalculator';
import WaterIntakeCalculator from './WaterIntakeCalculator';
import HeartRateCalculator from './HeartRateCalculator';

// Finance
import CarLoanCalculator from './CarLoanCalculator';
import CompoundInterestCalculator from './CompoundInterestCalculator';
import SalaryCalculator from './SalaryCalculator';
import CryptoROICalculator from './CryptoROICalculator';
import CurrencyConverter from './CurrencyConverter';

// Health
import MacroCalculator from './MacroCalculator';

// Math & Science
import ScientificCalculator from './ScientificCalculator';
import UnitConverter from './UnitConverter';
import DateTimeCalculator from './DateTimeCalculator';
import StatisticsCalculator from './StatisticsCalculator';
import ProbabilityCalculator from './ProbabilityCalculator';

// Everyday Life
import FuelCostCalculator from './FuelCostCalculator';
import RentVsBuyCalculator from './RentVsBuyCalculator';
import GPACalculator from './GPACalculator';
import PasswordGenerator from './PasswordGenerator';
import RecipeScaler from './RecipeScaler';

// Fun / Viral
import LoveCalculator from './LoveCalculator';
import SleepCycleCalculator from './SleepCycleCalculator';
import CarbonFootprintCalculator from './CarbonFootprintCalculator';
import ReadingTimeCalculator from './ReadingTimeCalculator';

import PeptideCalculator from './PeptideCalculator';
import ProteinCalculator from './ProteinCalculator';

// Home Improvement
import PaintCalculator from './PaintCalculator';
import FlooringCalculator from './FlooringCalculator';
import ConcreteCalculator from './ConcreteCalculator';
import HVACCalculator from './HVACCalculator';
import TileCalculator from './TileCalculator';
import RetirementCalculator from './RetirementCalculator';
import BodyFatCalculator from './BodyFatCalculator';
import TipCalculator from './TipCalculator';
import WallpaperCalculator from './WallpaperCalculator';
import FractionCalculator from './FractionCalculator';
import ConceptionCalculator from './ConceptionCalculator';

export const calculators: CalculatorMeta[] = [
  {
    id: 'conception',
    title: 'Conception Calculator',
    description: 'Calculate your probable conception date, intercourse window, and expected due date.',
    category: 'Health & Fitness',
    icon: 'Baby',
    component: ConceptionCalculator,
    seoTitle: 'Conception Calculator | Reverse Calculate Conception Date',
    seoDescription: 'Calculate the exact date of conception based on your due date or last period. Discover your intercourse window and pregnancy milestones.'
  },
  {
    id: 'car-loan',
    title: 'Car Loan Calculator',
    description: 'Calculate your monthly auto loan payments, total interest, and total cost.',
    category: 'Finance & Money',
    icon: 'Car',
    component: CarLoanCalculator,
    seoTitle: 'Auto Loan & Car Loan Calculator | Estimate Monthly Payments',
    seoDescription: 'Free car loan calculator to estimate your monthly auto loan payments, total interest paid, and the total cost of your vehicle over time.'
  },
  {
    id: 'compound-interest',
    title: 'Compound Interest',
    description: 'See how your investments grow over time with compound interest.',
    category: 'Finance & Money',
    icon: 'TrendingUp',
    component: CompoundInterestCalculator,
    seoTitle: 'Compound Interest Calculator | Predict Your Investment Growth',
    seoDescription: 'Free compound interest calculator. Discover how your investments, savings, and returns will grow over time with the power of compounding.'
  },
  {
    id: 'retirement-savings',
    title: 'Retirement Savings',
    description: 'Plan your future by estimating your retirement nest egg based on savings and returns.',
    category: 'Finance & Money',
    icon: 'PiggyBank',
    component: RetirementCalculator,
    seoTitle: 'Retirement Savings Calculator | Plan Your Financial Future',
    seoDescription: 'Calculate your retirement savings with our free retirement calculator. Estimate your future nest egg, returns, and see if your goals are on track.'
  },
  {
    id: 'salary-calculator',
    title: 'Salary Calculator',
    description: 'Convert your salary between hourly, daily, weekly, monthly, and yearly.',
    category: 'Finance & Money',
    icon: 'Briefcase',
    component: SalaryCalculator,
    seoTitle: 'Salary Calculator & Hourly Pay Converter | Calculate Take-Home Pay',
    seoDescription: 'Free salary calculator to seamlessly convert your wage between hourly, daily, weekly, monthly, and annual yearly income.'
  },
  {
    id: 'crypto-roi',
    title: 'Crypto ROI Calculator',
    description: 'Calculate profit, loss, and ROI for your cryptocurrency investments.',
    category: 'Finance & Money',
    icon: 'Bitcoin',
    component: CryptoROICalculator,
    seoTitle: 'Crypto ROI Calculator | Cryptocurrency Profit & Loss Estimator',
    seoDescription: 'Calculate your cryptocurrency return on investment (ROI), total profit, and loss for Bitcoin, Ethereum, and other altcoins instantly.'
  },
  {
    id: 'currency-converter',
    title: 'Currency Converter',
    description: 'Convert between all global currencies with real-time exchange rates.',
    category: 'Finance & Money',
    icon: 'DollarSign',
    component: CurrencyConverter,
    seoTitle: 'Currency Converter | Real-Time Exchange Rates',
    seoDescription: 'Free currency converter. Convert between USD, EUR, GBP, JPY, and all other global currencies using live exchange rates.',
    explanation: (
      <>
        <p>This currency converter uses live exchange rates to calculate the value of one currency in another.</p>
        <p>It supports all major global currencies and updates rates automatically. Simply enter the amount, select your starting currency, and choose the target currency to see the conversion.</p>
      </>
    ),
    faq: [
      {
        question: "How often are the exchange rates updated?",
        answer: "The exchange rates are fetched from a reliable API and are typically updated every 24 hours."
      },
      {
        question: "Are there any fees included in this conversion?",
        answer: "No, this calculator shows the mid-market exchange rate. Banks and exchange services usually add a margin or fee on top of this rate."
      }
    ],
    relatedIds: ['crypto-roi', 'salary-calculator']
  },
  {
    id: 'mortgage',
    title: 'Mortgage Calculator',
    description: 'Calculate your monthly mortgage payments including taxes and insurance.',
    category: 'Finance & Money',
    icon: 'Home',
    component: MortgageCalculator,
    seoTitle: 'Free Mortgage Calculator with Taxes and Insurance',
    seoDescription: 'Calculate your monthly mortgage payments, including property taxes, home insurance, and PMI. Generate instant amortization schedules.'
  },
  {
    id: 'bmi',
    title: 'BMI Calculator',
    description: 'Check your Body Mass Index (BMI) and find out if you are at a healthy weight.',
    category: 'Health & Fitness',
    icon: 'Activity',
    component: BMICalculator,
    seoTitle: 'Body Mass Index (BMI) Calculator | Check Your Healthy Weight',
    seoDescription: 'Free online BMI calculator. Find out your Body Mass Index and healthy weight range for adult men and women based on height and weight.'
  },
  {
    id: 'bmr-tdee',
    title: 'BMR & TDEE Calculator',
    description: 'Calculate your Basal Metabolic Rate and Total Daily Energy Expenditure to manage your weight.',
    category: 'Health & Fitness',
    icon: 'Flame',
    component: BMRCalculator,
    seoTitle: 'BMR & TDEE Calculator | Calculate Daily Calorie & Energy Needs',
    seoDescription: 'Calculate your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE). Discover your exact daily calorie needs for weight loss, maintenance, or muscle gain.'
  },
  {
    id: 'water-intake',
    title: 'Water Intake Calculator',
    description: 'Find out how much water you should drink daily based on your weight and activity.',
    category: 'Health & Fitness',
    icon: 'Droplets',
    component: WaterIntakeCalculator,
    seoTitle: 'Water Intake Calculator | How Much Water Should I Drink?',
    seoDescription: 'Calculate daily water intake. Find out exactly how many ounces or liters of water you should drink per day to stay hydrated based on weight and activity.'
  },
  {
    id: 'heart-rate-zones',
    title: 'Heart Rate Zones',
    description: 'Calculate your target heart rate zones for optimal training and fat burning.',
    category: 'Health & Fitness',
    icon: 'HeartPulse',
    component: HeartRateCalculator,
    seoTitle: 'Target Heart Rate Zone Calculator | Fat Burning & Cardio',
    seoDescription: 'Calculate your target heart rate zones for maximum fat burning, cardio capacity, and optimal athletic training.'
  },
  {
    id: 'body-fat-calculator',
    title: 'Body Fat Calculator',
    description: 'Estimate your body fat percentage using the US Navy method.',
    category: 'Health & Fitness',
    icon: 'Percent',
    component: BodyFatCalculator,
    seoTitle: 'Body Fat Calculator - US Navy Method | Estimate Body Fat %',
    seoDescription: 'Determine your body fat percentage, lean body mass, and fat mass using the highly accurate US Navy method. Free online body fat estimator.'
  },
  {
    id: 'peptide-calculator',
    title: 'Peptide Calculator',
    description: 'Calculate the exact amount of bacteriostatic water needed to reconstitute your peptides and determine the correct syringe dosage.',
    category: 'Health & Fitness',
    icon: 'Syringe',
    component: PeptideCalculator,
    seoTitle: 'Peptide Reconstitution & Dosage Calculator | AllTypesOfCalculators',
    seoDescription: 'Free peptide calculator to determine how much bacteriostatic water to add and how many units to pull on an insulin syringe.',
    explanation: (
      <>
        <p>Reconstituting lyophilized (freeze-dried) peptides requires precision. This calculator helps you determine exactly how many units to pull on an insulin syringe to get your desired dose.</p>
        <ol>
          <li><strong>Syringe Volume:</strong> Select the size of your insulin syringe. Standard sizes are 1ml (100 Units), 0.5ml (50 Units), and 0.3ml (30 Units).</li>
          <li><strong>Peptide Amount:</strong> Enter the amount of peptide in the vial (e.g., 2mg, 5mg, 10mg).</li>
          <li><strong>Bacteriostatic Water:</strong> Enter the amount of water you are adding to the vial to reconstitute the powder.</li>
          <li><strong>Desired Dose:</strong> Enter the dose you want to administer in micrograms (mcg). Note that 1mg = 1000mcg.</li>
        </ol>
        <p>The calculator will output the exact number of "tick marks" (units) you need to pull on your syringe.</p>
      </>
    ),
    faq: [
      {
        question: "What is Bacteriostatic Water?",
        answer: "Bacteriostatic water is sterile water containing 0.9% benzyl alcohol, which prevents the growth of bacteria. It is commonly used to reconstitute lyophilized peptides for injection."
      },
      {
        question: "How many mcg are in 1 mg?",
        answer: "There are 1,000 micrograms (mcg) in 1 milligram (mg). For example, a 5mg vial contains 5,000mcg of peptide."
      },
      {
        question: "What does 'U-100' mean on a syringe?",
        answer: "U-100 means there are 100 units of active substance per 1 milliliter (ml) of liquid. A standard 1ml insulin syringe has 100 tick marks (units)."
      }
    ],
    relatedIds: ['bmi-calculator', 'bmr-tdee', 'macro-calculator']
  },
  {
    id: 'protein-calculator',
    title: 'Protein Calculator',
    description: 'Estimate your recommended daily protein intake based on your age, gender, weight, height, and activity level.',
    category: 'Health & Fitness',
    icon: 'Dumbbell',
    component: ProteinCalculator,
    seoTitle: 'Protein Calculator | Daily Protein Intake Recommendation',
    seoDescription: 'Free protein calculator to determine your minimum, recommended, and maximum daily protein intake based on your fitness goals.',
    explanation: (
      <>
        <p>Protein is an essential macronutrient needed for building and repairing tissues, making enzymes and hormones, and supporting overall health.</p>
        <p>This calculator determines your daily protein needs based on your body weight, activity level, and fitness goals:</p>
        <ul>
          <li><strong>Sedentary:</strong> Requires less protein, closer to the RDA of 0.8g per kg of body weight.</li>
          <li><strong>Active/Athletes:</strong> Require more protein (1.2g to 2.0g per kg) to support muscle repair and growth.</li>
          <li><strong>Weight Loss:</strong> A higher protein intake can help preserve lean muscle mass and increase satiety while in a caloric deficit.</li>
        </ul>
      </>
    ),
    faq: [
      {
        question: "Can I eat too much protein?",
        answer: "Yes. While protein is essential, consuming excessive amounts (generally above 2.0g per kg of body weight for extended periods) can strain the kidneys in susceptible individuals and may lead to excess calories being stored as fat."
      },
      {
        question: "What are the best sources of protein?",
        answer: "High-quality protein sources include lean meats (chicken, turkey, beef), fish, eggs, dairy (Greek yogurt, milk), and plant-based options like tofu, lentils, beans, and quinoa."
      }
    ],
    relatedIds: ['macro-calculator', 'bmr-tdee', 'bmi-calculator']
  },
  {
    id: 'macro-calculator',
    title: 'Macro Calculator',
    description: 'Calculate your ideal daily protein, carbs, and fat intake based on your goals.',
    category: 'Health & Fitness',
    icon: 'PieChart',
    component: MacroCalculator,
    seoTitle: 'Macro Calculator | Fast Track Your Diet & Nutrition',
    seoDescription: 'Determine your ideal daily macronutrient split—protein, carbs, and fat—for weight loss, muscle gain, or maintenance. Free macro diet planner.'
  },
  {
    id: 'scientific-calculator',
    title: 'Scientific Calculator',
    description: 'Perform advanced mathematical operations including trig and logarithms.',
    category: 'Math & Science',
    icon: 'Calculator',
    component: ScientificCalculator,
    seoTitle: 'Online Scientific Calculator | Advanced Math Functions',
    seoDescription: 'Free online scientific calculator. Perform advanced mathematical operations, trigonometry, logarithms, fractions, and exponential algebra easily.'
  },
  {
    id: 'unit-converter',
    title: 'Unit Converter',
    description: 'Convert between different units of length, weight, and more.',
    category: 'Math & Science',
    icon: 'Scale',
    component: UnitConverter,
    seoTitle: 'Universal Unit Converter | Length, Weight, Volume & More',
    seoDescription: 'Fast, free universal unit converter. Instantly convert measurements for length, weight, volume, temperature, and area.'
  },
  {
    id: 'date-time',
    title: 'Date & Time Calculator',
    description: 'Calculate the difference between two dates in days, weeks, and months.',
    category: 'Math & Science',
    icon: 'Calendar',
    component: DateTimeCalculator,
    seoTitle: 'Date & Time Calculator | Add/Subtract Days & Find Duration',
    seoDescription: 'Easily calculate the duration between two dates, find business days, or add/subtract days, weeks, and months to a calendar date.'
  },
  {
    id: 'statistics-calculator',
    title: 'Statistics Calculator',
    description: 'Calculate mean, median, mode, range, and standard deviation of a dataset.',
    category: 'Math & Science',
    icon: 'BarChart',
    component: StatisticsCalculator,
    seoTitle: 'Statistics Calculator | Mean, Median, Mode & Standard Deviation',
    seoDescription: 'Free statistics calculator to compute the mean, median, mode, variance, range, and standard deviation for any data set.'
  },
  {
    id: 'probability-calculator',
    title: 'Probability Calculator',
    description: 'Calculate the probability of multiple independent events occurring.',
    category: 'Math & Science',
    icon: 'Dices',
    component: ProbabilityCalculator,
    seoTitle: 'Probability Calculator | AllTypesOfCalculators',
    seoDescription: 'Calculate the odds and probability of events.'
  },
  {
    id: 'fraction-calculator',
    title: 'Fraction Calculator',
    description: 'Add, subtract, multiply, and divide fractions easily.',
    category: 'Math & Science',
    icon: 'Divide',
    component: FractionCalculator,
    seoTitle: 'Fraction Calculator - Simplify & Calculate Fractions | AllTypesOfCalculators',
    seoDescription: 'Free online fraction calculator to add, subtract, multiply, and divide fractions.'
  },
  {
    id: 'fuel-cost',
    title: 'Fuel Cost Calculator',
    description: 'Estimate the total cost of gas for your next road trip.',
    category: 'Everyday Life',
    icon: 'Fuel',
    component: FuelCostCalculator,
    seoTitle: 'Fuel Cost \& Gas Trip Calculator | Plan Your Road Trip Expenses',
    seoDescription: 'Accurately estimate the total gas cost for your next road trip, commute, or travel plan based on vehicle MPG and current fuel prices.'
  },
  {
    id: 'rent-vs-buy',
    title: 'Rent vs Buy Calculator',
    description: 'Compare the financial impact of renting vs buying a home over time.',
    category: 'Everyday Life',
    icon: 'Home',
    component: RentVsBuyCalculator,
    seoTitle: 'Rent vs Buy Calculator | Real Estate & Housing Decision Model',
    seoDescription: 'Unsure whether to rent or buy a home? Compare the long-term financial impact, ROI, mortgage costs, and rent appreciation to find the best choice.'
  },
  {
    id: 'gpa-calculator',
    title: 'GPA Calculator',
    description: 'Calculate your high school or college Grade Point Average (GPA).',
    category: 'Everyday Life',
    icon: 'GraduationCap',
    component: GPACalculator,
    seoTitle: 'GPA Calculator | High School & College Grade Planner',
    seoDescription: 'Calculate your semester and cumulative Grade Point Average (GPA). A free tool for high school and college students to track academic progress.'
  },
  {
    id: 'password-generator',
    title: 'Password Generator',
    description: 'Generate secure, random passwords with custom length and character types.',
    category: 'Everyday Life',
    icon: 'Key',
    component: PasswordGenerator,
    seoTitle: 'Secure Password Generator | AllTypesOfCalculators',
    seoDescription: 'Create strong, random passwords instantly.'
  },
  {
    id: 'recipe-scaler',
    title: 'Recipe Scaler',
    description: 'Easily scale recipe ingredients up or down for different serving sizes.',
    category: 'Everyday Life',
    icon: 'ChefHat',
    component: RecipeScaler,
    seoTitle: 'Recipe Ingredient Scaler | AllTypesOfCalculators',
    seoDescription: 'Scale your recipes for any number of servings.'
  },
  {
    id: 'tip-calculator',
    title: 'Tip & Bill Splitter',
    description: 'Quickly calculate tips and split the bill among friends.',
    category: 'Everyday Life',
    icon: 'Users',
    component: TipCalculator,
    seoTitle: 'Tip Calculator & Bill Splitter | AllTypesOfCalculators',
    seoDescription: 'Easily calculate tips and split restaurant bills among multiple people.'
  },
  {
    id: 'love-calculator',
    title: 'Love Calculator',
    description: 'Calculate the compatibility between two names. Just for fun!',
    category: 'Fun / Viral',
    icon: 'Heart',
    component: LoveCalculator,
    seoTitle: 'Love Calculator & Compatibility Test | AllTypesOfCalculators',
    seoDescription: 'Test your love compatibility with our fun name calculator.'
  },
  {
    id: 'sleep-cycle',
    title: 'Sleep Cycle Calculator',
    description: 'Find the best time to go to bed to wake up feeling refreshed.',
    category: 'Fun / Viral',
    icon: 'Moon',
    component: SleepCycleCalculator,
    seoTitle: 'Sleep Cycle Calculator | Wake Up Refreshed & Energized',
    seoDescription: 'Find your perfect bedtime and wake-up time based on 90-minute REM sleep cycles. Stop waking up groggy with our free sleep cycle planner.'
  },
  {
    id: 'carbon-footprint',
    title: 'Carbon Footprint',
    description: 'Estimate your annual CO2 emissions based on driving, flying, and diet.',
    category: 'Fun / Viral',
    icon: 'Leaf',
    component: CarbonFootprintCalculator,
    seoTitle: 'Carbon Footprint Calculator | AllTypesOfCalculators',
    seoDescription: 'Calculate your personal carbon footprint.'
  },
  {
    id: 'reading-time',
    title: 'Reading Time Calculator',
    description: 'Estimate how long it will take to read an article or book excerpt.',
    category: 'Fun / Viral',
    icon: 'BookOpen',
    component: ReadingTimeCalculator,
    seoTitle: 'Reading Time Calculator | AllTypesOfCalculators',
    seoDescription: 'Find out how long it takes to read any text.'
  },
  {
    id: 'ai-image-generator',
    title: 'AI Image Generator',
    description: 'Generate high-quality 1K, 2K, and 4K images from text descriptions using Gemini AI.',
    category: 'Fun & Niche',
    icon: 'Image',
    component: ImageGenerator,
    seoTitle: 'Free AI Image Generator | AllTypesOfCalculators',
    seoDescription: 'Generate beautiful high-resolution images from text using advanced AI.'
  },
  {
    id: 'paint-calculator',
    title: 'Paint Calculator',
    description: 'Estimate how many gallons of paint are needed based on room dimensions.',
    category: 'Home Improvement & DIY',
    icon: 'PaintRoller',
    component: PaintCalculator,
    seoTitle: 'Paint Calculator - Estimate Paint Gallons Needed | AllTypesOfCalculators',
    seoDescription: 'Free paint calculator to estimate how many gallons of paint you need for your walls and rooms.'
  },
  {
    id: 'flooring-calculator',
    title: 'Flooring Calculator',
    description: 'Calculate how many boxes of tile, laminate, or carpet are needed.',
    category: 'Home Improvement & DIY',
    icon: 'Grid',
    component: FlooringCalculator,
    seoTitle: 'Flooring Calculator - Estimate Tile, Laminate & Carpet | AllTypesOfCalculators',
    seoDescription: 'Calculate the square footage and number of boxes needed for your flooring project.'
  },
  {
    id: 'concrete-calculator',
    title: 'Concrete Calculator',
    description: 'Calculate cubic yardage and bags of concrete needed for a slab.',
    category: 'Home Improvement & DIY',
    icon: 'HardHat',
    component: ConcreteCalculator,
    seoTitle: 'Concrete Calculator - Yards & Bags Estimator | AllTypesOfCalculators',
    seoDescription: 'Calculate how many cubic yards or bags of concrete you need for your construction project.'
  },
  {
    id: 'hvac-btu-calculator',
    title: 'HVAC / BTU Calculator',
    description: 'Figure out what size air conditioner or heater you need for a room.',
    category: 'Home Improvement & DIY',
    icon: 'ThermometerSun',
    component: HVACCalculator,
    seoTitle: 'HVAC BTU Calculator - AC & Heater Sizing | AllTypesOfCalculators',
    seoDescription: 'Calculate the required BTUs and AC tonnage needed to cool or heat your room.'
  },
  {
    id: 'tile-calculator',
    title: 'Tile Calculator',
    description: 'Calculate how many tiles and boxes you need for your floor or wall project.',
    category: 'Home Improvement & DIY',
    icon: 'Grid',
    component: TileCalculator,
    seoTitle: 'Tile Calculator - Estimate Tiles & Grout | AllTypesOfCalculators',
    seoDescription: 'Calculate exactly how many tiles, boxes, and grout you need for your tiling project.',
    explanation: (
      <>
        <p>Planning a tiling project requires accurate measurements to ensure you have enough material without excessive waste.</p>
        <p>This calculator helps you determine:</p>
        <ul>
          <li><strong>Total Tiles:</strong> The number of individual tiles needed based on your room and tile size.</li>
          <li><strong>Grout Consideration:</strong> Factor in the grout line width for a more precise count.</li>
          <li><strong>Boxes Needed:</strong> How many full boxes to purchase based on tiles per box.</li>
          <li><strong>Waste Factor:</strong> Automatically adds extra tiles for cuts and breakage.</li>
        </ul>
      </>
    ),
    faq: [
      {
        question: "How much waste should I account for?",
        answer: "A 10% waste factor is standard for most rectangular rooms. If you have many corners or are laying tiles diagonally, increase this to 15-20%."
      },
      {
        question: "Does grout width really matter?",
        answer: "Yes, especially for smaller tiles. A 1/8\" or 1/4\" grout line can significantly reduce the number of tiles needed over a large area."
      }
    ],
    relatedIds: ['flooring-calculator', 'paint-calculator', 'concrete-calculator']
  },
  {
    id: 'wallpaper-calculator',
    title: 'Wallpaper Calculator',
    description: 'Estimate how many rolls of wallpaper you need for your room.',
    category: 'Home Improvement & DIY',
    icon: 'Layers',
    component: WallpaperCalculator,
    seoTitle: 'Wallpaper Calculator - Estimate Rolls Needed | AllTypesOfCalculators',
    seoDescription: 'Calculate exactly how many rolls of wallpaper you need for your home improvement project.'
  }
];

export const getCalculatorById = (id: string) => calculators.find(c => c.id === id);
export const getCalculatorsByCategory = () => {
  const grouped: Record<string, CalculatorMeta[]> = {};
  calculators.forEach(calc => {
    if (!grouped[calc.category]) grouped[calc.category] = [];
    grouped[calc.category].push(calc);
  });
  return grouped;
};
