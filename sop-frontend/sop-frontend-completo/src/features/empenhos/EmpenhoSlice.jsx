import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/empenhos';

// Busca todos os empenhos
export const fetchEmpenhos = createAsyncThunk('empenhos/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || 'Erro ao buscar empenhos');
  }
});

// Adiciona novo empenho
export const addEmpenho = createAsyncThunk('empenhos/add', async (empenho, { rejectWithValue }) => {
  try {
    const response = await axios.post(API_URL, empenho);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || 'Erro ao adicionar empenho');
  }
});

// Deleta empenho pelo id
export const deleteEmpenho = createAsyncThunk('empenhos/delete', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data || 'Erro ao deletar empenho');
  }
});

const empenhoSlice = createSlice({
  name: 'empenhos',
  initialState: {
    items: [],
    status: 'idle',     // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      // FETCH EMPENHOS
      .addCase(fetchEmpenhos.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchEmpenhos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchEmpenhos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // ADD EMPENHO
      .addCase(addEmpenho.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addEmpenho.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(addEmpenho.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // DELETE EMPENHO
      .addCase(deleteEmpenho.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteEmpenho.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter((e) => e.id !== action.payload);
      })
      .addCase(deleteEmpenho.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default empenhoSlice.reducer;
