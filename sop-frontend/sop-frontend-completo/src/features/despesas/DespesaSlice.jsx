import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/despesas';

export const fetchDespesas = createAsyncThunk('despesas/fetchAll', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addDespesa = createAsyncThunk('despesas/add', async (despesa) => {
  const response = await axios.post(API_URL, despesa);
  return response.data;
});

export const deleteDespesa = createAsyncThunk('despesas/delete', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const despesaSlice = createSlice({
  name: 'despesas',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchDespesas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(addDespesa.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteDespesa.fulfilled, (state, action) => {
        state.items = state.items.filter(d => d.id !== action.payload);
      });
  },
});

export default despesaSlice.reducer;
