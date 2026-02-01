#!/bin/bash
# =============================================================================
# Batch Document Converter for Legal Case Analysis
# Converts .docx, .doc, .pages files to searchable PDFs
# Optimized for Burandt v Aurora case
# =============================================================================

set -e

# Configuration
CASE_PATH="${1:-/Users/trl/Documents/CB x Aurora}"
OUTPUT_DIR="${CASE_PATH}/Converted_PDFs"
LOG_FILE="${CASE_PATH}/conversion_log.txt"
BACKUP_DIR="${CASE_PATH}/Original_Backups"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
log() {
    echo -e "${BLUE}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

success() {
    echo -e "${GREEN}✓${NC} $1" | tee -a "$LOG_FILE"
}

warning() {
    echo -e "${YELLOW}⚠${NC} $1" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}✗${NC} $1" | tee -a "$LOG_FILE"
}

# Header
echo "=============================================================="
echo "  Legal Document Batch Converter"
echo "  Case: Burandt v Aurora"
echo "=============================================================="
echo ""

# Check if case path exists
if [ ! -d "$CASE_PATH" ]; then
    error "Case path does not exist: $CASE_PATH"
    exit 1
fi

# Create output directories
mkdir -p "$OUTPUT_DIR"
mkdir -p "$BACKUP_DIR"

log "Starting batch conversion..."
log "Source: $CASE_PATH"
log "Output: $OUTPUT_DIR"
log "Backup: $BACKUP_DIR"

# Initialize counters
TOTAL=0
CONVERTED=0
FAILED=0
SKIPPED=0

# Function to convert using LibreOffice (cross-platform)
convert_with_libreoffice() {
    local input_file="$1"
    local output_dir="$2"

    if command -v libreoffice &> /dev/null; then
        libreoffice --headless --convert-to pdf --outdir "$output_dir" "$input_file" 2>/dev/null
        return $?
    elif command -v soffice &> /dev/null; then
        soffice --headless --convert-to pdf --outdir "$output_dir" "$input_file" 2>/dev/null
        return $?
    else
        return 1
    fi
}

# Function to convert using macOS automator (if on Mac)
convert_with_automator() {
    local input_file="$1"
    local output_file="$2"

    if [[ "$OSTYPE" == "darwin"* ]]; then
        # Try using Pages for .pages files
        if [[ "$input_file" == *.pages ]]; then
            osascript <<EOF 2>/dev/null
tell application "Pages"
    open POSIX file "$input_file"
    delay 2
    export front document to POSIX file "$output_file" as PDF
    close front document saving no
end tell
EOF
            return $?
        fi

        # Try using Word for .docx/.doc files
        if [[ "$input_file" == *.docx ]] || [[ "$input_file" == *.doc ]]; then
            osascript <<EOF 2>/dev/null
tell application "Microsoft Word"
    open POSIX file "$input_file"
    delay 2
    save as active document file name POSIX file "$output_file" file format format PDF
    close active document saving no
end tell
EOF
            return $?
        fi
    fi

    return 1
}

# Function to convert a single file
convert_file() {
    local input_file="$1"
    local relative_path="${input_file#$CASE_PATH/}"
    local filename=$(basename "$input_file")
    local name_without_ext="${filename%.*}"
    local output_file="$OUTPUT_DIR/${name_without_ext}.pdf"

    ((TOTAL++))

    # Check if already converted
    if [ -f "$output_file" ]; then
        warning "Already exists: $filename → skipping"
        ((SKIPPED++))
        return
    fi

    log "Converting: $filename"

    # Try LibreOffice first
    if convert_with_libreoffice "$input_file" "$OUTPUT_DIR"; then
        success "Converted: $filename"
        ((CONVERTED++))
        return
    fi

    # Try Automator/native apps (macOS)
    if convert_with_automator "$input_file" "$output_file"; then
        success "Converted: $filename"
        ((CONVERTED++))
        return
    fi

    # If all methods fail
    error "Failed to convert: $filename"
    ((FAILED++))
}

# Find and convert all Office documents
echo ""
log "Scanning for Office documents..."

# Find .docx files
while IFS= read -r -d '' file; do
    convert_file "$file"
done < <(find "$CASE_PATH" -type f -name "*.docx" -print0 2>/dev/null)

# Find .doc files
while IFS= read -r -d '' file; do
    convert_file "$file"
done < <(find "$CASE_PATH" -type f -name "*.doc" ! -name "*.docx" -print0 2>/dev/null)

# Find .pages files
while IFS= read -r -d '' file; do
    convert_file "$file"
done < <(find "$CASE_PATH" -type f -name "*.pages" -print0 2>/dev/null)

# Summary
echo ""
echo "=============================================================="
echo "  Conversion Complete"
echo "=============================================================="
echo ""
echo "  Total files found:  $TOTAL"
echo "  Successfully converted: $CONVERTED"
echo "  Skipped (already done): $SKIPPED"
echo "  Failed: $FAILED"
echo ""
echo "  Converted PDFs saved to: $OUTPUT_DIR"
echo "  Conversion log: $LOG_FILE"
echo ""

if [ $FAILED -gt 0 ]; then
    warning "Some files failed to convert. Check the log for details."
    warning "You may need to manually convert these files."
fi

# Create a manifest of converted files
MANIFEST="$OUTPUT_DIR/conversion_manifest.md"
echo "# Converted Documents Manifest" > "$MANIFEST"
echo "" >> "$MANIFEST"
echo "Generated: $(date)" >> "$MANIFEST"
echo "" >> "$MANIFEST"
echo "## Successfully Converted" >> "$MANIFEST"
echo "" >> "$MANIFEST"

for pdf in "$OUTPUT_DIR"/*.pdf; do
    if [ -f "$pdf" ]; then
        echo "- $(basename "$pdf")" >> "$MANIFEST"
    fi
done

log "Manifest created: $MANIFEST"
