import React, { useEffect, useState } from 'react'
import { useNavigate,useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";

import { getCoupons,  getError, getStatus, getBusinessRedeemedCoupons } from '../store/slices/couponSlice';
import moment from 'moment';
const RedemptionDetails = () => {

    let { idd } = useParams()


    console.log(idd)

    const location=useLocation()
    console.log("loc", location)
    const [switchbtn2, setSwitchBtn2] = useState(false)
    const [switchbtn, setSwitchBtn] = useState(false)
    const [id, setId] = useState()
    const [item, setItem] = useState()
    const [search, setSearch] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const coupons = useSelector(getCoupons)
    const status = useSelector(getStatus)
    const error = useSelector(getError)
 
    useEffect(() => {
        async function coupons() {
            try {
                await dispatch(getBusinessRedeemedCoupons(location?.state)).unwrap()
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
                                                    <th scope="col">Discount</th>
                                                    <th scope="col">Joining Date</th>
                                                    <th scope="col" className="border-heading-right">UserName</th>
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
                                                            <td className="table-gen-text">{item?.user?.name}</td>
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

export default RedemptionDetails