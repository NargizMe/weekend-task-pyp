import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import type { PayloadAction } from '@reduxjs/toolkit';
import { message } from 'antd';

export const fetchUniversityByName = createAsyncThunk(
    'users/fetchByIdStatus',
    async (universityName: string) => {
        try{
            const result = await axios('http://universities.hipolabs.com/search?name=' + universityName);
            if(result.data.length === 0){
                message.error({
                    content: 'There is no data like this 🥲',
                    style: {
                        marginTop: '20vh'
                    }
                }, 1);
                return {
                    data: 'There is no data like this 🥲',
                    type: 'error'
                }
            }
            return {
                data: result.data.map((d: DataType, i: number) => ({...d, key: i})),
                type: 'data'
            }
        }
        catch(error: any) {
            message.error(error.message);
            return {
                data: error.message,
                type: 'error'
            }
        }
    }
)

export interface DataType {
    name: string;
    alpha_two_code: string;
    country: string;
}

export interface IState {
    list: Array<DataType>
    loading: boolean
    error: string | null
}

const initialState: IState = {
    list: [],
    loading: false,
    error: null
}

export const slice = createSlice({
    name: 'getData',
    initialState,
    reducers: {
        toggleLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUniversityByName.fulfilled, (state, action) => {
            if(action.payload.type === 'data'){
                state.error = null;
                state.list = action.payload.data;
                state.loading = false;
            }
            if(action.payload.type === 'error'){
                state.error = action.payload.data;
                state.loading = false;
                state.list = []
            }
        })
    },
})

export const { toggleLoading } = slice.actions

export default slice.reducer