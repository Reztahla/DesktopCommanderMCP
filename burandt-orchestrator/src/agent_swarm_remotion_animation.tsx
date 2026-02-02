/**
 * Burandt v Aurora Agent Swarm Visualization
 *
 * Remotion animation showing real-time progress of the 4-tier litigation agent swarm
 *
 * Features:
 * - 4-tier hierarchical node graph with dependency arrows
 * - Real-time status colors (pending/running/completed/rollback)
 * - Animated data flow particles along dependency paths
 * - Self-assessment score displays on completion
 * - Confidence meter with rollback degradation
 * - Tier reset shake/pulse visual effects
 */

import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  Easing,
} from 'remotion';

// ============================================================================
// CONSTANTS
// ============================================================================

const FPS = 30;
const DURATION_SECONDS = 120;
const TOTAL_FRAMES = FPS * DURATION_SECONDS;

// Colors
const COLORS = {
  pending: '#6B7280',
  running: '#3B82F6',
  completed: '#10B981',
  rollback: '#EF4444',
  background: '#0F172A',
  nodeBackground: '#1E293B',
  text: '#F8FAFC',
  textMuted: '#94A3B8',
  arrow: '#475569',
  particle: '#60A5FA',
  glow: 'rgba(59, 130, 246, 0.4)',
};

// ============================================================================
// TYPES
// ============================================================================

type AgentStatus = 'pending' | 'running' | 'completed' | 'rollback';

interface Agent {
  id: string;
  tier: number;
  label: string;
  status: AgentStatus;
  startFrame: number;
  endFrame: number;
  selfAssessment: {
    accuracy: number;
    relevance: number;
    completeness: number;
    strategicValue: number;
  };
  dependencies: string[];
  x?: number;
  y?: number;
}

// ============================================================================
// AGENT CONFIGURATION
// ============================================================================

const AGENTS: Agent[] = [
  // TIER 1
  {
    id: 'tier1',
    tier: 1,
    label: 'Discovery\nIntake',
    status: 'pending',
    startFrame: FPS * 2,
    endFrame: FPS * 15,
    selfAssessment: { accuracy: 9, relevance: 9, completeness: 8, strategicValue: 8 },
    dependencies: [],
  },
  // TIER 2
  {
    id: 'tier2a',
    tier: 2,
    label: 'WSIB\nSpecialist',
    status: 'pending',
    startFrame: FPS * 16,
    endFrame: FPS * 34,
    selfAssessment: { accuracy: 9, relevance: 9, completeness: 9, strategicValue: 9 },
    dependencies: ['tier1'],
  },
  {
    id: 'tier2b',
    tier: 2,
    label: 'HRTO\nSpecialist',
    status: 'pending',
    startFrame: FPS * 16,
    endFrame: FPS * 32,
    selfAssessment: { accuracy: 8, relevance: 9, completeness: 8, strategicValue: 8 },
    dependencies: ['tier1'],
  },
  {
    id: 'tier2c',
    tier: 2,
    label: 'Employment\nLaw',
    status: 'pending',
    startFrame: FPS * 16,
    endFrame: FPS * 36,
    selfAssessment: { accuracy: 9, relevance: 8, completeness: 9, strategicValue: 9 },
    dependencies: ['tier1'],
  },
  {
    id: 'tier2d',
    tier: 2,
    label: 'Procedural\nStrategy',
    status: 'pending',
    startFrame: FPS * 16,
    endFrame: FPS * 30,
    selfAssessment: { accuracy: 7, relevance: 8, completeness: 6, strategicValue: 7 }, // This one has a flaw!
    dependencies: ['tier1'],
  },
  {
    id: 'tier2e',
    tier: 2,
    label: 'Damages\nQuant.',
    status: 'pending',
    startFrame: FPS * 16,
    endFrame: FPS * 38,
    selfAssessment: { accuracy: 9, relevance: 9, completeness: 9, strategicValue: 8 },
    dependencies: ['tier1'],
  },
  // TIER 3
  {
    id: 'tier3a',
    tier: 3,
    label: 'Strategy\nSynthesizer',
    status: 'pending',
    startFrame: FPS * 40,
    endFrame: FPS * 55,
    selfAssessment: { accuracy: 8, relevance: 9, completeness: 8, strategicValue: 9 },
    dependencies: ['tier2a', 'tier2b', 'tier2c', 'tier2d', 'tier2e'],
  },
  {
    id: 'tier3b',
    tier: 3,
    label: 'Adversarial\nCritique',
    status: 'pending',
    startFrame: FPS * 56,
    endFrame: FPS * 65, // Finds the flaw at frame 60
    selfAssessment: { accuracy: 10, relevance: 10, completeness: 10, strategicValue: 10 },
    dependencies: ['tier3a'],
  },
  {
    id: 'tier3c',
    tier: 3,
    label: 'Senior\nPartner',
    status: 'pending',
    startFrame: FPS * 85, // After rollback resolution
    endFrame: FPS * 95,
    selfAssessment: { accuracy: 9, relevance: 9, completeness: 9, strategicValue: 10 },
    dependencies: ['tier3a', 'tier3b'],
  },
  // TIER 4
  {
    id: 'tier4',
    tier: 4,
    label: 'Reflexion\nLoop',
    status: 'pending',
    startFrame: FPS * 96,
    endFrame: FPS * 115,
    selfAssessment: { accuracy: 10, relevance: 10, completeness: 10, strategicValue: 10 },
    dependencies: ['tier3c'],
  },
];

// Rollback event timing
const ROLLBACK_START_FRAME = FPS * 60;
const ROLLBACK_END_FRAME = FPS * 62;
const TIER2D_REEXEC_START = FPS * 65;
const TIER2D_REEXEC_END = FPS * 75;
const TIER3A_REEXEC_START = FPS * 76;
const TIER3A_REEXEC_END = FPS * 84;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function getAgentPosition(agent: Agent, canvasWidth: number, canvasHeight: number): { x: number; y: number } {
  const tierX: Record<number, number> = {
    1: canvasWidth * 0.15,
    2: canvasWidth * 0.38,
    3: canvasWidth * 0.62,
    4: canvasWidth * 0.85,
  };

  const tier2YOffsets = [-200, -100, 0, 100, 200];
  const tier3YOffsets = [-100, 0, 100];

  let y = canvasHeight / 2;

  if (agent.tier === 2) {
    const index = ['tier2a', 'tier2b', 'tier2c', 'tier2d', 'tier2e'].indexOf(agent.id);
    y = canvasHeight / 2 + tier2YOffsets[index];
  } else if (agent.tier === 3) {
    const index = ['tier3a', 'tier3b', 'tier3c'].indexOf(agent.id);
    y = canvasHeight / 2 + tier3YOffsets[index];
  }

  return { x: tierX[agent.tier], y };
}

function getAgentStatus(agent: Agent, frame: number): AgentStatus {
  // Handle rollback for tier2d
  if (agent.id === 'tier2d') {
    if (frame >= ROLLBACK_START_FRAME && frame < TIER2D_REEXEC_START) {
      return 'rollback';
    }
    if (frame >= TIER2D_REEXEC_START && frame < TIER2D_REEXEC_END) {
      return 'running';
    }
    if (frame >= TIER2D_REEXEC_END) {
      return 'completed';
    }
  }

  // Handle rollback for tier3a (re-synthesis)
  if (agent.id === 'tier3a') {
    if (frame >= ROLLBACK_START_FRAME && frame < TIER3A_REEXEC_START) {
      return 'rollback';
    }
    if (frame >= TIER3A_REEXEC_START && frame < TIER3A_REEXEC_END) {
      return 'running';
    }
    if (frame >= TIER3A_REEXEC_END) {
      return 'completed';
    }
  }

  // Normal status logic
  if (frame < agent.startFrame) return 'pending';
  if (frame < agent.endFrame) return 'running';
  return 'completed';
}

// ============================================================================
// COMPONENTS
// ============================================================================

interface AgentNodeProps {
  agent: Agent;
  x: number;
  y: number;
  status: AgentStatus;
  showScore: boolean;
}

const AgentNode: React.FC<AgentNodeProps> = ({ agent, x, y, status, showScore }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const statusColor = COLORS[status];

  // Pulsing animation for running status
  const pulseScale = status === 'running'
    ? 1 + 0.05 * Math.sin(frame * 0.2)
    : 1;

  // Shake animation for rollback
  const shakeX = status === 'rollback'
    ? 5 * Math.sin(frame * 1.5)
    : 0;

  // Spring animation for completion
  const completionSpring = spring({
    frame: showScore ? frame : 0,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const nodeSize = 80;

  return (
    <div
      style={{
        position: 'absolute',
        left: x - nodeSize / 2 + shakeX,
        top: y - nodeSize / 2,
        width: nodeSize,
        height: nodeSize,
        borderRadius: '50%',
        backgroundColor: COLORS.nodeBackground,
        border: `3px solid ${statusColor}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `scale(${pulseScale})`,
        boxShadow: status === 'running' ? `0 0 20px ${COLORS.glow}` : 'none',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
    >
      <span
        style={{
          color: COLORS.text,
          fontSize: 10,
          fontWeight: 'bold',
          textAlign: 'center',
          lineHeight: 1.2,
          whiteSpace: 'pre-line',
        }}
      >
        {agent.label}
      </span>

      {/* Self-assessment score overlay */}
      {showScore && status === 'completed' && (
        <div
          style={{
            position: 'absolute',
            bottom: -30,
            backgroundColor: COLORS.completed,
            borderRadius: 4,
            padding: '2px 6px',
            fontSize: 10,
            color: COLORS.text,
            opacity: completionSpring,
            transform: `scale(${completionSpring})`,
          }}
        >
          {Math.round(
            (agent.selfAssessment.accuracy +
              agent.selfAssessment.relevance +
              agent.selfAssessment.completeness +
              agent.selfAssessment.strategicValue) / 4
          )}/10
        </div>
      )}
    </div>
  );
};

interface DependencyArrowProps {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  active: boolean;
}

const DependencyArrow: React.FC<DependencyArrowProps> = ({
  fromX,
  fromY,
  toX,
  toY,
  active,
}) => {
  const frame = useCurrentFrame();

  // Calculate arrow path
  const dx = toX - fromX;
  const dy = toY - fromY;
  const length = Math.sqrt(dx * dx + dy * dy);

  // Adjust for node radius
  const nodeRadius = 45;
  const startX = fromX + (dx / length) * nodeRadius;
  const startY = fromY + (dy / length) * nodeRadius;
  const endX = toX - (dx / length) * nodeRadius;
  const endY = toY - (dy / length) * nodeRadius;

  // Particle position along path
  const particleProgress = active ? (frame % 30) / 30 : 0;
  const particleX = startX + (endX - startX) * particleProgress;
  const particleY = startY + (endY - startY) * particleProgress;

  return (
    <>
      {/* Arrow line */}
      <svg
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <line
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          stroke={active ? COLORS.particle : COLORS.arrow}
          strokeWidth={2}
          strokeDasharray={active ? 'none' : '5,5'}
        />
        {/* Arrowhead */}
        <polygon
          points={`${endX},${endY} ${endX - 10},${endY - 5} ${endX - 10},${endY + 5}`}
          fill={active ? COLORS.particle : COLORS.arrow}
          transform={`rotate(${Math.atan2(dy, dx) * (180 / Math.PI)}, ${endX}, ${endY})`}
        />
      </svg>

      {/* Animated particle */}
      {active && (
        <div
          style={{
            position: 'absolute',
            left: particleX - 4,
            top: particleY - 4,
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: COLORS.particle,
            boxShadow: `0 0 10px ${COLORS.particle}`,
          }}
        />
      )}
    </>
  );
};

interface ConfidenceMeterProps {
  confidence: number;
}

const ConfidenceMeter: React.FC<ConfidenceMeterProps> = ({ confidence }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const animatedConfidence = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 50 },
    from: 0,
    to: confidence,
  });

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 40,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 400,
        textAlign: 'center',
      }}
    >
      <div
        style={{
          color: COLORS.text,
          fontSize: 16,
          marginBottom: 8,
          fontWeight: 'bold',
        }}
      >
        Overall Confidence: {Math.round(animatedConfidence)}%
      </div>
      <div
        style={{
          width: '100%',
          height: 20,
          backgroundColor: COLORS.nodeBackground,
          borderRadius: 10,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${animatedConfidence}%`,
            height: '100%',
            backgroundColor:
              animatedConfidence >= 90
                ? COLORS.completed
                : animatedConfidence >= 70
                  ? COLORS.running
                  : COLORS.rollback,
            borderRadius: 10,
            transition: 'background-color 0.3s',
          }}
        />
      </div>
    </div>
  );
};

interface RollbackOverlayProps {
  visible: boolean;
  message: string;
}

const RollbackOverlay: React.FC<RollbackOverlayProps> = ({ visible, message }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = spring({
    frame: visible ? frame : 0,
    fps,
    config: { damping: 15 },
    from: 0,
    to: 1,
  });

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: 60,
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(239, 68, 68, 0.9)',
        padding: '12px 24px',
        borderRadius: 8,
        opacity,
        zIndex: 100,
      }}
    >
      <span
        style={{
          color: COLORS.text,
          fontSize: 14,
          fontWeight: 'bold',
        }}
      >
        ⚠️ {message}
      </span>
    </div>
  );
};

// ============================================================================
// MAIN COMPOSITION
// ============================================================================

export const AgentSwarmVisualization: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  // Calculate positions for all agents
  const agentsWithPositions = AGENTS.map((agent) => ({
    ...agent,
    ...getAgentPosition(agent, width, height),
  }));

  // Calculate current confidence
  const calculateConfidence = (): number => {
    if (frame < FPS * 15) return 0;
    if (frame < FPS * 40) return interpolate(frame, [FPS * 15, FPS * 40], [10, 50]);
    if (frame < FPS * 60) return interpolate(frame, [FPS * 40, FPS * 60], [50, 75]);
    if (frame < FPS * 75) return 65; // Rollback degradation
    if (frame < FPS * 95) return interpolate(frame, [FPS * 75, FPS * 95], [65, 88]);
    return interpolate(frame, [FPS * 95, FPS * 115], [88, 96], {
      extrapolateRight: 'clamp',
    });
  };

  const confidence = calculateConfidence();

  // Rollback overlay visibility
  const showRollbackAlert = frame >= ROLLBACK_START_FRAME && frame < TIER2D_REEXEC_END;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {/* Title */}
      <Sequence from={0} durationInFrames={FPS * 2}>
        <AbsoluteFill
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <h1
            style={{
              color: COLORS.text,
              fontSize: 48,
              fontWeight: 'bold',
              margin: 0,
            }}
          >
            Burandt v Aurora
          </h1>
          <p
            style={{
              color: COLORS.textMuted,
              fontSize: 24,
              marginTop: 16,
            }}
          >
            Multi-Agent Litigation Swarm
          </p>
        </AbsoluteFill>
      </Sequence>

      {/* Main visualization */}
      <Sequence from={FPS * 2}>
        <>
          {/* Header */}
          <div
            style={{
              position: 'absolute',
              top: 20,
              left: 0,
              right: 0,
              textAlign: 'center',
            }}
          >
            <h2
              style={{
                color: COLORS.text,
                fontSize: 24,
                fontWeight: 'bold',
                margin: 0,
              }}
            >
              Agent Swarm Execution
            </h2>
          </div>

          {/* Tier labels */}
          {[1, 2, 3, 4].map((tier) => {
            const x = getAgentPosition({ tier } as Agent, width, height).x;
            return (
              <div
                key={tier}
                style={{
                  position: 'absolute',
                  top: 70,
                  left: x,
                  transform: 'translateX(-50%)',
                  color: COLORS.textMuted,
                  fontSize: 14,
                  fontWeight: 'bold',
                }}
              >
                TIER {tier}
              </div>
            );
          })}

          {/* Dependency arrows */}
          {agentsWithPositions.map((agent) =>
            agent.dependencies.map((depId) => {
              const depAgent = agentsWithPositions.find((a) => a.id === depId);
              if (!depAgent) return null;

              const agentStatus = getAgentStatus(agent, frame);
              const depStatus = getAgentStatus(depAgent, frame);
              const active =
                depStatus === 'completed' &&
                (agentStatus === 'running' || agentStatus === 'completed');

              return (
                <DependencyArrow
                  key={`${depId}-${agent.id}`}
                  fromX={depAgent.x!}
                  fromY={depAgent.y!}
                  toX={agent.x!}
                  toY={agent.y!}
                  active={active}
                />
              );
            })
          )}

          {/* Agent nodes */}
          {agentsWithPositions.map((agent) => {
            const status = getAgentStatus(agent, frame);
            const showScore = status === 'completed' && frame >= agent.endFrame + 15;

            return (
              <AgentNode
                key={agent.id}
                agent={agent}
                x={agent.x!}
                y={agent.y!}
                status={status}
                showScore={showScore}
              />
            );
          })}

          {/* Rollback overlay */}
          <RollbackOverlay
            visible={showRollbackAlert}
            message={
              frame < TIER2D_REEXEC_START
                ? 'MAJOR FLAW DETECTED: WSIB limitation period error'
                : 'Re-executing TIER2D with enhanced directive...'
            }
          />

          {/* Confidence meter */}
          <ConfidenceMeter confidence={confidence} />

          {/* Status legend */}
          <div
            style={{
              position: 'absolute',
              bottom: 100,
              right: 40,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            {(['pending', 'running', 'completed', 'rollback'] as AgentStatus[]).map(
              (status) => (
                <div
                  key={status}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: COLORS[status],
                    }}
                  />
                  <span
                    style={{
                      color: COLORS.textMuted,
                      fontSize: 12,
                      textTransform: 'capitalize',
                    }}
                  >
                    {status}
                  </span>
                </div>
              )
            )}
          </div>
        </>
      </Sequence>
    </AbsoluteFill>
  );
};

// ============================================================================
// REMOTION CONFIG EXPORT
// ============================================================================

export const RemotionVideo: React.FC = () => {
  return <AgentSwarmVisualization />;
};

// Default export for Remotion
export default AgentSwarmVisualization;
