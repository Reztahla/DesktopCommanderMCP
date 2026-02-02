# BURANDT V AURORA - COMPLETE INTEGRATION PACKAGE

## DELIVERABLE SUMMARY

This package contains three fully-integrated components for the Burandt v Aurora multi-agent litigation swarm:

1. **MCP Orchestrator Server** (`burandt_agent_mcp_config.ts`) - TypeScript MCP server with tier reset protocol
1. **Remotion Animation** (`agent_swarm_remotion_animation.tsx`) - Real-time visual progress tracking
1. **Edge Case Solution** - Selective rollback protocol documentation

-----

## 1. MCP ORCHESTRATOR CONFIGURATION

### File Location

`/tmp/burandt_agent_mcp_config.ts`

### Features Implemented

✅ Complete 4-tier agent architecture (Discovery → Research → Litigation → Critique)
✅ Selective tier rollback with dependency mapping
✅ Automatic Craft workspace integration
✅ Obsidian vault synchronization
✅ Tier reset audit logging
✅ Enhanced directive injection for rollback scenarios
✅ Real-time swarm status tracking

### Key Classes

**`TierResetManager`**

- Analyzes Agent 3B critique severity (MINOR/MAJOR/CRITICAL)
- Maps flaws to affected Tier 2 agents via keyword detection
- Preserves unaffected agent work
- Generates enhanced re-execution directives
- Maintains complete audit trail

**`BurandtAgentOrchestrator`**

- MCP server with 4 tool handlers:
  - `initialize_swarm`: Setup Craft/Obsidian workspace
  - `execute_agent`: Run specific tier with context injection
  - `process_tier3b_critique`: Analyze and handle rollbacks
  - `get_swarm_status`: Real-time execution monitoring

### Usage Workflow

```bash
# 1. Install dependencies
npm install @modelcontextprotocol/sdk

# 2. Compile TypeScript
npx tsc burandt_agent_mcp_config.ts

# 3. Add to Claude Desktop config
# ~/.config/Claude/claude_desktop_config.json
{
  "mcpServers": {
    "burandt-orchestrator": {
      "command": "node",
      "args": ["/path/to/burandt_agent_mcp_config.js"]
    }
  }
}

# 4. Restart Claude Desktop

# 5. Initialize in Claude
initialize_swarm(project_folder_path="/path/to/burandt/files")

# 6. Execute agents sequentially
execute_agent(agent_id="TIER1")
execute_agent(agent_id="TIER2A")
# ... continue through all tiers

# 7. Handle rollback if Agent 3B detects flaw
process_tier3b_critique()
# System automatically re-executes affected agents with enhanced directive
```

### Integration Points

**Craft Integration**

- Auto-creates 8 linked pages for each tier output
- Cross-references with `[[page_id]]` syntax
- Adds rollback notifications as page comments
- Stores confidence scores in page metadata

**Obsidian Integration**

- Vault structure: `/Burandt_v_Aurora/`
- 8 markdown files (01_Discovery through 04_QA_Report)
- TIER_RESET_LOGS.md for audit trail
- Bidirectional links to Craft pages via `craft://open?id=...`

-----

## 2. REMOTION VISUALIZATION

### File Location

`/tmp/agent_swarm_remotion_animation.tsx`

### Features Implemented

✅ 4-tier hierarchical node graph with dependency arrows
✅ Real-time status colors (pending/running/completed/rollback)
✅ Animated data flow particles along dependency paths
✅ Self-assessment score displays on completion
✅ Confidence meter with rollback degradation
✅ Tier reset shake/pulse visual effects
✅ Rollback notification overlays
✅ 2-minute (120-second) full execution visualization

### Visual Design

**Color Scheme**

- Pending: Gray (#6B7280)
- Running: Blue (#3B82F6) with pulsing glow
- Completed: Green (#10B981) with score overlays
- Rollback: Red (#EF4444) with shake animation

**Animation Timeline** (30 FPS)

```
00:00-00:02 → Title card
00:02-00:15 → TIER 1 Discovery (13s)
00:16-00:40 → TIER 2 Research (parallel execution, 24s)
00:40-00:88 → TIER 3 Litigation (sequential, 48s)
01:00        → Rollback triggered (TIER 2D limitation error)
01:02-01:15 → TIER 2D re-execution with red alert
01:30-01:50 → TIER 4 Reflexion Loop (20s)
01:50-02:00 → Final confidence = 95%+
```

### Usage Workflow

```bash
# 1. Install Remotion
npm i remotion

# 2. Preview animation
npx remotion preview src/AgentSwarmVisualization.tsx

# 3. Render video
npx remotion render src/AgentSwarmVisualization.tsx \
  AgentSwarmVisualization \
  --codec h264 \
  --output burandt_swarm.mp4

# 4. Generate GIF for Slack/emails
npx remotion render src/AgentSwarmVisualization.tsx \
  AgentSwarmVisualization \
  --codec gif \
  --output burandt_swarm.gif

# 5. Embed in Craft documentation
# Upload to Craft page as attachment or host externally
```

### Real-Time Integration (Optional Enhancement)

To connect live MCP execution to Remotion:

```typescript
// In MCP server, emit events on agent transitions
import { EventEmitter } from 'events';

const swarmEvents = new EventEmitter();

// On agent completion
swarmEvents.emit('agent_completed', {
  agentId: 'tier2a',
  timestamp: Date.now(),
  selfAssessment: { accuracy: 8, relevance: 9 }
});

// In Remotion, consume events via WebSocket
// Update AGENTS array dynamically
```

-----

## 3. EDGE CASE SOLUTION: TIER RESET PROTOCOL

### Problem Statement

When Agent 3B (adversarial critique) identifies a fundamental flaw in Tier 3A's litigation strategy, the system needs to:

- Minimize wasted work
- Execute targeted re-research
- Maintain audit trail
- Update dependent tiers

### Solution Architecture

**Severity Classification**

```
MINOR → Fixable within Tier 3
├─ Agent 3A refines strategy
└─ No Tier 2 re-execution

MAJOR → Requires Tier 2 agent re-research
├─ Identify affected Tier 2 agent(s) via keyword matching
├─ Preserve unaffected agents' work
├─ Re-execute flawed agent(s) with enhanced directive
├─ Agent 3A re-synthesizes using mixed outputs
└─ Restart adversarial loop from Agent 3B

CRITICAL → Requires Tier 1 discovery gaps filled
├─ Tier 1 investigates missing documents/facts
├─ Execute targeted discovery
├─ Affected Tier 2 agents re-execute with new evidence
├─ Full Tier 3 re-synthesis
└─ Tier 4 validation restart
```

**Keyword-Based Agent Mapping**

```typescript
WSIB keywords → TIER2A
- "WSIB", "workplace safety", "appeals tribunal", "WSIAT"

HRTO keywords → TIER2B
- "HRTO", "human rights", "discrimination", "accommodation"

Employment law keywords → TIER2C
- "wrongful dismissal", "Wallace", "Honda", "Keays", "reprisal"

Procedural keywords → TIER2D
- "limitation", "procedure", "forum", "jurisdiction", "filing deadline"

Damages keywords → TIER2E
- "damages", "Bardal", "notice period", "compensation"
```

**Enhanced Directive Template**

```markdown
CRITICAL REFINEMENT REQUIRED:

Agent 3B identified fundamental flaw in your previous analysis:
[Extracted flaw summary - first 500 chars]

Your Task:
1. Re-research with focus on the specific legal issue flagged
2. Provide THREE alternative approaches using tree-of-thoughts methodology
3. Score each approach 1-10 on: legal soundness, evidentiary support, strategic value
4. Pursue highest-scoring approach with detailed citation
5. Explicitly address why your previous analysis was insufficient

Enhanced Self-Refine: Iterate until confidence ≥9/10 on all dimensions.
```

**Audit Trail Format**

```markdown
## TIER RESET LOG
**Timestamp:** 2026-01-30 14:23:15
**Trigger:** Agent 3B adversarial review
**Flaw Identified:** WSIB limitation period miscalculated (missed 6-month SOL extension under WSIA s.31(2))
**Severity:** MAJOR
**Affected Components:**
  - TIER2D (Procedural Strategy) → RE-EXECUTED
  - TIER3A (Synthesis) → RE-EXECUTED
  - TIER3B (Adversarial) → RE-EXECUTED
**Preserved Components:**
  - TIER2A, TIER2B, TIER2C, TIER2E → RETAINED
  - TIER1 Discovery → RETAINED
**Enhanced Directive:**
  "CRITICAL CORRECTION: Previous limitation calculation failed to account
   for Workplace Safety and Insurance Act s.31(2) tolling provisions.
   Re-analyze with three-path voting CoT, citing WSIB Tribunal precedents."
**Outcome:** Updated strategy v2.1 with corrected filing deadlines
**Confidence Impact:** 87% → 94%
```

### Implementation in MCP Server

The `TierResetManager` class handles this automatically:

1. **Detection**: Regex parsing of Agent 3B output for severity markers
1. **Analysis**: Keyword extraction to identify affected Tier 2 agents
1. **Preservation**: Unaffected agent outputs remain in `agentOutputs` Map
1. **Directive Generation**: Context-aware enhanced instructions
1. **Execution**: Selective `.delete()` on affected outputs, triggering re-run
1. **Logging**: Append to Obsidian `TIER_RESET_LOGS.md`
1. **Notification**: Craft page comments on affected documents

-----

## INSTALLATION GUIDE

### Prerequisites

```bash
# Node.js & TypeScript
node -v  # ≥18.0.0
npm install -g typescript

# MCP SDK
npm install @modelcontextprotocol/sdk

# Remotion
npm install remotion
```

### Setup Steps

**1. MCP Server**

```bash
# Clone/copy burandt_agent_mcp_config.ts to your project
cd ~/burandt-litigation-mcp
npm init -y
npm install @modelcontextprotocol/sdk

# Compile
npx tsc burandt_agent_mcp_config.ts

# Add to Claude Desktop config
code ~/.config/Claude/claude_desktop_config.json
```

**2. Remotion Animation**

```bash
# Create Remotion project
npm init video burandt-swarm-viz
cd burandt-swarm-viz

# Copy animation component
cp /tmp/agent_swarm_remotion_animation.tsx src/AgentSwarmVisualization.tsx

# Update remotion.config.ts to export component
# Preview
npm start
```

**3. Obsidian Vault**

```bash
# Create vault structure
mkdir -p ~/Documents/Obsidian/Burandt_v_Aurora
cd ~/Documents/Obsidian/Burandt_v_Aurora

# Create placeholder files
touch 01_Discovery_Inventory.md
touch 02A_WSIB_Memo.md
touch 02B_HRTO_Memo.md
touch 02C_Employment_Precedents.md
touch 02D_Procedural_Strategy.md
touch 02E_Damages_Quantification.md
touch 03_Integrated_Litigation_Strategy.md
touch 04_Quality_Assurance_Report.md
touch TIER_RESET_LOGS.md
```

**4. Craft Workspace**

- Open Craft app
- Create new space: "Burandt v Aurora Litigation"
- Allow MCP server to auto-create pages on first `initialize_swarm` call

-----

## EXECUTION EXAMPLE

### Full Swarm Run with Rollback

```typescript
// In Claude with MCP server enabled

// Initialize
initialize_swarm({
  project_folder_path: "/Users/t/Documents/Burandt_v_Aurora/Evidence"
})

// TIER 1
execute_agent({ agent_id: "TIER1" })
// Output saved to Craft + Obsidian
// Discovery inventory completed: 23 documents, 3 gaps identified

// TIER 2 (parallel)
execute_agent({ agent_id: "TIER2A" })
execute_agent({ agent_id: "TIER2B" })
execute_agent({ agent_id: "TIER2C" })
execute_agent({ agent_id: "TIER2D" })  // ← This has the flaw!
execute_agent({ agent_id: "TIER2E" })

// TIER 3A - Synthesis
execute_agent({ agent_id: "TIER3A" })
// Integrated all 5 research memos
// Proposed strategy: File WSIB appeal + concurrent HRTO application

// TIER 3B - Adversarial Critique
execute_agent({ agent_id: "TIER3B" })
// Output: "MAJOR: TIER 2D miscalculated WSIB limitation period.
//          Failed to account for s.31(2) tolling during claim adjudication.
//          This creates procedural vulnerability."

// Process critique (automatic rollback)
process_tier3b_critique()
// System response:
// {
//   "action": "ROLLBACK_EXECUTED",
//   "severity": "MAJOR",
//   "affectedAgents": ["TIER2D"],
//   "preservedAgents": ["TIER2A", "TIER2B", "TIER2C", "TIER2E"],
//   "nextStep": "Re-execute TIER2D with enhanced directive"
// }

// Re-execute TIER 2D with enhanced directive
execute_agent({
  agent_id: "TIER2D",
  enhanced_directive: `CRITICAL CORRECTION: Previous limitation calculation
    failed to account for WSIA s.31(2) tolling. Re-analyze with three-path
    voting CoT, citing WSIB Tribunal precedents.`
})
// Updated procedural memo now accounts for tolling

// Re-synthesize TIER 3A with corrected input
execute_agent({ agent_id: "TIER3A" })
// New strategy adjusts filing timeline by 4 months

// Continue TIER 3B → 3C → 4
execute_agent({ agent_id: "TIER3B" })  // No major flaws found
execute_agent({ agent_id: "TIER3C" })  // Senior partner approval
execute_agent({ agent_id: "TIER4" })   // Reflexion loop → 96% confidence

// Check final status
get_swarm_status()
// {
//   "executionId": "EXEC_1738251600000",
//   "status": "COMPLETED",
//   "completedAgents": ["TIER1", "TIER2A", "TIER2B", "TIER2C", "TIER2D", "TIER2E", "TIER3A", "TIER3B", "TIER3C", "TIER4"],
//   "overallConfidence": 96,
//   "resetLogsCount": 1
// }
```

-----

## CUSTOMIZATION GUIDE

### Adding New Research Agents (Tier 2F, 2G, etc.)

**1. Update MCP config:**

```typescript
// Add to AGENT_PROMPTS
TIER2F: `
# TIER 2F: [NEW SPECIALTY] AGENT
**Research Focus:**
- [Topic 1]
- [Topic 2]
**Discovery Context:** {{TIER1_OUTPUT}}
**Execute now.**
`,

// Add to vaultPaths
tier2f: "/Burandt_v_Aurora/02F_[Specialty]_Memo.md",
```

**2. Update Remotion animation:**

```typescript
// Add to AGENTS array
{
  id: 'tier2f',
  tier: 2,
  label: 'New\nSpecialty',
  status: 'pending',
  startFrame: FPS * 16,
  endFrame: FPS * 34,
  selfAssessment: { accuracy: 9, relevance: 9, completeness: 8, strategicValue: 9 },
  dependencies: ['tier1'],
},
```

### Modifying Confidence Thresholds

```typescript
// In TIER4 prompt
**Stopping Criteria:** If all dimensions ≥8 AND overall confidence ≥90%, approve.
// Changed from ≥9 and ≥95%
```

### Custom Flaw Detection Keywords

```typescript
// In TierResetManager.identifyAffectedTier2Agents()
if (/custom_keyword|another_keyword/gi.test(flawDescription)) {
  affected.push("TIER2F");
}
```

-----

## TROUBLESHOOTING

### MCP Server Won't Start

```bash
# Check TypeScript compilation
npx tsc --noEmit burandt_agent_mcp_config.ts

# Verify Claude Desktop config JSON syntax
cat ~/.config/Claude/claude_desktop_config.json | jq .

# Check MCP server logs
tail -f ~/Library/Logs/Claude/mcp*.log
```

### Agent Context Injection Failing

```bash
# Verify agent outputs are being stored
get_swarm_status()  # Check completedAgents array

# Debug placeholder replacement
console.log(this.injectTierContext(prompt, agentId));
```

### Remotion Preview Not Loading

```bash
# Clear cache
rm -rf node_modules/.cache

# Reinstall
npm install

# Check for TypeScript errors
npx tsc --noEmit src/AgentSwarmVisualization.tsx
```

-----

## PERFORMANCE OPTIMIZATION

### Reduce Token Usage

- Limit Tier 1 discovery to top 50 documents
- Use pagination for long research memos (10 pages max)
- Cache frequently used legal precedents

### Speed Up Execution

- Run Tier 2 agents in parallel via Promise.all()
- Pre-compile TypeScript for faster MCP startup
- Use Claude Sonnet 4.5 instead of Opus for non-critical tiers

### Minimize Rollbacks

- Enhance Tier 2D prompt with limitation period checklist
- Add WSIB tolling reminder to system prompt
- Include case-specific constraints in initial brief

-----

## NEXT STEPS

1. **Deploy MCP Server**: Add to Claude Desktop config
1. **Test Rollback**: Manually inject a flaw in Tier 3B output to verify protocol
1. **Render Animation**: Generate MP4 for case presentation to client
1. **Populate Vault**: Copy actual Burandt case files to project folder
1. **Execute Full Swarm**: Run end-to-end with real data

-----

## SUPPORT & DOCUMENTATION

**MCP Protocol**: https://modelcontextprotocol.io/
**Remotion**: https://www.remotion.dev/docs/
**Craft API**: https://www.craft.do/mcp
**Obsidian**: https://obsidian.md/

For Burandt-specific legal research assistance, consult:

- Ontario WSIB Act: https://www.ontario.ca/laws/statute/97w16
- HRTO Rules of Procedure: http://www.sjto.ca/hrto/
- Employment Law Precedents: CanLII Ontario Courts

-----

**Package Version**: 1.0.0
**Last Updated**: 2026-01-30
**License**: Proprietary - Burandt v Aurora Litigation Use Only
