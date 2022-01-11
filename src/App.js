import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Link, Routes} from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import { useDispatch, useSelector } from "react-redux";
import SigninScreen from "./screens/SigninScreen";
import { signout } from "./actions/userAction";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import Private from "./components/Private";
import Admin from "./components/Admin";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import SearchBox from "./components/SearchBox";
import SearchScreen from "./screens/SearchScreen";
import MapScreen from "./screens/MapScreen";
import DashboardScreen from "./screens/DashboardScreen";
import SupportScreen from "./screens/SupportScreen";
import ChatBox from "./components/ChatBox";
import SideBar from "./components/SideBar";

function App() {

    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;
    const userSignin = useSelector((state) => state.userSignin);
    const {userInfo} = userSignin;

    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

    const dispatch = useDispatch()

    const signoutHandler = () => {
        dispatch(signout())
    }

    return (
        <BrowserRouter>
            <div className="grid-container">
                <header className="row">
                    <div>
                        <button
                            type="button"
                            className="open-sidebar"
                            onClick={() => setSidebarIsOpen(true)}
                        >
                            <i className="fa fa-bars" />
                        </button>
                        <Link className="brand" to="/">
                            CHTQ Shopping
                        </Link>
                    </div>
                    <div>
                        <SearchBox />
                    </div>
                    <div>
                        <Link to="/cart">
                            Cart
                            {cartItems.length > 0 && (
                                <span className="badge">{cartItems.length}</span>
                            )}
                        </Link>
                        {
                            userInfo ? (
                                <div className="dropdown">
                                    <Link to="#">
                                        {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                                    </Link>
                                    <ul className="dropdown-content">
                                        <li>
                                            <Link to='/profile'>
                                                User Profile
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to='/orderhistory'>
                                                Order History
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#signout" onClick={signoutHandler}>
                                                Sign Out
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                            ) : (
                                <Link to="/signin">Sign In</Link>
                            )
                        }
                        {
                            userInfo && userInfo.isAdmin && (
                                <div className="dropdown">
                                    <Link to="#admin">
                                        Admin <i className="fa fa-caret-down" />
                                    </Link>
                                    <ul className="dropdown-content">
                                        <li>
                                            <Link to="/dashboard">
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/productlist/pageNumber/1">
                                                Products
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/orderlist/pageNumber/1">
                                                Orders
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/userlist/pageNumber/1">
                                                Users
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/support">
                                                Support
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            )
                        }
                    </div>
                </header>
                <SideBar
                    open={sidebarIsOpen}
                    closeSideBar={close => setSidebarIsOpen(close)}
                />
                <main>
                    <Routes>
                        <Route path="/cart"                                                                                                                    element={<CartScreen/>}                                />
                        <Route path="/cart/:id"                                                                                                                element={<CartScreen/>}                                />
                        <Route path="/product/:id"                                                                                                             element={<ProductScreen/>}                       exact />
                        <Route path="/signin"                                                                                                                  element={<SigninScreen/>}                              />
                        <Route path="/register"                                                                                                                element={<RegisterScreen/>}                            />
                        <Route path="/shipping"                                                                                                                element={<ShippingAddressScreen/>}                     />
                        <Route path="/payment"                                                                                                                 element={<PaymentMethodScreen/>}                       />
                        <Route path="/placeorder"                                                                                                              element={<PlaceOrderScreen/>}                          />
                        <Route path="/order/:id"                                                                                                               element={<OrderScreen/>}                               />
                        <Route path="/orderhistory"                                                                                                            element={<OrderHistoryScreen/>}                        />
                        <Route path="/search/name"                                                                                                             element={<SearchScreen/>}                        exact />
                        <Route path="/search/name/:name"                                                                                                       element={<SearchScreen/>}                        exact />
                        <Route path="/search/category/:category"                                                                                               element={<SearchScreen/>}                        exact />
                        <Route path="/search/brand/:brand"                                                                                                     element={<SearchScreen/>}                        exact />
                        <Route path="/search/category/:category/brand/:brand/name/:name"                                                                       element={<SearchScreen/>}                        exact />
                        <Route path="/search/category/:category/brand/:brand/name/:name/min/:min/max/:max"                                                     element={<SearchScreen/>}                        exact />
                        <Route path="/search/category/:category/brand/:brand/name/:name/min/:min/max/:max/rating/:rating"                                      element={<SearchScreen/>}                        exact />
                        <Route path="/search/category/:category/brand/:brand/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"  element={<SearchScreen/>}                        exact />
                        <Route path='/profile'                                                                                                                 element={<Private><ProfileScreen/></Private>}          />
                        <Route path='/map'                                                                                                                     element={<Private><MapScreen/></Private>}              />
                        <Route path='/support'                                                                                                                 element={<Admin><SupportScreen/></Admin>}              />
                        <Route path='/dashboard'                                                                                                               element={<Admin><DashboardScreen/></Admin>}            />
                        <Route path='/userlist/pageNumber/:pageNumber'                                                                                         element={<Admin><UserListScreen/></Admin>}             />
                        <Route path='/user/:id/edit'                                                                                                           element={<Admin><UserEditScreen/></Admin>}       exact />
                        <Route path='/productlist/pageNumber/:pageNumber'                                                                                      element={<Admin><ProductListScreen/></Admin>}          />
                        <Route path='/orderlist/pageNumber/:pageNumber'                                                                                        element={<Admin><OrderListScreen/></Admin>}            />
                        <Route path='/product/:id/edit'                                                                                                        element={<Admin><ProductEditScreen/></Admin>}    exact />
                        <Route path="/"                                                                                                                        element={<HomeScreen/>}                          exact />
                    </Routes>
                </main>
                <footer className="row center">
                    {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
                    <p>Copyright <i className={"fa fa-copyright"}/> 2021-2022 CHTQ, Inc - All Right Reserved</p>
                </footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
