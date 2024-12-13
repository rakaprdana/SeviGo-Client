import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ComplaintsItem {
  _id: string;
  title: string;
  content: string;
  date_event: string;
  location: string;
  category: {_id: string, name: string}
  evidence: File | null;
  current_status?: string;
  user?: string;
}

interface ComplaintsState {
  data: ComplaintsItem[];
  filteredData: ComplaintsItem[];
}

// State awal
const initialState: ComplaintsState = {
  data: [],
  filteredData: [],
};

const complaintsSlice = createSlice({
  name: "complaints",
  initialState,
  reducers: {
    // Mengatur semua data keluhan
    setComplaintsData(state, action: PayloadAction<ComplaintsItem[]>) {
      state.data = action.payload;
      state.filteredData = action.payload;
    },

    // Mencari keluhan berdasarkan judul atau kategori
    searchComplaints(state, action: PayloadAction<string>) {
      const query = action.payload.toLowerCase();
      state.filteredData = state.data.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.category.name.toLowerCase().includes(query)
      );
    },

    // Mengatur ulang filteredData ke semua data
    resetFilteredData(state) {
      state.filteredData = state.data;
    },
  },
});

export const { setComplaintsData, searchComplaints, resetFilteredData } =
  complaintsSlice.actions;
export default complaintsSlice.reducer;
