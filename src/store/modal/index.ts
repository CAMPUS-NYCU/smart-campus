import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const modal = {
  confirmAddReport: "confirmAddReport",
  confirmEditReport: "confirmEditReport",
  login: "login",
  switchLanguage: "switchLanguage",
  switchTheme: "switchTheme",
};

type Modal = keyof typeof modal;

interface ModalState {
  open: Record<Modal, boolean>;
}

const initialState: ModalState = {
  open: Object.fromEntries(
    Object.entries(modal).map(([key]) => [key, false]),
  ) as Record<Modal, boolean>,
};

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<Modal>) {
      state.open[action.payload] = true;
    },
    closeModal(state, action: PayloadAction<Modal>) {
      state.open[action.payload] = false;
    },
    toggleModal(state, action: PayloadAction<Modal>) {
      state.open[action.payload] = !state.open[action.payload];
    },
  },
});

export const { openModal, closeModal, toggleModal } = reportSlice.actions;

export default reportSlice.reducer;
