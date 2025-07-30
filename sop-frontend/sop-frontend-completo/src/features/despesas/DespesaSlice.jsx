import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/despesas';

// Async Thunks
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

// Novo thunk para atualizar despesa
export const updateDespesa = createAsyncThunk(
  'despesas/update',
  async (despesa, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${despesa.id}`, despesa);
      return response.data;
    } catch (err) {
      // Pode retornar msg customizada ou erro padrão
      return rejectWithValue(err.response?.data || 'Erro ao atualizar despesa');
    }
  }
);

const despesaSlice = createSlice({
  name: 'despesas',
  initialState: {
    items: [],
    fetchStatus: 'idle', // idle | loading | succeeded | failed
    fetchError: null,
    addStatus: 'idle',
    addError: null,
    deleteStatus: 'idle',
    deleteError: null,
    updateStatus: 'idle',  // novo estado para atualização
    updateError: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      // fetchDespesas
      .addCase(fetchDespesas.pending, (state) => {
        state.fetchStatus = 'loading';
        state.fetchError = null;
      })
      .addCase(fetchDespesas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.fetchStatus = 'succeeded';
      })
      .addCase(fetchDespesas.rejected, (state, action) => {
        state.fetchStatus = 'failed';
        state.fetchError = action.error.message;
      })

      // addDespesa
      .addCase(addDespesa.pending, (state) => {
        state.addStatus = 'loading';
        state.addError = null;
      })
      .addCase(addDespesa.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.addStatus = 'succeeded';
      })
      .addCase(addDespesa.rejected, (state, action) => {
        state.addStatus = 'failed';
        state.addError = action.error.message;
      })

      // deleteDespesa
      .addCase(deleteDespesa.pending, (state) => {
        state.deleteStatus = 'loading';
        state.deleteError = null;
      })
      .addCase(deleteDespesa.fulfilled, (state, action) => {
        state.items = state.items.filter(d => d.id !== action.payload);
        state.deleteStatus = 'succeeded';
      })
      .addCase(deleteDespesa.rejected, (state, action) => {
        state.deleteStatus = 'failed';
        state.deleteError = action.error.message;
      })

      // updateDespesa
      .addCase(updateDespesa.pending, (state) => {
        state.updateStatus = 'loading';
        state.updateError = null;
      })
      .addCase(updateDespesa.fulfilled, (state, action) => {
        const index = state.items.findIndex(d => d.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.updateStatus = 'succeeded';
      })
      .addCase(updateDespesa.rejected, (state, action) => {
        state.updateStatus = 'failed';
        state.updateError = action.payload || action.error.message;
      });
  },
});

export default despesaSlice.reducer;
