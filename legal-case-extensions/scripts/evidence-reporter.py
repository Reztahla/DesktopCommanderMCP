#!/usr/bin/env python3
"""
Evidence Reporter for Burandt v Aurora
Generates formatted reports from case analysis data

Usage:
    python evidence-reporter.py --input analysis_folder --output report.md --type summary
    python evidence-reporter.py --input analysis_folder --output report.md --type full
    python evidence-reporter.py --input analysis_folder --output report.md --type exhibits
"""

import os
import sys
import json
import argparse
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Optional

# =============================================================================
# CONFIGURATION
# =============================================================================

CASE_PATH = "/Users/trl/Documents/CB x Aurora"
ANALYSIS_PATH = f"{CASE_PATH}/00_CASE_ANALYSIS"

PHASE_NAMES = {
    'Phase1': 'Document Reconnaissance',
    'Phase2': 'Termination Analysis',
    'Phase3': 'Policy Compliance Audit',
    'Phase4': 'Bad Faith Evidence',
    'Phase5': 'Case Timeline',
    'Phase6': 'Witness Analysis',
    'Phase7': 'Pretext Demolition',
    'Phase8': 'Case Theory'
}

# =============================================================================
# REPORT GENERATORS
# =============================================================================

def generate_executive_summary(analysis_path: str) -> str:
    """Generate a one-page executive summary."""
    report = []
    report.append("# BURANDT v AURORA: EXECUTIVE SUMMARY")
    report.append(f"\nGenerated: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    report.append("\n---\n")

    # Try to read each phase deliverable
    for phase_dir, phase_name in PHASE_NAMES.items():
        phase_path = os.path.join(analysis_path, f"{phase_dir}_*")

        # Find matching directory
        import glob
        matches = glob.glob(phase_path)

        if matches:
            phase_folder = matches[0]
            # Look for markdown files
            md_files = glob.glob(os.path.join(phase_folder, "*.md"))

            if md_files:
                report.append(f"## {phase_name}")
                report.append("")

                # Read first 20 lines as summary
                try:
                    with open(md_files[0], 'r') as f:
                        lines = f.readlines()[:20]
                        for line in lines:
                            if line.strip() and not line.startswith('#'):
                                report.append(line.rstrip())
                except IOError:
                    report.append("*Analysis pending*")

                report.append("")

    report.append("\n---\n")
    report.append("## NEXT STEPS\n")
    report.append("1. Review all phase deliverables")
    report.append("2. Identify strongest evidence")
    report.append("3. Prepare settlement demand or litigation strategy")
    report.append("4. Consult with legal counsel")

    return "\n".join(report)


def generate_violation_report(analysis_path: str) -> str:
    """Generate a report of all policy violations found."""
    report = []
    report.append("# POLICY VIOLATIONS REPORT")
    report.append(f"\nGenerated: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    report.append("\n---\n")

    report.append("## VIOLATIONS SUMMARY")
    report.append("")
    report.append("| # | Violation | Severity | Policy Source | Evidence |")
    report.append("|---|-----------|----------|---------------|----------|")

    # This would be populated from Phase 3 analysis
    # For now, provide template
    report.append("| V-001 | [Violation description] | CRITICAL | [Policy] | [Document] |")
    report.append("")

    report.append("## VIOLATION DETAILS")
    report.append("")
    report.append("*Populate from Phase 3 Policy Compliance Audit*")

    return "\n".join(report)


def generate_evidence_matrix(analysis_path: str) -> str:
    """Generate a comprehensive evidence matrix."""
    report = []
    report.append("# EVIDENCE MATRIX")
    report.append(f"\nGenerated: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    report.append("\n---\n")

    categories = [
        ("Bad Faith Evidence", "Phase4_BadFaith"),
        ("Policy Violations", "Phase3_Policy"),
        ("Timeline Anomalies", "Phase5_Timeline"),
        ("Witness Support", "Phase6_Witnesses"),
        ("Pretext Indicators", "Phase7_Pretext")
    ]

    for category_name, phase_dir in categories:
        report.append(f"## {category_name}")
        report.append("")
        report.append("| Evidence # | Description | Document | Strength | Use For |")
        report.append("|------------|-------------|----------|----------|---------|")
        report.append("| | | | | |")
        report.append("")

    return "\n".join(report)


def generate_exhibit_list(case_path: str) -> str:
    """Generate a numbered exhibit list from case documents."""
    report = []
    report.append("# EXHIBIT LIST")
    report.append(f"\nGenerated: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    report.append("\n---\n")

    exhibit_num = 1
    categories = {
        'Termination': [],
        'Policy': [],
        'Correspondence': [],
        'Performance': [],
        'Other': []
    }

    # Walk through case folder
    for root, dirs, files in os.walk(case_path):
        # Skip analysis folder
        if '00_CASE_ANALYSIS' in root:
            continue
        if '99_DUPLICATES' in root:
            continue
        if '98_ORIGINALS' in root:
            continue

        for filename in files:
            if filename.startswith('.'):
                continue

            filepath = os.path.join(root, filename)
            rel_path = os.path.relpath(filepath, case_path)
            lower_name = filename.lower()

            # Categorize
            if 'terminat' in lower_name or 'fired' in lower_name:
                category = 'Termination'
            elif 'policy' in lower_name or 'handbook' in lower_name:
                category = 'Policy'
            elif 'email' in lower_name or 'letter' in lower_name or 'correspondence' in lower_name:
                category = 'Correspondence'
            elif 'performance' in lower_name or 'review' in lower_name:
                category = 'Performance'
            else:
                category = 'Other'

            categories[category].append({
                'name': filename,
                'path': rel_path
            })

    # Generate exhibit list
    report.append("| Exhibit # | Document | Category | Path |")
    report.append("|-----------|----------|----------|------|")

    for category, files in categories.items():
        for file_info in sorted(files, key=lambda x: x['name']):
            report.append(f"| EX-{exhibit_num:03d} | {file_info['name']} | {category} | {file_info['path']} |")
            exhibit_num += 1

    report.append("")
    report.append(f"**Total Exhibits:** {exhibit_num - 1}")

    return "\n".join(report)


def generate_deposition_prep(analysis_path: str) -> str:
    """Generate deposition preparation materials."""
    report = []
    report.append("# DEPOSITION PREPARATION GUIDE")
    report.append(f"\nGenerated: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    report.append("\n---\n")

    report.append("## KEY WITNESSES TO DEPOSE")
    report.append("")
    report.append("*Populate from Phase 6 Witness Analysis*")
    report.append("")
    report.append("| Priority | Witness | Role | Key Topics | Documents to Use |")
    report.append("|----------|---------|------|------------|------------------|")
    report.append("| 1 | | | | |")
    report.append("")

    report.append("## DEPOSITION QUESTION FRAMEWORK")
    report.append("")

    sections = [
        "### Foundation Questions",
        "- Establish witness role and authority",
        "- Confirm their involvement in decisions",
        "- Document their knowledge of policies",
        "",
        "### Policy Knowledge Questions",
        "- Confirm they knew company policies",
        "- Establish what procedures should have been followed",
        "- Document their understanding of requirements",
        "",
        "### Document-Specific Questions",
        "- Walk through key documents",
        "- Confirm authenticity and authorship",
        "- Extract admissions about content",
        "",
        "### Inconsistency Questions",
        "- Highlight contradictions between documents",
        "- Challenge shifting explanations",
        "- Lock in testimony that contradicts Aurora's position",
        "",
        "### Admission-Seeking Questions",
        "- Extract concessions about process failures",
        "- Confirm they knew the rules weren't followed",
        "- Document knowledge of unfair treatment"
    ]

    report.extend(sections)

    return "\n".join(report)


# =============================================================================
# MAIN
# =============================================================================

def main():
    parser = argparse.ArgumentParser(description='Evidence Reporter for Burandt v Aurora')
    parser.add_argument('--input', default=ANALYSIS_PATH, help='Path to analysis folder')
    parser.add_argument('--case-path', default=CASE_PATH, help='Path to case folder')
    parser.add_argument('--output', help='Output file path')
    parser.add_argument('--type', choices=['summary', 'violations', 'matrix', 'exhibits', 'deposition', 'all'],
                        default='summary', help='Report type to generate')

    args = parser.parse_args()

    generators = {
        'summary': lambda: generate_executive_summary(args.input),
        'violations': lambda: generate_violation_report(args.input),
        'matrix': lambda: generate_evidence_matrix(args.input),
        'exhibits': lambda: generate_exhibit_list(args.case_path),
        'deposition': lambda: generate_deposition_prep(args.input)
    }

    if args.type == 'all':
        report_types = ['summary', 'violations', 'matrix', 'exhibits', 'deposition']
    else:
        report_types = [args.type]

    for report_type in report_types:
        print(f"Generating {report_type} report...")

        report_content = generators[report_type]()

        if args.output:
            if len(report_types) > 1:
                # Multiple reports - add type to filename
                base, ext = os.path.splitext(args.output)
                output_path = f"{base}_{report_type}{ext}"
            else:
                output_path = args.output

            with open(output_path, 'w') as f:
                f.write(report_content)
            print(f"  Saved to: {output_path}")
        else:
            print(report_content)
            print("\n" + "="*60 + "\n")

    print("Done!")


if __name__ == '__main__':
    main()
