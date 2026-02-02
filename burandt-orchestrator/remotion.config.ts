/**
 * Remotion Configuration for Burandt Agent Swarm Visualization
 */

import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);

export default {
  // Root component for the video
  entryPoint: './src/agent_swarm_remotion_animation.tsx',

  // Video settings
  fps: 30,
  durationInFrames: 30 * 120, // 2 minutes
  width: 1920,
  height: 1080,

  // Output settings
  outputLocation: './out',
  codec: 'h264',

  // Composition ID
  compositionId: 'AgentSwarmVisualization',
};
