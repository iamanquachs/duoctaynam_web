import React, { Component } from "react";

const CheckInput = (prop) => {
  const isChecked = prop.isChecked;
  console.log(isChecked);
  return (
    <>
      <input
        className="cart_item_check form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
        type="checkbox"
        // name={"item_" + index}
        defaultChecked={isChecked}
      />
    </>
  );
};

export default CheckInput;
