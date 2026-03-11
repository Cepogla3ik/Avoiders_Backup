import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PagesState {
    game: boolean;
    home: boolean;
    sellectCharacter: boolean;
}

const initialState: PagesState = {
    game: false,
    home: false,
    sellectCharacter: false,
};

const pagesSlice = createSlice({
    name: 'pages',
    initialState,
    reducers: {
        setPagesState: (state, action: PayloadAction<Partial<PagesState>>) => {
          const targetPage = Object.keys(action.payload)[0] as keyof PagesState;

          if (!targetPage) return;

          (Object.keys(state) as Array<keyof PagesState>).forEach((key) => {
              state[key] = key === targetPage;
          });
        }
    }
});

export const { setPagesState } = pagesSlice.actions;
export default pagesSlice.reducer;