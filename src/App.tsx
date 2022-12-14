import React, {useEffect, useRef, useState} from 'react';
import { Table, Button, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useSelector, useDispatch } from 'react-redux';
import {DataType, fetchUniversityByName, toggleLoading} from './universitiesState';
import type {AppDispatch, RootState} from './main';

const columns: ColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
        // render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'Alpha Two Code ',
        dataIndex: 'alpha_two_code',
    },
    {
        title: 'Country',
        dataIndex: 'country',
    },
];

function App() {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const {list, loading} = useSelector((state: RootState) => state.universities);
    const dispatch = useDispatch<AppDispatch>();

    function getUniversityByName(){
        // console.log(inputRef.current?.value)
        if(inputRef.current?.value){
            dispatch(toggleLoading(true));
            dispatch(fetchUniversityByName(inputRef.current?.value))
        }
        else{
            message.warning({
                content: 'Input cannot be empty 🙄',
                // className: 'custom-class',
                style: {
                    marginTop: '20vh',
                },
            }, 1);
        }
    }

  return (
    <>
        <div style={{display: "flex", justifyContent:"center", padding: "13px"}}>
            <input placeholder="Basic usage" ref={inputRef} style={{marginRight: '13px'}}/>
            <Button type="primary" onClick={getUniversityByName}>Primary Button</Button>
        </div>
        <Table dataSource={list} columns={columns} loading ={loading}/>
    </>
  )
}

export default App
