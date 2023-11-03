import React, { useState, useEffect } from "react";
import "./distributorProduct.css";

import Widget from "../../../components/widgets/Widget";

import {
  Dashboard,
  PersonOutline,
  Store,
  CreditCard,
  LocalShipping,
  InsertChart,
  NotificationsNone,
  PsychologyOutlined,
  SettingsApplications,
  AccountCircleOutlined,
  ExitToApp,
  SearchOutlined,
  LanguageOutlined,
  DarkModeOutlined,
  NotificationsNoneOutlined,
  ChatBubbleOutlineOutlined,
} from "@mui/icons-material";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import "react-circular-progressbar/dist/styles.css";
import axios from "axios";

const DistributorProduct = ({ onAddItem }) => {
  const [newItem, setNewItem] = useState({
    title: "",
    name: "",
    quantity: 0,
    quality: "",
    description: "",
    image: null,
    price: 0,
  });

  const [items, setItems] = useState([]);

  const rows = [
    {
      id: 1143155,
      product: "Acer Nitro 5",
      img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "John Smith",
      date: "1 March",
      amount: 785,
      method: "Cash on Delivery",
      status: "Approved",
    },
    {
      id: 2235235,
      product: "Playstation 5",
      img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Michael Doe",
      date: "1 March",
      amount: 900,
      method: "Online Payment",
      status: "Pending",
    },
    {
      id: 2342353,
      product: "Redragon S101",
      img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "John Smith",
      date: "1 March",
      amount: 35,
      method: "Cash on Delivery",
      status: "Pending",
    },
    {
      id: 2357741,
      product: "Razer Blade 15",
      img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Jane Smith",
      date: "1 March",
      amount: 920,
      method: "Online",
      status: "Approved",
    },
    {
      id: 2342355,
      product: "ASUS ROG Strix",
      img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Harold Carol",
      date: "1 March",
      amount: 2000,
      method: "Online",
      status: "Pending",
    },
  ];

  useEffect(() => {
    // Fetch the userid from the server
    const fetchUserId = async () => {
      try {
        const response = await axios.get("http://localhost:5000/auth/signin");
        const userid = response.data.userid;
        setNewItem({ ...newItem, title: userid });
      } catch (error) {
        console.error("Error fetching userid:", error);
      }
    };

    fetchUserId();
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewItem({ ...newItem, image: file });
  };

  const handleAddItem = async () => {
    try {
      const response = await sendItemToServer(newItem);
      if (response.data) {
        onAddItem(response.data);
        setNewItem({
          title: "", // Clear the title
          name: "",
          quantity: 0,
          quality: "",
          description: "",
          image: null,
          price: 0,
        });
      }
    } catch (error) {
      // Handle any errors, e.g., show an error message to the user.
      console.error("Error sending item to the server:", error);
    }
  };

  const sendItemToServer = async (item) => {
    const formData = new FormData();
    formData.append("title", item.title);
    formData.append("products", JSON.stringify([{  // Sending products as a JSON string
      name: item.name,
      quantity: item.quantity,
      quality: item.quality,
      description: item.description,
      image: item.image,
      price: item.price,
    }]));

    try {
      const response = await axios.post(
        "http://localhost:5000/posts/distributorproduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="DistributorProduct">
      <div className="sidebar">
        <div className="top">
          <span className="logo">EzMart</span>
        </div>
        <hr />
        <div className="center">
          <ul className="menu">
            <p className="title">MAIN</p>
            <li>
              <Dashboard className="icon" />
              <span>Dashboard</span>
            </li>
            <p className="title">LISTS</p>
            <li>
              <PersonOutline className="icon" />
              <span>Users</span>
            </li>
            <li>
              <Store className="icon" />
              <span>Products</span>
            </li>
            <li>
              <CreditCard className="icon" />
              <span>Orders</span>
            </li>
            <li>
              <LocalShipping className="icon" />
              <span>Delivery</span>
            </li>
            <p className="title">USEFUL</p>
            <li>
              <InsertChart className="icon" />
              <span>Stats</span>
            </li>
            <li>
              <NotificationsNone className="icon" />
              <span>Notifications</span>
            </li>
            <p className="title">SERVICE</p>
            {/* <li>
              <SettingsSystemDaydreamOutlined className="icon" />
              <span>System Health</span>
            </li> */}
            <li>
              <PsychologyOutlined className="icon" />
              <span>Logs</span>
            </li>
            <li>
              <SettingsApplications className="icon" />
              <span>Settings</span>
            </li>
            <p className="title">USER</p>
            <li>
              <AccountCircleOutlined className="icon" />
              <span>Profile</span>
            </li>
            <li>
              <ExitToApp className="icon" />
              <span>Logout</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="container">
        <div className="navbar">
          <div className="wrapper">
            <div className="search">
              <input type="text" placeholder="Search..." />
              <SearchOutlined />
            </div>
            <div className="items">
              <div className="item">
                <LanguageOutlined className="icon" />
                <span>English</span>
              </div>
              <div className="item">
                <DarkModeOutlined className="icon" />
              </div>
              {/* <div className="item">
                <FullscreenExitOutlined className="icon" />
              </div> */}
              <div className="item">
                <NotificationsNoneOutlined className="icon" />
                <div className="counter">1</div>
              </div>
              <div className="item">
                <ChatBubbleOutlineOutlined className="icon" />
                <div className="counter">2</div>
              </div>
              {/* <div className="item">
                <ListOutlined className="icon" />
              </div> */}
              <div className="item">
                <img
                  src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                  className="avatar"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="additems">
          <h1>Add Items</h1>
          <div className="item-form">
            <input
              type="text"
              name="name"
              placeholder="Item Name"
              value={newItem.name}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={newItem.quantity}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="quality"
              placeholder="Quality"
              value={newItem.quality}
              onChange={handleInputChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={newItem.description}
              onChange={handleInputChange}
            />
            <input type="file" name="image" onChange={handleImageChange} />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={newItem.price}
              onChange={handleInputChange}
            />
            <button onClick={handleAddItem}>Add Item</button>
          </div>
          <div className="item-list">
            <h2>Items List</h2>
            <ul>
              {items.map((item, index) => (
                <li key={index}>
                  <img src={URL.createObjectURL(item.image)} alt={item.name} />
                  <p>Name: {item.name}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Quality: {item.quality}</p>
                  <p>Description: {item.description}</p>
                  <p>Price: ${item.price}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="listContainer">
          <div className="listTitle">Updated Products</div>
          <TableContainer component={Paper} className="table">
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell className="tableCell">Tracking ID</TableCell>
                  <TableCell className="tableCell">Product</TableCell>
                  <TableCell className="tableCell">Customer</TableCell>
                  <TableCell className="tableCell">Date</TableCell>
                  <TableCell className="tableCell">Amount</TableCell>
                  <TableCell className="tableCell">Payment Method</TableCell>
                  <TableCell className="tableCell">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="tableCell">{row.id}</TableCell>
                    <TableCell className="tableCell">
                      <div className="cellWrapper">
                        <img src={row.img} alt="image" className="image" />
                        {row.product}
                      </div>
                    </TableCell>
                    <TableCell className="tableCell">{row.customer}</TableCell>
                    <TableCell className="tableCell">{row.date}</TableCell>
                    <TableCell className="tableCell">{row.amount}</TableCell>
                    <TableCell className="tableCell">{row.method}</TableCell>
                    <TableCell className="tableCell">
                      <span className={`status ${row.status}`}>
                        {row.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default DistributorProduct;
