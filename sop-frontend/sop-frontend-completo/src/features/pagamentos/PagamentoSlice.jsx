import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/pagamentos';

// Busca todos os pagamentos
export const fetchPagamentos = createAsyncThunk(
  'pagamentos/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Erro ao buscar pagamentos');
    }
  }
);

// Adiciona um pagamento
export const addPagamento = createAsyncThunk(
  'pagamentos/add',
  async (pagamento, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, pagamento);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Erro ao adicionar pagamento');
    }
  }
);

// Deleta pagamento pelo id
export const deletePagamento = createAsyncThunk(
  'pagamentos/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Erro ao deletar pagamento');
    }
  }
);

const pagamentoSlice = createSlice({
  name: 'pagamentos',
  initialState: {
    items: [],
    status: 'idle',    // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      // FETCH
      .addCase(fetchPagamentos.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPagamentos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPagamentos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // ADD
      .addCase(addPagamento.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addPagamento.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(addPagamento.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // DELETE
      .addCase(deletePagamento.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deletePagamento.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter((p) => p.id !== action.payload);
      })
      .addCase(deletePagamento.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default pagamentoSlice.reducer;
