/**
 * Shared file size and performance constants for file handlers.
 * Centralized here to avoid duplicating magic numbers across
 * src/utils/files/text.ts, src/utils/files/excel.ts, and src/tools/filesystem.ts.
 */

export const FILE_SIZE_LIMITS = {
    LARGE_FILE_THRESHOLD: 10 * 1024 * 1024,  // 10MB - threshold for large-file optimizations
    LINE_COUNT_LIMIT: 10 * 1024 * 1024,       // 10MB - max size for in-memory line counting
} as const;

export const READ_PERFORMANCE_THRESHOLDS = {
    SMALL_READ_THRESHOLD: 100,    // For very small reads
    DEEP_OFFSET_THRESHOLD: 1000,  // For byte estimation
    SAMPLE_SIZE: 10000,           // Sample size for byte-per-line estimation
    CHUNK_SIZE: 8192,             // 8KB chunks for reverse reading
} as const;
