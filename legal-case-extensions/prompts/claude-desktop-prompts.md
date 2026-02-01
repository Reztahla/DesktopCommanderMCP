# Burandt v Aurora: Reusable Claude Desktop Prompts

## Quick Reference Prompts

Copy and paste these prompts directly into Claude Desktop with DesktopCommanderMCP.

---

## SETUP PROMPTS

### Create Case Workspace
```
Create the complete case analysis workspace for Burandt v Aurora.

Use create_directory to create these folders at '/Users/trl/Documents/CB x Aurora':
- 00_CASE_ANALYSIS/Phase1_Reconnaissance
- 00_CASE_ANALYSIS/Phase2_Termination
- 00_CASE_ANALYSIS/Phase3_Policy
- 00_CASE_ANALYSIS/Phase4_BadFaith
- 00_CASE_ANALYSIS/Phase5_Timeline
- 00_CASE_ANALYSIS/Phase6_Witnesses
- 00_CASE_ANALYSIS/Phase7_Pretext
- 00_CASE_ANALYSIS/Phase8_CaseTheory
- 00_CASE_ANALYSIS/Evidence_Index
- 00_CASE_ANALYSIS/Automated_Analysis
- Converted_PDFs
- 98_ORIGINALS_ARCHIVE
- 99_DUPLICATES_TO_REVIEW

Confirm when complete.
```

### Configure DesktopCommander for Legal Work
```
Use set_config_value to configure DesktopCommanderMCP for legal document analysis:

1. Set allowedDirectories to ["/Users/trl/Documents/CB x Aurora"]
2. Set fileReadLineLimit to 2000
3. Set fileWriteLineLimit to 100

Then use get_config to confirm the settings.
```

---

## RECONNAISSANCE PROMPTS

### Quick Folder Scan
```
Use list_directory on '/Users/trl/Documents/CB x Aurora' with depth 3 and give me a quick overview of:
- Total file count
- Main folder structure
- Any obvious issues (duplicates, disorganization)
```

### Full Document Inventory
```
Conduct a complete document inventory of '/Users/trl/Documents/CB x Aurora':

1. Use list_directory with depth 4
2. Count files by type: .pdf, .docx, .doc, .txt, .md, .pages, .jpeg, .mp4
3. Identify files needing conversion to PDF
4. Flag potential duplicates by name
5. Categorize by likely legal significance

Save results to: /Users/trl/Documents/CB x Aurora/00_CASE_ANALYSIS/Phase1_Reconnaissance/Document_Inventory.md
```

### Find All PDFs
```
Use start_search on '/Users/trl/Documents/CB x Aurora' in files mode with pattern '*.pdf' to list all PDF documents with their full paths.
```

### Find Files Needing Conversion
```
Search '/Users/trl/Documents/CB x Aurora' for files that need PDF conversion:
1. Pattern '*.docx'
2. Pattern '*.doc'
3. Pattern '*.pages'

List all files found with their paths.
```

---

## SEARCH PROMPTS

### Termination Search
```
Search for all termination-related content in '/Users/trl/Documents/CB x Aurora'.

Use start_search in content mode with contextLines 5 for these patterns:
1. 'terminat'
2. 'fired'
3. 'discharged'
4. 'last day'
5. 'end of employment'

For each match, note the document, quote, and significance.
```

### Policy Search
```
Locate all policy documents and policy references in '/Users/trl/Documents/CB x Aurora'.

Search files mode: '*policy*' OR '*handbook*' OR '*procedure*'
Search content mode: 'policy', 'handbook', 'progressive discipline', 'termination procedure'

List all policy documents found.
```

### Bad Faith Evidence Search
```
Search for evidence of bad faith in '/Users/trl/Documents/CB x Aurora' using content mode with contextLines 5:

1. 'immediate' OR 'effective immediately'
2. 'no warning' OR 'without warning'
3. 'no opportunity' OR 'wasn't allowed'
4. 'predetermined' OR 'already decided'
5. 'different treatment' OR 'other employees'
6. 'ignored' OR 'refused' OR 'denied'

Rate each finding by strength (1-10) and explain its significance.
```

### Retaliation Search
```
Search for evidence of potential retaliation in '/Users/trl/Documents/CB x Aurora':

1. 'complained' OR 'reported'
2. 'raised concerns' OR 'brought up'
3. 'after I' OR 'following my'
4. 'retaliat'
5. 'punish' OR 'payback'

For each finding, analyze temporal proximity to adverse action.
```

### Witness Search
```
Search for potential witness evidence in '/Users/trl/Documents/CB x Aurora':

1. 'witnessed' OR 'observed' OR 'saw'
2. 'can confirm' OR 'will attest'
3. 'told me' OR 'said that'
4. 'present at' OR 'attended'

Create a list of potential witnesses with what they may know.
```

---

## DOCUMENT ANALYSIS PROMPTS

### Read and Analyze Single Document
```
Read the document at '[FULL PATH]' completely.

Analyze and extract:
1. Document type and date
2. Author/sender and recipient
3. Key statements (exact quotes)
4. Any admissions against Aurora's interest
5. Policy references
6. Names of people mentioned
7. Dates mentioned
8. Legal significance for the case

Rate this document's evidentiary value (1-10).
```

### Compare Two Documents
```
Use read_multiple_files to read:
1. '[PATH 1]'
2. '[PATH 2]'

Compare these documents for:
- Consistency of statements
- Timeline alignment
- Contradictions
- Evolution of Aurora's position

Highlight any inconsistencies that demonstrate bad faith.
```

### Extract All Dates from Document
```
Read '[FULL PATH]' and extract EVERY date reference:
- Explicit dates (January 15, 2024)
- Relative dates (last week, three months ago)
- Time references

Create a chronological list with context for each date.
```

### Extract All Names from Document
```
Read '[FULL PATH]' and extract ALL person names:
- Full names
- Titles/roles mentioned
- Departments
- Relationships to Burandt

Create a person directory with roles.
```

---

## ANALYSIS PROMPTS

### Policy Compliance Check
```
Read the policy document at '[POLICY PATH]'.

Extract all procedural requirements for discipline and termination.

Then read '[TERMINATION DOCUMENT PATH]'.

Compare: For each policy requirement, determine if it was followed.

Create a compliance matrix:
| Requirement | Required By | Followed? | Evidence |
```

### Timeline Construction
```
Based on all documents I've asked you to read in this session, construct a chronological timeline:

| Date | Event | Category | Document Source | Significance |

Categories: HIRE, POSITIVE, DISCIPLINE, COMPLAINT, ADVERSE, MEETING, COMMUNICATION, TERMINATION

Flag suspicious timing patterns.
```

### Pretext Analysis
```
Aurora stated these reasons for termination: [LIST REASONS]

Search '/Users/trl/Documents/CB x Aurora' for evidence contradicting each reason:
- Positive performance evidence
- Praise or commendations
- Lack of prior warnings
- Others treated differently

For each reason, score how pretextual it appears (1-10).
```

---

## ORGANIZATION PROMPTS

### Find Duplicates
```
Search '/Users/trl/Documents/CB x Aurora' for potential duplicate files:

1. Files with 'copy' or 'Copy' in name
2. Files with '(1)' or '(2)' in name
3. Files with 'backup' or 'old' in name
4. Files with 'draft' or 'FINAL' in name

For suspected duplicates, use get_file_info to compare sizes.

Create a duplicate report - DO NOT DELETE anything.
```

### Verify Duplicate Before Removal
```
Compare these two files to determine if they are true duplicates:
1. '[PATH 1]'
2. '[PATH 2]'

Use get_file_info for both, then read_multiple_files to compare content.

Report:
- Same size?
- Same content?
- Recommendation (keep which one?)

AWAIT MY APPROVAL before any action.
```

### Move File (With Confirmation)
```
I want to move '[SOURCE PATH]' to '[DESTINATION PATH]'.

First, confirm:
1. Source file exists (use get_file_info)
2. Destination folder exists
3. No file with same name at destination

If all checks pass, use move_file to execute the move.
Confirm completion.
```

---

## REPORT GENERATION PROMPTS

### Generate Phase Summary
```
Read all deliverables in '/Users/trl/Documents/CB x Aurora/00_CASE_ANALYSIS/' and create an executive summary:

1. Key findings from each phase
2. Strongest evidence identified
3. Critical policy violations
4. Most damaging bad faith evidence
5. Recommended next steps

Save to: /Users/trl/Documents/CB x Aurora/00_CASE_ANALYSIS/EXECUTIVE_SUMMARY.md
```

### Create Exhibit Index
```
Review all documents in '/Users/trl/Documents/CB x Aurora' and create a numbered exhibit index:

Prefix: EX-
Format:
| Exhibit # | Document | Date | Category | Key Content | Location |

Categories:
1. Termination Documents
2. Employment Records
3. Company Policies
4. Correspondence
5. Performance Records
6. Witness Statements
7. Evidence of Bad Faith
8. Supporting Documents

Save to: /Users/trl/Documents/CB x Aurora/00_CASE_ANALYSIS/Evidence_Index/Exhibit_Index.md
```

### Generate Witness List
```
Based on all documents reviewed, create a comprehensive witness list:

| Name | Title/Role | What They Know | Alignment | Priority | Documents |

Alignment: DECISION-MAKER, HOSTILE, NEUTRAL, FRIENDLY, UNKNOWN
Priority: 1-10 (10 = most important to depose)

Save to: /Users/trl/Documents/CB x Aurora/00_CASE_ANALYSIS/Phase6_Witnesses/Witness_List.md
```

---

## SESSION RECOVERY PROMPTS

### Recover Previous Session Context
```
Use get_recent_tool_calls with maxResults 100 to show me what we were working on in the previous session.

Summarize:
1. What phase we were in
2. Last documents reviewed
3. Key findings so far
4. What's next
```

### Continue From Last Phase
```
Read the deliverable from the last completed phase at '/Users/trl/Documents/CB x Aurora/00_CASE_ANALYSIS/[PHASE FOLDER]/'.

Summarize key findings, then proceed to the next phase.
```

---

## UTILITY PROMPTS

### Check File Info
```
Use get_file_info on '[FULL PATH]' to get:
- File size
- Creation date
- Modification date
- Type
```

### List Active Searches
```
Use list_searches to show all active search sessions.
```

### Get More Search Results
```
Use get_more_search_results with sessionId '[SESSION ID]' offset [OFFSET] length 20 to get the next batch of results.
```

### Stop Search
```
Use stop_search to stop the search session '[SESSION ID]'.
```

---

## QUICK COMMAND CHEAT SHEET

| Action | Command Pattern |
|--------|-----------------|
| List folder | `list_directory '[path]' depth 4` |
| Search files | `start_search '[path]' files mode '[pattern]'` |
| Search content | `start_search '[path]' content mode '[term]' contextLines 5` |
| Read file | `read_file '[path]'` |
| Read multiple | `read_multiple_files ['path1', 'path2']` |
| File info | `get_file_info '[path]'` |
| Create folder | `create_directory '[path]'` |
| Move file | `move_file '[source]' '[dest]'` |
| Get config | `get_config` |
| Set config | `set_config_value [key] [value]` |
