import React from 'react';

export const bmiLongContent = (
  <div className="space-y-8">
    <section>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">The Complete Guide to Body Mass Index (BMI)</h2>
      <p className="text-lg leading-relaxed">
        Body Mass Index, or BMI, is a widely used screening tool that helps evaluate whether a person has a healthy body weight for their height. While it's not a direct measurement of body fat percentage, it is a highly reliable indicator of health risks associated with being underweight, overweight, or obese. In this guide, we'll dive deep into how BMI is calculated, what the different ranges mean, and the limitations of this metric.
      </p>
    </section>

    <section>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How is BMI Calculated?</h3>
      <p className="mb-4">
        The BMI formula is mathematically simple but incredibly consistent across populations. It is calculated by dividing your weight (in kilograms) by the square of your height (in meters).
      </p>
      <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 mb-4">
        <p className="font-mono text-center text-xl">BMI = weight (kg) / [height (m)]²</p>
      </div>
      <p>
        For those using the imperial system, the formula is: <strong>BMI = [weight (lb) / height (in)²] × 703</strong>.
      </p>
    </section>

    <section>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Understanding the BMI Categories</h3>
      <p className="mb-6">
        The World Health Organization (WHO) and the Centers for Disease Control and Prevention (CDC) use the following standard weight status categories for adults:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100">
          <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-2">Underweight (Below 18.5)</h4>
          <p className="text-sm">Being underweight can indicate malnutrition, an underlying health condition, or a metabolism that burns calories very quickly. Risks include a weakened immune system and bone density loss.</p>
        </div>
        <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-100">
          <h4 className="font-bold text-green-900 dark:text-green-100 mb-2">Healthy Weight (18.5 – 24.9)</h4>
          <p className="text-sm">This range is associated with the lowest risk of chronic diseases such as Type 2 diabetes, cardiovascular disease, and certain types of cancer.</p>
        </div>
        <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl border border-yellow-100">
          <h4 className="font-bold text-yellow-900 dark:text-yellow-100 mb-2">Overweight (25.0 – 29.9)</h4>
          <p className="text-sm">Being in this category increases the risk of heart disease and high blood pressure. Many individuals in this range can benefit from lifestyle adjustments to move back toward a healthy weight.</p>
        </div>
        <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-100">
          <h4 className="font-bold text-red-900 dark:text-red-100 mb-2">Obese (30.0 or Higher)</h4>
          <p className="text-sm">Obesity is linked to significantly higher health risks, including sleep apnea, stroke, gallbladder disease, and osteoarthritis. It is often managed through a combination of diet, exercise, and medical consultation.</p>
        </div>
      </div>
    </section>

    <section>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Why Use BMI?</h3>
      <p className="mb-4">
        BMI is favored by health professionals because it is:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Inexpensive:</strong> It requires only a scale and a stadiometer (or measuring tape).</li>
        <li><strong>Non-invasive:</strong> There is no blood work or specialized imaging required.</li>
        <li><strong>Standardized:</strong> It allows researchers to track population-level health trends over decades.</li>
      </ul>
    </section>

    <section className="bg-gray-100 dark:bg-gray-800 p-8 rounded-3xl">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Important Limitations</h3>
      <p className="mb-4">
        It is vital to remember that BMI is an <strong>indirect</strong> measure of body fat. It does not distinguish between muscle mass and fat mass. This means:
      </p>
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0" />
          <p><strong>Athletes:</strong> Highly muscular individuals (like bodybuilders) may have a high BMI but very little body fat.</p>
        </div>
        <div className="flex gap-4">
          <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0" />
          <p><strong>The Elderly:</strong> Older adults may have low muscle mass and high body fat even if their BMI is in the healthy range.</p>
        </div>
        <div className="flex gap-4">
          <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0" />
          <p><strong>Bone Density:</strong> Differences in bone density can affect weight without affecting health markers.</p>
        </div>
      </div>
    </section>

    <section>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How to Improve Your BMI</h3>
      <p className="mb-4">
        If your BMI falls outside the healthy range, focus on <strong>sustainable lifestyle changes</strong> rather than crash diets.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="text-3xl mb-2">🍎</div>
          <p className="font-bold mb-1">Nutrition</p>
          <p className="text-sm text-gray-600">Prioritize whole foods, lean proteins, and plenty of vegetables.</p>
        </div>
        <div className="text-center">
          <div className="text-3xl mb-2">🏃‍♂️</div>
          <p className="font-bold mb-1">Activity</p>
          <p className="text-sm text-gray-600">Aim for at least 150 minutes of moderate intensity exercise per week.</p>
        </div>
        <div className="text-center">
          <div className="text-3xl mb-2">😴</div>
          <p className="font-bold mb-1">Rest</p>
          <p className="text-sm text-gray-600">Quality sleep is essential for hormonal balance and weight management.</p>
        </div>
      </div>
    </section>
  </div>
);

export const bmiFaqs = [
  {
    question: "Is BMI accurate for everyone?",
    answer: "No, BMI can be misleading for athletes with high muscle mass, the elderly with low muscle mass, and pregnant women. It is a general screening tool, not a diagnostic one."
  },
  {
    question: "What is a healthy BMI for my age?",
    answer: "The same BMI scale applies to all adults over the age of 20. However, for children and teens, BMI is interpreted using age-and-sex-specific percentiles (BMI-for-age)."
  },
  {
    question: "Why is BMI used if it has limitations?",
    answer: "BMI is used because it correlates strongly with more direct measures of body fat (like underwater weighing) and predicts disease outcomes accurately across large groups of people."
  },
  {
    question: "How can I lower my BMI safely?",
    answer: "Focus on a moderate calorie deficit through balanced nutrition, regular physical activity, and staying hydrated. Consult a doctor before making major changes."
  },
  {
    question: "Should I worry about a high BMI?",
    answer: "A high BMI is a signal to check other health markers like waist circumference, blood pressure, and cholesterol levels. It's a starting point for a conversation with your doctor."
  }
];

export const compoundInterestLongContent = (
  <div className="space-y-8">
    <section>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">The Power of Compound Interest: Wealth Creation Explained</h2>
      <p className="text-lg leading-relaxed">
        Compound interest has often been called the "eighth wonder of the world." Unlike simple interest, which is calculated only on the principal amount, compound interest is calculated on the principal <strong>plus</strong> the interest that has accumulated in previous periods. This creates a "snowball effect" that can turn modest savings into significant wealth over long periods.
      </p>
    </section>

    <section>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Simple vs. Compound Interest</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100">
          <h4 className="font-bold mb-2">Simple Interest</h4>
          <p className="text-sm mb-4">Interest is earned only on the initial $1,000.</p>
          <ul className="text-sm space-y-1">
            <li className="flex justify-between"><span>Year 1:</span> <strong>$1,050</strong></li>
            <li className="flex justify-between"><span>Year 10:</span> <strong>$1,500</strong></li>
            <li className="flex justify-between"><span>Year 30:</span> <strong>$2,500</strong></li>
          </ul>
        </div>
        <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100">
          <h4 className="font-bold mb-2 text-blue-900 dark:text-blue-100">Compound Interest (5%)</h4>
          <p className="text-sm mb-4">Interest is earned on the new balance every year.</p>
          <ul className="text-sm space-y-1">
            <li className="flex justify-between"><span>Year 1:</span> <strong>$1,050</strong></li>
            <li className="flex justify-between"><span>Year 10:</span> <strong>$1,628</strong></li>
            <li className="flex justify-between"><span>Year 30:</span> <strong>$4,321</strong></li>
          </ul>
        </div>
      </div>
      <p className="mt-4 text-gray-600 italic text-center">In just 30 years, compounding yields nearly double the result of simple interest on the same $1,000.</p>
    </section>

    <section>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The Variables that Matter</h3>
      <div className="space-y-4">
        <div>
          <h4 className="font-bold">1. Time (The Most Critical Factor)</h4>
          <p>Compound interest needs time to breathe. The longer you leave your money invested, the more aggressive the growth curve becomes. This is why starting early is more important than the amount you start with.</p>
        </div>
        <div>
          <h4 className="font-bold">2. Interest Rate</h4>
          <p>Even a 1% difference in annual return can result in hundreds of thousands of dollars in difference over a 30-year career.</p>
        </div>
        <div>
          <h4 className="font-bold">3. Frequency of Compounding</h4>
          <p>The more often interest is added (daily vs. monthly vs. annually), the faster the balance grows. Our calculator allows you to adjust this to see the subtle impact.</p>
        </div>
      </div>
    </section>

    <section className="bg-blue-600 text-white p-8 rounded-3xl shadow-xl shadow-blue-200 dark:shadow-none">
      <h3 className="text-2xl font-bold mb-4">The Rule of 72</h3>
      <p className="text-lg leading-relaxed">
        Want a quick way to estimate when your money will double? Divide 72 by your annual interest rate. For example, at a 10% interest rate, your money will double in approximately 7.2 years (72 / 10 = 7.2).
      </p>
    </section>
  </div>
);

export const compoundInterestFaqs = [
  {
    question: "How often should I compound interest?",
    answer: "In general, more frequent compounding (like daily or monthly) is better for your savings. However, in most savings accounts, interest is compounded monthly and credited at the end of the month."
  },
  {
    question: "What is the best interest rate for long-term growth?",
    answer: "Historically, the stock market (S&P 500) has returned an average of 7-10% annually over long periods. Savings accounts typically offer 1-5% depending on the economic climate."
  },
  {
    question: "Can I use this for my retirement planning?",
    answer: "Yes, this is an excellent tool for retirement planning. By entering your current age, target retirement age, and expected returns, you can see how much your nest egg might be worth."
  },
  {
    question: "Does compound interest work with debt?",
    answer: "Yes, but in reverse. Credit cards often compound interest daily, which is why debt can spiral out of control if only minimum payments are made."
  }
];

export const mortgageLongContent = (
  <div className="space-y-8">
    <section>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Mastering Your Mortgage: A Comprehensive Guide</h2>
      <p className="text-lg leading-relaxed">
        Buying a home is likely the largest financial decision you will ever make. Understanding the mechanics of your mortgage—from interest rates to amortization schedules—can save you tens of thousands of dollars over the life of the loan. This guide explains how to use our mortgage calculator and what to look for when shopping for a loan.
      </p>
    </section>

    <section>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Components of a Mortgage Payment</h3>
      <p className="mb-4">Most people think of their mortgage as one simple payment, but it's actually composed of four main elements (often referred to as PITI):</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
          <p className="font-bold text-blue-600">Principal</p>
          <p className="text-sm">The actual amount of money you borrowed to buy the home.</p>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
          <p className="font-bold text-blue-600">Interest</p>
          <p className="text-sm">The cost of borrowing that money, paid to the lender.</p>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
          <p className="font-bold text-blue-600">Taxes</p>
          <p className="text-sm">Property taxes assessed by your local government.</p>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
          <p className="font-bold text-blue-600">Insurance</p>
          <p className="text-sm">Homeowners insurance and, in some cases, private mortgage insurance (PMI).</p>
        </div>
      </div>
    </section>

    <section>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How Interest Rates Impact Your Payment</h3>
      <p className="mb-4">Small changes in interest rates have a massive impact over 30 years. Consider a $300,000 loan:</p>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-900">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Interest Rate</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Monthly P&I</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Interest Over 30Y</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            <tr>
              <td className="px-6 py-4">4%</td>
              <td className="px-6 py-4 font-bold">$1,432</td>
              <td className="px-6 py-4">$215,609</td>
            </tr>
            <tr>
              <td className="px-6 py-4">6%</td>
              <td className="px-6 py-4 font-bold">$1,799</td>
              <td className="px-6 py-4">$347,515</td>
            </tr>
            <tr>
              <td className="px-6 py-4">8%</td>
              <td className="px-6 py-4 font-bold">$2,201</td>
              <td className="px-6 py-4">$492,466</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm italic text-gray-600">Notice how moving from 4% to 8% more than doubles the total interest paid over the life of the loan.</p>
    </section>

    <section className="bg-amber-50 dark:bg-amber-900/20 p-8 rounded-3xl border border-amber-100 dark:border-amber-800">
      <h3 className="text-2xl font-bold text-amber-900 dark:text-amber-100 mb-4">What is Amortization?</h3>
      <p className="text-lg text-amber-800 dark:text-amber-200 leading-relaxed">
        Amortization is the process of paying off a debt over time through regular installments. In the early years of a mortgage, almost all of your monthly payment goes toward interest. By the final years, almost all of it goes toward the principal. You can see this visual breakdown in our <strong>Amortization Schedule</strong> below the main results.
      </p>
    </section>
  </div>
);

export const mortgageFaqs = [
  {
    question: "What is a good down payment?",
    answer: "Typically, 20% is considered the gold standard as it allows you to avoid Private Mortgage Insurance (PMI). However, many first-time buyer programs allow for as little as 3% or 3.5% down."
  },
  {
    question: "Should I choose a 15-year or 30-year mortgage?",
    answer: "A 15-year mortgage usually has a lower interest rate and results in significantly less total interest paid, but it requires much higher monthly payments. 30-year mortgages are more popular because they offer more monthly flexibility."
  },
  {
    question: "How much home can I actually afford?",
    answer: "A common rule of thumb is the 28/36 rule: your mortgage payment shouldn't exceed 28% of your gross monthly income, and your total debt payments shouldn't exceed 36%."
  },
  {
    question: "What is PMI (Private Mortgage Insurance)?",
    answer: "PMI is insurance that protects the lender if you stop making payments. It's usually required if your down payment is less than 20% of the home's value."
  }
];

export const salaryLongContent = (
  <div className="space-y-8">
    <section>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">The Ultimate Guide to Salary Conversion & Income Planning</h2>
      <p className="text-lg leading-relaxed">
        Understanding your income across different timeframes is essential for budgeting, job negotiations, and financial long-term planning. Whether you're transitioning from an hourly wage to a fixed annual salary or simply curious how much you actually earn per minute, our calculator breaks down your gross income into daily, weekly, monthly, and yearly figures.
      </p>
    </section>

    <section>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How Salary Conversions Work</h3>
      <p className="mb-4">Our calculations are based on standard professional assumptions, though these can be adjusted in the tool settings:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Standard Work Year:</strong> Calculated as 52 weeks (364 days). Some employers use 260 or 261 working days depending on how holidays and weekends fall.</li>
        <li><strong>Standard Work Week:</strong> Traditionally 40 hours. However, many modern roles move between 35 and 45 hours.</li>
        <li><strong>Non-Leap Year:</strong> 8,760 total hours exist in a standard year. A 40-hour work week uses only 2,080 of those hours (approx. 24% of your time).</li>
      </ul>
    </section>

    <section className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-3xl border border-blue-100 dark:border-blue-900/30">
      <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4">Gross vs. Net: The Reality of Take-Home Pay</h3>
      <p className="mb-4">It is critical to remember that this calculator displays <strong>Gross Income</strong>. This is your total pay before any deductions. Your actual "Net Pay" or "Take-Home Pay" will be significantly lower after the following are removed:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-4">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="font-bold mb-1">Income Tax</p>
          <p>Federal, State/Provincial, or Local percentage-based taxes.</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="font-bold mb-1">Social Security / National Insurance</p>
          <p>Mandatory contributions toward state pensions and unemployment.</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="font-bold mb-1">Health Insurance</p>
          <p>Premiums for company-sponsored medical, dental, or vision plans.</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="font-bold mb-1">Retirement Contributions</p>
          <p>Pre-tax savings like 401(k), IRA, or Workplace Pensions.</p>
        </div>
      </div>
    </section>

    <section>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Salary Negotiation Tips</h3>
      <p className="mb-4">When discussing a new role, don't just look at the annual headline figure. Use the calculator to understand the hourly reality:</p>
      <ul className="space-y-4">
        <li className="flex gap-3">
          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0">1</div>
          <p><strong>Know your minimum hourly rate:</strong> If a job requires a 50-hour week but pays only $60k, your hourly wage is actually lower than a 37.5-hour week role at $50k.</p>
        </li>
        <li className="flex gap-3">
          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0">2</div>
          <p><strong>Factor in commute time:</strong> An extra 5 hours of commuting per week is essentially unpaid work. Add this to your "weekly hours" in the tool to see your true hourly value.</p>
        </li>
      </ul>
    </section>
  </div>
);

export const salaryFaqs = [
  {
    question: "How many working days are in a year?",
    answer: "Typically, there are 260 to 262 working days in a year (52 weeks × 5 days). This can vary based on bank holidays and leap years."
  },
  {
    question: "How do I convert hourly to annual salary?",
    answer: "Multiply your hourly rate by the number of hours worked per week, then multiply by 52 weeks. For example, $25/hr × 40hrs × 52 weeks = $52,000 per year."
  },
  {
    question: "Does this include overtime?",
    answer: "The base calculator assumes standard contract hours. If you regularly work overtime, you should increase your 'Hours per week' setting to see an accurate reflection of your actual hourly income."
  },
  {
    question: "How is 'Bi-Weekly' different from 'Semi-Monthly'?",
    answer: "Bi-weekly means you receive 26 paychecks per year (every 2 weeks). Semi-monthly means you receive 24 paychecks per year (twice a month, usually on the 1st and 15th)."
  }
];

export const stampDutyLongContent = (
  <div className="space-y-8">
    <section>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Stamp Duty Land Tax (SDLT) Explained (2024/25)</h2>
      <p className="text-lg leading-relaxed">
        Buying a property in the UK (England and Northern Ireland) involves a mandatory government tax known as Stamp Duty Land Tax. The amount you pay is not a flat fee; rather, it is a tiered system where you pay a percentage only on the portion of the property price that falls within each band.
      </p>
    </section>

    <section>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">First-Time Buyer Relief</h3>
      <p className="mb-4">Since November 2022, first-time buyers have enjoyed significant relief. If you have never owned a home anywhere in the world, you pay:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>0%</strong> on properties up to £425,000.</li>
        <li><strong>5%</strong> on the portion from £425,001 to £625,000.</li>
        <li>If the property exceeds £625,000, you are <strong>not eligible</strong> for first-time buyer relief and must pay standard rates.</li>
      </ul>
    </section>

    <section className="bg-orange-50 dark:bg-orange-900/10 p-8 rounded-3xl border border-orange-100 dark:border-orange-900/30">
      <h3 className="text-2xl font-bold text-orange-900 dark:text-orange-100 mb-4">Additional Property Surcharge</h3>
      <p className="mb-4">If you are purchasing an additional residential property (such as a buy-to-let investment or a second home) that is worth more than £40,000, you will usually have to pay an extra <strong>3%</strong> on top of the standard SDLT rates.</p>
    </section>

    <section>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">When is Stamp Duty Paid?</h3>
      <p className="mb-4">You have <strong>14 days</strong> from the "effective date" of your transaction (usually the date of completion) to:</p>
      <ol className="list-decimal pl-6 space-y-2">
        <li>File a Stamp Duty Land Tax return with HMRC.</li>
        <li>Pay any tax due.</li>
      </ol>
      <p className="mt-4 text-sm bg-gray-50 dark:bg-gray-800 p-4 rounded-xl"><em>Pro Tip:</em> Your solicitor or conveyancer will almost always handle this process for you and include the cost in your final completion statement.</p>
    </section>
  </div>
);

export const stampDutyFaqs = [
  {
    question: "Is stamp duty different in Scotland or Wales?",
    answer: "Yes. In Scotland, you pay Land and Buildings Transaction Tax (LBTT). In Wales, you pay Land Transaction Tax (LTT). Our UK calculator specifically calculates SDLT for England and Northern Ireland."
  },
  {
    question: "Do I pay stamp duty on the fixtures and fittings?",
    answer: "Generally, no. You only pay SDLT on the price of the land and buildings. If you are buying furniture or curtains (chattels) from the seller, you can often deduct their reasonable value from the total purchase price for tax purposes."
  },
  {
    question: "Can I add stamp duty to my mortgage?",
    answer: "Technically yes, if your lender allows it and it doesn't push you over their Loan-to-Value (LTV) limits. However, doing so means you will be paying interest on that tax for the next 25-30 years."
  }
];

export const carLoanLongContent = (
  <div className="space-y-8">
    <section>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">The Complete Guide to Financing Your Next Vehicle</h2>
      <p className="text-lg leading-relaxed">
        Taking out a car loan is a massive commitment that can last five years or longer. While many buyers focus solely on the "monthly payment," the true cost of a car is determined by the interest rate (APR), the loan term, and the depreciation of the vehicle. This guide helps you navigate the technical side of auto financing.
      </p>
    </section>

    <section>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The Impact of Loan Terms</h3>
      <p className="mb-4">Dealerships often push for longer terms (72 or 84 months) to make high car prices seem affordable with lower monthly payments. However, longer terms result in:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Higher Total Interest:</strong> You pay interest for more years.</li>
        <li><strong>Negative Equity:</strong> Vehicles depreciate quickly. With a long loan, you may find yourself "underwater"—owing more to the bank than the car is worth.</li>
      </ul>
    </section>

    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800">
        <h4 className="font-bold mb-2">The 20/4/10 Rule</h4>
        <p className="text-xs text-gray-600 dark:text-gray-400">Put 20% down, finance for no more than 4 years, and keep total car expenses under 10% of gross income.</p>
      </div>
      <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800">
        <h4 className="font-bold mb-2">APR vs. Interest Rate</h4>
        <p className="text-xs text-gray-600 dark:text-gray-400">APR includes both the interest rate AND the fees associated with the loan, providing the most accurate cost comparison.</p>
      </div>
      <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800">
        <h4 className="font-bold mb-2">Gap Insurance</h4>
        <p className="text-xs text-gray-600 dark:text-gray-400">If your car is totaled, standard insurance pays current value. Gap insurance covers the difference between that and what you still owe.</p>
      </div>
    </section>

    <section>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How to Get the Best Rate</h3>
      <p className="mb-4">Before stepping onto a dealership lot, follow these steps to save thousands:</p>
      <ul className="space-y-4">
        <li className="flex gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors rounded-xl">
          <span className="font-bold text-blue-600">01</span>
          <p><strong>Get Pre-Approved:</strong> Visit your local credit union or bank first. Having a pre-approval in hand gives you leverage when the dealership offers their financing.</p>
        </li>
        <li className="flex gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors rounded-xl">
          <span className="font-bold text-blue-600">02</span>
          <p><strong>Check Your Credit:</strong> The best rates go to those with scores above 740. If yours is lower, consider a co-signer or wait a few months to improve your score.</p>
        </li>
      </ul>
    </section>
  </div>
);

export const carLoanFaqs = [
  {
    question: "Can I pay off my car loan early?",
    answer: "Most auto loans allow for early repayment without penalty, especially if they are simple interest loans. However, some subprime loans may have 'prepayment penalties.' Always check your contract."
  },
  {
    question: "Is it better to lease or buy?",
    answer: "Leasing offers lower monthly payments and a new car every few years but usually costs more in the long run and limits your mileage. Buying builds equity and eventual ownership."
  },
  {
    question: "Does a trade-in affect my loan?",
    answer: "Yes! A trade-in acts exactly like a down payment. It reduces the amount you need to borrow, which in turn reduces your monthly payment and total interest cost."
  }
];

export const bmrTdeeLongContent = (
  <div className="space-y-8">
    <section>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Total Daily Energy Expenditure (TDEE) & Basal Metabolic Rate (BMR)</h2>
      <p className="text-lg leading-relaxed">
        Understanding how many calories your body burns every day is the fundamental bedrock of any successful weight management plan. Many people jump into diets without knowing their "maintenance calories"—the specific number of calories needed to keep their weight exactly where it is.
      </p>
    </section>

    <section>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Phase 1: Your BMR (The Engine at Idle)</h3>
      <p className="mb-4">
        Your <strong>Basal Metabolic Rate (BMR)</strong> is the number of calories your body burns if you were to stay in bed all day and do nothing but breathe. This covers vital functions like heart beats, brain activity, and cell repair.
      </p>
      <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
        <p className="font-bold mb-2">The Mifflin-St Jeor Equation:</p>
        <p className="text-sm font-mono mb-2 text-blue-600">Men: (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5</p>
        <p className="text-sm font-mono text-pink-600">Women: (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161</p>
      </div>
    </section>

    <section>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Phase 2: Your TDEE (The Engine in Motion)</h3>
      <p className="mb-4">
        Your <strong>TDEE</strong> is your BMR plus the "Activity Multiplier." Depending on your lifestyle, your BMR is multiplied by a factor to find your final daily burn:
      </p>
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
        <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-700 m-0">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Activity Level</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase text-center">Multiplier</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            <tr><td className="px-6 py-3 font-medium">Sedentary (Office job, little exercise)</td><td className="px-6 py-3 text-center">1.2</td></tr>
            <tr><td className="px-6 py-3 font-medium">Light Exercise (1-2 days/week)</td><td className="px-6 py-3 text-center">1.375</td></tr>
            <tr><td className="px-6 py-3 font-medium">Moderate Exercise (3-5 days/week)</td><td className="px-6 py-3 text-center">1.55</td></tr>
            <tr><td className="px-6 py-3 font-medium">Heavy Exercise (6-7 days/week)</td><td className="px-6 py-3 text-center">1.725</td></tr>
            <tr><td className="px-6 py-3 font-medium">Athlete (2x training/physical job)</td><td className="px-6 py-3 text-center">1.9</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <section className="bg-indigo-600 text-white p-8 rounded-3xl shadow-xl">
      <h3 className="text-2xl font-bold mb-4">The Deficit vs. Surplus Rule</h3>
      <p className="text-lg leading-relaxed">
        <strong>To Lose Weight:</strong> Subtract 250–500 calories from your TDEE. This creates a safe, sustainable loss of 0.5–1 lb per week.<br /><br />
        <strong>To Gain Muscle:</strong> Add 250–500 calories to your TDEE while performing regular resistance training.
      </p>
    </section>
  </div>
);

export const bmrTdeeFaqs = [
  {
    question: "Why does my metabolic rate slow down as I age?",
    answer: "As we age, we naturally tend to lose muscle mass (sarcopenia) and our hormonal profile changes. Since muscle tissue is more metabolically active than fat, having less of it lowers our BMR."
  },
  {
    question: "Do I have a 'Slow Metabolism'?",
    answer: "True metabolic disorders are rare. Most 'slow' metabolisms are actually caused by underestimating calorie intake or overestimating daily activity. Our TDEE calculator helps provide a more objective starting point."
  },
  {
    question: "Which formula is most accurate?",
    answer: "The Mifflin-St Jeor equation is generally considered the most accurate for the general population. For very muscular individuals, the Katch-McArdle formula (which uses body fat percentage) is often preferred."
  }
];

export const macroLongContent = (
  <div className="space-y-8">
    <section>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Macro Tracking: Beyond Just Counting Calories</h2>
      <p className="text-lg leading-relaxed">
        While calories determine your weight change, <strong>macronutrients</strong> determine your body composition. Are you losing fat or muscle? Are you feeling energized or lethargic? The balance of Protein, Carbohydrates, and Fats in your diet makes all the difference.
      </p>
    </section>

    <section>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The Three Pillars of Nutrition</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100">
          <h4 className="font-bold text-red-900 dark:text-red-100 mb-2">Protein (4 cal/g)</h4>
          <p className="text-sm">The building block of muscle. Essential for tissue repair and keeping you satiated (full) during a diet.</p>
        </div>
        <div className="p-6 bg-yellow-50 dark:bg-yellow-900/10 rounded-2xl border border-yellow-100">
          <h4 className="font-bold text-yellow-900 dark:text-yellow-100 mb-2">Carbohydrates (4 cal/g)</h4>
          <p className="text-sm">Your body's preferred energy source. Vital for high-intensity training and brain function.</p>
        </div>
        <div className="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100">
          <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-2">Fats (9 cal/g)</h4>
          <p className="text-sm">Crucial for hormone production and vitamin absorption. They contain the highest calorie density.</p>
        </div>
      </div>
    </section>

    <section>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Common Macro Splits</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-gray-800">
          <p className="font-bold">Balanced (The Zone)</p>
          <p className="text-sm font-mono font-bold text-blue-600">40% Carb / 30% Protein / 30% Fat</p>
        </div>
        <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-gray-800">
          <p className="font-bold">Low Carb / Keto</p>
          <p className="text-sm font-mono font-bold text-blue-600">5% Carb / 25% Protein / 70% Fat</p>
        </div>
        <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-gray-800">
          <p className="font-bold">High Carb (Athletic)</p>
          <p className="text-sm font-mono font-bold text-blue-600">60% Carb / 20% Protein / 20% Fat</p>
        </div>
      </div>
    </section>
  </div>
);

export const macroFaqs = [
  {
    question: "Do I need to weigh my food?",
    answer: "For the most accurate results, yes. Human beings are notoriously bad at estimating portion sizes by eye. Using a food scale for just 2 weeks can recalibrate your internal sense of portion control permanently."
  },
  {
    question: "What happens if I miss my macros but hit my calories?",
    answer: "You will still reach your weight goal, but your energy levels, muscle retention, and hunger cues may suffer. Macros are about the 'quality' of your body change."
  },
  {
    question: "How much protein do I actually need?",
    answer: "Research suggests that for those who are active, 0.7g to 1g of protein per pound of body weight is ideal for maintaining muscle mass while in a calorie deficit."
  }
];
