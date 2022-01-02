import React, { useContext, useReducer, useEffect,useState } from "react";
import { Input, Space } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import appContext from '../../context/ProductContext';
const { Search } = Input;
const onSearch = (value) => console.log(value);

export default function SearchBar(props) {
  const { dispatch } = useContext(appContext);
  const [term, setTerm] = useState('');
  useEffect(function () {
    dispatch({
      type: 'update_filter',
      payload: term
    });
  }, [term, dispatch]);
  
  const btnClear_Clicked = function (e) {
    setTerm('');
  }
  const txtTerm_Changed = function (e) {
    setTerm(e.target.value);
  }
  return (
    <>
      <Search placeholder="Nhap tim kiem" onChange={txtTerm_Changed} style={{ width: "100%" }} />
      <button type="button" onClick={btnClear_Clicked}>Clear</button>
    </>
  );
}