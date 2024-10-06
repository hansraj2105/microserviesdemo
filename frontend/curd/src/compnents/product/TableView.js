import React, {useEffect, useState} from 'react';
import './TableView.css';
import axios from "axios";
const BASE_URL = "http://localhost:8111/"
const    header= { Authorization: `Bearer ${localStorage.getItem("token")}`} // Pass the Bearer token in the request header

const TableView = ({stateChanger}) => {

    const [data, setData] = useState([]);
    const onLoad=()=>{
        axios
            .get(BASE_URL+'rest/products',{headers:header})
            .then((response) => {
                console.log(response)
                setData(response.data);
            })
            .catch((error) => {
                console.error('Error creating product:', error);
            });
    }
    useEffect(()=>{
        onLoad()
    },[]);


    const [showModal, setShowModal] = useState(false);

    const handleDelete = (id) => {
        if (window.confirm(`Are you sure you want to delete product with ID: ${id}?`)) {
            setData(data.filter((item) => item.id !== id));
            axios
                .delete(BASE_URL+'rest/product/'+id,{headers:header})
                .then((response) => {
                    console.log(response)
                })
                .catch((error) => {
                    console.error('Error creating product:', error);
                });
        }
    };

    const [product, setProduct] = useState({
        id:0,
        name: '',
        category: '',
        description: '',
        price: 0,
    });
    const handleEdit = (id) => {
        setProduct({...product,id: id});
        setShowModal(true)
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };
    const  handleSubmit = (e)=>{
        e.preventDefault();
        axios
            .post(BASE_URL+'rest/product', product,{headers:header})
            .then((response) => {
                if(product.id==0){
                data.push(response.data);
                setData(data);
                }else {
                    setShowModal(false)
                    onLoad()
                }
                setProduct({id:0, name: '', category: '', description: '', price: 0 });
            })
            .catch((error) => {
                console.error('Error creating product:', error);
            });
    }



    return (
        <div className="container">
            <button className="logout-button"  style={{textAlign:"right"}} onClick={() =>{ localStorage.clear(); stateChanger(false);}}>Logout</button>

            <div className="header">
                <h2>Products List</h2>
                <button className="add-button" onClick={() => setShowModal(true)}>+ Add Product</button>
            </div>
            <table className="styled-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Desc</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.category}</td>
                        <td>{item.price}</td>
                        <td>{item.description}</td>
                        <td>
                            <button className="action-button edit" onClick={() => handleEdit(item.id)}>
                                ✎ Edit
                            </button>
                            <button className="action-button delete" onClick={() => handleDelete(item.id)}>
                                ✗ Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Modal for adding a product */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Add New Product</h3>
                        <form className="labelAlgin">
                            <label className="labelAlgin">Name:</label>
                            <input  type="text"
                                    id="name"
                                    name="name"
                                    value={product.name}
                                    onChange={handleChange}
                                    placeholder="Enter product name"
                                    className="form-input"
                                    required
                            />

                            <label className="labelAlgin">Category:</label>
                            <input  type="text"
                                    id="category"
                                    name="category"
                                    value={product.category}
                                    onChange={handleChange}
                                    placeholder="Enter category"
                                    className="form-input"
                                    required/>

                            <label className="labelAlgin">Description:</label>
                            <textarea  id="description"
                                       name="description"
                                       value={product.description}
                                       onChange={handleChange}
                                       placeholder="Enter product description"
                                       rows="4"
                                       className="form-input"
                                       required />

                            <label className="labelAlgin">Price:</label>
                            <input  type="number"
                                    id="price"
                                    name="price"
                                    value={product.price}
                                    onChange={handleChange}
                                    placeholder="Enter price"
                                    className="form-input"
                                    required/>

                            <div className="modal-actions">
                                <button type="button" className="cancel-button" onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                                <button type="button" onClick={handleSubmit} className="save-button">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TableView;
