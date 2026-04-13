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

export const calculators: CalculatorMeta[] = [
  {
    id: 'car-loan',
    title: 'Car Loan Calculator',
    description: 'Calculate your monthly auto loan payments, total interest, and total cost.',
    category: 'Finance & Money',
    icon: 'Car',
    component: CarLoanCalculator,
    seoTitle: 'Car Loan Calculator | AllTypesOfCalculators',
    seoDescription: 'Estimate your monthly car payments and total interest.'
  },
  {
    id: 'compound-interest',
    title: 'Compound Interest',
    description: 'See how your investments grow over time with compound interest.',
    category: 'Finance & Money',
    icon: 'TrendingUp',
    component: CompoundInterestCalculator,
    seoTitle: 'Compound Interest Calculator | AllTypesOfCalculators',
    seoDescription: 'Calculate future value of investments with compound interest.'
  },
  {
    id: 'retirement-savings',
    title: 'Retirement Savings',
    description: 'Plan your future by estimating your retirement nest egg based on savings and returns.',
    category: 'Finance & Money',
    icon: 'PiggyBank',
    component: RetirementCalculator,
    seoTitle: 'Retirement Savings Calculator | AllTypesOfCalculators',
    seoDescription: 'Estimate your future retirement savings and see if you are on track for your goals.'
  },
  {
    id: 'salary-calculator',
    title: 'Salary Calculator',
    description: 'Convert your salary between hourly, daily, weekly, monthly, and yearly.',
    category: 'Finance & Money',
    icon: 'Briefcase',
    component: SalaryCalculator,
    seoTitle: 'Salary Converter & Calculator | AllTypesOfCalculators',
    seoDescription: 'Convert hourly wage to annual salary and vice versa.'
  },
  {
    id: 'crypto-roi',
    title: 'Crypto ROI Calculator',
    description: 'Calculate profit, loss, and ROI for your cryptocurrency investments.',
    category: 'Finance & Money',
    icon: 'Bitcoin',
    component: CryptoROICalculator,
    seoTitle: 'Crypto ROI Calculator | AllTypesOfCalculators',
    seoDescription: 'Calculate your cryptocurrency return on investment.'
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
    seoTitle: 'Free Mortgage Calculator | AllTypesOfCalculators',
    seoDescription: 'Calculate your monthly mortgage payments, total interest, and amortization schedule instantly.'
  },
  {
    id: 'bmi',
    title: 'BMI Calculator',
    description: 'Check your Body Mass Index (BMI) and find out if you are at a healthy weight.',
    category: 'Health & Fitness',
    icon: 'Activity',
    component: BMICalculator,
    seoTitle: 'BMI Calculator - Check Your Body Mass Index | AllTypesOfCalculators',
    seoDescription: 'Free online BMI calculator. Find out your Body Mass Index and healthy weight range.'
  },
  {
    id: 'bmr-tdee',
    title: 'BMR & TDEE Calculator',
    description: 'Calculate your Basal Metabolic Rate and Total Daily Energy Expenditure to manage your weight.',
    category: 'Health & Fitness',
    icon: 'Flame',
    component: BMRCalculator,
    seoTitle: 'BMR & TDEE Calculator | AllTypesOfCalculators',
    seoDescription: 'Calculate your daily calorie needs based on your activity level and body metrics.'
  },
  {
    id: 'water-intake',
    title: 'Water Intake Calculator',
    description: 'Find out how much water you should drink daily based on your weight and activity.',
    category: 'Health & Fitness',
    icon: 'Droplets',
    component: WaterIntakeCalculator,
    seoTitle: 'Daily Water Intake Calculator | AllTypesOfCalculators',
    seoDescription: 'Stay hydrated with our personalized water intake recommendations.'
  },
  {
    id: 'heart-rate-zones',
    title: 'Heart Rate Zones',
    description: 'Calculate your target heart rate zones for optimal training and fat burning.',
    category: 'Health & Fitness',
    icon: 'HeartPulse',
    component: HeartRateCalculator,
    seoTitle: 'Heart Rate Zone Calculator | AllTypesOfCalculators',
    seoDescription: 'Optimize your workouts by training in the right heart rate zones.'
  },
  {
    id: 'body-fat-calculator',
    title: 'Body Fat Calculator',
    description: 'Estimate your body fat percentage using the US Navy method.',
    category: 'Health & Fitness',
    icon: 'Percent',
    component: BodyFatCalculator,
    seoTitle: 'Body Fat Calculator - US Navy Method | AllTypesOfCalculators',
    seoDescription: 'Calculate your estimated body fat percentage based on body measurements.'
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
    seoTitle: 'Macro Calculator | AllTypesOfCalculators',
    seoDescription: 'Find your optimal macronutrient split for weight loss or muscle gain.'
  },
  {
    id: 'scientific-calculator',
    title: 'Scientific Calculator',
    description: 'Perform advanced mathematical operations including trig and logarithms.',
    category: 'Math & Science',
    icon: 'Calculator',
    component: ScientificCalculator,
    seoTitle: 'Online Scientific Calculator | AllTypesOfCalculators',
    seoDescription: 'Free online scientific calculator with advanced functions.'
  },
  {
    id: 'unit-converter',
    title: 'Unit Converter',
    description: 'Convert between different units of length, weight, and more.',
    category: 'Math & Science',
    icon: 'Scale',
    component: UnitConverter,
    seoTitle: 'Universal Unit Converter | AllTypesOfCalculators',
    seoDescription: 'Convert length, weight, and other measurements instantly.'
  },
  {
    id: 'date-time',
    title: 'Date & Time Calculator',
    description: 'Calculate the difference between two dates in days, weeks, and months.',
    category: 'Math & Science',
    icon: 'Calendar',
    component: DateTimeCalculator,
    seoTitle: 'Date Difference Calculator | AllTypesOfCalculators',
    seoDescription: 'Find out exactly how many days are between two dates.'
  },
  {
    id: 'statistics-calculator',
    title: 'Statistics Calculator',
    description: 'Calculate mean, median, mode, range, and standard deviation of a dataset.',
    category: 'Math & Science',
    icon: 'BarChart',
    component: StatisticsCalculator,
    seoTitle: 'Statistics Calculator | AllTypesOfCalculators',
    seoDescription: 'Calculate standard deviation, mean, and median easily.'
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
    seoTitle: 'Trip Fuel Cost Calculator | AllTypesOfCalculators',
    seoDescription: 'Calculate how much gas will cost for your road trip.'
  },
  {
    id: 'rent-vs-buy',
    title: 'Rent vs Buy Calculator',
    description: 'Compare the financial impact of renting vs buying a home over time.',
    category: 'Everyday Life',
    icon: 'Home',
    component: RentVsBuyCalculator,
    seoTitle: 'Rent vs Buy Calculator | AllTypesOfCalculators',
    seoDescription: 'Should you rent or buy? Find out which makes more financial sense.'
  },
  {
    id: 'gpa-calculator',
    title: 'GPA Calculator',
    description: 'Calculate your high school or college Grade Point Average (GPA).',
    category: 'Everyday Life',
    icon: 'GraduationCap',
    component: GPACalculator,
    seoTitle: 'College & High School GPA Calculator | AllTypesOfCalculators',
    seoDescription: 'Easily calculate your semester or cumulative GPA.'
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
    seoTitle: 'Sleep Cycle Calculator | AllTypesOfCalculators',
    seoDescription: 'Calculate when to sleep based on 90-minute sleep cycles.'
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
