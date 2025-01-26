export interface Position {
  x: number;
  y: number;
}

export interface Sample {
  id: number;
  position: Position;
}

export interface ManipulatorState {
  position: Position;
  samples: Sample[];
  hasGrabbedSample: boolean;
  grabbedSampleId: number | null;
}

export interface CommandHistory {
  originalCommand: string;
  optimizedCommand: string;
  timestamp: string;
  samplesBeforeExecution?: Sample[];
  samplesAfterExecution?: Sample[];
}

export interface AuthState {
  isAuthenticated: boolean;
}
