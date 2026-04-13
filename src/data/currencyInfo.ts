export interface CurrencyDetail {
  code: string;
  name: string;
  country: string;
  description: string;
  symbol: string;
}

export const currencyDetails: Record<string, CurrencyDetail> = {
  USD: {
    code: 'USD',
    name: 'United States Dollar',
    country: 'United States',
    description: 'The world\'s primary reserve currency, issued by the Federal Reserve. It is the most traded currency globally.',
    symbol: '$'
  },
  EUR: {
    code: 'EUR',
    name: 'Euro',
    country: 'Eurozone',
    description: 'The official currency of 20 of the 27 member states of the European Union. It is the second largest reserve currency.',
    symbol: '€'
  },
  GBP: {
    code: 'GBP',
    name: 'British Pound Sterling',
    country: 'United Kingdom',
    description: 'The oldest currency in continuous use. It is the fourth most traded currency in the foreign exchange market.',
    symbol: '£'
  },
  JPY: {
    code: 'JPY',
    name: 'Japanese Yen',
    country: 'Japan',
    description: 'The third most traded currency in the foreign exchange market. It is often used as a safe-haven currency.',
    symbol: '¥'
  },
  AUD: {
    code: 'AUD',
    name: 'Australian Dollar',
    country: 'Australia',
    description: 'The currency of the Commonwealth of Australia. It is popular with currency traders due to high interest rates and exposure to commodities.',
    symbol: 'A$'
  },
  CAD: {
    code: 'CAD',
    name: 'Canadian Dollar',
    country: 'Canada',
    description: 'Often called the "loonie", it is a commodity currency due to Canada\'s large exports of natural resources, particularly oil.',
    symbol: 'C$'
  },
  CHF: {
    code: 'CHF',
    name: 'Swiss Franc',
    country: 'Switzerland',
    description: 'The currency and legal tender of Switzerland and Liechtenstein. It is considered a major safe-haven currency.',
    symbol: 'Fr'
  },
  CNY: {
    code: 'CNY',
    name: 'Chinese Yuan',
    country: 'China',
    description: 'The official currency of the People\'s Republic of China. It is increasingly used in international trade and as a reserve currency.',
    symbol: '¥'
  },
  INR: {
    code: 'INR',
    name: 'Indian Rupee',
    country: 'India',
    description: 'The official currency of India. Its value is managed by the Reserve Bank of India.',
    symbol: '₹'
  },
  NZD: {
    code: 'NZD',
    name: 'New Zealand Dollar',
    country: 'New Zealand',
    description: 'Often called the "kiwi", it is the tenth most traded currency in the world.',
    symbol: 'NZ$'
  },
  SGD: {
    code: 'SGD',
    name: 'Singapore Dollar',
    country: 'Singapore',
    description: 'The official currency of Singapore. It is one of the strongest and most stable currencies in the Asia-Pacific region.',
    symbol: 'S$'
  },
  HKD: {
    code: 'HKD',
    name: 'Hong Kong Dollar',
    country: 'Hong Kong',
    description: 'The official currency of Hong Kong. It is the ninth most traded currency in the world.',
    symbol: 'HK$'
  },
  KRW: {
    code: 'KRW',
    name: 'South Korean Won',
    country: 'South Korea',
    description: 'The official currency of South Korea. It is a major currency in East Asia.',
    symbol: '₩'
  },
  MXN: {
    code: 'MXN',
    name: 'Mexican Peso',
    country: 'Mexico',
    description: 'The official currency of Mexico. It is the most traded currency in Latin America.',
    symbol: '$'
  },
  BRL: {
    code: 'BRL',
    name: 'Brazilian Real',
    country: 'Brazil',
    description: 'The official currency of Brazil. It is the strongest currency in South America.',
    symbol: 'R$'
  },
  ZAR: {
    code: 'ZAR',
    name: 'South African Rand',
    country: 'South Africa',
    description: 'The official currency of South Africa. It is a major emerging market currency.',
    symbol: 'R'
  }
};
