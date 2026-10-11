// Resources directory, organized by the five worlds of a financial plan.
// Every entry links to the publisher's own page, so figures stay current without site updates.
window.RESOURCES = [
  {
    group: "Income",
    blurb: "Social Security, pensions and retirement distributions.",
    items: [
      { name: "COLA & annual fact sheet", desc: "COLA, wage base, earnings test limits and max benefits.", org: "SSA", url: "https://www.ssa.gov/cola/" },
      { name: "Benefit reduction by claiming age", desc: "Full retirement age and early or delayed claiming effects.", org: "SSA", url: "https://www.ssa.gov/benefits/retirement/planner/agereduction.html" },
      { name: "Working while receiving benefits", desc: "How the earnings test withholds benefits.", org: "SSA", url: "https://www.ssa.gov/benefits/retirement/planner/whileworking.html" },
      { name: "my Social Security", desc: "Where clients download their earnings record and statement.", org: "SSA", url: "https://www.ssa.gov/myaccount/" },
      { name: "Open Social Security", desc: "Free claiming strategy calculator for singles and couples.", org: "Open Social Security", url: "https://opensocialsecurity.com/" },
      { name: "Life expectancy calculator", desc: "Average life expectancy by birth date and sex.", org: "SSA", url: "https://www.ssa.gov/oact/population/longevity.html" },
      { name: "Required minimum distributions FAQs", desc: "RMD ages, deadlines and aggregation rules.", org: "IRS", url: "https://www.irs.gov/retirement-plans/retirement-plan-and-ira-required-minimum-distributions-faqs" },
      { name: "Publication 590-B", desc: "IRA distributions, including the life expectancy tables.", org: "IRS", url: "https://www.irs.gov/publications/p590b" },
      { name: "Federal retirement (FERS / CSRS)", desc: "Federal employee pension and retirement guidance.", org: "OPM", url: "https://www.opm.gov/retirement-center/" },
      { name: "Pension Benefit Guaranty Corp.", desc: "Guaranteed pension maximums and plan lookups.", org: "PBGC", url: "https://www.pbgc.gov/" }
    ]
  },
  {
    group: "Investments",
    blurb: "Account limits, savings vehicles and market data for assumptions.",
    items: [
      { name: "Contribution & benefit limits (COLA)", desc: "Every IRS retirement plan dollar limit, updated each year.", org: "IRS", url: "https://www.irs.gov/retirement-plans/cola-increases-for-dollar-limitations-on-benefits-and-contributions" },
      { name: "401(k) & profit-sharing limits", desc: "Deferral, employer and total contribution limits.", org: "IRS", url: "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-401k-and-profit-sharing-plan-contribution-limits" },
      { name: "IRA contribution limits", desc: "Traditional and Roth IRA limits and deadlines.", org: "IRS", url: "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-ira-contribution-limits" },
      { name: "Catch-up contributions", desc: "Age 50+, age 60–63 and Roth catch-up rules.", org: "IRS", url: "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-catch-up-contributions" },
      { name: "Roth IRAs", desc: "Eligibility, income phase-outs and conversion rules.", org: "IRS", url: "https://www.irs.gov/retirement-plans/roth-iras" },
      { name: "Thrift Savings Plan", desc: "TSP funds, contribution rules and withdrawal options.", org: "TSP", url: "https://www.tsp.gov/" },
      { name: "Saving for College", desc: "State-by-state 529 plan details and tax benefits.", org: "Saving for College", url: "https://www.savingforcollege.com/" },
      { name: "I bonds", desc: "Current I bond rate and purchase limits.", org: "TreasuryDirect", url: "https://www.treasurydirect.gov/savings-bonds/i-bonds/" },
      { name: "Treasury interest rates", desc: "Daily Treasury yield curve and real yields.", org: "U.S. Treasury", url: "https://home.treasury.gov/policy-issues/financing-the-government/interest-rate-statistics" },
      { name: "Consumer Price Index", desc: "Monthly CPI releases and historical inflation.", org: "BLS", url: "https://www.bls.gov/cpi/" },
      { name: "FRED", desc: "Rates, inflation and other economic series.", org: "St. Louis Fed", url: "https://fred.stlouisfed.org/" }
    ]
  },
  {
    group: "Tax",
    blurb: "Brackets, current-year adjustments and state taxes.",
    items: [
      { name: "Federal income tax brackets", desc: "Current-year rates and bracket thresholds.", org: "IRS", url: "https://www.irs.gov/filing/federal-income-tax-rates-and-brackets" },
      { name: "IRS newsroom", desc: "Annual inflation adjustments and guidance as they're announced.", org: "IRS", url: "https://www.irs.gov/newsroom" },
      { name: "Forms & instructions", desc: "Current IRS forms, instructions and publications.", org: "IRS", url: "https://www.irs.gov/forms-instructions" },
      { name: "State tax data", desc: "State income, property, estate and inheritance tax comparisons.", org: "Tax Foundation", url: "https://taxfoundation.org/data/all/state/" }
    ]
  },
  {
    group: "Healthcare",
    blurb: "Medicare, pre-65 coverage, HSAs and long-term care costs.",
    items: [
      { name: "Medicare costs", desc: "Part A/B premiums, deductibles and IRMAA brackets.", org: "Medicare.gov", url: "https://www.medicare.gov/basics/costs/medicare-costs" },
      { name: "Medicare Plan Finder", desc: "Compare Part D and Medicare Advantage plans by ZIP.", org: "Medicare.gov", url: "https://www.medicare.gov/plan-compare/" },
      { name: "CMS newsroom", desc: "Annual premium and IRMAA announcements.", org: "CMS", url: "https://www.cms.gov/newsroom" },
      { name: "HealthCare.gov", desc: "Marketplace coverage for early retirees.", org: "HealthCare.gov", url: "https://www.healthcare.gov/" },
      { name: "Publication 969 (HSAs)", desc: "HSA, FSA and other tax-favored health plan rules.", org: "IRS", url: "https://www.irs.gov/publications/p969" },
      { name: "Cost of care survey", desc: "Long-term care costs by state and care type.", org: "Genworth", url: "https://www.genworth.com/aging-and-you/finances/cost-of-care.html" }
    ]
  },
  {
    group: "Legacy",
    blurb: "Estate and gift tax, beneficiaries and survivors.",
    items: [
      { name: "Estate tax", desc: "Exemption amount, filing thresholds and portability.", org: "IRS", url: "https://www.irs.gov/businesses/small-businesses-self-employed/estate-tax" },
      { name: "Estate tax FAQs", desc: "What's included in the estate and how it's valued.", org: "IRS", url: "https://www.irs.gov/businesses/small-businesses-self-employed/frequently-asked-questions-on-estate-taxes" },
      { name: "Gift tax FAQs", desc: "Annual exclusion and lifetime gift rules.", org: "IRS", url: "https://www.irs.gov/businesses/small-businesses-self-employed/frequently-asked-questions-on-gift-taxes" },
      { name: "RMDs for IRA beneficiaries", desc: "Inherited IRA rules, including the 10-year rule.", org: "IRS", url: "https://www.irs.gov/retirement-plans/required-minimum-distributions-for-ira-beneficiaries" },
      { name: "Publication 559", desc: "Tax guidance for survivors, executors and administrators.", org: "IRS", url: "https://www.irs.gov/publications/p559" },
      { name: "Survivor benefits", desc: "Social Security benefits for spouses, children and dependents.", org: "SSA", url: "https://www.ssa.gov/survivor" }
    ]
  }
];
