import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/empenhos';

// Thunks
export const fetchEmpenhos = createAsyncThunk('empenhos/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || 'Erro ao buscar empenhos');
  }
});

export const addEmpenho = createAsyncThunk('empenhos/add', async (empenho, { rejectWithValue }) => {
  try {
    const response = await axios.post(API_URL, empenho);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || 'Erro ao adicionar empenho');
  }
});

export const deleteEmpenho = createAsyncThunk('empenhos/delete', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data || 'Erro ao deletar empenho');
  }
});

const initialState = {
  items: [],
  fetchStatus: 'idle', // idle | loading | succeeded | failed
  fetchError: null,
  addStatus: 'idle',
  addError: null,
  deleteStatus: 'idle',
  deleteError: null,
};

const empenhoSlice = createSlice({
  name: 'empenhos',
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
      // FETCH EMPENHOS
      .addCase(fetchEmpenhos.pending, (state) => {
        state.fetchStatus = 'loading';
        state.fetchError = null;
      })
      .addCase(fetchEmpenhos.fulfilled, (state, action) => {
        state.fetchStatus = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchEmpenhos.rejected, (state, action) => {
        state.fetchStatus = 'failed';
        state.fetchError = action.payload;
      })

      // ADD EMPENHO
      .addCase(addEmpenho.pending, (state) => {
        state.addStatus = 'loading';
        state.addError = null;
      })
      .addCase(addEmpenho.fulfilled, (state, action) => {
        state.addStatus = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(addEmpenho.rejected, (state, action) => {
        state.addStatus = 'failed';
        state.addError = action.payload;
      })

      // DELETE EMPENHO
      .addCase(deleteEmpenho.pending, (state) => {
        state.deleteStatus = 'loading';
        state.deleteError = null;
      })
      .addCase(deleteEmpenho.fulfilled, (state, action) => {
        state.deleteStatus = 'succeeded';
        state.items = state.items.filter((e) => e.id !== action.payload);
      })
      .addCase(deleteEmpenho.rejected, (state, action) => {
        state.deleteStatus = 'failed';
        state.deleteError = action.payload;
      });
  },
});

// Selectors
export const selectEmpenhos = (state) => state.empenhos.items;
export const selectFetchStatus = (state) => state.empenhos.fetchStatus;
export const selectFetchError = (state) => state.empenhos.fetchError;
export const selectAddStatus = (state) => state.empenhos.addStatus;
export const selectAddError = (state) => state.empenhos.addError;
export const selectDeleteStatus = (state) => state.empenhos.deleteStatus;
export const selectDeleteError = (state) => state.empenhos.deleteError;

export const { clearFetchError, clearAddError, clearDeleteError, resetStatuses } = empenhoSlice.actions;

export default empenhoSlice.reducer;
