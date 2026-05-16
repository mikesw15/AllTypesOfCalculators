import { ComparisonMeta } from '../types';

export const comparisons: ComparisonMeta[] = [
  {
    id: 'bmi-vs-body-fat',
    title: 'BMI vs. Body Fat Percentage',
    description: 'Understand which metric is more accurate for your fitness goals.',
    calculatorIds: ['bmi', 'body-fat-calculator'],
    highlights: {
      title: 'Key Differences',
      differences: [
        {
          label: 'Measurement Focus',
          values: {
            'bmi': 'Weight relative to height (Overall mass)',
            'body-fat-calculator': 'Percentage of total mass that is fat vs. muscle'
          }
        },
        {
          label: 'Accuracy',
          values: {
            'bmi': 'General population screening; often inaccurate for athletes',
            'body-fat-calculator': 'More precise for body composition and metabolic health'
          }
        },
        {
          label: 'Inputs Required',
          values: {
            'bmi': 'Height and Weight only',
            'body-fat-calculator': 'Height, Weight, and multiple body measurements (Neck, Waist, Hips)'
          }
        }
      ]
    }
  },
  {
    id: 'bmr-vs-tdee',
    title: 'BMR vs. TDEE',
    description: 'Calculate your metabolic baseline versus your total daily calorie burn.',
    calculatorIds: ['bmr-tdee', 'macro-calculator'],
    highlights: {
      title: 'Calorie Metrics',
      differences: [
        {
          label: 'Definition',
          values: {
            'bmr-tdee': 'Basal Metabolic Rate: Calories burned at total rest',
            'macro-calculator': 'Total Daily Energy Expenditure: Includes activity and exercise'
          }
        },
        {
          label: 'Primary Use',
          values: {
            'bmr-tdee': 'Understanding biological baseline needs',
            'macro-calculator': 'Creating a specific diet plan for weight loss or muscle gain'
          }
        }
      ]
    }
  },
  {
    id: 'gross-vs-net-pay',
    title: 'Gross Pay vs. Net Pay',
    description: 'The difference between your total earnings and what actually hits your bank account.',
    calculatorIds: ['salary-calculator', 'tax-calculator'],
    highlights: {
      title: 'Salary Comparison',
      differences: [
        {
          label: 'Valuation',
          values: {
            'salary-calculator': 'Total compensation before any deductions',
            'tax-calculator': 'Final "Take-Home" pay after Tax and National Insurance'
          }
        },
        {
          label: 'Visibility',
          values: {
            'salary-calculator': 'Usually the number stated on job offers or contracts',
            'tax-calculator': 'The actual amount available for budgeting and expenses'
          }
        }
      ]
    }
  },
  {
    id: 'apr-vs-interest',
    title: 'APR vs. Interest Rate',
    description: 'Understand the hidden costs of borrowing beyond the nominal interest rate.',
    calculatorIds: ['car-loan-calculator', 'mortgage-calculator'],
    highlights: {
      title: 'Cost Breakdown',
      differences: [
        {
          label: 'Inclusions',
          values: {
            'car-loan-calculator': 'Nominal interest only (the cost of the principal)',
            'mortgage-calculator': 'Interest + Broker fees + Closing costs + Mortgage insurance'
          }
        },
        {
          label: 'Purpose',
          values: {
            'car-loan-calculator': 'Determines your monthly interest accumulation',
            'mortgage-calculator': 'Provides a true annual cost for comparing different loan offers'
          }
        },
        {
          label: 'Magnitude',
          values: {
            'car-loan-calculator': 'Usually the lower number',
            'mortgage-calculator': 'Almost always higher than the interest rate'
          }
        }
      ]
    }
  }
];

export const getComparisonForCalculator = (calculatorId: string) => {
  return comparisons.find(comp => comp.calculatorIds.includes(calculatorId));
};
