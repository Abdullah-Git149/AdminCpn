import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getCoupons, deleteCoupon, allCoupons, getError, getStatus, getBusinessCoupons } from '../store/slices/couponSlice';
import moment from 'moment';
const CouponDetails = () => {
    let { idd } = useParams()

    console.log(idd)
    const location = useLocation()
    const [switchbtn2, setSwitchBtn2] = useState(false)
    const [id, setId] = useState()
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()
    const coupons = useSelector(getCoupons)
    const error = useSelector(getError)

    const couponDelete = async (id) => {
        try {
            await dispatch(deleteCoupon(id)).unwrap()
            setSwitchBtn2(false)
            try {
                await dispatch(allCoupons()).unwrap()
            } catch (rejectedValueOrSerializedError) {
                console.log(rejectedValueOrSerializedError)
            }
        } catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError)
        }
    }
    useEffect(() => {
        async function coupons() {
            try {
                await dispatch(getBusinessCoupons(location?.state)).unwrap()
            } catch (rejectedValueOrSerializedError) {
                console.log(rejectedValueOrSerializedError)
            }
        }
        let mount = true
        if (mount) {
            coupons();
        }
        return () => {
            mount = false
        }
    }, [])
    const coupon = coupons.filter((e) => {
        if (search === '') {
            return e;
        }
        else {
            return e?.couponTitle?.toLowerCase()?.includes(search)
        }
    })
    return (
        <>
            <div className={switchbtn2 ? "modal change-password-modal " : "modal change-password-modal fade"} id="exampleModalCenter" tabIndex={-1} aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style={{ display: switchbtn2 ? "block" : 'none', zIndex: 100 }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <p className="pass-text">Confirmation</p>
                        <button onClick={() => setSwitchBtn2(false)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        <div className="modal-body">
                            <form >
                                <div className="pass-form-wrap" style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                                    <div className="login-button mt-2" style={{ width: "40%" }}>
                                        <button type="button" onClick={() => couponDelete(id)} className="cta-btn col-reds w-100">Delete</button>
                                    </div>
                                    <div className="login-button mt-2" style={{ width: "40%" }} >
                                        <button type="button" onClick={() => setSwitchBtn2(false)} className="cta-btn col-reds w-100">Cancel</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div>
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
                                                    <th scope="col">Brand Image</th>
                                                    <th scope="col">Brand Name</th>
                                                    <th scope="col">Coupon Title</th>
                                                    <th scope="col">Coupon Discount</th>
                                                    <th scope="col">Expiry Date</th>
                                                    {/* <th scope="col" className="border-heading-right">Actions</th> */}
                                                </tr>
                                            </thead>
                                            <tbody className="table-greyy">
                                                {coupon?.length < 1 ?
                                                    <tr >
                                                        <th style={{ borderWidth: 0 }}>{error}
                                                        </th>
                                                    </tr>
                                                    :
                                                    coupon?.map((item, i) =>
                                                        <tr key={i}>
                                                            <th className="table-gen-text" scope="row">{i + 1}</th>
                                                            <td className="table-gen-text"><img src={process.env.REACT_APP_APIURL + `${item.brandImage}`} width="50px" height="50px"/> </td>
                                                            <td className="table-gen-text">{item.brandName}</td>
                                                            <td className="table-gen-text">{item.couponTitle}</td>
                                                            <td className="table-gen-text">{item.discountVoucher}</td>
                                                            <td className="table-gen-text">{moment(item.validTill).format('YYYY-MM-DD')}</td>
                                                            {/* <td>
                                                                <span className="edit-icon">
                                                                    <span style={{ cursor: "pointer", fontWeight: "bold" }}   ><i className="fas fa-eye"></i></span>
                                                                </span>
                                                            </td> */}
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

export default CouponDetails