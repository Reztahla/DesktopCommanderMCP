# Burandt v Aurora - Multi-Agent Litigation Swarm MCP Orchestrator

A complete MCP (Model Context Protocol) server implementation for orchestrating a 4-tier multi-agent litigation system with real-time visualization.

## Features

- **4-Tier Agent Architecture**
  - Tier 1: Discovery Intake
  - Tier 2: Specialized Research (WSIB, HRTO, Employment, Procedural, Damages)
  - Tier 3: Strategy Synthesis, Adversarial Critique, Senior Partner Review
  - Tier 4: Reflexion Loop Quality Assurance

- **Selective Tier Rollback Protocol**
  - Automatic flaw severity detection (MINOR/MAJOR/CRITICAL)
  - Keyword-based agent mapping for targeted re-execution
  - Preservation of unaffected agent work
  - Enhanced directive generation for corrections

- **Obsidian Vault Integration**
  - Auto-creates linked markdown documents for each tier
  - Bidirectional cross-references
  - Automatic audit trail logging

- **Remotion Visualization**
  - Real-time animated progress tracking
  - Dependency flow visualization
  - Rollback shake/pulse effects
  - Confidence meter display

## Installation

### Prerequisites

```bash
# Node.js 18+
node -v  # >= 18.0.0

# Install dependencies
cd burandt-orchestrator
npm install
```

### Build MCP Server

```bash
npm run build
```

### Configure Claude Desktop

Add to your Claude Desktop configuration (`~/.config/Claude/claude_desktop_config.json` on Linux/macOS):

```json
{
  "mcpServers": {
    "burandt-orchestrator": {
      "command": "node",
      "args": ["/path/to/burandt-orchestrator/dist/burandt_agent_mcp_config.js"]
    }
  }
}
```

Restart Claude Desktop to load the new MCP server.

## Usage

### Initialize the Swarm

```
initialize_swarm(project_folder_path="/path/to/case/documents")
```

### Execute Agents Sequentially

```
execute_agent(agent_id="TIER1")
execute_agent(agent_id="TIER2A")
execute_agent(agent_id="TIER2B")
execute_agent(agent_id="TIER2C")
execute_agent(agent_id="TIER2D")
execute_agent(agent_id="TIER2E")
execute_agent(agent_id="TIER3A")
execute_agent(agent_id="TIER3B")
```

### Handle Rollback (if Agent 3B detects flaw)

```
process_tier3b_critique()
# System automatically identifies affected agents and generates enhanced directive

execute_agent(agent_id="TIER2D", enhanced_directive="[auto-generated]")
execute_agent(agent_id="TIER3A")
```

### Continue to Completion

```
execute_agent(agent_id="TIER3B")
execute_agent(agent_id="TIER3C")
execute_agent(agent_id="TIER4")
```

### Check Status

```
get_swarm_status()
```

## MCP Tools

| Tool | Description |
|------|-------------|
| `initialize_swarm` | Initialize workspace with Obsidian vault |
| `execute_agent` | Execute a specific tier agent with context injection |
| `process_tier3b_critique` | Analyze critique and execute selective rollback |
| `get_swarm_status` | Get real-time swarm execution status |

## Remotion Visualization

### Preview

```bash
npm run remotion:preview
```

### Render MP4

```bash
npm run remotion:render
```

### Render GIF

```bash
npm run remotion:gif
```

## Project Structure

```
burandt-orchestrator/
├── src/
│   ├── burandt_agent_mcp_config.ts    # MCP server implementation
│   └── agent_swarm_remotion_animation.tsx  # Visualization component
├── obsidian-vault-template/           # Template markdown files
│   ├── 01_Discovery_Inventory.md
│   ├── 02A_WSIB_Memo.md
│   ├── 02B_HRTO_Memo.md
│   ├── 02C_Employment_Precedents.md
│   ├── 02D_Procedural_Strategy.md
│   ├── 02E_Damages_Quantification.md
│   ├── 03_Integrated_Litigation_Strategy.md
│   ├── 03B_Adversarial_Critique.md
│   ├── 03C_Senior_Partner_Review.md
│   ├── 04_Quality_Assurance_Report.md
│   └── TIER_RESET_LOGS.md
├── package.json
├── tsconfig.json
├── remotion.config.ts
└── README.md
```

## Rollback Severity Classification

| Severity | Action | Affected Agents |
|----------|--------|-----------------|
| MINOR | Refine within Tier 3 | None |
| MAJOR | Re-execute affected Tier 2 | Detected via keyword mapping |
| CRITICAL | Re-execute Tier 1 + affected Tier 2 | All downstream |

## Keyword-Based Agent Mapping

| Keywords | Target Agent |
|----------|--------------|
| WSIB, workplace safety, WSIAT | TIER2A |
| HRTO, human rights, discrimination | TIER2B |
| wrongful dismissal, Wallace, Honda | TIER2C |
| limitation, procedure, forum, tolling | TIER2D |
| damages, notice period, compensation | TIER2E |

## License

Proprietary - Burandt v Aurora Litigation Use Only

## Version

1.0.0
