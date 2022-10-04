import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getError, getStatus } from '../store/slices/couponSlice';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { AllBusiness, getAllBusiness } from '../store/slices/userSlice';
import {  getAllCoupons ,allCoupons } from '../store/slices/couponSlice';

const RedemptionHistory = () => {
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()
    const business = useSelector(AllBusiness)
    const allCouponsList = useSelector(getAllCoupons)
    const status = useSelector(getStatus)
    const error = useSelector(getError)
    const navigate = useNavigate()

 

    useEffect(() => {
        async function business() {
            try {
                await dispatch(allCoupons()).unwrap()
            } catch (rejectedValueOrSerializedError) {
                console.log(rejectedValueOrSerializedError)
            }
        }
        let mount = true
        if (mount) {
            business();
        }
        return () => {
            mount = false
        }
    }, [])
    const filterAllCoupons = allCouponsList?.filter((e) => {
        if (search === '') {
            return e;
        }
        else {
            return e?.name?.toLowerCase()?.includes(search)
        }
    })

    console.log("filter" , allCouponsList)
    return (
        <>
            <div>
                <section className="excel-sec">
                    <div className="container">
                    </div>
                </section>
                <section className="coupon-sec-1">
                    <div className="container2">
                        <div className="coupon-list-wrap">
                            <div className="row">
                                <div className="col-12 col-md-12 col-lg-12">
                                    <div className="fieldBox carret-wrapper mb-3" style={{
                                        boxShadow: "0px 0px 10px 0px #9E9E9E"

                                    }} >
                                        <input type="text" placeholder="Search.." onChange={(e) => setSearch(e?.target?.value.toLowerCase())} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="coupon-sec-2">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-12 col-lg-12">
                                <div className="coupon-table-wrapper">
                                    <div className="table-responsive">
                                        <table className="table table-coupon">
                                            <thead className="thead-dark">
                                                <tr className="table-header-wrap">
                                                    <th scope="col" className="border-heading">S. No</th>
                                                    <th scope="col">Business Name</th>
                                                    <th scope="col">Coupon Title</th>
                                                    <th scope="col">Discount</th>
                                                    <th scope="col">Redeemed Date</th>
                                                    <th scope="col" className="border-heading-right">See Redeemed Coupons</th>
                                                </tr>
                                            </thead>
                                            <tbody className="table-greyy">
                                                {filterAllCoupons?.length < 1 ?
                                                    <tr >
                                                        <th style={{ borderWidth: 0 }}>{error}
                                                        </th>
                                                    </tr>
                                                    :
                                                    filterAllCoupons?.map((item, i) =>
                                                        <tr key={i}>
                                                            <th className="table-gen-text" scope="row">{i + 1}</th>
                                                            <td className="table-gen-text">{item.brandName}</td>
                                                            <td className="table-gen-text">{item.couponTitle}</td>
                                                            <td className="table-gen-text">{item.discountVoucher}</td>
                                                    
                                                            <td className="table-gen-text">{moment(item.createdAt).format('DD-MMM-YYYY')}</td>
                                                            <td>
                                                                <span className="edit-icon">
                                                                    <a onClick={() => navigate(`/admin/redemptionhistory/details`, { state: item?.bussinessId })}><i className="fas fa-eye"></i></a>
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default RedemptionHistory