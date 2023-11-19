import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching data from the backend
export const fetchData = createAsyncThunk(
  "return/fetchData",
  async (_, thunkAPI) => {
    try {
      // TODO: Connect with backend
      // const response = await axios.get("http://example.com/api/data");
      const data = [
        { sku: "123", count: 1 },
        { sku: "456", count: 2 },
      ];
      // update prviousOrders
      thunkAPI.dispatch(updatePreviousOrders(data));
      // return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
);

// post data to backend from the form
export const postData = createAsyncThunk(
  "return/postData",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const data = state.return.form;
      axios.post("http://example.com/api/data", data);
    } catch (error) {
      console.error("Error posting data:", error);
      throw error;
    }
  }
);

export const returnSlince = createSlice({
  name: "return",
  initialState: {
    step: 1,
    useId: true,
    form: {
      logistic: "",
      warehouse: "",
      uuid: "",
      id: "",
      returnReason: "",
      annotation: "",
      itemsToReturn: {},
    },
    prviousOrders: [],
  },
  reducers: {
    //   update form
    updateForm: (state, action) => {
      state.form[action.payload.key] = action.payload.value;
    },
    //   update useId
    updateUseId: (state, action) => {
      state.useId = action.payload;
    },
    //   update step
    updateStep: (state, action) => {
      state.step = action.payload;
    },
    // Add a reducer for updating prviousOrders
    updatePreviousOrders: (state, action) => {
      state.prviousOrders = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle the pending and fulfilled states of the fetchData async action
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Handle the pending and fulfilled states of the postData async action
    builder.addCase(postData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(postData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(postData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

// Action creators are generated for each case reducer function
export const { updateForm, updateUseId, updateStep, updatePreviousOrders } =
  returnSlince.actions;

export default returnSlince.reducer;
