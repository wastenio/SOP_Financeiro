import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/empenhos';

export const fetchEmpenhos = createAsyncThunk('empenhos/fetchAll', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addEmpenho = createAsyncThunk('empenhos/add', async (empenho) => {
  const response = await axios.post(API_URL, empenho);
  return response.data;
});

export const deleteEmpenho = createAsyncThunk('empenhos/delete', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const empenhoSlice = createSlice({
  name: 'empenhos',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchEmpenhos.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(addEmpenho.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteEmpenho.fulfilled, (state, action) => {
        state.items = state.items.filter(e => e.id !== action.payload);
      });
  },
});

export default empenhoSlice.reducer;
