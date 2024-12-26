import { createSlice } from "@reduxjs/toolkit";

type User = {
    id: number;
    email: string;
};

interface UserState {
    user: User | null;  
}

const initialState: UserState = {
    user: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const {setUser} = userSlice.actions;
export default userSlice.reducer;