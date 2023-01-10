import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import ProductCard from "../../components/peoduct-card/ProductCard.jsx";
import axios from "axios";
import "./Store.scss";
import { useEffect } from "react";
import data from "../../data.js";

const Store = () => {
    const [products, setProducts] = useState([]);
    const [filterPlatformValue, setFilterPlatformValue] = useState();
    const [filterTypeValue, setFilterTypeValue] = useState();

    /*
    const { data, error, isLoading } = useQuery("products", async () => {
        const items = await axios.get("http://localhost:5000/api/products");
        return items;
    });
    */
    useEffect(() => {
        axios
            .get("http://localhost:5000/api/products")
            .then((response) => {
                setProducts(response.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const compareFilterValues = (product) => {
        return (
            (filterPlatformValue
                ? product.platform === filterPlatformValue
                : true) &&
            (filterTypeValue ? product.product_type === filterTypeValue : true)
        );
    };

    const platformSelectOnChange = (e) => {
        setFilterPlatformValue(e.target.value);
    };
    const typeSelectOnChange = (e) => {
        setFilterTypeValue(e.target.value);
    };

    return (
        <div>
            <div className="store-container">
                <div className="sidebar-search-container">
                    <div className="search-select">
                        <div className="custom-select">
                            <label>
                                <p>Choose a product platform</p>
                                <div className="select-container">
                                    <select onChange={platformSelectOnChange}>
                                        <option selected value="">
                                            Any
                                        </option>
                                        <option value="playstation2">
                                            PlayStation 2
                                        </option>
                                        <option value="playstation3">
                                            PlayStation 3
                                        </option>
                                        <option value="xbox">Xbox</option>
                                        <option value="xbox360">
                                            Xbox-360
                                        </option>
                                        <option value="wii">Wii</option>
                                        <option value="pc">Pc</option>
                                    </select>
                                </div>
                            </label>
                        </div>
                        <div className="custom-select">
                            <label>
                                <p>Choose a product type</p>
                                <div className="select-container">
                                    <select onChange={typeSelectOnChange}>
                                        <option selected value="">
                                            Any
                                        </option>
                                        <option value="console">
                                            Consoles
                                        </option>
                                        <option value="accessory">
                                            Accessories
                                        </option>
                                        <option value="game">Games</option>
                                    </select>
                                </div>
                            </label>
                        </div>
                    </div>
                    <h3>{filterPlatformValue}</h3>
                    <h3>{filterTypeValue}</h3>
                </div>
                <div className="product-list-container">
                    <div className="products">
                        {products.filter(compareFilterValues).map((product) => (
                            <ProductCard product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Store;
