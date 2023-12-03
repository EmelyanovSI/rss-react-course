import { createSlice } from '@reduxjs/toolkit';

export interface FormState {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword?: string;
  gender: string;
  acceptTerms?: boolean;
}

export const initialState: FormState = {
  name: '',
  age: 0,
  email: '',
  password: '',
  confirmPassword: '',
  gender: '',
  acceptTerms: false,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.name = action.payload.name;
      state.name = action.payload.age;
      state.name = action.payload.email;
      state.name = action.payload.password;
      state.name = action.payload.confirmPassword;
      state.name = action.payload.gender;
      state.name = action.payload.acceptTerms;
    },
  },
});

export const { setFormData } = formSlice.actions;

export default formSlice.reducer;
