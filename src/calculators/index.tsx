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
import ROICalculator from './ROICalculator';
import CurrencyConverter from './CurrencyConverter';
import RuleOf72Calculator from './RuleOf72Calculator';
import TaxCalculator from './TaxCalculator';
import StampDutyCalculator from './StampDutyCalculator';
import BudgetPlannerCalculator from './BudgetPlannerCalculator';

// Health
import MacroCalculator from './MacroCalculator';

// Maths
import ScientificCalculator from './ScientificCalculator';
import UnitConverter from './UnitConverter';
import DateTimeCalculator from './DateTimeCalculator';
import StatisticsCalculator from './StatisticsCalculator';
import ProbabilityCalculator from './ProbabilityCalculator';
import PercentageCalculator from './PercentageCalculator';
import ZScoreCalculator from './ZScoreCalculator';

// Everyday Life
import FuelCostCalculator from './FuelCostCalculator';
import RentVsBuyCalculator from './RentVsBuyCalculator';
import GPACalculator from './GPACalculator';
import PasswordGenerator from './PasswordGenerator';
import RecipeScaler from './RecipeScaler';

// Fun & AI
import LoveCalculator from './LoveCalculator';
import SleepCycleCalculator from './SleepCycleCalculator';
import CarbonFootprintCalculator from './CarbonFootprintCalculator';
import ReadingTimeCalculator from './ReadingTimeCalculator';
import PetAgeCalculator from './PetAgeCalculator';
import SplitBillCalculator from './SplitBillCalculator';
import ZodiacCalculator from './ZodiacCalculator';

import PeptideCalculator from './PeptideCalculator';
import ProteinCalculator from './ProteinCalculator';

// Construction & Home Improvement
import MulchCalculator from './MulchCalculator';
import RoofingCalculator from './RoofingCalculator';
import DrywallCalculator from './DrywallCalculator';
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
import OvulationCalculator from './OvulationCalculator';
import PregnancyWeightCalculator from './PregnancyWeightCalculator';

export const calculators: CalculatorMeta[] = [
  {
    id: 'conception',
    title: 'Conception Calculator',
    description: 'Calculate your probable conception date, intercourse window, and expected due date.',
    category: 'Health',
    icon: 'Baby',
    component: ConceptionCalculator,
    seoTitle: 'Conception Calculator | Reverse Calculate Conception Date',
    seoDescription: 'Calculate the exact date of conception based on your due date or last period. Discover your intercourse window and pregnancy milestones.',
    relatedIds: ['ovulation', 'pregnancy-weight', 'bmi'],
    sources: [
      { title: 'ACOG - Methods for Estimating Due Date', url: 'https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2017/05/methods-for-estimating-due-date' }
    ]
  },
  {
    id: 'ovulation',
    title: 'Ovulation Calculator',
    description: 'Predict your fertile windows and ovulation days for the upcoming months.',
    category: 'Health',
    icon: 'Calendar',
    component: OvulationCalculator,
    seoTitle: 'Ovulation Calculator | Predict Your Fertile Window',
    seoDescription: 'Accurately predict your ovulation day and fertile window for the next several months based on your cycle.',
    relatedIds: ['conception', 'pregnancy-weight', 'bmi'],
    sources: [
      { title: 'Mayo Clinic - Menstrual Cycle', url: 'https://www.mayoclinic.org/healthy-lifestyle/womens-health/in-depth/menstrual-cycle/art-20047186' }
    ]
  },
  {
    id: 'pregnancy-weight',
    title: 'Pregnancy Weight Gain Calculator',
    description: 'Track healthy weight gain ranges during pregnancy based on your pre-pregnancy BMI.',
    category: 'Health',
    icon: 'Baby',
    component: PregnancyWeightCalculator,
    seoTitle: 'Pregnancy Weight Gain Calculator | IOM Guidelines',
    seoDescription: 'Calculate the recommended healthy weight gain range during your pregnancy based on IOM guidelines.',
    relatedIds: ['conception', 'ovulation', 'bmi'],
    sources: [
      { title: 'CDC - Weight Gain During Pregnancy', url: 'https://www.cdc.gov/pregnancy/maternal-health/weight-gain.html' },
      { title: 'IOM Guidelines', url: 'https://www.ncbi.nlm.nih.gov/books/NBK32813/' }
    ]
  },
  {
    id: 'car-loan',
    title: 'Car Loan Calculator',
    description: 'Calculate your monthly auto loan payments, total interest, and total cost.',
    category: 'Finance',
    icon: 'Car',
    component: CarLoanCalculator,
    seoTitle: 'Auto Loan & Car Loan Calculator | Estimate Monthly Payments',
    seoDescription: 'Free car loan calculator to estimate your monthly auto loan payments, total interest paid, and the total cost of your vehicle over time.',
    relatedIds: ['mortgage', 'compound-interest', 'salary-calculator'],
    sources: [
      { title: 'CFPB - Auto Loans', url: 'https://www.consumerfinance.gov/consumer-tools/auto-loans/' }
    ]
  },
  {
    id: 'compound-interest',
    title: 'Compound Interest',
    description: 'See how your investments grow over time with compound interest.',
    category: 'Finance',
    icon: 'TrendingUp',
    component: CompoundInterestCalculator,
    seoTitle: 'Compound Interest Calculator | Predict Your Investment Growth',
    seoDescription: 'Free compound interest calculator. Discover how your investments, savings, and returns will grow over time with the power of compounding.',
    relatedIds: ['retirement-savings', 'rule-of-72', 'roi-calculator', 'budget-planner'],
    sources: [
      { title: 'SEC - Fast Answers: Compound Interest', url: 'https://www.investor.gov/introduction-investing/investing-basics/glossary/compound-interest' }
    ]
  },
  {
    id: 'retirement-savings',
    title: 'Retirement Savings',
    description: 'Plan your future by estimating your retirement nest egg based on savings and returns.',
    category: 'Finance',
    icon: 'PiggyBank',
    component: RetirementCalculator,
    seoTitle: 'Retirement Savings Calculator | Plan Your Financial Future',
    seoDescription: 'Calculate your retirement savings with our free retirement calculator. Estimate your future nest egg, returns, and see if your goals are on track.',
    relatedIds: ['compound-interest', 'rule-of-72', 'roi-calculator'],
    sources: [
      { title: 'IRS - Retirement Topics', url: 'https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-benefits-of-saving-now' }
    ]
  },
  {
    id: 'rule-of-72',
    title: 'Rule of 72 Calculator',
    description: 'Estimate how long it takes an investment to double or the required interest rate.',
    category: 'Finance',
    icon: 'TrendingUp',
    component: RuleOf72Calculator,
    seoTitle: 'Rule of 72 Calculator | Investment Doubling Estimator',
    seoDescription: 'Free Rule of 72 calculator. Quickly estimate how long it takes for your investment to double at a given annual interest rate.',
    relatedIds: ['compound-interest', 'retirement-savings', 'roi-calculator']
  },
  {
    id: 'tax-calculator',
    title: 'Tax Liability Calculator',
    description: 'Calculate your estimated tax liability based on brackets, income, and deductions.',
    category: 'Finance',
    icon: 'FileText',
    component: TaxCalculator,
    seoTitle: 'Tax Liability Calculator - Estimate Your Taxes',
    seoDescription: 'Estimate your total tax liability, effective tax rate, and marginal tax rate by entering your income and custom tax brackets.',
    relatedIds: ['salary-calculator', 'stamp-duty-uk', 'budget-planner']
  },
  {
    id: 'salary-calculator',
    title: 'Salary Calculator',
    description: 'Convert your salary between hourly, daily, weekly, monthly, and yearly.',
    category: 'Business',
    icon: 'Briefcase',
    component: SalaryCalculator,
    seoTitle: 'Salary Calculator & Hourly Pay Converter | Calculate Take-Home Pay',
    seoDescription: 'Free salary calculator to seamlessly convert your wage between hourly, daily, weekly, monthly, and annual yearly income.',
    relatedIds: ['budget-planner', 'tax-calculator', 'mortgage']
  },
  {
    id: 'crypto-roi',
    title: 'Crypto ROI Calculator',
    description: 'Calculate profit, loss, and ROI for your cryptocurrency investments.',
    category: 'Finance',
    icon: 'Bitcoin',
    component: CryptoROICalculator,
    seoTitle: 'Crypto ROI Calculator | Cryptocurrency Profit & Loss Estimator',
    seoDescription: 'Calculate your cryptocurrency return on investment (ROI), total profit, and loss for Bitcoin, Ethereum, and other altcoins instantly.',
    relatedIds: ['roi-calculator', 'compound-interest', 'currency-converter']
  },
  {
    id: 'roi-calculator',
    title: 'ROI Calculator',
    description: 'Calculate the Return on Investment (ROI) and annualized returns for any asset or project.',
    category: 'Finance',
    icon: 'TrendingUp',
    component: ROICalculator,
    seoTitle: 'ROI Calculator | Return on Investment & Profit Estimator',
    seoDescription: 'Calculate your Return on Investment (ROI) easily. Supports total profit, percentage return, and annualized ROI for stocks, property, or business.',
    relatedIds: ['compound-interest', 'retirement-savings', 'crypto-roi']
  },
  {
    id: 'stamp-duty-uk',
    title: 'Stamp Duty (UK)',
    description: 'Calculate Stamp Duty Land Tax (SDLT) for property purchases in England and Northern Ireland.',
    category: 'Finance',
    icon: 'PoundSterling',
    component: StampDutyCalculator,
    seoTitle: 'UK Stamp Duty Calculator | SDLT Property Tax Estimator & Guide',
    seoDescription: 'Accurately calculate the Stamp Duty (SDLT) you\'ll pay on a property in England or NI. Latest 2024-2025 rates for first-time buyers, home movers, and buy-to-let.',
    formulaMarkup: (
      <>
        SDLT = Σ (Amount in Bracket × Bracket Rate)
        Where rate depends on buyer type:
        - First-time buyer
        - Standard (Home mover)
        - Additional (Buy-to-let / 2nd home)
      </>
    ),
    explanation: (
      <>
        <p>Stamp Duty Land Tax (SDLT) is a progressive tax paid when you buy property or land over a certain price in England and Northern Ireland. The "progressive" nature means you only pay the specific rate on the portion of the property price that falls within that band, similar to how UK Income Tax works.</p>
        <p>Since the changes in September 2022, the thresholds have increased, exempting more lower-priced properties from the tax entirely. Our calculator handles all categories, including various reliefs and surcharges such as the 3% additional property surcharge.</p>
      </>
    ),
    workedExamples: [
      {
        title: "Standard Home Mover - £450,000 Property",
        content: (
          <p>For a standard home mover buying a house for £450,000:
          <br/>• First £250,000 @ 0% = £0
          <br/>• Remaining £200,000 @ 5% = £10,000
          <br/><strong>Total SDLT: £10,000</strong></p>
        )
      },
      {
        title: "First-Time Buyer - £500,000 Property",
        content: (
          <p>First-time buyers benefit from a higher 0% threshold:
          <br/>• First £425,000 @ 0% = £0
          <br/>• Remaining £75,000 @ 5% = £3,750
          <br/><strong>Total SDLT: £3,750</strong>
          <br/><em>Note: Relief is only available if price is ≤ £625,000.</em></p>
        )
      }
    ],
    faq: [
      {
        question: "When do I have to pay Stamp Duty?",
        answer: "You must send an SDLT return to HMRC and pay the tax within 14 days of completing your property purchase. Usually, your solicitor handles this for you on the day of completion."
      },
      {
        question: "What is the 'Higher Rate' for additional properties?",
        answer: "If you already own a residential property and are buying another (and not replacing your main residence), you usually have to pay an extra 3% on top of the standard SDLT rates. This applies to buy-to-let investments and second homes."
      },
      {
        question: "What if I'm buying in Scotland or Wales?",
        answer: "This calculator applies to England and Northern Ireland. If you're buying in Scotland, you pay Land and Buildings Transaction Tax (LBTT). In Wales, you pay Land Transaction Tax (LTT). Rates for both differ from SDLT."
      }
    ],
    longContent: (
      <>
        <h2>The Ultimate Guide to UK Stamp Duty Land Tax (SDLT)</h2>
        <p>Buying a home is one of the most significant financial decisions you'll ever make. In the UK, one of the largest "hidden" costs of purchasing property is **Stamp Duty Land Tax (SDLT)**. Understanding how much you owe, what reliefs are available, and when you need to pay can save you thousands of pounds in planning.</p>
        
        <h3>Current SDLT Rates (2024-2025)</h3>
        <p>The UK government updated the SDLT thresholds in late 2022 to stimulate the housing market. Currently, for a standard residential purchase by someone who has owned a home before, the rates are:</p>
        <ul>
          <li><strong>£0 to £250,000:</strong> 0%</li>
          <li><strong>£250,001 to £925,000:</strong> 5%</li>
          <li><strong>£925,001 to £1,500,000:</strong> 10%</li>
          <li><strong>Over £1,500,000:</strong> 12%</li>
        </ul>
        
        <h3>First-Time Buyer Relief</h3>
        <p>To help people get onto the housing ladder, the government offers substantial relief for first-time buyers. If you and anyone else you are buying with have never owned a home anywhere in the world (including abroad), you pay:</p>
        <ul>
          <li><strong>0%</strong> on the first £425,000</li>
          <li><strong>5%</strong> on the portion from £425,001 to £625,000</li>
        </ul>
        <p>If the property price exceeds £625,000, you cannot claim this relief and must pay the standard rates on the entire amount.</p>

        <h3>The 3% Higher Rate Surcharge</h3>
        <p>If you are buying an "additional" residential property—such as a holiday home, a buy-to-let investment, or even a second residence while you haven't sold your first—you will usually pay an **extra 3% surcharge** on top of the standard rates across every band. For example, the first £250,000 which is usually 0% becomes 3% for additional properties.</p>
        
        <h3>Non-UK Resident Surcharge</h3>
        <p>Since April 2021, if you are not a resident of the UK, you may also have to pay a **2% surcharge** on top of the rates mentioned above. This is designed to discourage overseas speculation in the UK housing market.</p>

        <h3>How to Use Our Calculator</h3>
        <p>Our Stamp Duty Calculator is designed to be the most accurate tool for buyers in England and Northern Ireland. Simply enter your purchase price, select whether you are a first-time buyer or an investor, and our engine will instantly calculate the tiered breakdown of your tax liability.</p>
        
        <h3>Related Financial Planning</h3>
        <p>Don't forget that Stamp Duty is just one of many costs. When budgeting for your move, always account for:</p>
        <ul>
          <li>Conveyancing/Solicitor fees</li>
          <li>Survey costs</li>
          <li>Mortgage arrangement fees</li>
          <li>Removal/Moving company costs</li>
          <li>Initial repairs or decoration</li>
        </ul>
        <p>Use our <strong>Mortgage Calculator</strong> alongside this tool to get a full picture of your monthly affordability and total upfront costs.</p>
      </>
    ),
    relatedIds: ['mortgage', 'rent-vs-buy', 'budget-planner']
  },
  {
    id: 'budget-planner',
    title: 'Budget Planner',
    description: 'Track your monthly income and expenses to balance your budget and increase savings.',
    category: 'Finance',
    icon: 'Wallet',
    component: BudgetPlannerCalculator,
    seoTitle: 'Monthly Budget Planner | Track Income, Expenses & Savings',
    seoDescription: 'Manage your finances with our free budget planner. Track monthly income and expenses across categories to see where your money goes.',
    formulaMarkup: (
      <>
        Net Savings = Total Monthly Income - Σ (Fixed & Variable Expenses)
        Savings Rate = (Net Savings / Total Monthly Income) × 100
      </>
    ),
    explanation: (
      <>
        <p>Budgeting is the foundation of personal finance. A budget planner helps you visualize where your money is going by categorizing your spending into buckets like Housing, Transport, Food, and Entertainment. The goal is to ensure your total income exceeds your total expenses, leaving a surplus for savings, investments, or debt repayment.</p>
        <p>Our planner calculates your "Savings Rate," which is widely considered the most important metric for achieving financial independence. By tracking your cash flow monthly, you can identify "leaks" in your spending and redirect funds toward your long-term goals.</p>
      </>
    ),
    workedExamples: [
      {
        title: "Standard 50/30/20 Budget",
        content: (
          <p>The 50/30/20 rule is a simple thumb rule for budgeting:
          <br/>• <strong>50% Needs:</strong> Housing, utilities, groceries, insurance.
          <br/>• <strong>30% Wants:</strong> Dining out, hobbies, subscriptions.
          <br/>• <strong>20% Savings:</strong> Debt repayment, emergency fund, retirement.
          <br/><em>Example: With a £4,000 net income, aim for £2,000 on needs, £1,200 on wants, and £800 in savings.</em></p>
        )
      }
    ],
    faq: [
      {
        question: "How much should I save every month?",
        answer: "Financial experts generally recommend saving at least 20% of your after-tax income. However, any amount is better than nothing, and the key is consistency."
      },
      {
        question: "What is the difference between fixed and variable expenses?",
        answer: "Fixed expenses stay the same every month (e.g., rent, gym membership), while variable expenses change (e.g., groceries, utility bills, social outings)."
      }
    ],
    longContent: (
      <>
        <h2>Mastering Your Money: The Comprehensive Guide to Budgeting</h2>
        <p>Financial freedom doesn't happen by accident. It starts with a plan. Whether you're trying to pay off student loans, save for a house deposit, or build an investment portfolio, a **Monthly Budget Planner** is your most powerful ally. In this guide, we'll explore why budgeting matters and how to use our tool to transform your finances.</p>
        
        <h3>Why Most People Fail at Budgeting</h3>
        <p>The #1 reason budgets fail is because they are too restrictive or too vague. "I'll try to spend less this month" isn't a budget—it's a wish. Successful budgeting requires **Categorization** and **Tracking**. By looking at your bank statements and physically entering your costs into a tool like this, you gain "financial mindfulness."</p>

        <h3>The Power of the Savings Rate</h3>
        <p>Most people focus on their salary, but your **Savings Rate** (the percentage of your income you keep) is actually more important. A person earning £100,000 who spends £95,000 is building wealth much slower than someone earning £40,000 who saves £10,000. Our calculator places your savings rate front and center to help you focus on what truly grows your net worth.</p>

        <h3>Top 5 Budgeting Methods</h3>
        <ul>
          <li><strong>Zero-Based Budgeting:</strong> Every single penny of your income is assigned a "job" until there is £0 left over. This ensures no money is "wasted" on mindless spending.</li>
          <li><strong>Pay Yourself First:</strong> Move your intended savings to a separate account the second you get paid, then live on whatever is left.</li>
          <li><strong>The 60% Solution:</strong> Earmark 60% of your income for committed expenses and use the remaining 40% for everything else.</li>
          <li><strong>The Envelope System:</strong> Use physical or digital "envelopes" for different categories (e.g., £400 for groceries). Once the envelope is empty, you stop spending in that category.</li>
          <li><strong>50/30/20 Rule:</strong> As explored in our examples, this is the most popular "balanced" approach for beginners.</li>
        </ul>

        <h3>Practical Tips to Reduce Expenses</h3>
        <p>If your budget planner shows a deficit (you're spending more than you earn), don't panic. Start by looking at your "Wants." Common areas to save money include:</p>
        <ul>
          <li><strong>Subscription Audit:</strong> Are you paying for 4 streaming services? Use one at a time.</li>
          <li><strong>Cooking at Home:</strong> Meal prepping can save the average person over £200 a month compared to ordering takeaway.</li>
          <li><strong>Utility Switching:</strong> Check if you can get a better deal on your internet, mobile plan, or insurance.</li>
          <li><strong>The 48-Hour Rule:</strong> Wait 48 hours before any non-essential purchase over £50 to avoid impulse buys.</li>
        </ul>

        <h3>Using the Budget Planner App</h3>
        <p>Our tool is designed for ease of use. Add your monthly income at the top, then click "Add Item" to list your expenses. We've provided common categories like Housing and Food to get you started. Use the visual Pie Chart to see which categories are eating up most of your income—this is often a "lightbulb moment" for many users.</p>
      </>
    ),
    relatedIds: ['mortgage', 'compound-interest', 'salary-calculator']
  },
  {
    id: 'currency-converter',
    title: 'Currency Converter',
    description: 'Convert between all global currencies with real-time exchange rates.',
    category: 'Business',
    icon: 'PoundSterling',
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
    category: 'Finance',
    icon: 'Home',
    component: MortgageCalculator,
    seoTitle: 'Free Mortgage Calculator with Taxes, Insurance & Amortization',
    seoDescription: 'Accurately calculate your monthly mortgage payments, including property taxes, home insurance, and PMI. Generate instant amortization schedules and see total interest.',
    formulaMarkup: (
      <>
        M = P [ i(1 + i)^n ] / [ (1 + i)^n - 1 ]
        Where:
        - M = Monthly Payment
        - P = Principal Loan Amount
        - i = Monthly Interest Rate (Annual Rate / 12)
        - n = Total Number of Months (Term in Years × 12)
      </>
    ),
    explanation: (
      <>
        <p>A mortgage calculator is essential for anyone looking to buy a home or refinance an existing mortgage. It takes the guesswork out of your monthly budgeting by calculating your Principal and Interest (P&I) based on the loan amount, interest rate, and term.</p>
        <p>However, your actual monthly payment is often higher because it includes "Escrow" items: property taxes and homeowners insurance. Our calculator allows you to include these figures for a more realistic estimate of your total cost of ownership.</p>
      </>
    ),
    workedExamples: [
      {
        title: "Standard 30-Year Fixed Mortgage",
        content: (
          <p>Buying a £300,000 home with a 20% down payment (£60,000):
          <br/>• <strong>Loan Amount:</strong> £240,000
          <br/>• <strong>Interest Rate:</strong> 6%
          <br/>• <strong>Term:</strong> 30 Years
          <br/><strong>Monthly P&I: £1,439</strong>
          <br/>Total Interest Paid over 30 years: £277,987.</p>
        )
      },
      {
        title: "15-Year vs 30-Year Comparison",
        content: (
          <p>With a 15-year term, your monthly payments are higher, but you save significantly on interest:
          <br/>• <strong>15y @ 5.5%:</strong> £1,960/mo (Total Interest: £112,800)
          <br/>• <strong>30y @ 6.0%:</strong> £1,439/mo (Total Interest: £277,987)
          <br/>Saving: £165,187 in interest by choosing the shorter term.</p>
        )
      }
    ],
    faq: [
      {
        question: "What is PMI (Private Mortgage Insurance)?",
        answer: "If your down payment is less than 20% of the home's value, lenders usually require PMI to protect themselves in case you default. It typically costs between 0.5% and 1.5% of the loan amount annually."
      },
      {
        question: "How does my interest rate affect my total cost?",
        answer: "Even a 1% difference in interest rate can cost you tens of thousands of pounds over 30 years. For example, on a £250k loan, a 7% rate costs ~£60k more in interest than a 6% rate."
      }
    ],
    longContent: (
      <>
        <h2>The Complete Guide to Mortgage Planning and Affordability</h2>
        <p>For most people, a mortgage is the largest debt they will ever take on. Understanding the mechanics of how interest, principal, and terms interact is vital for long-term financial health. This guide will walk you through everything you need to know about calculating your mortgage and planning for homeownership.</p>

        <h3>How a Mortgage Works: Principal vs. Interest</h3>
        <p>In the early years of your mortgage, the majority of your monthly payment goes toward paying off the **interest**. As the loan progresses, a larger portion is applied to the **principal** (the actual amount you borrowed). This process is known as **Amortization**. Our tool generates an amortization schedule so you can see exactly how your balance decreases month by month.</p>

        <h3>Fixed-Rate vs. Adjustable-Rate Mortgages (ARMs)</h3>
        <ul>
          <li><strong>Fixed-Rate:</strong> The interest rate stays the same for the entire life of the loan. This provides stability and makes it easier to budget long-term.</li>
          <li><strong>Adjustable-Rate (ARM):</strong> The rate is fixed for an initial period (e.g., 5 years) and then adjusts periodically based on market indices. These often start with lower rates but carry the risk of significant increases later.</li>
        </ul>

        <h3>What Determines Your Interest Rate?</h3>
        <p>Lenders look at several factors when deciding what rate to offer you:</p>
        <ol>
          <li><strong>Credit Score:</strong> Higher scores typically unlock lower interest rates.</li>
          <li><strong>Down Payment:</strong> Putting down 20% or more shows the lender you have "skin in the game" and reduces their risk.</li>
          <li><strong>Loan Term:</strong> Shorter terms (10-15 years) usually have lower rates than 30-year terms.</li>
          <li><strong>Loan Type:</strong> Conventional, FHA, VA, and USDA loans all have different rate structures.</li>
        </ol>

        <h3>Budgeting for the "True Cost" of a Home</h3>
        <p>The mortgage payment is just one piece of the puzzle. When using our mortgage calculator, don't forget to account for:</p>
        <ul>
          <li><strong>Property Taxes:</strong> Usually around 1-1.5% of the home's value per year, though this varies widely by location.</li>
          <li><strong>Homeowners Insurance:</strong> Essential for protecting your investment and required by lenders.</li>
          <li><strong>Maintenance (The 1% Rule):</strong> You should set aside ~1% of your home's value every year for repairs and maintenance.</li>
          <li><strong>HOA Fees:</strong> If you're buying a condo or in a managed community, monthly Homeowners Association fees can add hundreds to your monthly cost.</li>
        </ul>

        <h3>How to Save Money on Your Mortgage</h3>
        <ol>
          <li><strong>Make Extra Payments:</strong> Even one extra payment a year can shave years off your mortgage and save thousands in interest.</li>
          <li><strong>Refinance:</strong> If interest rates drop significantly, you can replace your high-rate loan with a lower-rate one.</li>
          <li><strong>Recasting:</strong> If you come into a large sum of money, you can pay a lump sum toward the principal and ask the bank to "recast" (recalculate) your remaining payments.</li>
        </ol>

        <h3>Practical Steps for Potential Buyers</h3>
        <p>Before you start house hunting, we recommend you:</p>
        <ol>
          <li>Check your credit report and fix any errors.</li>
          <li>Save for a down payment (aim for 20% to avoid PMI).</li>
          <li>Get "Pre-Approved" so sellers take your offers seriously.</li>
          <li>Use our <strong>Stamp Duty Calculator</strong> to calculate the upfront tax costs.</li>
          <li>Use our <strong>Rent vs Buy Calculator</strong> to ensure homeownership makes sense in your current stage of life.</li>
        </ol>
      </>
    ),
    relatedIds: ['stamp-duty-uk', 'rent-vs-buy', 'compound-interest'],
    sources: [
      { title: 'CFPB - Home Loan Toolkit', url: 'https://files.consumerfinance.gov/f/201503_cfpb_your-home-loan-toolkit-web.pdf' },
      { title: 'Investopedia - Mortgage Basics', url: 'https://www.investopedia.com/terms/m/mortgage.asp' }
    ]
  },
  {
    id: 'bmi',
    title: 'BMI Calculator',
    description: 'Check your Body Mass Index (BMI) and find out if you are at a healthy weight.',
    category: 'Health',
    icon: 'Activity',
    component: BMICalculator,
    seoTitle: 'Body Mass Index (BMI) Calculator | Check Your Healthy Weight',
    seoDescription: 'Free online BMI calculator. Find out your Body Mass Index and healthy weight range for adult men and women based on height and weight.',
    relatedIds: ['body-fat-calculator', 'bmr-tdee', 'macro-calculator', 'protein-calculator'],
    sources: [
      { title: 'CDC - About Adult BMI', url: 'https://www.cdc.gov/healthyweight/assessing/bmi/adult_bmi/index.html' },
      { title: 'WHO - Body Mass Index', url: 'https://www.who.int/data/gho/data/themes/topics/topic-details/GHO/body-mass-index' }
    ]
  },
  {
    id: 'bmr-tdee',
    title: 'BMR & TDEE Calculator',
    description: 'Calculate your Basal Metabolic Rate and Total Daily Energy Expenditure to manage your weight.',
    category: 'Health',
    icon: 'Flame',
    component: BMRCalculator,
    seoTitle: 'BMR & TDEE Calculator | Calculate Daily Calorie & Energy Needs',
    seoDescription: 'Calculate your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE). Discover your exact daily calorie needs for weight loss, maintenance, or muscle gain.',
    relatedIds: ['macro-calculator', 'protein-calculator', 'bmi'],
    sources: [
      { title: 'National Library of Medicine - Mifflin St Jeor Equation', url: 'https://pubmed.ncbi.nlm.nih.gov/2305711/' }
    ]
  },
  {
    id: 'water-intake',
    title: 'Water Intake Calculator',
    description: 'Find out how much water you should drink daily based on your weight and activity.',
    category: 'Health',
    icon: 'Droplets',
    component: WaterIntakeCalculator,
    seoTitle: 'Water Intake Calculator | How Much Water Should I Drink?',
    seoDescription: 'Calculate daily water intake. Find out exactly how many ounces or liters of water you should drink per day to stay hydrated based on weight and activity.',
    relatedIds: ['bmi', 'bmr-tdee', 'heart-rate-zones'],
    sources: [
      { title: 'National Academies of Sciences - Dietary Reference Intakes for Water', url: 'https://www.nationalacademies.org/news/2004/02/report-sets-dietary-intake-levels-for-water-salt-and-potassium-to-maintain-health-and-reduce-chronic-disease-risk' }
    ]
  },
  {
    id: 'heart-rate-zones',
    title: 'Heart Rate Zones',
    description: 'Calculate your target heart rate zones for optimal training and fat burning.',
    category: 'Health',
    icon: 'HeartPulse',
    component: HeartRateCalculator,
    seoTitle: 'Target Heart Rate Zone Calculator | Fat Burning & Cardio',
    seoDescription: 'Calculate your target heart rate zones for maximum fat burning, cardio capacity, and optimal athletic training.',
    relatedIds: ['bmr-tdee', 'bmi', 'water-intake'],
    sources: [
      { title: 'AHA - Target Heart Rates Chart', url: 'https://www.heart.org/en/healthy-living/fitness/fitness-basics/target-heart-rates' }
    ]
  },
  {
    id: 'body-fat-calculator',
    title: 'Body Fat Calculator',
    description: 'Estimate your body fat percentage using the US Navy method.',
    category: 'Health',
    icon: 'Percent',
    component: BodyFatCalculator,
    seoTitle: 'Body Fat Calculator - US Navy Method | Estimate Body Fat %',
    seoDescription: 'Determine your body fat percentage, lean body mass, and fat mass using the highly accurate US Navy method. Free online body fat estimator.',
    relatedIds: ['bmi', 'bmr-tdee', 'macro-calculator'],
    sources: [
      { title: 'U.S. Department of Defense - Physical Fitness', url: 'https://www.med.navy.mil/Navy-Marine-Corps-Public-Health-Center/Population-Health/Health-Promotion-and-Wellness/A-Z-Health-Topics/Physical-Fitness/' }
    ]
  },
  {
    id: 'peptide-calculator',
    title: 'Peptide Calculator',
    description: 'Calculate the exact amount of bacteriostatic water needed to reconstitute your peptides and determine the correct syringe dosage.',
    category: 'Health',
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
    category: 'Health',
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
    category: 'Health',
    icon: 'PieChart',
    component: MacroCalculator,
    seoTitle: 'Macro Calculator | Fast Track Your Diet & Nutrition',
    seoDescription: 'Determine your ideal daily macronutrient split—protein, carbs, and fat—for weight loss, muscle gain, or maintenance. Free macro diet planner.',
    relatedIds: ['protein-calculator', 'bmr-tdee', 'bmi'],
    sources: [
      { title: 'USDA - Dietary Guidelines for Americans', url: 'https://www.dietaryguidelines.gov/' }
    ]
  },
  {
    id: 'scientific-calculator',
    title: 'Scientific Calculator',
    description: 'Perform advanced mathematical operations including trig and logarithms.',
    category: 'Maths',
    icon: 'Calculator',
    component: ScientificCalculator,
    seoTitle: 'Online Scientific Calculator | Advanced Math Functions',
    seoDescription: 'Free online scientific calculator. Perform advanced mathematical operations, trigonometry, logarithms, fractions, and exponential algebra easily.',
    relatedIds: ['fraction-calculator', 'percentage-calculator', 'statistics-calculator']
  },
  {
    id: 'unit-converter',
    title: 'Unit Converter',
    description: 'Convert between different units of length, weight, and more.',
    category: 'Conversions',
    icon: 'Scale',
    component: UnitConverter,
    seoTitle: 'Universal Unit Converter | Length, Weight, Volume & More',
    seoDescription: 'Fast, free universal unit converter. Instantly convert measurements for length, weight, volume, temperature, and area.',
    relatedIds: ['date-time', 'scientific-calculator', 'recipe-scaler']
  },
  {
    id: 'date-time',
    title: 'Date & Time Calculator',
    description: 'Calculate the difference between two dates in days, weeks, and months.',
    category: 'Conversions',
    icon: 'Calendar',
    component: DateTimeCalculator,
    seoTitle: 'Date & Time Calculator | Add/Subtract Days & Find Duration',
    seoDescription: 'Easily calculate the duration between two dates, find business days, or add/subtract days, weeks, and months to a calendar date.',
    relatedIds: ['unit-converter', 'pet-age-calculator', 'zodiac-calculator']
  },
  {
    id: 'statistics-calculator',
    title: 'Statistics Calculator',
    description: 'Calculate mean, median, mode, range, and standard deviation of a dataset.',
    category: 'Maths',
    icon: 'BarChart',
    component: StatisticsCalculator,
    seoTitle: 'Statistics Calculator | Mean, Median, Mode & Standard Deviation',
    seoDescription: 'Free statistics calculator to compute the mean, median, mode, variance, range, and standard deviation for any data set.',
    relatedIds: ['z-score-calculator', 'probability-calculator', 'scientific-calculator']
  },
  {
    id: 'probability-calculator',
    title: 'Probability Calculator',
    description: 'Calculate the probability of multiple independent events occurring.',
    category: 'Maths',
    icon: 'Dices',
    component: ProbabilityCalculator,
    seoTitle: 'Probability Calculator | AllTypesOfCalculators',
    seoDescription: 'Calculate the odds and probability of events.',
    relatedIds: ['statistics-calculator', 'z-score-calculator', 'scientific-calculator']
  },
  {
    id: 'percentage-calculator',
    title: 'Percentage Calculator',
    description: 'Calculate percentages, percent increases/decreases, and what percent one number is of another.',
    category: 'Maths',
    icon: 'Percent',
    component: PercentageCalculator,
    seoTitle: 'Percentage Calculator | Percent Increase & Decrease Tool',
    seoDescription: 'Free online percentage calculator. Find what X% of Y is, calculate percent increases or decreases, and solve everyday math tasks effortlessly.',
    relatedIds: ['fraction-calculator', 'scientific-calculator', 'tip-calculator']
  },
  {
    id: 'z-score-calculator',
    title: 'Z-Score & Std Dev',
    description: 'Calculate the Z-Score and Standard Deviation for statistics datasets.',
    category: 'Maths',
    icon: 'BarChart',
    component: ZScoreCalculator,
    seoTitle: 'Z-Score & Standard Deviation Calculator | Statistics Tools',
    seoDescription: 'Fast, free Z-score and standard deviation calculator for statistics students. Calculate your z-score from a raw value, mean, and standard deviation.',
    relatedIds: ['statistics-calculator', 'probability-calculator', 'scientific-calculator']
  },
  {
    id: 'fraction-calculator',
    title: 'Fraction Calculator',
    description: 'Add, subtract, multiply, and divide fractions easily.',
    category: 'Maths',
    icon: 'Divide',
    component: FractionCalculator,
    seoTitle: 'Fraction Calculator - Simplify & Calculate Fractions | AllTypesOfCalculators',
    seoDescription: 'Free online fraction calculator to add, subtract, multiply, and divide fractions.',
    relatedIds: ['percentage-calculator', 'scientific-calculator', 'recipe-scaler']
  },
  {
    id: 'fuel-cost',
    title: 'Fuel Cost Calculator',
    description: 'Estimate the total cost of gas for your next road trip.',
    category: 'Everyday life',
    icon: 'Fuel',
    component: FuelCostCalculator,
    seoTitle: 'Fuel Cost \& Gas Trip Calculator | Plan Your Road Trip Expenses',
    seoDescription: 'Accurately estimate the total gas cost for your next road trip, commute, or travel plan based on vehicle MPG and current fuel prices.',
    relatedIds: ['car-loan', 'rent-vs-buy', 'budget-planner']
  },
  {
    id: 'rent-vs-buy',
    title: 'Rent vs Buy Calculator',
    description: 'Compare the financial impact of renting vs buying a home over time.',
    category: 'Everyday life',
    icon: 'Home',
    component: RentVsBuyCalculator,
    seoTitle: 'Rent vs Buy Calculator | Real Estate & Housing Decision Model',
    seoDescription: 'Unsure whether to rent or buy a home? Compare the long-term financial impact, ROI, mortgage costs, and rent appreciation to find the best choice.',
    relatedIds: ['mortgage', 'stamp-duty-uk', 'budget-planner']
  },
  {
    id: 'gpa-calculator',
    title: 'GPA Calculator',
    description: 'Calculate your high school or college Grade Point Average (GPA).',
    category: 'Everyday life',
    icon: 'GraduationCap',
    component: GPACalculator,
    seoTitle: 'GPA Calculator | High School & College Grade Planner',
    seoDescription: 'Calculate your semester and cumulative Grade Point Average (GPA). A free tool for high school and college students to track academic progress.',
    relatedIds: ['reading-time', 'statistics-calculator', 'fraction-calculator']
  },
  {
    id: 'password-generator',
    title: 'Password Generator',
    description: 'Generate secure, random passwords with custom length and character types.',
    category: 'Everyday life',
    icon: 'Key',
    component: PasswordGenerator,
    seoTitle: 'Secure Password Generator | AllTypesOfCalculators',
    seoDescription: 'Create strong, random passwords instantly.',
    relatedIds: ['ai-image-generator', 'reading-time', 'pet-age-calculator']
  },
  {
    id: 'recipe-scaler',
    title: 'Recipe Scaler',
    description: 'Easily scale recipe ingredients up or down for different serving sizes.',
    category: 'Everyday life',
    icon: 'ChefHat',
    component: RecipeScaler,
    seoTitle: 'Recipe Ingredient Scaler | AllTypesOfCalculators',
    seoDescription: 'Scale your recipes for any number of servings.',
    relatedIds: ['unit-converter', 'fraction-calculator', 'tip-calculator']
  },
  {
    id: 'tip-calculator',
    title: 'Tip & Bill Splitter',
    description: 'Quickly calculate tips and split the bill among friends.',
    category: 'Everyday life',
    icon: 'Users',
    component: TipCalculator,
    seoTitle: 'Tip Calculator & Bill Splitter | AllTypesOfCalculators',
    seoDescription: 'Easily calculate tips and split restaurant bills among multiple people.',
    relatedIds: ['split-bill-calculator', 'percentage-calculator', 'fuel-cost']
  },
  {
    id: 'love-calculator',
    title: 'Love Calculator',
    description: 'Calculate the compatibility between two names. Just for fun!',
    category: 'Everyday life',
    icon: 'Heart',
    component: LoveCalculator,
    seoTitle: 'Love Calculator & Compatibility Test | AllTypesOfCalculators',
    seoDescription: 'Test your love compatibility with our fun name calculator.',
    relatedIds: ['zodiac-calculator', 'sleep-cycle', 'pet-age-calculator']
  },
  {
    id: 'sleep-cycle',
    title: 'Sleep Cycle Calculator',
    description: 'Find the best time to go to bed to wake up feeling refreshed.',
    category: 'Everyday life',
    icon: 'Moon',
    component: SleepCycleCalculator,
    seoTitle: 'Sleep Cycle Calculator | Wake Up Refreshed & Energized',
    seoDescription: 'Find your perfect bedtime and wake-up time based on 90-minute REM sleep cycles. Stop waking up groggy with our free sleep cycle planner.',
    relatedIds: ['heart-rate-zones', 'water-intake', 'carbon-footprint']
  },
  {
    id: 'carbon-footprint',
    title: 'Carbon Footprint',
    description: 'Estimate your annual CO2 emissions based on driving, flying, and diet.',
    category: 'Everyday life',
    icon: 'Leaf',
    component: CarbonFootprintCalculator,
    seoTitle: 'Carbon Footprint Calculator | AllTypesOfCalculators',
    seoDescription: 'Calculate your personal carbon footprint.',
    relatedIds: ['fuel-cost', 'water-intake', 'bmr-tdee']
  },
  {
    id: 'reading-time',
    title: 'Reading Time Calculator',
    description: 'Estimate how long it will take to read an article or book excerpt.',
    category: 'Everyday life',
    icon: 'BookOpen',
    component: ReadingTimeCalculator,
    seoTitle: 'Reading Time Calculator | AllTypesOfCalculators',
    seoDescription: 'Find out how long it takes to read any text.',
    relatedIds: ['gpa-calculator', 'password-generator', 'zodiac-calculator']
  },
  {
    id: 'ai-image-generator',
    title: 'AI Image Generator',
    description: 'Generate high-quality 1K, 2K, and 4K images from text descriptions using Gemini AI.',
    category: 'AI & SEO',
    icon: 'Image',
    component: ImageGenerator,
    seoTitle: 'Free AI Image Generator | AllTypesOfCalculators',
    seoDescription: 'Generate beautiful high-resolution images from text using advanced AI.',
    relatedIds: ['password-generator', 'reading-time', 'zodiac-calculator']
  },
  {
    id: 'pet-age-calculator',
    title: 'Pet Age Calculator',
    description: 'Convert your dog or cat years into accurate human years based on size and breed.',
    category: 'Everyday life',
    icon: 'Baby',
    component: PetAgeCalculator,
    seoTitle: 'Dog & Cat Age Calculator - Pet Years to Human Years',
    seoDescription: 'Accurately calculate your dog or cat\'s age in human years based on their size and age.',
    relatedIds: ['love-calculator', 'zodiac-calculator', 'reading-time']
  },
  {
    id: 'split-bill-calculator',
    title: 'Split Bill Calculator',
    description: 'Split bills proportionally among friends based on exactly what they ordered.',
    category: 'Everyday life',
    icon: 'PoundSterling',
    component: SplitBillCalculator,
    seoTitle: 'Split Bill Calculator - Divide Receipts Fairly',
    seoDescription: 'Easily split the check and calculate proportional tax and tip for everyone at the table.',
    relatedIds: ['tip-calculator', 'percentage-calculator']
  },
  {
    id: 'zodiac-calculator',
    title: 'Astrology / Zodiac',
    description: 'Calculate your sun, estimated moon, and rising signs based on your birth details.',
    category: 'Everyday life',
    icon: 'Moon',
    component: ZodiacCalculator,
    seoTitle: 'Astrology & Zodiac Sign Calculator - Sun, Moon, Rising',
    seoDescription: 'Calculate your Sun, Moon, and Rising astrology signs and Chinese Zodiac based on your birthday and time.',
    relatedIds: ['love-calculator', 'pet-age-calculator', 'date-time']
  },
  {
    id: 'paint-calculator',
    title: 'Paint Calculator',
    description: 'Estimate how many gallons of paint are needed based on room dimensions.',
    category: 'Construction',
    icon: 'PaintRoller',
    component: PaintCalculator,
    seoTitle: 'Paint Calculator - Estimate Paint Gallons Needed | AllTypesOfCalculators',
    seoDescription: 'Free paint calculator to estimate how many gallons of paint you need for your walls and rooms.',
    relatedIds: ['wallpaper-calculator', 'flooring-calculator', 'tile-calculator']
  },
  {
    id: 'flooring-calculator',
    title: 'Flooring Calculator',
    description: 'Calculate how many boxes of tile, laminate, or carpet are needed.',
    category: 'Construction',
    icon: 'Grid',
    component: FlooringCalculator,
    seoTitle: 'Flooring Calculator - Estimate Tile, Laminate & Carpet | AllTypesOfCalculators',
    seoDescription: 'Calculate the square footage and number of boxes needed for your flooring project.',
    relatedIds: ['tile-calculator', 'paint-calculator', 'concrete-calculator']
  },
  {
    id: 'concrete-calculator',
    title: 'Concrete Calculator',
    description: 'Calculate cubic yardage and bags of concrete needed for a slab.',
    category: 'Construction',
    icon: 'HardHat',
    component: ConcreteCalculator,
    seoTitle: 'Concrete Calculator - Yards & Bags Estimator | AllTypesOfCalculators',
    seoDescription: 'Calculate how many cubic yards or bags of concrete you need for your construction project.',
    relatedIds: ['mulch-calculator', 'flooring-calculator', 'tile-calculator']
  },
  {
    id: 'hvac-btu-calculator',
    title: 'HVAC / BTU Calculator',
    description: 'Figure out what size air conditioner or heater you need for a room.',
    category: 'Construction',
    icon: 'ThermometerSun',
    component: HVACCalculator,
    seoTitle: 'HVAC BTU Calculator - AC & Heater Sizing | AllTypesOfCalculators',
    seoDescription: 'Calculate the required BTUs and AC tonnage needed to cool or heat your room.',
    relatedIds: ['roofing-calculator', 'drywall-calculator', 'concrete-calculator']
  },
  {
    id: 'tile-calculator',
    title: 'Tile Calculator',
    description: 'Calculate how many tiles and boxes you need for your floor or wall project.',
    category: 'Construction',
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
    category: 'Construction',
    icon: 'Layers',
    component: WallpaperCalculator,
    seoTitle: 'Wallpaper Calculator - Estimate Rolls Needed | AllTypesOfCalculators',
    seoDescription: 'Calculate exactly how many rolls of wallpaper you need for your home improvement project.',
    relatedIds: ['paint-calculator', 'tile-calculator', 'flooring-calculator']
  },
  {
    id: 'mulch-calculator',
    title: 'Mulch / Landscaping',
    description: 'Calculates how much soil, mulch, or gravel is needed for a specific yard area.',
    category: 'Construction',
    icon: 'Leaf',
    component: MulchCalculator,
    seoTitle: 'Mulch & Landscaping Calculator - Estimate Bags and Yards',
    seoDescription: 'Calculate exactly how much mulch, soil, or gravel you need in cubic yards and bags.',
    relatedIds: ['concrete-calculator', 'roofing-calculator', 'paint-calculator']
  },
  {
    id: 'roofing-calculator',
    title: 'Roofing Calculator',
    description: 'Estimates the number of roofing squares or shingles needed.',
    category: 'Construction',
    icon: 'Home',
    component: RoofingCalculator,
    seoTitle: 'Roofing Calculator - Estimate Squares and Shingles',
    seoDescription: 'Calculate roofing squares and bundles of shingles needed for your roof based on footprint and pitch.',
    relatedIds: ['drywall-calculator', 'concrete-calculator', 'hvac-btu-calculator']
  },
  {
    id: 'drywall-calculator',
    title: 'Drywall Calculator',
    description: 'Estimates how many sheets of drywall are needed for a room.',
    category: 'Construction',
    icon: 'Maximize',
    component: DrywallCalculator,
    seoTitle: 'Drywall Calculator - Estimate Sheets Needed',
    seoDescription: 'Calculate how many sheets of drywall you need for a room including deductions for doors and windows.',
    relatedIds: ['flooring-calculator', 'tile-calculator', 'paint-calculator']
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
