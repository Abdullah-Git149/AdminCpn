import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getError, getStatus } from '../store/slices/couponSlice';
import moment from 'moment';
import { AllBusiness, blockUnblock, deleteAccount, getAllBusiness } from '../store/slices/userSlice';
import { CSVLink } from "react-csv";

const BusinessList = () => {
    const [switchbtn2, setSwitchBtn2] = useState(false)
    const [id, setId] = useState()
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()
    const business = useSelector(AllBusiness)
    const status = useSelector(getStatus)
    const error = useSelector(getError)
    var csvData = [
        ["Name", "Email", "Verified", "Block", "phone", "Role", "Stripe Id"],
    ]
    business?.map((item) => 
        csvData.push([`${item?.name}`, `${item?.email}`, `${item?.isActive}`, `${item?.block}`, `${item?.phone}`, `${item?.role}`, `${item?.stripe_id}`])
    )
    const openModal = (id) => {
        setSwitchBtn2(true)
        setId(id)
    }
    const accountDelete = async (id) => {
        try {
            await dispatch(deleteAccount(id)).unwrap()
            setSwitchBtn2(false)
            try {
                await dispatch(getAllBusiness()).unwrap()
            } catch (rejectedValueOrSerializedError) {
                console.log(rejectedValueOrSerializedError)
            }
        } catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError)
        }
    }
    const blockUnblockAccount = async (id) => {
        try {
            await dispatch(blockUnblock(id)).unwrap()
            try {
                await dispatch(getAllBusiness()).unwrap()
            } catch (rejectedValueOrSerializedError) {
                console.log(rejectedValueOrSerializedError)
            }
        } catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError)
        }
    }
    useEffect(() => {
        async function business() {
            try {
                await dispatch(getAllBusiness()).unwrap()
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
    const allbusiness = business?.filter((e) => {
        if (search === '') {
            return e;
        }
        else {
            return e?.name?.toLowerCase()?.includes(search)
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
                                        <button type="button" onClick={() => accountDelete(id)} className="cta-btn col-reds w-100">Delete</button>
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
                <section className="excel-sec">
                    <div className="container">
                        <div className="login-button mt-2">
                            {business ?
                                <button className="excel-btn col-reds w-10 pt-1 pb-1">
                                    <CSVLink filename={"Business List.csv"} data={csvData}>Export Excel</CSVLink>
                                </button>
                                : <></>}


                        </div>
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
                                                    <th scope="col">Business Email</th>
                                                    <th scope="col">Joining Date</th>
                                                    <th scope="col" className="border-heading-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="table-greyy">
                                                {allbusiness?.length < 1 ?
                                                    <tr >
                                                        <th style={{ borderWidth: 0 }}>{error}
                                                        </th>
                                                    </tr>
                                                    :
                                                    allbusiness?.map((item, i) =>
                                                        <tr key={i}>
                                                            <th className="table-gen-text" scope="row">{i + 1}</th>
                                                            <td className="table-gen-text">{item.name}</td>
                                                            <td className="table-gen-text">{item.email}</td>
                                                            <td className="table-gen-text">{moment(item.createdAt).format('DD-MMM-YYYY')}</td>
                                                            <td>
                                                                <span className="edit-icon" >
                                                                    <span style={{ cursor: "pointer", fontWeight: "bold" }} onClick={() => openModal(item._id)}  ><i className="fas fa-trash-alt"></i> Delete</span>
                                                                </span>
                                                                <span className="edit-icon">
                                                                    <span style={{ cursor: "pointer", fontWeight: "bold" }} onClick={() => blockUnblockAccount(item._id)}  >{item?.block ? (<i class="fa fa-unlock-alt" aria-hidden="true"></i>) : (<i className="fa fa-solid fa-ban"></i>)} {item?.block ? "Unblock" : "Block"}</span>
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