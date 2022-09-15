import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  dob: string;
  active?: boolean | undefined;
};

type EmployeesState = {
  list: Employee[];
  loading: boolean;
  error: null | string;
};

type ChangeStatus = {
  id: string;
  active: boolean;
};

export const fetchEmployees = createAsyncThunk<
  Employee[],
  undefined,
  { rejectValue: string }
>("employees/fetchEmployees", async function (_, { rejectWithValue }) {
  const response = await fetch(`https://topdevsprojects.org/tasks/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    return rejectWithValue("Server error");
  }
  const data = await response.json();

  return data as Employee[];
});

const initialState: EmployeesState = {
  list: [],
  loading: false,
  error: null,
};

export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    changeStatus(state, action: PayloadAction<ChangeStatus>) {
      state.list = state.list.map((i) => {
        if (i.id === action.payload.id) {
          return { ...i, active: action.payload.active };
        } else {
          return i;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEmployees.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchEmployees.fulfilled, (state, action) => {
      state.list = action.payload;
      state.loading = false;
    });
  },
});

export const { changeStatus } = employeesSlice.actions;

export default employeesSlice.reducer;
