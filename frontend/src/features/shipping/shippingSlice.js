import { createSlice } from "@reduxjs/toolkit";

const storage = localStorage.getItem('shippingData') ? JSON.parse(localStorage.getItem('shippingData')) : null

const initialSTate = {

}
