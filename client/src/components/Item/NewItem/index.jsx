import React, { useState } from 'react';
import { NavLink, Route, Switch } from "react-router-dom";
import './AddItem.css';
import axios from 'axios'
import { API_URL } from '../../../actions/type'
export default function NewItem() {
    const [data, setData] = useState({
        title: '',
        desc: 0,
        price: '',
        currency: '',
        quantity: '',
        productImage: null,
    })
    const onChangeData = (event) => {
        console.log(event.target.files)
        setData({ ...data, [event.target.name]: event.target.value });
        // if(event.target.name==="name")
        //   setData({...data,name:event.target.value});
        // else if(event.target.name==="price")
        //   setData({...data,price:event.target.value});
        if (event.target.name === "productImage")
            setData({ ...data, productImage: event.target.files[0] })
    }
    console.log(data)
    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append('title', data.title)
            formData.append('desc', data.desc);
            formData.append('price', data.price);
            formData.append('currency', data.currency);
            formData.append('quantity', data.quantity)
            formData.append('productImage', data.productImage)
            const response = await axios.post(`${API_URL}/api/products/addproduct`, formData);

            console.log(response);

        } catch (error) {

        }
    }
    const onChangMessage = () => {
        alert("Đã thêm thành công")
    }
    return (
        <div>
            {"admin" === "admin" ? (

                <div>
                    <div id="root">
                        <div className="App">

                            <div className="admin">
                                <div className="nav-menu-mobile">
                                    <i className="fas fa-bars text-black" />
                                </div>

                                <form onSubmit={onSubmit} className="margin-top-0 form-custom">
                                    <div className="Title-item">
                                        <h1>Add Items</h1>
                                    </div>
                                    <div className="container">
                                        <input
                                            type="text"
                                            placeholder="Title"
                                            name="title"
                                            required minlength="8" maxlength="60"
                                            onChange={onChangeData}
                                        />
                                        {/* <input
                                            type="text"
                                            placeholder="Currency"
                                            select name="currency" id ="currency"
                                            required
                                            onChange={onChangeData}
                                        /> */}
                                        <select name="currency" id="currency">
                                            <option value="USD">USD</option>
                                            <option value="VNĐ">VND</option>
                                        </select>

                                        <input
                                            type="number"
                                            placeholder="Nhập giá bán"
                                            name="price"
                                            required
                                            onChange={onChangeData}
                                        />
                                        <input
                                            type="number"
                                            placeholder="Nhập số lượng"
                                            name="quantity"
                                            required
                                            onChange={onChangeData}
                                        />
                                        <textarea
                                            placeholder="Description"
                                            cols={30}
                                            rows={5}
                                            name="desc"
                                            defaultValue={""}
                                            onChange={onChangeData}
                                        />


                                        <input type="file" name="productImage" placeholder="Upload an image"
                                            onChange={onChangeData} accept="image/png, image/gif, image/jpeg"
                                        />
                                        <button type="submit" onClick={onChangMessage} >Post It</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="swal-overlay" tabIndex={-1}>
                        <div className="swal-modal" role="dialog" aria-modal="true">
                            <div className="swal-icon swal-icon--success">
                                <span className="swal-icon--success__line swal-icon--success__line--long" />
                                <span className="swal-icon--success__line swal-icon--success__line--tip" />
                                <div className="swal-icon--success__ring" />
                                <div className="swal-icon--success__hide-corners" />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div classNameName="not-view">
                    <p>Bạn ko có quyền xem trang này</p>
                </div>
            )}

        </div>
    );
}
