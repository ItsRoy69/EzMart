import React from "react";

import "./distributorDashboard.css";
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
  MoreVert,
  KeyboardArrowDown,
  KeyboardArrowUp,
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

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { useNavigate } from "react-router-dom";

import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "January", Total: 1200 },
  { name: "February", Total: 2100 },
  { name: "March", Total: 800 },
  { name: "April", Total: 1600 },
  { name: "May", Total: 900 },
  { name: "June", Total: 1700 },
];

const DistributorDashboard = () => {
  const navigateTo = useNavigate();

  const handleLogout = () => {
    navigateTo("/"); 
  };

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

  return (
    <div className="dashboard">
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
            <a href="/products">
              <li>
                <Store className="icon" />
                <span>Products</span>
              </li>
            </a>
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
              <span onClick={handleLogout}>Logout</span>
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
        <div className="charts">
          <div className="featured">
            <div className="top">
              <h1 className="title">Total Revenue</h1>
              <MoreVert fontSize="small" />
            </div>
            <div className="bottom">
              <div className="featuredChart">
                <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
              </div>
              <p className="title">Total sales made today</p>
              <p className="amount">$420</p>
              <p className="description">
                Previous transactions processing. Last payments may not be
                included.
              </p>
              <div className="summary">
                <div className="item">
                  <div className="itemTitle">Today</div>
                  <div className="itemResult negative">
                    <KeyboardArrowDown fontSize="small" />
                    <div className="resultAmount">$1.4k</div>
                  </div>
                </div>
                <div className="item">
                  <div className="itemTitle">Last Week</div>
                  <div className="itemResult positive">
                    <KeyboardArrowUp fontSize="small" />
                    <div className="resultAmount">$12.4k</div>
                  </div>
                </div>
                <div className="item">
                  <div className="itemTitle">Last Month</div>
                  <div className="itemResult positive">
                    <KeyboardArrowUp fontSize="small" />
                    <div className="resultAmount">$6.4k</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="chart">
            <div className="title">Last 6 Months (Revenue)</div>
            <ResponsiveContainer width="100%" aspect={2 / 1}>
              <AreaChart
                width={730}
                height={250}
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="gray" />
                <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="Total"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#total)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
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
};

export default DistributorDashboard;