import { createSlice } from "@reduxjs/toolkit";

type ChatObj = {
    user_type: string,
    id: string
    text: string,
}

type TopicChats = {
    [key: string]: ChatObj[]
}

type Chats = {
    [key: string]: TopicChats
}


interface ChatsState {
    chats: Chats | null,
    activeGroup: string,
    activeTopic: string,
}

const initialState: ChatsState = {
    chats: null,
    activeGroup: "Untitled Group",
    activeTopic: "Untitled 1"
}

const chatsSlice = createSlice({
    name: "chats",
    initialState,
    reducers: {
        setChats: (state, action) => {
            state.chats = action.payload;
        },
        setSelectedGroup: (state, action) => {
            state.activeGroup = action.payload;
        },
        setSelectedTopic: (state, action) => {
            state.activeTopic = action.payload;
        },
    },
});

export const {setChats, setSelectedGroup, setSelectedTopic} = chatsSlice.actions;
export default chatsSlice.reducer;