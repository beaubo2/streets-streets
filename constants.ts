
import { Mentor, FilterCategory, Transaction } from './types';

export const MENTORS: Mentor[] = [];

export const FILTERS: FilterCategory[] = [
  {
    title: 'ROLE',
    options: ['Investment Banking', 'Private Equity', 'Venture Capital', 'Quant / Trading', 'Asset Management', 'Corporate Finance', 'Management Consulting', 'Strategy', 'Real Estate / REPE', 'Restructuring', 'Other Finance Roles']
  },
  {
    title: 'SKILLS',
    options: ['Resume Review', 'Technical Prep', 'Behavioral Interview', 'Case Prep', 'Networking Strategy', 'Mock Interview', 'Story Crafting', 'Career Chat']
  },
  {
    title: 'CITY',
    options: ['New York', 'San Francisco', 'London', 'Toronto', 'Montreal', 'Chicago', 'Los Angeles', 'Houston', 'Boston', 'Calgary', 'Vancouver']
  },
  {
    title: 'IDENTITY',
    options: ['First Gen', 'Underrepresented Minority', 'Non-target', 'International', 'Woman in Finance', 'Transfer Student', 'LGBTQ+', 'Athlete']
  },
  {
    title: 'COMPANY',
    options: [
      // Bulge Bracket & Big Banks
      'Goldman Sachs', 'Morgan Stanley', 'J.P. Morgan', 'Bank of America', 'Citi', 'Barclays', 'UBS', 'Deutsche Bank', 'Credit Suisse', 'Wells Fargo', 'HSBC', 'BNP Paribas', 'Societe Generale', 'Nomura',
      
      // Elite Boutiques & Independent
      'Evercore', 'Centerview', 'PJT Partners', 'Lazard', 'Moelis & Co', 'Qatalyst', 'Guggenheim', 'Perella Weinberg Partners', 'Rothschild & Co', 'Houlihan Lokey', 'Greenhill', 'LionTree', 'Allen & Co',
      
      // Middle Market & Others
      'Jefferies', 'William Blair', 'Baird', 'Piper Sandler', 'Cowen', 'Stifel', 'Macquarie', 'Cantor Fitzgerald', 'Stephens', 'Raymond James', 'KeyBanc',
      
      // Canadian Banks & Boutiques
      'RBC Capital Markets', 'TD Securities', 'BMO Capital Markets', 'CIBC Capital Markets', 'Scotiabank', 'National Bank Financial', 'Canaccord Genuity', 'Cormark', 'GMP / Stifel Canada', 'Eight Capital', 'Paradigm Capital',
      
      // Private Equity / Alt Assets
      'Blackstone', 'KKR', 'Apollo', 'Carlyle', 'TPG', 'Warburg Pincus', 'Vista Equity Partners', 'Thoma Bravo', 'Silver Lake', 'Ares Management', 'Brookfield', 'General Atlantic', 'Insight Partners', 'Summit Partners', 'TA Associates', 'Hellman & Friedman', 'Advent International',
      
      // Pension Funds & Sovereign Wealth
      'CPP Investments', 'OTPP', 'OMERS', 'HOOPP', 'PSP Investments', 'CDPQ', 'AIMCo', 'GIC', 'Temasek',
      
      // Venture Capital
      'Sequoia', 'a16z', 'Bessemer', 'Benchmark', 'Index Ventures', 'Lightspeed', 'Accel', 'Founders Fund', 'NEA', 'Khosla Ventures',
      
      // Quant / HFT / Prop Trading
      'Citadel', 'Millennium', 'Point72', 'Bridgewater', 'D.E. Shaw', 'Two Sigma', 'Jane Street', 'Hudson River Trading', 'Jump Trading', 'DRW', 'Optiver', 'IMC Trading', 'Susquehanna (SIG)', 'AQR', 'Five Rings',
      
      // Asset Management
      'BlackRock', 'Fidelity', 'Wellington', 'PIMCO', 'Capital Group', 'Vanguard', 'T. Rowe Price', 'Invesco', 'Franklin Templeton',
      
      // Consulting
      'McKinsey', 'Bain', 'BCG', 'Deloitte', 'PwC', 'EY', 'KPMG', 'Oliver Wyman', 'L.E.K.', 'Kearney', 'AlixPartners', 'Roland Berger', 'Parthenon', 'Strategy&', 'Simon-Kucher', 'Cornerstone Research', 'Analysis Group'
    ].sort()
  },
  {
    title: 'SCHOOL',
    options: [
      // US Ivies & Elites
      'Harvard', 'Wharton', 'Stanford', 'Columbia', 'MIT', 'Yale', 'Princeton', 'Brown', 'Dartmouth', 'Cornell', 'Duke', 'Chicago Booth', 'Northwestern', 'UPenn',
      
      // US Targets & Major Business Schools
      'NYU Stern', 'Michigan Ross', 'Berkeley', 'Georgetown', 'UVA (McIntire)', 'UNC (Kenan-Flagler)', 'UCLA', 'USC (Marshall)', 'UT Austin (McCombs)', 'Vanderbilt', 'Notre Dame (Mendoza)', 'Boston College', 'Carnegie Mellon (Tepper)', 'Emory (Goizueta)', 'Washington U (Olin)', 'Indiana (Kelley)', 'UIUC (Gies)', 'Penn State', 'Wisconsin', 'Georgia Tech', 'SMU (Cox)', 'Fordham', 'Boston University', 'Northeastern', 'Rice', 'Babson', 'Baruch',
      
      // Canada
      'Western Ivey', "Queen's", 'Waterloo', 'McGill', 'U of T', 'UBC', 'Laurier', 'York Schulich', 'Concordia', 'McMaster', 'University of Calgary', 'University of Alberta', 'Dalhousie', 'Simon Fraser', 'HEC Montréal', 'Ryerson (TMU)', 'Ottawa', 'Carleton', 'Manitoba', 'Saskatchewan', 'Victoria',
      
      // International Targets
      'LSE', 'Oxford', 'Cambridge', 'LBS', 'INSEAD', 'HEC Paris', 'Bocconi', 'Imperial College', 'UCL', 'Warwick'
    ].sort()
  }
];

export const TRANSACTIONS: Transaction[] = [];
