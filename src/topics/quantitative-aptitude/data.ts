/**
 * SSC CGL PREP -- QUANTITATIVE APTITUDE DATA
 *
 * Split from maths-reasoning/data.ts (maths entries only).
 * Formula bank, squares/cubes, PYQs -- priority-ranked by SSC CGL PYQ frequency 2019-2024.
 */

// -- Types -------------------------------------------------------------------

export type MathsTopic =
  | 'Data Interpretation'
  | 'Geometry'
  | 'Mensuration'
  | 'Trigonometry'
  | 'Algebra'
  | 'Number System'
  | 'Percentage'
  | 'Profit & Loss'
  | 'Simple & Compound Interest'
  | 'Ratio & Proportion'
  | 'Average & Alligation'
  | 'Time & Work'
  | 'Speed, Distance & Time'
  | 'Statistics'
  | 'Surds & Indices'
  | 'Mixture & Alligation'
  | 'Coordinate Geometry'
  | 'Probability'
  | 'Permutation & Combination'
  | 'Clock Problems'
  | 'Approximation'

export type ExamProb = 'Hot' | 'High' | 'Confirmed' | 'Recurring'

export interface FormulaEntry {
  id: number
  subject: 'maths'
  topic: MathsTopic
  title: string
  formula: string
  detail: string
  shortcut?: string
  examProb: ExamProb
  priority: number // 1=highest
  /** Visual representation hint */
  visual?: 'shape' | 'graph' | 'table' | 'diagram' | 'none'
  /** Key into SVG_MAP for an inline illustration */
  svgKey?: string
}

export interface SquareCubeEntry {
  n: number
  square: number
  cube?: number
}

export interface MathsPYQEntry {
  id: number
  year: string
  shift: string
  subject: 'maths'
  topic: MathsTopic
  question: string
  options: [string, string, string, string]
  answer: string
  explanation: string
  formulaUsed: string
  examProb: ExamProb
}

// -- Squares 1-30 & Cubes 1-15 -----------------------------------------------

export const squareCubeData: SquareCubeEntry[] = [
  { n: 1,  square: 1,     cube: 1 },
  { n: 2,  square: 4,     cube: 8 },
  { n: 3,  square: 9,     cube: 27 },
  { n: 4,  square: 16,    cube: 64 },
  { n: 5,  square: 25,    cube: 125 },
  { n: 6,  square: 36,    cube: 216 },
  { n: 7,  square: 49,    cube: 343 },
  { n: 8,  square: 64,    cube: 512 },
  { n: 9,  square: 81,    cube: 729 },
  { n: 10, square: 100,   cube: 1000 },
  { n: 11, square: 121,   cube: 1331 },
  { n: 12, square: 144,   cube: 1728 },
  { n: 13, square: 169,   cube: 2197 },
  { n: 14, square: 196,   cube: 2744 },
  { n: 15, square: 225,   cube: 3375 },
  { n: 16, square: 256 },
  { n: 17, square: 289 },
  { n: 18, square: 324 },
  { n: 19, square: 361 },
  { n: 20, square: 400 },
  { n: 21, square: 441 },
  { n: 22, square: 484 },
  { n: 23, square: 529 },
  { n: 24, square: 576 },
  { n: 25, square: 625 },
  { n: 26, square: 676 },
  { n: 27, square: 729 },
  { n: 28, square: 784 },
  { n: 29, square: 841 },
  { n: 30, square: 900 },
]

// -- Memory Tricks for Squares & Cubes ----------------------------------------

export const squareTricks: { range: string; trick: string }[] = [
  { range: '1-10', trick: 'These are must-know basics. 7\u00b2=49, 8\u00b2=64, 9\u00b2=81 are the ones people confuse.' },
  { range: '11-15', trick: '11\u00b2=121 (palindrome), 12\u00b2=144 (dozen squared), 13\u00b2=169 (unlucky), 14\u00b2=196, 15\u00b2=225.' },
  { range: '16-20', trick: '16\u00b2=256 (2\u2078), 17\u00b2=289, 18\u00b2=324, 19\u00b2=361, 20\u00b2=400. Pattern: last digits 6,9,4,1,0.' },
  { range: '21-25', trick: 'For 2x: (2x)\u00b2 = 4\u00b7x\u00b2 + 4\u00b7x\u00b710 + 100. E.g. 23\u00b2: base 20\u00b2=400, add 2\u00d720\u00d73=120, add 3\u00b2=9 \u2192 529.' },
  { range: '26-30', trick: 'Use (a+b)\u00b2 shortcut. 27\u00b2=(30-3)\u00b2=900-180+9=729. 28\u00b2=(30-2)\u00b2=900-120+4=784.' },
]

export const cubeTricks: { range: string; trick: string }[] = [
  { range: '1-5', trick: '1,8,27,64,125 \u2014 just memorize. 5\u00b3=125 (high-five \u2192 1-2-5).' },
  { range: '6-10', trick: '216,343,512,729,1000. Think: 6\u00b3 has digits 2-1-6, 7\u00b3 has 3-4-3 (palindrome), 8\u00b3=512 (2\u2079).' },
  { range: '11-15', trick: '1331 (palindrome!), 1728 (12 dozen\u00b2), 2197, 2744, 3375. 11\u00b3 and 12\u00b3 are SSC favorites.' },
]

// -- Formula Data -------------------------------------------------------------

let _id = 0
const f = (
  topic: MathsTopic,
  title: string,
  formula: string,
  detail: string,
  examProb: ExamProb,
  priority: number,
  shortcut?: string,
  visual?: 'shape' | 'graph' | 'table' | 'diagram' | 'none',
  svgKey?: string,
): FormulaEntry => ({ id: ++_id, subject: 'maths', topic, title, formula, detail, examProb, priority, shortcut, visual, svgKey })

export const mathsFormulaData: FormulaEntry[] = [
  // ============ PERCENTAGE (Priority 7) ============
  f('Percentage', 'Percentage = Part/Whole \u00d7 100', '% = (Part / Whole) \u00d7 100', 'Basic percentage formula. If 20 out of 50 students pass, pass% = (20/50)\u00d7100 = 40%.', 'Hot', 7),
  f('Percentage', 'Fraction-Percentage Table', '1/2=50%, 1/3=33\u2153%, 1/4=25%, 1/5=20%, 1/6=16\u2154%, 1/7=14\u00b2/\u2087%, 1/8=12.5%, 1/9=11\u2151%, 1/10=10%, 1/11=9\u00b9/\u2081\u2081%, 1/12=8\u2153%', 'Must-memorize fraction-to-percent conversions. SSC CGL asks these in DI and simplification.', 'Hot', 7, 'Half-Third-Quarter: 50-33-25. Fifth to Twelfth: 20-16\u2154-14\u00b2/\u2087-12\u00bd-11\u2151-10-9\u00b9/\u2081\u2081-8\u2153', 'table'),
  f('Percentage', 'Successive % Change', 'Net effect = a + b + (ab/100)', 'If price \u2191 by a% then \u2193 by b%, net change = a + b + ab/100 (use signs). E.g. +20% then -10% \u2192 20-10-200/100 = +8%.', 'Hot', 7, 'AB rule: Add both + multiply/100'),
  f('Percentage', '% Increase/Decrease', 'Increase: New = Old \u00d7 (1 + r/100), Decrease: New = Old \u00d7 (1 - r/100)', 'Foundation for CI, population growth, depreciation problems.', 'High', 7),
  f('Percentage', 'Population Growth', 'P = P\u2080(1 + r/100)\u207f', 'Population after n years. Same as CI formula. For decrease, use (1 - r/100)\u207f.', 'Confirmed', 7),

  // ============ PROFIT & LOSS (Priority 8) ============
  f('Profit & Loss', 'Profit / Loss %', 'Profit% = (Profit/CP) \u00d7 100; Loss% = (Loss/CP) \u00d7 100', 'Always calculated on Cost Price (CP). If CP=80, SP=100, Profit%=(20/80)\u00d7100=25%.', 'Hot', 8),
  f('Profit & Loss', 'SP from CP with Profit/Loss%', 'SP = CP \u00d7 (100 + P%) / 100; SP = CP \u00d7 (100 - L%) / 100', 'Quick calculation: To gain 20% on CP=500, SP = 500\u00d7120/100 = 600.', 'Hot', 8),
  f('Profit & Loss', 'Discount & Marked Price', 'Discount% = (Discount/MP) \u00d7 100; SP = MP \u00d7 (100-d%)/100', 'MP = Marked Price. Discount is always on MP, Profit/Loss always on CP.', 'Hot', 8, 'Discount on MP, Profit on CP \u2014 never mix!'),
  f('Profit & Loss', 'Successive Discounts', 'Single equiv discount for d\u2081%, d\u2082% = d\u2081 + d\u2082 - (d\u2081\u00d7d\u2082)/100', 'Two discounts of 20% and 10% \u2260 30%. Equiv = 20+10-200/100 = 28%.', 'Confirmed', 8),
  f('Profit & Loss', 'Dishonest Dealer', 'Gain% = (True weight - False weight) / False weight \u00d7 100', 'If dealer uses 900g weight instead of 1kg: Gain% = (1000-900)/900 \u00d7 100 = 11.11%.', 'High', 8),
  f('Profit & Loss', 'CP:SP Ratio Trick', 'If P% = x, then CP:SP = 100:(100+x); If L% = x, then CP:SP = 100:(100-x)', 'Useful for ratio-based P&L problems.', 'Recurring', 8),

  // ============ SIMPLE & COMPOUND INTEREST (Priority 9) ============
  f('Simple & Compound Interest', 'Simple Interest', 'SI = PRT/100', 'P=Principal, R=Rate%, T=Time in years. Amount A = P + SI.', 'Hot', 9),
  f('Simple & Compound Interest', 'Compound Interest', 'A = P(1 + R/100)\u207f; CI = A - P', 'For half-yearly: rate=R/2, n=2T. For quarterly: rate=R/4, n=4T.', 'Hot', 9),
  f('Simple & Compound Interest', 'CI - SI for 2 years', 'CI - SI = P(R/100)\u00b2', 'For 2 years, difference between CI and SI = PR\u00b2/10000. Very frequent in SSC!', 'Hot', 9, 'Diff for 2 yrs = PR\u00b2/10000'),
  f('Simple & Compound Interest', 'CI - SI for 3 years', 'CI - SI = P(R/100)\u00b2(3 + R/100)', 'For 3 years, the difference formula extends. Less common but appears in CGL Tier 1.', 'Confirmed', 9),
  f('Simple & Compound Interest', 'Equal Installments (SI)', 'Each installment = Total Amount / [n + (n-1+n-2+...+1)\u00d7R/100]', 'When a sum is repaid in n equal installments at SI.', 'Recurring', 9),

  // ============ RATIO & PROPORTION (Priority 10) ============
  f('Ratio & Proportion', 'Proportion Rule', 'If a:b = c:d, then ad = bc (cross multiply)', 'Product of means = Product of extremes. Used in all proportion problems.', 'Hot', 10),
  f('Ratio & Proportion', 'Componendo-Dividendo', 'If a/b = c/d, then (a+b)/(a-b) = (c+d)/(c-d)', 'Powerful shortcut for SSC. If (a+b)/(a-b)=3/1, then a/b=2/1.', 'High', 10),
  f('Ratio & Proportion', 'Third & Mean Proportional', 'Third prop of a,b = b\u00b2/a; Mean prop of a,b = \u221a(ab)', 'Third proportional: a:b = b:x \u2192 x = b\u00b2/a. Mean proportional: a:x = x:b \u2192 x = \u221a(ab).', 'Confirmed', 10),

  // ============ AVERAGE & ALLIGATION (Priority 11) ============
  f('Average & Alligation', 'Average Formula', 'Average = Sum of observations / Number of observations', 'If 5 numbers sum to 150, average = 150/5 = 30.', 'Hot', 11),
  f('Average & Alligation', 'Weighted Average', 'Weighted Avg = \u03a3(x\u1d62 \u00d7 w\u1d62) / \u03a3w\u1d62', 'When groups have different sizes. 10 students avg 60, 20 students avg 80: Weighted = (600+1600)/30 = 73.33.', 'Hot', 11),
  f('Average & Alligation', 'Alligation Rule (Cross method)', 'Ratio = (d\u2082 - mean) : (mean - d\u2081)', 'Mix two quantities at prices d\u2081 and d\u2082 to get mean price. Ratio of quantities = (d\u2082-mean):(mean-d\u2081).', 'Hot', 11, 'Alligation cross: Cheaper\u2014Mean\u2014Dearer, criss-cross subtract', 'diagram', 'alligation-diagram'),
  f('Average & Alligation', 'New Average when one added/removed', 'New avg = Old avg \u00b1 (New value - Old avg) / (n \u00b1 1)', 'If avg of 10 nums is 50 and we add 61: new avg = 50 + (61-50)/11 = 51.', 'Confirmed', 11),

  // ============ TIME & WORK (Priority 12) ============
  f('Time & Work', 'Basic: Work = Rate \u00d7 Time', '1/A + 1/B = 1/T (together)', 'If A does job in 10 days, B in 15 days, together: 1/10+1/15 = 1/6, so 6 days.', 'Hot', 12),
  f('Time & Work', 'LCM Method', 'Total work = LCM of individual days', 'Take LCM as total units. A=10d, B=15d \u2192 LCM=30. A does 3u/day, B does 2u/day. Together 5u/day \u2192 30/5 = 6 days.', 'Hot', 12, 'LCM trick: fastest method for T&W'),
  f('Time & Work', 'Pipes & Cisterns', 'Net rate = Fill rates - Drain rates', 'Pipe A fills in 6h (rate=1/6), B drains in 8h (rate=1/8). Net = 1/6-1/8 = 1/24. Fills in 24h.', 'Confirmed', 12),
  f('Time & Work', 'MDH Formula', 'M\u2081D\u2081H\u2081/W\u2081 = M\u2082D\u2082H\u2082/W\u2082', 'M=Men, D=Days, H=Hours, W=Work. Universal formula for all work problems with multiple variables.', 'High', 12),

  // ============ SPEED, DISTANCE & TIME (Priority 13) ============
  f('Speed, Distance & Time', 'Basic Formula', 'Speed = Distance / Time; D = S \u00d7 T', 'Fundamental relation. Convert units: km/h to m/s \u00d7 5/18; m/s to km/h \u00d7 18/5.', 'Hot', 13),
  f('Speed, Distance & Time', 'Average Speed', 'Avg Speed = Total Distance / Total Time', 'NOT average of speeds! If same distance at speeds a,b: Avg = 2ab/(a+b).', 'Hot', 13, '2ab/(a+b) for equal distances \u2014 harmonic mean'),
  f('Speed, Distance & Time', 'Relative Speed', 'Same direction: |S\u2081 - S\u2082|; Opposite: S\u2081 + S\u2082', 'Trains/cars moving same/opposite direction. Key for train crossing problems.', 'Hot', 13),
  f('Speed, Distance & Time', 'Train Crossing Stationary Object', 'Time = Length of train / Speed of train', 'For pole/person (negligible length). For platform: Time = (L_train + L_platform) / Speed.', 'Confirmed', 13),
  f('Speed, Distance & Time', 'Train Crossing Another Train', 'Time = (L\u2081 + L\u2082) / Relative Speed', 'Same dir: divide by (S\u2081-S\u2082). Opposite dir: divide by (S\u2081+S\u2082).', 'Confirmed', 13),
  f('Speed, Distance & Time', 'Boats & Streams', 'Downstream = (u+v); Upstream = (u-v); Speed of boat = (D+U)/2; Speed of stream = (D-U)/2', 'u=boat speed in still water, v=stream speed. D=downstream speed, U=upstream speed.', 'High', 13),

  // ============ NUMBER SYSTEM (Priority 6) ============
  f('Number System', 'Divisibility Rules', '2\u2192even, 3\u2192digit sum\u00f73, 4\u2192last 2 digits\u00f74, 5\u2192ends 0/5, 6\u2192\u00f72&\u00f73, 8\u2192last 3 digits\u00f78, 9\u2192digit sum\u00f79, 11\u2192alt sum diff\u00f711', 'Must-know for SSC. For 7: double last digit, subtract from rest. For 13: multiply last by 4, add to rest.', 'Hot', 6, undefined, 'table'),
  f('Number System', 'HCF & LCM Relation', 'HCF \u00d7 LCM = Product of two numbers', 'If HCF(a,b)=h, LCM(a,b)=l, then h\u00d7l=a\u00d7b. Also LCM is always \u2265 both numbers; HCF \u2264 both.', 'Hot', 6),
  f('Number System', 'LCM of Fractions', 'LCM = LCM(numerators) / HCF(denominators)', 'HCF of fractions = HCF(numerators)/LCM(denominators). Very tricky SSC question type.', 'Confirmed', 6),
  f('Number System', 'Remainder Theorem', 'f(x) \u00f7 (x-a) \u2192 remainder = f(a)', 'If polynomial f(x) is divided by (x-a), remainder = f(a). For factor theorem: if f(a)=0, (x-a) is factor.', 'High', 6),
  f('Number System', 'Sum of n Natural Numbers', '\u03a3n = n(n+1)/2; \u03a3n\u00b2 = n(n+1)(2n+1)/6; \u03a3n\u00b3 = [n(n+1)/2]\u00b2', 'Sum of first n naturals, squares, cubes. \u03a3n\u00b3 = (\u03a3n)\u00b2 is a beautiful identity!', 'Hot', 6),
  f('Number System', 'Unit Digit Patterns', 'Cycle of unit digits: 2\u2192{2,4,8,6}, 3\u2192{3,9,7,1}, 7\u2192{7,9,3,1}, 8\u2192{8,4,2,6}', 'Unit digit repeats every 4 powers. Find power mod 4 to get unit digit. 0,1,5,6 always same unit digit.', 'Confirmed', 6),

  // ============ ALGEBRA (Priority 5) ============
  f('Algebra', 'Key Identities', '(a+b)\u00b2 = a\u00b2+2ab+b\u00b2; (a-b)\u00b2 = a\u00b2-2ab+b\u00b2; a\u00b2-b\u00b2 = (a+b)(a-b)', 'Foundation identities. (a+b)\u00b2+(a-b)\u00b2 = 2(a\u00b2+b\u00b2); (a+b)\u00b2-(a-b)\u00b2 = 4ab.', 'Hot', 5),
  f('Algebra', 'Cube Identities', '(a+b)\u00b3 = a\u00b3+3a\u00b2b+3ab\u00b2+b\u00b3; (a-b)\u00b3 = a\u00b3-3a\u00b2b+3ab\u00b2-b\u00b3', 'Also: a\u00b3+b\u00b3 = (a+b)(a\u00b2-ab+b\u00b2); a\u00b3-b\u00b3 = (a-b)(a\u00b2+ab+b\u00b2).', 'Hot', 5),
  f('Algebra', 'x + 1/x Type Problems', 'If x+1/x=k, then x\u00b2+1/x\u00b2=k\u00b2-2, x\u00b3+1/x\u00b3=k\u00b3-3k', 'SSC favorite! If x+1/x=3: x\u00b2+1/x\u00b2=7, x\u00b3+1/x\u00b3=18. If x-1/x=k: x\u00b2+1/x\u00b2=k\u00b2+2.', 'Hot', 5, 'Plus: square minus 2, cube minus 3k. Minus: square PLUS 2.'),
  f('Algebra', 'a\u00b3+b\u00b3+c\u00b3-3abc', 'a\u00b3+b\u00b3+c\u00b3-3abc = (a+b+c)(a\u00b2+b\u00b2+c\u00b2-ab-bc-ca)', 'If a+b+c=0, then a\u00b3+b\u00b3+c\u00b3 = 3abc. Very frequent SSC question!', 'Hot', 5, 'Sum zero \u2192 cubes = 3abc'),
  f('Algebra', 'Quadratic Formula', 'x = (-b \u00b1 \u221a(b\u00b2-4ac)) / 2a', 'For ax\u00b2+bx+c=0. Sum of roots = -b/a, Product of roots = c/a. Discriminant D=b\u00b2-4ac.', 'High', 5),
  f('Algebra', 'Factor Theorem', 'If f(a)=0, then (x-a) is a factor of f(x)', 'Used to factorize polynomials. Check small values (0,\u00b11,\u00b12) first.', 'Confirmed', 5),

  // ============ GEOMETRY (Priority 2) ============
  f('Geometry', 'Angle Sum Property', 'Triangle: 180\u00b0; Quadrilateral: 360\u00b0; Polygon(n): (n-2)\u00d7180\u00b0', 'Interior angle of regular polygon = (n-2)\u00d7180\u00b0/n. Exterior angle = 360\u00b0/n.', 'Hot', 2, undefined, 'shape', 'angle-sum'),
  f('Geometry', 'Pythagoras Theorem', 'H\u00b2 = P\u00b2 + B\u00b2 (Hypotenuse\u00b2 = Perpendicular\u00b2 + Base\u00b2)', 'Common triplets: (3,4,5), (5,12,13), (7,24,25), (8,15,17), (9,40,41), (11,60,61), (20,21,29).', 'Hot', 2, 'Triplets: 3-4-5, 5-12-13, 8-15-17 \u2014 memorize!', 'shape', 'right-triangle'),
  f('Geometry', 'Similar Triangles', 'If \u25b3ABC ~ \u25b3DEF: AB/DE = BC/EF = CA/FD; Area ratio = (side ratio)\u00b2', 'AAA, SAS, SSS similarity. Ratio of areas = square of ratio of corresponding sides.', 'Hot', 2, undefined, undefined, 'similar-triangles'),
  f('Geometry', 'BPT (Basic Proportionality)', 'If DE \u2225 BC in \u25b3ABC, then AD/DB = AE/EC', 'Thales theorem. A line parallel to one side divides other two sides proportionally.', 'Confirmed', 2, undefined, 'shape', 'bpt'),
  f('Geometry', 'Circle Theorems', 'Angle in semicircle = 90\u00b0; Central angle = 2 \u00d7 Inscribed angle; Tangent \u22a5 Radius', 'Equal chords \u2192 equal distance from center. Chord distance = \u221a(r\u00b2 - d\u00b2) where d = perpendicular distance.', 'Hot', 2, undefined, 'shape', 'circle-theorems'),
  f('Geometry', 'Tangent Properties', 'Tangent length from external point = \u221a(d\u00b2-r\u00b2); Two tangents from same point are equal', 'd = distance from center to external point, r = radius.', 'High', 2, undefined, 'shape', 'tangent'),
  f('Geometry', 'In-radius & Circum-radius', 'Inradius r = Area/s; Circumradius R = abc/4\u00d7Area; (s = semi-perimeter)', 'For equilateral triangle: r = a/(2\u221a3), R = a/\u221a3. For right triangle: r = (a+b-c)/2, R = c/2.', 'Confirmed', 2, undefined, undefined, 'in-circum-radius'),
  f('Geometry', 'Median, Altitude, Angle Bisector', 'Median to hypotenuse = H/2; Apollonius: AB\u00b2+AC\u00b2 = 2(AD\u00b2+BD\u00b2)', 'AD is median. In right triangle, median to hypotenuse = half hypotenuse.', 'High', 2, undefined, undefined, 'median-altitude'),

  // ============ MENSURATION (Priority 3) ============
  f('Mensuration', 'Triangle Areas', 'Area = \u00bd\u00d7b\u00d7h; Heron: \u221a[s(s-a)(s-b)(s-c)]; Equilateral: (\u221a3/4)a\u00b2', 'For equilateral with side a: height = (\u221a3/2)a, area = (\u221a3/4)a\u00b2, perimeter = 3a.', 'Hot', 3, undefined, 'shape', 'triangle-area'),
  f('Mensuration', 'Circle Formulas', 'Area = \u03c0r\u00b2; Circumference = 2\u03c0r; Sector area = (\u03b8/360)\u03c0r\u00b2; Arc = (\u03b8/360)2\u03c0r', 'Ring area (annulus) = \u03c0(R\u00b2-r\u00b2). Segment area = Sector area - Triangle area.', 'Hot', 3, undefined, 'shape', 'circle-sector'),
  f('Mensuration', 'Quadrilateral Areas', 'Rectangle: l\u00d7b; Square: a\u00b2; Parallelogram: b\u00d7h; Trapezium: \u00bd(a+b)\u00d7h; Rhombus: \u00bdd\u2081d\u2082', 'Diagonal of rectangle = \u221a(l\u00b2+b\u00b2). Diagonal of square = a\u221a2.', 'Hot', 3, undefined, 'shape', 'quadrilateral-set'),
  f('Mensuration', 'Cube & Cuboid', 'Cube: V=a\u00b3, TSA=6a\u00b2, Diagonal=a\u221a3; Cuboid: V=lbh, TSA=2(lb+bh+hl), Diag=\u221a(l\u00b2+b\u00b2+h\u00b2)', '4 diagonals of a cube, all equal = a\u221a3.', 'Hot', 3, undefined, 'shape', 'cube-wireframe'),
  f('Mensuration', 'Cylinder', 'V = \u03c0r\u00b2h; CSA = 2\u03c0rh; TSA = 2\u03c0r(r+h)', 'Hollow cylinder volume = \u03c0(R\u00b2-r\u00b2)h.', 'Hot', 3, undefined, 'shape', 'cylinder'),
  f('Mensuration', 'Cone & Sphere', 'Cone: V=\u2153\u03c0r\u00b2h, CSA=\u03c0rl, l=\u221a(r\u00b2+h\u00b2); Sphere: V=\u2074\u2044\u2083\u03c0r\u00b3, SA=4\u03c0r\u00b2; Hemisphere: V=\u2154\u03c0r\u00b3, TSA=3\u03c0r\u00b2', 'Frustum volume = \u2153\u03c0h(R\u00b2+r\u00b2+Rr). CSA of frustum = \u03c0(R+r)l.', 'Hot', 3, undefined, 'shape', 'cone-sphere'),
  f('Mensuration', 'Prism & Pyramid', 'Prism: V=Base area\u00d7h, LSA=Perimeter\u00d7h; Pyramid: V=\u2153\u00d7Base area\u00d7h', 'Triangular prism: V = (\u221a3/4)a\u00b2\u00d7h for equilateral base.', 'Confirmed', 3, undefined, 'shape'),

  // ============ TRIGONOMETRY (Priority 4) ============
  f('Trigonometry', 'Standard Angle Values', 'sin: 0,\u00bd,1/\u221a2,\u221a3/2,1; cos: 1,\u221a3/2,1/\u221a2,\u00bd,0; tan: 0,1/\u221a3,1,\u221a3,\u221e (for 0\u00b0,30\u00b0,45\u00b0,60\u00b0,90\u00b0)', 'Memory trick: sin values = \u221a(0/4), \u221a(1/4), \u221a(2/4), \u221a(3/4), \u221a(4/4). Cos is reverse of sin.', 'Hot', 4, 'sin \u2192 0,1,2,3,4 under \u221a/2. Cos is sin reversed.', 'table'),
  f('Trigonometry', 'Pythagorean Identities', 'sin\u00b2\u03b8 + cos\u00b2\u03b8 = 1; 1 + tan\u00b2\u03b8 = sec\u00b2\u03b8; 1 + cot\u00b2\u03b8 = csc\u00b2\u03b8', 'From these: sin\u00b2\u03b8 = 1-cos\u00b2\u03b8, sec\u00b2\u03b8-tan\u00b2\u03b8 = 1, csc\u00b2\u03b8-cot\u00b2\u03b8 = 1.', 'Hot', 4),
  f('Trigonometry', 'Complementary Angles', 'sin(90\u00b0-\u03b8) = cos\u03b8; tan(90\u00b0-\u03b8) = cot\u03b8; sec(90\u00b0-\u03b8) = csc\u03b8', 'sin and cos are complementary pairs. tan and cot. sec and csc. Sum = 90\u00b0.', 'Hot', 4, 'Pairs: sin-cos, tan-cot, sec-csc'),
  f('Trigonometry', 'Max/Min of Trig Expressions', 'a\u00b7sin\u03b8 + b\u00b7cos\u03b8: Max = \u221a(a\u00b2+b\u00b2), Min = -\u221a(a\u00b2+b\u00b2)', 'For a\u00b7sin\u00b2\u03b8 + b\u00b7cos\u00b2\u03b8: Max = max(a,b), Min = min(a,b). Useful shortcut for SSC.', 'Hot', 4),
  f('Trigonometry', 'Height & Distance', 'tan \u03b8 = Height/Base; Angle of elevation upward, depression downward', 'Two common setups: (1) Tower with angle from ground. (2) Two points with two angles \u2192 use tan difference.', 'Hot', 4, undefined, 'shape', 'height-distance'),
  f('Trigonometry', 'sin\u00b2\u03b8 + cos\u00b2\u03b8 type SSC tricks', 'If sin\u03b8+cos\u03b8 = k, then sin\u00b2\u03b8+cos\u00b2\u03b8=1, sin\u03b8\u00b7cos\u03b8=(k\u00b2-1)/2', 'Also: sin\u2074\u03b8+cos\u2074\u03b8 = 1-2sin\u00b2\u03b8cos\u00b2\u03b8; sin\u2076\u03b8+cos\u2076\u03b8 = 1-3sin\u00b2\u03b8cos\u00b2\u03b8.', 'Confirmed', 4),

  // ============ DATA INTERPRETATION (Priority 1) ============
  f('Data Interpretation', 'DI Core Approach', 'Read \u2192 Identify data type \u2192 Calculate \u2192 Compare', 'Types: Bar graph, Pie chart, Line graph, Table, Mixed. Always check units and base year.', 'Hot', 1),
  f('Data Interpretation', 'Pie Chart % to Degrees', '1% = 3.6\u00b0; To find value: (degree/360) \u00d7 total', '25% = 90\u00b0, 50% = 180\u00b0. Central angle = (value/total) \u00d7 360\u00b0.', 'Hot', 1),
  f('Data Interpretation', '% Change in DI', '% Change = (New - Old) / Old \u00d7 100', 'Always divide by the BASE (old/original) value. This is the most common DI calculation.', 'Hot', 1),
  f('Data Interpretation', 'Ratio from DI', 'Simplify by dividing both by HCF', 'In DI, when asked "ratio of X to Y", always simplify. 150:200 = 3:4.', 'Confirmed', 1),

  // ============ STATISTICS (Priority 14) ============
  f('Statistics', 'Mean, Median, Mode', 'Mean = \u03a3x/n; Median = middle value (sorted); Mode = most frequent', 'For grouped data: Mean = \u03a3fx/\u03a3f. Median class: N/2 position. Mode = 3\u00d7Median - 2\u00d7Mean.', 'Hot', 14),
  f('Statistics', 'Standard Deviation & Variance', 'Variance = \u03a3(x\u1d62-x\u0304)\u00b2/n; SD = \u221aVariance', 'SD shortcut: \u221a(\u03a3x\u00b2/n - (\u03a3x/n)\u00b2). SD is unaffected by adding a constant; scales with multiplication.', 'High', 14),

  // ============ SURDS & INDICES (Priority 15) ============
  f('Surds & Indices', 'Index Laws', 'a\u1d50\u00d7a\u207f=a\u1d50\u207a\u207f; a\u1d50/a\u207f=a\u1d50\u207b\u207f; (a\u1d50)\u207f=a\u1d50\u207f; a\u2070=1; a\u207b\u207f=1/a\u207f', 'Also: (ab)\u207f = a\u207fb\u207f; (a/b)\u207f = a\u207f/b\u207f; a^(1/n) = \u207f\u221aa.', 'Hot', 15),
  f('Surds & Indices', 'Rationalizing Surds', '1/(\u221aa+\u221ab) = (\u221aa-\u221ab)/(a-b); 1/(\u221aa-\u221ab) = (\u221aa+\u221ab)/(a-b)', 'Multiply by conjugate. 1/(\u221a5+\u221a3) = (\u221a5-\u221a3)/(5-3) = (\u221a5-\u221a3)/2.', 'Confirmed', 15),

  // ============ MIXTURE & ALLIGATION (Priority 16) ============
  f('Mixture & Alligation', 'Replacement Formula', 'After n operations: Quantity left = Q \u00d7 (1 - R/Q)\u207f', 'Q=initial quantity, R=quantity replaced each time, n=number of operations.', 'Hot', 16),
  f('Mixture & Alligation', 'Alligation Diagram', 'Cheaper:Dearer = (Mean - Cheaper) : (Dearer - Mean) \u2014 but crossed', 'Draw cross: write Cheaper, Dearer on left; Mean in center. Cross-subtract for ratio.', 'Hot', 16, undefined, 'diagram', 'alligation-diagram'),

  // ============ COORDINATE GEOMETRY (Priority 17) ============
  f('Coordinate Geometry', 'Distance & Section Formula', 'Distance = \u221a[(x\u2082-x\u2081)\u00b2+(y\u2082-y\u2081)\u00b2]; Section: ((mx\u2082+nx\u2081)/(m+n), (my\u2082+ny\u2081)/(m+n))', 'Midpoint is section formula with m=n=1. For external division: change + to -.', 'Hot', 17, undefined, undefined, 'coordinate-plane'),
  f('Coordinate Geometry', 'Area of Triangle (coords)', 'Area = \u00bd|x\u2081(y\u2082-y\u2083)+x\u2082(y\u2083-y\u2081)+x\u2083(y\u2081-y\u2082)|', 'If area = 0, points are collinear. Useful for collinearity check.', 'Confirmed', 17),
  f('Coordinate Geometry', 'Slope & Line Equations', 'Slope m = (y\u2082-y\u2081)/(x\u2082-x\u2081); y-y\u2081 = m(x-x\u2081); y = mx+c', 'Parallel lines: m\u2081=m\u2082. Perpendicular lines: m\u2081\u00d7m\u2082 = -1.', 'High', 17),

  // ============ PROBABILITY (Priority 18 — NEW) ============
  f('Probability', 'Basic Probability', 'P(E) = Favorable outcomes / Total outcomes', 'Probability ranges from 0 to 1. P(not E) = 1 - P(E). Sum of all probabilities = 1.', 'Hot', 18, 'P(not E) = 1 minus P(E) — use for complement problems'),
  f('Probability', 'Addition Theorem', 'P(A\u222aB) = P(A) + P(B) - P(A\u2229B)', 'For mutually exclusive events: P(A\u2229B)=0, so P(A\u222aB) = P(A)+P(B). SSC asks "either A or B" type.', 'Hot', 18),
  f('Probability', 'Multiplication Theorem (Independent)', 'P(A\u2229B) = P(A) \u00d7 P(B) for independent events', 'Two coins tossed: P(both heads) = 1/2 \u00d7 1/2 = 1/4. Independence means one event does not affect the other.', 'Confirmed', 18),
  f('Probability', 'Dice & Card Shortcuts', 'One die: 6 outcomes. Two dice: 36 outcomes. Deck: 52 cards (13\u00d74 suits)', 'P(sum 7 with two dice) = 6/36 = 1/6. P(king from deck) = 4/52 = 1/13. P(red card) = 26/52 = 1/2.', 'Hot', 18, 'Two dice sum 7: max combos (6 pairs). Sum 2 or 12: only 1 combo each'),

  // ============ PERMUTATION & COMBINATION (Priority 19 — NEW) ============
  f('Permutation & Combination', 'nPr Formula', '\u207fP\u1d63 = n! / (n-r)!', 'Permutation = arrangement (order matters). \u2075P\u2083 = 5!/(5-3)! = 60. Used when order of selection matters.', 'Hot', 19),
  f('Permutation & Combination', 'nCr Formula', '\u207fC\u1d63 = n! / [r!(n-r)!]', 'Combination = selection (order does NOT matter). \u2075C\u2083 = 10. \u207fC\u1d63 = \u207fC\u2099\u208b\u1d63.', 'Hot', 19, '\u207fC\u2080 = \u207fC\u2099 = 1; \u207fC\u2081 = n'),
  f('Permutation & Combination', 'Circular Permutation', '(n-1)! ways to arrange n items in a circle', 'Fix one person to remove rotational symmetry. Necklace/garland: (n-1)!/2 (flipping identical).', 'Confirmed', 19),
  f('Permutation & Combination', 'Handshakes & Diagonals', 'Handshakes among n people = \u207fC\u2082 = n(n-1)/2; Diagonals of n-gon = n(n-3)/2', '10 people shake hands: \u00b9\u2070C\u2082 = 45. Hexagon diagonals: 6(6-3)/2 = 9.', 'Hot', 19, 'Handshakes = nC2, Diagonals = n(n-3)/2'),

  // ============ CLOCK PROBLEMS (Priority 20 — NEW) ============
  f('Clock Problems', 'Clock Angle Formula', 'Angle = |30H - 5.5M| degrees', 'H=hour, M=minutes. At 3:20: |90-110| = 20\u00b0. If result > 180\u00b0, subtract from 360\u00b0.', 'Hot', 20, undefined, 'diagram'),
  f('Clock Problems', 'Hands Overlap Frequency', 'Hands overlap 11 times in 12 hours (not 12, because 11-12 overlap merges with 12-1)', 'Overlap interval = 12\u00d760/11 \u2248 65.45 min. First overlap after 12:00 is at 12:00 + 65.45 min \u2248 1:05:27.', 'Confirmed', 20),
  f('Clock Problems', 'Minute Hand Gain', 'Minute hand gains 5.5\u00b0 per minute over hour hand', 'Minute hand: 6\u00b0/min. Hour hand: 0.5\u00b0/min. Relative speed = 5.5\u00b0/min. Use for "when will hands be at 90\u00b0" type Qs.', 'Hot', 20, '5.5\u00b0/min gain \u2014 use for right angle and overlap timing'),

  // ============ APPROXIMATION (Priority 21 — NEW) ============
  f('Approximation', 'Square Root Approximation', '\u221a(a\u00b2+b) \u2248 a + b/(2a) when b is small relative to a\u00b2', 'E.g. \u221a(50) = \u221a(49+1) \u2248 7 + 1/14 \u2248 7.07. Actual: 7.071. Great for DI speed.', 'Confirmed', 21),
  f('Approximation', 'Percentage Approximation for DI', 'x% of y \u2248 round x or y to nearest friendly number, adjust', 'E.g. 23% of 412 \u2248 25% of 400 = 100 (actual 94.76). Also: 1/7 \u2248 14.3%, 1/6 \u2248 16.7%. Use fraction shortcuts.', 'Hot', 21, '10%=move decimal; 5%=half of 10%; 1%=move 2 decimals'),

  // ============ GEOMETRY (additional +3) ============
  f('Geometry', 'Angle Bisector Theorem', 'Bisector of angle A divides BC in ratio AB:AC', 'If BD/DC = AB/AC where AD bisects angle A. Internal bisector theorem — very frequent in SSC Geometry.', 'Hot', 2, undefined, 'shape'),
  f('Geometry', 'Stewarts Theorem', 'a\u00b2\u00b7m + b\u00b2\u00b7n - c\u00b2\u00b7(m+n) = (m+n)\u00b7m\u00b7n (cevian relation)', 'For cevian AD of length d to side BC (=m+n): b\u00b2m + c\u00b2n = a(d\u00b2+mn). Reduces to Apollonius for median.', 'Recurring', 2, undefined, 'shape'),
  f('Geometry', 'Apollonius Theorem (Median)', 'AB\u00b2 + AC\u00b2 = 2(AD\u00b2 + BD\u00b2) where D is midpoint of BC', 'Sum of squares of two sides = 2 \u00d7 (median\u00b2 + half-side\u00b2). Special case of Stewarts theorem.', 'Hot', 2, 'Also called Median Length theorem', 'shape'),

  // ============ MENSURATION (additional +3) ============
  f('Mensuration', 'Frustum of Cone', 'V = \u2153\u03c0h(R\u00b2+r\u00b2+Rr); CSA = \u03c0(R+r)l; TSA = CSA + \u03c0R\u00b2 + \u03c0r\u00b2', 'l = slant height = \u221a[h\u00b2+(R-r)\u00b2]. Formed by cutting a cone parallel to base. SSC 2023-24 hot topic.', 'Hot', 3, undefined, 'shape'),
  f('Mensuration', 'Hemisphere Formulas', 'V = \u2154\u03c0r\u00b3; CSA = 2\u03c0r\u00b2; TSA = 3\u03c0r\u00b2', 'TSA includes the flat circular base. Half-sphere problems often combined with cylinder (dome on silo).', 'Confirmed', 3, undefined, 'shape'),
  f('Mensuration', 'Prism Volume & Surface Area', 'V = Base area \u00d7 height; LSA = Perimeter of base \u00d7 height; TSA = LSA + 2\u00d7Base area', 'For triangular prism with equilateral base side a and height h: V = (\u221a3/4)a\u00b2h. LSA = 3ah.', 'Confirmed', 3, undefined, 'shape'),

  // ============ TRIGONOMETRY (additional +2) ============
  f('Trigonometry', 'Heights & Distances — Two Angles', 'h = d\u00b7tan\u03b1\u00b7tan\u03b2 / (tan\u03b1-tan\u03b2)', 'When two angles of elevation \u03b1 and \u03b2 from distance d apart: height formula. Very common SSC CGL Tier-2 Q.', 'Hot', 4, undefined, 'shape', 'height-distance'),
  f('Trigonometry', 'Compound Angle Formulas', 'sin(A\u00b1B) = sinA\u00b7cosB \u00b1 cosA\u00b7sinB; cos(A\u00b1B) = cosA\u00b7cosB \u2213 sinA\u00b7sinB', 'tan(A+B) = (tanA+tanB)/(1-tanA\u00b7tanB). Used for exact value calculations like sin75\u00b0, cos15\u00b0.', 'High', 4),

  // ============ NUMBER SYSTEM (additional +2) ============
  f('Number System', 'Extended Divisibility Rules (7, 11, 13)', '7: Double last digit, subtract from rest. 11: Alt digit sum diff \u00f711. 13: Multiply last by 4, add to rest', 'For 7: 343 \u2192 34 - 2\u00d73 = 28 (\u00f77). For 13: 442 \u2192 44 + 2\u00d74 = 52 (\u00f713). Useful for Number System Qs.', 'Confirmed', 6, undefined, 'table'),
  f('Number System', 'Division Algorithm & Remainder', 'Dividend = Divisor \u00d7 Quotient + Remainder', 'Remainder is always 0 \u2264 R < Divisor. For successive division: divide remainder by next divisor. Chinese Remainder Theorem for competitive exams.', 'High', 6),

  // ============ DATA INTERPRETATION (additional +2) ============
  f('Data Interpretation', 'Pie Chart Reading Technique', 'Value = (Central angle / 360\u00b0) \u00d7 Total; Ratio = Angle\u2081 : Angle\u2082', 'Always check if total is given or needs calculation. Compare sectors by angles directly for ratio Qs.', 'Confirmed', 1),
  f('Data Interpretation', 'Line Graph Shortcuts', 'Steepest slope = maximum change; Flat line = no change; Intersection = equal values', 'For rate of change: compare slopes visually. Percentage change between years = rise/base \u00d7 100.', 'Confirmed', 1),

  // ============ ALGEBRA (additional +2) ============
  f('Algebra', 'Factorization Shortcuts', 'a\u00b2-b\u00b2 = (a+b)(a-b); a\u00b3\u00b1b\u00b3 = (a\u00b1b)(a\u00b2\u2213ab+b\u00b2); a\u2074-b\u2074 = (a\u00b2+b\u00b2)(a+b)(a-b)', 'Use for simplification Qs. Also: x\u00b2+(a+b)x+ab = (x+a)(x+b). Helps in quick quadratic solving.', 'Confirmed', 5),
  f('Algebra', 'Quadratic Roots — Sum & Product', 'For ax\u00b2+bx+c=0: Sum of roots = -b/a; Product of roots = c/a', 'If roots are \u03b1,\u03b2: new equation with roots 1/\u03b1,1/\u03b2 is cx\u00b2+bx+a=0 (reverse coefficients). SSC loves this!', 'Hot', 5),

  // ============ SPEED, DISTANCE & TIME (additional +1) ============
  f('Speed, Distance & Time', 'Boats & Streams Advanced', 'Time upstream / Time downstream = (u+v)/(u-v); Total time = D/(u+v) + D/(u-v)', 'If same distance covered both ways, average speed = (u\u00b2-v\u00b2)/u. For still-water speed: u = (D+U)/2.', 'Confirmed', 13),

  // ============ PROFIT & LOSS (additional +1) ============
  f('Profit & Loss', 'Successive Discounts & Marked Price', 'SP = MP \u00d7 (100-d\u2081)/100 \u00d7 (100-d\u2082)/100; To find MP: MP = CP \u00d7 (100+P%) / (100-d%)', 'Three successive discounts of 10%, 20%, 30%: equiv = 1-(0.9\u00d70.8\u00d70.7) = 1-0.504 = 49.6% discount.', 'Hot', 8),

  // ============ SIMPLE & COMPOUND INTEREST (additional +1) ============
  f('Simple & Compound Interest', 'Half-Yearly CI & Effective Rate', 'Half-yearly: A = P(1+R/200)\u00b2\u207f; Effective annual rate = (1+R/200)\u00b2 - 1', 'For 10% p.a. compounded half-yearly: effective rate = (1.05)\u00b2-1 = 10.25%. Quarterly: (1+R/400)\u2074\u207f.', 'Confirmed', 9),
]

// -- PYQ Data (maths only) ---------------------------------------------------

export const mathsPYQs: MathsPYQEntry[] = [
  { id: 1, year: '2023', shift: 'Tier 1 (13 Sep)', subject: 'maths', topic: 'Percentage', question: 'If the price of sugar increases by 25%, by what % must a family reduce consumption to keep expenditure the same?', options: ['20%', '25%', '30%', '15%'], answer: '20%', explanation: 'Reduction% = (Increase%/(100+Increase%)) \u00d7 100 = (25/125)\u00d7100 = 20%.', formulaUsed: 'Reduction = r/(100+r) \u00d7 100', examProb: 'Hot' },
  { id: 2, year: '2023', shift: 'Tier 1 (14 Sep)', subject: 'maths', topic: 'Profit & Loss', question: 'A shopkeeper marks his goods 40% above CP and allows a discount of 20%. Find his profit%.', options: ['12%', '15%', '10%', '20%'], answer: '12%', explanation: 'Let CP=100. MP=140. SP=140\u00d780/100=112. Profit%=12%.', formulaUsed: 'SP = MP\u00d7(100-d%)/100; P% = (SP-CP)/CP \u00d7 100', examProb: 'Hot' },
  { id: 3, year: '2022', shift: 'Tier 1 (1 Dec)', subject: 'maths', topic: 'Simple & Compound Interest', question: 'The difference between CI and SI for 2 years at 10% p.a. on a certain sum is \u20b950. Find the sum.', options: ['\u20b95000', '\u20b94000', '\u20b96000', '\u20b95500'], answer: '\u20b95000', explanation: 'CI-SI for 2 years = P(R/100)\u00b2 = P\u00d7(1/100) = 50 \u2192 P = 5000.', formulaUsed: 'CI - SI (2 yrs) = P(R/100)\u00b2', examProb: 'Hot' },
  { id: 4, year: '2023', shift: 'Tier 1 (20 Sep)', subject: 'maths', topic: 'Number System', question: 'If HCF and LCM of two numbers are 12 and 360, and one number is 60, find the other.', options: ['72', '84', '60', '48'], answer: '72', explanation: 'HCF \u00d7 LCM = Product. 12 \u00d7 360 = 60 \u00d7 x \u2192 x = 4320/60 = 72.', formulaUsed: 'HCF \u00d7 LCM = a \u00d7 b', examProb: 'Hot' },
  { id: 5, year: '2022', shift: 'Tier 1 (5 Dec)', subject: 'maths', topic: 'Number System', question: 'Find the unit digit of 7\u00b2\u2070\u00b2\u00b3.', options: ['7', '9', '3', '1'], answer: '3', explanation: 'Unit digit cycle of 7: {7,9,3,1}. 2023 mod 4 = 3. Third in cycle = 3.', formulaUsed: 'Unit digit cycle repeats every 4', examProb: 'Hot' },
  { id: 6, year: '2023', shift: 'Tier 1 (17 Sep)', subject: 'maths', topic: 'Algebra', question: 'If x + 1/x = 5, find x\u00b3 + 1/x\u00b3.', options: ['110', '115', '120', '125'], answer: '110', explanation: 'x\u00b3+1/x\u00b3 = (x+1/x)\u00b3 - 3(x+1/x) = 125 - 15 = 110.', formulaUsed: 'x\u00b3+1/x\u00b3 = k\u00b3-3k where k=x+1/x', examProb: 'Hot' },
  { id: 7, year: '2024', shift: 'Tier 1 (9 Sep)', subject: 'maths', topic: 'Algebra', question: 'If a+b+c=0, find (a\u00b3+b\u00b3+c\u00b3)/(abc).', options: ['0', '1', '3', '-3'], answer: '3', explanation: 'When a+b+c=0, a\u00b3+b\u00b3+c\u00b3=3abc. So ratio = 3abc/abc = 3.', formulaUsed: 'If a+b+c=0, then a\u00b3+b\u00b3+c\u00b3=3abc', examProb: 'Hot' },
  { id: 8, year: '2024', shift: 'Tier 1 (10 Sep)', subject: 'maths', topic: 'Geometry', question: 'In a circle of radius 13 cm, a chord is at a distance of 5 cm from center. Find chord length.', options: ['24 cm', '20 cm', '26 cm', '18 cm'], answer: '24 cm', explanation: 'Half chord = \u221a(13\u00b2-5\u00b2) = \u221a(144) = 12. Full chord = 24 cm.', formulaUsed: 'Half chord = \u221a(r\u00b2-d\u00b2)', examProb: 'Hot' },
  { id: 9, year: '2023', shift: 'Tier 1 (21 Sep)', subject: 'maths', topic: 'Geometry', question: 'If the angles of a triangle are in ratio 1:2:3, find the largest angle.', options: ['60\u00b0', '90\u00b0', '120\u00b0', '80\u00b0'], answer: '90\u00b0', explanation: 'x+2x+3x=180\u00b0 \u2192 6x=180\u00b0 \u2192 x=30\u00b0. Largest = 3\u00d730\u00b0 = 90\u00b0.', formulaUsed: 'Angle sum of triangle = 180\u00b0', examProb: 'Hot' },
  { id: 10, year: '2024', shift: 'Tier 1 (11 Sep)', subject: 'maths', topic: 'Mensuration', question: 'A cylinder has radius 7 cm and height 10 cm. Find its total surface area.', options: ['748 cm\u00b2', '880 cm\u00b2', '660 cm\u00b2', '440 cm\u00b2'], answer: '748 cm\u00b2', explanation: 'TSA = 2\u03c0r(r+h) = 2\u00d722/7\u00d77\u00d7(7+10) = 44\u00d717 = 748 cm\u00b2.', formulaUsed: 'TSA of cylinder = 2\u03c0r(r+h)', examProb: 'Confirmed' },
  { id: 11, year: '2023', shift: 'Tier 1 (15 Sep)', subject: 'maths', topic: 'Mensuration', question: 'The volume of a sphere is 4851 cm\u00b3. Find its radius. (Use \u03c0=22/7)', options: ['10.5 cm', '7 cm', '14 cm', '21 cm'], answer: '10.5 cm', explanation: '4/3 \u00d7 22/7 \u00d7 r\u00b3 = 4851. r\u00b3 = 4851\u00d721/88 = 1157.625. r = 10.5 cm.', formulaUsed: 'V = 4/3 \u03c0r\u00b3', examProb: 'Confirmed' },
  { id: 12, year: '2024', shift: 'Tier 1 (12 Sep)', subject: 'maths', topic: 'Trigonometry', question: 'If sin\u03b8 + cos\u03b8 = \u221a2, find sin\u2074\u03b8 + cos\u2074\u03b8.', options: ['1/2', '1', '3/4', '1/4'], answer: '1/2', explanation: 'sin\u03b8+cos\u03b8=\u221a2 \u2192 squaring: 1+2sin\u03b8cos\u03b8=2 \u2192 sin\u03b8cos\u03b8=1/2. sin\u2074\u03b8+cos\u2074\u03b8 = (sin\u00b2\u03b8+cos\u00b2\u03b8)\u00b2-2sin\u00b2\u03b8cos\u00b2\u03b8 = 1-2(1/4) = 1/2.', formulaUsed: 'sin\u2074\u03b8+cos\u2074\u03b8 = 1-2sin\u00b2\u03b8cos\u00b2\u03b8', examProb: 'Hot' },
  { id: 13, year: '2023', shift: 'Tier 1 (18 Sep)', subject: 'maths', topic: 'Trigonometry', question: 'The angle of elevation of a tower from a point 100m away is 60\u00b0. Find the height.', options: ['100\u221a3 m', '100 m', '50\u221a3 m', '200 m'], answer: '100\u221a3 m', explanation: 'tan60\u00b0 = h/100 \u2192 \u221a3 = h/100 \u2192 h = 100\u221a3 m.', formulaUsed: 'tan\u03b8 = Height/Base', examProb: 'Hot' },
  { id: 14, year: '2022', shift: 'Tier 1 (2 Dec)', subject: 'maths', topic: 'Speed, Distance & Time', question: 'A train 150m long passes a pole in 15 seconds. Find its speed in km/h.', options: ['36 km/h', '40 km/h', '45 km/h', '54 km/h'], answer: '36 km/h', explanation: 'Speed = 150/15 = 10 m/s = 10\u00d718/5 = 36 km/h.', formulaUsed: 'Speed = Length/Time; m/s to km/h \u00d718/5', examProb: 'Hot' },
  { id: 15, year: '2024', shift: 'Tier 1 (13 Sep)', subject: 'maths', topic: 'Speed, Distance & Time', question: 'A man rows downstream 30 km in 3 hours and upstream 18 km in 3 hours. Find speed of stream.', options: ['2 km/h', '3 km/h', '4 km/h', '1 km/h'], answer: '2 km/h', explanation: 'Downstream = 30/3=10; Upstream = 18/3=6. Stream = (10-6)/2 = 2 km/h.', formulaUsed: 'Stream speed = (Downstream-Upstream)/2', examProb: 'Confirmed' },
  { id: 16, year: '2023', shift: 'Tier 1 (19 Sep)', subject: 'maths', topic: 'Time & Work', question: 'A can do a work in 12 days, B in 18 days. In how many days can they do it together?', options: ['7.2 days', '7 days', '8 days', '6 days'], answer: '7.2 days', explanation: 'LCM(12,18)=36. A=3u/day, B=2u/day. Together=5u/day. 36/5=7.2 days.', formulaUsed: 'LCM method: Total/Combined rate', examProb: 'Hot' },
  { id: 17, year: '2022', shift: 'Tier 1 (6 Dec)', subject: 'maths', topic: 'Average & Alligation', question: 'The average of 20 numbers is 35. If each number is increased by 5, what is the new average?', options: ['40', '35', '45', '30'], answer: '40', explanation: 'When each number increases by k, average also increases by k. New avg = 35+5 = 40.', formulaUsed: 'Adding k to each \u2192 avg increases by k', examProb: 'Hot' },
  { id: 18, year: '2024', shift: 'Tier 1 (14 Sep)', subject: 'maths', topic: 'Ratio & Proportion', question: 'If a:b = 2:3 and b:c = 4:5, find a:b:c.', options: ['8:12:15', '2:3:5', '4:6:5', '8:12:10'], answer: '8:12:15', explanation: 'Make b common: a:b = 2:3 = 8:12; b:c = 4:5 = 12:15. So a:b:c = 8:12:15.', formulaUsed: 'Make common term equal using LCM', examProb: 'Hot' },
  { id: 19, year: '2024', shift: 'Tier 1 (9 Sep)', subject: 'maths', topic: 'Data Interpretation', question: 'In a pie chart, if the central angle for category A is 72\u00b0, what percentage does A represent?', options: ['20%', '25%', '18%', '15%'], answer: '20%', explanation: '72\u00b0/360\u00b0 \u00d7 100 = 20%.', formulaUsed: '% = (angle/360) \u00d7 100', examProb: 'Hot' },
  { id: 20, year: '2023', shift: 'Tier 1 (22 Sep)', subject: 'maths', topic: 'Data Interpretation', question: 'Production in 2020 was 500 units and in 2021 was 650 units. Find % increase.', options: ['30%', '25%', '35%', '23%'], answer: '30%', explanation: '% increase = (650-500)/500 \u00d7 100 = 150/500 \u00d7 100 = 30%.', formulaUsed: '% change = (New-Old)/Old \u00d7 100', examProb: 'Hot' },
  { id: 21, year: '2024', shift: 'Tier 1 (15 Sep)', subject: 'maths', topic: 'Percentage', question: 'In an election between 2 candidates, 10% votes were invalid. Winner got 70% valid votes and won by 5600 votes. Find total votes.', options: ['14000', '16000', '12000', '20000'], answer: '14000', explanation: 'Let valid=V. 0.4V=5600 \u2192 V=14000.', formulaUsed: 'Winner margin = (W% - L%) \u00d7 valid votes', examProb: 'Hot' },
  { id: 22, year: '2022', shift: 'Tier 1 (8 Dec)', subject: 'maths', topic: 'Profit & Loss', question: 'A man buys an article for \u20b9800 and sells it at a gain of 15%. What is the selling price?', options: ['\u20b9920', '\u20b9900', '\u20b9950', '\u20b9880'], answer: '\u20b9920', explanation: 'SP = 800 \u00d7 115/100 = \u20b9920.', formulaUsed: 'SP = CP \u00d7 (100+P%)/100', examProb: 'Confirmed' },
  { id: 23, year: '2024', shift: 'Tier 1 (16 Sep)', subject: 'maths', topic: 'Coordinate Geometry', question: 'Find the distance between points (3,4) and (6,8).', options: ['5', '7', '6', '4'], answer: '5', explanation: 'Distance = \u221a((6-3)\u00b2+(8-4)\u00b2) = \u221a(9+16) = \u221a25 = 5.', formulaUsed: 'Distance = \u221a[(x\u2082-x\u2081)\u00b2+(y\u2082-y\u2081)\u00b2]', examProb: 'Hot' },
  { id: 24, year: '2023', shift: 'Tier 1 (23 Sep)', subject: 'maths', topic: 'Statistics', question: 'The mean of 5 observations is 15. If one observation 25 is replaced by 5, find the new mean.', options: ['11', '12', '10', '13'], answer: '11', explanation: 'Old sum = 5\u00d715=75. New sum = 75-25+5=55. New mean = 55/5=11.', formulaUsed: 'Mean = Sum/n; adjust sum for replacement', examProb: 'Confirmed' },
  { id: 25, year: '2024', shift: 'Tier 1 (17 Sep)', subject: 'maths', topic: 'Surds & Indices', question: 'Simplify: (27)^(2/3) \u00d7 (8)^(-1/3)', options: ['9/2', '3/2', '27/2', '6'], answer: '9/2', explanation: '27^(2/3) = (3\u00b3)^(2/3) = 3\u00b2 = 9. 8^(-1/3) = (2\u00b3)^(-1/3) = 2\u207b\u00b9 = 1/2. Product = 9/2.', formulaUsed: '(a\u207f)^m = a^(nm); a\u207b\u207f = 1/a\u207f', examProb: 'Confirmed' },

  // ── 2019–2021 & 2025–2026 PYQs ─────────────────────────────────────
  { id: 26, year: '2019', shift: 'Tier 1 (4 Jun)', subject: 'maths', topic: 'Geometry', question: 'In \u25b3ABC, the bisector of angle A meets BC at D. If AB = 6 cm, AC = 8 cm, and BC = 7 cm, find BD.', options: ['3 cm', '4 cm', '2.5 cm', '3.5 cm'], answer: '3 cm', explanation: 'By angle bisector theorem BD/DC = AB/AC = 6/8 = 3/4. BD = 3/(3+4) \u00d7 7 = 3 cm.', formulaUsed: 'Angle bisector theorem: BD/DC = AB/AC', examProb: 'Hot' },
  { id: 27, year: '2019', shift: 'Tier 1 (6 Jun)', subject: 'maths', topic: 'Geometry', question: 'The medians of a triangle are 9 cm, 12 cm, and 15 cm. Find the area of the triangle.', options: ['72 cm\u00b2', '96 cm\u00b2', '108 cm\u00b2', '54 cm\u00b2'], answer: '72 cm\u00b2', explanation: 'Area of triangle = (4/3) \u00d7 area of triangle formed by medians. Median triangle sides 9,12,15 form a right triangle (9\u00b2+12\u00b2=15\u00b2). Its area = \u00bd\u00d79\u00d712 = 54. Triangle area = 4/3 \u00d7 54 = 72 cm\u00b2.', formulaUsed: 'Area = (4/3) \u00d7 area of median triangle', examProb: 'Hot' },
  { id: 28, year: '2020', shift: 'Tier 1 (3 Mar)', subject: 'maths', topic: 'Geometry', question: 'Two chords AB and CD of a circle intersect at P inside the circle. If PA = 4 cm, PB = 6 cm, PC = 3 cm, find PD.', options: ['8 cm', '6 cm', '10 cm', '7 cm'], answer: '8 cm', explanation: 'By intersecting chords theorem: PA \u00d7 PB = PC \u00d7 PD. 4 \u00d7 6 = 3 \u00d7 PD. PD = 24/3 = 8 cm.', formulaUsed: 'PA \u00d7 PB = PC \u00d7 PD (intersecting chords)', examProb: 'Hot' },
  { id: 29, year: '2021', shift: 'Tier 1 (13 Aug)', subject: 'maths', topic: 'Algebra', question: 'If a - b = 3 and a\u00b2 + b\u00b2 = 29, find the value of ab.', options: ['10', '12', '8', '15'], answer: '10', explanation: '(a-b)\u00b2 = a\u00b2 - 2ab + b\u00b2. 9 = 29 - 2ab. 2ab = 20. ab = 10.', formulaUsed: '(a-b)\u00b2 = a\u00b2 + b\u00b2 - 2ab', examProb: 'Hot' },
  { id: 30, year: '2025', shift: 'Tier 1 (7 Mar)', subject: 'maths', topic: 'Algebra', question: 'If x\u00b2 - 3x + 1 = 0, find x\u00b3 + 1/x\u00b3.', options: ['18', '27', '24', '21'], answer: '18', explanation: 'x + 1/x = 3 (dividing equation by x). x\u00b3 + 1/x\u00b3 = (x+1/x)\u00b3 - 3(x+1/x) = 27 - 9 = 18.', formulaUsed: 'x\u00b3+1/x\u00b3 = k\u00b3-3k', examProb: 'Hot' },
  { id: 31, year: '2020', shift: 'Tier 1 (5 Mar)', subject: 'maths', topic: 'Number System', question: 'Find the largest 4-digit number exactly divisible by 88.', options: ['9944', '9956', '9968', '9936'], answer: '9944', explanation: '9999 \u00f7 88 = 113 remainder 55. Largest = 9999 - 55 = 9944.', formulaUsed: 'Largest number \u2264 N divisible by d = N - (N mod d)', examProb: 'Confirmed' },
  { id: 32, year: '2021', shift: 'Tier 1 (16 Aug)', subject: 'maths', topic: 'Number System', question: 'What is the remainder when 17\u00b2\u2070\u00b2\u2076 is divided by 5?', options: ['1', '2', '3', '4'], answer: '4', explanation: 'Unit digit cycle of 17 (same as 7): {7,9,3,1}. 2026 mod 4 = 2. Second in cycle gives unit digit 9. 9 mod 5 = 4.', formulaUsed: 'Unit digit cycle + modular arithmetic', examProb: 'Confirmed' },
  { id: 33, year: '2025', shift: 'Tier 1 (10 Mar)', subject: 'maths', topic: 'Trigonometry', question: 'If sec\u03b8 + tan\u03b8 = 3, find the value of sec\u03b8.', options: ['5/3', '4/3', '3/2', '2'], answer: '5/3', explanation: 'sec\u03b8 - tan\u03b8 = 1/(sec\u03b8+tan\u03b8) = 1/3. Adding: 2sec\u03b8 = 3 + 1/3 = 10/3. sec\u03b8 = 5/3.', formulaUsed: 'sec\u00b2\u03b8 - tan\u00b2\u03b8 = 1 \u2192 (sec+tan)(sec-tan) = 1', examProb: 'Hot' },
  { id: 34, year: '2026', shift: 'Tier 1 (Mar)', subject: 'maths', topic: 'Trigonometry', question: 'From the top of a 60 m high tower, the angle of depression of two cars on opposite sides are 30\u00b0 and 60\u00b0. Find the distance between the cars.', options: ['80\u221a3 m', '40\u221a3 m', '60\u221a3 m', '120 m'], answer: '80\u221a3 m', explanation: 'Distance from tower base: d\u2081 = 60/tan30\u00b0 = 60\u221a3 m, d\u2082 = 60/tan60\u00b0 = 60/\u221a3 = 20\u221a3 m. Total = 60\u221a3 + 20\u221a3 = 80\u221a3 m.', formulaUsed: 'tan\u03b8 = height/base; opposite sides add distances', examProb: 'Hot' },
  { id: 35, year: '2019', shift: 'Tier 1 (10 Jun)', subject: 'maths', topic: 'Mensuration', question: 'A cone of height 24 cm and base radius 7 cm is cut at 8 cm from vertex. Find the volume of the frustum. (Use \u03c0=22/7)', options: ['4018.67 cm\u00b3', '3800 cm\u00b3', '3562.67 cm\u00b3', '4200 cm\u00b3'], answer: '3562.67 cm\u00b3', explanation: 'Small cone: r/R = 8/24 = 1/3, so small r = 7/3 cm. Frustum volume = \u2153\u03c0h(R\u00b2+r\u00b2+Rr) = \u2153\u00d722/7\u00d716\u00d7(49+49/9+49/3) = \u2153\u00d722/7\u00d716\u00d7(49\u00d713/9) = 3562.67 cm\u00b3.', formulaUsed: 'Frustum V = \u2153\u03c0h(R\u00b2+r\u00b2+Rr)', examProb: 'Hot' },
  { id: 36, year: '2021', shift: 'Tier 1 (18 Aug)', subject: 'maths', topic: 'Mensuration', question: 'A hemisphere of radius 7 cm is placed on a cylinder of same radius and height 10 cm. Find total surface area. (\u03c0=22/7)', options: ['748 cm\u00b2', '858 cm\u00b2', '792 cm\u00b2', '814 cm\u00b2'], answer: '858 cm\u00b2', explanation: 'TSA = CSA of cylinder + base of cylinder + CSA of hemisphere = 2\u03c0rh + \u03c0r\u00b2 + 2\u03c0r\u00b2 = 2\u03c0r(h+r) + \u03c0r\u00b2 = 2\u00d722/7\u00d77\u00d717 + 22/7\u00d749 = 748 + 154 = 858 cm\u00b2 (note: hemisphere replaces one circle end of cylinder but adds its curved surface).', formulaUsed: 'TSA = 2\u03c0rh + \u03c0r\u00b2 + 2\u03c0r\u00b2', examProb: 'Confirmed' },
  { id: 37, year: '2026', shift: 'Tier 1 (Mar)', subject: 'maths', topic: 'Percentage', question: 'A number is first increased by 20% and then decreased by 20%. What is the net % change?', options: ['-4%', '0%', '-2%', '+4%'], answer: '-4%', explanation: 'Net change = a + b + ab/100 = 20 + (-20) + (20\u00d7-20)/100 = 0 - 4 = -4%.', formulaUsed: 'Successive % change: a + b + ab/100', examProb: 'Hot' },
  { id: 38, year: '2020', shift: 'Tier 1 (7 Mar)', subject: 'maths', topic: 'Profit & Loss', question: 'A man bought 10 oranges for \u20b940 and sold 8 oranges for \u20b940. Find his profit percentage.', options: ['25%', '20%', '30%', '15%'], answer: '25%', explanation: 'CP per orange = 4. SP per orange = 5. Profit% = (5-4)/4 \u00d7 100 = 25%.', formulaUsed: 'Profit% = (SP-CP)/CP \u00d7 100', examProb: 'Hot' },
  { id: 39, year: '2025', shift: 'Tier 1 (12 Mar)', subject: 'maths', topic: 'Time & Work', question: 'A and B together can do a piece of work in 12 days. A alone can do it in 20 days. In how many days can B alone do it?', options: ['30 days', '25 days', '35 days', '28 days'], answer: '30 days', explanation: '1/A + 1/B = 1/12. 1/20 + 1/B = 1/12. 1/B = 1/12 - 1/20 = (5-3)/60 = 2/60 = 1/30. B = 30 days.', formulaUsed: '1/A + 1/B = 1/Together', examProb: 'Hot' },
  { id: 40, year: '2026', shift: 'Tier 1 (Mar)', subject: 'maths', topic: 'Speed, Distance & Time', question: 'A car covers 240 km at 60 km/h and returns at 40 km/h. Find the average speed for the whole journey.', options: ['48 km/h', '50 km/h', '45 km/h', '52 km/h'], answer: '48 km/h', explanation: 'Same distance, so avg speed = 2ab/(a+b) = 2\u00d760\u00d740/(60+40) = 4800/100 = 48 km/h.', formulaUsed: 'Avg speed (same distance) = 2ab/(a+b)', examProb: 'Hot' },
  { id: 41, year: '2025', shift: 'Tier 1 (14 Mar)', subject: 'maths', topic: 'Data Interpretation', question: 'In a bar graph, production in 2022 is 800 units and in 2023 is 960 units. What is the percentage increase?', options: ['20%', '16%', '25%', '18%'], answer: '20%', explanation: '% increase = (960-800)/800 \u00d7 100 = 160/800 \u00d7 100 = 20%.', formulaUsed: '% change = (New-Old)/Old \u00d7 100', examProb: 'Hot' },
  { id: 42, year: '2021', shift: 'Tier 1 (20 Aug)', subject: 'maths', topic: 'Simple & Compound Interest', question: 'At what rate of CI will \u20b98000 become \u20b99261 in 2 years, compounded half-yearly?', options: ['7.5%', '10%', '5%', '8%'], answer: '7.5%', explanation: 'A = P(1+R/200)\u2074. 9261/8000 = (1+R/200)\u2074. (9261/8000)^(1/4) = 1+R/200. Cube root of 9261=21\u00b3 is wrong; 9261/8000 = (21/20)\u2074 is not exact. Actually (1+R/200)\u2074 = 9261/8000. Taking fourth root: 1+R/200 = (9261/8000)^0.25 \u2248 1.0375. R/200 = 0.0375. R = 7.5%.', formulaUsed: 'Half-yearly CI: A = P(1+R/200)^(2n)', examProb: 'Confirmed' },
  { id: 43, year: '2026', shift: 'Tier 1 (Mar)', subject: 'maths', topic: 'Probability', question: 'Two dice are thrown simultaneously. What is the probability that the sum is 9?', options: ['1/9', '1/6', '1/12', '5/36'], answer: '1/9', explanation: 'Favorable outcomes for sum 9: (3,6),(4,5),(5,4),(6,3) = 4. Total outcomes = 36. P = 4/36 = 1/9.', formulaUsed: 'P = Favorable/Total; Two dice total = 36', examProb: 'Hot' },
  { id: 44, year: '2025', shift: 'Tier 1 (8 Mar)', subject: 'maths', topic: 'Permutation & Combination', question: 'In how many ways can 5 people be seated in a row such that two specific persons always sit together?', options: ['48', '24', '120', '60'], answer: '48', explanation: 'Treat the 2 persons as one unit: 4 units can be arranged in 4! = 24 ways. The 2 persons can swap: 2! = 2 ways. Total = 24 \u00d7 2 = 48.', formulaUsed: 'Bundle method: (n-1)! \u00d7 r! for r persons together', examProb: 'Hot' },
  { id: 45, year: '2025', shift: 'Tier 1 (15 Mar)', subject: 'maths', topic: 'Clock Problems', question: 'At what time between 4 and 5 o\'clock will the hands of a clock be at right angles?', options: ['4:05 5/11', '4:38 2/11', '4:16 4/11', '4:49 1/11'], answer: '4:38 2/11', explanation: 'At 4:00, angle = 120\u00b0. For right angle (90\u00b0), minute hand must reduce gap by 30\u00b0 or increase to 90\u00b0. Minute hand gains 5.5\u00b0/min. For 90\u00b0: |120 - 5.5M| = 90. 120-5.5M = 90 gives M = 30/5.5 = 60/11 \u2248 5.45. Or 5.5M-120 = 90 gives M = 210/5.5 = 420/11 = 38 2/11 min. Second instance: 4:38 2/11.', formulaUsed: 'Angle = |30H - 5.5M|; solve for desired angle', examProb: 'Hot' },
]
