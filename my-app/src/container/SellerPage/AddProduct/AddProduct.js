import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AddProductWrapper } from "./AddProduct.style";
import {
  Form,
  Input,
  Radio,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  InputNumber, DatePicker, TimePicker
} from "antd";

import { instance } from "../../../ultils/ultils";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};



export default function AddProduct() {
  const [form] = Form.useForm();
  const [name,setName] = useState();
  const [price,setPrice] = useState();
  const [pricebuy,setPricebuy] = useState();
  
  const [category_id,setCategoryID] = useState();

  const name_changed = function (e) {
    setName(e.target.value);
  };
  const price_changed = function (e) {
    setPrice(e);
  };
  const pricebuy_changed = function (e) {
    setPricebuy(e);
  };

  const category_change= function (e) {
    setCategoryID(e.target.value);
  };
  const onFinish = async function () {
    try {
      const data = { 
        name: name,
        price: price,
        pricebuy: pricebuy,
        category_id:category_id,
        isAccept: true };
      const res = await instance.post("/products/add", data);
      if (res.status == 200) {
        const retUrl = location.state?.from?.pathname || "/seller/products";
        navigate(retUrl);
      } else {
        alert("Invalid login.");
      }
    } catch (err) {
      alert("Invalid login.");
    }
  };
  const onGenderChange = (value) => {
    switch (value) {
      case 'hfIXPdIhFVqxS92bCli5':
        setCategoryID('hfIXPdIhFVqxS92bCli5');
        return;
      default:
        setCategoryID('nFKDk4PRH3UCmIcfX6JN');
        return;
    }
  };
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Form
      name="validate_other"
      {...formItemLayoutWithOutLabel}
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        label="Tên sản phẩm"
        rules={[
          
          {
            required: true,
            message: "Nhập tên sản phẩm",
          },
        ]}
      >
        <Input onChange={name_changed} />
      </Form.Item>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name="pricebuy"
            label="Giá mua ngay"
            
          >
            <InputNumber onChange={pricebuy_changed} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="price"
            label="Giá khởi điểm"
            rules={[
              
              {
                required: true,
                message: "Nhập giá khởi điểm",
              },
            ]}
          >
            <InputNumber onChange={price_changed} />
          </Form.Item>
        </Col>
      </Row>
     
      <Form.Item name="radio-group" label="Gia hạn">
        <Radio.Group>
          <Radio value="true">Có</Radio>
          <Radio value="false">Không</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="category" label="Select" rules={[{ required: true }]}>
        <Select onChange={onGenderChange}>
          <Select.Option value="hfIXPdIhFVqxS92bCli5">Máy tính xách tay</Select.Option>
          <Select.Option value="nFKDk4PRH3UCmIcfX6JN">Điện thoại di động</Select.Option>
        </Select>
      </Form.Item>
      <Form.List
        name="names"
        rules={[
          {
            validator: async (_, names) => {
              if (!names || names.length < 2) {
                return Promise.reject(new Error("At least 2 passengers"));
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? "Hình ảnh" : ""}
                required={false}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={["onChange", "onBlur"]}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message:
                        "Please input passenger's name or delete this field.",
                    },
                  ]}
                  noStyle
                >
                  <Input
                    placeholder="passenger name"
                    style={{ width: "60%" }}
                  />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: "60%" }}
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
              <Button
                type="dashed"
                onClick={() => {
                  add("The head item", 0);
                }}
                style={{ width: "60%", marginTop: "20px" }}
                icon={<PlusOutlined />}
              >
                Add field at head
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
