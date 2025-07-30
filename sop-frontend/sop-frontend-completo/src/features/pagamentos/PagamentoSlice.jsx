import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/pagamentos';

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

const initialState = {
  items: [],
  fetchStatus: 'idle',
  fetchError: null,
  addStatus: 'idle',
  addError: null,
  deleteStatus: 'idle',
  deleteError: null,
};

const pagamentoSlice = createSlice({
  name: 'pagamentos',
  initialState,
  reducers: {
    clearFetchError(state) {
      state.fetchError = null;
    },
    clearAddError(state) {
      state.addError = null;
    },
    clearDeleteError(state) {
      state.deleteError = null;
    },
    resetStatuses(state) {
      state.fetchStatus = 'idle';
      state.addStatus = 'idle';
      state.deleteStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchPagamentos.pending, (state) => {
        state.fetchStatus = 'loading';
        state.fetchError = null;
      })
      .addCase(fetchPagamentos.fulfilled, (state, action) => {
        state.fetchStatus = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPagamentos.rejected, (state, action) => {
        state.fetchStatus = 'failed';
        state.fetchError = action.payload;
      })

      // ADD
      .addCase(addPagamento.pending, (state) => {
        state.addStatus = 'loading';
        state.addError = null;
      })
      .addCase(addPagamento.fulfilled, (state, action) => {
        state.addStatus = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(addPagamento.rejected, (state, action) => {
        state.addStatus = 'failed';
        state.addError = action.payload;
      })

      // DELETE
      .addCase(deletePagamento.pending, (state) => {
        state.deleteStatus = 'loading';
        state.deleteError = null;
      })
      .addCase(deletePagamento.fulfilled, (state, action) => {
        state.deleteStatus = 'succeeded';
        state.items = state.items.filter((p) => p.id !== action.payload);
      })
      .addCase(deletePagamento.rejected, (state, action) => {
        state.deleteStatus = 'failed';
        state.deleteError = action.payload;
      });
  },
});

export const {
  clearFetchError,
  clearAddError,
  clearDeleteError,
  resetStatuses,
} = pagamentoSlice.actions;

export const selectPagamentos = (state) => state.pagamentos.items;
export const selectFetchStatus = (state) => state.pagamentos.fetchStatus;
export const selectFetchError = (state) => state.pagamentos.fetchError;
export const selectAddStatus = (state) => state.pagamentos.addStatus;
export const selectAddError = (state) => state.pagamentos.addError;
export const selectDeleteStatus = (state) => state.pagamentos.deleteStatus;
export const selectDeleteError = (state) => state.pagamentos.deleteError;

export default pagamentoSlice.reducer;
