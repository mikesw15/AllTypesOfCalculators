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
      <div className="space-y-4">
        <section>
          <h3 className="text-xl font-bold mb-2">What is Compound Interest?</h3>
          <p>Compound interest is the interest on a loan or deposit calculated based on both the initial principal and the accumulated interest from previous periods. Unlike simple interest, which is only calculated on the principal amount, compounding allows your wealth to grow exponentially over time.</p>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-2">How to Calculate Compound Interest</h3>
          <p>To calculate compound interest, you need to know your initial principal, the annual interest rate, the frequency of compounding, and the total time period. Follow these steps:</p>
          <ol className="list-decimal ml-6 space-y-1">
            <li>Identify the initial principal (P).</li>
            <li>Determine the annual interest rate (r) as a decimal (e.g., 5% = 0.05).</li>
            <li>Decide on the compounding frequency (n) per year (e.g., 12 for monthly).</li>
            <li>Calculate the total number of years (t).</li>
            <li>Apply the compound interest formula.</li>
          </ol>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-2">The Compound Interest Formula</h3>
          <div className="bg-white p-4 rounded-xl border border-gray-200 font-mono text-sm mb-2">
            A = P(1 + r/n)^(nt)
          </div>
          <ul className="list-disc ml-6 space-y-1 text-sm text-gray-600">
            <li><strong>A</strong> = Final Amount</li>
            <li><strong>P</strong> = Initial Principal</li>
            <li><strong>r</strong> = Annual Interest Rate (decimal)</li>
            <li><strong>n</strong> = Compounding periods per year</li>
            <li><strong>t</strong> = Time in years</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-2">Simple vs. Compound Interest</h3>
          <p>The main difference between simple and compound interest lies in how interest is generated. <strong>Simple interest</strong> is calculated only on the principal amount of a loan or deposit. In contrast, <strong>compound interest</strong> is calculated on the principal amount <em>and</em> the accumulated interest from previous periods.</p>
          <p className="mt-2 text-gray-600">Essentially, compound interest is "interest on interest," which allows your savings or debt to grow at a much faster rate over time than simple interest would.</p>
        </section>
      </div>
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
      <div className="space-y-4">
        <section>
          <h3 className="text-xl font-bold mb-2">Gross Pay vs. Net Pay</h3>
          <p>Understanding the difference between your gross and net pay is critical for budgeting:</p>
          <ul className="list-disc ml-6 space-y-1">
            <li><strong>Gross Pay:</strong> This is the total amount of money you earn before any deductions (taxes, insurance, pension contributions) are taken out. This is usually the "headline" figure on your job offer or contract.</li>
            <li><strong>Net Pay:</strong> Often called "Take-Home Pay," this is the actual amount that lands in your bank account after all mandatory and voluntary deductions have been subtracted from your gross pay.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-2">How Salary is Calculated</h3>
          <p><strong>Formula:</strong> Annual Salary = Hourly Wage × Hours per Week × 52 Weeks</p>
          <p>The calculator performs straightforward linear conversions assuming 52 working weeks a year. For example, monthly salary is the annual salary divided by 12, and daily wage is based on the selected hours per week divided by the regular working days.</p>
        </section>
      </div>
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
      <div className="space-y-4">
        <section>
          <h3 className="text-xl font-bold mb-2">What is a Mortgage?</h3>
          <p>A mortgage is a long-term loan used to purchase or maintain real estate, where the property itself serves as collateral. The borrower agrees to pay the lender (usually a bank) back over a period of years, typically 15 to 30, with interest.</p>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-2">How to Calculate Mortgage Payments</h3>
          <p>Calculating your monthly mortgage payment involves four main components (PITI): Principal, Interest, Taxes, and Insurance.</p>
          <ol className="list-decimal ml-6 space-y-1">
            <li>Determine the home price and your down payment.</li>
            <li>Subtract the down payment from the home price to find the <strong>Principal (P)</strong>.</li>
            <li>Find the monthly interest rate (annual rate divided by 12).</li>
            <li>Calculate the total number of payments (loan term in years × 12).</li>
            <li>Apply the amortization formula.</li>
          </ol>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-2">The Mortgage Formula</h3>
          <div className="bg-white p-4 rounded-xl border border-gray-200 font-mono text-sm mb-2">
            M = P [ i(1 + i)^n ] / [ (1 + i)^n - 1 ]
          </div>
          <ul className="list-disc ml-6 space-y-1 text-sm text-gray-600">
            <li><strong>M</strong> = Total monthly payment</li>
            <li><strong>P</strong> = Principal loan amount</li>
            <li><strong>i</strong> = Monthly interest rate</li>
            <li><strong>n</strong> = Number of monthly payments</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-2">Difference Between Fixed and Variable Rates</h3>
          <p>A fixed-rate mortgage has an interest rate that stays the same for the entire life of the loan. A variable or adjustable-rate mortgage (ARM) has an interest rate that can change periodically based on market trends, which may increase or decrease your monthly payment.</p>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-2">Interest Rate vs. APR (Annual Percentage Rate)</h3>
          <p>When shopping for a mortgage, you will see two different rates. It is vital to know the difference:</p>
          <ul className="list-disc ml-6 space-y-1">
            <li><strong>Interest Rate:</strong> The cost you will pay each year to borrow the money, expressed as a percentage. It does not include fees.</li>
            <li><strong>APR:</strong> A broader measure of the cost of your mortgage. The APR includes the interest rate plus other costs such as broker fees, discount points, and some closing costs. Because it includes these extra fees, the APR is usually higher than the interest rate.</li>
          </ul>
        </section>
      </div>
    </>
  ),
  'bmi': (
    <>
      <div className="space-y-4">
        <section>
          <h3 className="text-xl font-bold mb-2">What is Body Mass Index (BMI)?</h3>
          <p>BMI is a numerical value derived from your mass (weight) and height. It is used as a screening tool to identify whether an adult is in a healthy weight category. While it doesn't measure body fat directly, it correlates with more direct measures of body fat.</p>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-2">How to Calculate Your BMI</h3>
          <p>Calculating your BMI is a simple process using either metric or imperial measurements:</p>
          <ol className="list-decimal ml-6 space-y-1">
            <li><strong>Metric:</strong> Divide your weight in kilograms by your height in meters squared (kg/m²).</li>
            <li><strong>Imperial:</strong> Multiply your weight in pounds by 703, then divide by your height in inches squared.</li>
          </ol>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-2">BMI Formula</h3>
          <div className="bg-white p-4 rounded-xl border border-gray-200 font-mono text-sm mb-2">
            BMI = weight (kg) / [height (m)]²
          </div>
          <p className="text-sm text-gray-600 italic">For imperial: BMI = 703 × weight (lbs) / [height (in)]²</p>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-2">Understanding Your Results</h3>
          <ul className="list-disc ml-6 space-y-1 mb-4">
            <li><strong>&lt; 18.4:</strong> Underweight</li>
            <li><strong>18.5 - 24.9:</strong> Healthy Weight</li>
            <li><strong>25.0 - 29.9:</strong> Overweight</li>
            <li><strong>30.0+:</strong> Obese</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-2">BMI vs. Body Fat Percentage</h3>
          <p>It is important to remember that BMI and Body Fat Percentage are different metrics:</p>
          <ul className="list-disc ml-6 space-y-1">
            <li><strong>BMI:</strong> A rough estimate of body fatness based strictly on height and weight. It does not distinguish between muscle, bone density, and body fat.</li>
            <li><strong>Body Fat Percentage:</strong> A more direct measure of what percentage of your total weight is fat. This is often a more accurate indicator of fitness for athletes or people with significant muscle mass, as muscle is denser than fat and can lead to a "high BMI" even in very fit individuals.</li>
          </ul>
        </section>
      </div>
    </>
  ),
  'bmr-tdee': (
    <>
      <div className="space-y-4">
        <section>
          <h3 className="text-xl font-bold mb-2">BMR vs. TDEE: What is the difference?</h3>
          <p>Understanding these two numbers is the secret to weight management:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>BMR (Basal Metabolic Rate):</strong> The number of calories your body needs to function at rest (breathing, circulating blood, cell production). It's what you would burn if you stayed in bed all day.</li>
            <li><strong>TDEE (Total Daily Energy Expenditure):</strong> The total number of calories you burn in a 24-hour period including all physical activity, exercise, and the energy used to digest food.</li>
          </ul>
          <p className="mt-2 text-gray-600 italic">Example: If you want to lose weight, you should eat fewer calories than your TDEE, but usually more than your BMR to ensure your body functions correctly.</p>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-2">The Calculation Method</h3>
          <p><strong>Formula (Mifflin-St Jeor):</strong> Men = (10 × weight) + (6.25 × height) - (5 × age) + 5. Women = (10 × weight) + (6.25 × height) - (5 × age) - 161.</p>
          <p>Your BMR is then multiplied by an Activity Multiplier (1.2 to 1.9) to estimate your TDEE.</p>
        </section>
      </div>
    </>
  ),
  'water-intake': (
    <>
      <div className="space-y-4">
        <section>
          <h3 className="text-xl font-bold mb-2">How Much Water Should You Drink Daily?</h3>
          <p>The amount of water a person needs can vary based on several factors including age, sex, weight, health, and activity level. A common rule of thumb is to drink eight 8-ounce glasses of water a day, commonly known as the "8×8" rule. However, more precise needs can be calculated based on body weight.</p>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-2">How to Calculate Water Intake</h3>
          <p>To find your personalized daily water goal, follow these steps:</p>
          <ol className="list-decimal ml-6 space-y-1">
            <li>Take your weight in pounds and multiply it by 0.5 (50%).</li>
            <li>This gives you the base number of ounces you should drink daily.</li>
            <li>Adjust for activity: Add 12 ounces of water for every 30 minutes of exercise.</li>
          </ol>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-2">Water Intake Formula</h3>
          <div className="bg-white p-4 rounded-xl border border-gray-200 font-mono text-sm mb-2">
            Base Intake (oz) = Weight (lbs) × 0.5
          </div>
          <p className="text-sm text-gray-600 italic">Example: A 180lb person needs 90oz + activity adjustments.</p>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-2">Why Hydration Matters</h3>
          <p>Staying hydrated is essential for regulating body temperature, keeping joints lubricated, preventing infections, delivering nutrients to cells, and keeping organs functioning properly. Proper hydration also improves sleep quality, cognition, and mood.</p>
        </section>
      </div>
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
  'roi-calculator': (
    <>
      <div className="space-y-4">
        <section>
          <h3 className="text-xl font-bold mb-2">What is ROI (Return on Investment)?</h3>
          <p>Return on Investment (ROI) is a performance measure used to evaluate the efficiency or profitability of an investment or compare the efficiency of several different investments. ROI tries to directly measure the amount of return on a particular investment, relative to the investment's cost.</p>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-2">How to Calculate ROI</h3>
          <p>To calculate ROI, the benefit (or return) of an investment is divided by the cost of the investment. The result is expressed as a percentage or a ratio.</p>
          <ol className="list-decimal ml-6 space-y-1">
            <li>Subtract the initial cost of the investment from its final value to find the <strong>Net Profit</strong>.</li>
            <li>Divide the Net Profit by the <strong>Cost of Investment</strong>.</li>
            <li>Multiply by 100 to get the percentage.</li>
          </ol>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-2">ROI Formula</h3>
          <div className="bg-white p-4 rounded-xl border border-gray-200 font-mono text-sm mb-2">
            ROI = [(Final Value - Initial Cost) / Initial Cost] × 100
          </div>
        </section>
      </div>
    </>
  ),
  'percentage-calculator': (
    <>
      <div className="space-y-4">
        <section>
          <h3 className="text-xl font-bold mb-2">Understanding Percentages</h3>
          <p>A percentage is a number or ratio expressed as a fraction of 100. It is often denoted using the percent sign, "%". Percentages are used to express how large or small one quantity is relative to another quantity.</p>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-2">How to Calculate a Percentage</h3>
          <p>There are several common ways to calculate with percentages:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>Find X percent of Y:</strong> Multiply Y by (X/100).</li>
            <li><strong>Find what percent X is of Y:</strong> Divide X by Y and multiply by 100.</li>
            <li><strong>Percentage Increase:</strong> [(New Value - Old Value) / Old Value] × 100.</li>
            <li><strong>Percentage Decrease:</strong> [(Old Value - New Value) / Old Value] × 100.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-2">Formula for Percentage Change</h3>
          <div className="bg-white p-4 rounded-xl border border-gray-200 font-mono text-sm mb-2">
            % Change = [(New Value - Old Value) / |Old Value|] × 100
          </div>
        </section>
      </div>
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

export const calculatorComparisons: Record<string, { title: string; points: { title: string; content: string }[] }> = {
  'mortgage': {
    title: 'Interest Rate vs. APR',
    points: [
      {
        title: 'Interest Rate',
        content: 'The interest rate is the yearly cost you will pay to borrow money from a lender. It is a percentage of the total loan amount. It does NOT include any other fees, closing costs, or administrative expenses associated with the mortgage.'
      },
      {
        title: 'APR (Annual Percentage Rate)',
        content: 'APR is a broader measure of the cost to you of borrowing money. The APR includes the interest rate plus other costs such as broker fees, points, and some closing costs. It represents the true annual cost of the loan and is almost always higher than the simple interest rate.'
      }
    ]
  },
  'bmi': {
    title: 'BMI vs. Body Fat Percentage',
    points: [
      {
        title: 'Body Mass Index (BMI)',
        content: 'BMI is a simple screening tool based strictly on your height and weight. It provides a rough estimate of whether your weight is healthy for your height. However, it cannot distinguish between muscle, bone, and fat. An athlete might have a "high BMI" but very low body fat.'
      },
      {
        title: 'Body Fat Percentage',
        content: 'Body fat percentage measures the actual proportion of fat vs. lean mass (muscle, bone, water) in your body. It is a much more accurate indicator of fitness and health risks, but it is harder to measure accurately without specialized equipment like DEXA scans or calipers.'
      }
    ]
  },
  'salary-calculator': {
    title: 'Gross Pay vs. Net Pay',
    points: [
      {
        title: 'Gross Salary',
        content: 'Gross pay is the total amount of money you earn before any taxes or deductions are taken out. If your contract says you earn £50k per year, that is your gross salary. It includes all bonuses and commissions before the government takes their share.'
      },
      {
        title: 'Net Pay (Take-Home)',
        content: 'Net pay is the actual amount of money that is deposited into your bank account on payday. It is your gross pay minus income tax, national insurance, pension contributions, and any other voluntary deductions like health insurance or student loan repayments.'
      }
    ]
  },
  'compound-interest': {
    title: 'Simple vs. Compound Interest',
    points: [
      {
        title: 'Simple Interest',
        content: "Simple interest is calculated only on the principal amount (the money you originally invested or borrowed). The amount of interest stays the same every year because you never earn interest on the interest you have already made."
      },
      {
        title: 'Compound Interest',
        content: 'Compound interest is "interest on interest." It is calculated on the initial principal AND the accumulated interest from previous periods. This creates a snowball effect, allowing your money to grow much faster—especially over long periods.'
      }
    ]
  }
};
