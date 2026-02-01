/**
 * Legal Case Analysis Tools for DesktopCommanderMCP
 * Optimized for Burandt v Aurora employment litigation
 *
 * These tools extend DesktopCommanderMCP with specialized legal document analysis capabilities.
 * To install: Import handlers and add to server.ts switch statement
 */

import { z } from 'zod';
import { ServerResult } from '../../src/types.js';

// ============================================================================
// SCHEMAS
// ============================================================================

export const LegalSearchSchema = z.object({
  casePath: z.string().describe('Path to case folder'),
  searchType: z.enum([
    'termination',
    'policy_violation',
    'bad_faith',
    'timeline',
    'witness',
    'pretext',
    'retaliation',
    'damages',
    'custom'
  ]).describe('Type of legal search to perform'),
  customPatterns: z.array(z.string()).optional().describe('Custom search patterns for "custom" type'),
  contextLines: z.number().optional().default(5).describe('Lines of context around matches'),
  outputFormat: z.enum(['summary', 'detailed', 'evidence_matrix']).optional().default('detailed')
});

export const EvidenceExtractorSchema = z.object({
  filePath: z.string().describe('Path to document to analyze'),
  extractionType: z.enum([
    'dates',
    'names',
    'quotes',
    'admissions',
    'policy_references',
    'all'
  ]).describe('Type of evidence to extract'),
  outputPath: z.string().optional().describe('Path to save extraction results')
});

export const TimelineBuilderSchema = z.object({
  casePath: z.string().describe('Path to case folder'),
  startDate: z.string().optional().describe('Start date filter (YYYY-MM-DD)'),
  endDate: z.string().optional().describe('End date filter (YYYY-MM-DD)'),
  includeMetadata: z.boolean().optional().default(true).describe('Include file metadata dates'),
  outputPath: z.string().describe('Path to save timeline')
});

export const PolicyAuditSchema = z.object({
  policyPath: z.string().describe('Path to policy document(s)'),
  actionsPath: z.string().describe('Path to documents describing actions taken'),
  outputPath: z.string().describe('Path to save audit results')
});

export const WitnessMapperSchema = z.object({
  casePath: z.string().describe('Path to case folder'),
  outputPath: z.string().describe('Path to save witness map'),
  includeContactInfo: z.boolean().optional().default(false)
});

export const DuplicateFinderSchema = z.object({
  casePath: z.string().describe('Path to case folder'),
  compareMethod: z.enum(['name', 'size', 'content', 'hash']).optional().default('size'),
  outputPath: z.string().describe('Path to save duplicate report'),
  autoFlag: z.boolean().optional().default(false).describe('Automatically flag duplicates for review')
});

export const ExhibitIndexerSchema = z.object({
  casePath: z.string().describe('Path to case folder'),
  outputPath: z.string().describe('Path to save exhibit index'),
  prefix: z.string().optional().default('EX').describe('Exhibit number prefix'),
  categories: z.array(z.string()).optional().describe('Document categories to index')
});

// ============================================================================
// LEGAL SEARCH PATTERNS
// ============================================================================

export const LEGAL_SEARCH_PATTERNS = {
  termination: [
    'terminat',
    'fired',
    'discharged',
    'separated',
    'dismissal',
    'end of employment',
    'last day',
    'effective immediately',
    'no longer employed'
  ],

  policy_violation: [
    'policy',
    'handbook',
    'procedure',
    'guideline',
    'requirement',
    'violation',
    'non-compliance',
    'failed to follow',
    'did not follow',
    'contrary to'
  ],

  bad_faith: [
    'immediate',
    'no warning',
    'without notice',
    'predetermined',
    'already decided',
    'no opportunity',
    'denied',
    'refused',
    'ignored',
    'different treatment',
    'other employees',
    'first time',
    'never before',
    'changed',
    'inconsistent'
  ],

  timeline: [
    '2022',
    '2023',
    '2024',
    '2025',
    '2026',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
    'meeting',
    'conversation',
    'email',
    'letter'
  ],

  witness: [
    'witnessed',
    'observed',
    'saw',
    'heard',
    'present',
    'attended',
    'can confirm',
    'will attest',
    'told me',
    'said that',
    'informed'
  ],

  pretext: [
    'reason',
    'because',
    'due to',
    'result of',
    'performance',
    'conduct',
    'behavior',
    'actually',
    'real reason',
    'truth'
  ],

  retaliation: [
    'complained',
    'reported',
    'raised concerns',
    'after I',
    'following my',
    'since I',
    'retaliat',
    'payback',
    'punishment',
    'protected activity'
  ],

  damages: [
    'lost',
    'damage',
    'harm',
    'suffer',
    'distress',
    'humiliat',
    'reputation',
    'career',
    'income',
    'benefits',
    'compensation'
  ]
};

// ============================================================================
// HANDLER IMPLEMENTATIONS
// ============================================================================

/**
 * Performs specialized legal document searches with predefined patterns
 */
export async function handleLegalSearch(args: unknown): Promise<ServerResult> {
  const parsed = LegalSearchSchema.parse(args);
  const patterns = parsed.searchType === 'custom'
    ? parsed.customPatterns || []
    : LEGAL_SEARCH_PATTERNS[parsed.searchType];

  const instructions = `
LEGAL SEARCH EXECUTION - Type: ${parsed.searchType.toUpperCase()}

Execute these searches on '${parsed.casePath}' in content mode with contextLines ${parsed.contextLines}:

${patterns.map((p, i) => `${i + 1}. Pattern: '${p}'`).join('\n')}

For each match found, extract:
- File path
- Exact quote (with context)
- Page/line number if available
- Legal significance rating (1-10)
- How it supports the case

${parsed.outputFormat === 'evidence_matrix' ? `
Format results as an Evidence Matrix:
| Evidence # | Quote | Document | Context | Significance | Strength |
|------------|-------|----------|---------|--------------|----------|
` : parsed.outputFormat === 'summary' ? `
Format as executive summary with key findings.
` : `
Format as detailed analysis with full context for each finding.
`}
`;

  return {
    content: [{
      type: 'text',
      text: instructions
    }]
  };
}

/**
 * Extracts specific types of evidence from documents
 */
export async function handleEvidenceExtractor(args: unknown): Promise<ServerResult> {
  const parsed = EvidenceExtractorSchema.parse(args);

  const extractionInstructions: Record<string, string> = {
    dates: `Extract ALL dates mentioned:
- Explicit dates (January 15, 2024)
- Relative dates (last week, three months ago)
- Time references (morning, after lunch)
Create a chronological list with context for each date.`,

    names: `Extract ALL person names mentioned:
- Full names
- Titles/roles
- Departments
- Relationships to case
Create a person directory with role and document location.`,

    quotes: `Extract ALL significant quotes:
- Direct quotes (in quotation marks)
- Reported speech
- Key statements
- Admissions
Note speaker, date if available, and legal significance.`,

    admissions: `Extract ALL admissions against interest:
- Acknowledgments of wrongdoing
- Statements contrary to Aurora's position
- Concessions
- Apologies
Rate each admission's evidentiary value 1-10.`,

    policy_references: `Extract ALL policy references:
- Named policies
- Handbook sections
- Procedure references
- Guideline citations
Note whether policy was followed or violated.`,

    all: `Perform COMPREHENSIVE extraction:
1. All dates
2. All person names with roles
3. All significant quotes
4. All admissions against interest
5. All policy references
Create a structured evidence inventory.`
  };

  const instructions = `
EVIDENCE EXTRACTION - Type: ${parsed.extractionType.toUpperCase()}

Read the document at '${parsed.filePath}' completely.

${extractionInstructions[parsed.extractionType]}

${parsed.outputPath ? `Save results to: ${parsed.outputPath}` : 'Return results in response.'}
`;

  return {
    content: [{
      type: 'text',
      text: instructions
    }]
  };
}

/**
 * Builds a comprehensive case timeline from documents
 */
export async function handleTimelineBuilder(args: unknown): Promise<ServerResult> {
  const parsed = TimelineBuilderSchema.parse(args);

  const instructions = `
TIMELINE CONSTRUCTION

Analyze all documents in '${parsed.casePath}' to build a comprehensive timeline.

STEP 1 - Date Extraction:
- Search document content for date references
${parsed.includeMetadata ? '- Use get_file_info to capture file creation/modification dates' : ''}
${parsed.startDate ? `- Filter: Events on or after ${parsed.startDate}` : ''}
${parsed.endDate ? `- Filter: Events on or before ${parsed.endDate}` : ''}

STEP 2 - Event Classification:
Categorize each event:
- HIRE: Employment start, role changes
- POSITIVE: Good performance, praise, promotions
- DISCIPLINE: Warnings, write-ups, PIPs
- COMPLAINT: Concerns raised by employee
- ADVERSE: Negative actions against employee
- MEETING: Documented meetings
- COMMUNICATION: Emails, letters, messages
- TERMINATION: Termination process events
- POST-TERM: Events after termination

STEP 3 - Timeline Construction:
Create a markdown timeline:

| Date | Event | Category | Key Details | People | Document | Significance |
|------|-------|----------|-------------|--------|----------|--------------|

STEP 4 - Pattern Analysis:
Identify:
- Suspicious timing (events too close together)
- Correlation with complaints
- Documentation gaps
- Rapid escalation patterns

Save to: ${parsed.outputPath}
`;

  return {
    content: [{
      type: 'text',
      text: instructions
    }]
  };
}

/**
 * Audits compliance between stated policies and actual actions
 */
export async function handlePolicyAudit(args: unknown): Promise<ServerResult> {
  const parsed = PolicyAuditSchema.parse(args);

  const instructions = `
POLICY COMPLIANCE AUDIT

STEP 1 - Policy Extraction:
Read policy document(s) at '${parsed.policyPath}'
Extract ALL procedural requirements for:
- Discipline process
- Progressive discipline steps
- Documentation requirements
- Investigation procedures
- Termination approval process
- Employee notification requirements
- Appeal/grievance procedures

Create a Policy Requirements Checklist:
| Req # | Requirement | Policy Section | Mandatory? |
|-------|-------------|----------------|------------|

STEP 2 - Actions Analysis:
Read documents at '${parsed.actionsPath}'
Document what Aurora actually did:
| Action # | Action Taken | Date | By Whom | Documentation |
|----------|--------------|------|---------|---------------|

STEP 3 - Compliance Comparison:
For each requirement, determine:
- Was it followed? (Yes/No/Partial/Unknown)
- Evidence supporting determination
- Impact of non-compliance

Create Violations Report:
| Violation # | Requirement | What Should Happen | What Actually Happened | Severity | Evidence |
|-------------|-------------|-------------------|----------------------|----------|----------|

Severity Levels:
- CRITICAL: Fundamental procedural failure
- MAJOR: Significant deviation
- MINOR: Technical non-compliance

STEP 4 - Legal Implications:
For each violation, explain:
- How it demonstrates bad faith
- How it harmed the employee
- Potential legal consequences for employer

Save to: ${parsed.outputPath}
`;

  return {
    content: [{
      type: 'text',
      text: instructions
    }]
  };
}

/**
 * Maps all witnesses and their potential testimony
 */
export async function handleWitnessMapper(args: unknown): Promise<ServerResult> {
  const parsed = WitnessMapperSchema.parse(args);

  const instructions = `
WITNESS MAPPING

Analyze all documents in '${parsed.casePath}' to identify potential witnesses.

STEP 1 - Person Identification:
Extract every person mentioned:
- Names in correspondence (sender, recipient, CC)
- Signatories on documents
- People referenced in content
- Supervisors, HR, colleagues, executives

STEP 2 - Witness Classification:
For each person, determine:
- Role/Title
- Relationship to case
- Alignment: DECISION-MAKER | HOSTILE | NEUTRAL | FRIENDLY | UNKNOWN
- What they likely know
- Documents they appear in

STEP 3 - Testimony Potential:
Assess each witness:
| Name | Role | What They Can Testify To | Value (1-10) | Risk | Priority |
|------|------|-------------------------|--------------|------|----------|

Value Factors:
- Direct knowledge of key events
- Credibility
- Documentary support

Risk Factors:
- May be pressured by employer
- Conflicting interests
- Unreliable memory

STEP 4 - Deposition Strategy:
Rank witnesses by deposition priority with:
- Key topics to cover
- Documents to use
- Admissions to seek
- Impeachment opportunities

${parsed.includeContactInfo ? 'STEP 5 - Contact Information:\nExtract any contact details found in documents.' : ''}

Save to: ${parsed.outputPath}
`;

  return {
    content: [{
      type: 'text',
      text: instructions
    }]
  };
}

/**
 * Finds duplicate files in the case folder
 */
export async function handleDuplicateFinder(args: unknown): Promise<ServerResult> {
  const parsed = DuplicateFinderSchema.parse(args);

  const instructions = `
DUPLICATE FILE DETECTION

Scan '${parsed.casePath}' for duplicate files.

STEP 1 - Initial Scan:
Search for files with duplicate-suggesting patterns:
- '*copy*', '*Copy*', '*(1)*', '*(2)*'
- '*backup*', '*old*', '*draft*'
- '*v2*', '*revised*', '*FINAL*'

STEP 2 - Comparison Method: ${parsed.compareMethod.toUpperCase()}
${parsed.compareMethod === 'name' ? 'Compare file names for similarity' : ''}
${parsed.compareMethod === 'size' ? 'Use get_file_info to compare file sizes - identical sizes suggest duplicates' : ''}
${parsed.compareMethod === 'content' ? 'Use read_multiple_files to compare actual content' : ''}
${parsed.compareMethod === 'hash' ? 'Compare content for exact matches' : ''}

STEP 3 - Duplicate Report:
| Group # | File 1 | File 2 | Match Type | Recommendation |
|---------|--------|--------|------------|----------------|

Recommendations:
- KEEP_FIRST: Keep first, delete second
- KEEP_SECOND: Keep second, delete first
- REVIEW: Manual review needed
- KEEP_BOTH: Not true duplicates

${parsed.autoFlag ? `
STEP 4 - Auto-Flag:
Create a list of files to move to a 'DUPLICATES_TO_REVIEW' folder.
DO NOT DELETE - only flag for user review.
` : ''}

IMPORTANT: Do NOT delete any files. Only report findings.

Save to: ${parsed.outputPath}
`;

  return {
    content: [{
      type: 'text',
      text: instructions
    }]
  };
}

/**
 * Creates a numbered exhibit index for the case
 */
export async function handleExhibitIndexer(args: unknown): Promise<ServerResult> {
  const parsed = ExhibitIndexerSchema.parse(args);

  const defaultCategories = [
    'Termination Documents',
    'Employment Records',
    'Company Policies',
    'Correspondence',
    'Performance Records',
    'Witness Statements',
    'Evidence of Bad Faith',
    'Supporting Documents'
  ];

  const categories = parsed.categories || defaultCategories;

  const instructions = `
EXHIBIT INDEX CREATION

Create a comprehensive, legally-formatted exhibit index for '${parsed.casePath}'.

STEP 1 - Document Inventory:
Use list_directory with depth 4 to catalog all documents.

STEP 2 - Document Classification:
Categorize each document into:
${categories.map((c, i) => `${i + 1}. ${c}`).join('\n')}

STEP 3 - Exhibit Assignment:
Assign exhibit numbers using prefix '${parsed.prefix}':
- ${parsed.prefix}-001, ${parsed.prefix}-002, etc.
- Group by category
- Order chronologically within category

STEP 4 - Create Exhibit Index:

# EXHIBIT INDEX - Burandt v Aurora

## Summary
- Total Exhibits: [count]
- Date Range: [earliest] to [latest]
- Categories: [count]

## Master Index

| Exhibit # | Document Title | Date | Category | Description | Location |
|-----------|----------------|------|----------|-------------|----------|
| ${parsed.prefix}-001 | | | | | |

## By Category

${categories.map(c => `### ${c}\n| Exhibit # | Title | Date | Key Content |\n|-----------|-------|------|-------------|`).join('\n\n')}

## Cross-Reference
[Which exhibits support which claims]

Save to: ${parsed.outputPath}
`;

  return {
    content: [{
      type: 'text',
      text: instructions
    }]
  };
}

// ============================================================================
// TOOL REGISTRATION HELPER
// ============================================================================

export const LEGAL_TOOLS = [
  {
    name: 'legal_search',
    description: 'Performs specialized legal document searches with predefined patterns for termination, policy violations, bad faith, timeline, witnesses, pretext, retaliation, and damages analysis.',
    schema: LegalSearchSchema,
    handler: handleLegalSearch
  },
  {
    name: 'evidence_extractor',
    description: 'Extracts specific types of evidence (dates, names, quotes, admissions, policy references) from legal documents.',
    schema: EvidenceExtractorSchema,
    handler: handleEvidenceExtractor
  },
  {
    name: 'timeline_builder',
    description: 'Builds a comprehensive chronological timeline from case documents with event classification and pattern analysis.',
    schema: TimelineBuilderSchema,
    handler: handleTimelineBuilder
  },
  {
    name: 'policy_audit',
    description: 'Audits compliance between stated company policies and actual actions taken, identifying violations.',
    schema: PolicyAuditSchema,
    handler: handlePolicyAudit
  },
  {
    name: 'witness_mapper',
    description: 'Identifies and maps all potential witnesses from case documents with testimony assessment.',
    schema: WitnessMapperSchema,
    handler: handleWitnessMapper
  },
  {
    name: 'duplicate_finder',
    description: 'Finds and reports duplicate files in the case folder without deleting anything.',
    schema: DuplicateFinderSchema,
    handler: handleDuplicateFinder
  },
  {
    name: 'exhibit_indexer',
    description: 'Creates a numbered, categorized exhibit index for legal case documents.',
    schema: ExhibitIndexerSchema,
    handler: handleExhibitIndexer
  }
];

export default LEGAL_TOOLS;
