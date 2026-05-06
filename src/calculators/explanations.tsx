import React from 'react';

export const calculatorExplanations: Record<string, React.ReactNode> = {
  'conception': (
    <>
      <p><strong>Formula:</strong> Conception Date = Expected Due Date - 266 days (or 38 weeks).</p>
      <p>A standard pregnancy lasts for roughly 280 days (40 weeks) from the first day of the Last Menstrual Period (LMP). Since conception typically occurs around 14 days after the LMP, the actual gestation period from conception is about 266 days.</p>
    </>
  ),
  'ovulation': (
    <>
      <p><strong>Formula:</strong> Ovulation Date = Next Expected Period - 14 days.</p>
      <p>The luteal phase (the time between ovulation and the next period) is fairly constant at 14 days for most women. Your fertile window is generally considered to be the 5 days leading up to ovulation and the day of ovulation itself.</p>
    </>
  ),
  'pregnancy-weight': (
    <>
      <p><strong>Formula:</strong> Pre-pregnancy BMI = Weight (kg) / [Height (m)]²</p>
      <p>Based on guidelines from the Institute of Medicine (IOM), the recommended weight gain is determined by your initial BMI category. Underweight individuals are recommended to gain more, while overweight or obese individuals are expected to gain less, supporting a healthy pregnancy.</p>
    </>
  ),
  'car-loan': (
    <>
      <p><strong>Formula:</strong> P = [r * PV] / [1 - (1 + r)^-n]</p>
      <p>Where <strong>P</strong> is the monthly payment, <strong>r</strong> is the monthly interest rate (annual rate / 12), <strong>PV</strong> is the principal loan amount (car price minus down payment and trade-in), and <strong>n</strong> is the number of total months (loan term).</p>
    </>
  ),
  'compound-interest': (
    <>
      <p><strong>Formula:</strong> A = P(1 + r/n)^(nt) + PMT × [(1 + r/n)^(nt) - 1] / (r/n)</p>
      <p>Where <strong>A</strong> is the final amount, <strong>P</strong> is the initial principal, <strong>r</strong> is the annual interest rate, <strong>n</strong> is the number of times interest is compounded per year, <strong>t</strong> is the time in years, and <strong>PMT</strong> is the regular monthly contribution.</p>
    </>
  ),
  'retirement-savings': (
    <>
      <p><strong>Formula:</strong> Target Nest Egg = Annual Expenses / Withdrawal Rate (e.g., 4% Rule).</p>
      <p>The calculator projects your current savings and monthly contributions over time using the compound interest formula, and compares the final sum against your retirement nest egg goal required to safely withdraw your desired annual income.</p>
    </>
  ),
  'salary-calculator': (
    <>
      <p><strong>Formula:</strong> Annual Salary = Hourly Wage × Hours per Week × 52 Weeks</p>
      <p>The calculator performs straightforward linear conversions assuming 52 working weeks a year. For example, monthly salary is the annual salary divided by 12, and daily wage is based on the selected hours per week divided by the regular working days.</p>
    </>
  ),
  'crypto-roi': (
    <>
      <p><strong>Formula:</strong> ROI = [(Final Value - Initial Investment) / Initial Investment] × 100</p>
      <p>The total profit is calculated by subtracting the initial purchase amount from the current market value (Number of Coins × Current Price). The ROI is then expressed as a percentage of your original investment.</p>
    </>
  ),
  'currency-converter': (
    <>
      <p><strong>Formula:</strong> Target Amount = Source Amount × (Exchange Rate)</p>
      <p>The calculator multiplies the amount of base currency by the live mid-market exchange rate of the target currency to determine its equivalent value.</p>
    </>
  ),
  'mortgage': (
    <>
      <p><strong>Formula:</strong> M = P [ i(1 + i)^n ] / [ (1 + i)^n - 1 ]</p>
      <p>Where <strong>M</strong> is your total monthly mortgage payment, <strong>P</strong> is the principal loan amount, <strong>i</strong> is your monthly interest rate, and <strong>n</strong> is the number of months. Monthly property taxes and insurance are added to this base to calculate the total payment.</p>
    </>
  ),
  'bmi': (
    <>
      <p><strong>Formula:</strong> BMI = Weight (kg) / [Height (m)]²</p>
      <p>Body Mass Index (BMI) evaluates your body weight relative to your height. For the Imperial system, the formula is: BMI = 703 × Weight (lbs) / [Height (in)]².</p>
    </>
  ),
  'bmr-tdee': (
    <>
      <p><strong>Formula (Mifflin-St Jeor):</strong> Men = (10 × weight) + (6.25 × height) - (5 × age) + 5. Women = (10 × weight) + (6.25 × height) - (5 × age) - 161.</p>
      <p>Your BMR (Basal Metabolic Rate) is then multiplied by an Activity Multiplier (1.2 to 1.9) to estimate your TDEE (Total Daily Energy Expenditure), which is the number of calories you burn per day.</p>
    </>
  ),
  'water-intake': (
    <>
      <p><strong>Formula:</strong> Base Intake (oz) = Weight (lbs) × 0.5</p>
      <p>To calculate water needs, the standard recommendation is to drink half an ounce to an ounce of water for each pound you weigh. Additional water is added for exercise (approx. 12 oz per 30 minutes of activity).</p>
    </>
  ),
  'heart-rate-zones': (
    <>
      <p><strong>Formula:</strong> Max Heart Rate = 220 - Age</p>
      <p>Heart rate zones are percentages of your Maximum Heart Rate. For example, the fat-burning zone is typically 60-70% of your max heart rate, while the aerobic zone is 70-80%.</p>
    </>
  ),
  'body-fat-calculator': (
    <>
      <p><strong>Formula (Navy Method):</strong> Men: 86.010 × log10(abdomen - neck) - 70.041 × log10(height) + 36.76. Women: 163.205 × log10(waist + hip - neck) - 97.684 × log10(height) - 78.387.</p>
      <p>This method uses circumference measurements to estimate your body fat percentage based on U.S. Navy standards.</p>
    </>
  ),
  'peptide-calculator': (
    <>
      <p><strong>Formula:</strong> Dose Volume (units) = (Desired Dose (mcg) / Total Peptide (mcg)) × Total Volume (units)</p>
      <p>It calculates exactly how many units to pull into a U-100 syringe (where 1ml = 100 units) so that the concentration of the reconstituted peptide matches your prescribed microgram dose.</p>
    </>
  ),
  'protein-calculator': (
    <>
      <p><strong>Formula:</strong> Protein (g) = Weight (kg) × Daily Protein Ratio</p>
      <p>The daily protein ratio scales based on your goals: ~0.8g/kg for sedentary individuals, 1.2-1.6g/kg for active individuals, and up to 2.2g/kg for heavy strength training and muscle building.</p>
    </>
  ),
  'macro-calculator': (
    <>
      <p><strong>Formula:</strong> Calories = Protein (g)×4 + Carbs (g)×4 + Fat (g)×9</p>
      <p>The calculator first finds your daily calorie target based on your BMR and goals. It then distributes these calories using percentage splits (e.g., 30% Protein, 40% Carbs, 30% Fat) and divides by the respective caloric density of each macronutrient.</p>
    </>
  ),
  'scientific-calculator': (
    <>
      <p><strong>Formula:</strong> Standard Mathematical Evaluation</p>
      <p>Evaluates complex algebraic expressions using standard order of operations (PEMDAS/BODMAS) and includes trigonometric and logarithmic computations.</p>
    </>
  ),
  'unit-converter': (
    <>
      <p><strong>Formula:</strong> Target = Source × Conversion Factor</p>
      <p>Uses fixed ratio multipliers to instantly convert values between metric, imperial, and other standardized measurement scales across length, weight, area, volume, and temperature.</p>
    </>
  ),
  'date-time': (
    <>
      <p><strong>Formula:</strong> Final Date = Start Date + Duration (Months/Days/Years)</p>
      <p>Utilizes calendar arithmetic to precisely determine the offset between dates, accounting for leap years and months with differing numbers of days.</p>
    </>
  ),
  'statistics-calculator': (
    <>
      <p><strong>Formulas:</strong> Mean = (Σx)/n, Variance = Σ(x - Mean)² / n</p>
      <p>Standard deviation is the square root of the variance. The median is the middle value of the sorted dataset, and the mode is the most frequently occurring value.</p>
    </>
  ),
  'probability-calculator': (
    <>
      <p><strong>Formula:</strong> P(A ∩ B) = P(A) × P(B|A)</p>
      <p>Calculates the likelihood of single, joint, and conditional events using standard probability theory, applying combinatorics (nCr / nPr) for complex groupings.</p>
    </>
  ),
  'fraction-calculator': (
    <>
      <p><strong>Formula:</strong> (a/b) ± (c/d) = (ad ± bc) / bd</p>
      <p>Calculates additions, subtractions, multiplications, and divisions of fractions by finding common denominators and simplifying the result using the Greatest Common Divisor (GCD) algorithm.</p>
    </>
  ),
  'fuel-cost': (
    <>
      <p><strong>Formula:</strong> Fuel Cost = (Distance / Fuel Economy) × Price per Gallon/Liter</p>
      <p>Determines how much fuel is required to travel a specific distance and multiplies it by the local fuel cost to estimate total expenditure for a trip.</p>
    </>
  ),
  'rent-vs-buy': (
    <>
      <p><strong>Formula:</strong> Cost of Homeownership vs. Cost of Renting Over Time</p>
      <p>Compares the total sunk costs of renting (monthly rent + inflation) against homeownership (mortgage interest + property tax + maintenance - home appreciation) to find the breakeven year.</p>
    </>
  ),
  'gpa-calculator': (
    <>
      <p><strong>Formula:</strong> GPA = Σ (Grade Points × Credits) / Σ Credits</p>
      <p>Each letter grade is assigned a point value (e.g., A = 4.0, B = 3.0). The GPA is the weighted average, multiplying the grade points by the course credit hours.</p>
    </>
  ),
  'password-generator': (
    <>
      <p><strong>Formula:</strong> Cryptographically Secure Pseudo-Random Generation</p>
      <p>Randomly selects characters from designated pools (uppercase, lowercase, numbers, symbols) based on user parameters, mapping the entropy to a secure output string.</p>
    </>
  ),
  'recipe-scaler': (
    <>
      <p><strong>Formula:</strong> Target Amount = Original Amount × (Target Servings / Original Servings)</p>
      <p>Finds the conversion ratio by dividing your desired serving size by the original recipe's serving size, and multiplies that ratio across each ingredient quantity.</p>
    </>
  ),
  'tip-calculator': (
    <>
      <p><strong>Formula:</strong> Tip = Bill Amount × (Tip Percentage / 100)</p>
      <p>Adds the computed tip to the original bill to find the comprehensive total, then divides that grand total evenly by the number of people splitting the bill.</p>
    </>
  ),
  'love-calculator': (
    <>
      <p><strong>Formula:</strong> String Hashing and Character Summation</p>
      <p>Converts the characters inside both names into ASCII values, sums the digits, and uses a modulo algorithm to produce an entertaining but pseudo-random percentage between 0 and 100.</p>
    </>
  ),
  'sleep-cycle': (
    <>
      <p><strong>Formula:</strong> Wake Time = Bedtime + (N × 90 minutes) + 15 minutes</p>
      <p>A standard human sleep cycle lasts approximately 90 minutes. The calculator counts forwards or backwards in 90-minute increments while allowing an average of 15 minutes to fall asleep.</p>
    </>
  ),
  'carbon-footprint': (
    <>
      <p><strong>Formula:</strong> Total Emissions = Σ (Activity × Emission Factor)</p>
      <p>Calculates your carbon footprint by multiplying individual activities (like miles driven or electricity consumed) by standard EPA greenhouse gas emission conversion equivalents.</p>
    </>
  ),
  'reading-time': (
    <>
      <p><strong>Formula:</strong> Time = Total Word Count / Words Per Minute (WPM)</p>
      <p>Uses an average reading speed (typically 200 - 250 WPM) to calculate approximately how many minutes it will take an average adult to read a specific body of text.</p>
    </>
  ),
  'ai-image-generator': (
    <>
      <p><strong>Formula:</strong> Neural network-based latent diffusion</p>
      <p>Takes text inputs and transforms them into numerical tokens, feeding them into a diffusion model that iteratively removes noise from a canvas to construct a novel image.</p>
    </>
  ),
  'paint-calculator': (
    <>
      <p><strong>Formula:</strong> Total Gallons = (Total Wall Area - Area of Doors/Windows) / Coverage per Gallon</p>
      <p>Calculates total square footage of the room's walls, subtracts the square footage of unpainted areas like doors and windows, and divides by the typical spread rate of paint (usually 350-400 sq ft per gallon).</p>
    </>
  ),
  'flooring-calculator': (
    <>
      <p><strong>Formula:</strong> Total Materials Required = (Length × Width) × (1 + Waste Percentage)</p>
      <p>Calculates the core area of the room and adds a small percentage buffer (typically 5-10%) to account for cutting, corners, layouts, and errors during installation.</p>
    </>
  ),
  'concrete-calculator': (
    <>
      <p><strong>Formula:</strong> Volume = Length × Width × Depth</p>
      <p>Measures the 3-dimensional volume of the pour in cubic feet or meters, then converts the result into cubic yards (or cubic meters) and estimates the number of pre-mixed bags needed.</p>
    </>
  ),
  'hvac-btu-calculator': (
    <>
      <p><strong>Formula:</strong> Base BTU = Square Footage × 20 (plus modifiers)</p>
      <p>Estimates air conditioning or heating requirements by applying a base 20 BTUs per square foot, and then adds adjustments based on room insulation, ceiling height, and sun exposure.</p>
    </>
  ),
  'tile-calculator': (
    <>
      <p><strong>Formula:</strong> Number of Tiles = Total Area / Area of Single Tile</p>
      <p>Calculates the square footage of the space and divides it by the square footage of the chosen tile size, adding a standard 10% allowance for cuts, breakage, and waste.</p>
    </>
  ),
  'wallpaper-calculator': (
    <>
      <p><strong>Formula:</strong> Number of Rolls = Total Wall Area / Usable Area per Roll</p>
      <p>Calculates the total perimeter and height of the room, subtracts windows and doors, and divides by the coverage area of a single roll (minus an estimated loss for pattern matching and repeats).</p>
    </>
  )
};
