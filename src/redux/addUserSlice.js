import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fonction asynchrone pour récupérer les groupes clients
export const fetchGrp = createAsyncThunk("fetchGrp/fetchGrp", async (groupClient, thunkAPI) => {
  try {
    if (!groupClient) {
      return thunkAPI.rejectWithValue("Le groupe client est requis.");
    }

    const response = await axios.get(
      `https://testapp.novicore.ma/api/client_groups?search|name[partial]=${groupClient}`
    );

    return response.data["hydra:member"].map((clientGrp) => ({
      value: clientGrp.id,
      label: clientGrp.name,
    }));
  } catch (error) {
    console.error("Erreur reçue de l'API :", error.response?.data || error.message);
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Une erreur est survenue avec l'API.");
  }
});

// Fonction asynchrone pour ajouter un client
export const addClient = createAsyncThunk("addClient/addClient", async (formData, thunkAPI) => {
  try {
    const response = await axios.post("https://testapp.novicore.ma/api/clients", formData, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Client ajouté avec succès:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur reçue de l'API :", error.response?.data || error.message);
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Une erreur est survenue lors de l'ajout du client."
    );
  }
});

const initialState = {
  groupes: [],
  selectedGroup: null,
  searchGroup: "",
  loading: false,
  error: null,
  addClientLoading: false,
  addClientError: null,
  lastAddedClient: null,
};

const addUserSlice = createSlice({
  name: "addUser",
  initialState,
  reducers: {
    setSelectedGroup: (state, action) => {
      state.selectedGroup = action.payload;
    },
    setSearchGroup: (state, action) => {
      state.searchGroup = action.payload;
    },
    addClientSuccess: (state, action) => {
      state.lastAddedClient = action.payload;
    },
    clearLastAddedClient: (state) => {
      state.lastAddedClient = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGrp.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGrp.fulfilled, (state, action) => {
        state.loading = false;
        state.groupes = action.payload;
      })
      .addCase(fetchGrp.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(addClient.pending, (state) => {
        state.addClientLoading = true;
        state.addClientError = null;
      })
      .addCase(addClient.fulfilled, (state, action) => {
        state.addClientLoading = false;
        state.lastAddedClient = action.payload;
      })
      .addCase(addClient.rejected, (state, action) => {
        state.addClientLoading = false;
        state.addClientError = action.payload;
      });
  },
});

export const { setSelectedGroup, setSearchGroup, addClientSuccess, clearLastAddedClient } = addUserSlice.actions;
export default addUserSlice.reducer;
