export type FieldType = "text" | "textarea" | "select";

export interface FormField {
  id: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: string[];
  required?: boolean;
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  icon: string;
  fields: FormField[];
  estimatedMinutes: number;
  example: Record<string, string>;
  featured?: boolean;
}

export const agents: Agent[] = [
  {
    id: "qbr",
    name: "Partner QBR Agent",
    description: "Prepare for a partner quarterly business review — wins, pipeline, risks, and talking points.",
    icon: "📊",
    estimatedMinutes: 150,
    fields: [
      { id: "partnerName", label: "Partner Name", type: "text", placeholder: "e.g. Presidio", required: true },
      { id: "quarter", label: "Quarter / Time Period", type: "text", placeholder: "e.g. Q2 FY2026", required: true },
      { id: "keyWins", label: "Key Wins", type: "textarea", placeholder: "Closed deals, certifications, program milestones, new logos..." },
      { id: "pipelineSummary", label: "Pipeline Summary", type: "textarea", placeholder: "Total pipeline value, seat counts, solution mix, top opportunities..." },
      { id: "challenges", label: "Challenges or Risks", type: "textarea", placeholder: "Stalled deals, competitive pressure, resource gaps, churn risk..." },
      { id: "asksFromPartner", label: "Asks from Partner", type: "textarea", placeholder: "What the partner is requesting from Clarix..." },
      { id: "internalAsks", label: "Internal Asks (your asks)", type: "textarea", placeholder: "What you need from internal Clarix teams — SE, marketing, exec..." },
      { id: "tone", label: "Desired Tone", type: "select", options: ["Concise", "Executive-Ready", "Detailed"], required: true },
    ],
    featured: true,
    example: {
      partnerName: "Presidio",
      quarter: "Q2 FY2026",
      keyWins: "Closed 4 net-new deals totaling 1,840 seats and $612K ARR. Presidio achieved Apex tier status in the Clarix Pinnacle Partner Program — ahead of the Q3 target. Launched first joint Clarix CX pipeline motion targeting healthcare and financial services. Two new logos: Pacific Coast Health Network (820 seats, Clarix Unite + Clarix CX) and Cascade Financial Group (340 seats, Clarix Unite). Both deals displaced Vertex Teams Phone and legacy on-prem contact center.",
      pipelineSummary: "$2.1M in active pipeline across 14 opportunities. Mix is 60% Clarix Unite (employee communications only) and 40% full platform (Clarix Unite + Clarix CX). Top opportunity is a 2,400-seat platform deal at Westlake Insurance Group currently in SE evaluation. Presidio forecast commit for Q2 is $890K. Pipeline grew 34% quarter-over-quarter driven by the new healthcare vertical play.",
      challenges: "Two enterprise deals stalled — champion changes at both accounts mid-cycle. Competitive pressure from Nexova on the Westlake Insurance deal; partner needs a competitive displacement playbook and exec support. Presidio's Clarix CX practice is still early — they need more SE capacity for contact center evaluations. One 640-seat renewal at risk due to price sensitivity.",
      asksFromPartner: "Co-funded SE resource for Clarix CX evaluations (at least 2 days/week). Executive sponsor introduction at Westlake Insurance Group. Competitive battlecard against Nexova. $25K MDF approval for Q3 partner-led demand gen event in Chicago.",
      internalAsks: "Clarix CX SE coverage from the overlay team for Presidio's active pipeline. Exec introduction at Westlake Insurance — VP or above. Marketing approval for $25K MDF co-fund. Nexova competitive displacement support from Product Marketing.",
      tone: "Executive-Ready",
    },
  },
  {
    id: "bizplan",
    name: "Partner Business Plan Agent",
    description: "Build a structured Clarix joint business plan with a partner — goals, segments, enablement, and 30/60/90.",
    icon: "📋",
    estimatedMinutes: 165,
    fields: [
      { id: "partnerName", label: "Partner Name", type: "text", placeholder: "e.g. Computacenter", required: true },
      { id: "partnerType", label: "Partner Type", type: "text", placeholder: "e.g. VAR, MSP, SI, Carrier Agent, Subagent" },
      { id: "targetSegment", label: "Target Customer Segment", type: "textarea", placeholder: "e.g. Mid-market healthcare, enterprise financial services, state & local government..." },
      { id: "revenueGoal", label: "Joint Revenue Goal", type: "text", placeholder: "e.g. $1.2M ARR, 4,000 seats in 12 months" },
      { id: "solutions", label: "Priority Clarix Solutions", type: "textarea", placeholder: "e.g. Clarix Unite, Clarix CX, Clarix Engage" },
      { id: "gaps", label: "Current Gaps", type: "textarea", placeholder: "Certifications needed, practice areas to build, market coverage gaps..." },
      { id: "timeHorizon", label: "Time Horizon", type: "text", placeholder: "e.g. FY2026 (12 months)" },
    ],
    example: {
      partnerName: "Logicalis",
      partnerType: "Systems Integrator (SI) — currently Peak tier, targeting Apex in the Clarix Pinnacle Partner Program",
      targetSegment: "Mid-market and enterprise accounts in financial services, healthcare, and professional services with 500–5,000 employees. Primary geography: Northeast US. Logicalis has strong existing relationships with CFOs and CIOs in these verticals from their networking and infrastructure practice.",
      revenueGoal: "$1.5M ARR within 12 months (FY2026), approximately 5,500 seats. Stretch goal: Apex tier achievement by Q3 FY2026.",
      solutions: "Clarix Unite as the foundation for employee communications. Clarix CX for customer-facing teams and service modernization. Clarix Engage for financial services clients who need AI-powered customer engagement across voice and digital channels.",
      gaps: "No current Clarix CX practice — Logicalis reps are comfortable with employee communications but avoid contact center deals. Two SEs need Clarix CX certification before they can run demos independently. No co-branded marketing materials exist. Deal registration process not yet adopted — losing potential MDF and Pinnacle program credits on unregistered deals. No executive-level relationship with Clarix yet.",
      timeHorizon: "FY2026 — July 2025 through June 2026 (12 months)",
    },
  },
  {
    id: "followup",
    name: "Partner Meeting Follow-Up Agent",
    description: "Turn raw meeting notes into a polished Clarix partner follow-up with action items and next steps.",
    icon: "✉️",
    estimatedMinutes: 60,
    fields: [
      { id: "partnerName", label: "Partner Name", type: "text", placeholder: "e.g. Carousel Industries", required: true },
      { id: "meetingDate", label: "Meeting Date", type: "text", placeholder: "e.g. June 4, 2025" },
      { id: "meetingNotes", label: "Meeting Notes", type: "textarea", placeholder: "Paste your raw notes here...", required: true },
      { id: "decisions", label: "Decisions Made", type: "textarea", placeholder: "What was agreed on or decided?" },
      { id: "openQuestions", label: "Open Questions", type: "textarea", placeholder: "What still needs to be resolved?" },
      { id: "nextMeeting", label: "Next Meeting Date", type: "text", placeholder: "e.g. June 18, 2025" },
      { id: "tone", label: "Desired Tone", type: "select", options: ["Friendly", "Professional", "Concise"], required: true },
    ],
    example: {
      partnerName: "Agiliti",
      meetingDate: "June 4, 2025",
      meetingNotes: "Met with Dave Kowalski (VP Channel Sales) and Priya Nair (Practice Lead) at Agiliti. Strong energy — they are excited about the Clarix platform and specifically interested in leading with Clarix Engage for their financial services accounts. The Horizon Medical deal (1,200 seats, Clarix Unite + Clarix CX) is their top priority — they need an Clarix SE for the CISO call next week and ideally an executive introduction. Second deal is Pinnacle Legal Group (420 seats, Clarix Unite) which is close but the customer is asking for a proof of concept. Priya flagged that they still haven't registered three pipeline opportunities in the Clarix Pinnacle Partner Program portal — she wasn't clear on the process. Dave asked about MDF availability for Q3 and whether the Pinnacle program has a co-marketing fund for contact center campaigns.",
      decisions: "Clarix will assign an SE for the Horizon Medical CISO call — targeting June 11. I will send Priya the deal registration walkthrough for the Clarix Pinnacle Partner Program today. MDF question escalated to Channel Ops — response by Friday. Clarix will send the Clarix Unite POC guide for the Pinnacle Legal opportunity.",
      openQuestions: "Is MDF available under Agiliti's current Peak tier for a contact center campaign, or do they need to reach Apex first? What is the timeline for the Clarix CX SE certification through Pinnacle? Can we get exec attendance at Agiliti's customer event in Q3?",
      nextMeeting: "June 18, 2025",
      tone: "Professional",
    },
  },
  {
    id: "research",
    name: "Account Research Agent",
    description: "Build a sharp account briefing before an Clarix customer or partner call.",
    icon: "🔍",
    estimatedMinutes: 90,
    fields: [
      { id: "companyName", label: "Company Name", type: "text", placeholder: "e.g. Horizon Blue Cross Blue Shield", required: true },
      { id: "industry", label: "Industry", type: "text", placeholder: "e.g. Healthcare, Financial Services, Retail, State & Local Gov" },
      { id: "opportunity", label: "Known Opportunity", type: "textarea", placeholder: "What deal or initiative are you pursuing? Seat count, solution mix?" },
      { id: "relationship", label: "Current Relationship", type: "textarea", placeholder: "New prospect, existing Clarix customer, partner-referred, via which partner?" },
      { id: "solutions", label: "Clarix Solutions to Position", type: "textarea", placeholder: "e.g. Clarix Unite, Clarix CX, Clarix Engage..." },
      { id: "researchNotes", label: "Research Notes", type: "textarea", placeholder: "Any background, news, org changes, current vendor, competitive intel..." },
    ],
    example: {
      companyName: "Westlake Insurance Group",
      industry: "Insurance / Financial Services",
      opportunity: "2,400-seat platform deal — Clarix Unite for knowledge workers plus Clarix CX for 340 agents across 4 locations. Customer is running a formal RFP shortlisted to Clarix and Nexova. Contact center modernization and Salesforce CRM integration are the primary drivers. Deal value estimated at $1.1M ARR. Partner: Presidio.",
      relationship: "No existing Clarix relationship — net-new logo. Currently on Arova on-prem for contact center (end-of-life in 18 months) and Orbex for employee communications. Partner Presidio brought us in 6 weeks ago. Champion is the IT Director (Marcus Webb) but we have not yet met the economic buyer (CTO, Sandra Hoyt) or the contact center decision committee.",
      solutions: "Clarix Unite for 2,060 knowledge workers. Clarix CX for 340 agents — Salesforce CRM integration is a must-have. Clarix Engage is a strong secondary story for their customer-facing sales teams. Quality management and compliance recording for insurance regulatory requirements.",
      researchNotes: "Westlake Insurance was fined by the state DOI last year for call handling compliance gaps — creates urgency around quality management and call recording. They announced a customer experience initiative in Q1 focused on improving policyholder interactions. Nexova has been in the account 8 weeks and has exec access. Our gap: no relationship with Sandra Hoyt (CTO) or the CFO. Marcus Webb (champion) is strong but has limited internal authority. Presidio has a relationship with the VP of IT — we need to activate that path to the CTO.",
    },
  },
  {
    id: "pipeline",
    name: "Partner Pipeline Review Agent",
    description: "Review an Clarix partner's pipeline, flag at-risk deals, and identify where to focus.",
    icon: "📈",
    estimatedMinutes: 90,
    fields: [
      { id: "partnerName", label: "Partner Name", type: "text", placeholder: "e.g. Presidio", required: true },
      { id: "pipelineSummary", label: "Pipeline Summary", type: "textarea", placeholder: "Total ARR, seat count, solution mix, forecast period..." },
      { id: "topOpportunities", label: "Top Opportunities", type: "textarea", placeholder: "List top 3–5 deals with account name, seat count, solution, stage, close date..." },
      { id: "stalledDeals", label: "Stalled Deals", type: "textarea", placeholder: "Deals that have gone quiet, slipped, or are at risk of going dark..." },
      { id: "forecastConcerns", label: "Forecast Concerns", type: "textarea", placeholder: "Anything that could miss or slip the quarter?" },
      { id: "supportNeeded", label: "Support Needed from Clarix", type: "textarea", placeholder: "SE, exec, competitive, MDF, deal desk, other..." },
    ],
    example: {
      partnerName: "Presidio",
      pipelineSummary: "$3.2M total platform pipeline for Q2 FY2026 across 18 active opportunities. 11,400 total seats. Mix: 55% Clarix Unite (employee communications only), 45% full platform (Clarix Unite + Clarix CX). Commit forecast: $1.1M. Best case: $1.7M. Pipeline is heavily back-loaded — 70% of commit deals expected to close in the last 3 weeks of the quarter.",
      topOpportunities: "1. Westlake Insurance Group — 2,400 seats, Clarix Unite + Clarix CX, formal RFP vs. Nexova, close date June 27, $1.1M ARR. 2. Pacific Coast Health Network — 820 seats, Clarix Unite, in legal/procurement, close date June 20, $280K ARR. 3. Summit Financial Partners — 640 seats, Clarix Unite + Clarix Engage, POC completed successfully, awaiting CFO approval, close date July 10, $340K ARR. 4. Ironwood Manufacturing — 380 seats, Clarix Unite, in proposal stage, competitive vs. Zync Phone, close date July 31, $145K ARR.",
      stalledDeals: "Harborview Legal Group — 520-seat Clarix Unite deal went dark 4 weeks ago after the IT Director left the company. No new champion identified. Originally Q1, pushed twice. Coastal Retail Corp — 280-seat deal, was active in Q1, now unresponsive. Presidio believes they may be pausing all IT spend due to an internal restructuring.",
      forecastConcerns: "Westlake Insurance is a must-win — if it goes to Nexova, Q2 forecast is in serious trouble. Summit Financial CFO approval is outside Presidio's control and could push to Q3. Pacific Coast Health is in legal but procurement has added new security questionnaire requirements that could delay close. The back-loaded quarter means any single deal slipping creates a cascade effect.",
      supportNeeded: "Executive sponsor for Westlake Insurance — need Clarix VP or above to engage Sandra Hoyt (CTO) directly. Competitive displacement support vs. Nexova — deal desk pricing flexibility needed. SE coverage for the Ironwood Manufacturing Zync Phone displacement. Help re-engaging Harborview Legal — Clarix may have a direct relationship we can leverage.",
    },
  },
  {
    id: "enablement",
    name: "Enablement Content Agent",
    description: "Draft Clarix partner-facing enablement assets — talk tracks, one-pagers, training outlines, and FAQs.",
    icon: "🎓",
    estimatedMinutes: 120,
    fields: [
      { id: "audience", label: "Audience", type: "text", placeholder: "e.g. Partner AEs, Partner SEs, Partner marketing team", required: true },
      { id: "topic", label: "Topic", type: "text", placeholder: "e.g. Selling Clarix into Healthcare, displacing Arova on-prem", required: true },
      { id: "solution", label: "Clarix Product or Solution", type: "text", placeholder: "e.g. Clarix CX, Clarix Engage, Clarix Unite" },
      { id: "format", label: "Desired Format", type: "select", options: ["One-Pager", "Talk Track", "Training Outline", "FAQ"], required: true },
      { id: "keyMessages", label: "Key Messages", type: "textarea", placeholder: "The 3–5 things you want partners to remember and repeat..." },
      { id: "objections", label: "Common Objections", type: "textarea", placeholder: "What pushback do partners or customers typically raise?" },
    ],
    example: {
      audience: "Partner Account Executives and Channel Sales Managers at Apex and Summit tier Pinnacle partners",
      topic: "Displacing Arova on-prem — healthcare and financial services vertical play",
      solution: "Clarix Unite plus Clarix CX, with Clarix Engage for customer-facing teams and Clarix AI Studio for partners building custom AI workflows",
      format: "Talk Track",
      keyMessages: "1. Arova on-prem end-of-life creates a forcing function — customers must act now, not decide whether to act. 2. Clarix is the only platform that replaces both the PBX and the contact center in a single vendor relationship — eliminating integration complexity and improving the customer experience. 3. Clarix Engage gives customer-facing sales and service teams an AI-powered engagement layer that Arova cannot match. 4. Clarix AI Studio enables partners to build custom AI-powered communication workflows for their customers — intelligent virtual agents, automated call flows, and AI-assisted interactions — without writing code. This is a practice-building opportunity most competitors cannot offer. 5. Clarix's compliance recording and quality management tools are built for regulated industries — no third-party bolt-on required. 6. Partners in the Pinnacle program earn their strongest margins on full platform deals — and AI Studio creates an additional services and implementation revenue stream.",
      objections: "We're not ready to move to the cloud yet. What about our Arova investment? The implementation will disrupt our contact center agents. Nexova told us they can do everything Clarix can. We don't want to retrain our staff. Can we phase the migration and keep Arova for the contact center temporarily? We don't have the technical resources to build custom AI workflows.",
    },
  },
  {
    id: "execupdate",
    name: "Executive Update Agent",
    description: "Turn scattered notes into a clean executive summary for Clarix channel leadership.",
    icon: "📝",
    estimatedMinutes: 60,
    fields: [
      { id: "topic", label: "Topic", type: "text", placeholder: "e.g. Q2 FY2026 Partner Performance", required: true },
      { id: "status", label: "Current Status", type: "text", placeholder: "e.g. On track, At risk, Behind plan, Ahead of target" },
      { id: "progress", label: "Key Progress", type: "textarea", placeholder: "What's been accomplished since the last update?" },
      { id: "risks", label: "Risks or Blockers", type: "textarea", placeholder: "What's getting in the way or could impact results?" },
      { id: "decisions", label: "Decisions Needed", type: "textarea", placeholder: "What do you need leadership to decide, approve, or unblock?" },
      { id: "helpNeeded", label: "Help Needed", type: "textarea", placeholder: "Specific ask from this executive audience..." },
      { id: "length", label: "Desired Length", type: "select", options: ["Short", "Medium", "Detailed"], required: true },
    ],
    example: {
      topic: "Q2 FY2026 Partner Performance & Q3 Investment Request",
      status: "On track for Q2 — Q3 at risk without incremental SE and MDF investment",
      progress: "Q2 partner-sourced bookings are tracking at $4.8M with 3 weeks remaining — 103% of the $4.65M target. 8 new Pinnacle partners activated in Q2, exceeding the goal of 5. The healthcare vertical partner play launched in April has generated $1.4M in pipeline across 6 partner-sourced opportunities. Clarix Engage attach rate on new platform deals through the channel improved from 18% to 31% quarter-over-quarter. Two Summit tier partners (Presidio, CDW) have nominated Clarix for preferred vendor status in their FY2026 vendor councils.",
      risks: "Q3 channel target of $6.2M requires incremental SE overlay capacity — current SE-to-partner ratio cannot support the pipeline volume projected. Two of our top 5 revenue-generating partners are in active conversations with Nexova about deeper partnership terms, including guaranteed SE resources and higher margins. Without a retention response by end of Q2, we risk losing $2.8M in influenced pipeline. MDF budget for Q3 is currently unfunded — 14 Pinnacle partner MDF requests totaling $380K are pending approval.",
      decisions: "1. Approve $380K Q3 MDF budget to fund 14 pending Pinnacle partner requests — deadline June 30 or partners redirect spend to competitors. 2. Authorize 2 additional Clarix CX SE headcount for channel overlay. 3. Approve a Summit tier margin incentive review to address competitive recruiting — finance has been asked to model 3 scenarios. 4. Confirm executive attendance at the Clarix Pinnacle Partner Summit on August 14–15.",
      helpNeeded: "SVP Channel to engage directly with Presidio and CDW executive sponsors before June 30. Finance to complete margin incentive modeling by June 20. HR to fast-track the 2 Contact Center SE requisitions. CEO or President to confirm Pinnacle Partner Summit keynote participation.",
      length: "Medium",
    },
  },
  {
    id: "competitive",
    name: "Competitive Intelligence Agent",
    description: "Prep for deals where Nexova, Zync, Vertex Teams Phone, Orbex Cloud Calling, Veridia, Apexus, or PeakCX is in the mix.",
    icon: "⚔️",
    estimatedMinutes: 90,
    fields: [
      { id: "competitor", label: "Competitor", type: "select", options: ["NexoUC (UC only)", "NexoCX (Contact Center)", "NexoUC + NexoCX (Full Platform)", "Zync Phone + Contact Center", "Vertex Teams Phone", "Orbex Cloud Calling", "Veridia", "Apexus", "PeakCX", "Arova Cloud Office", "Velcom"], required: true },
      { id: "accountName", label: "Account Name", type: "text", placeholder: "e.g. Westlake Insurance Group" },
      { id: "dealProfile", label: "Deal Profile", type: "textarea", placeholder: "Seat count, solution mix, industry, key decision makers..." },
      { id: "competitorStrengths", label: "What is the competitor claiming?", type: "textarea", placeholder: "Their pitch, pricing angle, relationships they have in the account..." },
      { id: "ourPosition", label: "Our Current Position in the Deal", type: "textarea", placeholder: "Where we stand, who's on our side, what the customer has responded well to..." },
      { id: "keyObjection", label: "Primary Objection We're Facing", type: "textarea", placeholder: "The main thing we need to overcome to win..." },
    ],
    example: {
      competitor: "Veridia",
      accountName: "Meridian Financial Services",
      dealProfile: "1,800 seats — 420 contact center agents plus 1,380 knowledge workers. Mid-market financial services firm currently on Arova on-prem for contact center and Vertex Teams for employee communications. Evaluating a full platform modernization. Economic buyer is the CIO (Rachel Torres). Contact center ops lead (Brian Cho) is the Veridia champion. Deal value ~$820K ARR. Partner: Logicalis.",
      competitorStrengths: "Veridia has positioned Veridia Cloud CX as the best-in-class enterprise contact center and is leading with analyst recognition (Meridian Research Leader) and AI capabilities — specifically their AI-powered routing and journey orchestration. They are focused on the contact center ops team and have built strong credibility there. They are not addressing the UC side of the equation — Meridian would still need a separate solution for the 1,380 knowledge workers, which Veridia is treating as someone else's problem.",
      ourPosition: "We are positioned through Logicalis with strong access to the CIO. Rachel Torres has explicitly said her priority is reducing vendor complexity — she's currently managing Arova, Vertex Teams, and a separate analytics platform and wants fewer relationships to manage. The Veridia pitch solves the contact center but adds another vendor. Our single-platform story directly addresses her stated goal. Brian Cho (contact center lead) is skeptical of Clarix — he sees Veridia as more sophisticated. We need to reframe the conversation from feature depth to business value and total cost of ownership. Clarix AI Studio is also relevant — Meridian wants to automate parts of their loan inquiry call flow without a complex development project.",
      keyObjection: "Veridia is telling them Clarix is not at the same level for enterprise contact center — they are pointing to Meridian Research rankings and feature depth in routing and journey orchestration. Brian Cho believes Veridia is the safer, more capable choice for the contact center. We have not yet reframed the conversation around the cost and complexity of running two separate platforms.",
    },
  },
  {
    id: "recruitment",
    name: "New Partner Recruitment Agent",
    description: "Craft a compelling outreach to recruit a prospective new partner into the Clarix Pinnacle Partner Program.",
    icon: "🤝",
    estimatedMinutes: 75,
    fields: [
      { id: "prospectName", label: "Prospect Partner Name", type: "text", placeholder: "e.g. Nexus Technology Group", required: true },
      { id: "partnerType", label: "Partner Type", type: "text", placeholder: "e.g. VAR, MSP, SI, Carrier Agent, Telecom Agent" },
      { id: "currentFocus", label: "Their Current Vendor / Technology Focus", type: "textarea", placeholder: "Who they currently sell, what their practice looks like, their customer base..." },
      { id: "whyFit", label: "Why Clarix is a Good Fit for Them", type: "textarea", placeholder: "What makes this a natural partnership — market overlap, product gaps, growth opportunity..." },
      { id: "contactName", label: "Contact Name & Role", type: "text", placeholder: "e.g. Jennifer Park, VP Channel Sales" },
      { id: "tone", label: "Outreach Tone", type: "select", options: ["Direct & Business-Focused", "Warm & Relationship-First", "Data-Driven"], required: true },
    ],
    example: {
      prospectName: "Corelink Technology Solutions",
      partnerType: "VAR / MSP — strong Vertex practice, growing communications presence",
      currentFocus: "Corelink is a Vertex Gold partner with a strong Vertex 365 and Vertex Cloud practice. They've started selling Vertex Teams Phone but are consistently losing deals where the customer also needs a contact center — Teams has no competitive answer and Corelink has had to walk away from 3 deals this quarter as a result. They have 200+ SMB and mid-market customers in the Pacific Northwest who are prime candidates for a modernized communications and customer engagement platform.",
      whyFit: "Corelink's Vertex-centric customer base is ideal for Clarix. We complement their Teams practice — Clarix Unite and Clarix CX fill the customer engagement gap they keep hitting. For customers who want to stay in the Teams environment, Clarix has a strong integration story. Clarix Engage is a compelling add for their customer-facing retail and services accounts where AI-driven experiences are increasingly a priority. Clarix AI Studio is a significant practice-building opportunity for Corelink — their technical team can use it to build custom AI-powered communication workflows for customers without writing code, creating a recurring services revenue stream that competitors like Nexova and Zync cannot offer. The Clarix Pinnacle Partner Program's Basecamp-to-Peak ramp is designed for partners exactly like Corelink — we can get them productive fast.",
      contactName: "David Nguyen, VP of Sales",
      tone: "Direct & Business-Focused",
    },
  },
];

export function getAgent(id: string): Agent | undefined {
  return agents.find((a) => a.id === id);
}
