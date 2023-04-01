import { useGetProductsQuery } from "../../features/products/productsApiSlice.js";
import React, { useState } from "react";
import ProductCard from "../../components/peoduct-card/ProductCard.jsx";
import "./Store.scss";

const Store = () => {
    //const [products, setProducts] = useState([]);
    const [filterPlatformValue, setFilterPlatformValue] = useState();
    const [filterTypeValue, setFilterTypeValue] = useState();

    const {
        data: products,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetProductsQuery();

    const compareFilterValues = (product) => {
        return (
            (filterPlatformValue
                ? product.product_platform === filterPlatformValue
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
                                    <option value="xbox360">Xbox-360</option>
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
                                    <option value="console">Consoles</option>
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
                    {isSuccess ? (
                        products
                            .filter(compareFilterValues)
                            .map((product) => <ProductCard product={product} />)
                    ) : (
                        isError?(
                            <div>
                                <p>Message: {error.message}</p>
                                <p>{error.stack}</p>
                            {console.log(error)}
                            </div>
                        ):(<p>something went wrong</p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Store;
