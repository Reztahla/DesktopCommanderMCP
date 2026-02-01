#!/bin/bash
# =============================================================================
# Burandt v Aurora Case Setup Script
# Creates the complete folder structure and initializes the case workspace
# =============================================================================

set -e

# Configuration
CASE_PATH="${1:-/Users/trl/Documents/CB x Aurora}"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "=============================================================="
echo "  Burandt v Aurora Case Workspace Setup"
echo "=============================================================="
echo ""

# Check if case path exists
if [ ! -d "$CASE_PATH" ]; then
    echo -e "${YELLOW}Warning: Case path does not exist: $CASE_PATH${NC}"
    echo "Creating directory..."
    mkdir -p "$CASE_PATH"
fi

echo -e "${BLUE}Setting up case workspace at: $CASE_PATH${NC}"
echo ""

# Create main analysis folder structure
echo "Creating analysis folder structure..."

mkdir -p "$CASE_PATH/00_CASE_ANALYSIS/Phase1_Reconnaissance"
mkdir -p "$CASE_PATH/00_CASE_ANALYSIS/Phase2_Termination"
mkdir -p "$CASE_PATH/00_CASE_ANALYSIS/Phase3_Policy"
mkdir -p "$CASE_PATH/00_CASE_ANALYSIS/Phase4_BadFaith"
mkdir -p "$CASE_PATH/00_CASE_ANALYSIS/Phase5_Timeline"
mkdir -p "$CASE_PATH/00_CASE_ANALYSIS/Phase6_Witnesses"
mkdir -p "$CASE_PATH/00_CASE_ANALYSIS/Phase7_Pretext"
mkdir -p "$CASE_PATH/00_CASE_ANALYSIS/Phase8_CaseTheory"
mkdir -p "$CASE_PATH/00_CASE_ANALYSIS/Evidence_Index"
mkdir -p "$CASE_PATH/00_CASE_ANALYSIS/Automated_Analysis"

echo -e "${GREEN}✓${NC} Analysis folders created"

# Create utility folders
mkdir -p "$CASE_PATH/Converted_PDFs"
mkdir -p "$CASE_PATH/98_ORIGINALS_ARCHIVE"
mkdir -p "$CASE_PATH/99_DUPLICATES_TO_REVIEW"

echo -e "${GREEN}✓${NC} Utility folders created"

# Create README in analysis folder
cat > "$CASE_PATH/00_CASE_ANALYSIS/README.md" << 'EOF'
# Burandt v Aurora Case Analysis

## Folder Structure

| Folder | Purpose |
|--------|---------|
| Phase1_Reconnaissance | Document inventory and initial assessment |
| Phase2_Termination | Termination analysis |
| Phase3_Policy | Policy compliance audit |
| Phase4_BadFaith | Bad faith evidence compilation |
| Phase5_Timeline | Chronological timeline |
| Phase6_Witnesses | Witness analysis |
| Phase7_Pretext | Pretext demolition analysis |
| Phase8_CaseTheory | Complete case theory synthesis |
| Evidence_Index | Numbered exhibit index |
| Automated_Analysis | Output from automated scripts |

## How to Use

1. Run prompts from the guide in sequential order
2. Each phase saves its deliverable to the corresponding folder
3. Later phases read earlier deliverables to maintain context
4. Review each phase output before proceeding

## Important

- Never delete files without explicit approval
- All original files should be preserved
- Convert Office documents to PDF for full searchability
EOF

echo -e "${GREEN}✓${NC} README created"

# Create a quick reference in the case folder
cat > "$CASE_PATH/QUICK_START.md" << 'EOF'
# Burandt v Aurora Quick Start

## Prerequisites

1. Install DesktopCommanderMCP:
   ```bash
   npx @wonderwhy-er/desktop-commander@latest setup
   ```

2. Restart Claude Desktop

3. Convert all .docx/.doc/.pages files to PDF

## First Prompt

Copy this into Claude Desktop:

```
You are an expert employment litigation analyst. Conduct initial reconnaissance of '/Users/trl/Documents/CB x Aurora'.

1. Use list_directory with depth 4 to map the structure
2. Count files by type
3. Identify priority documents
4. Note files needing conversion

Save findings to: /Users/trl/Documents/CB x Aurora/00_CASE_ANALYSIS/Phase1_Reconnaissance/Document_Inventory.md
```

## Analysis Phases

1. Reconnaissance → Document inventory
2. Termination → Termination analysis
3. Policy → Compliance audit
4. Bad Faith → Evidence compilation
5. Timeline → Chronological events
6. Witnesses → Witness mapping
7. Pretext → Demolition analysis
8. Case Theory → Final synthesis

Run each phase in order. Review before proceeding.
EOF

echo -e "${GREEN}✓${NC} Quick start guide created"

# Summary
echo ""
echo "=============================================================="
echo "  Setup Complete"
echo "=============================================================="
echo ""
echo "Created folders:"
echo "  - 00_CASE_ANALYSIS/ (with 8 phase subfolders)"
echo "  - Converted_PDFs/"
echo "  - 98_ORIGINALS_ARCHIVE/"
echo "  - 99_DUPLICATES_TO_REVIEW/"
echo ""
echo "Next steps:"
echo "  1. Install DesktopCommanderMCP if not already done"
echo "  2. Convert .docx/.doc/.pages files to PDF"
echo "  3. Open Claude Desktop and start with Phase 1"
echo ""
echo "See QUICK_START.md in case folder for details."
