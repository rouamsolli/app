import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    email: '',
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
  },
  reducers: {},
})
export const useselector = state => state.user
//export const { changeTheme, setDefaultTheme } = slice.actions

export default slice.reducer
