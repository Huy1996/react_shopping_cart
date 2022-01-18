import React from 'react';
import {Route, Routes} from "react-router-dom";
import CartScreen from "../screens/CartScreen";
import ProductScreen from "../screens/ProductScreen";
import SigninScreen from "../screens/SigninScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ShippingAddressScreen from "../screens/ShippingAddressScreen";
import PaymentMethodScreen from "../screens/PaymentMethodScreen";
import PlaceOrderScreen from "../screens/PlaceOrderScreen";
import OrderScreen from "../screens/OrderScreen";
import OrderHistoryScreen from "../screens/OrderHistoryScreen";
import SearchScreen from "../screens/SearchScreen";
import Private from "./Private";
import ProfileScreen from "../screens/ProfileScreen";
import MapScreen from "../screens/MapScreen";
import Admin from "./Admin";
import SupportScreen from "../screens/SupportScreen";
import DashboardScreen from "../screens/DashboardScreen";
import UserListScreen from "../screens/UserListScreen";
import UserEditScreen from "../screens/UserEditScreen";
import ProductListScreen from "../screens/ProductListScreen";
import OrderListScreen from "../screens/OrderListScreen";
import ProductEditScreen from "../screens/ProductEditScreen";
import HomeScreen from "../screens/HomeScreen";
import UserDashboardScreen from "../screens/UserDashboardScreen";
import ProductCreateScreen from "../screens/ProductCreateScreen";

export default function ScreenContainer(props) {
    return (
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
            <Route path='/userdashboard'                                                                                                           element={<Private><UserDashboardScreen/></Private>}    />
            <Route path='/userdashboard/:id'                                                                                                       element={<Admin><UserDashboardScreen/></Admin>}  exact />
            <Route path='/support'                                                                                                                 element={<Admin><SupportScreen/></Admin>}              />
            <Route path='/dashboard'                                                                                                               element={<Admin><DashboardScreen/></Admin>}            />
            <Route path='/userlist'                                                                                                                element={<Admin><UserListScreen/></Admin>}             />
            <Route path='/userlist/pageNumber/:pageNumber'                                                                                         element={<Admin><UserListScreen/></Admin>}             />
            <Route path='/user/:id/edit'                                                                                                           element={<Admin><UserEditScreen/></Admin>}       exact />
            <Route path='/productlist/pageNumber/:pageNumber'                                                                                      element={<Admin><ProductListScreen/></Admin>}          />
            <Route path='/orderlist/pageNumber/:pageNumber'                                                                                        element={<Admin><OrderListScreen/></Admin>}            />
            <Route path='/product/:id/edit'                                                                                                        element={<Admin><ProductEditScreen/></Admin>}    exact />
            <Route path='/product/create'                                                                                                          element={<Admin><ProductCreateScreen/></Admin>}        />
            <Route path="/"                                                                                                                        element={<HomeScreen/>}                          exact />
        </Routes>
    );
}