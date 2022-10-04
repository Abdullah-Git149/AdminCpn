import React from 'react'
import Nav from './Nav'
import Sidebar from './Sidebar'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from '../../pages/Login';
import { useSelector } from 'react-redux'
import { getUserStatus, getUserToken } from "../../store/slices/userSlice"
import Dashboard from '../../pages/Dashboard';
import Userlist from '../../pages/UserList';
import BusinessList from '../../pages/BusinessList';
import CouponList from '../../pages/CouponList';
import RedemptionHistory from '../../pages/RedemptionHistory';
import TermsAndConditions from '../../pages/TermsAndConditions';
import PrivacyPolicy from '../../pages/PrivacyPolicy'; 
import CouponDetails from '../../pages/CouponDetails';
import RedemptionDetails from '../../pages/RedemptionDetails'; 
import Spinner from '../Spinner';

const Layout = () => {
    const status=useSelector(getUserStatus)
    const authToken = useSelector(getUserToken) 
    return (
        <>
        {status == 'loading' ? <Spinner /> : <></>}
            <div className={!authToken ? "" : "wrapper"}>
                <BrowserRouter>
                    {authToken ? <>
                        <Sidebar />
                        <div style={{ width: "100%" }}>
                            <Nav />
                            <Routes>
                                <Route path="*" element={<Navigate to="/admin/dashboard" />} />
                                <Route path="/admin/dashboard" exact element={<Dashboard />} />
                                <Route path="/admin/userlist" exact element={<Userlist />} />
                                <Route path="/admin/businesslist" exact element={<BusinessList />} />
                                <Route path="/admin/couponlist" exact element={<CouponList />} />
                                <Route path="/admin/redemptionhistory" exact element={<RedemptionHistory />} />
                                <Route path="/admin/termsandconditions" exact element={<TermsAndConditions />} />
                                <Route path="/admin/privacypolicy" exact element={<PrivacyPolicy />} /> 
                                <Route path="/admin/couponlist/details/" exact element={<CouponDetails />} /> 
                                <Route path="/admin/redemptionhistory/details/" exact element={<RedemptionDetails />} /> 
                            </Routes>
                        </div>
                    </> :
                        <>
                            <Routes>
                                <Route path="*" element={<Navigate to="/admin/" />} />
                                <Route path="/admin/" exact element={<Login />} />
                            </Routes>
                        </>
                    }
                </BrowserRouter>
            </div>
        </>
    )
}

export default Layout