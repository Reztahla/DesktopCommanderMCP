# Claude Code Power User Implementation Guide

> A comprehensive guide to 10x your productivity with Claude Code based on battle-tested workflows from high-output engineering teams.

---

## Table of Contents

1. [Run 5 Claudes at Once](#1-run-5-claudes-at-once)
2. [Plan Mode is the Cheat Code](#2-plan-mode-is-the-cheat-code)
3. [CLAUDE.md is Compound Interest](#3-claudemd-is-compound-interest)
4. [Build Skills Once, Deploy Everywhere](#4-build-skills-once-deploy-everywhere)
5. [Bug In, Bug Squashed, Zero Friction](#5-bug-in-bug-squashed-zero-friction)
6. [Stop Prompting Like a Polite Intern](#6-stop-prompting-like-a-polite-intern)
7. [Your Terminal is Either a Cockpit or a Coffin](#7-your-terminal-is-either-a-cockpit-or-a-coffin)
8. [Subagents Are Your Secret Workforce](#8-subagents-are-your-secret-workforce)
9. [Never Write SQL Again](#9-never-write-sql-again)
10. [Turn Claude Into Your Personal Tutor](#10-turn-claude-into-your-personal-tutor)

---

## 1. Run 5 Claudes at Once

**The single biggest productivity unlock.** Multiple parallel Claude sessions let you tackle different aspects of a project simultaneously.

### Setting Up Git Worktrees

```bash
# Create worktrees for parallel development
cd ~/projects/my-project
git worktree add ../my-project-a feature-a
git worktree add ../my-project-b feature-b
git worktree add ../my-project-c bugfix-c
git worktree add ../my-project-analysis main  # Dedicated analysis worktree
git worktree add ../my-project-research main  # Research/exploration
```

### Shell Aliases for Instant Navigation

Add to `~/.zshrc` or `~/.bashrc`:

```bash
# Quick worktree navigation
alias za='cd ~/projects/my-project-a && claude'
alias zb='cd ~/projects/my-project-b && claude'
alias zc='cd ~/projects/my-project-c && claude'
alias zd='cd ~/projects/my-project-analysis && claude'
alias ze='cd ~/projects/my-project-research && claude'

# List all worktrees
alias wt='git worktree list'

# Quick worktree creation
mkwt() {
  git worktree add "../$(basename $(pwd))-$1" "${2:-main}"
  cd "../$(basename $(pwd))-$1"
  claude
}

# Remove worktree when done
rmwt() {
  cd ..
  git worktree remove "$(basename $(pwd))-$1"
}
```

### Recommended Worktree Structure

```
~/projects/
├── my-project/              # Main repo (origin)
├── my-project-feature/      # Active feature development
├── my-project-bugfix/       # Bug fixes
├── my-project-refactor/     # Refactoring work
├── my-project-analysis/     # Logs, BigQuery, metrics (never committed)
└── my-project-research/     # Experimentation, prototypes
```

### Terminal Layout (with tmux)

```bash
# ~/.tmux.conf additions
# Split into 4 panes with different worktrees
bind-key C-a send-prefix
bind-key | split-window -h
bind-key - split-window -v

# Quick session setup
bind-key M-c new-window -n 'claude-a' 'cd ~/projects/my-project-a && claude'
bind-key M-d new-window -n 'claude-b' 'cd ~/projects/my-project-b && claude'
```

### Session Naming Convention

```
Session A: Feature implementation
Session B: Tests for feature
Session C: Documentation
Session D: Analysis/debugging
Session E: Research/exploration
```

---

## 2. Plan Mode is the Cheat Code

**Every complex task starts in plan mode. Every. Single. One.**

### Entering Plan Mode

```
/plan
```

Or start your prompt with planning intent:
```
Plan the implementation of [feature]. Don't write any code yet.
```

### The Plan-First Workflow

```
┌─────────────────────────────────────────────────────────┐
│  1. Enter plan mode                                     │
│  2. Describe the problem comprehensively                │
│  3. Have Claude produce a detailed plan                 │
│  4. Review and refine the plan                          │
│  5. (Optional) Have second Claude review as staff eng   │
│  6. Approve plan                                        │
│  7. Claude one-shots the implementation                 │
│  8. If something breaks → Back to plan mode             │
└─────────────────────────────────────────────────────────┘
```

### Plan Review Pattern (Staff Engineer Review)

In Session A:
```
/plan
Implement a rate limiter with sliding window algorithm for our API endpoints.
Consider: Redis backend, configurable limits per endpoint, graceful degradation.
```

Copy the plan, then in Session B:
```
You are a staff engineer reviewing this implementation plan.
Be critical. Find edge cases, scalability issues, and security concerns.

[PASTE PLAN HERE]

Grade this plan A-F and list specific improvements needed before approval.
```

### When to Re-Plan

- Test failures you didn't anticipate
- Performance issues emerge
- Requirements change mid-implementation
- You hit an architectural wall
- The code "feels wrong"

```
Stop. This approach isn't working. Let's re-plan.

Current state: [describe what exists]
Problem: [what went wrong]
Constraints: [what must be preserved]

Create a new plan that addresses these issues.
```

---

## 3. CLAUDE.md is Compound Interest

**Every mistake becomes a rule. Rules compound into excellence.**

### CLAUDE.md Location

```
~/projects/my-project/CLAUDE.md
```

Claude automatically reads this file at session start.

### CLAUDE.md Template

```markdown
# Project: [Name]

## Project Context
- [Brief description]
- Tech stack: [list]
- Key patterns: [list]

## Code Style Rules
- Always use TypeScript strict mode
- Prefer functional components with hooks
- Use named exports, not default exports
- Error messages must include context: `throw new Error(\`Failed to process ${id}: ${reason}\`)`

## Common Mistakes (Don't Repeat These)
- [ ] Don't use `any` type - always define proper interfaces
- [ ] Don't forget null checks on optional API responses
- [ ] Always handle the loading state in React components
- [ ] Never commit console.log statements
- [ ] Don't use string concatenation for SQL - use parameterized queries

## Architecture Decisions
- Authentication: JWT with refresh tokens
- State management: Zustand (not Redux)
- API: REST with OpenAPI spec

## Testing Requirements
- Unit tests for all business logic
- Integration tests for API endpoints
- E2E tests for critical user flows

## File Organization
```
src/
├── components/     # React components
├── hooks/          # Custom hooks
├── services/       # API clients
├── utils/          # Pure functions
└── types/          # TypeScript interfaces
```

## Notes Directory
See `/docs/notes/` for:
- PR retrospectives
- Bug post-mortems
- Architecture decisions
```

### The Mistake-to-Rule Workflow

When Claude makes a mistake:
```
That caused [problem]. Update your CLAUDE.md so you don't make that mistake again.
```

Claude will suggest an addition. Review it, then:
```
Add this rule to CLAUDE.md under "Common Mistakes":
- [ ] [The new rule]
```

### Maintaining Notes Per Project

```
docs/notes/
├── 2024-01-15-auth-refactor.md
├── 2024-01-20-performance-fix.md
├── 2024-02-01-api-redesign.md
└── learnings.md  # Aggregated insights
```

In CLAUDE.md:
```markdown
## Project Notes
Review `/docs/notes/` before starting work. Key learnings:
- Auth: See 2024-01-15-auth-refactor.md for token refresh edge cases
- Performance: See 2024-01-20-performance-fix.md for N+1 query patterns
```

---

## 4. Build Skills Once, Deploy Everywhere

**If you do it more than once a day, turn it into a slash command.**

### Creating Custom Slash Commands

Location: `~/.claude/commands/`

#### /techdebt Command

File: `~/.claude/commands/techdebt.md`
```markdown
# Tech Debt Hunter

Analyze this codebase for technical debt. Look for:

1. **Duplicated Code**
   - Functions with similar logic
   - Copy-pasted patterns
   - Repeated error handling

2. **Code Smells**
   - Functions over 50 lines
   - Files over 500 lines
   - Deep nesting (>3 levels)
   - Magic numbers/strings

3. **Outdated Patterns**
   - Deprecated APIs
   - Old library versions
   - Legacy patterns that could be modernized

4. **Missing Tests**
   - Untested business logic
   - Missing edge case coverage

5. **Documentation Gaps**
   - Undocumented public APIs
   - Missing README sections

Output a prioritized list with effort estimates (S/M/L) and impact ratings (1-5).
```

#### /sync-context Command (Multi-Source Context Dump)

File: `~/.claude/commands/sync-context.md`
```markdown
# Context Synchronization

Gather context from the last 7 days across all sources:

## Slack (via MCP)
- Fetch messages from: #engineering, #bugs, #deployments
- Summarize key discussions and decisions

## GitHub
- List merged PRs with summaries
- List open PRs needing review
- Summarize recent issues

## Asana/Linear (via MCP)
- Current sprint tasks
- Blocked items
- Upcoming deadlines

## Google Drive (via MCP)
- Recently modified docs in project folder
- Meeting notes from last week

Create a unified summary organized by:
1. Decisions made
2. Work completed
3. Work in progress
4. Blockers
5. Upcoming deadlines
```

#### /dbt-model Command (Analytics)

File: `~/.claude/commands/dbt-model.md`
```markdown
# dbt Model Generator

Based on the provided requirements, generate a dbt model that:

1. Follows our naming conventions (stg_, int_, fct_, dim_)
2. Includes proper documentation (description, column descriptions)
3. Adds appropriate tests (unique, not_null, relationships)
4. Uses incremental materialization where appropriate
5. Includes the standard meta fields (created_at, updated_at)

After generating, also:
- Create a PR description
- Write test cases
- Suggest downstream impacts
```

### Installing Slash Commands

```bash
# Create commands directory
mkdir -p ~/.claude/commands

# Add your commands
vim ~/.claude/commands/techdebt.md
vim ~/.claude/commands/sync-context.md

# Verify they're loaded
claude
/help  # Should list custom commands
```

### Sharing Commands Across Team

```bash
# In your repo
mkdir -p .claude/commands

# Team commands
.claude/commands/
├── review.md
├── techdebt.md
├── deploy-checklist.md
└── incident-response.md
```

---

## 5. Bug In, Bug Squashed, Zero Friction

**Enable Slack MCP. Paste bug thread. Type "fix." Done.**

### Setting Up Slack MCP

```json
// ~/.config/claude/mcp.json
{
  "mcpServers": {
    "slack": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-slack"],
      "env": {
        "SLACK_BOT_TOKEN": "xoxb-your-token",
        "SLACK_TEAM_ID": "T01234567"
      }
    }
  }
}
```

### The Bug-Fix Workflow

```
[Paste Slack thread URL or content]

Fix this bug.
- Find the root cause
- Implement the fix
- Write a test that would have caught it
- Create a PR
```

### CI Test Failures

```
These CI tests are failing:

[Paste CI output]

Go fix them. Run the tests locally to verify before committing.
```

### Docker Logs Debugging

```
Here are the Docker logs from our distributed system:

[Paste logs]

Identify the root cause and fix it. Consider:
- Service dependencies
- Timing issues
- Network failures
- Resource constraints
```

### Zero-Friction Bug Commands

```bash
# Alias for quick bug fixing
alias bugfix='claude -p "Fix this bug and create a PR:"'

# Usage
bugfix "Users can't log in after password reset"
```

---

## 6. Stop Prompting Like a Polite Intern

**Vague prompts produce vague results. Specific prompts produce weapons.**

### Weak vs. Strong Prompts

| Weak Prompt | Strong Prompt |
|-------------|---------------|
| "Can you help me with this code?" | "Refactor this function to handle edge cases X, Y, Z and reduce complexity from O(n²) to O(n)" |
| "Review my changes" | "Grill me on these changes. Find security vulnerabilities, performance issues, and edge cases. Don't approve until I've addressed each concern." |
| "Fix this bug" | "Fix this bug. Prove it's fixed by showing before/after behavior. Write a regression test." |
| "Make it better" | "This solution works but is inelegant. Scrap it. Implement using [pattern] with [constraints]." |

### Power Prompts Collection

#### The Grill
```
Grill me on these changes and don't make a PR until I pass your test.
Ask me questions about edge cases, error handling, and performance.
I need to defend every decision.
```

#### The Proof
```
Prove this works. Diff the behavior between main and this branch.
Show me exactly what changed and why it's correct.
```

#### The Scrap
```
Scrap this. The current implementation is a hack.
Implement the elegant solution using [specific pattern/approach].
I don't care if it takes longer - do it right.
```

#### The Challenge
```
I think [assumption]. Prove me wrong or confirm with evidence from the codebase.
Don't just agree with me - actually investigate.
```

#### The Expert
```
You are a [domain] expert. I'm a junior developer.
Explain what's wrong with this approach and what a senior engineer would do instead.
Be specific and critical.
```

### Prompt Specificity Framework

```
[CONTEXT] What is the situation?
[CONSTRAINT] What are the hard requirements?
[CRITERIA] How will success be measured?
[COMMAND] What specific action to take?
```

Example:
```
[CONTEXT] Our API is returning 500 errors under load
[CONSTRAINT] Can't change the database schema, must maintain backward compatibility
[CRITERIA] P99 latency under 200ms at 1000 RPS
[COMMAND] Profile the endpoint, identify the bottleneck, and implement a fix with load test results
```

---

## 7. Your Terminal is Either a Cockpit or a Coffin

**Optimize your terminal for maximum Claude Code productivity.**

### Recommended Terminal: Ghostty

```bash
# Install Ghostty (macOS)
brew install --cask ghostty
```

Ghostty config (`~/.config/ghostty/config`):
```
font-family = "JetBrains Mono"
font-size = 14
theme = "catppuccin-mocha"
window-padding-x = 10
window-padding-y = 10
cursor-style = block
shell-integration = zsh
```

### Status Line Configuration

```
/statusline
```

Shows:
- Current context usage (tokens)
- Git branch
- Active model
- Session duration

### Terminal Organization

```bash
# ~/.tmux.conf
# Status bar with git branch and time
set -g status-right '#(cd #{pane_current_path}; git branch --show-current) | %H:%M'

# Color-coded windows
set -g window-status-format '#[fg=gray]#I:#W'
set -g window-status-current-format '#[fg=cyan,bold]#I:#W'

# Quick window switching
bind -n M-1 select-window -t 1
bind -n M-2 select-window -t 2
bind -n M-3 select-window -t 3
bind -n M-4 select-window -t 4
```

### Tab/Window Naming Convention

```
Tab 1: [main]      - Main development
Tab 2: [test]      - Test runner (watch mode)
Tab 3: [claude-a]  - Claude session A
Tab 4: [claude-b]  - Claude session B
Tab 5: [logs]      - Docker/server logs
Tab 6: [db]        - Database CLI
```

### Voice Dictation (macOS)

**You speak 3x faster than you type.**

1. Enable: System Preferences → Keyboard → Dictation
2. Shortcut: Press `fn` twice
3. Usage: Dictate your prompts, then refine

Pro tip: Dictated prompts are often more natural and detailed than typed ones.

```bash
# Verify dictation is enabled
defaults read com.apple.HIToolbox AppleDictationAutoEnable
```

### Terminal Aliases for Claude

```bash
# ~/.zshrc

# Quick Claude commands
alias c='claude'
alias cr='claude --resume'
alias cp='claude -p'  # With initial prompt

# Context-aware Claude
alias cc='claude --context $(git diff --name-only HEAD~1)'

# Claude with specific model
alias co='claude --model opus'
alias cs='claude --model sonnet'
```

---

## 8. Subagents Are Your Secret Workforce

**Append "use subagents" to throw more compute at any problem.**

### Triggering Subagents

```
Refactor this module for better performance. Use subagents for parallel analysis.
```

Or:
```
Analyze this codebase for security vulnerabilities.
Spawn subagents to check:
- SQL injection
- XSS
- Authentication flaws
- Dependency vulnerabilities
```

### Subagent Use Cases

| Task | Subagent Strategy |
|------|-------------------|
| Large refactor | One subagent per file/module |
| Code review | Subagents for security, performance, style |
| Migration | Subagent per component to migrate |
| Testing | Subagent per test suite |
| Documentation | Subagent per section |

### Keeping Main Context Clean

```
I need to analyze these 10 files for technical debt.
Spawn a subagent for each file.
Return only the summary - don't pollute my context with the full analysis.
```

### Auto-Approval Hook for Safe Operations

Create `~/.claude/hooks/auto-approve.sh`:
```bash
#!/bin/bash
# Auto-approve safe operations

OPERATION="$1"
TARGET="$2"

# Safe read operations
if [[ "$OPERATION" == "read" ]]; then
  exit 0
fi

# Safe write operations to specific directories
if [[ "$OPERATION" == "write" && "$TARGET" =~ ^(src|tests|docs)/ ]]; then
  exit 0
fi

# Require approval for everything else
exit 1
```

Configure in `~/.claude/config.json`:
```json
{
  "hooks": {
    "permission": "~/.claude/hooks/auto-approve.sh"
  }
}
```

### Subagent Patterns

#### Fan-Out Analysis
```
Analyze this codebase. Use subagents to:
1. Map all API endpoints
2. Identify dead code
3. Find circular dependencies
4. Check for security issues
5. Measure test coverage

Synthesize findings into a single report.
```

#### Parallel Implementation
```
Implement these 5 features in parallel using subagents:
1. User profile page
2. Settings modal
3. Notification system
4. Search functionality
5. Export feature

Coordinate to ensure consistent patterns across all implementations.
```

---

## 9. Never Write SQL Again

**Point Claude at the CLI. Let it handle the queries.**

### BigQuery Setup

```json
// ~/.config/claude/mcp.json
{
  "mcpServers": {
    "bigquery": {
      "command": "bq",
      "env": {
        "GOOGLE_APPLICATION_CREDENTIALS": "~/.config/gcloud/application_default_credentials.json"
      }
    }
  }
}
```

### BigQuery Skill File

Create `~/.claude/skills/bigquery.md`:
```markdown
# BigQuery Analysis Skill

You have access to our BigQuery data warehouse via the `bq` CLI.

## Available Datasets
- `analytics.events` - User events (page_view, click, purchase)
- `analytics.users` - User profiles
- `analytics.sessions` - Session data
- `warehouse.orders` - Order data
- `warehouse.products` - Product catalog

## Common Patterns

### Query Execution
```bash
bq query --use_legacy_sql=false '
SELECT ...
FROM ...
'
```

### Export to CSV
```bash
bq query --format=csv --use_legacy_sql=false '...' > output.csv
```

## Useful Queries

### Daily Active Users
```sql
SELECT DATE(timestamp) as date, COUNT(DISTINCT user_id) as dau
FROM analytics.events
WHERE timestamp >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 30 DAY)
GROUP BY 1
ORDER BY 1
```

### Funnel Analysis Template
```sql
WITH funnel AS (
  SELECT user_id,
    MAX(CASE WHEN event = 'step1' THEN 1 ELSE 0 END) as step1,
    MAX(CASE WHEN event = 'step2' THEN 1 ELSE 0 END) as step2,
    MAX(CASE WHEN event = 'step3' THEN 1 ELSE 0 END) as step3
  FROM analytics.events
  GROUP BY 1
)
SELECT
  SUM(step1) as step1_users,
  SUM(step2) as step2_users,
  SUM(step3) as step3_users
FROM funnel
```
```

### Usage

```
What's our conversion rate from signup to first purchase this month?
Use the bigquery skill.
```

```
Find users who churned last week but were previously highly engaged.
Query BigQuery and export to CSV.
```

### Other Database CLIs

#### PostgreSQL
```bash
# In your prompt
Query the production database to find orders with status 'pending' older than 24 hours.
Use: psql -h $DB_HOST -U $DB_USER -d $DB_NAME -c "..."
```

#### MongoDB
```bash
# Skill file for MongoDB
You have access to MongoDB via mongosh CLI.
Connection: mongosh "mongodb://localhost:27017/mydb"
```

#### Redis
```bash
# Skill file for Redis
You have access to Redis via redis-cli.
Check cache hit rates, analyze key patterns, monitor memory.
```

---

## 10. Turn Claude Into Your Personal Tutor

**Learn faster by having Claude teach you.**

### Enable Learning Mode

```
/config
```

Set output style to "Explanatory" or "Educational"

### Visual HTML Presentations

```
Generate an interactive HTML presentation explaining how our authentication flow works.
Include:
- Diagrams (use SVG)
- Step-by-step walkthrough
- Code examples with syntax highlighting
- Quiz questions to test understanding
```

### ASCII Architecture Diagrams

```
Create an ASCII diagram showing:
1. Our microservices architecture
2. How requests flow through the system
3. Where caching happens
4. Database connections

Make it detailed enough to print and pin on the wall.
```

Example output:
```
┌─────────────────────────────────────────────────────────────┐
│                        LOAD BALANCER                         │
│                         (nginx)                              │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│   API Gateway │    │   API Gateway │    │   API Gateway │
│   (node.js)   │    │   (node.js)   │    │   (node.js)   │
└───────┬───────┘    └───────┬───────┘    └───────┬───────┘
        │                    │                    │
        └─────────┬──────────┴──────────┬─────────┘
                  │                     │
         ┌────────▼────────┐   ┌────────▼────────┐
         │  Redis Cache    │   │  Service Mesh   │
         │  (sessions)     │   │  (istio)        │
         └────────┬────────┘   └────────┬────────┘
                  │                     │
    ┌─────────────┴─────────────────────┴─────────────┐
    │                                                  │
┌───▼───┐  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐
│ Auth  │  │ Users │  │Orders │  │Search │  │ Email │
│Service│  │Service│  │Service│  │Service│  │Service│
└───┬───┘  └───┬───┘  └───┬───┘  └───┬───┘  └───┬───┘
    │          │          │          │          │
    ▼          ▼          ▼          ▼          ▼
┌──────┐  ┌──────┐   ┌──────┐   ┌──────┐   ┌──────┐
│Postgres│ │Postgres│ │Postgres│ │Elastic│  │ SQS  │
└──────┘  └──────┘   └──────┘   └──────┘   └──────┘
```

### Spaced Repetition Learning

```
I want to learn [topic]. Create a spaced repetition system:

1. I'll explain what I understand
2. You identify gaps and misconceptions
3. You provide corrections and additional context
4. Generate flashcard-style Q&A pairs
5. Save to /docs/learning/[topic].md

Start now. Quiz me on [topic].
```

### Code Explanation Requests

```
Explain this code like I'm:
- [ ] A junior developer (detailed, step-by-step)
- [ ] A senior developer (focus on architecture decisions)
- [ ] A non-technical stakeholder (business impact)

[paste code]
```

### Protocol Deep Dives

```
Explain the OAuth 2.0 PKCE flow with:
1. ASCII sequence diagram
2. Each step explained
3. Security considerations
4. Common implementation mistakes
5. Code example in TypeScript
```

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────────────────┐
│                 CLAUDE CODE POWER USER CHEAT SHEET          │
├─────────────────────────────────────────────────────────────┤
│ PARALLEL SESSIONS                                           │
│   za, zb, zc, zd, ze     Jump between worktrees             │
│   mkwt <name>            Create new worktree + claude       │
│                                                             │
│ PLAN MODE                                                   │
│   /plan                  Enter plan mode                    │
│   "re-plan"              Reset and create new plan          │
│                                                             │
│ SLASH COMMANDS                                              │
│   /techdebt              Hunt for technical debt            │
│   /sync-context          Gather 7-day context dump          │
│   /statusline            Show context usage                 │
│                                                             │
│ POWER PROMPTS                                               │
│   "Grill me..."          Get critical review                │
│   "Prove this works"     Demand evidence                    │
│   "Scrap this..."        Force elegant solution             │
│   "Use subagents"        Parallelize work                   │
│                                                             │
│ DEBUGGING                                                   │
│   Paste Slack + "fix"    Quick bug resolution               │
│   Paste CI + "fix"       Fix failing tests                  │
│   Paste logs + "debug"   Distributed system debugging       │
│                                                             │
│ LEARNING                                                    │
│   "ASCII diagram of..."  Visual architecture                │
│   "HTML presentation..." Interactive learning               │
│   "Quiz me on..."        Spaced repetition                  │
└─────────────────────────────────────────────────────────────┘
```

---

## Setup Checklist

- [ ] Install Ghostty terminal
- [ ] Configure tmux with keybindings
- [ ] Create worktree aliases (za, zb, zc...)
- [ ] Create `~/.claude/commands/` directory
- [ ] Add /techdebt command
- [ ] Add /sync-context command
- [ ] Create project CLAUDE.md
- [ ] Set up Slack MCP
- [ ] Set up BigQuery/database skill
- [ ] Enable voice dictation (fn + fn)
- [ ] Configure auto-approval hooks

---

*Last updated: 2026-02-03*
*Version: 1.0*
