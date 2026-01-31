# Burandt v Aurora: Expert Legal Document Analysis Guide

## Strategic Case Analysis Using DesktopCommanderMCP

**Case:** Burandt v Aurora
**Folder Path:** `/Users/trl/Documents/CB x Aurora`
**Objective:** Build an airtight advocacy position through systematic evidence analysis, demonstrating procedural bad faith, policy noncompliance, and unfair treatment

---

## MASTER PROMPT: Initial Case Reconnaissance

**Copy this entire prompt to Claude Desktop to begin:**

```
You are acting as an expert employment litigation analyst. I need you to conduct a comprehensive forensic analysis of the Burandt v Aurora case materials located at '/Users/trl/Documents/CB x Aurora'.

PHASE 1 - RECONNAISSANCE:
1. Use list_directory on '/Users/trl/Documents/CB x Aurora' with depth 4 to map the complete folder structure
2. After mapping, provide:
   - Total file count by type (.pdf, .docx, .doc, .txt, .md, .pages, .jpeg, .mp4)
   - Identification of any apparent organizational structure
   - Files that appear to be duplicates based on naming patterns
   - Files that appear most legally significant based on names (policies, termination letters, complaints, correspondence)

PHASE 2 - INITIAL ASSESSMENT:
Based on the folder structure, provide:
- A preliminary categorization of document types present
- Recommended priority order for document review
- Any gaps you notice (e.g., missing policy documents, incomplete correspondence chains)
- Files requiring format conversion for full searchability

Present your findings in a structured report format, then await my instructions for the next phase.
```

---

## STRATEGIC ANALYSIS WORKFLOW

### Stage 1: Evidence Inventory & Triage

**Prompt 1A - Document Classification:**
```
Review the folder structure at '/Users/trl/Documents/CB x Aurora' and classify all documents into these litigation categories:

CATEGORY A - SMOKING GUNS (Highest Priority):
- Direct evidence of bad faith, discrimination, or policy violation
- Admissions against interest by Aurora representatives
- Documents contradicting Aurora's stated reasons

CATEGORY B - FOUNDATION DOCUMENTS:
- Employment contracts, offer letters, job descriptions
- Company policies, handbooks, procedures
- Performance reviews and evaluations

CATEGORY C - NARRATIVE TIMELINE:
- Correspondence (emails, letters, messages)
- Meeting notes and memoranda
- Incident reports and complaints

CATEGORY D - CORROBORATING EVIDENCE:
- Witness communications
- Colleague statements
- Third-party documentation

CATEGORY E - TECHNICAL/ADMINISTRATIVE:
- Scripts, config files, tools
- File duplicates
- Non-case materials

For each file identified, note its current location and recommended category.
```

**Prompt 1B - Priority File Identification:**
```
Using start_search on '/Users/trl/Documents/CB x Aurora' in files mode, locate files matching these high-priority patterns and report findings:

1. Pattern: '*termination*' OR '*fired*' OR '*separation*'
2. Pattern: '*policy*' OR '*handbook*' OR '*procedure*'
3. Pattern: '*warning*' OR '*discipline*' OR '*write-up*'
4. Pattern: '*complaint*' OR '*grievance*' OR '*HR*'
5. Pattern: '*performance*' OR '*review*' OR '*evaluation*'
6. Pattern: '*contract*' OR '*offer*' OR '*agreement*'

For each search, list files found with their full paths.
```

---

### Stage 2: Deep Content Analysis

**Prompt 2A - Termination Analysis (CRITICAL):**
```
I need you to analyze all termination-related documents.

Step 1: Use start_search on '/Users/trl/Documents/CB x Aurora' in content mode with pattern 'termination' and contextLines 5

Step 2: For each file containing 'termination', use read_file to extract the complete content

Step 3: Analyze and report:
- WHO made the termination decision (names, titles)
- WHAT reasons were officially stated
- WHEN the termination occurred (exact dates)
- HOW the termination was communicated
- WHETHER proper procedures were followed (based on any policy references)

Step 4: Flag any inconsistencies, missing steps, or procedural irregularities

Present findings in a format suitable for legal brief preparation.
```

**Prompt 2B - Policy Compliance Audit:**
```
Conduct a policy compliance audit for the Burandt termination.

Step 1: Use start_search to find all policy documents (pattern: 'policy' OR 'handbook' OR 'procedure')

Step 2: Read each policy document completely using read_file

Step 3: Extract and list ALL procedural requirements for:
- Employee discipline
- Progressive discipline steps
- Termination procedures
- Investigation requirements
- Employee notification requirements
- Appeal or grievance procedures

Step 4: Create a compliance checklist showing:
| Required Step | Policy Source | Was It Followed? | Evidence |
|---------------|---------------|------------------|----------|

Step 5: Identify EVERY instance where Aurora deviated from its own stated policies
```

**Prompt 2C - Bad Faith Pattern Detection:**
```
Search for evidence of bad faith and unfair treatment.

Execute these content searches on '/Users/trl/Documents/CB x Aurora' with contextLines 5:

1. Pattern: 'immediately' OR 'effective immediately' (rushed actions)
2. Pattern: 'no warning' OR 'without warning' (lack of notice)
3. Pattern: 'first time' OR 'never before' (inconsistent treatment)
4. Pattern: 'other employees' OR 'similarly situated' (disparate treatment)
5. Pattern: 'changed' OR 'different' OR 'inconsistent' (shifting explanations)
6. Pattern: 'complained' OR 'reported' OR 'raised concerns' (potential retaliation)
7. Pattern: 'denied' OR 'refused' OR 'ignored' (procedural failures)

For each finding, analyze:
- Context of the statement
- Who made the statement
- How it demonstrates bad faith or unfairness
- Strength as evidence (strong/moderate/weak)
```

---

### Stage 3: Timeline Reconstruction

**Prompt 3A - Chronological Event Mapping:**
```
Construct a detailed chronological timeline of all events in the Burandt v Aurora case.

Step 1: Search for date references using patterns:
- Years: '2022', '2023', '2024', '2025'
- Months: 'January', 'February', etc.
- Date formats: patterns containing '/' or '-' with numbers

Step 2: Read all correspondence and communications chronologically

Step 3: Build a timeline in this format:

| Date | Event | Document Source | Key Quote | Significance |
|------|-------|-----------------|-----------|--------------|

Step 4: Identify:
- Critical turning points
- Suspicious gaps in documentation
- Events that occurred unusually quickly
- Inconsistencies between stated timelines and actual dates

Step 5: Flag any timeline evidence that supports bad faith claims
```

**Prompt 3B - Communication Pattern Analysis:**
```
Analyze the communication patterns between Burandt and Aurora representatives.

Step 1: Identify all correspondence files (emails, letters, messages)

Step 2: For each communication, extract:
- Date sent/received
- Sender and recipient
- Subject/topic
- Tone (professional, hostile, dismissive, supportive)
- Key statements or admissions

Step 3: Map the communication flow:
- Were Burandt's communications acknowledged?
- Were concerns addressed or ignored?
- Did tone change over time? When and why?
- Were there unreasonable delays in responses?

Step 4: Identify communications that demonstrate:
- Aurora acting in bad faith
- Ignoring legitimate concerns
- Making false or misleading statements
- Failing to follow stated procedures
```

---

### Stage 4: Witness & Corroboration Analysis

**Prompt 4A - Colleague Evidence Review:**
```
Analyze all colleague communications and potential witness evidence.

Step 1: Search for colleague-related content:
- Pattern: 'colleague' OR 'coworker' OR 'team'
- Pattern: 'witnessed' OR 'observed' OR 'saw'
- Pattern: 'confirm' OR 'corroborate' OR 'support'

Step 2: For each relevant document, identify:
- Who is the potential witness
- What did they observe or know
- How does their account support Burandt's position
- Are there any inconsistencies with other evidence

Step 3: Create a witness inventory:
| Name | Role | What They Know | Document Source | Contact Info (if available) |
|------|------|----------------|-----------------|----------------------------|

Step 4: Identify the strongest corroborating witnesses for deposition
```

---

### Stage 5: Opposition Weakness Analysis

**Prompt 5A - Aurora's Vulnerabilities:**
```
Analyze the evidence to identify Aurora's litigation vulnerabilities.

Search for and analyze:

1. POLICY VIOLATIONS - Where Aurora failed to follow its own rules:
   - Search: 'policy' + read policies + compare to actions taken

2. INCONSISTENT STATEMENTS - Where Aurora's story changed:
   - Search: 'reason' AND 'termination' across multiple documents
   - Compare stated reasons over time

3. PROCEDURAL FAILURES - Required steps that were skipped:
   - Search: 'step' OR 'process' OR 'procedure'
   - Cross-reference with termination timeline

4. DOCUMENTATION GAPS - Evidence that should exist but doesn't:
   - Identify missing progressive discipline records
   - Missing investigation notes
   - Missing performance improvement plans

5. ADMISSIONS AGAINST INTEREST - Statements harmful to Aurora:
   - Search: 'admit' OR 'acknowledge' OR 'agree'
   - Search: 'mistake' OR 'error' OR 'shouldn't have'

For each vulnerability, rate:
- Strength of evidence (1-10)
- Difficulty for Aurora to explain
- Potential impact at trial
```

**Prompt 5B - Pretext Analysis:**
```
Analyze whether Aurora's stated reasons for termination are pretextual.

Step 1: Identify ALL reasons Aurora gave for the termination
- Search termination letter and related communications
- Note exact language used

Step 2: For each stated reason, search for contradicting evidence:
- Positive performance reviews
- Praise or commendations
- Lack of prior warnings
- Other employees with same "issues" who weren't terminated

Step 3: Analyze temporal proximity:
- Did termination follow closely after Burandt raised concerns?
- Did termination follow closely after any protected activity?
- Was there a pattern of escalating discipline that appears manufactured?

Step 4: Document the pretext argument:
| Aurora's Stated Reason | Contradicting Evidence | Why It's Pretextual |
|------------------------|------------------------|---------------------|
```

---

### Stage 6: Evidence Organization

**Prompt 6A - Duplicate Identification (Before Reorganization):**
```
Before reorganizing files, identify all duplicates and unnecessary files.

Step 1: Search for duplicate patterns in '/Users/trl/Documents/CB x Aurora':
- Pattern: '*copy*' OR '*Copy*' OR '*(1)*' OR '*(2)*'
- Pattern: '*backup*' OR '*old*' OR '*FINAL*'
- Pattern: '*draft*' OR '*v2*' OR '*revised*'

Step 2: For suspected duplicates, use get_file_info to compare:
- File sizes
- Creation dates
- Modification dates

Step 3: For files with identical sizes, use read_multiple_files to verify content matches

Step 4: Create a duplicate report:
| File 1 | File 2 | Same Size? | Same Content? | Recommendation |
|--------|--------|------------|---------------|----------------|

IMPORTANT: Do NOT delete or move any files. Present findings and await my explicit approval for any actions.
```

---

## RECOMMENDED NEXT STEPS (After Initial Reconnaissance)

### Immediate Actions:
1. **Convert Office documents to PDF** - All .docx, .doc, .pages files need PDF conversion for full searchability
2. **Extract zip archives** - Review contents for additional evidence
3. **Run termination-focused search** - This is your highest priority evidence

### Analysis Sequence:
1. **Termination documents first** - Understand exactly what happened and why
2. **Policy documents second** - Establish what should have happened
3. **Gap analysis third** - Document procedural violations
4. **Timeline fourth** - Establish the narrative sequence
5. **Witness materials fifth** - Identify corroboration

### Deliverables to Build:
1. **Master Evidence Index** - Every document catalogued with relevance rating
2. **Violation Checklist** - Every policy/procedure Aurora failed to follow
3. **Timeline of Events** - Chronological narrative with source citations
4. **Witness List** - Potential witnesses with what they can testify to
5. **Pretext Analysis** - Why Aurora's stated reasons don't hold up

---

## EXPERT LITIGATOR PROMPTS

### For Building Your Theory of the Case:
```
Based on all documents reviewed in '/Users/trl/Documents/CB x Aurora', synthesize the evidence into a coherent theory of the case for Burandt.

Structure your analysis as:

1. THE NARRATIVE: What actually happened to Burandt, told as a compelling story

2. THE VIOLATIONS: Specific policies and procedures Aurora violated, with citations

3. THE BAD FAITH: Evidence demonstrating Aurora acted in bad faith, including:
   - Pretextual reasoning
   - Procedural shortcuts
   - Inconsistent treatment
   - Ignored complaints

4. THE DAMAGES: What Burandt lost and suffered as a result

5. THE ASK: What remedy should Burandt seek

6. WEAKNESSES: Potential problems with our case and how to address them

7. AURORA'S LIKELY DEFENSES: What they'll argue and how to counter
```

### For Preparing Legal Arguments:
```
Draft the key legal arguments for Burandt's case based on the evidence reviewed.

For each argument:
1. State the legal standard/requirement
2. Apply it to the facts from the documents
3. Cite specific documents as evidence
4. Anticipate and address counterarguments

Arguments to develop:
- Wrongful termination
- Breach of implied contract (if applicable)
- Violation of company policy
- Bad faith and unfair dealing
- [Any discrimination/retaliation claims if evidence supports]
```

### For Deposition Preparation:
```
Based on the documents reviewed, prepare deposition questions for Aurora representatives.

For each key witness, develop:
1. Foundation questions (establish their role, authority, knowledge)
2. Document-specific questions (walk them through damaging documents)
3. Inconsistency questions (highlight contradictions)
4. Admission-seeking questions (lock them into helpful positions)
5. Policy knowledge questions (establish they knew the rules)

Focus on questions that:
- Cannot be easily evaded
- Build toward key admissions
- Create impeachment opportunities
- Support bad faith arguments
```

---

## QUICK COMMAND REFERENCE

| Task | Prompt |
|------|--------|
| Full folder map | `list_directory '/Users/trl/Documents/CB x Aurora' depth 4` |
| Find all PDFs | `start_search '/Users/trl/Documents/CB x Aurora' files mode '*.pdf'` |
| Search content | `start_search '/Users/trl/Documents/CB x Aurora' content mode '[term]' contextLines 5` |
| Read document | `read_file '[full path]'` |
| Compare files | `read_multiple_files ['path1', 'path2']` |
| File metadata | `get_file_info '[path]'` |
| More results | `get_more_search_results sessionId '[id]' offset [n] length 20` |

---

## IMPORTANT REMINDERS

- **No file changes without permission** - All moves, deletions, and modifications require your explicit approval
- **Convert Office files** - .docx, .doc, .pages files must be converted to PDF for content searching
- **Preserve originals** - Always keep original files; work with copies when possible
- **Document everything** - Keep a log of all searches run and findings discovered
- **Privilege considerations** - Flag any attorney-client communications for protection

---

**Ready to begin?** Copy the Master Prompt above into Claude Desktop with DesktopCommanderMCP installed to start your forensic case analysis.
