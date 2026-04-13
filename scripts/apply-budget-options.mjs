import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const filePath = join(__dirname, '..', 'src', 'topics', 'union-budget', 'data.ts')

let content = readFileSync(filePath, 'utf8')

// ─── OPTIONS MAP ──────────────────────────────────────────────────────────────
const optionsMap = {
  1: `options: ['Finance Minister Nirmala Sitharaman', 'Finance Minister Piyush Goyal', 'Finance Minister Arun Jaitley', 'Finance Minister P. Chidambaram'],`,
  2: `options: ['Yuva Shakti-driven Budget', 'Sabka Vikas Budget', 'Atmanirbhar Bharat Budget', 'Viksit Gramin Budget'],`,
  3: `options: ['Rs 53.47 lakh crore', 'Rs 49.60 lakh crore', 'Rs 55.23 lakh crore', 'Rs 51.10 lakh crore'],`,
  4: `options: ['4.3% of GDP', '4.4% of GDP', '4.1% of GDP', '4.8% of GDP'],`,
  5: `options: ['Rs 12.22 lakh crore', 'Rs 11.21 lakh crore', 'Rs 10.18 lakh crore', 'Rs 13.50 lakh crore'],`,
  6: `options: ['Rs 36.5 lakh crore', 'Rs 34.96 lakh crore', 'Rs 32.15 lakh crore', 'Rs 38.20 lakh crore'],`,
  7: `options: ['No — tax slabs and standard deduction remain unchanged from Budget 2025-26', 'Yes — basic exemption raised to Rs 5 lakh', 'Yes — top rate reduced from 30% to 25%', 'Yes — standard deduction raised to Rs 1 lakh'],`,
  8: `options: ['Income Tax Act 2025 replaces the Income Tax Act 1961 — effective from 1 April 2026', 'Income Tax Act 2026 replaces the Income Tax Act 1961 — effective from 1 April 2027', 'Income Tax Act 2024 replaces the Income Tax Act 1961 — effective from 1 April 2025', 'Income Tax Act 2025 replaces the Income Tax Act 1956 — effective from 1 April 2026'],`,
  9: `options: ['TCS on LRS for education/medical reduced to 2% (from 5%); TCS on foreign tour packages reduced to flat 2% (from 5%/20%)', 'TCS on LRS for education/medical reduced to 1% (from 5%); TCS on foreign tour packages eliminated', 'TCS on LRS for education/medical raised to 10% (from 5%); TCS on foreign tour packages raised to 7%', 'TCS on LRS for education/medical reduced to 3% (from 5%); TCS on foreign tour packages reduced to 5%'],`,
  10: `options: ['STT on Futures raised to 0.05% (from 0.02%); STT on Options premium raised to 0.15% (from 0.1%)', 'STT on Futures raised to 0.03% (from 0.02%); STT on Options premium raised to 0.12% (from 0.1%)', 'STT on Futures reduced to 0.01% (from 0.02%); STT on Options premium reduced to 0.08% (from 0.1%)', 'STT on Futures raised to 0.10% (from 0.02%); STT on Options premium raised to 0.20% (from 0.1%)'],`,
  11: `options: ['Deadline extended from 31 December to 31 March', 'Deadline extended from 31 October to 31 December', 'Deadline extended from 31 March to 30 June', 'Deadline extended from 31 July to 31 October'],`,
  12: `options: ['Rs 7.85 lakh crore', 'Rs 6.81 lakh crore', 'Rs 8.20 lakh crore', 'Rs 7.10 lakh crore'],`,
  13: `options: ['Capital acquisition: Rs 1.85L crore | DRDO: Rs 29,100 crore | BRO: Rs 7,394 crore | ECHS: Rs 12,100 crore (+45.49%)', 'Capital acquisition: Rs 1.50L crore | DRDO: Rs 25,000 crore | BRO: Rs 5,000 crore | ECHS: Rs 8,000 crore', 'Capital acquisition: Rs 2.10L crore | DRDO: Rs 32,000 crore | BRO: Rs 9,000 crore | ECHS: Rs 15,000 crore', 'Capital acquisition: Rs 1.20L crore | DRDO: Rs 20,000 crore | BRO: Rs 4,000 crore | ECHS: Rs 10,000 crore'],`,
  14: `options: ['Rs 2.93 lakh crore total (Rs 2.78 lakh crore GBS)', 'Rs 2.52 lakh crore total (Rs 2.35 lakh crore GBS)', 'Rs 3.20 lakh crore total (Rs 3.05 lakh crore GBS)', 'Rs 2.70 lakh crore total (Rs 2.55 lakh crore GBS)'],`,
  15: `options: ['Rs 3.10 lakh crore for MoRTH — 8% higher than FY26 — highway target: 10,000 km', 'Rs 2.87 lakh crore for MoRTH — 3% higher than FY26 — highway target: 8,000 km', 'Rs 3.50 lakh crore for MoRTH — 15% higher than FY26 — highway target: 12,000 km', 'Rs 2.72 lakh crore for MoRTH — flat vs FY26 — highway target: 7,500 km'],`,
  16: `options: ['Infrastructure Risk Guarantee Fund | 20 new National Waterways | City Economic Regions (Rs 5,000 cr each) | Coastal Cargo Promotion Scheme', 'Infra Development Fund | 15 new National Waterways | Smart City Expansion | Inland Waterways Mission', 'Infrastructure Debt Fund | 10 new National Waterways | City Cluster Scheme | Coastal Rail Corridor', 'Public Works Guarantee Fund | 25 new National Waterways | Urban Development Mission | Port-Led Development Scheme'],`,
  17: `options: ['Rs 1,32,561 crore | Fertiliser subsidy: Rs 1.70 lakh crore | ICAR: Rs 9,967 crore', 'Rs 1,20,000 crore | Fertiliser subsidy: Rs 1.50 lakh crore | ICAR: Rs 8,500 crore', 'Rs 1,50,000 crore | Fertiliser subsidy: Rs 1.90 lakh crore | ICAR: Rs 11,000 crore', 'Rs 1,10,000 crore | Fertiliser subsidy: Rs 1.30 lakh crore | ICAR: Rs 7,000 crore'],`,
  18: `options: ['Virtually Integrated System to Access Agricultural Resources — multilingual AI tool for farmers with Rs 150 crore allocation', 'Village-Integrated System for Technological Agricultural Resources — digital tool for rural extension workers', 'Virtual Information System for Technology And Agricultural Resources — satellite-based advisory system', 'Vibrant Initiative for Smart Technology and Agricultural Research — national agri research portal'],`,
  19: `options: ['Viksit Bharat-Guarantee For Rozgar And Ajeevika Mission (Gramin) — 125 days employment — Rs 95,692 crore allocation', 'Viksit Bharat-Gramin Rozgar And Mission — 130 days employment — Rs 85,000 crore allocation', 'Viksit Bharat-Guarantee For Rural Agricultural Mission — 120 days employment — Rs 75,000 crore allocation', 'Viksit Bharat-Guarantee For Rural And Agricultural Mission — 100 days employment — Rs 65,000 crore allocation'],`,
  20: `options: ['Rural Dev Ministry +21% | PMAY-Rural: Rs 54,917 cr (+69%) | PMGSY: Rs 19,000 cr (+73%) | Jal Jeevan Mission: Rs 67,670 cr', 'Rural Dev Ministry +15% | PMAY-Rural: Rs 42,000 cr (+30%) | PMGSY: Rs 12,000 cr (+25%) | Jal Jeevan Mission: Rs 55,000 cr', 'Rural Dev Ministry +30% | PMAY-Rural: Rs 60,000 cr (+80%) | PMGSY: Rs 22,000 cr (+90%) | Jal Jeevan Mission: Rs 75,000 cr', 'Rural Dev Ministry +10% | PMAY-Rural: Rs 35,000 cr (+20%) | PMGSY: Rs 10,000 cr (+15%) | Jal Jeevan Mission: Rs 48,000 cr'],`,
  21: `options: ['Rs 1,39,289 crore (+8.27%) | School Education: Rs 83,562 cr | Higher Education: Rs 55,727 cr', 'Rs 1,28,000 crore (+6%) | School Education: Rs 75,000 cr | Higher Education: Rs 53,000 cr', 'Rs 1,50,000 crore (+12%) | School Education: Rs 92,000 cr | Higher Education: Rs 58,000 cr', 'Rs 1,20,000 crore (+4%) | School Education: Rs 70,000 cr | Higher Education: Rs 50,000 cr'],`,
  22: `options: ['Rs 1,06,530 crore (+8.96% over RE 2025-26) | 194% increase since 2014-15', 'Rs 99,858 crore (+5.5% over RE 2025-26) | 172% increase since 2014-15', 'Rs 1,15,000 crore (+15% over RE 2025-26) | 210% increase since 2014-15', 'Rs 95,000 crore (+2% over RE 2025-26) | 160% increase since 2014-15'],`,
  23: `options: ['Rs 10,000 crore over 5 years to develop India as a global biopharma manufacturing hub for biologics and biosimilars', 'Rs 5,000 crore over 3 years to develop India as a global generic drug manufacturing hub', 'Rs 20,000 crore over 10 years to develop India as a global pharmaceutical research hub', 'Rs 8,000 crore over 5 years to develop India as a global medical device manufacturing hub'],`,
  24: `options: ['Rs 1,000 crore for FY26-27 — shift from assembly to IP creation, equipment, and materials development', 'Rs 2,000 crore for FY26-27 — focus on chip assembly and packaging operations', 'Rs 500 crore for FY26-27 — focus on semiconductor import substitution', 'Rs 3,000 crore for FY26-27 — focus on display and optics semiconductor manufacturing'],`,
  25: `options: ['Rs 20,000 crore over 5 years for Carbon Capture, Utilisation and Storage (CCUS)', 'Rs 10,000 crore over 3 years for Carbon Capture and Sequestration (CCS)', 'Rs 15,000 crore over 5 years for Carbon Offset and Utilisation Scheme', 'Rs 25,000 crore over 7 years for Climate Control and Underground Storage'],`,
  26: `options: ['Rs 10,000 crore Container Manufacturing Scheme to build domestic container-manufacturing ecosystem', 'Rs 5,000 crore Shipping Container Promotion Scheme to reduce import dependence', 'Rs 15,000 crore National Container Industry Mission to boost port efficiency', 'Rs 8,000 crore Container Infrastructure Fund to develop logistics hubs'],`,
  27: `options: ['Odisha, Kerala, Andhra Pradesh, and Tamil Nadu', 'Jharkhand, Chhattisgarh, Odisha, and Karnataka', 'Rajasthan, Gujarat, Odisha, and West Bengal', 'Uttarakhand, Himachal Pradesh, Assam, and Meghalaya'],`,
  28: `options: ['Rs 1 lakh crore Research, Development and Innovation (RDI) Fund — Rs 20,000 crore for FY27', 'Rs 50,000 crore Science and Technology Development Fund — Rs 10,000 crore for FY27', 'Rs 75,000 crore National Innovation and Research Fund — Rs 15,000 crore for FY27', 'Rs 2 lakh crore Deep Technology Mission Fund — Rs 30,000 crore for FY27'],`,
  29: `options: ['Self-Help Entrepreneur (SHE) Marts — community-owned retail outlets for women-led enterprises in rural areas', 'Self-Help Enterprise (SHE) Markets — government-subsidized retail stores in urban slums', 'Skill and Health Empowerment (SHE) Mission — vocational training centres for rural women', 'Social-Help Empowerment (SHE) Marts — cooperative stores in peri-urban areas'],`,
  30: `options: ['Rs 5 lakh crore — 9.37% of total budget (+11.3% over previous year)', 'Rs 4.49 lakh crore — 8.86% of total budget (+8% over previous year)', 'Rs 6 lakh crore — 11.2% of total budget (+15% over previous year)', 'Rs 3.8 lakh crore — 7.5% of total budget (+5% over previous year)'],`,
  31: `options: ['Divyang Kaushal Yojana (skilling in IT, AVGC, hospitality) | Divyang Sahara Yojana (assistive devices)', 'Divyang Vikas Yojana (employment generation) | Divyang Suraksha Yojana (insurance coverage)', 'Divyang Ujjwala Yojana (free LPG) | Divyang Samman Yojana (pension scheme)', 'Divyang Shiksha Yojana (education support) | Divyang Swasthya Yojana (health coverage)'],`,
  32: `options: ['Trained paraprofessionals to help MSMEs with compliance in Tier-2 and Tier-3 towns — supports ICAI, ICSI, ICMAI', 'Trained accountants to audit cooperative banks in rural areas — under Ministry of Agriculture', 'Legal aid professionals for tribal communities — under Ministry of Tribal Affairs', 'Certified digital literacy trainers for government employees — under Ministry of Electronics'],`,
  33: `options: ['Rs 1,000 crore for FY26-27 (reduced from Rs 2,000 crore in FY25-26 due to underutilization)', 'Rs 2,000 crore for FY26-27 (increased from Rs 1,500 crore in FY25-26)', 'Rs 3,000 crore for FY26-27 (doubled from Rs 1,500 crore in FY25-26)', 'Rs 500 crore for FY26-27 (reduced from Rs 1,000 crore in FY25-26)'],`,
  34: `options: ['Foreign Assets Disclosure Scheme — one-time conditional relief for declaring overseas assets valued up to Rs 5 crore', 'Financial Accounts Transparency Disclosure Scheme — mandatory annual disclosure for foreign income', 'Foreign Asset Settlement Scheme — tax amnesty for repatriating overseas assets of any value', 'Fiscal Asset Transparency Scheme — annual audit requirement for NRI accounts'],`,
  35: `options: ['Finance: Rs 19.73L cr | Defence: Rs 7.85L cr | Roads: Rs 3.10L cr | Railways: Rs 2.81L cr | Home: Rs 2.55L cr', 'Finance: Rs 18.50L cr | Defence: Rs 6.81L cr | Roads: Rs 2.87L cr | Railways: Rs 2.52L cr | Home: Rs 1.50L cr', 'Finance: Rs 21.00L cr | Defence: Rs 9.00L cr | Roads: Rs 4.00L cr | Railways: Rs 3.50L cr | Home: Rs 3.00L cr', 'Finance: Rs 15.00L cr | Defence: Rs 5.50L cr | Roads: Rs 2.00L cr | Railways: Rs 2.00L cr | Home: Rs 1.20L cr'],`,
  36: `options: ['BCD on personal imports: 20% to 10% | Gold/Silver unchanged at 6% | 148 new tariff lines | Tariff simplification from May 2026', 'BCD on personal imports: 30% to 15% | Gold: 10% to 6% | 100 new tariff lines | Tariff simplification from April 2026', 'BCD on personal imports: 20% to 5% | Gold: unchanged | 200 new tariff lines | Tariff simplification from March 2026', 'BCD on personal imports: 25% to 12% | Gold: 8% to 5% | 50 new tariff lines | Tariff simplification from July 2026'],`,
  37: `options: ['Post-sale discount rule eased | Provisional refunds for inverted duty | Intermediary services qualify as exports', 'GST rates restructured | New e-invoice mandatory for all businesses | Annual return deadline extended', 'CGST rate reduced for EVs | Input credit expanded for construction | Exemption for health insurance', 'GST council merged CGST and IGST | New digital tax on app-based services | Compliance threshold doubled'],`,
  38: `options: ['Expenditure: Rs 50.65L to Rs 53.47L cr | FD: 4.4% to 4.3% | Capex: Rs 11.21L to Rs 12.22L cr | Defence: Rs 6.81L to Rs 7.85L cr', 'Expenditure: Rs 47.16L to Rs 50.65L cr | FD: 4.8% to 4.4% | Capex: Rs 10.18L to Rs 11.21L cr | Defence: Rs 5.94L to Rs 6.81L cr', 'Expenditure: Rs 45.00L to Rs 48.00L cr | FD: 5.0% to 4.6% | Capex: Rs 9.00L to Rs 10.50L cr | Defence: Rs 5.00L to Rs 6.00L cr', 'Expenditure: Rs 53.47L to Rs 57.00L cr | FD: 4.3% to 4.0% | Capex: Rs 12.22L to Rs 14.00L cr | Defence: Rs 7.85L to Rs 9.00L cr'],`,
  39: `options: ['16th Finance Commission | Rs 1.4 lakh crore FC grants to states | Vertical devolution share retained at 41%', '15th Finance Commission | Rs 1.2 lakh crore FC grants to states | Vertical devolution share at 42%', '14th Finance Commission | Rs 1.0 lakh crore FC grants to states | Vertical devolution share at 42%', '16th Finance Commission | Rs 2.0 lakh crore FC grants to states | Vertical devolution share raised to 45%'],`,
  40: `options: ['Strategy for Healthcare Advancement through Knowledge, Technology, and Innovation', 'Strategy for Health and Ayurveda Knowledge, Technology, and Implementation', 'Science for Healthcare Advancement through Knowledge, Technology, and Innovation', 'System for Healthcare Assurance through Knowledge, Technology, and Infrastructure'],`,
  41: `options: ['Dept of Atomic Energy: Rs 24,124 crore | R&D up 88% to Rs 2,410 crore | BARC: Rs 1,800 crore | Nuclear power projects: Rs 2,500 crore', 'Dept of Atomic Energy: Rs 18,000 crore | R&D up 40% to Rs 1,500 crore | BARC: Rs 920 crore | Nuclear power projects: Rs 1,500 crore', 'Dept of Atomic Energy: Rs 30,000 crore | R&D up 120% to Rs 3,000 crore | BARC: Rs 2,500 crore | Nuclear power projects: Rs 4,000 crore', 'Dept of Atomic Energy: Rs 20,000 crore | R&D up 60% to Rs 2,000 crore | BARC: Rs 1,200 crore | Nuclear power projects: Rs 2,000 crore'],`,
  42: `options: ['(1) National Fibre Scheme (2) Textile Expansion & Employment Scheme (3) National Handloom & Handicraft Programme (4) Tex-Eco Initiative (5) Samarth 2.0', '(1) National Yarn Mission (2) Textile Modernization Scheme (3) National Weaving Programme (4) Eco-Textile Initiative (5) Skill India 2.0', '(1) National Cotton Mission (2) Textile Export Scheme (3) National Crafts Programme (4) Green Textile Initiative (5) Samarth 1.0', '(1) National Silk Mission (2) Textile Cluster Development (3) Handloom Welfare Fund (4) Sustainable Textile Initiative (5) Samarth 3.0'],`,
  43: `options: ['Rs 10,000 crore SME Growth Fund | Self-Reliant India Fund topped up by Rs 2,000 crore | Fund of Funds for Startups: Rs 10,000 crore', 'Rs 5,000 crore MSME Development Fund | SIDBI corpus raised by Rs 3,000 crore | Fund of Funds for Startups: Rs 5,000 crore', 'Rs 15,000 crore MSME Modernization Fund | Mudra Fund topped up by Rs 5,000 crore | Startup India Fund: Rs 8,000 crore', 'Rs 8,000 crore SME Upliftment Fund | CGTMSE corpus raised by Rs 1,000 crore | Deep Tech Fund: Rs 12,000 crore'],`,
  44: `options: ['FDI limit raised from 74% to 100% — condition: entire premium must be invested in India', 'FDI limit raised from 49% to 74% — condition: majority board members must be Indian nationals', 'FDI limit raised from 26% to 49% — condition: headquarters must be in India', 'FDI limit raised from 74% to 100% — condition: 50% of workforce must be Indian'],`,
  45: `options: ['Buddhist Circuit in NE India (6 states) | 5 tourism destinations in Purvodaya states | Mountain/nature trails | 10,000 tourist guides training', 'Buddhist Circuit in South India (4 states) | 3 tourism destinations in Himalayan states | Coastal trails | 5,000 tourist guides training', 'Heritage Circuit in NE India (8 states) | 7 tourism destinations in Eastern states | Desert trails | 15,000 tourist guides training', 'Buddhist Circuit in Central India (5 states) | 4 tourism destinations in Western states | River trails | 8,000 tourist guides training'],`,
  46: `options: ['(1) Mumbai-Pune (2) Pune-Hyderabad (3) Hyderabad-Bengaluru (4) Hyderabad-Chennai (5) Chennai-Bengaluru (6) Delhi-Varanasi (7) Varanasi-Siliguri', '(1) Mumbai-Pune (2) Pune-Bengaluru (3) Bengaluru-Chennai (4) Chennai-Kolkata (5) Kolkata-Delhi (6) Delhi-Mumbai (7) Delhi-Varanasi', '(1) Delhi-Mumbai (2) Mumbai-Chennai (3) Chennai-Kolkata (4) Kolkata-Delhi (5) Delhi-Bengaluru (6) Mumbai-Hyderabad (7) Hyderabad-Chennai', '(1) Mumbai-Ahmedabad (2) Ahmedabad-Delhi (3) Delhi-Varanasi (4) Varanasi-Patna (5) Patna-Kolkata (6) Kolkata-Bhubaneswar (7) Bhubaneswar-Visakhapatnam'],`,
  47: `options: ['Chairman: Arvind Panagariya | 41% vertical devolution retained | New: GDP as criterion (10% weight) | Rs 7.91 lakh crore for local bodies (2026-31)', 'Chairman: N.K. Singh | 42% vertical devolution retained | New: Forest cover criterion | Rs 6.50 lakh crore for local bodies (2021-26)', 'Chairman: Y.V. Reddy | 41% vertical devolution retained | New: Tax effort criterion | Rs 5.00 lakh crore for local bodies (2015-20)', 'Chairman: Vijay Kelkar | 43% vertical devolution retained | New: Population criterion | Rs 8.50 lakh crore for local bodies (2026-31)'],`,
  48: `options: ['Ministry of Labour: Rs 32,666 crore | PM-VBRY: Rs 20,083 crore | Skill Dev Ministry: Rs 9,886 crore (+62%) | Gig workers: 12 million (2% of workforce)', 'Ministry of Labour: Rs 25,000 crore | PM-VBRY: Rs 15,000 crore | Skill Dev Ministry: Rs 7,000 crore (+30%) | Gig workers: 8 million', 'Ministry of Labour: Rs 40,000 crore | PM-VBRY: Rs 25,000 crore | Skill Dev Ministry: Rs 12,000 crore (+80%) | Gig workers: 15 million', 'Ministry of Labour: Rs 20,000 crore | PM-VBRY: Rs 10,000 crore | Skill Dev Ministry: Rs 5,000 crore (+20%) | Gig workers: 5 million'],`,
  49: `options: ['Ministry of Housing & Urban Affairs: Rs 85,522 crore (+49.5%) | PMAY-Urban: Rs 18,625 crore | AMRUT: Rs 8,000 crore | PM-SVANidhi: Rs 900 crore', 'Ministry of Housing & Urban Affairs: Rs 65,000 crore (+20%) | PMAY-Urban: Rs 15,000 crore | AMRUT: Rs 6,000 crore | PM-SVANidhi: Rs 500 crore', 'Ministry of Housing & Urban Affairs: Rs 96,777 crore (+18%) | PMAY-Urban: Rs 20,000 crore | AMRUT: Rs 10,000 crore | PM-SVANidhi: Rs 1,200 crore', 'Ministry of Housing & Urban Affairs: Rs 1,00,000 crore (+55%) | PMAY-Urban: Rs 22,000 crore | AMRUT: Rs 12,000 crore | PM-SVANidhi: Rs 1,500 crore'],`,
  50: `options: ['5 University Townships near industrial corridors | 5 Regional Medical Hubs | NIMHANS-2 | 3 new All India Institutes of Ayurveda', '3 University Townships near technology parks | 3 Regional Medical Hubs | AIIMS-2 | 5 new All India Institutes of Ayurveda', '7 University Townships near port-based clusters | 7 Regional Medical Hubs | NIMHANS-3 | 2 new Yoga Institutes', '10 University Townships in backward districts | 2 Regional Medical Hubs | JIPMER-2 | 6 new AYUSH colleges'],`,
  51: `options: ['Tax holiday till 2047 for foreign companies providing cloud services globally using Indian data centres', 'Tax holiday till 2035 for Indian companies providing cloud services to domestic customers', 'Tax holiday till 2047 for all IT companies registering in Indian SEZs', 'Tax holiday till 2030 for foreign companies setting up data centres in Tier-2 cities'],`,
  52: `options: ['PM-KISAN: Rs 63,500 crore for 11.8 crore farmers | Modified Interest Subvention (KCC): Rs 22,600 crore | PMFBY coverage: 4 crore farmers', 'PM-KISAN: Rs 50,000 crore for 10 crore farmers | KCC: Rs 18,000 crore | PMFBY coverage: 3 crore farmers', 'PM-KISAN: Rs 75,000 crore for 13 crore farmers | KCC: Rs 28,000 crore | PMFBY coverage: 5 crore farmers', 'PM-KISAN: Rs 45,000 crore for 9 crore farmers | KCC: Rs 15,000 crore | PMFBY coverage: 2 crore farmers'],`,
  53: `options: ['Rs 67,670 crore — 2nd largest centrally sponsored scheme — extended till December 2028', 'Rs 55,000 crore — 3rd largest centrally sponsored scheme — extended till March 2027', 'Rs 80,000 crore — largest centrally sponsored scheme — extended till December 2030', 'Rs 45,000 crore — 4th largest centrally sponsored scheme — extended till June 2026'],`,
  54: `options: ['CCUS: Rs 20,000 crore over 5 years for steel, cement, refineries, chemicals, power | Rare Earth Corridors: 4 states — monazite-rich coastal sands in Kerala & Tamil Nadu', 'CCUS: Rs 10,000 crore over 3 years for steel and cement | Rare Earth Corridors: 2 states — Odisha and Jharkhand', 'CCUS: Rs 30,000 crore over 7 years for power sector | Rare Earth Corridors: 6 states — all major rare earth producing states', 'CCUS: Rs 15,000 crore over 5 years for chemical sector | Rare Earth Corridors: 3 states — Kerala, Tamil Nadu, Karnataka'],`,
  55: `options: ['Target: 50 plus/minus 1% of GDP by March 2031 | Current (BE 2026-27): 55.6% of GDP', 'Target: 45 plus/minus 1% of GDP by March 2031 | Current (BE 2026-27): 52.0% of GDP', 'Target: 60 plus/minus 1% of GDP by March 2031 | Current (BE 2026-27): 65.0% of GDP', 'Target: 40 plus/minus 1% of GDP by March 2035 | Current (BE 2026-27): 55.6% of GDP'],`,
  56: `options: ['Initiative to strengthen khadi, handloom and handicrafts through training, quality improvement and global branding', 'Scheme to revive rural cottage industries through KVIC expansion and artisan registration', 'Programme to provide Rs 5,000 monthly stipend to khadi weavers across 20 states', 'Mission to set up 5,000 Khadi gram udyog centres in tribal areas'],`,
  57: `options: ['20 new National Waterways in 5 years | Coastal Cargo Promotion Scheme: 6% to 12% by 2047 | Ship repair at Varanasi & Patna | New freight corridor: Dankuni-Surat', '10 new National Waterways in 3 years | Coastal Cargo Promotion Scheme: 4% to 8% by 2035 | Ship repair at Mumbai & Kolkata | New freight corridor: Chennai-Mumbai', '15 new National Waterways in 7 years | Coastal Cargo Promotion Scheme: 3% to 10% by 2047 | Ship repair at Goa & Visakhapatnam | New freight corridor: Nagpur-Kolkata', '25 new National Waterways in 10 years | Coastal Cargo Promotion Scheme: 5% to 15% by 2047 | Ship repair at Delhi & Ahmedabad | New freight corridor: Dankuni-Delhi'],`,
  58: `options: ['Defence allocation enhanced to Rs 7.85 lakh crore partly due to emergency procurement post-Operation Sindoor under both capital and revenue categories', 'Defence allocation enhanced to Rs 6.81 lakh crore partly due to post-Operation Parakram procurement', 'Defence allocation enhanced to Rs 7.85 lakh crore entirely due to routine modernization without any specific operation', 'Defence allocation enhanced to Rs 8.50 lakh crore entirely due to emergency procurement post-Operation Sindoor'],`,
  59: `options: ['Rs 2,55,234 crore — 127.93% increase — primarily due to Census operations, border management, and UT administration', 'Rs 1,50,000 crore — 60% increase — primarily due to CRPF expansion and NIA strengthening', 'Rs 3,00,000 crore — 180% increase — primarily due to Defence handover of border management to MHA', 'Rs 2,00,000 crore — 95% increase — primarily due to State Police reforms and court modernization'],`,
  60: `options: ['"Tax Year" — introduced by Income Tax Act 2025 to replace both Financial Year and Assessment Year for uniformity', '"Revenue Year" — introduced by Finance Act 2025 to replace Assessment Year only', '"Fiscal Year" — introduced by Income Tax Act 2024 to replace Financial Year only', '"Accounting Year" — introduced by Income Tax Act 2025 to replace both Financial Year and Assessment Year'],`,
  61: `options: ['155261 — AI assistant "Bharati" provides advice through voice calls in regional languages', '1800-111-155 — AI assistant "Kisan" provides advice through SMS and WhatsApp', '155272 — AI assistant "Fasal" provides advice through mobile app in Hindi only', '1800-180-1551 — AI assistant "Annadata" provides advice through IVR system'],`,
  62: `options: ['A "High Level Committee on Banking for Viksit Bharat" to review the entire banking sector for India\'s next growth phase', 'A "National Banking Regulatory Commission" to replace the existing RBI regulatory framework', 'A "Public Sector Bank Consolidation Committee" to merge all PSBs into 5 large banks', 'A "Digital Banking Transition Committee" to phase out physical bank branches by 2047'],`,
  63: `options: ['Buybacks taxed as capital gains for all shareholders from Apr 2026 | SGB gains from secondary market purchases taxed as capital gains (only original issue gets exemption)', 'Buybacks remain tax-free for individuals | SGB gains on all purchases fully exempt from capital gains', 'Buybacks taxed as dividend income for all shareholders | SGB gains on all purchases taxed as income', 'Buybacks taxed as capital gains only for FPIs | SGB gains on original issue purchases taxed as capital gains'],`,
  64: `options: ['Finance Minister Nirmala Sitharaman presented it on 1 February 2025', 'Finance Minister Nirmala Sitharaman presented it on 28 February 2025', 'Finance Minister Piyush Goyal presented it on 1 February 2025', 'Finance Minister Nirmala Sitharaman presented it on 1 February 2024'],`,
  65: `options: ['"Sabka Vikas" (Development for All) — blueprint for Viksit Bharat (Developed India) by 2047', '"Sab Ka Saath" (Together with All) — blueprint for Atmanirbhar Bharat by 2047', '"Jan Bhagidari" (People\'s Participation) — roadmap for India@100 reforms', '"Sab Ke Liye Vikas" (Development for Everyone) — blueprint for Digital India by 2047'],`,
  66: `options: ['Agriculture, MSMEs, Investment, and Exports', 'Agriculture, Infrastructure, Manufacturing, and Services', 'MSMEs, Technology, Healthcare, and Education', 'Agriculture, Defence, Investment, and Banking'],`,
  67: `options: ['0-4L: Nil | 4-8L: 5% | 8-12L: 10% | 12-16L: 15% | 16-20L: 20% | 20-24L: 25% | Above 24L: 30%', '0-3L: Nil | 3-6L: 5% | 6-9L: 10% | 9-12L: 15% | 12-15L: 20% | 15-20L: 25% | Above 20L: 30%', '0-5L: Nil | 5-10L: 10% | 10-15L: 20% | Above 15L: 30%', '0-4L: Nil | 4-10L: 10% | 10-20L: 20% | 20-30L: 25% | Above 30L: 30%'],`,
  68: `options: ['Rs 60,000 (increased from Rs 25,000) — makes income up to Rs 12 lakh effectively tax-free', 'Rs 50,000 (increased from Rs 25,000) — makes income up to Rs 10 lakh effectively tax-free', 'Rs 75,000 (increased from Rs 25,000) — makes income up to Rs 15 lakh effectively tax-free', 'Rs 60,000 (increased from Rs 12,500) — makes income up to Rs 12 lakh effectively tax-free'],`,
  69: `options: ['No changes — Old Tax Regime slabs and rates remain unchanged', 'Basic exemption raised from Rs 2.5 lakh to Rs 3 lakh under Old Regime', 'Section 80C limit raised from Rs 1.5 lakh to Rs 2 lakh under Old Regime', 'HRA exemption calculation changed under Old Regime'],`,
  70: `options: ['TDS on interest for senior citizens raised from Rs 50,000 to Rs 1,00,000; TDS on rent raised from Rs 2.4 lakh to Rs 6 lakh', 'TDS on interest for senior citizens raised from Rs 25,000 to Rs 75,000; TDS on rent raised from Rs 1.8 lakh to Rs 3.6 lakh', 'TDS on interest for senior citizens raised from Rs 1,00,000 to Rs 2,00,000; TDS on rent raised from Rs 6 lakh to Rs 12 lakh', 'TDS on interest for all taxpayers raised from Rs 40,000 to Rs 80,000; TDS on rent threshold eliminated'],`,
  71: `options: ['7 customs tariff rates removed (over 7 removed in 2023-24), leaving only 8 rates including zero rate', '5 customs tariff rates removed (over 3 removed in 2023-24), leaving only 10 rates including zero rate', '10 customs tariff rates removed (over 5 removed in 2022-23), leaving only 6 rates including zero rate', '3 customs tariff rates removed (over 7 removed in 2023-24), leaving only 12 rates including zero rate'],`,
  72: `options: ['No corporate tax rate changes — focus was on procedural reforms, transfer pricing, and merger simplification', 'Corporate tax for domestic companies reduced from 22% to 20%', 'Corporate tax for new manufacturing companies reduced from 15% to 12%', 'Minimum Alternate Tax (MAT) eliminated for all companies'],`,
  73: `options: ['ISD scope expanded, Track-and-Trace Mechanism (Section 148A) introduced, ITC on plant/machinery clarified, 10% pre-deposit for penalty appeals', 'GST rate on health insurance reduced from 18% to 5%; annual return threshold raised to Rs 5 crore', 'Composition scheme threshold doubled; e-invoice mandatory for all businesses from FY26', 'GST on EV chargers reduced from 18% to 5%; hotel services standardized at 12%'],`,
  74: `options: ['Rs 50.65 lakh crore (Rs 50,65,345 crore) — 7.4% higher than RE 2024-25', 'Rs 47.16 lakh crore (Rs 47,16,000 crore) — 5.2% higher than RE 2023-24', 'Rs 45.03 lakh crore (Rs 45,03,097 crore) — 3.1% higher than RE 2023-24', 'Rs 53.47 lakh crore (Rs 53,47,315 crore) — 7.7% higher than RE 2025-26'],`,
  75: `options: ['4.4% of GDP — down from 4.8% (RE) in 2024-25 and 5.6% (Actual) in 2023-24', '4.8% of GDP — down from 5.1% (RE) in 2024-25 and 5.9% (Actual) in 2023-24', '4.0% of GDP — down from 4.4% (RE) in 2024-25 and 4.8% (Actual) in 2023-24', '5.1% of GDP — down from 5.8% (RE) in 2024-25 and 6.4% (Actual) in 2023-24'],`,
  76: `options: ['Rs 11.21 lakh crore (3.1% of GDP) — highest ever; effective capex Rs 15.48 lakh crore', 'Rs 10.18 lakh crore (2.9% of GDP) — highest ever; effective capex Rs 13.50 lakh crore', 'Rs 12.22 lakh crore (3.1% of GDP) — highest ever; effective capex Rs 17.14 lakh crore', 'Rs 9.50 lakh crore (2.7% of GDP) — highest ever; effective capex Rs 12.00 lakh crore'],`,
  77: `options: ['10.1% nominal GDP growth', '8.5% nominal GDP growth', '11.5% nominal GDP growth', '9.0% nominal GDP growth'],`,
  78: `options: ['Approximately Rs 1 lakh crore in revenue loss', 'Approximately Rs 50,000 crore in revenue loss', 'Approximately Rs 2 lakh crore in revenue loss', 'Approximately Rs 75,000 crore in revenue loss'],`,
  79: `options: ['Programme covering 100 low-productivity districts, benefiting 1.7 crore farmers — enhances productivity, irrigation, credit', 'Programme covering 50 drought-prone districts, benefiting 0.8 crore farmers — provides crop insurance and subsidized seeds', 'Programme covering 200 tribal districts, benefiting 3 crore farmers — provides training and market linkages', 'Programme covering 75 flood-affected districts, benefiting 1.2 crore farmers — provides irrigation infrastructure'],`,
  80: `options: ['Increased from Rs 3 lakh to Rs 5 lakh under the Modified Interest Subvention Scheme', 'Increased from Rs 2 lakh to Rs 4 lakh under the Kisan Credit Card Scheme', 'Increased from Rs 5 lakh to Rs 7 lakh under the Modified Interest Subvention Scheme', 'Increased from Rs 1 lakh to Rs 3 lakh under the Pradhan Mantri Fasal Bima Yojana'],`,
  81: `options: ['Tur (Arhar), Urad, and Masoor — NAFED and NCCF will procure for 4 years', 'Tur (Arhar), Moong, and Chana — FCI and NAFED will procure for 5 years', 'Urad, Masoor, and Chana — NCCF and CCI will procure for 3 years', 'Tur, Urad, and Moong — NABARD and CCI will procure for 6 years'],`,
  82: `options: ['Bihar — to improve production, processing, and marketing of makhana (fox nuts)', 'Manipur — to improve production, processing, and marketing of bamboo products', 'Assam — to improve production, processing, and marketing of tea and large cardamom', 'Madhya Pradesh — to improve production, processing, and marketing of soyabean'],`,
  83: `options: ['Namrup, Assam — annual capacity of 12.7 lakh metric tons', 'Talcher, Odisha — annual capacity of 15.0 lakh metric tons', 'Ramagundam, Telangana — annual capacity of 10.5 lakh metric tons', 'Gorakhpur, Uttar Pradesh — annual capacity of 12.7 lakh metric tons'],`,
  84: `options: ['Strengthen research ecosystem and make 100+ high-yield seed varieties commercially available', 'Develop 50 drought-resistant seed varieties for rain-fed farming areas', 'Create 200 hybrid seed varieties for rice, wheat, and maize through ICAR', 'Distribute 500 million seed packets to marginal farmers through PM-KISAN beneficiaries'],`,
  85: `options: ['Partnership with states to address rural under-employment through skilling, investment, and technology — Phase 1 covers 100 districts', 'Central scheme to provide direct cash transfers to rural women — Phase 1 covers 50 blocks', 'State-funded programme to build rural infrastructure — Phase 1 covers 200 panchayats', 'Bilateral scheme to train rural youth in agriculture — Phase 1 covers 75 districts'],`,
  86: `options: ['Rs 1.71 lakh crore (21% increase over FY25 RE of Rs 1.41 lakh crore); Agriculture Ministry alone: Rs 1.4 lakh crore', 'Rs 1.41 lakh crore (10% increase over FY25 RE of Rs 1.28 lakh crore); Agriculture Ministry alone: Rs 1.2 lakh crore', 'Rs 1.90 lakh crore (28% increase over FY25 RE of Rs 1.48 lakh crore); Agriculture Ministry alone: Rs 1.6 lakh crore', 'Rs 1.20 lakh crore (5% increase over FY25 RE of Rs 1.14 lakh crore); Agriculture Ministry alone: Rs 1.0 lakh crore'],`,
  87: `options: ['Rs 11.21 lakh crore — with Rs 1.5 lakh crore in interest-free loans to states', 'Rs 9.50 lakh crore — with Rs 1.0 lakh crore in interest-free loans to states', 'Rs 13.00 lakh crore — with Rs 2.0 lakh crore in interest-free loans to states', 'Rs 10.00 lakh crore — with Rs 1.2 lakh crore in interest-free loans to states'],`,
  88: `options: ['Rs 2.52 lakh crore (Rs 2,55,445 crore) — nearly same as FY25; 5% of total expenditure', 'Rs 2.93 lakh crore — 10.8% higher than FY25; 5.5% of total expenditure', 'Rs 2.20 lakh crore — 15% lower than FY25; 4.3% of total expenditure', 'Rs 3.00 lakh crore — 18% higher than FY25; 5.9% of total expenditure'],`,
  89: `options: ['Rs 2.72 lakh crore (Rs 2,87,333 crore) — 3% increase; NHAI: Rs 1.87 lakh crore (11% increase)', 'Rs 3.10 lakh crore (Rs 3,10,000 crore) — 8% increase; NHAI: Rs 2.00 lakh crore (15% increase)', 'Rs 2.45 lakh crore (Rs 2,45,000 crore) — flat; NHAI: Rs 1.68 lakh crore (flat)', 'Rs 2.95 lakh crore (Rs 2,95,000 crore) — 6% increase; NHAI: Rs 1.75 lakh crore (5% increase)'],`,
  90: `options: ['Rs 1 lakh crore fund for Cities as Growth Hubs, Creative Redevelopment, and Water & Sanitation', 'Rs 50,000 crore fund for Smart Cities Expansion, Digital Infrastructure, and Transit-Oriented Development', 'Rs 2 lakh crore fund for Urban Renewal, Metro Connectivity, and Affordable Housing', 'Rs 75,000 crore fund for Industrial Townships, Port-Led Urbanization, and SEZ Expansion'],`,
  91: `options: ['120 new destinations, 4 crore passengers in 10 years — supports smaller airports, helipads in hilly/NE/aspirational districts', '80 new destinations, 2 crore passengers in 5 years — supports Tier-2 city airports only', '200 new destinations, 6 crore passengers in 15 years — all regions including islands', '60 new destinations, 1 crore passengers in 3 years — focus on metro city congestion relief'],`,
  92: `options: ['Extended till 2028 with enhanced outlay of Rs 67,000 crore — focus on quality and O&M of rural piped water', 'Extended till 2026 with enhanced outlay of Rs 45,000 crore — focus on new connections in urban areas', 'Extended till 2030 with enhanced outlay of Rs 90,000 crore — focus on both rural and urban water supply', 'Extended till 2027 with enhanced outlay of Rs 55,000 crore — focus on groundwater recharge'],`,
  93: `options: ['Rs 25,000 crore corpus with 49% government contribution — for long-term maritime financing', 'Rs 10,000 crore corpus with 30% government contribution — for port modernization only', 'Rs 50,000 crore corpus with 51% government contribution — for all maritime and aviation projects', 'Rs 15,000 crore corpus with 25% government contribution — for fisheries infrastructure only'],`,
  94: `options: ['Rs 10 lakh crore target for 2025-2030 — to recycle capital into new infrastructure projects', 'Rs 6 lakh crore target for 2022-2025 — to retire government debt through asset sales', 'Rs 15 lakh crore target for 2025-2030 — for privatization of PSUs and public utilities', 'Rs 8 lakh crore target for 2023-2028 — to fund social sector expenditure through asset monetization'],`,
  95: `options: ['Rs 6,81,210.27 crore — highest among all ministries (13.45% of total budget); 9.53% increase over FY25', 'Rs 5,94,000 crore — highest among all ministries (12.58% of total budget); 7.2% increase over FY25', 'Rs 7,85,000 crore — highest among all ministries (14.67% of total budget); 15.19% increase over FY25', 'Rs 6,00,000 crore — highest among all ministries (11.8% of total budget); 5% increase over FY25'],`,
  96: `options: ['Rs 1,80,000 crore — 26.43% of total defence allocation; 12.9% higher than RE 2024-25', 'Rs 1,50,000 crore — 22% of total defence allocation; 8% higher than RE 2024-25', 'Rs 2,19,306 crore — 27.9% of total defence allocation; 21.84% higher than RE 2024-25', 'Rs 1,20,000 crore — 18% of total defence allocation; 5% higher than RE 2024-25'],`,
  97: `options: ['75% (Rs 1,11,544.83 crore) for domestic sources; Rs 27,886 crore specifically for domestic private industries', '60% (Rs 90,000 crore) for domestic sources; Rs 20,000 crore specifically for domestic private industries', '80% (Rs 1,44,000 crore) for domestic sources; Rs 35,000 crore specifically for domestic private industries', '50% (Rs 75,000 crore) for domestic sources; Rs 15,000 crore specifically for domestic private industries'],`,
  98: `options: ['Rs 1.28 lakh crore — up from RE Rs 1.14 lakh crore in FY25', 'Rs 1.10 lakh crore — up from RE Rs 1.00 lakh crore in FY25', 'Rs 1.39 lakh crore — up from RE Rs 1.28 lakh crore in FY25', 'Rs 1.05 lakh crore — up from RE Rs 0.95 lakh crore in FY25'],`,
  99: `options: ['10,000 seats next year; target 75,000 new medical seats over 5 years', '5,000 seats next year; target 50,000 new medical seats over 5 years', '15,000 seats next year; target 1,00,000 new medical seats over 5 years', '20,000 seats next year; target 75,000 new medical seats over 3 years'],`,
  100: `options: ['Day Care Cancer Centres in all district hospitals in 3 years — 200 centres in FY 2025-26', 'Day Care Cancer Centres in all medical college hospitals in 5 years — 100 centres in FY 2025-26', 'Cancer Research Institutes in each state capital in 2 years — 50 institutes in FY 2025-26', 'Mobile Cancer Screening Units for rural areas — 500 units in FY 2025-26'],`,
  101: `options: ['Rs 99,858.56 crore — 9.78% increase from Rs 90,958.63 crore in FY24', 'Rs 85,000 crore — 5% increase from Rs 81,000 crore in FY24', 'Rs 1,06,530 crore — 8.96% increase from Rs 97,768 crore in FY24', 'Rs 1,10,000 crore — 14% increase from Rs 96,500 crore in FY24'],`,
  102: `options: ['Provide digital-form Indian language books for school and higher education', 'Provide free physical textbooks in regional languages for government school students', 'Develop online translation tools for converting English academic content to Indian languages', 'Set up language laboratories in every district for mother tongue-based learning'],`,
  103: `options: ['Centre of Excellence in Artificial Intelligence for education with Rs 500 crore outlay', 'National AI Research Park with Rs 1,000 crore outlay for academic institutions', 'Digital Innovation Hub for AI with Rs 200 crore outlay at IITs', 'Centre of Excellence in Machine Learning with Rs 750 crore outlay'],`,
  104: `options: ['Term loans up to Rs 2 crore for 5 lakh women, SC, and ST first-time entrepreneurs over 5 years', 'Term loans up to Rs 1 crore for 2 lakh women, SC, and ST first-time entrepreneurs over 3 years', 'Term loans up to Rs 5 crore for 10 lakh women, SC, and ST first-time entrepreneurs over 10 years', 'Term loans up to Rs 50 lakh for 8 lakh women, SC, and ST first-time entrepreneurs over 5 years'],`,
  105: `options: ['Identity cards, e-Shram portal registration, and PM Jan Arogya Yojana (PM-JAY) healthcare for gig workers', 'Pension under PM-SYM and accident insurance coverage for all gig workers', 'ESIC membership and Provident Fund enrollment for all app-based delivery workers', 'Free skill training through PMKVY and monthly income support for gig workers'],`,
  106: `options: ['Enhanced bank loans + UPI-linked credit cards with Rs 30,000 limit + capacity-building support', 'Direct benefit transfer of Rs 10,000 per vendor + free stall setup in municipal markets', 'Micro credit of Rs 50,000 + free digital payment terminal + market linkage support', 'Collateral-free loan of Rs 20,000 + insurance coverage + free training'],`,
  107: `options: ['Rs 15,000 crore fund (Govt + Banks + Private investors) to complete 1 lakh stalled housing units', 'Rs 10,000 crore fund (Govt + NHB) to complete 50,000 stalled housing units', 'Rs 25,000 crore fund (Govt + LIC + Banks) to complete 2 lakh stalled housing units', 'Rs 5,000 crore fund (Govt + Private) to complete 25,000 stalled housing units'],`,
  108: `options: ['Rs 20,000 crore outlay for small modular reactors; target 100 GW nuclear energy by 2047', 'Rs 10,000 crore outlay for nuclear research; target 50 GW nuclear energy by 2035', 'Rs 30,000 crore outlay for all nuclear projects; target 150 GW nuclear energy by 2047', 'Rs 15,000 crore outlay for pressurized water reactors; target 100 GW nuclear energy by 2050'],`,
  109: `options: ['Covers small, medium, and large industries to further "Make in India"', 'Covers only micro and small industries to provide credit and technology support', 'Covers large industries only in electronics and auto sectors under PLI scheme', 'Covers special economic zones and export-oriented units for trade facilitation'],`,
  110: `options: ['Develop foundational geospatial infrastructure — modernize land records, improve urban planning using PM Gati Shakti', 'Deploy satellite mapping for all 6 lakh villages under SVAMITVA scheme extension', 'Create a national digital twin of all major cities for smart infrastructure planning', 'Digitize all revenue records and integrate with Aadhaar for property rights verification'],`,
  111: `options: ['Investment limits enhanced to 2.5 times and turnover limits to 2 times the existing thresholds', 'Investment limits enhanced to 2 times and turnover limits to 1.5 times the existing thresholds', 'Investment limits enhanced to 3 times and turnover limits to 3 times the existing thresholds', 'Investment limits enhanced to 1.5 times and turnover limits to 2.5 times the existing thresholds'],`,
  112: `options: ['Fund of Funds with expanded scope and Rs 10,000 crore additional contribution; Deep Tech Fund of Funds explored', 'Fund of Funds with same scope and Rs 5,000 crore additional contribution; Biotech Fund of Funds approved', 'Fund of Funds dissolved and replaced by direct Rs 20,000 crore startup grant scheme', 'Fund of Funds retained at same level; Rs 10,000 crore new green startup fund announced'],`,
  113: `options: ['To decriminalize over 100 provisions across multiple laws — building on Jan Vishwas Act 2023', 'To decriminalize over 50 provisions in corporate laws — replacing Companies Act 2013 provisions', 'To decriminalize all provisions in FEMA — replacing criminal penalties with civil fines', 'To decriminalize all tax laws — replacing imprisonment clauses with penalty-only provisions'],`,
  114: `options: ['50,000 ATL Labs to bring mass innovation to mainstream', '20,000 ATL Labs to bring innovation to government schools', '1,00,000 ATL Labs across all schools in the country', '10,000 ATL Labs in engineering colleges and polytechnics'],`,
  115: `options: ['Repositioned as large public logistics organization for rural services — leveraging 1.5 lakh rural post offices', 'Repositioned as digital payment bank replacing all rural banks with 1.5 lakh post offices', 'Privatized to deliver e-commerce parcels leveraging 1.5 lakh rural post offices', 'Merged with BSNL to create universal service access points at 1.5 lakh locations'],`,
  116: `options: ['All government secondary schools and primary health centres in rural areas under BharatNet', 'All government primary schools and community health centres under Digital India', 'All AIIMS and medical colleges under NKN (National Knowledge Network)', 'All Gram Panchayat offices and Anganwadi centres under BharatNet'],`,
  117: `options: ['Investment Friendliness Index of states — to be launched in 2025', 'Ease of Living Index for cities — to be launched in 2025', 'Digital Transformation Index of districts — to be launched in 2026', 'State Investment Climate Index — to be launched in 2024'],`,
  118: `options: ['1. Defence (Rs 6.81L cr) 2. Roads (Rs 2.72L cr) 3. Railways (Rs 2.52L cr) 4. Consumer Affairs/Food (Rs 2.2L cr) 5. Rural Development (Rs 1.9L cr)', '1. Finance (Rs 18L cr) 2. Defence (Rs 6.81L cr) 3. Roads (Rs 2.72L cr) 4. Railways (Rs 2.52L cr) 5. Education (Rs 1.28L cr)', '1. Defence (Rs 7.85L cr) 2. Roads (Rs 3.10L cr) 3. Railways (Rs 2.81L cr) 4. Home (Rs 2.55L cr) 5. Consumer Affairs (Rs 2.40L cr)', '1. Roads (Rs 3.10L cr) 2. Defence (Rs 6.81L cr) 3. Railways (Rs 2.52L cr) 4. Agriculture (Rs 1.71L cr) 5. Education (Rs 1.28L cr)'],`,
  119: `options: ['Ministry of Corporate Affairs — 972% rise from Rs 1,078 crore to Rs 11,561 crore', 'Ministry of Coal — 255% rise from Rs 141 crore to Rs 501 crore', 'Ministry of Home Affairs — 128% rise from Rs 1.12L crore to Rs 2.55L crore', 'Ministry of Skill Development — 62% rise from Rs 6,100 crore to Rs 9,886 crore'],`,
  120: `options: ['Customized Credit Cards with Rs 5 lakh limit for Udyam-registered micro enterprises — 10 lakh cards in year 1', 'Working Capital Loans with Rs 2 lakh limit for MSME-registered small enterprises — 25 lakh accounts in year 1', 'Interest-free Credit Lines with Rs 10 lakh limit for Startup India registered firms — 5 lakh cards in year 1', 'Mudra Cards with Rs 1 lakh limit for street vendors registered on PM SVANidhi — 50 lakh cards in year 1'],`,
  121: `options: ['Rs 20,000 crore for private sector-driven Research, Development, and Innovation initiative', 'Rs 10,000 crore for government-funded national R&D centres under DRDO', 'Rs 30,000 crore for public-private partnership in basic science research', 'Rs 5,000 crore for university-industry joint R&D programme under DST'],`,
  122: `options: ['Rs 96,777 crore — approximately 18% increase over previous year', 'Rs 85,522 crore — approximately 49.5% increase over previous year', 'Rs 75,000 crore — approximately 10% increase over previous year', 'Rs 1,10,000 crore — approximately 30% increase over previous year'],`,
  123: `options: ['Total expenditure: Rs 47.16L cr (RE) to Rs 50.65L cr; Fiscal deficit: 4.8% to 4.4%; Tax-free limit: Rs 7L to Rs 12L; KCC: Rs 3L to Rs 5L', 'Total expenditure: Rs 45.03L cr (RE) to Rs 47.16L cr; Fiscal deficit: 5.1% to 4.8%; Tax-free limit: Rs 5L to Rs 7L; KCC: Rs 2L to Rs 3L', 'Total expenditure: Rs 50.65L cr (RE) to Rs 53.47L cr; Fiscal deficit: 4.4% to 4.3%; Tax-free limit: Rs 12L unchanged; KCC: Rs 5L to Rs 6L', 'Total expenditure: Rs 40.00L cr (RE) to Rs 44.00L cr; Fiscal deficit: 6.0% to 5.5%; Tax-free limit: Rs 5L to Rs 8L; KCC: Rs 1.5L to Rs 2L'],`,
  124: `options: ['Zero poverty, 100% quality school education, affordable healthcare, 100% skilled labor, 70% women in economic activity, India as food basket of world', 'Zero unemployment, 100% electrification, universal healthcare, 100% literacy, 50% women in workforce, India as manufacturing hub', 'Zero corruption, 100% digital connectivity, affordable housing, full employment, equal gender pay, India as export leader', 'Zero hunger, 100% clean water, universal education, full employment, 60% women in workforce, India as services hub'],`,
  125: `options: ['R.K. Shanmukham Chetty', 'John Mathai', 'C.D. Deshmukh', 'T.T. Krishnamachari'],`,
  126: `options: ['Morarji Desai — 10 budgets (across two separate tenures, 1959-1969)', 'P. Chidambaram — 9 budgets (across multiple tenures)', 'Nirmala Sitharaman — 9 budgets (consecutive, 2019-2027)', 'Pranab Mukherjee — 8 budgets (across multiple tenures)'],`,
  127: `options: ['2017', '2016', '2014', '2019'],`,
  128: `options: ['Nirmala Sitharaman in July 2019 — a red cloth-wrapped traditional Indian ledger', 'Arun Jaitley in February 2018 — a red cloth-wrapped traditional Indian ledger', 'P. Chidambaram in February 2014 — a saffron cloth-wrapped traditional Indian ledger', 'Pranab Mukherjee in February 2012 — a green cloth-wrapped traditional Indian ledger'],`,
  129: `options: ['Nirmala Sitharaman in 2020 — 2 hours 40 minutes (had to cut short 2 pages due to health)', 'P. Chidambaram in 2008 — 2 hours 45 minutes (uninterrupted)', 'Arun Jaitley in 2017 — 2 hours 35 minutes', 'Pranab Mukherjee in 2012 — 2 hours 30 minutes'],`,
  130: `options: ['Article 112 — Annual Financial Statement laid before both Houses of Parliament', 'Article 110 — Definition of Money Bills presented in Lok Sabha', 'Article 267 — Contingency Fund of India established by Parliament', 'Article 280 — Finance Commission constituted by the President'],`,
  131: `options: ['Traditional sweet-making ceremony at North Block that signals the start of the budget "lock-in period" — officials are confined till budget day', 'Annual budget leak investigation procedure conducted by the Finance Ministry', 'Public ceremony where the Finance Minister distributes sweets to Parliament staff before budget', 'Customs ceremony where the budget documents are sealed and stamped with halwa before printing'],`,
  132: `options: ['Total expenditure minus total receipts (excluding borrowings) = Government\'s total borrowing requirement', 'Revenue expenditure minus revenue receipts = Extent of current spending on borrowed funds', 'Fiscal deficit minus interest payments = Net new borrowing excluding debt servicing', 'Total expenditure minus tax revenue = Share of spending funded by non-tax sources and borrowings'],`,
  133: `options: ['Parliamentary approval to withdraw funds from Consolidated Fund for interim government expenditure (usually 2-3 months) — used before elections', 'Permission granted by the Finance Commission for states to exceed their deficit targets temporarily', 'RBI approval for government to issue emergency bonds when fiscal deficit exceeds 5% of GDP', 'Presidential assent to defer budget presentation during national emergency for up to 6 months'],`,
  134: `options: ['Article 266(1) — All government revenues, loans, and receipts deposited here; withdrawals only with Parliamentary approval', 'Article 267 — Emergency funds held at President\'s disposal for unforeseen expenditure', 'Article 266(2) — Trust funds like provident funds and deposits held for third parties', 'Article 265 — Fund where tax collected without authority of law is deposited'],`,
  135: `options: ['Motion by Lok Sabha members to oppose specific budget allocations — 3 types: Disapproval, Economy, Token. Adoption = no-confidence.', 'Motion by Rajya Sabha members to recommend reduction in defence expenditure — requires President\'s approval', 'Amendment by MPs to transfer budget allocations between ministries — requires Finance Committee approval', 'Privilege motion against Finance Minister for withholding budget information from Parliament'],`,
  136: `options: ['Finance Bill = contains tax proposals from Budget (must pass within 75 days); Money Bill = defined by Art 110 (Speaker certifies)', 'Finance Bill = defined by Art 110 and certified by Speaker; Money Bill = broad term for all fiscal legislation', 'Both Finance Bill and Money Bill are identical — both require joint sitting if Rajya Sabha rejects', 'Finance Bill = presented by Finance Ministry; Money Bill = can be presented by any ministry with fiscal impact'],`,
  137: `options: ['Annual report by Ministry of Finance presented one day before the Budget — reviews economic performance and outlook', 'Annual report by RBI presented one week before the Budget — reviews monetary policy and banking sector', 'Mandatory constitutional document under Art 112 presented along with the Budget', 'Quarterly economic assessment by NITI Aayog presented before the Budget session'],`,
  138: `options: ['Bill that authorizes government to withdraw money from the Consolidated Fund of India for expenditure — presented after Demands for Grants are voted', 'Bill that authorizes RBI to print new currency when government borrowing exceeds fiscal deficit targets', 'Bill that approves privatization of PSUs — presented along with the annual budget proposals', 'Bill that allows government to defer payment of tax refunds when fiscal deficit exceeds 5% of GDP'],`,
}

// ─── INSERT OPTIONS INTO MCQ ENTRIES ─────────────────────────────────────────
for (const [idStr, optionsLine] of Object.entries(optionsMap)) {
  const id = parseInt(idStr)

  // Find the block for this entry (everything from `id: X,` to the next entry or end)
  const entryPattern = new RegExp(`(  \\{[\\s\\S]*?id: ${id},[\\s\\S]*?)(?=  \\{|\\n]\\n)`, 'm')
  const entryMatch = content.match(entryPattern)

  if (entryMatch) {
    const entryText = entryMatch[0]
    if (entryText.includes('questionType:') || entryText.includes('options:')) {
      console.log(`Skipping id ${id} — already has questionType or options`)
      continue
    }
  }

  // Find the pattern: the entry block then insert options before `    shortcut:`
  const searchPattern = new RegExp(
    `(  \\{[^{]*?id: ${id},[\\s\\S]*?)(    shortcut:)`,
    'm'
  )

  const match = searchPattern.exec(content)
  if (match) {
    const before = match[1]
    const shortcutStart = match[2]

    if (before.includes('questionType:') || before.includes('options:')) {
      console.log(`Skipping id ${id} — block has questionType or options`)
      continue
    }

    const replacement = before + `    ${optionsLine}\n` + shortcutStart
    content = content.replace(searchPattern, replacement)
    console.log(`Added options to id ${id}`)
  } else {
    console.log(`WARNING: Could not find entry id ${id}`)
  }
}

// ─── APPEND 20 NEW SSC CGL FORMAT ENTRIES ────────────────────────────────────
const newEntries = `
  // ─── NEW SSC CGL FORMAT ENTRIES: MULTI-STATEMENT (ids 147–151) ─────────────

  {
    id: 147, category: 'Budget Terminology', budgetYear: 'General', topic: 'Revenue Deficit vs Fiscal Deficit',
    questionType: 'multi-statement',
    statements: [
      'Revenue Deficit is the difference between Revenue Expenditure and Revenue Receipts, and indicates that the government is using capital receipts to meet current expenses.',
      'A zero Revenue Deficit means the government is not borrowing to meet its day-to-day operational expenses, which is the ideal target under the FRBM Act.',
    ],
    question: 'Which of the above statement(s) is/are correct?',
    answer: 'Both Statement 1 and Statement 2 are correct',
    options: MULTI_STATEMENT_2_OPTIONS,
    shortcut: 'Revenue Deficit = Rev Exp − Rev Receipts | Zero Rev Deficit = FRBM ideal | Means borrowing only for capital/asset creation',
    detail: 'Both statements are correct. When Revenue Deficit is positive, it means the government is borrowing (capital receipts) to fund current expenditure like salaries, subsidies, interest — which is fiscally unsound. The FRBM Act targets Revenue Deficit = 0% of GDP. In Budget 2025-26: Revenue Deficit = 1.5% of GDP; in 2026-27: 1.5% of GDP. Revenue Deficit < Fiscal Deficit since Fiscal Deficit includes capital account borrowings too.',
    context: 'SSC CGL 2022–24 Recurring', examProb: 'Hot',
  },
  {
    id: 148, category: 'Budget Terminology', budgetYear: 'General', topic: 'GST Council — Multi-Statement',
    questionType: 'multi-statement',
    statements: [
      'The GST Council is a constitutional body established under Article 279A, with the Union Finance Minister as its Chairperson.',
      'Decisions of the GST Council require a three-fourths majority of members present and voting, with the Centre\'s vote having one-third weight and the states\' votes combined having two-thirds weight.',
    ],
    question: 'Which of the above statement(s) is/are correct?',
    answer: 'Both Statement 1 and Statement 2 are correct',
    options: MULTI_STATEMENT_2_OPTIONS,
    shortcut: 'GST Council = Art 279A | FM = Chairperson | 3/4 majority required | Centre = 1/3 weight, States = 2/3 weight | 101st Amend 2016',
    detail: 'Both statements are correct. GST Council was constituted under Article 279A inserted by the 101st Constitutional Amendment Act 2016. Union FM chairs the Council; Union Minister of State for Finance and State Finance Ministers are members. Decisions require 3/4 majority: Centre\'s vote = 1/3, all state votes combined = 2/3 weightage. The Council recommends GST rates, exemptions, and threshold limits.',
    context: 'SSC CGL 2023–24 Recurring', examProb: 'Hot',
  },
  {
    id: 149, category: 'Fiscal Numbers', budgetYear: 'General', topic: 'Finance Commission — Multi-Statement',
    questionType: 'multi-statement',
    statements: [
      'The Finance Commission is constituted by the President of India under Article 280 every five years or earlier if deemed necessary.',
      'The Finance Commission recommends only the distribution of central tax proceeds between the Union and States (vertical devolution) and not the distribution among states themselves (horizontal devolution).',
    ],
    question: 'Which of the above statement(s) is/are correct?',
    answer: 'Only Statement 1 is correct',
    options: MULTI_STATEMENT_2_OPTIONS,
    shortcut: 'FC = Art 280 | President constitutes every 5 years | FC recommends BOTH vertical (Centre↔States) AND horizontal (among states) devolution | Statement 2 is WRONG',
    detail: 'Statement 1 is correct — the Finance Commission is constituted by the President under Art 280, typically every 5 years. Statement 2 is INCORRECT — the Finance Commission recommends BOTH vertical devolution (Centre to States ratio) AND horizontal devolution (how to distribute among states based on criteria like population, area, income distance, forest cover, etc.). Statement 2 incorrectly restricts the FC to only vertical devolution.',
    context: 'SSC CGL 2023–24', examProb: 'High',
  },
  {
    id: 150, category: 'Tax Changes', budgetYear: 'General', topic: 'Direct vs Indirect Tax — Multi-Statement',
    questionType: 'multi-statement',
    statements: [
      'Direct taxes are taxes where the burden cannot be shifted to another person — examples include Income Tax, Corporate Tax, and Capital Gains Tax.',
      'GST is a direct tax because it is collected directly by the Central and State Governments from consumers at the point of purchase.',
    ],
    question: 'Which of the above statement(s) is/are correct?',
    answer: 'Only Statement 1 is correct',
    options: MULTI_STATEMENT_2_OPTIONS,
    shortcut: 'Direct Tax = burden on same person (Income Tax, Corp Tax, CGT) | GST = INDIRECT tax — burden shifts from seller to consumer | Statement 2 is WRONG',
    detail: 'Statement 1 is correct — direct taxes are borne by the person on whom they are levied and cannot be passed on. Income Tax, Corporate Tax, and Capital Gains Tax are classic direct taxes, administered by CBDT. Statement 2 is INCORRECT — GST is an INDIRECT tax. Although collected by the seller and remitted to the government, the burden is ultimately passed on to the consumer through the price. GST falls under the jurisdiction of CBIC, not CBDT. This direct vs indirect tax distinction is a classic SSC CGL question.',
    context: 'SSC CGL 2022–24 Recurring', examProb: 'Hot',
  },
  {
    id: 151, category: 'Budget Terminology', budgetYear: '2025-26', topic: 'Budget 2025-26 Highlights — Multi-Statement',
    questionType: 'multi-statement',
    statements: [
      'In Budget 2025-26, individuals with annual income up to Rs 12 lakh are exempt from income tax under the New Tax Regime due to the enhanced Section 87A rebate of Rs 60,000.',
      'Budget 2025-26 raised the KCC (Kisan Credit Card) loan limit from Rs 3 lakh to Rs 5 lakh and introduced PM Dhan-Dhaanya Krishi Yojana covering 100 low-productivity districts.',
    ],
    question: 'Which of the above statement(s) is/are correct?',
    answer: 'Both Statement 1 and Statement 2 are correct',
    options: MULTI_STATEMENT_2_OPTIONS,
    shortcut: 'Rs 12L tax-free (87A rebate Rs 60K) | KCC: 3L→5L | PM Dhan-Dhaanya = 100 districts | Both correct — 2025-26 highlights',
    detail: 'Both statements are correct. Statement 1: Section 87A rebate raised from Rs 25,000 to Rs 60,000 under New Tax Regime — effectively makes income up to Rs 12 lakh (Rs 12.75 lakh for salaried with standard deduction of Rs 75,000) tax-free. Statement 2: KCC loan limit raised from Rs 3 lakh to Rs 5 lakh under Modified Interest Subvention Scheme — covers 7.7 crore farmers. PM Dhan-Dhaanya Krishi Yojana targets 100 low-productivity districts to benefit 1.7 crore farmers. Both are high-probability questions for SSC CGL 2025-26.',
    context: 'SSC CGL 2025-26 — landmark highlights', examProb: 'Hot',
  },

  // ─── NEW SSC CGL FORMAT ENTRIES: ASSERTION-REASON (ids 152–156) ─────────────

  {
    id: 152, category: 'Budget Terminology', budgetYear: 'General', topic: 'GST — Assertion-Reason',
    questionType: 'assertion-reason',
    assertion: 'GST in India follows the destination-based consumption tax principle rather than the origin-based principle.',
    reason: 'Under GST, tax revenue goes to the state where goods or services are consumed (destination state), not the state where they are produced (origin state).',
    question: 'Choose the correct option regarding the Assertion (A) and Reason (R):',
    answer: 'Both A and R are true, and R is the correct explanation of A',
    options: ASSERTION_REASON_OPTIONS,
    shortcut: 'GST = Destination-based (consumption tax) | Revenue to consumer state | NOT origin/production state | IGST paid to Centre then transferred to destination state',
    detail: 'Both A and R are true and R correctly explains A. GST replaced origin-based VAT with destination-based taxation. When goods/services cross state borders, IGST is levied by the Centre and then transferred to the consuming state. This resolved the pre-GST problem where producing states captured revenue. E.g., if Tamil Nadu manufactures a product but a consumer in UP buys it, UP gets the GST revenue. This was a fundamental shift that addressed revenue imbalances across states.',
    context: 'SSC CGL 2023–24 Recurring', examProb: 'Hot',
  },
  {
    id: 153, category: 'Budget Terminology', budgetYear: 'General', topic: 'Capital Expenditure Multiplier — Assertion-Reason',
    questionType: 'assertion-reason',
    assertion: 'Capital expenditure by the government is generally considered more productive than revenue expenditure from a long-term economic growth perspective.',
    reason: 'Capital expenditure creates physical and social infrastructure (roads, ports, hospitals) that enhances productive capacity, while revenue expenditure mainly covers current operational costs like salaries and subsidies.',
    question: 'Choose the correct option regarding the Assertion (A) and Reason (R):',
    answer: 'Both A and R are true, and R is the correct explanation of A',
    options: ASSERTION_REASON_OPTIONS,
    shortcut: 'Capex = asset creation = higher multiplier effect | Rev exp = operational costs, subsidies | Both A and R correct | Budget 2026-27 capex = Rs 12.22L cr (3.1% GDP)',
    detail: 'Both A and R are true and R correctly explains A. Capital expenditure (roads, railways, ports, digital infrastructure) has a higher fiscal multiplier — typically 2.5x compared to revenue expenditure multiplier of ~0.9x. The government has been consistently raising capex: Rs 2L cr (FY15) → Rs 10.18L cr (FY25 RE) → Rs 11.21L cr (FY26) → Rs 12.22L cr (FY27). Revenue expenditure on subsidies, salaries, and interest payments does not directly create productive assets.',
    context: 'SSC CGL 2023–24', examProb: 'High',
  },
  {
    id: 154, category: 'Fiscal Numbers', budgetYear: 'General', topic: 'FRBM Escape Clause — Assertion-Reason',
    questionType: 'assertion-reason',
    assertion: 'During the COVID-19 pandemic (2020-21 and 2021-22), India\'s fiscal deficit significantly exceeded the FRBM Act\'s target of 3% of GDP.',
    reason: 'The FRBM Act 2003 contains an "escape clause" that allows the government to deviate from fiscal targets during national calamities, national security threats, or structural reforms with measurable fiscal implications.',
    question: 'Choose the correct option regarding the Assertion (A) and Reason (R):',
    answer: 'Both A and R are true, and R is the correct explanation of A',
    options: ASSERTION_REASON_OPTIONS,
    shortcut: 'COVID → FD exceeded 3% (reached 9.2% in FY21) | FRBM escape clause used | Both A and R correct | NK Singh committee added escape clause in 2018 amendment',
    detail: 'Both A and R are true and R is the correct explanation. India\'s fiscal deficit reached 9.2% of GDP in FY 2020-21 (COVID year) — well above the 3% FRBM target. The escape clause (added via 2018 FRBM Amendment based on NK Singh committee recommendation) permits deviations of up to 0.5% for national calamity, security threats, or structural reforms. COVID was treated as a national calamity invoking the escape clause. Glide path to return to 3% has been maintained: 6.4% (FY22) → 5.6% (FY23) → 4.8% (FY25) → 4.4% (FY26) → 4.3% (FY27).',
    context: 'SSC CGL 2022–24', examProb: 'High',
  },
  {
    id: 155, category: 'Budget Terminology', budgetYear: 'General', topic: 'RBI Monetary Policy — Assertion-Reason',
    questionType: 'assertion-reason',
    assertion: 'Raising the Repo Rate by the RBI tends to reduce inflation in the economy.',
    reason: 'When RBI raises the Repo Rate, commercial banks face higher borrowing costs, which leads them to raise their lending rates, reducing credit growth, consumer spending, and investment — ultimately curbing demand-pull inflation.',
    question: 'Choose the correct option regarding the Assertion (A) and Reason (R):',
    answer: 'Both A and R are true, and R is the correct explanation of A',
    options: ASSERTION_REASON_OPTIONS,
    shortcut: 'Repo ↑ → Bank lending rates ↑ → Credit ↓ → Spending ↓ → Inflation ↓ | Transmission mechanism | MPC (6 members) sets repo rate | Both A and R correct',
    detail: 'Both A and R are true and R correctly explains A. The RBI\'s Monetary Policy Committee (MPC) uses the Repo Rate as its primary tool. Rate hike transmission: Repo ↑ → MCLR ↑ → EMIs ↑ → Credit demand ↓ → Consumption ↓ → Aggregate demand ↓ → Inflation ↓. India\'s MPC raised repo rate from 4% (May 2022) to 6.5% (Feb 2023) to combat post-COVID inflation. The rate cycle turned in Feb 2025 with a 25 bps cut. Inflation target: 4% (+/- 2%) under Inflation Targeting framework since 2016.',
    context: 'SSC CGL 2023–24 Recurring', examProb: 'Hot',
  },
  {
    id: 156, category: 'Budget Basics & History', budgetYear: '2026-27', topic: 'Budget 2026-27 — Assertion-Reason',
    questionType: 'assertion-reason',
    assertion: 'The Union Budget 2026-27 maintained the same income tax slab rates as Budget 2025-26 without any changes.',
    reason: 'The government had already introduced significant tax relief in Budget 2025-26 (effective exemption up to Rs 12 lakh) and chose to focus Budget 2026-27 on structural reforms like the new Income Tax Act 2025 instead of further rate changes.',
    question: 'Choose the correct option regarding the Assertion (A) and Reason (R):',
    answer: 'Both A and R are true, but R is NOT the correct explanation of A',
    options: ASSERTION_REASON_OPTIONS,
    shortcut: 'A = TRUE: slabs unchanged in 2026-27 | R = TRUE: IT Act 2025 is a structural reform | BUT R does not EXPLAIN why slabs were unchanged — policy decision, not logical consequence | Select option 2',
    detail: 'A is true: Budget 2026-27 kept tax slabs and standard deduction unchanged. R is also true: IT Act 2025 replacing the 1961 Act is indeed a structural reform focus. However, R does not EXPLAIN A — the decision to keep slabs unchanged was a fiscal policy choice (revenue considerations, revenue loss already Rs 1L cr from FY26 reform), not a consequence of introducing a new tax act. The correct answer is option 2: Both A and R are true, but R is NOT the correct explanation of A.',
    context: 'SSC CGL 2026-27', examProb: 'High',
  },

  // ─── NEW SSC CGL FORMAT ENTRIES: MATCH-FOLLOWING (ids 157–161) ──────────────

  {
    id: 157, category: 'Budget Terminology', budgetYear: 'General', topic: 'Budget Terms — Match the Following',
    questionType: 'match-following',
    matchLeft: ['Fiscal Deficit', 'Revenue Deficit', 'Primary Deficit', 'Effective Revenue Deficit'],
    matchRight: [
      'Fiscal Deficit minus interest payments on previous borrowings',
      'Fiscal Deficit minus grants for creation of capital assets',
      'Revenue Expenditure minus Revenue Receipts',
      'Total Expenditure minus Total Receipts (excluding borrowings)',
    ],
    question: 'Match the budget deficit terms (Column A) with their correct definitions (Column B):',
    answer: '1-d, 2-c, 3-a, 4-b',
    options: ['1-d, 2-c, 3-a, 4-b', '1-c, 2-d, 3-b, 4-a', '1-d, 2-c, 3-b, 4-a', '1-a, 2-c, 3-d, 4-b'],
    shortcut: 'FD = Total Exp − Receipts(excl. borrowings) | RevD = Rev Exp − Rev Receipts | Primary D = FD − Interest | Effective RevD = FD − Capital Grants',
    detail: 'Fiscal Deficit (1-d): Total Expenditure minus Total Receipts excluding borrowings — shows government borrowing requirement. Revenue Deficit (2-c): Revenue Expenditure minus Revenue Receipts — shows extent of current spending from borrowed funds. Primary Deficit (3-a): Fiscal Deficit minus interest payments — shows fresh borrowing excluding debt servicing. Effective Revenue Deficit (4-b): Revenue Deficit minus grants for capital asset creation — concept introduced in 2011-12 Union Budget.',
    context: 'SSC CGL 2022–24 Recurring', examProb: 'Hot',
  },
  {
    id: 158, category: 'Tax Changes', budgetYear: 'General', topic: 'Tax Types — Match the Following',
    questionType: 'match-following',
    matchLeft: ['Income Tax', 'GST', 'Securities Transaction Tax (STT)', 'Custom Duty'],
    matchRight: [
      'Levied on purchase/sale of securities listed on stock exchanges',
      'Tax on import/export of goods at international borders',
      'Indirect multi-stage tax on supply of goods and services (replaced VAT, service tax)',
      'Direct tax levied on individual/corporate income; administered by CBDT',
    ],
    question: 'Match the taxes (Column A) with their correct description (Column B):',
    answer: '1-d, 2-c, 3-a, 4-b',
    options: ['1-d, 2-c, 3-a, 4-b', '1-c, 2-d, 3-b, 4-a', '1-d, 2-a, 3-c, 4-b', '1-b, 2-c, 3-a, 4-d'],
    shortcut: 'Income Tax = direct (CBDT) | GST = indirect multi-stage | STT = securities transactions | Custom Duty = import/export border tax',
    detail: 'Income Tax (1-d): Direct tax on income, administered by CBDT under Income Tax Act 1961 (being replaced by IT Act 2025). GST (2-c): Indirect tax on supply of goods/services implemented from 1 July 2017 — replaced 17+ central/state taxes. STT (3-a): Tax on purchase/sale of securities; raised in Budget 2026-27 (Futures: 0.02%→0.05%). Custom Duty (4-b): Tax on cross-border movement of goods; administered by CBIC. All four are standard SSC CGL tax questions.',
    context: 'SSC CGL 2022–24 Recurring', examProb: 'Hot',
  },
  {
    id: 159, category: 'Fiscal Numbers', budgetYear: '2025-26', topic: 'Budget 2025-26 Allocations — Match the Following',
    questionType: 'match-following',
    matchLeft: ['Ministry of Defence', 'Ministry of Railways', 'Ministry of Road Transport & Highways', 'Ministry of Education'],
    matchRight: [
      'Rs 2.72 lakh crore (3% increase; NHAI: Rs 1.87 lakh crore)',
      'Rs 1.28 lakh crore (5 IITs expansion; AI Centre of Excellence)',
      'Rs 6.81 lakh crore (13.45% of total budget; 9.53% increase)',
      'Rs 2.52 lakh crore (essentially flat vs FY25; 5% of total expenditure)',
    ],
    question: 'Match the ministries (Column A) with their correct Budget 2025-26 allocation details (Column B):',
    answer: '1-c, 2-d, 3-a, 4-b',
    options: ['1-c, 2-d, 3-a, 4-b', '1-d, 2-c, 3-b, 4-a', '1-c, 2-a, 3-d, 4-b', '1-b, 2-d, 3-a, 4-c'],
    shortcut: 'Defence=6.81L | Railways=2.52L | Roads=2.72L | Education=1.28L | Remember: Defence > Roads > Railways > Education',
    detail: 'Defence (1-c): Rs 6.81L cr — largest ministry allocation, 13.45% of total budget. Railways (2-d): Rs 2.52L cr — essentially flat vs previous year, 5% of total expenditure. Roads (3-a): Rs 2.72L cr with 3% increase; NHAI got Rs 1.87L cr (+11%). Education (4-b): Rs 1.28L cr — up from RE Rs 1.14L cr; includes AI Centre of Excellence at Rs 500 crore and expansion of 5 IITs. All four ministry allocations are high-frequency SSC CGL topics.',
    context: 'SSC CGL 2025-26', examProb: 'Hot',
  },
  {
    id: 160, category: 'Budget Terminology', budgetYear: 'General', topic: 'Constitutional Provisions — Match the Following',
    questionType: 'match-following',
    matchLeft: ['Article 112', 'Article 110', 'Article 280', 'Article 267'],
    matchRight: [
      'Contingency Fund of India — at President\'s disposal for unforeseen expenditure',
      'Finance Commission — constituted by President to recommend tax sharing',
      'Annual Financial Statement (Union Budget) — laid before both Houses of Parliament',
      'Money Bill — certified by the Speaker of Lok Sabha',
    ],
    question: 'Match the Constitutional Articles (Column A) with the correct budget-related provisions (Column B):',
    answer: '1-c, 2-d, 3-b, 4-a',
    options: ['1-c, 2-d, 3-b, 4-a', '1-d, 2-c, 3-a, 4-b', '1-b, 2-d, 3-c, 4-a', '1-c, 2-a, 3-b, 4-d'],
    shortcut: 'Art 112=Budget | Art 110=Money Bill | Art 280=Finance Commission | Art 267=Contingency Fund | Also: Art 266=Consolidated+Public Account | Art 114=Appropriation Bill',
    detail: 'Article 112 (1-c): Mandates Annual Financial Statement = the "Budget." Article 110 (2-d): Defines Money Bills — certified by the Speaker. Article 280 (3-b): Finance Commission constituted by President every 5 years — recommends tax sharing. Article 267 (4-a): Contingency Fund of India — Rs 500 crore corpus at President\'s disposal for unforeseen expenditure without Parliamentary approval. Also important: Art 265 (no tax without law), Art 266 (Consolidated Fund and Public Account), Art 114 (Appropriation Bill).',
    context: 'SSC CGL Recurring', examProb: 'Recurring',
  },
  {
    id: 161, category: 'New Schemes & Missions', budgetYear: '2026-27', topic: 'Budget 2026-27 Schemes — Match the Following',
    questionType: 'match-following',
    matchLeft: ['Biopharma SHAKTI', 'VB-G RAM G', 'Bharat VISTAAR', 'SHE Mart'],
    matchRight: [
      'Community-owned retail outlets for women-led SHG enterprises in rural areas',
      'AI-powered multilingual agricultural advisory tool for farmers (helpline: 155261)',
      'Rs 10,000 crore scheme to develop India as global biopharma hub for biologics and biosimilars',
      'Replacement for MGNREGA guaranteeing 125 days of rural employment per household',
    ],
    question: 'Match the Budget 2026-27 schemes (Column A) with their correct description (Column B):',
    answer: '1-c, 2-d, 3-b, 4-a',
    options: ['1-c, 2-d, 3-b, 4-a', '1-d, 2-c, 3-a, 4-b', '1-c, 2-b, 3-d, 4-a', '1-a, 2-d, 3-b, 4-c'],
    shortcut: 'SHAKTI=biopharma Rs 10K cr | VB-G RAM G=125 days employment | VISTAAR=AI agri tool 155261 | SHE Mart=women SHG retail',
    detail: 'Biopharma SHAKTI (1-c): Strategy for Healthcare Advancement through Knowledge, Technology, and Innovation — Rs 10,000 crore over 5 years. VB-G RAM G (2-d): Viksit Bharat-Guarantee For Rozgar And Ajeevika Mission Gramin — replaced MGNREGA from Dec 2025 with 125 days guarantee (up from 100 days). Bharat VISTAAR (3-b): Virtually Integrated System to Access Agricultural Resources — AI tool with helpline 155261, assistant "Bharati." SHE Mart (4-a): Self-Help Entrepreneur Marts — community-owned retail outlets within cluster-level SHG federations.',
    context: 'SSC CGL 2026-27', examProb: 'Hot',
  },

  // ─── NEW SSC CGL FORMAT ENTRIES: SEQUENCE (ids 162–166) ─────────────────────

  {
    id: 162, category: 'Fiscal Numbers', budgetYear: 'General', topic: 'Fiscal Deficit Consolidation Path — Sequence',
    questionType: 'sequence',
    statements: [
      'Fiscal Deficit at 9.2% of GDP (COVID emergency year)',
      'Fiscal Deficit at 4.4% of GDP (Budget 2025-26)',
      'Fiscal Deficit at 5.6% of GDP (actual, FY 2023-24)',
      'Fiscal Deficit at 6.4% of GDP (actual, FY 2021-22)',
    ],
    question: 'Arrange the following fiscal deficit milestones in DESCENDING order (highest deficit first, most recent last where equal):',
    answer: '1-4-3-2',
    options: ['1-4-3-2', '4-1-3-2', '1-3-4-2', '4-3-1-2'],
    shortcut: 'Highest to lowest: 9.2%(FY21) > 6.4%(FY22) > 5.6%(FY24) > 4.4%(FY26) | Glide path from COVID peak back to FRBM compliance',
    detail: 'Fiscal deficit consolidation path (highest to lowest): 9.2% in FY 2020-21 (COVID year, escape clause invoked) → 6.4% in FY 2021-22 (recovery spending) → 5.6% in FY 2023-24 (actual, normalizing) → 4.4% in FY 2025-26. The glide path continues: 4.3% (FY27) with long-term target of 3% under FRBM. This sequence captures India\'s fiscal consolidation after the COVID shock.',
    context: 'SSC CGL 2022–24 Recurring', examProb: 'High',
  },
  {
    id: 163, category: 'Fiscal Numbers', budgetYear: 'General', topic: 'Finance Commissions — Chronological Sequence',
    questionType: 'sequence',
    statements: [
      '13th Finance Commission (2010-15) — chaired by Vijay Kelkar',
      '14th Finance Commission (2015-20) — chaired by Y.V. Reddy; recommended 42% devolution',
      '15th Finance Commission (2021-26) — chaired by N.K. Singh; recommended 41% devolution',
      '16th Finance Commission (2026-31) — chaired by Arvind Panagariya',
    ],
    question: 'Arrange the Finance Commissions in CHRONOLOGICAL order (earliest to latest):',
    answer: '1-2-3-4',
    options: ['1-2-3-4', '2-1-4-3', '3-4-1-2', '4-3-2-1'],
    shortcut: '13th FC (Kelkar, 2010-15) → 14th FC (Y.V. Reddy, 2015-20, 42%) → 15th FC (N.K. Singh, 2021-26, 41%) → 16th FC (Panagariya, 2026-31)',
    detail: 'Chronological order: 13th Finance Commission (2010-15) chaired by Vijay Kelkar — recommended 32% devolution. 14th Finance Commission (2015-20) chaired by Y.V. Reddy — landmark recommendation of 42% devolution (highest ever). 15th Finance Commission (2021-26) chaired by N.K. Singh — 41% devolution (1% reduction for J&K UT). 16th Finance Commission (2026-31) chaired by Arvind Panagariya — retained 41%, added GDP contribution criterion (10% weight).',
    context: 'SSC CGL Recurring', examProb: 'Recurring',
  },
  {
    id: 164, category: 'Tax Changes', budgetYear: 'General', topic: 'GST Rate Slabs — Ascending Order Sequence',
    questionType: 'sequence',
    statements: [
      '12% — standard goods like processed foods, computers, business class air travel',
      '5% — essential goods like edible oils, medicines, economy air travel',
      '28% — luxury/demerit goods like automobiles, tobacco, aerated drinks, casinos',
      '18% — most services, electronics, capital goods',
    ],
    question: 'Arrange the GST slabs in ASCENDING order of rate (lowest to highest):',
    answer: '2-1-4-3',
    options: ['2-1-4-3', '1-2-3-4', '2-1-3-4', '1-2-4-3'],
    shortcut: 'GST slabs ascending: 5% → 12% → 18% → 28% | Zero-rated = exports + essential items | 0%: food grains, fresh vegetables | Cess on 28% for luxury/sin goods',
    detail: 'GST slabs in ascending order: 5% (essential items — medicines, edible oils, economy tickets), 12% (processed foods, computers, business travel), 18% (most services, electronics, capital goods — largest revenue category), 28% (luxury/demerit goods — top-end cars, tobacco, aerated drinks, casinos). Zero-rated: food grains, fresh vegetables, exports. Compensation cess applies on 28% slab items above base rate. GST Council (57 meetings as of 2024) has progressively rationalized rates from 5 slabs to more streamlined structure.',
    context: 'SSC CGL 2022–24 Recurring', examProb: 'Hot',
  },
  {
    id: 165, category: 'Budget Basics & History', budgetYear: 'General', topic: 'Insurance FDI Timeline — Sequence',
    questionType: 'sequence',
    statements: [
      'FDI limit raised to 74% under Insurance Amendment Act 2021',
      'Insurance sector opened to 26% FDI under IRDA Act amendment in 2000',
      'FDI limit raised to 100% under Sabka Bima Sabki Raksha Act 2025',
      'FDI limit raised to 49% under Insurance Amendment Act 2015',
    ],
    question: 'Arrange the insurance sector FDI milestones in CHRONOLOGICAL order (earliest first):',
    answer: '2-4-1-3',
    options: ['2-4-1-3', '4-2-1-3', '2-1-4-3', '1-2-4-3'],
    shortcut: '26% (2000) → 49% (2015) → 74% (2021) → 100% (2025) | Each liberalization = new act | Condition for 100%: invest all premium in India',
    detail: 'Insurance FDI liberalization timeline: 26% (2000) — insurance sector first opened to private and foreign investment via IRDA Act. 49% (2015) — Insurance Laws (Amendment) Act 2015. 74% (2021) — Insurance Amendment Act 2021. 100% (2025) — Sabka Bima Sabki Raksha (Amendment of Insurance Laws) Act 2025 notified 21 December 2025, with condition that all premium income must be invested in India. India aims for "Insurance for All by 2047."',
    context: 'SSC CGL 2026-27', examProb: 'Hot',
  },
  {
    id: 166, category: 'Fiscal Numbers', budgetYear: 'General', topic: 'Capital Expenditure Growth — Sequence',
    questionType: 'sequence',
    statements: [
      'Rs 10.18 lakh crore capital expenditure (RE FY 2024-25)',
      'Rs 2 lakh crore capital expenditure (FY 2014-15)',
      'Rs 11.21 lakh crore capital expenditure (Budget FY 2025-26)',
      'Rs 12.22 lakh crore capital expenditure (Budget FY 2026-27)',
    ],
    question: 'Arrange the capital expenditure milestones in ASCENDING order (lowest to highest):',
    answer: '2-1-3-4',
    options: ['2-1-3-4', '1-2-3-4', '2-3-1-4', '1-3-2-4'],
    shortcut: 'Capex ascending: Rs 2L cr (FY15) → Rs 10.18L cr (FY25 RE) → Rs 11.21L cr (FY26 BE) → Rs 12.22L cr (FY27 BE) | 6x increase in a decade | Modi govt capex push',
    detail: 'Capital expenditure growth (ascending): Rs 2 lakh crore (FY 2014-15, starting point) → Rs 10.18 lakh crore (RE FY 2024-25) → Rs 11.21 lakh crore (BE FY 2025-26, +10.1%) → Rs 12.22 lakh crore (BE FY 2026-27, +11.5%). This represents a 6x increase in government capital expenditure over 12 years, reflecting the Modi government\'s infrastructure investment push. Effective capex (including grants for capital creation): Rs 15.48L cr (FY26) → Rs 17.14L cr (FY27).',
    context: 'SSC CGL 2026-27', examProb: 'Hot',
  },
`

// Insert new entries before the closing ] of budgetData
content = content.replace(
  /(\n]\n\n\nexport const budgetPYQHistory)/,
  newEntries + '\n$1'
)

writeFileSync(filePath, content, 'utf8')
console.log('\nDone! File written successfully.')
console.log('- Added options to MCQ entries 1-138')
console.log('- Added 20 new SSC CGL format entries (ids 147-166)')
