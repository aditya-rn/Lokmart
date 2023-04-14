import {createSlice} from '@reduxjs/toolkit';

export const authenticationSlice = createSlice({
  name: 'authenticationSlice',
  initialState: {
    isAuthenticated: true,
    userData: {
      email: 'atuny0@sohu.com',
      firstName: 'Terry',
      gender: 'male',
      id: 1,
      image: 'https://robohash.org/hicveldicta.png',
      lastName: 'Medhurst',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhdHVueTAiLCJlbWFpbCI6ImF0dW55MEBzb2h1LmNvbSIsImZpcnN0TmFtZSI6IlRlcnJ5IiwibGFzdE5hbWUiOiJNZWRodXJzdCIsImdlbmRlciI6Im1hbGUiLCJpbWFnZSI6Imh0dHBzOi8vcm9ib2hhc2gub3JnL2hpY3ZlbGRpY3RhLnBuZyIsImlhdCI6MTY3MjM3Nzc4NywiZXhwIjoxNjcyMzgxMzg3fQ.qMMvm-TUSckzOOeF7c0T-HoVJKDQ9Y89g7PJEC5iOGk',
      username: 'atuny0',
    },
    newUser: false,
  },
  reducers: {
    loginToStore: (state, action) => {
      console.log('running loginToStore in slice');
      return {
        isAuthenticated: true,
        userData: {...action.payload.userData},
        newUser: false,
      };
      return true;
    },
    signupToStore: (state, action) => {
      return {
        isAuthenticated: true,
        userData: {...action.payload.userData},
        newUser: true,
      };
    },
  },
});

export const {loginToStore, signupToStore} = authenticationSlice.actions;
export default authenticationSlice.reducer;
