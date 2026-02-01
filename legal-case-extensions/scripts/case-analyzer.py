#!/usr/bin/env python3
"""
Burandt v Aurora Case Analyzer
Automated legal document analysis and evidence compilation

This script provides automated analysis capabilities for the case folder,
generating reports that can be used with Claude Desktop and DesktopCommanderMCP.

Usage:
    python case-analyzer.py --path "/Users/trl/Documents/CB x Aurora" --action inventory
    python case-analyzer.py --path "/Users/trl/Documents/CB x Aurora" --action duplicates
    python case-analyzer.py --path "/Users/trl/Documents/CB x Aurora" --action timeline
    python case-analyzer.py --path "/Users/trl/Documents/CB x Aurora" --action full
"""

import os
import sys
import json
import hashlib
import argparse
from pathlib import Path
from datetime import datetime
from collections import defaultdict
from typing import Dict, List, Tuple, Optional
import re

# =============================================================================
# CONFIGURATION
# =============================================================================

CASE_PATH = "/Users/trl/Documents/CB x Aurora"
OUTPUT_DIR = "00_CASE_ANALYSIS"

# File type categories
FILE_CATEGORIES = {
    'documents': ['.pdf', '.docx', '.doc', '.pages', '.txt', '.md', '.rtf'],
    'images': ['.jpg', '.jpeg', '.png', '.gif', '.tiff', '.bmp', '.dng'],
    'videos': ['.mp4', '.mov', '.avi', '.mkv', '.wmv'],
    'audio': ['.mp3', '.wav', '.m4a', '.aac'],
    'data': ['.json', '.yaml', '.yml', '.csv', '.xlsx', '.xls'],
    'code': ['.py', '.sh', '.js', '.ts'],
    'archives': ['.zip', '.tar', '.gz', '.rar'],
    'config': ['.env', '.ini', '.cfg']
}

# Legal keyword categories
LEGAL_KEYWORDS = {
    'termination': ['terminat', 'fired', 'discharged', 'dismissed', 'separated', 'let go'],
    'policy': ['policy', 'handbook', 'procedure', 'guideline', 'rule', 'requirement'],
    'discipline': ['warning', 'write-up', 'pip', 'performance improvement', 'discipline'],
    'bad_faith': ['unfair', 'bad faith', 'pretextual', 'discriminat', 'retaliat'],
    'evidence': ['witness', 'evidence', 'proof', 'document', 'record'],
    'communication': ['email', 'letter', 'memo', 'message', 'correspondence']
}

# =============================================================================
# UTILITY FUNCTIONS
# =============================================================================

def get_file_hash(filepath: str, block_size: int = 65536) -> str:
    """Calculate MD5 hash of a file for duplicate detection."""
    hasher = hashlib.md5()
    try:
        with open(filepath, 'rb') as f:
            for block in iter(lambda: f.read(block_size), b''):
                hasher.update(block)
        return hasher.hexdigest()
    except (IOError, OSError):
        return ""

def get_file_category(extension: str) -> str:
    """Determine the category of a file based on extension."""
    ext = extension.lower()
    for category, extensions in FILE_CATEGORIES.items():
        if ext in extensions:
            return category
    return 'other'

def format_size(size_bytes: int) -> str:
    """Format file size in human-readable format."""
    for unit in ['B', 'KB', 'MB', 'GB']:
        if size_bytes < 1024:
            return f"{size_bytes:.1f} {unit}"
        size_bytes /= 1024
    return f"{size_bytes:.1f} TB"

def extract_dates_from_filename(filename: str) -> List[str]:
    """Extract potential dates from filename."""
    patterns = [
        r'\d{4}-\d{2}-\d{2}',  # YYYY-MM-DD
        r'\d{2}-\d{2}-\d{4}',  # MM-DD-YYYY
        r'\d{4}\d{2}\d{2}',    # YYYYMMDD
        r'\d{2}\d{2}\d{4}',    # MMDDYYYY
    ]
    dates = []
    for pattern in patterns:
        matches = re.findall(pattern, filename)
        dates.extend(matches)
    return dates

# =============================================================================
# ANALYSIS FUNCTIONS
# =============================================================================

def generate_inventory(case_path: str) -> Dict:
    """Generate a comprehensive file inventory."""
    inventory = {
        'generated': datetime.now().isoformat(),
        'case_path': case_path,
        'summary': {
            'total_files': 0,
            'total_size': 0,
            'by_category': defaultdict(int),
            'by_extension': defaultdict(int)
        },
        'files': [],
        'directories': []
    }

    for root, dirs, files in os.walk(case_path):
        rel_root = os.path.relpath(root, case_path)
        if rel_root != '.':
            inventory['directories'].append(rel_root)

        for filename in files:
            if filename.startswith('.'):
                continue

            filepath = os.path.join(root, filename)
            rel_path = os.path.relpath(filepath, case_path)

            try:
                stat = os.stat(filepath)
                ext = os.path.splitext(filename)[1].lower()
                category = get_file_category(ext)

                file_info = {
                    'name': filename,
                    'path': rel_path,
                    'extension': ext,
                    'category': category,
                    'size': stat.st_size,
                    'size_human': format_size(stat.st_size),
                    'created': datetime.fromtimestamp(stat.st_ctime).isoformat(),
                    'modified': datetime.fromtimestamp(stat.st_mtime).isoformat(),
                    'dates_in_name': extract_dates_from_filename(filename)
                }

                inventory['files'].append(file_info)
                inventory['summary']['total_files'] += 1
                inventory['summary']['total_size'] += stat.st_size
                inventory['summary']['by_category'][category] += 1
                inventory['summary']['by_extension'][ext] += 1

            except (IOError, OSError) as e:
                print(f"Warning: Could not process {filepath}: {e}")

    inventory['summary']['total_size_human'] = format_size(inventory['summary']['total_size'])
    inventory['summary']['by_category'] = dict(inventory['summary']['by_category'])
    inventory['summary']['by_extension'] = dict(inventory['summary']['by_extension'])

    return inventory

def find_duplicates(case_path: str) -> Dict:
    """Find duplicate files based on size and hash."""
    duplicates = {
        'generated': datetime.now().isoformat(),
        'case_path': case_path,
        'summary': {
            'total_duplicates': 0,
            'space_recoverable': 0
        },
        'duplicate_groups': []
    }

    # Group files by size first
    size_groups = defaultdict(list)

    for root, _, files in os.walk(case_path):
        for filename in files:
            if filename.startswith('.'):
                continue
            filepath = os.path.join(root, filename)
            try:
                size = os.path.getsize(filepath)
                size_groups[size].append(filepath)
            except OSError:
                continue

    # For files with same size, check hash
    for size, filepaths in size_groups.items():
        if len(filepaths) < 2:
            continue

        hash_groups = defaultdict(list)
        for filepath in filepaths:
            file_hash = get_file_hash(filepath)
            if file_hash:
                hash_groups[file_hash].append(filepath)

        for file_hash, duplicates_list in hash_groups.items():
            if len(duplicates_list) > 1:
                rel_paths = [os.path.relpath(p, case_path) for p in duplicates_list]

                group = {
                    'hash': file_hash,
                    'size': size,
                    'size_human': format_size(size),
                    'count': len(duplicates_list),
                    'files': rel_paths,
                    'recommendation': 'REVIEW - Keep one, consider removing others'
                }

                duplicates['duplicate_groups'].append(group)
                duplicates['summary']['total_duplicates'] += len(duplicates_list) - 1
                duplicates['summary']['space_recoverable'] += size * (len(duplicates_list) - 1)

    duplicates['summary']['space_recoverable_human'] = format_size(
        duplicates['summary']['space_recoverable']
    )

    return duplicates

def analyze_filenames_for_timeline(case_path: str) -> Dict:
    """Analyze filenames to extract potential timeline information."""
    timeline = {
        'generated': datetime.now().isoformat(),
        'case_path': case_path,
        'events': [],
        'files_by_date': defaultdict(list)
    }

    for root, _, files in os.walk(case_path):
        for filename in files:
            if filename.startswith('.'):
                continue

            filepath = os.path.join(root, filename)
            rel_path = os.path.relpath(filepath, case_path)

            # Extract dates from filename
            dates = extract_dates_from_filename(filename)

            # Get file modification date as fallback
            try:
                mtime = os.path.getmtime(filepath)
                mod_date = datetime.fromtimestamp(mtime).strftime('%Y-%m-%d')
            except OSError:
                mod_date = None

            if dates or mod_date:
                event = {
                    'file': rel_path,
                    'dates_in_name': dates,
                    'modified_date': mod_date,
                    'inferred_date': dates[0] if dates else mod_date
                }
                timeline['events'].append(event)

                date_key = dates[0] if dates else mod_date
                timeline['files_by_date'][date_key].append(rel_path)

    # Sort events by inferred date
    timeline['events'].sort(key=lambda x: x['inferred_date'] or '')
    timeline['files_by_date'] = dict(sorted(timeline['files_by_date'].items()))

    return timeline

def categorize_by_keywords(case_path: str) -> Dict:
    """Categorize files based on legal keywords in filenames."""
    categories = {
        'generated': datetime.now().isoformat(),
        'case_path': case_path,
        'by_category': {cat: [] for cat in LEGAL_KEYWORDS.keys()},
        'uncategorized': []
    }

    for root, _, files in os.walk(case_path):
        for filename in files:
            if filename.startswith('.'):
                continue

            filepath = os.path.join(root, filename)
            rel_path = os.path.relpath(filepath, case_path)
            filename_lower = filename.lower()

            categorized = False
            for category, keywords in LEGAL_KEYWORDS.items():
                for keyword in keywords:
                    if keyword in filename_lower:
                        categories['by_category'][category].append({
                            'file': rel_path,
                            'matched_keyword': keyword
                        })
                        categorized = True
                        break
                if categorized:
                    break

            if not categorized:
                categories['uncategorized'].append(rel_path)

    return categories

# =============================================================================
# REPORT GENERATORS
# =============================================================================

def generate_markdown_inventory(inventory: Dict, output_path: str):
    """Generate a markdown inventory report."""
    with open(output_path, 'w') as f:
        f.write("# Document Inventory Report\n\n")
        f.write(f"Generated: {inventory['generated']}\n\n")
        f.write(f"Case Path: `{inventory['case_path']}`\n\n")

        f.write("## Summary\n\n")
        f.write(f"- **Total Files:** {inventory['summary']['total_files']}\n")
        f.write(f"- **Total Size:** {inventory['summary']['total_size_human']}\n\n")

        f.write("### By Category\n\n")
        f.write("| Category | Count |\n")
        f.write("|----------|-------|\n")
        for cat, count in sorted(inventory['summary']['by_category'].items()):
            f.write(f"| {cat} | {count} |\n")

        f.write("\n### By Extension\n\n")
        f.write("| Extension | Count |\n")
        f.write("|-----------|-------|\n")
        for ext, count in sorted(inventory['summary']['by_extension'].items(), key=lambda x: -x[1]):
            f.write(f"| {ext or '(none)'} | {count} |\n")

        f.write("\n## Files Requiring Conversion\n\n")
        f.write("These files should be converted to PDF for full searchability:\n\n")
        for file_info in inventory['files']:
            if file_info['extension'] in ['.docx', '.doc', '.pages']:
                f.write(f"- `{file_info['path']}`\n")

        f.write("\n## Complete File List\n\n")
        f.write("| File | Category | Size | Modified |\n")
        f.write("|------|----------|------|----------|\n")
        for file_info in sorted(inventory['files'], key=lambda x: x['path']):
            f.write(f"| {file_info['name']} | {file_info['category']} | {file_info['size_human']} | {file_info['modified'][:10]} |\n")

def generate_markdown_duplicates(duplicates: Dict, output_path: str):
    """Generate a markdown duplicates report."""
    with open(output_path, 'w') as f:
        f.write("# Duplicate Files Report\n\n")
        f.write(f"Generated: {duplicates['generated']}\n\n")

        f.write("## Summary\n\n")
        f.write(f"- **Total Duplicate Files:** {duplicates['summary']['total_duplicates']}\n")
        f.write(f"- **Space Recoverable:** {duplicates['summary']['space_recoverable_human']}\n\n")

        f.write("## Duplicate Groups\n\n")
        f.write("**IMPORTANT:** Do NOT delete files without explicit user approval.\n\n")

        for i, group in enumerate(duplicates['duplicate_groups'], 1):
            f.write(f"### Group {i}\n\n")
            f.write(f"- **Size:** {group['size_human']}\n")
            f.write(f"- **Count:** {group['count']} files\n")
            f.write(f"- **Hash:** `{group['hash'][:16]}...`\n\n")
            f.write("Files:\n")
            for filepath in group['files']:
                f.write(f"1. `{filepath}`\n")
            f.write(f"\n**Recommendation:** {group['recommendation']}\n\n")

def generate_markdown_timeline(timeline: Dict, output_path: str):
    """Generate a markdown timeline report."""
    with open(output_path, 'w') as f:
        f.write("# Preliminary Timeline Report\n\n")
        f.write(f"Generated: {timeline['generated']}\n\n")
        f.write("**Note:** This timeline is based on filename analysis and file dates.\n")
        f.write("Content analysis required for complete timeline.\n\n")

        f.write("## Files by Date\n\n")
        for date, files in timeline['files_by_date'].items():
            f.write(f"### {date}\n\n")
            for filepath in files:
                f.write(f"- `{filepath}`\n")
            f.write("\n")

# =============================================================================
# MAIN
# =============================================================================

def main():
    parser = argparse.ArgumentParser(description='Burandt v Aurora Case Analyzer')
    parser.add_argument('--path', default=CASE_PATH, help='Path to case folder')
    parser.add_argument('--action', choices=['inventory', 'duplicates', 'timeline', 'keywords', 'full'],
                        default='full', help='Analysis action to perform')
    parser.add_argument('--output', help='Output directory (default: case_path/00_CASE_ANALYSIS)')
    parser.add_argument('--format', choices=['json', 'markdown', 'both'], default='both',
                        help='Output format')

    args = parser.parse_args()

    case_path = args.path
    output_dir = args.output or os.path.join(case_path, OUTPUT_DIR, 'Automated_Analysis')

    if not os.path.exists(case_path):
        print(f"Error: Case path does not exist: {case_path}")
        sys.exit(1)

    os.makedirs(output_dir, exist_ok=True)

    print(f"Analyzing: {case_path}")
    print(f"Output to: {output_dir}")
    print()

    actions = [args.action] if args.action != 'full' else ['inventory', 'duplicates', 'timeline', 'keywords']

    for action in actions:
        print(f"Running {action} analysis...")

        if action == 'inventory':
            result = generate_inventory(case_path)
            if args.format in ['json', 'both']:
                with open(os.path.join(output_dir, 'inventory.json'), 'w') as f:
                    json.dump(result, f, indent=2)
            if args.format in ['markdown', 'both']:
                generate_markdown_inventory(result, os.path.join(output_dir, 'inventory.md'))

        elif action == 'duplicates':
            result = find_duplicates(case_path)
            if args.format in ['json', 'both']:
                with open(os.path.join(output_dir, 'duplicates.json'), 'w') as f:
                    json.dump(result, f, indent=2)
            if args.format in ['markdown', 'both']:
                generate_markdown_duplicates(result, os.path.join(output_dir, 'duplicates.md'))

        elif action == 'timeline':
            result = analyze_filenames_for_timeline(case_path)
            if args.format in ['json', 'both']:
                with open(os.path.join(output_dir, 'timeline.json'), 'w') as f:
                    json.dump(result, f, indent=2)
            if args.format in ['markdown', 'both']:
                generate_markdown_timeline(result, os.path.join(output_dir, 'timeline.md'))

        elif action == 'keywords':
            result = categorize_by_keywords(case_path)
            if args.format in ['json', 'both']:
                with open(os.path.join(output_dir, 'keywords.json'), 'w') as f:
                    json.dump(result, f, indent=2)

        print(f"  ✓ {action} complete")

    print()
    print("Analysis complete!")
    print(f"Results saved to: {output_dir}")

if __name__ == '__main__':
    main()
