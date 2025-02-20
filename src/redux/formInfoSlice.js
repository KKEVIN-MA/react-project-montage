import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
// Définition de l’état initial
const initialState = {
  nlivraison: "1",
  date:dayjs().format("YYYY-MM-DDTHH:mm"),
  observation: "",
  showAddUser: false,
};

// Création du slice Redux
const formInfoSlice = createSlice({
  name: "formInfo",
  initialState,
  reducers: {
    setNlivraison: (state, action) => {
      state.nlivraison = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setObservation: (state, action) => {
      state.observation = action.payload;
    },
    setShowAddUser:(state,action) => {
        state.showAddUser = action.payload;
    }
  },
});

// Exportation des actions et du reducer
export const { setNlivraison, setDate, setObservation , setShowAddUser} = formInfoSlice.actions;
export default formInfoSlice.reducer;
