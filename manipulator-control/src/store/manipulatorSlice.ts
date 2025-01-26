import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ManipulatorState, CommandHistory } from "../types/types";

const initialState: ManipulatorState & { history: CommandHistory[] } = {
  position: { x: 0, y: 0 },
  samples: [
    { id: 1, position: { x: 2, y: 3 } },
    { id: 2, position: { x: 4, y: 1 } },
  ],
  hasGrabbedSample: false,
  grabbedSampleId: null,
  history: [],
};

const manipulatorSlice = createSlice({
  name: "manipulator",
  initialState,
  reducers: {
    moveLeft: (state) => {
      if (state.position.x > 0) {
        state.position.x -= 1;
      }
    },
    moveRight: (state) => {
      state.position.x += 1;
    },
    moveUp: (state) => {
      if (state.position.y > 0) {
        state.position.y -= 1;
      }
    },
    moveDown: (state) => {
      state.position.y += 1;
    },
    grabSample: (state) => {
      if (!state.hasGrabbedSample) {
        const sample = state.samples.find(
          (s) =>
            s.position.x === state.position.x &&
            s.position.y === state.position.y
        );
        if (sample) {
          state.hasGrabbedSample = true;
          state.grabbedSampleId = sample.id;
        }
      }
    },
    releaseSample: (state) => {
      if (state.hasGrabbedSample && state.grabbedSampleId !== null) {
        const sample = state.samples.find(
          (s) => s.id === state.grabbedSampleId
        );
        if (sample) {
          sample.position = { ...state.position };
        }
        state.hasGrabbedSample = false;
        state.grabbedSampleId = null;
      }
    },
    addToHistory: (state, action: PayloadAction<CommandHistory>) => {
      state.history.push(action.payload);
    },
  },
});

export const {
  moveLeft,
  moveRight,
  moveUp,
  moveDown,
  grabSample,
  releaseSample,
  addToHistory,
} = manipulatorSlice.actions;

export default manipulatorSlice.reducer;
