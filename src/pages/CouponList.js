import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getError, getStatus } from '../store/slices/couponSlice';
import moment from 'moment';
import {useNavigate } from 'react-router-dom';
import { AllBusiness,  getAllBusiness } from '../store/slices/userSlice';
import { getAllCoupons ,allCoupons} from '../store/slices/couponSlice';

const BusinessList = () => {
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()
    const business = useSelector(AllBusiness)
    const status = useSelector(getStatus)
    const error = useSelector(getError)
    const coupons = useSelector(getAllCoupons)
    const navigate=useNavigate()

    console.log(coupons)
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
    const filteredCoupons = coupons?.filter((e) => {
        if (search === '') {
            return e;
        }
        else {
            return e?.name?.toLowerCase()?.includes(search)
        }
    })
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
                                                    <th scope="col">Business Category</th>
                                                    <th scope="col">Business Title</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col" className="border-heading-right">Coupons Detail</th>
                                                </tr>
                                            </thead>
                                            <tbody className="table-greyy">
                                                {filteredCoupons?.length < 1 ?
                                                    <tr >
                                                        <th style={{ borderWidth: 0 }}>{error}
                                                        </th>
                                                    </tr>
                                                    :
                                                    filteredCoupons?.map((item, i) =>
                                                        <tr key={i}>
                                                            <th className="table-gen-text" scope="row">{i + 1}</th>
                                                            <td className="table-gen-text">{item.brandName}</td>
                                                            <td className="table-gen-text">{item.brandCategory}</td>
                                                            <td className="table-gen-text">{item.couponTitle}</td>
                                                            <td className="table-gen-text">{moment(item.createdAt).format('DD-MMM-YYYY')}</td>
                                                            <td>
                                                                <span className="edit-icon">
                                                                    <a onClick={() =>navigate(`/admin/couponlist/details/`,{state:item?.bussinessId})}><i className="fas fa-eye"></i></a>
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

export default BusinessList