import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/pagamentos';

export const fetchPagamentos = createAsyncThunk('pagamentos/fetchAll', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addPagamento = createAsyncThunk('pagamentos/add', async (pagamento) => {
  const response = await axios.post(API_URL, pagamento);
  return response.data;
});

export const deletePagamento = createAsyncThunk('pagamentos/delete', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const pagamentoSlice = createSlice({
  name: 'pagamentos',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPagamentos.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(addPagamento.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deletePagamento.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p.id !== action.payload);
      });
  },
});

export default pagamentoSlice.reducer;
