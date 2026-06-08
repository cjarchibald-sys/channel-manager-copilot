// ---------------------------------------------------------------------------
// mockGenerateOutput
// ---------------------------------------------------------------------------
// Placeholder for a real AI API call. Replace the body of each case with:
//
//   const response = await openai.chat.completions.create({ ... })
//   return response.choices[0].message.content ?? ""
//
// or your preferred AI SDK call. The `modifier` param maps to a prompt suffix.
// ---------------------------------------------------------------------------

export type Modifier = "shorter" | "executive" | "action_items" | null;

function val(data: Record<string, string>, key: string, fallback = "N/A"): string {
  return data[key]?.trim() || fallback;
}

// ---------------------------------------------------------------------------
// Individual agent generators
// ---------------------------------------------------------------------------

function generateQBR(data: Record<string, string>, modifier: Modifier): string {
  const partner = val(data, "partnerName");
  const quarter = val(data, "quarter");
  const wins = val(data, "keyWins");
  const pipeline = val(data, "pipelineSummary");
  const challenges = val(data, "challenges");
  const asksFromPartner = val(data, "asksFromPartner");
  const internalAsks = val(data, "internalAsks");

  if (modifier === "shorter") {
    return `## ${partner} QBR — ${quarter} (Summary)

**Wins:** ${wins}

**Pipeline:** ${pipeline}

**Risks:** ${challenges}

**Next Steps:** Align on joint targets for next quarter, resolve open blockers, confirm Clarix support commitments.`;
  }

  if (modifier === "executive") {
    return `## Executive Briefing — ${partner} QBR (${quarter})

${partner} delivered a productive quarter with measurable pipeline growth and program progression. Key wins demonstrate deepening alignment with Clarix's go-to-market and a growing ability to deliver better outcomes for shared customers. Risks are addressable with targeted support.

**Headline:** On track — 1–2 areas require focused Clarix support to protect Q3 forecast.

**Top Actions:** Address blockers on ${challenges || "open items"}, confirm next quarter joint targets, close out partner asks.`;
  }

  if (modifier === "action_items") {
    return `## Action Items — ${partner} QBR (${quarter})

| # | Action | Owner | Due |
|---|--------|-------|-----|
| 1 | Confirm next quarter pipeline and revenue targets | Clarix Partner Manager | End of week |
| 2 | Resolve blockers: ${challenges || "TBD"} | Clarix internal team | 2 weeks |
| 3 | Follow up on partner asks: ${asksFromPartner || "TBD"} | Clarix Partner Manager | 1 week |
| 4 | Internal escalation: ${internalAsks || "align with channel leadership"} | Clarix stakeholders | 2 weeks |
| 5 | Schedule next QBR and set agenda | Both parties | This call |`;
  }

  return `## ${partner} — Clarix Quarterly Business Review (${quarter})

---

### Executive Summary
${partner} demonstrated solid progress this quarter in their Clarix partnership. Pipeline is growing, program milestones are being hit, and the relationship is trending in the right direction. There are 1–2 targeted areas where Clarix support will be critical to protecting the forecast and delivering strong customer outcomes heading into next quarter.

---

### Key Wins
${wins}

---

### Pipeline Highlights
${pipeline}

---

### Risks & Blockers
${challenges}

---

### Recommended Next Steps
- Lock in next quarter revenue and seat targets — break out Clarix Unite, Clarix CX, and Clarix Engage attach goals separately
- Escalate internal asks to the appropriate Clarix teams with clear owners and deadlines
- Activate exec support or SE resources where deals are stalled — prioritize deals where customer experience outcomes are the primary driver
- Confirm co-marketing and MDF plans for next quarter

<!-- MANAGER_NOTES -->

### Suggested Talking Points
1. Celebrate the wins — reinforce what's working and tie it back to customer outcomes the partner delivered
2. Review pipeline with discipline — quality over quantity, and identify where Clarix can accelerate
3. Be direct about risks — what does the partner need from Clarix to unblock?
4. Partner asks: ${asksFromPartner}
5. Clarix asks: ${internalAsks}
6. Leave with 3 clear commitments — one from each side, one joint`;
}

// ---------------------------------------------------------------------------

function generateBizPlan(data: Record<string, string>, modifier: Modifier): string {
  const partner = val(data, "partnerName");
  const type = val(data, "partnerType");
  const segment = val(data, "targetSegment");
  const goal = val(data, "revenueGoal");
  const solutions = val(data, "solutions");
  const gaps = val(data, "gaps");
  const horizon = val(data, "timeHorizon");

  if (modifier === "shorter") {
    return `## ${partner} — Clarix Joint Business Plan (${horizon})

**Goal:** ${goal} | **Type:** ${type} | **Segment:** ${segment}

**Clarix Solutions:** ${solutions}

**Gaps to Close:** ${gaps}

**30/60/90:** Onboard & enable → First joint pipeline → First closed deal`;
  }

  if (modifier === "executive") {
    return `## Executive Summary — ${partner} Joint Business Plan

**Partner:** ${partner} (${type})
**Target Market:** ${segment}
**Joint Revenue Target:** ${goal} over ${horizon}

This plan outlines how ${partner} and Clarix will go to market together in ${segment}, helping customers improve employee communications, modernize their contact center, and create better customer experiences. Success requires closing identified gaps in ${gaps} and executing a disciplined 30/60/90 day ramp with defined milestones.`;
  }

  if (modifier === "action_items") {
    return `## 30 / 60 / 90 Day Action Plan — ${partner}

**30 Days**
- [ ] Complete partner onboarding and Clarix Pinnacle Partner Program agreement review
- [ ] Identify first 3–5 target accounts in ${segment}
- [ ] Begin enablement on ${solutions} — certification plan agreed
- [ ] Register first pipeline opportunities in Clarix Partner Portal

**60 Days**
- [ ] Launch first joint demand generation activity
- [ ] At least 2 qualified opportunities in active pipeline
- [ ] Address gaps: ${gaps}
- [ ] SE certifications completed or scheduled

**90 Days**
- [ ] Close or advance first co-sell opportunity
- [ ] Review performance against ${goal}
- [ ] Confirm plan for remainder of ${horizon}`;
  }

  return `## Clarix Joint Partner Business Plan — ${partner}

---

### Business Plan Summary
This plan outlines the joint go-to-market strategy between Clarix and ${partner}, a ${type}, targeting ${segment} over ${horizon}. The goal is to build a productive, scalable Clarix practice together — helping customers improve how their employees communicate, how their teams serve customers, and how AI can create better business outcomes — with clear milestones and mutual accountability.

---

### Joint Goals
- **Revenue Target:** ${goal}
- **Target Segments:** ${segment}
- **Priority Clarix Solutions:** ${solutions}

---

### Target Accounts & Segments
Focus on ${segment} where ${partner}'s existing relationships create a warm path to decision-makers. Build an initial named account list of 5–10 accounts to create early momentum and proof points for the broader practice.

---

### Enablement Needs
Gaps to close: ${gaps}

Recommended actions:
- Clarix product and solution training — Clarix Unite, Clarix CX, and Clarix Engage
- Contact Center SE certification through Clarix Partner University
- Deal registration process training — Clarix Partner Portal walkthrough
- Access to demo environments and Clarix sales tools

---

### Marketing & Demand Generation Ideas
- Joint webinar targeting ${segment} — lead with business outcomes: "Better customer experiences. Simpler operations. One platform."
- Co-branded Avaya/Cisco Webex Calling displacement campaign — help customers modernize both employee communications and the contact center in a single motion
- Clarix Engage demo event for customer-facing teams — especially high-impact in financial services, healthcare, and retail
- Field event or lunch-and-learn in ${partner}'s key markets
- Case study development once first deal closes — document the business outcomes delivered, not just the products sold

---

### 30 / 60 / 90 Day Action Plan

**30 Days:** Complete enablement kickoff, align on target accounts, register first pipeline in Clarix Partner Portal, confirm MDF and SPIFF plan.

**60 Days:** First joint customer conversations underway, SE certifications complete or in progress, initial demand gen launched.

**90 Days:** First co-sell deal closed or in final stages. Review against ${goal} and adjust plan based on what's working.`;
}

// ---------------------------------------------------------------------------

function generateFollowUp(data: Record<string, string>, modifier: Modifier): string {
  const partner = val(data, "partnerName");
  const date = val(data, "meetingDate");
  const notes = val(data, "meetingNotes");
  const decisions = val(data, "decisions");
  const openQ = val(data, "openQuestions");
  const nextMeeting = val(data, "nextMeeting");

  if (modifier === "shorter") {
    return `Hi [Partner Contact],

Thanks for the time on ${date}. Quick recap:

- **Decisions:** ${decisions}
- **Open items:** ${openQ}
- **Next meeting:** ${nextMeeting}

I'll own my action items and follow up before our next call.

Best,
[Your Name] | Clarix`;
  }

  if (modifier === "executive") {
    return `Hi [Partner Contact],

Following our ${date} meeting — brief summary for alignment:

**Agreed:** ${decisions}

**Pending:** ${openQ}

Reconnecting on ${nextMeeting} to close open items. Flag anything time-sensitive before then.

Best,
[Your Name] | Clarix Partner Team`;
  }

  if (modifier === "action_items") {
    return `## Action Items from ${partner} Meeting (${date})

| # | Action | Owner | Due |
|---|--------|-------|-----|
| 1 | Follow up on open questions: ${openQ} | Clarix Partner Manager | [Date TBD] |
| 2 | Confirm decisions in writing: ${decisions} | Both parties | This week |
| 3 | Send next meeting agenda | Clarix Partner Manager | 3 days before ${nextMeeting} |
| 4 | Internal alignment on any commitments made | Clarix internal | Before ${nextMeeting} |`;
  }

  return `## Partner Meeting Follow-Up — ${partner} (${date})

---

### Follow-Up Email

**Subject:** Follow-Up: ${partner} / Clarix — ${date}

Hi [Partner Contact],

Thank you for your time on ${date} — really productive conversation. Sending this recap while everything is fresh so we're fully aligned.

**Meeting Summary:**
${notes}

**Decisions Made:**
${decisions}

**Open Items / Questions to Resolve:**
${openQ}

I'll take care of my action items on the Clarix side and follow up with you no later than [date]. Please let me know if anything has changed or if I missed anything from our conversation.

Our next meeting is scheduled for **${nextMeeting}**. I'll send an agenda a few days ahead.

Looking forward to keeping the momentum going.

Best,
[Your Name]
Clarix Partner Manager

<!-- MANAGER_NOTES -->

### Suggested Next Meeting Agenda
1. Action item status check from this meeting
2. Pipeline update — top opportunities and next steps
3. Resolve open items from this meeting — see open questions in the email above
4. Any new asks or support needed from Clarix
5. Wrap-up and commitments`;
}

// ---------------------------------------------------------------------------

function generateResearch(data: Record<string, string>, modifier: Modifier): string {
  const company = val(data, "companyName");
  const industry = val(data, "industry");
  const opportunity = val(data, "opportunity");
  const relationship = val(data, "relationship");
  const solutions = val(data, "solutions");
  const notes = val(data, "researchNotes");

  if (modifier === "shorter") {
    return `## ${company} — Quick Account Briefing

**Industry:** ${industry} | **Relationship:** ${relationship}
**Opportunity:** ${opportunity}
**Clarix Positioning:** ${solutions}

**Lead with:** Business outcomes and the cost of the current situation — not features.`;
  }

  if (modifier === "executive") {
    return `## ${company} — Executive Account Briefing

**Opportunity:** ${opportunity}
**Relationship:** ${relationship}
**Recommended Approach:** Lead with business outcomes and the risk of staying on the current path. Position Clarix as a strategic platform decision that improves customer experience, simplifies operations, and enables AI — not a vendor swap. Engage at the economic buyer level before the RFP closes.`;
  }

  if (modifier === "action_items") {
    return `## Suggested Next Steps — ${company}

- [ ] Map the decision committee — confirm economic buyer and champions
- [ ] Prepare a 2-slide business case for ${solutions} tailored to ${industry} outcomes
- [ ] Request executive introduction from Clarix channel leadership if needed
- [ ] Schedule discovery call focused on: ${opportunity}
- [ ] Pull competitive intelligence if RFP is in play
- [ ] Loop in Clarix SE if technical evaluation is underway`;
  }

  return `## Account Briefing — ${company}

---

### Account Summary
**Company:** ${company}
**Industry:** ${industry}
**Current Relationship:** ${relationship}
**Background:** ${notes}

---

### Likely Business Priorities
Organizations in ${industry} are typically focused on:
- Delivering faster, more consistent customer experiences across every channel
- Modernizing legacy communications infrastructure before it becomes a liability
- Reducing operational complexity from disconnected, siloed systems
- Meeting compliance and regulatory requirements for voice, recording, and data
- Enabling hybrid and remote teams to stay productive and connected

---

### Potential Pain Points
- Legacy on-prem systems (Avaya, Cisco Webex, Mitel) approaching end-of-life with no clear path forward
- Disconnected employee and customer communications creating fragmented experiences and operational gaps
- Compliance exposure in call recording, quality management, and reporting
- Contact center agents using outdated tools — long handle times, low customer satisfaction scores
- Leadership pressure to demonstrate ROI from communications technology investment

---

### Clarix Positioning Angle
Clarix directly addresses the challenge most ${industry} organizations face: employee communications and customer engagement are managed on separate platforms, creating fragmented experiences and unnecessary complexity. Lead with outcomes — improved customer satisfaction, operational simplification, and a foundation that makes AI-driven service possible.

**Solutions to position:** ${solutions}

<!-- MANAGER_NOTES -->

### Conversation Starters
1. "What's driving the urgency to look at this now — is it a contract expiration, an end-of-life notice, or a customer experience initiative?"
2. "How connected are your contact center agents and your broader employee teams today — are they operating on the same platform or separate?"
3. "What does compliance look like for you — call recording, quality management, regulatory reporting?"
4. "If you could improve one thing about how your team communicates with customers in the next 6 months, what would it be?"

---

### Suggested Next Steps
- Confirm economic buyer and build relationship map
- Send a relevant Clarix customer story from ${industry}
- Schedule discovery call focused on ${opportunity}
- Loop in Clarix SE if technical evaluation or proof of concept is expected`;
}

// ---------------------------------------------------------------------------

function generatePipeline(data: Record<string, string>, modifier: Modifier): string {
  const partner = val(data, "partnerName");
  const summary = val(data, "pipelineSummary");
  const top = val(data, "topOpportunities");
  const stalled = val(data, "stalledDeals");
  const concerns = val(data, "forecastConcerns");
  const support = val(data, "supportNeeded");

  if (modifier === "shorter") {
    return `## ${partner} Pipeline — Quick View

**Pipeline:** ${summary}
**Top Opps:** ${top}
**At Risk:** ${stalled}
**Forecast Concern:** ${concerns}
**Clarix Support Needed:** ${support}`;
  }

  if (modifier === "executive") {
    return `## ${partner} Pipeline — Executive View

**Status:** Mixed. Strong top-of-funnel but stalled deals and back-loaded close dates create Q risk.

**Top Opportunities:** ${top}

**Forecast Risk:** ${concerns}

**Recommended Clarix Action:** Prioritize exec and SE support on top 2 deals. Address stalled situations with direct outreach. Approve support requests to protect the quarter.`;
  }

  if (modifier === "action_items") {
    return `## Pipeline Action Plan — ${partner}

| # | Action | Owner | Priority |
|---|--------|-------|----------|
| 1 | Review stalled deals and identify re-engagement path: ${stalled} | Clarix Partner Manager | High |
| 2 | Confirm close plan and Clarix support for top opportunities | Partner AE + Clarix PM | High |
| 3 | Escalate support needs to Clarix internal: ${support} | Clarix Partner Manager | High |
| 4 | Address forecast concerns: ${concerns} | Both | High |
| 5 | Set weekly pipeline review cadence through end of quarter | Both | Medium |`;
  }

  return `## Partner Pipeline Review — ${partner}

---

### Pipeline Summary
${summary}

---

### Key Opportunities
${top}

These deals represent the highest probability and value in the current pipeline. Clarix resources — SE, exec, deal desk — should be prioritized here first to protect the quarter.

---

### At-Risk / Stalled Deals
${stalled}

These situations require active intervention. Common causes: champion change, budget pause, or competitive pressure. Recommended: direct Clarix outreach and a refreshed business case focused on the customer outcomes the deal delivers.

<!-- MANAGER_NOTES -->

### Recommended Actions
1. Weekly deal reviews on top 3 opportunities — confirm next step and who owns it
2. Clarix executive outreach on stalled deals to reset conversations at the right level
3. Escalate support requests to Clarix internal teams — see support needs below
4. Address forecast exposure: ${concerns}
5. Update deal registration for all active opportunities in Clarix Partner Portal

---

### Questions for the Partner
1. What does the customer need to see to move forward — is it a proof of concept, a reference call, exec alignment, or pricing?
2. Have we met the economic buyer on the top deals?
3. What's the competitive situation — who else are they talking to?
4. What's the one thing Clarix could do this week that would most accelerate your pipeline?

---

### Clarix Support Needed
${support}`;
}

// ---------------------------------------------------------------------------

function generateEnablement(data: Record<string, string>, modifier: Modifier): string {
  const audience = val(data, "audience");
  const topic = val(data, "topic");
  const solution = val(data, "solution");
  const format = val(data, "format");
  const messages = val(data, "keyMessages");
  const objections = val(data, "objections");

  if (modifier === "shorter") {
    return `## ${topic} — ${format} (${audience})

**Clarix Solution:** ${solution}

**Key Messages:**
${messages}

**Top Objection to Handle:** ${objections}`;
  }

  if (modifier === "executive") {
    return `## ${topic} — Executive Summary

This ${format} is designed to help ${audience} quickly understand and articulate the business value of ${solution} in partner-led conversations.

**Why it matters:** ${messages}

**How to deploy:** Share in next partner call or enablement session. Reinforce in QBR talking points. Available on Clarix Partner Portal.`;
  }

  if (modifier === "action_items") {
    return `## Distribution & Activation Checklist — ${topic}

- [ ] Review and approve draft with Clarix Product Marketing
- [ ] Remove any internal-only pricing or roadmap references
- [ ] Upload to Clarix Partner Portal under the appropriate solution category
- [ ] Announce in next partner newsletter and monthly partner call
- [ ] Walk through content with ${audience} in next enablement session
- [ ] Collect feedback after 30 days of partner use and refine`;
  }

  return `## ${topic} — ${format}
**Audience:** ${audience} | **Clarix Solution:** ${solution}

---

### Asset Draft

**What problem does ${solution} solve?**
Most organizations today manage employee communications and customer engagement on separate, disconnected platforms. That creates fragmented customer experiences, operational complexity, and data that never connects. ${solution} is part of Clarix's integrated communications platform — bringing together **Clarix Unite** for employee communications, **Clarix CX** for agent and customer interactions, and **Clarix Engage** for AI-powered customer engagement. One platform, one vendor relationship, one place where employee and customer experiences connect.

**Why does it matter for your customers?**
Your customers are under pressure to improve customer experience while simplifying their technology environment. The organizations still running legacy on-prem systems or managing separate UC and contact center vendors are paying for that complexity every day — in operational overhead, in poor customer experiences, and in the inability to use AI effectively because their data and systems don't talk to each other. Clarix solves all of that in a single platform.

---

### Key Messages
${messages}

---

### Talk Track

**Opening:**
"The customers we're seeing right now are dealing with a common problem — their employees and their contact center agents are on different platforms. That means disconnected experiences for customers, fragmented data, and a support model that's nobody's full responsibility. Clarix solves that. Here's how to position it."

**Value Statement:**
Clarix gives your customers a connected experience from the front line to the back office — **Clarix Unite** for every employee, **Clarix CX** for every agent, and **Clarix Engage** for AI-powered customer interactions. The result: faster service, simpler operations, and a communications foundation that makes AI outcomes possible. One platform, one SLA, backed by Clarix's 99.999% uptime guarantee.

**On Clarix AI Studio:**
"One more thing your customers can't get from Avaya or most of our competitors — Clarix AI Studio. It's a no-code platform that lets you build custom AI-powered communication workflows for your customers: intelligent virtual agents, automated call flows, AI-assisted interactions. You don't need a development team to build it. And once you build one, you can replicate it across your customer base. That's a services revenue stream that doesn't exist in anyone else's partner program at this level."

**Proof Point:**
Clarix customers in regulated industries have simplified their vendor environment and improved customer satisfaction scores within 18 months of deployment. We have customer stories ready to share.

**Call to Action:**
"Let's identify 2–3 accounts in your pipeline where this fits — I'll get you the competitive positioning guide and arrange an Clarix SE for the first conversation."

---

### Objection Handling

**Common objections:**
${objections}

**Suggested responses:**
- Acknowledge the concern without being defensive — validate it
- Pivot to outcomes: what is the cost of staying on the current path vs. the cost of change?
- Offer a proof point — reference customer, customer story, or a proof of concept with Clarix SE support
- Propose a small, low-risk next step to reduce perceived implementation concern

<!-- MANAGER_NOTES -->

### Suggested Call to Action
1. Register the target accounts in the Clarix Partner Portal for deal protection
2. Request an Clarix SE for the first customer conversation
3. Apply for MDF if running a demand gen activity in this segment`;
}

// ---------------------------------------------------------------------------

function generateExecUpdate(data: Record<string, string>, modifier: Modifier): string {
  const topic = val(data, "topic");
  const status = val(data, "status");
  const progress = val(data, "progress");
  const risks = val(data, "risks");
  const decisions = val(data, "decisions");
  const help = val(data, "helpNeeded");

  if (modifier === "shorter") {
    return `## ${topic} — Status: ${status}

**Progress:** ${progress}

**Risks:** ${risks}

**Decisions Needed:** ${decisions}

**Ask:** ${help}`;
  }

  if (modifier === "executive") {
    return `## ${topic} — Executive Summary

**Status:** ${status}

**Bottom line:** ${progress}

**Primary risk:** ${risks}

**Decision needed:** ${decisions}

**Specific ask:** ${help}`;
  }

  if (modifier === "action_items") {
    return `## Required Actions — ${topic}

| # | Action | Owner | Urgency |
|---|--------|-------|---------|
| 1 | Decide: ${decisions} | Clarix Leadership | Immediate |
| 2 | Provide: ${help} | [Stakeholder] | This week |
| 3 | Mitigate risk: ${risks} | Channel Team | High |
| 4 | Confirm next update cadence | All | This meeting |`;
  }

  return `## Clarix Executive Update — ${topic}

**Status:** ${status}
**Date:** ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}

---

### Executive Summary
**${topic}** is currently **${status}**. This update summarizes progress, surfaces risks, and identifies the decisions needed from leadership to stay on track.

---

### Progress Since Last Update
${progress}

---

### Risks & Blockers
${risks}

These items are flagged for leadership visibility. Some are within the channel team's control to mitigate. Others require decisions or resources that sit above the team level — those are noted in the Decisions Needed section below.

---

### Decisions Needed
${decisions}

These decisions are time-sensitive — delays will have downstream impact on partner pipeline, program commitments, and competitive positioning.

<!-- MANAGER_NOTES -->

### Recommended Actions
1. Review and action all decisions listed in the Decisions Needed section above
2. Provide the following support: ${help}
3. Confirm next check-in date and format
4. Share this update with relevant Clarix stakeholders as needed`;
}

// ---------------------------------------------------------------------------

function generateCompetitive(data: Record<string, string>, modifier: Modifier): string {
  const competitor = val(data, "competitor");
  const account = val(data, "accountName");
  const deal = val(data, "dealProfile");
  const theirStrengths = val(data, "competitorStrengths");
  const ourPosition = val(data, "ourPosition");
  const objection = val(data, "keyObjection");

  if (modifier === "shorter") {
    return `## vs. ${competitor} — ${account} (Quick Brief)

**Deal:** ${deal}
**Their angle:** ${theirStrengths}
**Our position:** ${ourPosition}
**Key objection to overcome:** ${objection}

**Win theme:** Lead with the platform advantage — one vendor for employee communications and customer engagement, one SLA, no integration risk.`;
  }

  if (modifier === "executive") {
    return `## Competitive Summary — Clarix vs. ${competitor} at ${account}

**Deal:** ${deal}

**Situation:** ${competitor} has an established presence. Our champion is strong but we lack exec-level access.

**Win Strategy:** Reframe the conversation from vendor credibility to platform risk. ${competitor}'s architecture requires separate products for employee communications and the contact center. Clarix brings those experiences together on a single platform with a single SLA — for a risk-averse customer in a regulated industry, that's a material operational and compliance advantage.

**Immediate Action Needed:** Executive introduction to economic buyer before the RFP closes.`;
  }

  if (modifier === "action_items") {
    return `## Action Plan — vs. ${competitor} at ${account}

| # | Action | Owner | Urgency |
|---|--------|-------|---------|
| 1 | Get exec-level introduction to economic buyer | Clarix Channel + Partner | Immediate |
| 2 | Request competitive deal desk support and pricing flexibility | Clarix Partner Manager | This week |
| 3 | Deliver updated competitive positioning guide to partner | Clarix Channel Marketing | 48 hours |
| 4 | Schedule customer reference call with comparable Clarix win | Clarix SE / PM | This week |
| 5 | Reframe evaluation criteria to emphasize platform integration and customer experience outcomes | Partner SE + Clarix SE | Before next customer call |`;
  }

  const isGenesys = competitor === "Genesys";
  const isRingCentral = competitor.includes("RingCX") || competitor.includes("RingEX");
  const isCCaaSOnly = ["Genesys", "Five9", "NICE CXone"].includes(competitor);

  return `## Competitive Intelligence — Clarix vs. ${competitor}
**Account:** ${account}

---

### Deal Profile
${deal}

---

### What ${competitor} Is Claiming
${theirStrengths}

---

### Where We Stand
${ourPosition}

---

### Clarix Differentiators vs. ${competitor}

${isGenesys ? `**The strategic reframe — one platform vs. best-in-class contact center:**
Genesys built its reputation in the contact center. Clarix is built to connect the entire business — employees, agents, and customer-facing teams — on a single communications and customer engagement platform. This is not a feature comparison. It's a different question: does the customer want the most sophisticated contact center on the planet, or do they want to modernize communications across the business and improve customer experience without creating another stack to manage?

For mid-market and enterprise customers who are managing separate UC and CC platforms today, Clarix's answer changes the economics. One admin model. One user identity. One reporting layer. One vendor relationship. One SLA.

**"Why run two clouds?"**
Most organizations evaluating Genesys are still buying UC from one vendor and contact center from another — with separate analytics, separate administration, and separate AI on top. Genesys solves the contact center half. Clarix solves the whole equation. That becomes especially compelling when contact center agents need to collaborate with back-office employees, when sales and service teams need shared customer context, and when IT leadership has been asked to reduce vendor complexity.

**The Microsoft Teams angle:**
For customers already invested in Microsoft 365 and Teams, Clarix has a strong native integration story — keeping Teams for collaboration while adding enterprise voice, contact center, and customer engagement through Clarix. This is core Clarix differentiation. Genesys supports Teams but it is not central to their strategy.

**Where to concede — and why it actually helps:**
If the customer wants the most complex enterprise contact center with advanced routing orchestration and large-scale digital journey design, Genesys is a legitimate choice. Saying that is credible and disarming. Then immediately ask: how many of those advanced features will agents actually use on day one? How many admins will manage the environment? Is reducing vendor count a priority for the CIO? If the answers point toward simplicity, adoption, and speed — that's the Clarix conversation.` :
isRingCentral ? `**Integrated platform — one vendor for employee communications and customer engagement:**
Clarix brings together Clarix Unite for employee communications, Clarix CX for agent and customer experiences, and Clarix Engage for AI-powered customer interactions — all on a single platform with one admin console, one SLA, and one support relationship.

RingCentral requires two separate products — **RingEX** for employee communications and **RingCX** for the contact center. These are not the same platform. They carry separate contracts, separate support relationships, and a stitched-together integration that RingCentral markets as seamless but that puts the customer in the middle when something breaks. For a regulated industry customer, two platforms means two compliance postures, two sets of SLAs, and two points of failure.` :
isCCaaSOnly ? `**Complete platform vs. contact center point solution:**
${competitor} is a contact center platform. It does not provide employee communications. A customer who buys ${competitor} still needs a separate UC solution — which means two vendors, two contracts, two support relationships, and data that never connects. Clarix brings employee communications and customer engagement together on one platform, eliminating that complexity entirely.` :
`**Integrated platform — employee communications and customer engagement in one place:**
Clarix brings together Clarix Unite for employee communications, Clarix CX for agent and customer experiences, and Clarix Engage for AI-powered customer interactions — all on a single platform with one admin console, one SLA, and one support relationship. ${competitor} requires separate products stitched together, creating integration complexity, split accountability, and two points of failure.`}

**Reliability & compliance:**
Clarix offers a 99.999% uptime SLA covering both employee communications and the contact center on the same platform. For regulated industries, a single platform with a single compliance posture is a material advantage.

**Total cost of ownership:**
Customers who consolidate on Clarix typically reduce their communications vendor count significantly and lower total cost of ownership by 25–40% over 3 years. ${competitor}'s pricing often masks the long-term costs of integration, administration, and managing multiple vendor relationships.

**Clarix AI Studio — a differentiated capability:**
Clarix AI Studio is a no-code platform that enables partners and customers to build custom AI-powered communication workflows — intelligent virtual agents, automated call flows, and AI-assisted interactions — natively on the Clarix platform. For technically capable partners, AI Studio creates a recurring services revenue stream that goes well beyond the initial platform sale.

**Clarix's partner model:**
Deal registration, MDF, dedicated SE overlay, and a tiered margin structure that rewards partners who build practices — not just one-time transactions.

<!-- MANAGER_NOTES -->

### Overcoming the Primary Objection
**Objection:** ${objection}

**Response framework:**
${isGenesys ?
`1. Validate the concern — Genesys is a legitimate, respected platform. Don't be defensive about it.
2. Reframe the question: "The real question isn't which contact center is more sophisticated. It's whether the goal is to build the world's most advanced contact center, or to modernize communications across the business and improve customer experience without adding more complexity. Those are different decisions."
3. Redirect to the economic buyer: The CIO or CFO cares about vendor consolidation, TCO, and operational simplicity. The contact center lead cares about features. Make sure you're having the right conversation with the right person.
4. Offer proof: Request a reference call with an Clarix customer who chose Clarix over Genesys — specifically one who had the same simplification mandate.` :
`1. Validate the concern — don't be defensive
2. Reframe the risk: "The real risk isn't vendor size — it's platform fragmentation. If employee communications and the contact center are on different platforms, who's accountable when the customer experience breaks? With Clarix, there's one answer to that question."
3. Offer proof: Request a customer reference call with an Clarix win in the same industry
4. Propose an evaluation criterion that includes integration risk, TCO, and customer experience outcomes`}

---

### Recommended Win Moves
- Get Clarix executive engagement with the economic buyer — ${isGenesys ? "the CIO or CFO, not just the contact center lead" : "before the RFP closes"}
- Request competitive deal desk support — pricing flexibility may be available for strategic wins
- ${isGenesys ? "Reframe the evaluation criteria around vendor consolidation, TCO, and operational simplicity — not just contact center feature depth" : "Push for an evaluation framework that includes platform integration risk and total cost of ownership"}
- Use the Clarix reference customer program — a peer conversation in the same industry is more powerful than any positioning document`;
}

// ---------------------------------------------------------------------------

function generateRecruitment(data: Record<string, string>, modifier: Modifier): string {
  const prospect = val(data, "prospectName");
  const type = val(data, "partnerType");
  const currentFocus = val(data, "currentFocus");
  const whyFit = val(data, "whyFit");
  const contact = val(data, "contactName");

  if (modifier === "shorter") {
    return `## ${prospect} — Partner Recruitment Pitch (Short)

**Subject:** A customer engagement opportunity your current portfolio doesn't cover

Hi ${contact.split(",")[0] || "[Name]"},

${prospect}'s practice is exactly the profile we look for in a new Clarix partner — ${whyFit}

I'd love 20 minutes to show you how partners like yours are building a profitable customer communications practice with Clarix. Would next week work?

[Your Name] | Clarix Pinnacle Partner Program`;
  }

  if (modifier === "executive") {
    return `## ${prospect} — Executive Recruitment Summary

**Prospect:** ${prospect} (${type})
**Why now:** ${whyFit}
**Recommended approach:** Lead with the revenue opportunity and the customer engagement gap in their current portfolio. Position Clarix as the natural complement to what they already sell — not a replacement.
**Proposed first step:** 30-minute intro call with Clarix channel leadership + demo of the partner portal and margin structure.`;
  }

  if (modifier === "action_items") {
    return `## Next Steps — ${prospect} Recruitment

| # | Action | Owner | Due |
|---|--------|-------|-----|
| 1 | Send initial outreach email to ${contact} | Clarix Partner Manager | Today |
| 2 | Research ${prospect}'s current customer base and key verticals | Clarix PM | Before first call |
| 3 | Prepare customized margin and SPIFF overview | Clarix Channel Ops | Before first call |
| 4 | Schedule 30-min intro call and Clarix platform demo | Both | Within 2 weeks |
| 5 | Follow up with Clarix Pinnacle Partner Program agreement and onboarding plan | Clarix PM | Post-call |`;
  }

  return `## Partner Recruitment — ${prospect}

---

### Outreach Email

**Subject:** A revenue opportunity worth 30 minutes — ${prospect} + Clarix

Hi ${contact.split(",")[0].split(" ")[0] || "[Name]"},

I'm a partner account manager at Clarix and wanted to reach out directly. I've been looking at ${prospect}'s practice and I think there's a meaningful revenue opportunity here that's worth a conversation.

A lot of the partners I talk to in the ${type.split("—")[0].trim()} space are winning on the technology side but leaving money on the table when customers ask for a complete solution — one that connects how employees communicate with how they serve customers. Those deals either stall, go to a competitor, or get patched together in a way that creates headaches down the road. Either way, the partner doesn't capture the full value.

That's the gap Clarix closes. Partners who add Clarix to their portfolio are winning deals they were previously losing, expanding wallet share with their existing customer base, and building a recurring revenue stream that compounds over time. The margin structure is among the strongest in the channel, and we back every partner with dedicated sales engineering support, deal registration protection, and co-marketing resources — so you're not carrying the weight alone.

I'm not asking for a big commitment. Just 30 minutes to walk you through what other ${type.split("—")[0].trim()} partners in your market are seeing and whether the numbers make sense for ${prospect}.

Would you have time in the next couple of weeks?

[Your Name]
Clarix Partner Team
[Phone] | [Email]

<!-- MANAGER_NOTES -->

### Why ${prospect} Is the Right Fit

**Current focus:** ${currentFocus}

---

### What to Lead With on the First Call
1. The customer engagement gap in their current portfolio — where are they losing deals or leaving revenue on the table?
2. The modernization opportunity in their existing customer base — help customers improve employee and customer experiences without starting over
3. Clarix Engage as a differentiated add-on — AI-powered customer engagement for financial services, healthcare, and retail accounts
4. Clarix Pinnacle Partner Program margin comparison — show Apex/Summit economics with Contact Center and Engage attach highlighted
5. Clarix Pinnacle Partner Program tier benefits — Peak tier within 90 days is achievable

---

### Suggested First Steps After Initial Outreach
- 30-minute intro call + Clarix platform demo
- Review current pipeline for immediate co-sell opportunities
- Complete Clarix Pinnacle Partner Program agreement and kick off enablement
- Identify first 3 target accounts together and register deals`;
}

// ---------------------------------------------------------------------------
// Main dispatcher
// ---------------------------------------------------------------------------

export function mockGenerateOutput(
  agentId: string,
  formData: Record<string, string>,
  modifier: Modifier = null
): string {
  // TODO: Replace each case with a real AI API call, e.g.:
  // const prompt = buildPrompt(agentId, formData, modifier)
  // const result = await openai.chat.completions.create({ model: "gpt-4o", messages: [{ role: "user", content: prompt }] })
  // return result.choices[0].message.content ?? ""

  switch (agentId) {
    case "qbr":
      return generateQBR(formData, modifier);
    case "bizplan":
      return generateBizPlan(formData, modifier);
    case "followup":
      return generateFollowUp(formData, modifier);
    case "research":
      return generateResearch(formData, modifier);
    case "pipeline":
      return generatePipeline(formData, modifier);
    case "enablement":
      return generateEnablement(formData, modifier);
    case "execupdate":
      return generateExecUpdate(formData, modifier);
    case "competitive":
      return generateCompetitive(formData, modifier);
    case "recruitment":
      return generateRecruitment(formData, modifier);
    default:
      return "# Output\n\nAgent not recognized. Please try again.";
  }
}
