import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HistoryItem {
  _id: string;
  date: string;
  title: string;
  category: string;
  status: string;
  admin_feedback: string;
  updated_at: string;
}

interface HistoryState {
  data: HistoryItem[];
  filteredData: HistoryItem[];
}

const initialState: HistoryState = {
  data: [],
  filteredData: [],
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    setHistoryData(state, action: PayloadAction<HistoryItem[]>) {
      state.data = action.payload;
      state.filteredData = action.payload;
    },
    searchHistory(state, action: PayloadAction<string>) {
      const query = action.payload.toLowerCase();
      state.filteredData = state.data.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      );
    },

    resetFilteredData(state) {
      state.filteredData = state.data;
    },
  },
});

export const { setHistoryData, searchHistory } = historySlice.actions;
export default historySlice.reducer;
