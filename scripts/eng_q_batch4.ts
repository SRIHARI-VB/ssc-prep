/**
 * English Language — Batch 4: Cloze Test & Reading Comprehension
 *
 * 18 passages (8 cloze + 10 comprehension)
 * 90 questions (40 cloze ids 601-640, 50 RC ids 641-690)
 */

import type { PassageEntry, EnglishQuestion } from '../src/topics/english/data'

// ── Passages ─────────────────────────────────────────────────────────────

export const passages_batch: PassageEntry[] = [
  // ── Cloze Passages (ids 1-8) ──────────────────────────────────────────
  {
    id: 1,
    title: 'Environmental Conservation',
    text: 'The environment is our most ___(1)___ resource. Without clean air and water, human life would be ___(2)___. Deforestation has ___(3)___ many problems including soil erosion and loss of biodiversity. Governments around the world are ___(4)___ new policies to protect natural habitats. Every individual must take ___(5)___ to reduce their carbon footprint. Simple actions like planting trees, conserving water, and using renewable energy sources can collectively bring about a significant change. Environmental education plays a vital role in making citizens aware of the consequences of ecological degradation.',
    type: 'cloze' as const,
    level: 'Easy' as const,
    questionIds: [601, 602, 603, 604, 605],
  },
  {
    id: 2,
    title: 'Digital Revolution',
    text: 'Technology has ___(1)___ the way we live and work. The internet provides instant ___(2)___ to information from around the globe. Artificial intelligence is being used to solve ___(3)___ problems in healthcare, agriculture, and education. However, excessive dependence on technology can lead to ___(4)___ consequences such as data breaches and loss of privacy. It is important that governments ___(5)___ strong regulations to ensure that technological progress benefits everyone equally. Digital literacy programs must reach rural communities so that the advantages of modern technology are not limited to urban centres alone.',
    type: 'cloze' as const,
    level: 'Medium' as const,
    questionIds: [606, 607, 608, 609, 610],
  },
  {
    id: 3,
    title: 'Indian Economic Growth',
    text: 'India is one of the fastest ___(1)___ economies in the world. The service sector has become the largest ___(2)___ to the nation\'s GDP. Foreign direct investment has played a ___(3)___ role in boosting industrial output and employment. Despite impressive growth, challenges such as income ___(4)___ and rural poverty remain significant. The government has launched several ___(5)___ aimed at financial inclusion and skill development for the youth. Programmes like Make in India and Startup India have encouraged entrepreneurship and manufacturing across diverse sectors of the economy.',
    type: 'cloze' as const,
    level: 'Medium' as const,
    questionIds: [611, 612, 613, 614, 615],
  },
  {
    id: 4,
    title: 'Public Health Awareness',
    text: 'Good health is the ___(1)___ of a productive life. A balanced diet, regular exercise, and adequate sleep are ___(2)___ for maintaining physical and mental well-being. Communicable diseases can be ___(3)___ through vaccination and proper hygiene practices. The government has expanded healthcare ___(4)___ to remote areas through programmes like Ayushman Bharat. Citizens must take ___(5)___ of their health by attending regular check-ups and avoiding harmful habits such as smoking and excessive consumption of processed food.',
    type: 'cloze' as const,
    level: 'Easy' as const,
    questionIds: [616, 617, 618, 619, 620],
  },
  {
    id: 5,
    title: 'Education and National Development',
    text: 'Education is the most ___(1)___ tool for transforming a nation. A well-educated population contributes to economic growth, social harmony, and ___(2)___ advancement. The National Education Policy 2020 aims to make learning more ___(3)___ and multidisciplinary. Teachers play an ___(4)___ role in shaping the future of students by encouraging critical thinking and creativity. Investing in education is not merely an expenditure but a long-term ___(5)___ that yields returns for generations. Digital classrooms and online learning platforms have further broadened access to quality education across India.',
    type: 'cloze' as const,
    level: 'Easy' as const,
    questionIds: [621, 622, 623, 624, 625],
  },
  {
    id: 6,
    title: 'India\'s Space Programme',
    text: 'India\'s space programme has achieved ___(1)___ milestones in recent decades. The Indian Space Research Organisation successfully launched the Mars Orbiter Mission, making India the first Asian nation to ___(2)___ Mars orbit on its maiden attempt. Satellite technology has been ___(3)___ used for weather forecasting, disaster management, and telecommunications. The Chandrayaan missions have deepened our ___(4)___ of the lunar surface. Private participation in the space sector is expected to ___(5)___ innovation and reduce launch costs significantly. ISRO\'s cost-effective approach has earned global recognition and numerous international contracts.',
    type: 'cloze' as const,
    level: 'Medium' as const,
    questionIds: [626, 627, 628, 629, 630],
  },
  {
    id: 7,
    title: 'Indian Cultural Heritage',
    text: 'India\'s cultural heritage is remarkably ___(1)___ and spans thousands of years. Classical dance forms such as Bharatanatyam and Kathak have been ___(2)___ from generation to generation. Festivals like Diwali, Eid, and Christmas reflect the ___(3)___ fabric of Indian society. Traditional crafts and textiles continue to be a source of livelihood for millions of ___(4)___. Preserving cultural heritage is essential because it strengthens national ___(5)___ and provides a sense of belonging. UNESCO has recognised several Indian sites and traditions as part of the world\'s intangible cultural heritage.',
    type: 'cloze' as const,
    level: 'Easy' as const,
    questionIds: [631, 632, 633, 634, 635],
  },
  {
    id: 8,
    title: 'Agricultural Modernisation',
    text: 'Agriculture remains the ___(1)___ of India\'s rural economy and employs nearly half the workforce. Modern farming techniques such as drip irrigation and precision agriculture have ___(2)___ crop yields considerably. However, many small farmers still lack ___(3)___ to credit, quality seeds, and market information. Government initiatives like the Pradhan Mantri Fasal Bima Yojana provide ___(4)___ coverage against crop failure. Sustainable farming practices are necessary to ensure food ___(5)___ for a growing population while protecting the soil and water resources for future generations.',
    type: 'cloze' as const,
    level: 'Medium' as const,
    questionIds: [636, 637, 638, 639, 640],
  },

  // ── Comprehension Passages (ids 9-18) ──────────────────────────────────
  {
    id: 9,
    title: 'Fundamental Rights and the Indian Constitution',
    text: 'The Indian Constitution, adopted on 26 January 1950, is the longest written constitution in the world. Part III of the Constitution guarantees Fundamental Rights to every citizen, including the right to equality, freedom of speech and expression, and protection against exploitation. These rights are justiciable, meaning that citizens can approach the courts if their rights are violated. However, Fundamental Rights are not absolute; they are subject to reasonable restrictions imposed by the State in the interest of public order, morality, and national security. Article 32 empowers citizens to move the Supreme Court directly for enforcement of these rights, and Dr. B. R. Ambedkar called it the very soul of the Constitution. The balance between individual liberty and collective welfare is a recurring theme in constitutional jurisprudence.',
    type: 'comprehension' as const,
    level: 'Medium' as const,
    questionIds: [641, 642, 643, 644, 645],
  },
  {
    id: 10,
    title: 'Economic Planning and Development in India',
    text: 'India adopted a mixed economy model after independence, combining elements of both capitalism and socialism. The Planning Commission, established in 1950, formulated Five-Year Plans to guide economic development. These plans focused on industrialisation, agricultural growth, and social welfare. In 2015, the Planning Commission was replaced by NITI Aayog, which emphasises cooperative federalism and bottom-up planning. India\'s economic liberalisation in 1991 opened the doors to foreign investment and global trade, leading to rapid GDP growth. Despite significant progress, challenges like unemployment, inflation, and regional disparities persist. The government continues to pursue inclusive growth through targeted programmes such as MGNREGA, which guarantees 100 days of employment to rural households, and the Goods and Services Tax reform, which unified the nation\'s indirect tax structure.',
    type: 'comprehension' as const,
    level: 'Medium' as const,
    questionIds: [646, 647, 648, 649, 650],
  },
  {
    id: 11,
    title: 'Advances in Biotechnology',
    text: 'Biotechnology has emerged as a transformative field with applications in medicine, agriculture, and environmental management. Genetically modified crops, such as Bt cotton, have helped farmers reduce pesticide usage and increase yields. In the medical sector, biotechnology has enabled the development of vaccines, gene therapies, and diagnostic tools that were previously unimaginable. India\'s biotechnology industry has grown rapidly, with the country becoming a major producer of generic medicines and vaccines. The COVID-19 pandemic highlighted the importance of biotechnology when Indian companies developed and manufactured vaccines at an unprecedented scale. However, ethical concerns surrounding genetic modification, biosafety, and equitable access to biotechnological products remain subjects of intense debate. Regulatory frameworks must evolve to keep pace with scientific discoveries while safeguarding public interest.',
    type: 'comprehension' as const,
    level: 'Hard' as const,
    questionIds: [651, 652, 653, 654, 655],
  },
  {
    id: 12,
    title: 'Gender Equality and Social Progress',
    text: 'Gender equality is both a fundamental human right and a prerequisite for sustainable development. India has made considerable strides in improving female literacy, workforce participation, and political representation. Legislation such as the Protection of Women from Domestic Violence Act and the Maternity Benefit Amendment Act have strengthened the legal framework for women\'s rights. Initiatives like Beti Bachao Beti Padhao have raised awareness about the value of the girl child. Despite these efforts, challenges such as gender-based violence, wage disparity, and low representation in senior management positions continue to persist. Achieving true gender equality requires not only legal reform but also a shift in societal attitudes and cultural norms. Education and economic empowerment are widely regarded as the most effective pathways toward closing the gender gap.',
    type: 'comprehension' as const,
    level: 'Medium' as const,
    questionIds: [656, 657, 658, 659, 660],
  },
  {
    id: 13,
    title: 'Climate Change and Global Cooperation',
    text: 'Climate change poses one of the gravest threats to humanity in the twenty-first century. Rising sea levels, extreme weather events, and disruptions to agriculture endanger the livelihoods of billions. The Paris Agreement of 2015 marked a historic commitment by nearly 200 nations to limit global warming to well below two degrees Celsius above pre-industrial levels. India has pledged to achieve net-zero carbon emissions by 2070 and has significantly expanded its renewable energy capacity, particularly in solar and wind power. The International Solar Alliance, co-founded by India, seeks to mobilise investment in solar energy across tropical nations. Critics argue that developed nations must bear greater responsibility for historical emissions and provide financial support to developing countries. Balancing economic growth with environmental sustainability remains the central challenge of climate diplomacy.',
    type: 'comprehension' as const,
    level: 'Hard' as const,
    questionIds: [661, 662, 663, 664, 665],
  },
  {
    id: 14,
    title: 'The National Education Policy 2020',
    text: 'The National Education Policy 2020 represents a comprehensive overhaul of India\'s education system, replacing the thirty-four-year-old policy of 1986. It introduces a new 5+3+3+4 curricular structure that replaces the traditional 10+2 system, aiming to align schooling with cognitive development stages. The policy emphasises mother-tongue instruction in early years, multidisciplinary higher education, and the integration of vocational training from grade six onward. It also proposes the establishment of a single regulatory body for higher education, excluding medical and legal studies. The policy envisions raising public expenditure on education to six per cent of GDP. Critics have raised concerns about implementation challenges, funding gaps, and the capacity of state governments to execute such sweeping reforms uniformly. Nevertheless, the policy has been widely praised for its progressive vision and focus on holistic, competency-based learning.',
    type: 'comprehension' as const,
    level: 'Medium' as const,
    questionIds: [666, 667, 668, 669, 670],
  },
  {
    id: 15,
    title: 'Digital India and Governance',
    text: 'The Digital India programme, launched in 2015, aims to transform the country into a digitally empowered society and knowledge economy. Its three core components are digital infrastructure, digital governance, and digital empowerment of citizens. The Aadhaar biometric identification system has become the backbone of direct benefit transfers, eliminating intermediaries and reducing leakage in welfare schemes. The Unified Payments Interface has revolutionised financial transactions, processing billions of transactions monthly and enabling small merchants to accept digital payments effortlessly. E-governance platforms like DigiLocker and UMANG have simplified access to government services. However, concerns about digital exclusion in rural areas, cybersecurity threats, and data privacy have prompted calls for a robust legislative framework. The Digital Personal Data Protection Act seeks to address some of these challenges by establishing clear rules for data collection and processing.',
    type: 'comprehension' as const,
    level: 'Medium' as const,
    questionIds: [671, 672, 673, 674, 675],
  },
  {
    id: 16,
    title: 'ISRO and India\'s Space Ambitions',
    text: 'The Indian Space Research Organisation has established India as a major player in global space exploration. Founded in 1969, ISRO has achieved several landmark successes, including the Chandrayaan and Mangalyaan missions. The Polar Satellite Launch Vehicle has become one of the most reliable launch systems in the world, deploying satellites for numerous countries at competitive costs. The Gaganyaan programme aims to send Indian astronauts to low Earth orbit, marking the nation\'s entry into human spaceflight. ISRO\'s satellite constellation provides critical services in communication, navigation, remote sensing, and disaster warning. The opening of the space sector to private companies through the Indian National Space Promotion and Authorisation Centre is expected to accelerate innovation. Despite budget constraints, ISRO\'s frugal engineering approach has consistently delivered results that rival those of agencies with far larger budgets.',
    type: 'comprehension' as const,
    level: 'Hard' as const,
    questionIds: [676, 677, 678, 679, 680],
  },
  {
    id: 17,
    title: 'Universal Healthcare and Ayushman Bharat',
    text: 'Access to affordable healthcare remains a pressing concern in India, where out-of-pocket medical expenses push millions into poverty each year. The Ayushman Bharat Pradhan Mantri Jan Arogya Yojana, launched in 2018, is the world\'s largest government-funded health insurance scheme. It provides coverage of up to five lakh rupees per family per year for secondary and tertiary hospitalisation to over fifty crore beneficiaries. The scheme has significantly reduced the financial burden on vulnerable families and improved access to quality treatment at empanelled hospitals. Alongside insurance, the creation of Health and Wellness Centres aims to strengthen primary healthcare delivery across the country. Challenges such as the shortage of trained medical professionals, inadequate infrastructure in rural areas, and variations in implementation across states continue to hinder the goal of universal health coverage.',
    type: 'comprehension' as const,
    level: 'Medium' as const,
    questionIds: [681, 682, 683, 684, 685],
  },
  {
    id: 18,
    title: 'India\'s Foreign Policy and Multilateralism',
    text: 'India\'s foreign policy has evolved significantly since independence, guided by principles of non-alignment, peaceful coexistence, and strategic autonomy. As a founding member of the Non-Aligned Movement, India sought to maintain independence from Cold War power blocs. In the contemporary era, India pursues a multi-alignment strategy, building partnerships with the United States, Russia, Japan, and European nations simultaneously. India is an active participant in multilateral forums such as the United Nations, G20, BRICS, and the Shanghai Cooperation Organisation. Its presidency of the G20 in 2023 highlighted themes of inclusive growth and digital public infrastructure. Neighbourhood diplomacy remains central, with initiatives like the Act East Policy and connectivity projects aimed at strengthening ties with South and Southeast Asian nations. Balancing relationships with major powers while safeguarding national interests continues to define India\'s diplomatic approach in an increasingly multipolar world.',
    type: 'comprehension' as const,
    level: 'Hard' as const,
    questionIds: [686, 687, 688, 689, 690],
  },
]

// ── Questions ────────────────────────────────────────────────────────────

export const batch4: EnglishQuestion[] = [
  // ═══════════════════════════════════════════════════════════════════════
  // CLOZE TEST QUESTIONS (ids 601-640)
  // ═══════════════════════════════════════════════════════════════════════

  // ── Passage 1: Environmental Conservation ─────────────────────────────
  { id: 601, qtype: 'cloze-test', question: 'Choose the best word for blank (1).', options: ['precious', 'dangerous', 'artificial', 'harmful'], answer: 'precious', explanation: 'The sentence describes the environment as a resource we must protect, so "precious" (valuable) fits best.', level: 'Easy', tier: 'tier2', examProb: 'Hot', passageId: 1 },
  { id: 602, qtype: 'cloze-test', question: 'Choose the best word for blank (2).', options: ['impossible', 'effortless', 'irrelevant', 'abundant'], answer: 'impossible', explanation: 'Without clean air and water, life would be "impossible" — the sentence stresses how essential these resources are.', level: 'Easy', tier: 'tier2', examProb: 'Hot', passageId: 1 },
  { id: 603, qtype: 'cloze-test', question: 'Choose the best word for blank (3).', options: ['caused', 'solved', 'avoided', 'celebrated'], answer: 'caused', explanation: 'Deforestation leads to problems; "caused" correctly shows the negative consequence.', level: 'Easy', tier: 'tier2', examProb: 'Hot', passageId: 1 },
  { id: 604, qtype: 'cloze-test', question: 'Choose the best word for blank (4).', options: ['implementing', 'ignoring', 'abolishing', 'criticising'], answer: 'implementing', explanation: 'Governments enact protective measures, so "implementing" (putting into effect) is the correct choice.', level: 'Easy', tier: 'tier2', examProb: 'Hot', passageId: 1 },
  { id: 605, qtype: 'cloze-test', question: 'Choose the best word for blank (5).', options: ['responsibility', 'credit', 'revenge', 'offence'], answer: 'responsibility', explanation: '"Take responsibility" is the correct collocation meaning to accept one\'s duty.', level: 'Easy', tier: 'tier2', examProb: 'Hot', passageId: 1 },

  // ── Passage 2: Digital Revolution ──────────────────────────────────────
  { id: 606, qtype: 'cloze-test', question: 'Choose the best word for blank (1).', options: ['transformed', 'distorted', 'neglected', 'concealed'], answer: 'transformed', explanation: 'Technology has drastically changed our lives; "transformed" captures this positive, large-scale change.', level: 'Medium', tier: 'tier2', examProb: 'Hot', passageId: 2 },
  { id: 607, qtype: 'cloze-test', question: 'Choose the best word for blank (2).', options: ['access', 'barrier', 'decline', 'obstacle'], answer: 'access', explanation: 'The internet gives us the ability to reach information instantly; "access" is the correct noun here.', level: 'Medium', tier: 'tier2', examProb: 'Hot', passageId: 2 },
  { id: 608, qtype: 'cloze-test', question: 'Choose the best word for blank (3).', options: ['complex', 'simple', 'imaginary', 'trivial'], answer: 'complex', explanation: 'AI addresses difficult, multifaceted problems; "complex" accurately describes such challenges.', level: 'Medium', tier: 'tier2', examProb: 'Confirmed', passageId: 2 },
  { id: 609, qtype: 'cloze-test', question: 'Choose the best word for blank (4).', options: ['adverse', 'beneficial', 'neutral', 'pleasant'], answer: 'adverse', explanation: 'Data breaches and loss of privacy are negative outcomes; "adverse" means unfavourable.', level: 'Medium', tier: 'tier2', examProb: 'Confirmed', passageId: 2 },
  { id: 610, qtype: 'cloze-test', question: 'Choose the best word for blank (5).', options: ['enforce', 'withdraw', 'overlook', 'postpone'], answer: 'enforce', explanation: 'Governments need to put regulations into practice; "enforce" means to compel compliance with rules.', level: 'Medium', tier: 'tier2', examProb: 'Hot', passageId: 2 },

  // ── Passage 3: Indian Economic Growth ──────────────────────────────────
  { id: 611, qtype: 'cloze-test', question: 'Choose the best word for blank (1).', options: ['growing', 'shrinking', 'stagnant', 'declining'], answer: 'growing', explanation: '"Fastest growing economies" is the standard phrase describing India\'s rapid economic expansion.', level: 'Medium', tier: 'tier2', examProb: 'Hot', passageId: 3 },
  { id: 612, qtype: 'cloze-test', question: 'Choose the best word for blank (2).', options: ['contributor', 'obstacle', 'detractor', 'competitor'], answer: 'contributor', explanation: 'The service sector adds most to GDP, making "contributor" the appropriate word.', level: 'Medium', tier: 'tier2', examProb: 'Hot', passageId: 3 },
  { id: 613, qtype: 'cloze-test', question: 'Choose the best word for blank (3).', options: ['crucial', 'negligible', 'destructive', 'minimal'], answer: 'crucial', explanation: 'FDI has been very important for growth; "crucial" means extremely important or essential.', level: 'Medium', tier: 'tier2', examProb: 'Confirmed', passageId: 3 },
  { id: 614, qtype: 'cloze-test', question: 'Choose the best word for blank (4).', options: ['inequality', 'equality', 'surplus', 'harmony'], answer: 'inequality', explanation: 'Income inequality is a well-known challenge in developing economies and fits the context of persistent problems.', level: 'Medium', tier: 'both', examProb: 'Hot', passageId: 3 },
  { id: 615, qtype: 'cloze-test', question: 'Choose the best word for blank (5).', options: ['initiatives', 'obstacles', 'restrictions', 'penalties'], answer: 'initiatives', explanation: 'The government has launched programmes and schemes; "initiatives" refers to planned actions for a specific purpose.', level: 'Medium', tier: 'tier2', examProb: 'Hot', passageId: 3 },

  // ── Passage 4: Public Health Awareness ─────────────────────────────────
  { id: 616, qtype: 'cloze-test', question: 'Choose the best word for blank (1).', options: ['foundation', 'destruction', 'imitation', 'opposition'], answer: 'foundation', explanation: 'Health is the base upon which a productive life is built; "foundation" conveys this meaning.', level: 'Easy', tier: 'tier2', examProb: 'Hot', passageId: 4 },
  { id: 617, qtype: 'cloze-test', question: 'Choose the best word for blank (2).', options: ['essential', 'unnecessary', 'harmful', 'optional'], answer: 'essential', explanation: 'Diet, exercise, and sleep are necessary for well-being; "essential" means absolutely necessary.', level: 'Easy', tier: 'tier2', examProb: 'Hot', passageId: 4 },
  { id: 618, qtype: 'cloze-test', question: 'Choose the best word for blank (3).', options: ['prevented', 'promoted', 'ignored', 'encouraged'], answer: 'prevented', explanation: 'Vaccination and hygiene stop diseases from spreading; "prevented" is the correct verb.', level: 'Easy', tier: 'tier2', examProb: 'Confirmed', passageId: 4 },
  { id: 619, qtype: 'cloze-test', question: 'Choose the best word for blank (4).', options: ['services', 'profits', 'restrictions', 'entertainment'], answer: 'services', explanation: '"Healthcare services" is the standard collocation for medical facilities and treatment provided to people.', level: 'Easy', tier: 'both', examProb: 'Hot', passageId: 4 },
  { id: 620, qtype: 'cloze-test', question: 'Choose the best word for blank (5).', options: ['care', 'advantage', 'notice', 'charge'], answer: 'care', explanation: '"Take care of their health" is the correct idiomatic expression meaning to look after one\'s well-being.', level: 'Easy', tier: 'tier2', examProb: 'Hot', passageId: 4 },

  // ── Passage 5: Education and National Development ──────────────────────
  { id: 621, qtype: 'cloze-test', question: 'Choose the best word for blank (1).', options: ['powerful', 'expensive', 'outdated', 'decorative'], answer: 'powerful', explanation: 'Education as a transformative force is best described as "powerful."', level: 'Easy', tier: 'tier2', examProb: 'Hot', passageId: 5 },
  { id: 622, qtype: 'cloze-test', question: 'Choose the best word for blank (2).', options: ['technological', 'geographical', 'emotional', 'physical'], answer: 'technological', explanation: 'The sentence lists economic growth, social harmony, and a third type of advancement; "technological" fits the context of national progress.', level: 'Easy', tier: 'tier2', examProb: 'Confirmed', passageId: 5 },
  { id: 623, qtype: 'cloze-test', question: 'Choose the best word for blank (3).', options: ['flexible', 'rigid', 'expensive', 'complicated'], answer: 'flexible', explanation: 'NEP 2020 aims for adaptable, student-centred learning; "flexible" captures this intent.', level: 'Easy', tier: 'tier2', examProb: 'Hot', passageId: 5 },
  { id: 624, qtype: 'cloze-test', question: 'Choose the best word for blank (4).', options: ['indispensable', 'insignificant', 'optional', 'harmful'], answer: 'indispensable', explanation: 'Teachers are absolutely necessary; "indispensable" means too important to do without.', level: 'Medium', tier: 'tier2', examProb: 'Hot', passageId: 5 },
  { id: 625, qtype: 'cloze-test', question: 'Choose the best word for blank (5).', options: ['investment', 'liability', 'expense', 'burden'], answer: 'investment', explanation: 'Spending on education yields long-term returns, making it an "investment" rather than a mere cost.', level: 'Easy', tier: 'both', examProb: 'Hot', passageId: 5 },

  // ── Passage 6: India's Space Programme ─────────────────────────────────
  { id: 626, qtype: 'cloze-test', question: 'Choose the best word for blank (1).', options: ['remarkable', 'insignificant', 'questionable', 'ordinary'], answer: 'remarkable', explanation: 'India\'s space achievements are extraordinary; "remarkable" means worthy of attention or notable.', level: 'Medium', tier: 'tier2', examProb: 'Hot', passageId: 6 },
  { id: 627, qtype: 'cloze-test', question: 'Choose the best word for blank (2).', options: ['reach', 'leave', 'avoid', 'abandon'], answer: 'reach', explanation: 'ISRO successfully entered Mars orbit; "reach" means to arrive at a destination.', level: 'Medium', tier: 'tier2', examProb: 'Hot', passageId: 6 },
  { id: 628, qtype: 'cloze-test', question: 'Choose the best word for blank (3).', options: ['extensively', 'rarely', 'carelessly', 'reluctantly'], answer: 'extensively', explanation: 'Satellites are widely used across many sectors; "extensively" means to a great extent.', level: 'Medium', tier: 'tier2', examProb: 'Confirmed', passageId: 6 },
  { id: 629, qtype: 'cloze-test', question: 'Choose the best word for blank (4).', options: ['understanding', 'confusion', 'neglect', 'destruction'], answer: 'understanding', explanation: 'Chandrayaan missions have improved our knowledge; "understanding" fits the context of scientific research.', level: 'Medium', tier: 'tier2', examProb: 'Hot', passageId: 6 },
  { id: 630, qtype: 'cloze-test', question: 'Choose the best word for blank (5).', options: ['accelerate', 'hinder', 'delay', 'prevent'], answer: 'accelerate', explanation: 'Private participation speeds up innovation; "accelerate" means to increase the rate of progress.', level: 'Medium', tier: 'both', examProb: 'Hot', passageId: 6 },

  // ── Passage 7: Indian Cultural Heritage ────────────────────────────────
  { id: 631, qtype: 'cloze-test', question: 'Choose the best word for blank (1).', options: ['diverse', 'uniform', 'limited', 'modern'], answer: 'diverse', explanation: 'India\'s culture is characterised by variety; "diverse" means showing great variety.', level: 'Easy', tier: 'tier2', examProb: 'Hot', passageId: 7 },
  { id: 632, qtype: 'cloze-test', question: 'Choose the best word for blank (2).', options: ['passed', 'hidden', 'denied', 'abandoned'], answer: 'passed', explanation: '"Passed from generation to generation" is the correct expression for cultural transmission.', level: 'Easy', tier: 'tier2', examProb: 'Hot', passageId: 7 },
  { id: 633, qtype: 'cloze-test', question: 'Choose the best word for blank (3).', options: ['secular', 'hostile', 'exclusive', 'monotonous'], answer: 'secular', explanation: 'Festivals of multiple religions reflect India\'s secular (non-sectarian, inclusive) social character.', level: 'Medium', tier: 'tier2', examProb: 'Confirmed', passageId: 7 },
  { id: 634, qtype: 'cloze-test', question: 'Choose the best word for blank (4).', options: ['artisans', 'soldiers', 'politicians', 'spectators'], answer: 'artisans', explanation: 'Traditional crafts provide livelihood to skilled craftspeople; "artisans" is the correct term.', level: 'Easy', tier: 'tier2', examProb: 'Hot', passageId: 7 },
  { id: 635, qtype: 'cloze-test', question: 'Choose the best word for blank (5).', options: ['identity', 'conflict', 'isolation', 'rivalry'], answer: 'identity', explanation: 'Cultural heritage contributes to a sense of who we are as a nation; "identity" captures this meaning.', level: 'Easy', tier: 'tier2', examProb: 'Hot', passageId: 7 },

  // ── Passage 8: Agricultural Modernisation ──────────────────────────────
  { id: 636, qtype: 'cloze-test', question: 'Choose the best word for blank (1).', options: ['backbone', 'weakness', 'luxury', 'burden'], answer: 'backbone', explanation: '"Backbone of the economy" is a common expression meaning the most important supporting part.', level: 'Medium', tier: 'tier2', examProb: 'Hot', passageId: 8 },
  { id: 637, qtype: 'cloze-test', question: 'Choose the best word for blank (2).', options: ['improved', 'reduced', 'eliminated', 'ignored'], answer: 'improved', explanation: 'Modern techniques enhance production; "improved" means made better.', level: 'Medium', tier: 'tier2', examProb: 'Hot', passageId: 8 },
  { id: 638, qtype: 'cloze-test', question: 'Choose the best word for blank (3).', options: ['access', 'aversion', 'immunity', 'indifference'], answer: 'access', explanation: 'Small farmers cannot easily obtain credit and resources; "access" means the ability to use or obtain something.', level: 'Medium', tier: 'tier2', examProb: 'Confirmed', passageId: 8 },
  { id: 639, qtype: 'cloze-test', question: 'Choose the best word for blank (4).', options: ['insurance', 'entertainment', 'punishment', 'advertisement'], answer: 'insurance', explanation: 'PMFBY provides crop insurance; "insurance coverage" is the standard phrase for financial protection against loss.', level: 'Medium', tier: 'tier2', examProb: 'Hot', passageId: 8 },
  { id: 640, qtype: 'cloze-test', question: 'Choose the best word for blank (5).', options: ['security', 'scarcity', 'waste', 'luxury'], answer: 'security', explanation: '"Food security" is the standard term for reliable access to sufficient, affordable, nutritious food.', level: 'Medium', tier: 'both', examProb: 'Hot', passageId: 8 },

  // ═══════════════════════════════════════════════════════════════════════
  // READING COMPREHENSION QUESTIONS (ids 641-690)
  // ═══════════════════════════════════════════════════════════════════════

  // ── Passage 9: Fundamental Rights and the Indian Constitution ──────────
  { id: 641, qtype: 'reading-comprehension', question: 'What is the main idea of the passage?', options: ['The Supreme Court is the most powerful institution in India', 'Fundamental Rights are absolute and cannot be restricted', 'The Indian Constitution guarantees Fundamental Rights with reasonable restrictions', 'Dr. B. R. Ambedkar single-handedly drafted the Constitution'], answer: 'The Indian Constitution guarantees Fundamental Rights with reasonable restrictions', explanation: 'The passage discusses how Part III provides Fundamental Rights that are justiciable but subject to reasonable restrictions in the interest of public order and security.', level: 'Medium', tier: 'tier2', examProb: 'Hot', passageId: 9 },
  { id: 642, qtype: 'reading-comprehension', question: 'Which article allows citizens to approach the Supreme Court for enforcement of Fundamental Rights?', options: ['Article 14', 'Article 19', 'Article 21', 'Article 32'], answer: 'Article 32', explanation: 'The passage specifically states that Article 32 empowers citizens to move the Supreme Court directly.', level: 'Easy', tier: 'tier2', examProb: 'Confirmed', passageId: 9 },
  { id: 643, qtype: 'reading-comprehension', question: 'What does the word "justiciable" mean in the context of the passage?', options: ['Optional and advisory', 'Enforceable through courts of law', 'Only applicable to government officials', 'Subject to parliamentary approval'], answer: 'Enforceable through courts of law', explanation: 'The passage explains that justiciable means citizens can approach the courts if their rights are violated.', level: 'Medium', tier: 'tier2', examProb: 'Hot', passageId: 9 },
  { id: 644, qtype: 'reading-comprehension', question: 'On what grounds can the State impose restrictions on Fundamental Rights?', options: ['Economic development and trade', 'Public order, morality, and national security', 'Political convenience and administrative ease', 'International treaties and agreements'], answer: 'Public order, morality, and national security', explanation: 'The passage mentions that restrictions can be imposed in the interest of public order, morality, and national security.', level: 'Medium', tier: 'both', examProb: 'Hot', passageId: 9 },
  { id: 645, qtype: 'reading-comprehension', question: 'Who called Article 32 the very soul of the Constitution?', options: ['Jawaharlal Nehru', 'Mahatma Gandhi', 'Dr. B. R. Ambedkar', 'Sardar Vallabhbhai Patel'], answer: 'Dr. B. R. Ambedkar', explanation: 'The passage directly attributes this statement to Dr. B. R. Ambedkar.', level: 'Easy', tier: 'tier2', examProb: 'Confirmed', passageId: 9 },

  // ── Passage 10: Economic Planning and Development ──────────────────────
  { id: 646, qtype: 'reading-comprehension', question: 'What replaced the Planning Commission in 2015?', options: ['Reserve Bank of India', 'NITI Aayog', 'Finance Commission', 'National Development Council'], answer: 'NITI Aayog', explanation: 'The passage states that the Planning Commission was replaced by NITI Aayog in 2015.', level: 'Easy', tier: 'tier2', examProb: 'Hot', passageId: 10 },
  { id: 647, qtype: 'reading-comprehension', question: 'What is the primary purpose of MGNREGA as described in the passage?', options: ['Providing free education to rural children', 'Guaranteeing 100 days of employment to rural households', 'Offering subsidised healthcare to farmers', 'Building infrastructure in urban areas'], answer: 'Guaranteeing 100 days of employment to rural households', explanation: 'The passage specifically mentions that MGNREGA guarantees 100 days of employment to rural households.', level: 'Easy', tier: 'tier2', examProb: 'Confirmed', passageId: 10 },
  { id: 648, qtype: 'reading-comprehension', question: 'What does the passage suggest about India\'s economic model after independence?', options: ['It was purely capitalist', 'It was entirely socialist', 'It combined elements of capitalism and socialism', 'It rejected all forms of planning'], answer: 'It combined elements of capitalism and socialism', explanation: 'The passage clearly states that India adopted a mixed economy model combining both capitalism and socialism.', level: 'Medium', tier: 'tier2', examProb: 'Hot', passageId: 10 },
  { id: 649, qtype: 'reading-comprehension', question: 'What does NITI Aayog emphasise according to the passage?', options: ['Centralised decision-making', 'Cooperative federalism and bottom-up planning', 'Military modernisation', 'Agricultural subsidies'], answer: 'Cooperative federalism and bottom-up planning', explanation: 'The passage mentions that NITI Aayog emphasises cooperative federalism and bottom-up planning.', level: 'Medium', tier: 'both', examProb: 'Hot', passageId: 10 },
  { id: 650, qtype: 'reading-comprehension', question: 'Which reform unified India\'s indirect tax structure?', options: ['Demonetisation', 'MGNREGA', 'Goods and Services Tax', 'Economic liberalisation of 1991'], answer: 'Goods and Services Tax', explanation: 'The passage states that the GST reform unified the nation\'s indirect tax structure.', level: 'Easy', tier: 'tier2', examProb: 'Confirmed', passageId: 10 },

  // ── Passage 11: Advances in Biotechnology ──────────────────────────────
  { id: 651, qtype: 'reading-comprehension', question: 'What is the tone of the passage?', options: ['Entirely optimistic and celebratory', 'Balanced, acknowledging both benefits and concerns', 'Pessimistic and critical of biotechnology', 'Humorous and light-hearted'], answer: 'Balanced, acknowledging both benefits and concerns', explanation: 'The passage discusses positive applications of biotechnology but also raises ethical concerns and debates.', level: 'Hard', tier: 'tier2', examProb: 'Hot', passageId: 11 },
  { id: 652, qtype: 'reading-comprehension', question: 'How has Bt cotton benefited farmers according to the passage?', options: ['By increasing land area under cultivation', 'By reducing pesticide usage and increasing yields', 'By eliminating the need for irrigation', 'By providing higher market prices'], answer: 'By reducing pesticide usage and increasing yields', explanation: 'The passage states that Bt cotton has helped farmers reduce pesticide usage and increase yields.', level: 'Medium', tier: 'tier2', examProb: 'Hot', passageId: 11 },
  { id: 653, qtype: 'reading-comprehension', question: 'What event highlighted the importance of biotechnology according to the passage?', options: ['The Green Revolution', 'The COVID-19 pandemic', 'The discovery of penicillin', 'The Human Genome Project'], answer: 'The COVID-19 pandemic', explanation: 'The passage states that the COVID-19 pandemic highlighted biotechnology\'s importance when Indian companies developed vaccines at an unprecedented scale.', level: 'Easy', tier: 'tier2', examProb: 'Confirmed', passageId: 11 },
  { id: 654, qtype: 'reading-comprehension', question: 'What does the word "unprecedented" imply in the context of the passage?', options: ['Slow and gradual', 'Never done before at such a scale', 'Completely expected', 'Legally prohibited'], answer: 'Never done before at such a scale', explanation: '"Unprecedented" means never having happened or existed before, emphasising the extraordinary speed and scale of vaccine production.', level: 'Medium', tier: 'tier2', examProb: 'Hot', passageId: 11 },
  { id: 655, qtype: 'reading-comprehension', question: 'Which of the following is NOT mentioned as a concern about biotechnology?', options: ['Ethical issues around genetic modification', 'Biosafety risks', 'Equitable access to products', 'Increasing unemployment in the IT sector'], answer: 'Increasing unemployment in the IT sector', explanation: 'The passage mentions ethics, biosafety, and equitable access as concerns, but does not mention IT-sector unemployment.', level: 'Medium', tier: 'both', examProb: 'Confirmed', passageId: 11 },

  // ── Passage 12: Gender Equality and Social Progress ────────────────────
  { id: 656, qtype: 'reading-comprehension', question: 'What is the central argument of the passage?', options: ['Gender equality has been fully achieved in India', 'Legal reforms alone are sufficient for gender equality', 'True gender equality requires both legal reform and societal change', 'Women\'s empowerment is only an economic issue'], answer: 'True gender equality requires both legal reform and societal change', explanation: 'The passage argues that achieving gender equality needs not just laws but also a shift in attitudes and cultural norms.', level: 'Medium', tier: 'tier2', examProb: 'Hot', passageId: 12 },
  { id: 657, qtype: 'reading-comprehension', question: 'Which initiative is mentioned for raising awareness about the girl child?', options: ['Swachh Bharat Abhiyan', 'Digital India', 'Beti Bachao Beti Padhao', 'Make in India'], answer: 'Beti Bachao Beti Padhao', explanation: 'The passage specifically mentions Beti Bachao Beti Padhao as an initiative to raise awareness about the value of the girl child.', level: 'Easy', tier: 'tier2', examProb: 'Hot', passageId: 12 },
  { id: 658, qtype: 'reading-comprehension', question: 'According to the passage, what are the most effective pathways toward closing the gender gap?', options: ['Military conscription and national service', 'Education and economic empowerment', 'Stricter law enforcement and surveillance', 'International pressure and sanctions'], answer: 'Education and economic empowerment', explanation: 'The passage states that education and economic empowerment are widely regarded as the most effective pathways.', level: 'Medium', tier: 'tier2', examProb: 'Hot', passageId: 12 },
  { id: 659, qtype: 'reading-comprehension', question: 'Which of the following challenges is NOT mentioned in the passage?', options: ['Gender-based violence', 'Wage disparity', 'Low representation in senior management', 'Lack of voting rights for women'], answer: 'Lack of voting rights for women', explanation: 'The passage lists gender-based violence, wage disparity, and low senior-level representation, but not voting rights.', level: 'Easy', tier: 'both', examProb: 'Confirmed', passageId: 12 },
  { id: 660, qtype: 'reading-comprehension', question: 'The word "prerequisite" in the passage most nearly means:', options: ['An unnecessary luxury', 'A condition required beforehand', 'An unintended consequence', 'A temporary measure'], answer: 'A condition required beforehand', explanation: '"Prerequisite" means something required as a prior condition; gender equality is described as necessary for sustainable development.', level: 'Medium', tier: 'tier2', examProb: 'Hot', passageId: 12 },

  // ── Passage 13: Climate Change and Global Cooperation ──────────────────
  { id: 661, qtype: 'reading-comprehension', question: 'What is the Paris Agreement\'s goal as described in the passage?', options: ['Eliminating all fossil fuels by 2030', 'Limiting global warming to well below two degrees Celsius', 'Providing free solar panels to every household', 'Banning industrial production in developing nations'], answer: 'Limiting global warming to well below two degrees Celsius', explanation: 'The passage states that the Paris Agreement aims to limit warming to well below two degrees Celsius above pre-industrial levels.', level: 'Medium', tier: 'tier2', examProb: 'Hot', passageId: 13 },
  { id: 662, qtype: 'reading-comprehension', question: 'By what year has India pledged to achieve net-zero carbon emissions?', options: ['2030', '2050', '2060', '2070'], answer: '2070', explanation: 'The passage clearly states India\'s pledge to achieve net-zero emissions by 2070.', level: 'Easy', tier: 'tier2', examProb: 'Confirmed', passageId: 13 },
  { id: 663, qtype: 'reading-comprehension', question: 'What is the purpose of the International Solar Alliance?', options: ['To replace the United Nations', 'To mobilise investment in solar energy across tropical nations', 'To impose sanctions on polluting countries', 'To develop nuclear energy in Asia'], answer: 'To mobilise investment in solar energy across tropical nations', explanation: 'The passage states that the ISA seeks to mobilise investment in solar energy across tropical nations.', level: 'Medium', tier: 'tier2', examProb: 'Hot', passageId: 13 },
  { id: 664, qtype: 'reading-comprehension', question: 'What do critics argue about climate responsibility?', options: ['Developing nations should bear all the costs', 'Climate change is not real', 'Developed nations must bear greater responsibility for historical emissions', 'Individual action is more important than government policy'], answer: 'Developed nations must bear greater responsibility for historical emissions', explanation: 'The passage notes that critics argue developed nations should take more responsibility and provide financial support.', level: 'Hard', tier: 'tier2', examProb: 'Hot', passageId: 13 },
  { id: 665, qtype: 'reading-comprehension', question: 'The word "gravest" in the passage is closest in meaning to:', options: ['Lightest', 'Most serious', 'Most amusing', 'Most temporary'], answer: 'Most serious', explanation: '"Gravest" is the superlative of "grave," meaning most serious or severe.', level: 'Easy', tier: 'both', examProb: 'Confirmed', passageId: 13 },

  // ── Passage 14: The National Education Policy 2020 ─────────────────────
  { id: 666, qtype: 'reading-comprehension', question: 'What curricular structure does NEP 2020 introduce?', options: ['10+2 system', '8+4 system', '5+3+3+4 system', '6+3+3 system'], answer: '5+3+3+4 system', explanation: 'The passage states that NEP 2020 introduces a 5+3+3+4 structure replacing the 10+2 system.', level: 'Easy', tier: 'tier2', examProb: 'Hot', passageId: 14 },
  { id: 667, qtype: 'reading-comprehension', question: 'What percentage of GDP does NEP 2020 envision for public expenditure on education?', options: ['Three per cent', 'Four per cent', 'Five per cent', 'Six per cent'], answer: 'Six per cent', explanation: 'The passage mentions that the policy envisions raising public expenditure to six per cent of GDP.', level: 'Easy', tier: 'tier2', examProb: 'Confirmed', passageId: 14 },
  { id: 668, qtype: 'reading-comprehension', question: 'What does NEP 2020 recommend for early years of schooling?', options: ['English-only instruction', 'Mother-tongue instruction', 'Computer-based learning exclusively', 'No formal education before age ten'], answer: 'Mother-tongue instruction', explanation: 'The passage mentions that the policy emphasises mother-tongue instruction in early years.', level: 'Medium', tier: 'tier2', examProb: 'Hot', passageId: 14 },
  { id: 669, qtype: 'reading-comprehension', question: 'Which concern have critics raised about NEP 2020?', options: ['It is too short and lacks detail', 'Implementation challenges and funding gaps', 'It focuses only on urban schools', 'It abolishes higher education entirely'], answer: 'Implementation challenges and funding gaps', explanation: 'The passage mentions critics have raised concerns about implementation challenges, funding gaps, and state capacity.', level: 'Medium', tier: 'both', examProb: 'Hot', passageId: 14 },
  { id: 670, qtype: 'reading-comprehension', question: 'From which grade does NEP 2020 propose integrating vocational training?', options: ['Grade three', 'Grade six', 'Grade nine', 'Grade twelve'], answer: 'Grade six', explanation: 'The passage states that vocational training integration is proposed from grade six onward.', level: 'Easy', tier: 'tier2', examProb: 'Confirmed', passageId: 14 },

  // ── Passage 15: Digital India and Governance ───────────────────────────
  { id: 671, qtype: 'reading-comprehension', question: 'What are the three core components of the Digital India programme?', options: ['Roads, railways, and airports', 'Digital infrastructure, digital governance, and digital empowerment', 'Agriculture, industry, and services', 'Defence, education, and healthcare'], answer: 'Digital infrastructure, digital governance, and digital empowerment', explanation: 'The passage explicitly lists these three as the core components of Digital India.', level: 'Medium', tier: 'tier2', examProb: 'Hot', passageId: 15 },
  { id: 672, qtype: 'reading-comprehension', question: 'How has the Aadhaar system helped welfare delivery?', options: ['By replacing cash transactions with gold', 'By eliminating intermediaries and reducing leakage', 'By creating new government departments', 'By increasing the number of welfare schemes'], answer: 'By eliminating intermediaries and reducing leakage', explanation: 'The passage states that Aadhaar has become the backbone of direct benefit transfers, eliminating intermediaries and reducing leakage.', level: 'Medium', tier: 'tier2', examProb: 'Hot', passageId: 15 },
  { id: 673, qtype: 'reading-comprehension', question: 'What concerns have been raised about Digital India?', options: ['High cost of smartphones', 'Digital exclusion, cybersecurity threats, and data privacy', 'Lack of electricity in cities', 'Excessive government spending on defence'], answer: 'Digital exclusion, cybersecurity threats, and data privacy', explanation: 'The passage specifically lists digital exclusion in rural areas, cybersecurity threats, and data privacy as concerns.', level: 'Medium', tier: 'tier2', examProb: 'Confirmed', passageId: 15 },
  { id: 674, qtype: 'reading-comprehension', question: 'What does UPI stand for and what has it achieved?', options: ['Universal Payment Index — reduced cash printing', 'Unified Payments Interface — revolutionised financial transactions', 'Urban Planning Initiative — improved city infrastructure', 'United Public Interest — expanded welfare schemes'], answer: 'Unified Payments Interface — revolutionised financial transactions', explanation: 'The passage describes UPI as the Unified Payments Interface that has revolutionised financial transactions.', level: 'Easy', tier: 'tier2', examProb: 'Hot', passageId: 15 },
  { id: 675, qtype: 'reading-comprehension', question: 'Which legislation seeks to address data privacy challenges?', options: ['Right to Information Act', 'Consumer Protection Act', 'Digital Personal Data Protection Act', 'Information Technology Act 2000'], answer: 'Digital Personal Data Protection Act', explanation: 'The passage mentions the Digital Personal Data Protection Act as addressing data collection and processing rules.', level: 'Medium', tier: 'both', examProb: 'Hot', passageId: 15 },

  // ── Passage 16: ISRO and India's Space Ambitions ───────────────────────
  { id: 676, qtype: 'reading-comprehension', question: 'When was ISRO founded?', options: ['1947', '1962', '1969', '1975'], answer: '1969', explanation: 'The passage states that ISRO was founded in 1969.', level: 'Easy', tier: 'tier2', examProb: 'Confirmed', passageId: 16 },
  { id: 677, qtype: 'reading-comprehension', question: 'What is the Gaganyaan programme designed to achieve?', options: ['Landing on Mars', 'Sending Indian astronauts to low Earth orbit', 'Building a space station on the Moon', 'Launching communication satellites'], answer: 'Sending Indian astronauts to low Earth orbit', explanation: 'The passage describes Gaganyaan as India\'s programme to send astronauts to low Earth orbit.', level: 'Medium', tier: 'tier2', examProb: 'Hot', passageId: 16 },
  { id: 678, qtype: 'reading-comprehension', question: 'What is ISRO\'s key competitive advantage according to the passage?', options: ['Largest budget in the world', 'Frugal engineering approach', 'Most advanced technology', 'Largest workforce'], answer: 'Frugal engineering approach', explanation: 'The passage highlights ISRO\'s frugal engineering approach that delivers results rivalling agencies with larger budgets.', level: 'Medium', tier: 'tier2', examProb: 'Hot', passageId: 16 },
  { id: 679, qtype: 'reading-comprehension', question: 'What role does IN-SPACe play in the Indian space sector?', options: ['It manufactures rockets', 'It trains astronauts', 'It opens the space sector to private companies', 'It funds agricultural satellites'], answer: 'It opens the space sector to private companies', explanation: 'The passage mentions IN-SPACe (Indian National Space Promotion and Authorisation Centre) as the body opening space to private participation.', level: 'Hard', tier: 'tier2', examProb: 'Confirmed', passageId: 16 },
  { id: 680, qtype: 'reading-comprehension', question: 'Which launch vehicle is described as one of the most reliable in the world?', options: ['GSLV', 'PSLV', 'SLV-3', 'Falcon 9'], answer: 'PSLV', explanation: 'The passage describes the Polar Satellite Launch Vehicle (PSLV) as one of the most reliable launch systems globally.', level: 'Easy', tier: 'both', examProb: 'Hot', passageId: 16 },

  // ── Passage 17: Universal Healthcare and Ayushman Bharat ───────────────
  { id: 681, qtype: 'reading-comprehension', question: 'What is the coverage amount provided under Ayushman Bharat per family per year?', options: ['One lakh rupees', 'Two lakh rupees', 'Five lakh rupees', 'Ten lakh rupees'], answer: 'Five lakh rupees', explanation: 'The passage states coverage of up to five lakh rupees per family per year.', level: 'Easy', tier: 'tier2', examProb: 'Hot', passageId: 17 },
  { id: 682, qtype: 'reading-comprehension', question: 'What pushes millions of Indians into poverty according to the passage?', options: ['Lack of education', 'Out-of-pocket medical expenses', 'Natural disasters', 'High tax rates'], answer: 'Out-of-pocket medical expenses', explanation: 'The passage opens by stating that out-of-pocket medical expenses push millions into poverty.', level: 'Easy', tier: 'tier2', examProb: 'Confirmed', passageId: 17 },
  { id: 683, qtype: 'reading-comprehension', question: 'What is the purpose of Health and Wellness Centres?', options: ['Training medical students', 'Strengthening primary healthcare delivery', 'Conducting medical research', 'Manufacturing generic medicines'], answer: 'Strengthening primary healthcare delivery', explanation: 'The passage states that Health and Wellness Centres aim to strengthen primary healthcare delivery across the country.', level: 'Medium', tier: 'tier2', examProb: 'Hot', passageId: 17 },
  { id: 684, qtype: 'reading-comprehension', question: 'Which of the following is mentioned as a challenge to universal health coverage?', options: ['Excessive number of doctors', 'Shortage of trained medical professionals', 'Too many hospitals in rural areas', 'Declining demand for healthcare'], answer: 'Shortage of trained medical professionals', explanation: 'The passage lists shortage of trained medical professionals as one of the key challenges.', level: 'Medium', tier: 'tier2', examProb: 'Hot', passageId: 17 },
  { id: 685, qtype: 'reading-comprehension', question: 'When was the Ayushman Bharat PM-JAY scheme launched?', options: ['2014', '2016', '2018', '2020'], answer: '2018', explanation: 'The passage clearly states the scheme was launched in 2018.', level: 'Easy', tier: 'both', examProb: 'Confirmed', passageId: 17 },

  // ── Passage 18: India's Foreign Policy and Multilateralism ─────────────
  { id: 686, qtype: 'reading-comprehension', question: 'What principles have historically guided India\'s foreign policy?', options: ['Military aggression and territorial expansion', 'Non-alignment, peaceful coexistence, and strategic autonomy', 'Economic isolation and protectionism', 'Alliance with a single superpower'], answer: 'Non-alignment, peaceful coexistence, and strategic autonomy', explanation: 'The passage states that India\'s policy has been guided by non-alignment, peaceful coexistence, and strategic autonomy.', level: 'Medium', tier: 'tier2', examProb: 'Hot', passageId: 18 },
  { id: 687, qtype: 'reading-comprehension', question: 'What strategy does India pursue in the contemporary era?', options: ['Complete isolation', 'Multi-alignment with multiple partners', 'Exclusive alliance with the United States', 'Military domination of South Asia'], answer: 'Multi-alignment with multiple partners', explanation: 'The passage describes India\'s current approach as multi-alignment, building partnerships with the US, Russia, Japan, and European nations.', level: 'Medium', tier: 'tier2', examProb: 'Hot', passageId: 18 },
  { id: 688, qtype: 'reading-comprehension', question: 'What themes did India highlight during its G20 presidency in 2023?', options: ['Military modernisation and defence exports', 'Inclusive growth and digital public infrastructure', 'Space exploration and nuclear energy', 'Cultural exchange and tourism promotion'], answer: 'Inclusive growth and digital public infrastructure', explanation: 'The passage states India\'s G20 presidency highlighted themes of inclusive growth and digital public infrastructure.', level: 'Medium', tier: 'tier2', examProb: 'Confirmed', passageId: 18 },
  { id: 689, qtype: 'reading-comprehension', question: 'Which policy is aimed at strengthening ties with South and Southeast Asian nations?', options: ['Look West Policy', 'Act East Policy', 'Monroe Doctrine', 'Open Door Policy'], answer: 'Act East Policy', explanation: 'The passage mentions the Act East Policy as an initiative aimed at strengthening ties with South and Southeast Asian nations.', level: 'Easy', tier: 'tier2', examProb: 'Hot', passageId: 18 },
  { id: 690, qtype: 'reading-comprehension', question: 'The word "multipolar" in the passage most nearly means:', options: ['Dominated by a single power', 'Having two competing blocs', 'Characterised by multiple centres of power', 'Lacking any form of governance'], answer: 'Characterised by multiple centres of power', explanation: '"Multipolar" describes a world order with several influential nations or groups, as opposed to unipolar (one power) or bipolar (two powers).', level: 'Hard', tier: 'both', examProb: 'Hot', passageId: 18 },
]
