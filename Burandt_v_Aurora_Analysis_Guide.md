# Burandt v Aurora: Comprehensive Document Analysis Guide

## Using DesktopCommanderMCP for Legal Case Management

**Prepared for:** Analysis of CB x Aurora project folder
**Folder Path:** `/Users/trl/Documents/CB x Aurora`
**Purpose:** Contextual understanding, evidence organization, and advocacy optimization

---

## Table of Contents

1. [Prerequisites & Setup](#1-prerequisites--setup)
2. [Phase 1: Initial Reconnaissance](#2-phase-1-initial-reconnaissance)
3. [Phase 2: Content Search & Case Context Building](#3-phase-2-content-search--case-context-building)
4. [Phase 3: Duplicate Detection & Cleanup](#4-phase-3-duplicate-detection--cleanup)
5. [Phase 4: Proposed Folder Structure](#5-phase-4-proposed-folder-structure)
6. [Phase 5: Document Reorganization Workflow](#6-phase-5-document-reorganization-workflow)
7. [Phase 6: Advanced Analysis Techniques](#7-phase-6-advanced-analysis-techniques)
8. [Quick Reference Command Library](#8-quick-reference-command-library)
9. [Legal Document Analysis Keywords](#9-legal-document-analysis-keywords)

---

## 1. Prerequisites & Setup

### Verify DesktopCommanderMCP Installation

Before beginning, ensure DesktopCommanderMCP is properly installed and configured:

```
Ask Claude Desktop: "Use get_config to show me the current DesktopCommanderMCP configuration"
```

### Recommended Configuration

For optimal legal document analysis, configure these settings:

```json
{
  "allowedDirectories": ["/Users/trl/Documents/CB x Aurora"],
  "fileReadLineLimit": 2000,
  "fileWriteLineLimit": 100
}
```

**To set this configuration, ask Claude:**
> "Use set_config_value to set allowedDirectories to ['/Users/trl/Documents/CB x Aurora'] for security"

### File Type Support Matrix

| File Type | Read | Search Content | Extract Text | Notes |
|-----------|------|----------------|--------------|-------|
| .pdf | ✅ | ✅ | ✅ | Full text + images extracted |
| .docx | ❌ | ❌ | ❌ | Convert to PDF first |
| .doc | ❌ | ❌ | ❌ | Convert to PDF first |
| .pages | ❌ | ❌ | ❌ | Export to PDF from Pages app |
| .txt | ✅ | ✅ | ✅ | Full support |
| .md | ✅ | ✅ | ✅ | Full support |
| .json | ✅ | ✅ | ✅ | Full support |
| .yaml | ✅ | ✅ | ✅ | Full support |
| .jpeg/.jpg | ✅ | ❌ | ❌ | Visual display only |
| .mp4 | ❌ | ❌ | ❌ | Use external tools |
| .dng | ❌ | ❌ | ❌ | Raw image format |
| .zip | ❌ | ❌ | ❌ | Extract first |

**IMPORTANT:** For .docx, .doc, and .pages files, batch convert to PDF for full searchability:
1. Open each file in its native application
2. Export/Save As PDF
3. Store PDFs alongside originals or in a dedicated `/PDFs` subfolder

---

## 2. Phase 1: Initial Reconnaissance

### Step 1.1: Map Complete Folder Structure

**Ask Claude:**
> "Use list_directory on '/Users/trl/Documents/CB x Aurora' with depth 4 to show me the complete folder structure"

**Expected Output:** Complete tree view showing all files and subdirectories with [DIR] and [FILE] prefixes.

### Step 1.2: Generate File Type Inventory

**Ask Claude:**
> "Use start_search on '/Users/trl/Documents/CB x Aurora' in files mode with pattern '*.pdf' to find all PDF files, then repeat for *.docx, *.txt, *.md, *.jpeg, *.mp4, and *.pages"

**Create inventory spreadsheet tracking:**
- File name
- File path
- File type
- Size
- Date modified
- Category (correspondence, policy, evidence, etc.)

### Step 1.3: Get Metadata for Key Files

For each important file identified:

**Ask Claude:**
> "Use get_file_info on '[full file path]' to get metadata including creation date, modification date, and size"

**Why this matters for legal cases:**
- Creation dates establish timeline
- Modification dates may indicate tampering concerns
- File sizes help identify potential duplicates

---

## 3. Phase 2: Content Search & Case Context Building

This is your **top priority** - building comprehensive contextual understanding.

### Step 2.1: Core Legal Term Searches

Execute these searches systematically. For each search:

**Ask Claude:**
> "Use start_search on '/Users/trl/Documents/CB x Aurora' in content mode with pattern '[TERM]' and contextLines set to 3"

#### Termination & Separation Keywords
| Search Term | Purpose |
|-------------|---------|
| `termination` | Identify all termination-related documents |
| `terminated` | Past tense references |
| `dismissal` | Alternative termination language |
| `separation` | Employment separation documents |
| `resignation` | Distinguish voluntary from involuntary |
| `fired` | Informal termination references |

#### Policy & Compliance Keywords
| Search Term | Purpose |
|-------------|---------|
| `policy` | All policy references |
| `violation` | Policy violation allegations |
| `compliance` | Compliance requirements |
| `procedure` | Procedural requirements |
| `handbook` | Employee handbook references |
| `code of conduct` | Conduct standards |
| `progressive discipline` | Discipline procedures |

#### Bad Faith & Unfairness Keywords
| Search Term | Purpose |
|-------------|---------|
| `bad faith` | Direct bad faith allegations |
| `unfair` | Unfairness claims |
| `discrimination` | Discrimination evidence |
| `retaliation` | Retaliation claims |
| `hostile` | Hostile work environment |
| `harassment` | Harassment claims |
| `wrongful` | Wrongful termination |
| `pretextual` | Pretext arguments |

#### Timeline & Events Keywords
| Search Term | Purpose |
|-------------|---------|
| `Burandt` | All references to Burandt |
| `Aurora` | All company references |
| `meeting` | Meeting documentation |
| `written warning` | Discipline history |
| `performance` | Performance-related documents |
| `investigation` | Investigation records |
| `complaint` | Complaints filed |
| `grievance` | Grievance procedures |

#### Communication & Evidence Keywords
| Search Term | Purpose |
|-------------|---------|
| `email` | Email references |
| `conversation` | Documented conversations |
| `witness` | Witness statements |
| `confirmed` | Confirmations |
| `denied` | Denials |
| `admitted` | Admissions |

### Step 2.2: Date-Based Searches

Search for specific date patterns relevant to the case:

**Ask Claude:**
> "Use start_search in content mode with pattern '[DATE PATTERN]' - for example '2023' or '2024' or specific dates like 'January 15'"

### Step 2.3: Name-Based Searches

Search for key individuals mentioned in the case:

**Ask Claude:**
> "Use start_search in content mode with pattern '[PERSON NAME]' to find all documents mentioning this individual"

**Track:** Supervisors, HR representatives, witnesses, executives, colleagues

### Step 2.4: Reading Full Documents

After searches identify relevant files, read them completely:

**Ask Claude:**
> "Use read_file on '[file path]' to read the complete document"

For long PDFs, use pagination:
> "Use read_file on '[file path]' with offset 0 and length 500, then continue with offset 500"

---

## 4. Phase 3: Duplicate Detection & Cleanup

### Step 3.1: Identify Potential Duplicates by Name

**Ask Claude:**
> "Use start_search in files mode with pattern '*copy*' to find files with 'copy' in the name"

Also search for:
- `*Copy*` (capital C)
- `*(1)*` (numbered duplicates)
- `*(2)*`
- `*-2*`
- `*_backup*`
- `*_old*`
- `*FINAL*` vs `*final*` vs `*Final*`

### Step 3.2: Size-Based Duplicate Detection

For files with similar names, compare metadata:

**Ask Claude:**
> "Use get_file_info on '[file1]' and '[file2]' to compare sizes and dates"

**Identical size + same content = duplicate**

### Step 3.3: Content Comparison for Suspected Duplicates

**Ask Claude:**
> "Use read_multiple_files to read '[file1]' and '[file2]' so I can compare their contents"

### Step 3.4: Documenting Duplicates (Before Any Action)

Before requesting any deletion, create a duplicate log:

| Original File | Duplicate File | Size Match | Content Match | Recommended Action |
|---------------|----------------|------------|---------------|-------------------|
| [path] | [path] | Yes/No | Yes/No | Keep/Delete/Review |

**CRITICAL:** I will always request your explicit permission before suggesting any file deletion, modification, or move.

---

## 5. Phase 4: Proposed Folder Structure

Based on legal document management best practices, optimized for employment litigation:

```
/Users/trl/Documents/CB x Aurora/
│
├── 00_CASE_INDEX/
│   ├── Master_Document_Index.md          # Complete file inventory with descriptions
│   ├── Timeline_of_Events.md             # Chronological case timeline
│   ├── Key_Persons_Directory.md          # All individuals mentioned with roles
│   ├── Search_Results_Log.md             # Log of all content searches performed
│   └── Case_Summary.md                   # Executive summary of case
│
├── 01_PLEADINGS_AND_FILINGS/
│   ├── Complaints/
│   ├── Answers/
│   ├── Motions/
│   ├── Court_Orders/
│   └── Correspondence_with_Court/
│
├── 02_EMPLOYMENT_RECORDS/
│   ├── Offer_Letter_and_Contract/
│   ├── Performance_Reviews/
│   ├── Disciplinary_Records/
│   ├── Termination_Documents/
│   └── Benefits_and_Compensation/
│
├── 03_COMPANY_POLICIES/
│   ├── Employee_Handbook/
│   ├── HR_Policies/
│   ├── Code_of_Conduct/
│   ├── Disciplinary_Procedures/
│   └── Anti_Discrimination_Policies/
│
├── 04_CORRESPONDENCE/
│   ├── With_Aurora_HR/
│   ├── With_Supervisor/
│   ├── With_Colleagues/
│   ├── With_Legal_Counsel/
│   └── Internal_Aurora_Communications/
│
├── 05_EVIDENCE_BAD_FAITH/
│   ├── Procedural_Violations/
│   ├── Policy_Noncompliance/
│   ├── Inconsistent_Treatment/
│   ├── Timeline_Discrepancies/
│   └── Witness_Statements/
│
├── 06_EVIDENCE_SUPPORTING/
│   ├── Positive_Performance_Evidence/
│   ├── Colleague_Testimonials/
│   ├── Communications_Proving_Good_Standing/
│   └── Counter_Evidence_to_Aurora_Claims/
│
├── 07_MEDIA_EVIDENCE/
│   ├── Photos/
│   │   ├── JPEG/
│   │   └── DNG_RAW/
│   ├── Videos/
│   ├── Screenshots/
│   └── Audio_Recordings/
│
├── 08_ANALYSIS_AND_NOTES/
│   ├── Legal_Research/
│   ├── Case_Strategy_Notes/
│   ├── Argument_Outlines/
│   └── Questions_for_Witnesses/
│
├── 09_REFERENCE_MATERIALS/
│   ├── Applicable_Laws_and_Statutes/
│   ├── Relevant_Case_Law/
│   └── Legal_Definitions/
│
├── 10_TECHNICAL_TOOLS/
│   ├── Scripts/
│   │   ├── *.py
│   │   └── *.sh
│   ├── Hooks/
│   ├── Config/
│   │   ├── *.json
│   │   ├── *.yaml
│   │   └── *.env
│   └── VSCode_Settings/
│
├── 98_ORIGINALS_ARCHIVE/
│   └── [Original folder structure preserved as backup]
│
└── 99_DUPLICATES_TO_REVIEW/
    └── [Suspected duplicates pending deletion approval]
```

### Folder Structure Rationale

| Folder | Purpose | Optimization |
|--------|---------|--------------|
| 00_CASE_INDEX | Central reference hub | Numbered 00 to always appear first |
| 01-09 | Core case materials | Numbered for logical workflow progression |
| 01 | Legal filings | Separated for attorney access |
| 02 | Employment history | Establishes baseline relationship |
| 03 | Policies | Reference for compliance arguments |
| 04 | Communications | Chronological evidence trail |
| 05 | Bad faith evidence | **KEY:** Your strongest arguments |
| 06 | Supporting evidence | Counter-narrative materials |
| 07 | Media | Separated by format for processing |
| 08 | Work product | Your analysis and strategy |
| 09 | Reference | External research materials |
| 10 | Technical | Scripts and config isolated |
| 98 | Archive | Preserve original state before reorganization |
| 99 | Duplicates | Staging area for review before deletion |

---

## 6. Phase 5: Document Reorganization Workflow

**IMPORTANT:** All moves require your explicit approval.

### Step 5.1: Create Backup of Current Structure

**Ask Claude:**
> "Create a complete inventory of the current folder structure in '/Users/trl/Documents/CB x Aurora' and save it to a file before we make any changes"

### Step 5.2: Create New Folder Structure

**Ask Claude:**
> "Use create_directory to create the folder structure I've approved at '/Users/trl/Documents/CB x Aurora/[folder name]'"

Repeat for each folder in the approved structure.

### Step 5.3: Move Files (With Approval)

For each file to be moved, I will present:
1. Current location
2. Proposed new location
3. Rationale for the move

**You approve or deny each move.**

**To execute approved move:**
> "Use move_file to move '[source path]' to '[destination path]'"

### Step 5.4: Handle Duplicates (With Approval)

For each suspected duplicate:
1. I'll show both files
2. Compare content/metadata
3. Recommend which to keep
4. **Wait for your explicit deletion approval**

**To delete approved duplicate:**
> "Use the terminal to delete '[file path]' - but first confirm this is correct"

---

## 7. Phase 6: Advanced Analysis Techniques

### 7.1: Building Case Timeline

After content searches, compile a chronological timeline:

**Ask Claude:**
> "Based on the documents we've reviewed, create a chronological timeline of events in the Burandt v Aurora case, including dates, events, and source documents"

### 7.2: Identifying Inconsistencies

Cross-reference documents for contradictions:

**Ask Claude:**
> "Compare the statements in [document A] with [document B] and identify any inconsistencies or contradictions"

### 7.3: Policy Violation Analysis

**Ask Claude:**
> "Read Aurora's [policy document] and then read [termination document]. Identify any instances where the termination process violated stated policy"

### 7.4: Pattern Recognition

**Ask Claude:**
> "Based on all correspondence reviewed, identify patterns in how Aurora communicated with Burandt, particularly any shifts in tone or treatment"

### 7.5: Generating Evidence Summaries

For each key piece of evidence:

**Ask Claude:**
> "Read [document] and provide a summary including: (1) Document type, (2) Date, (3) Key parties, (4) Main points, (5) Relevance to bad faith/unfairness claims, (6) Potential weaknesses"

---

## 8. Quick Reference Command Library

### Reconnaissance Commands

```
"Use list_directory on '/Users/trl/Documents/CB x Aurora' with depth 4"

"Use start_search on '/Users/trl/Documents/CB x Aurora' in files mode with pattern '*.pdf'"

"Use get_file_info on '[file path]'"
```

### Content Search Commands

```
"Use start_search on '/Users/trl/Documents/CB x Aurora' in content mode with pattern '[search term]' with contextLines 3"

"Use get_more_search_results with sessionId '[id]' offset [n] length 20"

"Use list_searches to see active search sessions"
```

### Reading Commands

```
"Use read_file on '[file path]'"

"Use read_file on '[file path]' with offset [n] and length [m]"

"Use read_multiple_files on ['file1', 'file2', 'file3']"
```

### Organization Commands (Require Approval)

```
"Use create_directory at '[path]'"

"Use move_file from '[source]' to '[destination]'"
```

### Utility Commands

```
"Use get_config to show current configuration"

"Use set_config_value to update [setting] to [value]"

"Use get_recent_tool_calls with maxResults 50"
```

---

## 9. Legal Document Analysis Keywords

### Employment Law Terms

| Term | Search Pattern | Relevance |
|------|----------------|-----------|
| At-will employment | `at-will` OR `at will` | Employment status |
| Just cause | `just cause` | Termination standard |
| Progressive discipline | `progressive discipline` | Required process |
| Due process | `due process` | Procedural rights |
| Constructive dismissal | `constructive` | Alternative claim |
| Wrongful termination | `wrongful` | Primary claim |
| Breach of contract | `breach` | Contract claims |
| Implied contract | `implied` | Contract arguments |
| Good faith and fair dealing | `good faith` OR `fair dealing` | Covenant claims |
| Mitigation | `mitigation` | Damages |

### Evidence of Bad Faith

| Indicator | Search Pattern | What It Proves |
|-----------|----------------|----------------|
| Pretextual reasoning | `reason` AND `termination` | False justification |
| Inconsistent treatment | `other employees` OR `similarly situated` | Discrimination |
| Rushed process | `immediately` OR `effective immediately` | Lack of due process |
| Missing documentation | `no record` OR `not documented` | Fabrication |
| Changing stories | Search same topic across dates | Inconsistency |
| Ignored complaints | `complaint` AND `response` | Retaliation |

### Advocacy Optimization Terms

| Argument Type | Key Terms to Find |
|---------------|-------------------|
| Policy violation | Policy name + "violated", "not followed", "ignored" |
| Procedural error | "Step", "process", "requirement" + "skipped", "missed" |
| Timeline issues | Dates that don't align, rushed decisions |
| Witness support | "Witnessed", "observed", "confirmed", "corroborate" |
| Documentary evidence | Emails, memos with explicit statements |

---

## Appendix A: Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| "File not found" | Check exact path including trailing space |
| Search returns nothing | Try alternative spellings, case-insensitive search |
| PDF won't read | File may be image-based; OCR needed externally |
| Large file timeout | Use offset/length pagination |
| Too many results | Add more specific search terms |

### File Conversion Requirements

For .docx, .doc, .pages files:
1. Open in native application (Word, Pages)
2. File > Export to PDF or Save As PDF
3. Save to same location or dedicated PDF folder
4. Original remains untouched

---

## Appendix B: Session Recovery

If your Claude session is interrupted:

**Ask Claude:**
> "Use get_recent_tool_calls with maxResults 100 to show me what we were working on"

This recovers the context of your analysis session.

---

## Next Steps

To begin your analysis, copy and paste these prompts to Claude Desktop (with DesktopCommanderMCP installed):

### Prompt 1: Initial Reconnaissance
> "I need to analyze legal documents in '/Users/trl/Documents/CB x Aurora'. Please use list_directory with depth 4 to map the complete folder structure, then use start_search in files mode to count all PDFs, and report what you find."

### Prompt 2: Begin Content Search
> "Use start_search on '/Users/trl/Documents/CB x Aurora' in content mode with pattern 'termination' and contextLines 3 to find all documents discussing termination."

### Prompt 3: Build Context
> "After reviewing the search results, read the most relevant documents completely and help me understand the narrative of what happened to Burandt."

---

**Document Version:** 1.0
**Created:** For Burandt v Aurora case analysis
**Tool:** DesktopCommanderMCP
**Note:** All file modifications require explicit user approval
