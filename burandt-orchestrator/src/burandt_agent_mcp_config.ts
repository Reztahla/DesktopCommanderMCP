/**
 * Burandt v Aurora Multi-Agent Litigation Swarm MCP Orchestrator
 *
 * Features:
 * - 4-tier agent architecture (Discovery → Research → Litigation → Critique)
 * - Selective tier rollback with dependency mapping
 * - Automatic Craft workspace integration
 * - Obsidian vault synchronization
 * - Tier reset audit logging
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import * as fs from "fs/promises";
import * as path from "path";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

type AgentId =
  | "TIER1"
  | "TIER2A" | "TIER2B" | "TIER2C" | "TIER2D" | "TIER2E"
  | "TIER3A" | "TIER3B" | "TIER3C"
  | "TIER4";

type AgentStatus = "pending" | "running" | "completed" | "rollback";
type CritiqueSeverity = "MINOR" | "MAJOR" | "CRITICAL";

interface AgentOutput {
  agentId: AgentId;
  output: string;
  timestamp: Date;
  selfAssessment?: {
    accuracy: number;
    relevance: number;
    completeness: number;
    strategicValue: number;
  };
  version: number;
}

interface TierResetLog {
  timestamp: Date;
  trigger: string;
  flawIdentified: string;
  severity: CritiqueSeverity;
  affectedComponents: AgentId[];
  preservedComponents: AgentId[];
  enhancedDirective: string;
  outcome?: string;
  confidenceImpact?: { before: number; after: number };
}

interface SwarmState {
  executionId: string;
  projectFolderPath: string;
  status: "initializing" | "running" | "completed" | "rollback_in_progress";
  agentStatuses: Map<AgentId, AgentStatus>;
  agentOutputs: Map<AgentId, AgentOutput>;
  resetLogs: TierResetLog[];
  overallConfidence: number;
  craftPageIds: Map<AgentId, string>;
  obsidianVaultPath: string;
}

// ============================================================================
// AGENT PROMPTS
// ============================================================================

const AGENT_PROMPTS: Record<AgentId, string> = {
  TIER1: `
# TIER 1: DISCOVERY INTAKE AGENT

**Role:** Discovery Document Processor and Initial Fact Mapper

**Your Task:**
1. Ingest all documents from the project folder
2. Create a comprehensive inventory with metadata
3. Identify document relationships and timeline
4. Flag gaps in the evidentiary record
5. Generate initial fact matrix for downstream agents

**Output Format:**
## DISCOVERY INVENTORY
| Doc ID | Title | Date | Type | Key Facts | Related Docs |
|--------|-------|------|------|-----------|--------------|

## TIMELINE
[Chronological fact sequence]

## IDENTIFIED GAPS
[Missing documents or unexplained periods]

## INITIAL FACT MATRIX
[Key facts mapped to supporting evidence]

**Self-Assessment Required:** Rate 1-10 on accuracy, completeness, relevance.
Execute now.
`,

  TIER2A: `
# TIER 2A: WSIB SPECIALIST AGENT

**Role:** Workplace Safety and Insurance Board Legal Researcher

**Discovery Context:** {{TIER1_OUTPUT}}

**Research Focus:**
- WSIB claim procedures and limitation periods
- WSIAT appeal tribunal precedents
- WSIA statutory interpretation (especially s.31(2) tolling)
- Relevant WSIB policy documents

**Output Format:**
## WSIB LEGAL ANALYSIS
### Applicable Statutes
[Citations with relevant sections]

### Key Precedents
[Case summaries with holdings]

### Strategic Recommendations
[Numbered action items]

### Risk Assessment
[Potential vulnerabilities]

**Self-Assessment Required:** Rate 1-10 on accuracy, relevance, completeness, strategic value.
Execute now.
`,

  TIER2B: `
# TIER 2B: HRTO SPECIALIST AGENT

**Role:** Human Rights Tribunal of Ontario Legal Researcher

**Discovery Context:** {{TIER1_OUTPUT}}

**Research Focus:**
- HRTO jurisdiction and procedure
- Human rights discrimination grounds
- Duty to accommodate case law
- Intersection with employment law

**Output Format:**
## HRTO LEGAL ANALYSIS
### Jurisdictional Analysis
[HRTO vs other forums]

### Discrimination Grounds
[Applicable grounds with evidence mapping]

### Key Precedents
[Case summaries with holdings]

### Strategic Recommendations
[Numbered action items]

**Self-Assessment Required:** Rate 1-10 on accuracy, relevance, completeness, strategic value.
Execute now.
`,

  TIER2C: `
# TIER 2C: EMPLOYMENT LAW SPECIALIST AGENT

**Role:** Wrongful Dismissal and Employment Standards Researcher

**Discovery Context:** {{TIER1_OUTPUT}}

**Research Focus:**
- Wrongful dismissal damages (Bardal factors)
- Wallace/Honda damages for bad faith
- Reprisal provisions under ESA
- Mitigation requirements

**Output Format:**
## EMPLOYMENT LAW ANALYSIS
### Termination Analysis
[Just cause vs wrongful dismissal]

### Damages Calculation Framework
[Bardal factors application]

### Key Precedents
[Case summaries with holdings]

### Strategic Recommendations
[Numbered action items]

**Self-Assessment Required:** Rate 1-10 on accuracy, relevance, completeness, strategic value.
Execute now.
`,

  TIER2D: `
# TIER 2D: PROCEDURAL STRATEGY AGENT

**Role:** Limitation Periods, Forum Selection, and Procedural Requirements

**Discovery Context:** {{TIER1_OUTPUT}}

**Research Focus:**
- Limitation periods for all claims (WSIB, HRTO, civil)
- Tolling provisions (CRITICAL: WSIA s.31(2))
- Forum selection strategy
- Procedural filing requirements

**CRITICAL CHECKLIST:**
[ ] WSIB limitation period (6 months from decision)
[ ] WSIA s.31(2) tolling during claim adjudication
[ ] HRTO limitation (1 year from incident)
[ ] Civil limitation (2 years, Limitations Act)
[ ] Concurrent proceeding restrictions

**Output Format:**
## PROCEDURAL STRATEGY
### Limitation Period Analysis
| Claim Type | Base Period | Tolling | Effective Deadline |
|------------|-------------|---------|-------------------|

### Forum Selection Matrix
[Pros/cons of each forum]

### Filing Sequence Recommendation
[Optimal order of proceedings]

**Self-Assessment Required:** Rate 1-10 on accuracy, relevance, completeness, strategic value.
Execute now.
`,

  TIER2E: `
# TIER 2E: DAMAGES QUANTIFICATION AGENT

**Role:** Comprehensive Damages Assessment and Calculation

**Discovery Context:** {{TIER1_OUTPUT}}

**Research Focus:**
- Lost wages and benefits calculation
- General damages for mental distress
- Punitive/aggravated damages precedents
- Future loss of earning capacity

**Output Format:**
## DAMAGES QUANTIFICATION
### Economic Damages
| Category | Calculation | Amount | Supporting Evidence |
|----------|-------------|--------|---------------------|

### Non-Economic Damages
[Mental distress, dignity, etc.]

### Punitive Damages Analysis
[Threshold analysis with precedents]

### Total Damages Range
[Conservative to aggressive estimates]

**Self-Assessment Required:** Rate 1-10 on accuracy, relevance, completeness, strategic value.
Execute now.
`,

  TIER3A: `
# TIER 3A: LITIGATION STRATEGY SYNTHESIZER

**Role:** Senior Associate - Integration and Strategy Development

**Input Context:**
- Discovery: {{TIER1_OUTPUT}}
- WSIB Analysis: {{TIER2A_OUTPUT}}
- HRTO Analysis: {{TIER2B_OUTPUT}}
- Employment Analysis: {{TIER2C_OUTPUT}}
- Procedural Strategy: {{TIER2D_OUTPUT}}
- Damages Assessment: {{TIER2E_OUTPUT}}

**Your Task:**
1. Synthesize all Tier 2 research into cohesive strategy
2. Identify conflicts or gaps between analyses
3. Develop unified litigation roadmap
4. Assign confidence scores to each strategic element

**Output Format:**
## INTEGRATED LITIGATION STRATEGY

### Executive Summary
[1-2 paragraph overview]

### Strategic Pillars
1. [Primary claim strategy]
2. [Secondary/fallback strategy]
3. [Settlement positioning]

### Conflict Resolution
[Where Tier 2 analyses conflicted and how resolved]

### Risk Matrix
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|

### Recommended Timeline
[Week-by-week execution plan]

### Confidence Assessment
[Overall strategy confidence with breakdown]

**Self-Assessment Required:** Rate 1-10 on accuracy, relevance, completeness, strategic value.
Execute now.
`,

  TIER3B: `
# TIER 3B: ADVERSARIAL CRITIQUE AGENT

**Role:** Devil's Advocate - Strategy Stress Testing

**Input:** {{TIER3A_OUTPUT}}
**All Research Context:** {{ALL_TIER2_OUTPUTS}}

**Your Task:**
1. Attack the proposed strategy from opposing counsel's perspective
2. Identify logical flaws, evidentiary gaps, and legal weaknesses
3. Test limitation period calculations rigorously
4. Challenge assumptions and precedent applicability

**Severity Classification:**
- **MINOR:** Fixable within current strategy (typos, clarifications)
- **MAJOR:** Requires Tier 2 re-research (e.g., missed case law, calculation error)
- **CRITICAL:** Requires Tier 1 discovery gap investigation

**Output Format:**
## ADVERSARIAL CRITIQUE REPORT

### Flaws Identified
| ID | Description | Severity | Affected Component |
|----|-------------|----------|-------------------|

### Detailed Analysis
[For each flaw, explain weakness and opposing argument]

### Recommended Corrections
[Specific remediation for each flaw]

### Overall Assessment
[APPROVE / MAJOR REVISION / CRITICAL REVISION]

**If MAJOR or CRITICAL, clearly state which Tier 2 agent(s) need re-execution.**
Execute now.
`,

  TIER3C: `
# TIER 3C: SENIOR PARTNER APPROVAL AGENT

**Role:** Final Quality Gate and Strategic Approval

**Input:**
- Strategy: {{TIER3A_OUTPUT}}
- Critique: {{TIER3B_OUTPUT}}
- Resolution: {{TIER3A_REVISED_OUTPUT}}

**Your Task:**
1. Review strategy and critique resolution
2. Apply senior partner judgment on risk tolerance
3. Approve, modify, or reject strategy
4. Sign off on client communication readiness

**Output Format:**
## SENIOR PARTNER REVIEW

### Strategy Assessment
[High-level evaluation]

### Risk Tolerance Check
[Acceptable vs concerning risks]

### Modifications Required
[Any final adjustments]

### Approval Status
[ ] APPROVED FOR CLIENT PRESENTATION
[ ] REQUIRES REVISION (specify)
[ ] REJECTED (specify reasons)

### Partner Notes
[Strategic commentary for file]

Execute now.
`,

  TIER4: `
# TIER 4: REFLEXION LOOP AGENT

**Role:** Meta-Cognitive Quality Assurance and Self-Improvement

**Input:** {{ALL_OUTPUTS}}

**Reflexion Protocol:**
1. Review entire swarm output chain
2. Identify patterns of error or weakness
3. Generate improvement recommendations
4. Calculate final confidence score

**Stopping Criteria:**
- All dimensions >= 9/10
- Overall confidence >= 95%
- No unresolved critiques

**Output Format:**
## REFLEXION REPORT

### Quality Metrics
| Dimension | Score | Notes |
|-----------|-------|-------|

### Error Patterns Identified
[Systemic issues across agents]

### Improvement Recommendations
[For future iterations]

### Final Confidence Score
[0-100% with breakdown]

### Certification
[ ] READY FOR DELIVERY
[ ] REQUIRES ADDITIONAL ITERATION

Execute now.
`
};

// ============================================================================
// TIER RESET MANAGER
// ============================================================================

class TierResetManager {
  private state: SwarmState;

  constructor(state: SwarmState) {
    this.state = state;
  }

  /**
   * Analyze Agent 3B critique output to determine severity
   */
  analyzeCritiqueSeverity(critiqueOutput: string): CritiqueSeverity {
    const upperCritique = critiqueOutput.toUpperCase();

    if (upperCritique.includes("CRITICAL") ||
        upperCritique.includes("CRITICAL REVISION") ||
        upperCritique.includes("DISCOVERY GAP")) {
      return "CRITICAL";
    }

    if (upperCritique.includes("MAJOR") ||
        upperCritique.includes("MAJOR REVISION") ||
        upperCritique.includes("RE-RESEARCH") ||
        upperCritique.includes("CALCULATION ERROR")) {
      return "MAJOR";
    }

    return "MINOR";
  }

  /**
   * Extract flaw description from critique output
   */
  extractFlawDescription(critiqueOutput: string): string {
    // Look for flaw descriptions in the critique
    const flawMatch = critiqueOutput.match(/Flaws Identified[\s\S]*?(?=###|$)/i);
    if (flawMatch) {
      return flawMatch[0].slice(0, 500);
    }

    // Fallback: extract first substantial paragraph
    const paragraphs = critiqueOutput.split(/\n\n+/);
    for (const p of paragraphs) {
      if (p.length > 50 && !p.startsWith('#')) {
        return p.slice(0, 500);
      }
    }

    return critiqueOutput.slice(0, 500);
  }

  /**
   * Identify which Tier 2 agents are affected by the flaw
   */
  identifyAffectedTier2Agents(flawDescription: string): AgentId[] {
    const affected: AgentId[] = [];
    const lowerFlaw = flawDescription.toLowerCase();

    // WSIB keywords → TIER2A
    if (/wsib|workplace safety|appeals tribunal|wsiat|wsia/gi.test(lowerFlaw)) {
      affected.push("TIER2A");
    }

    // HRTO keywords → TIER2B
    if (/hrto|human rights|discrimination|accommodation/gi.test(lowerFlaw)) {
      affected.push("TIER2B");
    }

    // Employment law keywords → TIER2C
    if (/wrongful dismissal|wallace|honda|keays|reprisal|bardal/gi.test(lowerFlaw)) {
      affected.push("TIER2C");
    }

    // Procedural keywords → TIER2D
    if (/limitation|procedure|forum|jurisdiction|filing deadline|tolling|s\.31/gi.test(lowerFlaw)) {
      affected.push("TIER2D");
    }

    // Damages keywords → TIER2E
    if (/damages|notice period|compensation|quantification/gi.test(lowerFlaw)) {
      affected.push("TIER2E");
    }

    return affected;
  }

  /**
   * Generate enhanced directive for re-execution
   */
  generateEnhancedDirective(flawDescription: string, affectedAgents: AgentId[]): string {
    return `
CRITICAL REFINEMENT REQUIRED:

Agent 3B identified fundamental flaw in your previous analysis:
${flawDescription}

Your Task:
1. Re-research with focus on the specific legal issue flagged
2. Provide THREE alternative approaches using tree-of-thoughts methodology
3. Score each approach 1-10 on: legal soundness, evidentiary support, strategic value
4. Pursue highest-scoring approach with detailed citation
5. Explicitly address why your previous analysis was insufficient

Affected Areas: ${affectedAgents.join(", ")}

Enhanced Self-Refine: Iterate until confidence >= 9/10 on all dimensions.
`.trim();
  }

  /**
   * Execute selective rollback
   */
  async executeRollback(
    critiqueOutput: string
  ): Promise<{
    severity: CritiqueSeverity;
    affectedAgents: AgentId[];
    preservedAgents: AgentId[];
    enhancedDirective: string;
    resetLog: TierResetLog;
  }> {
    const severity = this.analyzeCritiqueSeverity(critiqueOutput);
    const flawDescription = this.extractFlawDescription(critiqueOutput);

    let affectedAgents: AgentId[] = [];
    let preservedAgents: AgentId[] = [];

    if (severity === "MINOR") {
      // No rollback needed
      affectedAgents = [];
      preservedAgents = ["TIER2A", "TIER2B", "TIER2C", "TIER2D", "TIER2E"];
    } else if (severity === "MAJOR") {
      affectedAgents = this.identifyAffectedTier2Agents(flawDescription);
      // Always include TIER3A in affected for MAJOR
      affectedAgents.push("TIER3A");

      const allTier2: AgentId[] = ["TIER2A", "TIER2B", "TIER2C", "TIER2D", "TIER2E"];
      preservedAgents = allTier2.filter(a => !affectedAgents.includes(a));
    } else {
      // CRITICAL - also affects TIER1
      affectedAgents = ["TIER1", ...this.identifyAffectedTier2Agents(flawDescription), "TIER3A"];
      preservedAgents = [];
    }

    const enhancedDirective = this.generateEnhancedDirective(flawDescription, affectedAgents);

    // Clear affected agent outputs
    for (const agentId of affectedAgents) {
      this.state.agentOutputs.delete(agentId);
      this.state.agentStatuses.set(agentId, "rollback");
    }

    // Create reset log
    const resetLog: TierResetLog = {
      timestamp: new Date(),
      trigger: "Agent 3B adversarial review",
      flawIdentified: flawDescription,
      severity,
      affectedComponents: affectedAgents,
      preservedComponents: preservedAgents,
      enhancedDirective,
      confidenceImpact: {
        before: this.state.overallConfidence,
        after: Math.max(0, this.state.overallConfidence - 10) // Temporary reduction
      }
    };

    this.state.resetLogs.push(resetLog);
    this.state.overallConfidence = resetLog.confidenceImpact.after;

    return {
      severity,
      affectedAgents,
      preservedAgents,
      enhancedDirective,
      resetLog
    };
  }

  /**
   * Format reset log for Obsidian
   */
  formatResetLogMarkdown(log: TierResetLog): string {
    return `
## TIER RESET LOG
**Timestamp:** ${log.timestamp.toISOString()}
**Trigger:** ${log.trigger}
**Flaw Identified:** ${log.flawIdentified}
**Severity:** ${log.severity}
**Affected Components:**
${log.affectedComponents.map(c => `  - ${c} → RE-EXECUTED`).join('\n')}
**Preserved Components:**
${log.preservedComponents.map(c => `  - ${c} → RETAINED`).join('\n')}
**Enhanced Directive:**
\`\`\`
${log.enhancedDirective}
\`\`\`
**Confidence Impact:** ${log.confidenceImpact?.before}% → ${log.confidenceImpact?.after}%

---
`;
  }
}

// ============================================================================
// BURANDT AGENT ORCHESTRATOR
// ============================================================================

class BurandtAgentOrchestrator {
  private server: Server;
  private state: SwarmState | null = null;
  private tierResetManager: TierResetManager | null = null;

  // Obsidian vault paths
  private vaultPaths: Record<string, string> = {
    tier1: "01_Discovery_Inventory.md",
    tier2a: "02A_WSIB_Memo.md",
    tier2b: "02B_HRTO_Memo.md",
    tier2c: "02C_Employment_Precedents.md",
    tier2d: "02D_Procedural_Strategy.md",
    tier2e: "02E_Damages_Quantification.md",
    tier3a: "03_Integrated_Litigation_Strategy.md",
    tier3b: "03B_Adversarial_Critique.md",
    tier3c: "03C_Senior_Partner_Review.md",
    tier4: "04_Quality_Assurance_Report.md",
    resetLogs: "TIER_RESET_LOGS.md"
  };

  constructor() {
    this.server = new Server(
      { name: "burandt-orchestrator", version: "1.0.0" },
      {
        capabilities: {
          tools: {},
          resources: {},
          prompts: {},
          logging: {}
        }
      }
    );

    this.setupHandlers();
  }

  private setupHandlers(): void {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: "initialize_swarm",
            description: "Initialize the Burandt v Aurora litigation swarm with Craft/Obsidian workspace",
            inputSchema: {
              type: "object",
              properties: {
                project_folder_path: {
                  type: "string",
                  description: "Path to folder containing case documents"
                },
                obsidian_vault_path: {
                  type: "string",
                  description: "Path to Obsidian vault (optional, defaults to ~/Documents/Obsidian/Burandt_v_Aurora)"
                }
              },
              required: ["project_folder_path"]
            }
          },
          {
            name: "execute_agent",
            description: "Execute a specific tier agent with context injection",
            inputSchema: {
              type: "object",
              properties: {
                agent_id: {
                  type: "string",
                  enum: ["TIER1", "TIER2A", "TIER2B", "TIER2C", "TIER2D", "TIER2E", "TIER3A", "TIER3B", "TIER3C", "TIER4"],
                  description: "ID of the agent to execute"
                },
                enhanced_directive: {
                  type: "string",
                  description: "Optional enhanced directive for re-execution after rollback"
                }
              },
              required: ["agent_id"]
            }
          },
          {
            name: "process_tier3b_critique",
            description: "Analyze Agent 3B critique and execute selective rollback if needed",
            inputSchema: {
              type: "object",
              properties: {},
              required: []
            }
          },
          {
            name: "get_swarm_status",
            description: "Get real-time status of swarm execution",
            inputSchema: {
              type: "object",
              properties: {},
              required: []
            }
          }
        ]
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      switch (name) {
        case "initialize_swarm":
          return this.handleInitializeSwarm(args as { project_folder_path: string; obsidian_vault_path?: string });

        case "execute_agent":
          return this.handleExecuteAgent(args as { agent_id: string; enhanced_directive?: string });

        case "process_tier3b_critique":
          return this.handleProcessTier3BCritique();

        case "get_swarm_status":
          return this.handleGetSwarmStatus();

        default:
          return {
            content: [{ type: "text", text: `Unknown tool: ${name}` }],
            isError: true
          };
      }
    });
  }

  private async handleInitializeSwarm(args: {
    project_folder_path: string;
    obsidian_vault_path?: string
  }): Promise<{ content: Array<{ type: string; text: string }> }> {
    const obsidianPath = args.obsidian_vault_path ||
      path.join(process.env.HOME || "~", "Documents", "Obsidian", "Burandt_v_Aurora");

    // Initialize state
    this.state = {
      executionId: `EXEC_${Date.now()}`,
      projectFolderPath: args.project_folder_path,
      status: "initializing",
      agentStatuses: new Map(),
      agentOutputs: new Map(),
      resetLogs: [],
      overallConfidence: 0,
      craftPageIds: new Map(),
      obsidianVaultPath: obsidianPath
    };

    // Initialize all agent statuses to pending
    const allAgents: AgentId[] = [
      "TIER1", "TIER2A", "TIER2B", "TIER2C", "TIER2D", "TIER2E",
      "TIER3A", "TIER3B", "TIER3C", "TIER4"
    ];
    for (const agent of allAgents) {
      this.state.agentStatuses.set(agent, "pending");
    }

    this.tierResetManager = new TierResetManager(this.state);

    // Create Obsidian vault structure
    try {
      await fs.mkdir(obsidianPath, { recursive: true });

      for (const [key, filename] of Object.entries(this.vaultPaths)) {
        const filePath = path.join(obsidianPath, filename);
        try {
          await fs.access(filePath);
        } catch {
          // File doesn't exist, create it
          await fs.writeFile(filePath, `# ${filename.replace('.md', '').replace(/_/g, ' ')}\n\n*Awaiting agent execution...*\n`);
        }
      }
    } catch (error) {
      // Non-fatal: vault creation failed
      console.error("Failed to create Obsidian vault:", error);
    }

    this.state.status = "running";

    return {
      content: [{
        type: "text",
        text: JSON.stringify({
          success: true,
          executionId: this.state.executionId,
          projectFolder: args.project_folder_path,
          obsidianVault: obsidianPath,
          status: "initialized",
          message: "Swarm initialized. Execute agents in sequence: TIER1 → TIER2(A-E) → TIER3(A-C) → TIER4"
        }, null, 2)
      }]
    };
  }

  private async handleExecuteAgent(args: {
    agent_id: string;
    enhanced_directive?: string
  }): Promise<{ content: Array<{ type: string; text: string }> }> {
    if (!this.state) {
      return {
        content: [{
          type: "text",
          text: JSON.stringify({ error: "Swarm not initialized. Call initialize_swarm first." })
        }],
      };
    }

    const agentId = args.agent_id as AgentId;

    // Get base prompt
    let prompt = AGENT_PROMPTS[agentId];
    if (!prompt) {
      return {
        content: [{
          type: "text",
          text: JSON.stringify({ error: `Unknown agent: ${agentId}` })
        }],
      };
    }

    // Inject context from previous tiers
    prompt = this.injectTierContext(prompt, agentId);

    // Add enhanced directive if provided (for rollback scenarios)
    if (args.enhanced_directive) {
      prompt = `${args.enhanced_directive}\n\n---\n\n${prompt}`;
    }

    // Update status
    this.state.agentStatuses.set(agentId, "running");

    return {
      content: [{
        type: "text",
        text: JSON.stringify({
          agentId,
          status: "ready_for_execution",
          prompt,
          instruction: "Execute this prompt and return the output. Then call execute_agent_complete with the result."
        }, null, 2)
      }]
    };
  }

  private injectTierContext(prompt: string, agentId: AgentId): string {
    // Replace placeholders with actual outputs
    const replacements: Record<string, AgentId> = {
      "{{TIER1_OUTPUT}}": "TIER1",
      "{{TIER2A_OUTPUT}}": "TIER2A",
      "{{TIER2B_OUTPUT}}": "TIER2B",
      "{{TIER2C_OUTPUT}}": "TIER2C",
      "{{TIER2D_OUTPUT}}": "TIER2D",
      "{{TIER2E_OUTPUT}}": "TIER2E",
      "{{TIER3A_OUTPUT}}": "TIER3A",
      "{{TIER3B_OUTPUT}}": "TIER3B",
      "{{TIER3A_REVISED_OUTPUT}}": "TIER3A",
    };

    for (const [placeholder, sourceAgent] of Object.entries(replacements)) {
      if (prompt.includes(placeholder)) {
        const output = this.state?.agentOutputs.get(sourceAgent);
        prompt = prompt.replace(
          placeholder,
          output?.output || `[${sourceAgent} output not yet available]`
        );
      }
    }

    // Handle special placeholders
    if (prompt.includes("{{ALL_TIER2_OUTPUTS}}")) {
      const tier2Outputs = ["TIER2A", "TIER2B", "TIER2C", "TIER2D", "TIER2E"]
        .map(id => {
          const output = this.state?.agentOutputs.get(id as AgentId);
          return output ? `## ${id}\n${output.output}` : "";
        })
        .filter(Boolean)
        .join("\n\n");
      prompt = prompt.replace("{{ALL_TIER2_OUTPUTS}}", tier2Outputs);
    }

    if (prompt.includes("{{ALL_OUTPUTS}}")) {
      const allOutputs = Array.from(this.state?.agentOutputs.entries() || [])
        .map(([id, output]) => `## ${id}\n${output.output}`)
        .join("\n\n");
      prompt = prompt.replace("{{ALL_OUTPUTS}}", allOutputs);
    }

    return prompt;
  }

  private async handleProcessTier3BCritique(): Promise<{ content: Array<{ type: string; text: string }> }> {
    if (!this.state || !this.tierResetManager) {
      return {
        content: [{
          type: "text",
          text: JSON.stringify({ error: "Swarm not initialized." })
        }],
      };
    }

    const tier3bOutput = this.state.agentOutputs.get("TIER3B");
    if (!tier3bOutput) {
      return {
        content: [{
          type: "text",
          text: JSON.stringify({ error: "TIER3B has not been executed yet." })
        }],
      };
    }

    const result = await this.tierResetManager.executeRollback(tier3bOutput.output);

    // Write reset log to Obsidian
    try {
      const logPath = path.join(this.state.obsidianVaultPath, this.vaultPaths.resetLogs);
      const logContent = this.tierResetManager.formatResetLogMarkdown(result.resetLog);
      await fs.appendFile(logPath, logContent);
    } catch (error) {
      console.error("Failed to write reset log:", error);
    }

    if (result.severity === "MINOR") {
      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            action: "NO_ROLLBACK_NEEDED",
            severity: result.severity,
            message: "Minor issues identified. TIER3A can refine strategy without re-research.",
            nextStep: "Continue to TIER3C for approval"
          }, null, 2)
        }]
      };
    }

    this.state.status = "rollback_in_progress";

    return {
      content: [{
        type: "text",
        text: JSON.stringify({
          action: "ROLLBACK_EXECUTED",
          severity: result.severity,
          affectedAgents: result.affectedAgents,
          preservedAgents: result.preservedAgents,
          enhancedDirective: result.enhancedDirective,
          nextStep: `Re-execute affected agents: ${result.affectedAgents.join(", ")}`,
          auditLog: {
            timestamp: result.resetLog.timestamp,
            flaw: result.resetLog.flawIdentified,
            confidenceImpact: result.resetLog.confidenceImpact
          }
        }, null, 2)
      }]
    };
  }

  private async handleGetSwarmStatus(): Promise<{ content: Array<{ type: string; text: string }> }> {
    if (!this.state) {
      return {
        content: [{
          type: "text",
          text: JSON.stringify({ error: "Swarm not initialized." })
        }],
      };
    }

    const completedAgents = Array.from(this.state.agentStatuses.entries())
      .filter(([_, status]) => status === "completed")
      .map(([id]) => id);

    const pendingAgents = Array.from(this.state.agentStatuses.entries())
      .filter(([_, status]) => status === "pending")
      .map(([id]) => id);

    const runningAgents = Array.from(this.state.agentStatuses.entries())
      .filter(([_, status]) => status === "running")
      .map(([id]) => id);

    const rollbackAgents = Array.from(this.state.agentStatuses.entries())
      .filter(([_, status]) => status === "rollback")
      .map(([id]) => id);

    return {
      content: [{
        type: "text",
        text: JSON.stringify({
          executionId: this.state.executionId,
          status: this.state.status,
          completedAgents,
          pendingAgents,
          runningAgents,
          rollbackAgents,
          overallConfidence: this.state.overallConfidence,
          resetLogsCount: this.state.resetLogs.length,
          obsidianVault: this.state.obsidianVaultPath
        }, null, 2)
      }]
    };
  }

  /**
   * Record agent output after execution
   */
  async recordAgentOutput(agentId: AgentId, output: string, selfAssessment?: {
    accuracy: number;
    relevance: number;
    completeness: number;
    strategicValue: number;
  }): Promise<void> {
    if (!this.state) return;

    const existingOutput = this.state.agentOutputs.get(agentId);
    const version = existingOutput ? existingOutput.version + 1 : 1;

    this.state.agentOutputs.set(agentId, {
      agentId,
      output,
      timestamp: new Date(),
      selfAssessment,
      version
    });

    this.state.agentStatuses.set(agentId, "completed");

    // Update confidence based on self-assessment
    if (selfAssessment) {
      const avgScore = (selfAssessment.accuracy + selfAssessment.relevance +
                       selfAssessment.completeness + selfAssessment.strategicValue) / 4;
      this.state.overallConfidence = Math.round(
        (this.state.overallConfidence * 0.8) + (avgScore * 10 * 0.2)
      );
    }

    // Write to Obsidian vault
    try {
      const vaultKey = agentId.toLowerCase().replace("tier", "tier");
      const filename = this.vaultPaths[vaultKey];
      if (filename) {
        const filePath = path.join(this.state.obsidianVaultPath, filename);
        await fs.writeFile(filePath, output);
      }
    } catch (error) {
      console.error(`Failed to write ${agentId} output to Obsidian:`, error);
    }
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Burandt Agent Orchestrator MCP server running on stdio");
  }
}

// ============================================================================
// MAIN
// ============================================================================

const orchestrator = new BurandtAgentOrchestrator();
orchestrator.run().catch(console.error);
