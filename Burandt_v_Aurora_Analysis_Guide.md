# Burandt v Aurora: Expert Legal Document Analysis Guide

## Optimized for Claude Co-Work Sequential Analysis

**Case:** Burandt v Aurora
**Folder Path:** `/Users/trl/Documents/CB x Aurora`
**Objective:** Build an airtight advocacy position through systematic evidence analysis

---

## PROJECT SETUP: Maximize Value from Claude Co-Work

### Step 1: Install DesktopCommanderMCP on Your Mac

```bash
npx @wonderwhy-er/desktop-commander@latest setup
```

Restart Claude Desktop after installation.

### Step 2: Create Your Case Workspace

Before starting analysis, create a dedicated output folder for Claude's findings:

**Ask Claude:**
```
Use create_directory to create '/Users/trl/Documents/CB x Aurora/00_CASE_ANALYSIS' and the following subfolders:
- 00_CASE_ANALYSIS/Phase1_Reconnaissance
- 00_CASE_ANALYSIS/Phase2_Termination
- 00_CASE_ANALYSIS/Phase3_Policy
- 00_CASE_ANALYSIS/Phase4_BadFaith
- 00_CASE_ANALYSIS/Phase5_Timeline
- 00_CASE_ANALYSIS/Phase6_Witnesses
- 00_CASE_ANALYSIS/Phase7_Pretext
- 00_CASE_ANALYSIS/Phase8_CaseTheory
- 00_CASE_ANALYSIS/Evidence_Index
```

### Step 3: Convert Office Documents to PDF

DesktopCommanderMCP can fully search PDFs but not .docx/.doc/.pages files. Before analysis:

1. Open each .docx, .doc, .pages file
2. Export/Save As PDF
3. Save to same folder or a `/PDFs` subfolder

**This is critical for comprehensive content searching.**

### Step 4: Set Up Claude Co-Work Session

When starting a Claude co-work session:

1. **Project Context:** Set the project to your CB x Aurora folder
2. **Enable Tools:** Ensure DesktopCommanderMCP tools are available
3. **Session Continuity:** Keep the session open across phases when possible

---

## OPTIMIZED WORKFLOW: Sequential Build Process

Each phase produces a deliverable that feeds into the next phase. Run them in order.

---

## PHASE 1: RECONNAISSANCE & INVENTORY
**Output:** `Phase1_Reconnaissance/Document_Inventory.md`

```
You are an expert employment litigation analyst. Your task is to conduct initial reconnaissance of the Burandt v Aurora case materials.

LOCATION: '/Users/trl/Documents/CB x Aurora'

EXECUTE THESE STEPS:

1. FOLDER MAPPING:
Use list_directory with depth 4 to map the complete structure.

2. FILE INVENTORY:
Use start_search in files mode to count:
- Pattern '*.pdf' → count PDFs
- Pattern '*.docx' OR '*.doc' → count Word files (flag for conversion)
- Pattern '*.pages' → count Pages files (flag for conversion)
- Pattern '*.txt' OR '*.md' → count text files
- Pattern '*.jpeg' OR '*.jpg' OR '*.png' → count images
- Pattern '*.mp4' → count videos

3. DUPLICATE DETECTION:
Search for patterns suggesting duplicates:
- '*copy*' OR '*(1)*' OR '*(2)*'
- '*backup*' OR '*old*' OR '*draft*'

4. PRIORITY FILE IDENTIFICATION:
Based on filenames, identify files likely containing:
- Termination documentation
- Company policies/handbooks
- Correspondence/emails
- Performance records
- Complaints or grievances

PRODUCE THIS DELIVERABLE:

Create a markdown report with:

# Phase 1: Document Inventory Report

## Summary Statistics
- Total files: [count]
- By type: [breakdown]
- Files needing conversion: [list]
- Potential duplicates: [list]

## Folder Structure
[tree view]

## Priority Documents (by filename analysis)
### Tier 1 - Critical (termination, policy)
[list with full paths]

### Tier 2 - Important (correspondence, performance)
[list with full paths]

### Tier 3 - Supporting (other)
[list with full paths]

## Conversion Required
[list of .docx/.doc/.pages files that need PDF conversion]

## Duplicates to Review
[list of suspected duplicates with paths]

## Gaps Identified
[any obvious missing document types]

## Recommended Next Steps
[prioritized action items]

---

Save this report using write_file to:
'/Users/trl/Documents/CB x Aurora/00_CASE_ANALYSIS/Phase1_Reconnaissance/Document_Inventory.md'

Confirm when complete and summarize key findings.
```

---

## PHASE 2: TERMINATION ANALYSIS
**Requires:** Phase 1 complete
**Output:** `Phase2_Termination/Termination_Analysis.md`

```
Continue the Burandt v Aurora case analysis. Phase 1 reconnaissance is complete.

Now execute Phase 2: Termination Deep Dive.

FIRST: Read the Phase 1 inventory:
Use read_file on '/Users/trl/Documents/CB x Aurora/00_CASE_ANALYSIS/Phase1_Reconnaissance/Document_Inventory.md'

THEN: Locate and analyze all termination-related documents.

STEP 1 - SEARCH:
Use start_search on '/Users/trl/Documents/CB x Aurora' in content mode:
- Pattern: 'terminat' with contextLines 5
- Pattern: 'fired' OR 'discharged' OR 'separated' with contextLines 5
- Pattern: 'last day' OR 'end of employment' with contextLines 5

STEP 2 - READ:
For each file with termination content, use read_file to extract complete content.

STEP 3 - ANALYZE:
Extract and document:

A. DECISION MAKERS
- Name(s) of person(s) who made termination decision
- Their titles and authority
- Approval chain (who else signed off)

B. STATED REASONS
- Every reason given (exact quotes with document source)
- Note vague vs. specific language
- Note if reasons changed across documents

C. PROCESS FOLLOWED
- What steps Aurora took before termination
- Warnings issued (dates, content, delivery method)
- Investigations conducted
- Opportunities given to Burandt to respond

D. TIMING
- Date Burandt first notified of issues
- Date of termination
- Time elapsed (was it rushed?)

E. RED FLAGS
- Evidence of predetermined outcome
- Missing procedural steps
- Inconsistencies between documents
- Unusual speed or process

PRODUCE THIS DELIVERABLE:

# Phase 2: Termination Analysis Report

## Executive Summary
[2-3 sentence overview of termination circumstances]

## Decision Makers
| Name | Title | Role in Decision | Document Source |
|------|-------|------------------|-----------------|

## Stated Reasons for Termination
| Reason | Exact Quote | Document | Date | Specific or Vague? |
|--------|-------------|----------|------|-------------------|

## Termination Process
| Step | Date | Description | Document Source | Compliant? |
|------|------|-------------|-----------------|------------|

## Timeline Summary
- First notification of issues: [date]
- Termination date: [date]
- Total elapsed time: [duration]
- Assessment: [rushed/adequate/extended]

## Red Flags Identified
1. [Red flag with evidence citation]
2. [Red flag with evidence citation]
...

## Key Documents
| Document | Path | Key Content | Significance |
|----------|------|-------------|--------------|

## Preliminary Findings
[What the termination evidence suggests about bad faith/procedural failures]

## Questions Raised
[Issues requiring further investigation in subsequent phases]

---

Save to: '/Users/trl/Documents/CB x Aurora/00_CASE_ANALYSIS/Phase2_Termination/Termination_Analysis.md'

Confirm when complete and highlight the most damaging findings for Aurora.
```

---

## PHASE 3: POLICY COMPLIANCE AUDIT
**Requires:** Phases 1-2 complete
**Output:** `Phase3_Policy/Policy_Compliance_Audit.md`

```
Continue Burandt v Aurora analysis. Phases 1-2 complete.

Now execute Phase 3: Policy Compliance Audit.

FIRST: Read previous phase outputs to maintain context:
- read_file '/Users/trl/Documents/CB x Aurora/00_CASE_ANALYSIS/Phase1_Reconnaissance/Document_Inventory.md'
- read_file '/Users/trl/Documents/CB x Aurora/00_CASE_ANALYSIS/Phase2_Termination/Termination_Analysis.md'

OBJECTIVE: Compare Aurora's stated policies against their actual actions in Burandt's termination.

STEP 1 - LOCATE POLICIES:
Use start_search on '/Users/trl/Documents/CB x Aurora':
- files mode: '*policy*' OR '*handbook*' OR '*procedure*' OR '*guideline*'
- content mode: 'employee handbook' OR 'company policy' OR 'HR policy'
- content mode: 'progressive discipline' OR 'termination procedure'

STEP 2 - EXTRACT REQUIREMENTS:
Read each policy document completely. Extract ALL procedural requirements for:
- Employee discipline process
- Progressive discipline steps and timing
- Required documentation
- Investigation procedures
- Notice and hearing requirements
- Termination approval process
- Appeal/grievance procedures

STEP 3 - COMPLIANCE COMPARISON:
Compare each requirement against what actually happened (from Phase 2).

STEP 4 - VIOLATION IDENTIFICATION:
Document every deviation from stated policy.

PRODUCE THIS DELIVERABLE:

# Phase 3: Policy Compliance Audit Report

## Policies Identified
| Policy Name | Document Path | Date/Version | Key Topics Covered |
|-------------|---------------|--------------|-------------------|

## Extracted Policy Requirements

### Discipline Procedures
| Step # | Required Action | Policy Source | Page/Section |
|--------|-----------------|---------------|--------------|

### Termination Procedures
| Step # | Required Action | Policy Source | Page/Section |
|--------|-----------------|---------------|--------------|

### Documentation Requirements
| Requirement | Policy Source | Page/Section |
|-------------|---------------|--------------|

### Employee Rights
| Right | Policy Source | Page/Section |
|-------|---------------|--------------|

## Compliance Analysis

### Requirements Met
| Requirement | Evidence of Compliance | Document |
|-------------|----------------------|----------|

### VIOLATIONS IDENTIFIED

| # | Policy Requirement | What Aurora Did Instead | Severity | Evidence | Impact on Burandt |
|---|-------------------|------------------------|----------|----------|-------------------|
| V-001 | | | CRITICAL/MAJOR/MINOR | | |
| V-002 | | | | | |
...

## Violation Summary by Severity
- CRITICAL violations: [count]
- MAJOR violations: [count]
- MINOR violations: [count]

## Most Damaging Violations
[Top 3-5 violations with explanation of why they're significant]

## Legal Implications
[How these violations support bad faith / wrongful termination claims]

## Policy Gaps
[Areas where Aurora's policies are vague or silent]

---

Save to: '/Users/trl/Documents/CB x Aurora/00_CASE_ANALYSIS/Phase3_Policy/Policy_Compliance_Audit.md'

Confirm completion and identify the strongest policy violation arguments.
```

---

## PHASE 4: BAD FAITH EVIDENCE COMPILATION
**Requires:** Phases 1-3 complete
**Output:** `Phase4_BadFaith/Bad_Faith_Evidence.md`

```
Continue Burandt v Aurora analysis. Phases 1-3 complete.

Now execute Phase 4: Bad Faith Evidence Compilation.

FIRST: Read previous deliverables for context:
- read_file '/Users/trl/Documents/CB x Aurora/00_CASE_ANALYSIS/Phase2_Termination/Termination_Analysis.md'
- read_file '/Users/trl/Documents/CB x Aurora/00_CASE_ANALYSIS/Phase3_Policy/Policy_Compliance_Audit.md'

OBJECTIVE: Systematically locate and compile all evidence of bad faith, unfairness, and pretextual conduct.

EXECUTE THESE CONTENT SEARCHES on '/Users/trl/Documents/CB x Aurora' with contextLines 5:

SEARCH SET A - RUSHED/PREDETERMINED:
1. 'immediate' OR 'effective immediately' OR 'right away'
2. 'already decided' OR 'decision has been made' OR 'final'
3. 'no choice' OR 'have to' OR 'must'

SEARCH SET B - DENIAL OF DUE PROCESS:
1. 'no warning' OR 'without warning' OR 'never warned'
2. 'no opportunity' OR 'wasn't allowed' OR 'couldn't'
3. 'never told' OR 'didn't inform' OR 'not notified'

SEARCH SET C - INCONSISTENT TREATMENT:
1. 'other employees' OR 'similarly situated' OR 'same thing'
2. 'different' OR 'exception' OR 'only one'
3. 'first time' OR 'never before' OR 'unprecedented'

SEARCH SET D - SHIFTING STORIES:
1. Search 'reason' near 'terminat' across ALL documents - compare
2. 'because' OR 'due to' OR 'result of'
3. 'changed' OR 'actually' OR 'real reason'

SEARCH SET E - RETALIATION INDICATORS:
1. 'complained' OR 'reported' OR 'raised concerns'
2. 'after' near any of: 'complaint' OR 'report' OR 'concern'
3. 'retaliat' OR 'payback' OR 'punish'

SEARCH SET F - ADMISSIONS:
1. 'admit' OR 'acknowledge' OR 'concede'
2. 'mistake' OR 'error' OR 'wrong'
3. 'sorry' OR 'apologize' OR 'shouldn't have'

FOR EACH HIT: Note document, exact quote, context, and significance.

PRODUCE THIS DELIVERABLE:

# Phase 4: Bad Faith Evidence Compilation

## Evidence Matrix

### Category A: Rushed/Predetermined Actions
| Evidence # | Quote | Document | Context | Significance | Strength (1-10) |
|------------|-------|----------|---------|--------------|-----------------|
| BF-A-001 | | | | | |

### Category B: Denial of Due Process
| Evidence # | Quote | Document | Context | Significance | Strength (1-10) |
|------------|-------|----------|---------|--------------|-----------------|
| BF-B-001 | | | | | |

### Category C: Inconsistent Treatment
| Evidence # | Quote | Document | Context | Significance | Strength (1-10) |
|------------|-------|----------|---------|--------------|-----------------|
| BF-C-001 | | | | | |

### Category D: Shifting Explanations
| Evidence # | Quote | Document | Context | Significance | Strength (1-10) |
|------------|-------|----------|---------|--------------|-----------------|
| BF-D-001 | | | | | |

### Category E: Retaliation Indicators
| Evidence # | Quote | Document | Context | Significance | Strength (1-10) |
|------------|-------|----------|---------|--------------|-----------------|
| BF-E-001 | | | | | |

### Category F: Admissions Against Interest
| Evidence # | Quote | Document | Context | Significance | Strength (1-10) |
|------------|-------|----------|---------|--------------|-----------------|
| BF-F-001 | | | | | |

## Top 10 Most Damaging Evidence Items
[Ranked list with explanation of impact]

## Bad Faith Narrative
[Synthesize the evidence into a coherent story of how Aurora acted in bad faith]

## Cross-Reference with Policy Violations
[Connect bad faith evidence to specific policy violations from Phase 3]

## Evidence Gaps
[Types of bad faith evidence we'd want but haven't found]

---

Save to: '/Users/trl/Documents/CB x Aurora/00_CASE_ANALYSIS/Phase4_BadFaith/Bad_Faith_Evidence.md'

Confirm completion and identify the "smoking gun" evidence.
```

---

## PHASE 5: CHRONOLOGICAL TIMELINE
**Requires:** Phases 1-4 complete
**Output:** `Phase5_Timeline/Case_Timeline.md`

```
Continue Burandt v Aurora analysis. Phases 1-4 complete.

Now execute Phase 5: Chronological Timeline Construction.

FIRST: Read key previous deliverables:
- read_file '/Users/trl/Documents/CB x Aurora/00_CASE_ANALYSIS/Phase2_Termination/Termination_Analysis.md'
- read_file '/Users/trl/Documents/CB x Aurora/00_CASE_ANALYSIS/Phase4_BadFaith/Bad_Faith_Evidence.md'

OBJECTIVE: Build a comprehensive, date-anchored timeline of all events.

STEP 1 - DATE EXTRACTION:
Search '/Users/trl/Documents/CB x Aurora' in content mode for:
- '2022' OR '2023' OR '2024' OR '2025' OR '2026'
- 'January' OR 'February' OR 'March' OR 'April' OR 'May' OR 'June'
- 'July' OR 'August' OR 'September' OR 'October' OR 'November' OR 'December'

STEP 2 - FILE METADATA:
For key documents identified in previous phases, use get_file_info to capture:
- Creation date
- Modification date
- File size

STEP 3 - CORRESPONDENCE ANALYSIS:
Identify all correspondence (emails, letters, messages) and extract:
- Date
- Sender/Recipient
- Subject
- Key content

STEP 4 - BUILD MASTER TIMELINE:
Organize ALL events chronologically.

PRODUCE THIS DELIVERABLE:

# Phase 5: Case Timeline

## Master Chronological Timeline

| Date | Event | Category | Key Details | People Involved | Document Source | Significance |
|------|-------|----------|-------------|-----------------|-----------------|--------------|
| | | | | | | |

Categories: HIRE | POSITIVE | DISCIPLINE | COMPLAINT | ADVERSE | MEETING | COMMUNICATION | TERMINATION | POST-TERM

## Timeline Visualization

```
[YEAR]
├── [MONTH]
│   ├── [DATE]: [Event] ← [Significance marker]
│   ├── [DATE]: [Event]
│   └── [DATE]: [Event]
```

## Critical Periods

### Period 1: [Start date - End date] - [Description]
Events during this period:
- [event]
- [event]
Significance: [why this period matters]

### Period 2: [Start date - End date] - [Description]
...

## Suspicious Timing Analysis

| Event A | Event B | Time Gap | Why Suspicious |
|---------|---------|----------|----------------|

## Documentation Gaps
| Expected Document | Time Period | Why It Should Exist | Implications |
|-------------------|-------------|---------------------|--------------|

## Rapid Escalation Evidence
[Events that happened unusually quickly]

## Correlation with Complaints/Protected Activity
| Burandt Action | Date | Aurora Response | Date | Gap | Implication |
|----------------|------|-----------------|------|-----|-------------|

## Timeline Narrative
[Tell the story chronologically, highlighting bad faith patterns]

---

Save to: '/Users/trl/Documents/CB x Aurora/00_CASE_ANALYSIS/Phase5_Timeline/Case_Timeline.md'

Confirm completion and identify the most damaging timeline patterns.
```

---

## PHASE 6: WITNESS & CORROBORATION
**Requires:** Phases 1-5 complete
**Output:** `Phase6_Witnesses/Witness_Analysis.md`

```
Continue Burandt v Aurora analysis. Phases 1-5 complete.

Now execute Phase 6: Witness & Corroboration Analysis.

FIRST: Read previous deliverables for names and events:
- read_file '/Users/trl/Documents/CB x Aurora/00_CASE_ANALYSIS/Phase5_Timeline/Case_Timeline.md'
- read_file '/Users/trl/Documents/CB x Aurora/00_CASE_ANALYSIS/Phase4_BadFaith/Bad_Faith_Evidence.md'

OBJECTIVE: Identify all potential witnesses and corroborating evidence.

STEP 1 - PERSON EXTRACTION:
Review all documents and extract every person mentioned:
- Names in correspondence (sender, recipient, CC, mentioned)
- Signatories on documents
- People referenced in narrative
- Supervisors, HR, colleagues, executives

STEP 2 - CORROBORATION SEARCH:
Search '/Users/trl/Documents/CB x Aurora' content mode:
- 'witnessed' OR 'saw' OR 'observed' OR 'heard'
- 'can confirm' OR 'will attest' OR 'knows that'
- 'told me' OR 'said that' OR 'informed'
- 'present at' OR 'attended' OR 'was there'

STEP 3 - COLLEAGUE COMMUNICATIONS:
Identify any messages/communications from colleagues that support Burandt.

PRODUCE THIS DELIVERABLE:

# Phase 6: Witness & Corroboration Analysis

## Complete Person Directory

| Name | Title/Role | Relationship to Burandt | Alignment | Documents Appearing In |
|------|------------|------------------------|-----------|----------------------|

Alignment: DECISION-MAKER | HOSTILE | NEUTRAL | FRIENDLY | UNKNOWN

## Witness Analysis

### Potential Favorable Witnesses

| Name | What They Can Testify To | How We Know | Documents | Priority (1-10) |
|------|-------------------------|-------------|-----------|-----------------|

### Adverse Witnesses (Aurora Side)

| Name | Likely Testimony | How to Cross-Examine | Weaknesses |
|------|------------------|---------------------|------------|

### Neutral Witnesses

| Name | What They Know | Value | Risk |
|------|---------------|-------|------|

## Corroborating Evidence

| Claim to Prove | Corroborating Evidence | Source | Strength |
|----------------|----------------------|--------|----------|

## Witness-Document Matrix

| Key Event | Witness | Document Supporting | Strength of Corroboration |
|-----------|---------|--------------------|--------------------------|

## Deposition Priority List

1. [Name] - Priority: CRITICAL
   - Role: [their role]
   - Key topics: [what to ask]
   - Documents to use: [list]
   - Goal: [what admission we want]

2. [Name] - Priority: HIGH
   ...

## Witness Risks
[Witnesses who might be problematic and why]

## Missing Witnesses
[People we'd want to find but haven't identified]

---

Save to: '/Users/trl/Documents/CB x Aurora/00_CASE_ANALYSIS/Phase6_Witnesses/Witness_Analysis.md'

Confirm completion and identify the strongest corroborating witnesses.
```

---

## PHASE 7: PRETEXT DEMOLITION
**Requires:** Phases 1-6 complete
**Output:** `Phase7_Pretext/Pretext_Analysis.md`

```
Continue Burandt v Aurora analysis. Phases 1-6 complete.

Now execute Phase 7: Pretext Demolition Analysis.

FIRST: Read the termination analysis to identify Aurora's stated reasons:
- read_file '/Users/trl/Documents/CB x Aurora/00_CASE_ANALYSIS/Phase2_Termination/Termination_Analysis.md'
- read_file '/Users/trl/Documents/CB x Aurora/00_CASE_ANALYSIS/Phase4_BadFaith/Bad_Faith_Evidence.md'
- read_file '/Users/trl/Documents/CB x Aurora/00_CASE_ANALYSIS/Phase5_Timeline/Case_Timeline.md'

OBJECTIVE: Systematically dismantle each of Aurora's stated reasons for termination.

STEP 1 - CATALOG STATED REASONS:
From Phase 2, list every reason Aurora gave for terminating Burandt.

STEP 2 - FOR EACH REASON, SEARCH FOR CONTRADICTING EVIDENCE:

Search '/Users/trl/Documents/CB x Aurora' for evidence that contradicts each stated reason:
- Positive performance references
- Praise, commendations, awards
- Lack of prior warnings about this issue
- Others who did similar things without consequence
- Previous acceptance of the now-criticized behavior

STEP 3 - ANALYZE TEMPORAL PROXIMITY:
- Did termination follow closely after Burandt raised concerns?
- Did discipline suddenly escalate?
- Were reasons manufactured after the fact?

STEP 4 - SHIFTING EXPLANATIONS:
Compare how Aurora described reasons across different documents/times.

PRODUCE THIS DELIVERABLE:

# Phase 7: Pretext Demolition Analysis

## Aurora's Stated Reasons Inventory

| # | Stated Reason | Exact Quote | Document | Date |
|---|---------------|-------------|----------|------|
| R-1 | | | | |
| R-2 | | | | |

## Pretext Analysis by Reason

### Reason R-1: [Aurora's stated reason]

**The Claim:** [What Aurora says]

**Contradicting Evidence:**
| Evidence | Document | How It Contradicts |
|----------|----------|--------------------|

**Temporal Analysis:**
- When was this issue first raised? [date]
- Prior documentation of this issue? [yes/no]
- Proximity to protected activity? [analysis]

**Comparative Treatment:**
- Others who did same thing: [names/evidence]
- Consequence for others: [what happened]
- Disparity: [analysis]

**Shifting Explanations:**
| Date | How Reason Was Described | Document |
|------|-------------------------|----------|

**Pretext Score:** [1-10, 10 = clearly pretextual]

**Demolition Argument:**
[2-3 sentences explaining why this reason fails]

---
[Repeat for each stated reason]
---

## Pretext Summary Matrix

| Reason | Contradicted? | Temporal Issues? | Comparative Issues? | Shifting? | Score |
|--------|---------------|------------------|---------------------|-----------|-------|
| R-1 | | | | | |
| R-2 | | | | | |

## The Real Reason Analysis

Based on all evidence, the actual motivation for termination appears to be:
[Analysis of what really drove the termination]

Supporting evidence:
1. [evidence]
2. [evidence]

## Strongest Pretext Arguments (Ranked)

1. [Reason] - Score [X]/10
   - Key evidence: [cite]
   - Jury impact: [high/medium/low]

2. ...

## Pretext Narrative
[Compelling narrative explaining why Aurora's reasons are false]

---

Save to: '/Users/trl/Documents/CB x Aurora/00_CASE_ANALYSIS/Phase7_Pretext/Pretext_Analysis.md'

Confirm completion and identify the single most devastating pretext argument.
```

---

## PHASE 8: CASE THEORY SYNTHESIS
**Requires:** All previous phases complete
**Output:** `Phase8_CaseTheory/Case_Theory.md`

```
Continue Burandt v Aurora analysis. All previous phases complete.

Now execute Phase 8: Case Theory Synthesis - the final deliverable.

FIRST: Read ALL previous phase deliverables:
- read_file '/Users/trl/Documents/CB x Aurora/00_CASE_ANALYSIS/Phase1_Reconnaissance/Document_Inventory.md'
- read_file '/Users/trl/Documents/CB x Aurora/00_CASE_ANALYSIS/Phase2_Termination/Termination_Analysis.md'
- read_file '/Users/trl/Documents/CB x Aurora/00_CASE_ANALYSIS/Phase3_Policy/Policy_Compliance_Audit.md'
- read_file '/Users/trl/Documents/CB x Aurora/00_CASE_ANALYSIS/Phase4_BadFaith/Bad_Faith_Evidence.md'
- read_file '/Users/trl/Documents/CB x Aurora/00_CASE_ANALYSIS/Phase5_Timeline/Case_Timeline.md'
- read_file '/Users/trl/Documents/CB x Aurora/00_CASE_ANALYSIS/Phase6_Witnesses/Witness_Analysis.md'
- read_file '/Users/trl/Documents/CB x Aurora/00_CASE_ANALYSIS/Phase7_Pretext/Pretext_Analysis.md'

OBJECTIVE: Synthesize everything into a comprehensive, actionable case theory.

PRODUCE THIS DELIVERABLE:

# Phase 8: Burandt v Aurora - Complete Case Theory

## EXECUTIVE SUMMARY
[3-5 sentences capturing the essence of the case and its strength]

---

## SECTION 1: THE NARRATIVE

### The Story of What Happened to Burandt
[Tell the complete story in compelling, chronological form. This should read like an opening statement - factual but persuasive. Include:
- Who Burandt is
- The employment relationship
- What changed
- How Aurora violated its own policies
- How Aurora acted in bad faith
- The harm to Burandt]

---

## SECTION 2: LEGAL CLAIMS

### Claim 1: [Primary Claim - e.g., Wrongful Termination]
**Legal Standard:** [What must be proven]
**Elements:**
| Element | Evidence | Documents |
|---------|----------|-----------|
**Strength:** [X]/10
**Key Arguments:**

### Claim 2: [Secondary Claim - e.g., Breach of Implied Contract]
...

### Claim 3: [Additional Claim - e.g., Bad Faith]
...

---

## SECTION 3: VIOLATIONS SUMMARY

### Policy Violations (from Phase 3)
| # | Violation | Severity | Impact |
|---|-----------|----------|--------|

### Procedural Failures
| # | Failure | Evidence |
|---|---------|----------|

---

## SECTION 4: EVIDENCE STRENGTH ASSESSMENT

### Strongest Evidence
| Rank | Evidence | Why It's Strong | Document |
|------|----------|-----------------|----------|
| 1 | | | |
| 2 | | | |
| 3 | | | |

### Smoking Guns
[Evidence that is particularly damaging to Aurora]

---

## SECTION 5: DAMAGES

### Economic Damages
- Lost wages: [if calculable]
- Lost benefits: [list]
- Job search costs: [if applicable]

### Non-Economic Damages
- Emotional distress
- Reputational harm
- Career impact

### Potential Punitive Damages
[If bad faith supports punitive damages, explain]

---

## SECTION 6: WEAKNESSES & MITIGATION

| Weakness | How Aurora Will Exploit | Our Response |
|----------|------------------------|--------------|

---

## SECTION 7: AURORA'S LIKELY DEFENSES

| Defense | Our Counter |
|---------|-------------|

---

## SECTION 8: STRATEGIC RECOMMENDATIONS

### For Settlement Negotiations
- Minimum acceptable: [considerations]
- Leverage points: [list]
- Timing considerations: [analysis]

### For Litigation
- Key depositions: [from Phase 6]
- Discovery requests: [what to demand]
- Motion strategy: [considerations]
- Trial themes: [2-3 themes]

### Immediate Action Items
1. [Priority action]
2. [Priority action]
3. [Priority action]

---

## SECTION 9: MASTER EVIDENCE INDEX

| Exhibit # | Document Name | Location | Key Content | Supports |
|-----------|---------------|----------|-------------|----------|
| A-001 | | | | |
| A-002 | | | | |
...

---

## SECTION 10: KEY QUOTES FOR LITIGATION

[Exact quotes from documents that should be used in briefs/at trial]

| Quote | Source | Use For |
|-------|--------|---------|

---

## APPENDIX: DOCUMENT CROSS-REFERENCE

[Which documents support which claims]

---

Save to: '/Users/trl/Documents/CB x Aurora/00_CASE_ANALYSIS/Phase8_CaseTheory/Case_Theory.md'

This is the master deliverable. Confirm completion and provide a final assessment of the case strength.
```

---

## MAXIMUM VALUE EXTRACTION: Best Practices

### Session Management

1. **Keep Sessions Open:** Run multiple phases in one Claude co-work session when possible to maintain context.

2. **If Session Breaks:** Start next phase by reading all previous deliverables (the prompts include this).

3. **Save Frequently:** Each phase saves its output - you won't lose progress.

### Quality Optimization

1. **Review Each Phase Output** before proceeding. Ask Claude to:
   - Clarify anything unclear
   - Expand on important findings
   - Re-search if results seem incomplete

2. **Ask Follow-Up Questions** like:
   - "What's the single strongest piece of evidence you found?"
   - "What evidence would we want that we don't have?"
   - "Rate the overall strength of this phase's findings 1-10"

3. **Request Specific Deep Dives:**
   - "Read [specific document] completely and extract every legally relevant statement"
   - "Compare [doc A] and [doc B] for inconsistencies"

### After All Phases Complete

Run this final optimization prompt:

```
Read all 8 phase deliverables in '/Users/trl/Documents/CB x Aurora/00_CASE_ANALYSIS/'.

Now create a ONE-PAGE CASE SUMMARY that a lawyer could read in 5 minutes to understand:
1. What happened (3 sentences)
2. Why it was wrong (3 bullet points)
3. Strongest evidence (3 items)
4. Recommended action (2 sentences)

Save to: '/Users/trl/Documents/CB x Aurora/00_CASE_ANALYSIS/EXECUTIVE_SUMMARY.md'
```

---

## FILE STRUCTURE AFTER COMPLETION

```
/Users/trl/Documents/CB x Aurora/
├── 00_CASE_ANALYSIS/
│   ├── EXECUTIVE_SUMMARY.md          ← One-page summary
│   ├── Phase1_Reconnaissance/
│   │   └── Document_Inventory.md
│   ├── Phase2_Termination/
│   │   └── Termination_Analysis.md
│   ├── Phase3_Policy/
│   │   └── Policy_Compliance_Audit.md
│   ├── Phase4_BadFaith/
│   │   └── Bad_Faith_Evidence.md
│   ├── Phase5_Timeline/
│   │   └── Case_Timeline.md
│   ├── Phase6_Witnesses/
│   │   └── Witness_Analysis.md
│   ├── Phase7_Pretext/
│   │   └── Pretext_Analysis.md
│   ├── Phase8_CaseTheory/
│   │   └── Case_Theory.md
│   └── Evidence_Index/
│       └── [exhibits as needed]
├── [Original case documents...]
```

---

## QUICK START CHECKLIST

- [ ] Install DesktopCommanderMCP: `npx @wonderwhy-er/desktop-commander@latest setup`
- [ ] Restart Claude Desktop
- [ ] Convert .docx/.doc/.pages files to PDF
- [ ] Create workspace folders (use Setup prompt)
- [ ] Run Phase 1 → Review → Proceed
- [ ] Run Phase 2 → Review → Proceed
- [ ] Continue through Phase 8
- [ ] Run Executive Summary prompt
- [ ] Review complete case analysis

---

**Ready?** Start with the Project Setup section, then proceed through phases sequentially.
