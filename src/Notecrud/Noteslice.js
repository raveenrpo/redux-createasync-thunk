import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getdata = createAsyncThunk(
  "get",
  async (_, { rejectWithValue }) => {
    const response = await axios.get("http://localhost:3005/notes");
    try {
      return response.data;
    } catch (error) {
      return rejectWithValue(error.respose.data);
    }
  }
);

export const setdata = createAsyncThunk(
  "adddata",
  async (datas, { rejectWithValue }) => {
    const response = await axios.post("http://localhost:3005/notes", datas);
    try {
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editdata = createAsyncThunk(
  "edit",
  async (datas, { rejectWithValue }) => {
    console.log("upda", datas);
    const response = await axios.patch(
      `http://localhost:3005/notes/${datas.id}`,
      datas
    );
    try {
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletedata = createAsyncThunk(
  "delete",
  async (datas, { rejectWithValue }) => {
    const response = await axios.delete(`http://localhost:3005/notes/${datas}`);
    try {
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const Noteslice = createSlice({
  name: "note",
  initialState: {
    notes: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getdata.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getdata.fulfilled, (state, action) => {
      state.notes = action.payload;
      state.loading = false;
    });
    builder.addCase(getdata.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(setdata.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(setdata.fulfilled, (state, action) => {
      state.notes.push(action.payload);
      state.loading = false;
    });
    builder.addCase(setdata.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(deletedata.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deletedata.fulfilled, (state, action) => {
      const { id } = action.payload;
      if (id) {
        state.notes = state.notes.filter((v) => v.id !== id);
      }
      state.loading = false;
    });
    builder.addCase(deletedata.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(editdata.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(editdata.fulfilled, (state, action) => {
      state.loading = false;
      state.notes = state.notes.map((v) =>
        v.id === action.payload.id ? action.payload : v
      );
    });
    builder.addCase(editdata.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export default Noteslice.reducer;
