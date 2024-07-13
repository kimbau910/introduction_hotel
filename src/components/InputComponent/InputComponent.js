import { Input } from 'antd';
import React from 'react';

const { TextArea } = Input;

const InputComponent = ({ size, placeholder, bordered, style, isTextArea, ...rests }) => {
  if (isTextArea) {
    return (
      <TextArea 
        size={size} 
        placeholder={placeholder} 
        bordered={bordered} 
        style={style} 
        {...rests} 
      />
    );
  }
  return (
    <Input 
      size={size} 
      placeholder={placeholder} 
      bordered={bordered} 
      style={style} 
      {...rests} 
    />
  );
};

export default InputComponent;
