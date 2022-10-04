import React, { useEffect, useState } from 'react'
 import coup from '../assets/images/coup.png'
import { useSelector, useDispatch } from 'react-redux';
import { couponCounts, getCouponCount,dashboardData ,getDashboardData} from '../store/slices/couponSlice';  
import moment from 'moment';
import { getTotalCouponChart, getRedeemedCouponChart, getPresentedCouponChart } from '../store/slices/userSlice'; 
const currYear = moment(new Date()).format("YYYY")
const monthData = [
  { "id": 1, category: "Select Month", value: "" },
  { "id": 1, category: "January", value: `${currYear}-01` },
  { "id": 2, category: "Febuary", value: `${currYear}-02` },
  { "id": 3, category: "March", value: `${currYear}-03` },
  { "id": 4, category: "April", value: `${currYear}-04` },
  { "id": 5, category: "May", value: `${currYear}-05` },
  { "id": 6, category: "June", value: `${currYear}-06` },
  { "id": 7, category: "July", value: `${currYear}-07` },
  { "id": 8, category: "August", value: `${currYear}-08` },
  { "id": 9, category: "September", value: `${currYear}-09` },
  { "id": 10, category: "October", value: `${currYear}-10` },
  { "id": 11, category: "November", value: `${currYear}-11` },
  { "id": 12, category: "December", value: `${currYear}-12` }
]
const Dashboard = () => {
  const [getMonth, setGetMonth] = useState('')
  const [getRedeemedMonth, setGetRedeemedMonth] = useState('')
  const counts = useSelector(getCouponCount)

  const dashboardDataa = useSelector(getDashboardData)
  const dispatch = useDispatch()
 

  console.log("=>==========" , dashboardDataa)
  // async function getLineChart() {
  //   try {
  //     await dispatch(getTotalCouponChart({ month: getMonth })).unwrap()
  //   } catch (rejectedValueOrSerializedError) {
  //     console.log(rejectedValueOrSerializedError)
  //   }
  // }
  // async function getPieChart() {
  //   try {
  //     await dispatch(getPresentedCouponChart()).unwrap()
  //   } catch (rejectedValueOrSerializedError) {
  //     console.log(rejectedValueOrSerializedError)
  //   }
  // }
  // async function getHorizontalChart() {
  //   try {
  //     await dispatch(getRedeemedCouponChart({ month: getRedeemedMonth })).unwrap()
  //   } catch (rejectedValueOrSerializedError) {
  //     console.log(rejectedValueOrSerializedError)
  //   }
  // }
  useEffect(() => {
    async function coupons() {
      try {
        await dispatch(dashboardData()).unwrap()
      } catch (rejectedValueOrSerializedError) {
        console.log(rejectedValueOrSerializedError)
      }
    }
    let mount = true
    if (mount) {
      coupons();
      // getLineChart();
      // getPieChart();
      // getHorizontalChart();
    }
    return () => {
      mount = false
    }
  }, [dispatch])


  useEffect(() => {
    let mount = true
    if (mount) {
      // getHorizontalChart();
    }
    return () => {
      mount = false
    }
  }, [getRedeemedMonth])

  useEffect(() => { 
    let mount = true
    if (mount) {
      // getLineChart();
    }
    return () => {
      mount = false
    }
  }, [getMonth])

  return (
    <> 
      <div>
        <section className="index-sec-1">
          <div className="container type-2">
            <div className="row coupon-row justify-content-center">
              <div className=" col-md-4 col-lg-4 col-sm-12">
                <div className="coupon-wrapper col-grey">
                  <div className="coupons-left">
                    <img src={coup} alt="" className="img-fluid" />
                  </div>
                  <div className="coupons-right">
                    <p className="coupon-text">Total Users</p>
                    <p className="coupon-price-text">{dashboardDataa?.users}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-lg-4 col-sm-12">
                <div className="coupon-wrapper col-orange">
                  <div className="coupons-left">
                    <img src={coup} alt="" className="img-fluid" />
                  </div>
                  <div className="coupons-right">
                    <p className="coupon-text">Total Business</p>
                    <p className="coupon-price-text">{dashboardDataa?.business}</p>
                  </div>
                </div>
              </div>
              <div className=" col-md-4 col-lg-4 col-sm-12">
                <div className="coupon-wrapper col-red">
                  <div className="coupons-left">
                    <img src={coup} alt="" className="img-fluid" />
                  </div>
                  <div className="coupons-right">
                    <p className="coupon-text">Total Earning</p>
                    <p className="coupon-price-text">{counts?.redeemedCoupons}</p>
                  </div>
                </div>
              </div>
              <div className=" col-md-4 col-lg-4 col-sm-12">
                <div className="coupon-wrapper col-red">
                  <div className="coupons-left">
                    <img src={coup} alt="" className="img-fluid" />
                  </div>
                  <div className="coupons-right">
                    <p className="coupon-text">Total Coupons</p>
                    <p className="coupon-price-text">{dashboardDataa?.coupons}</p>
                  </div>
                </div>
              </div>
              <div className=" col-md-4 col-lg-4 col-sm-12">
                <div className="coupon-wrapper col-grey">
                  <div className="coupons-left">
                    <img src={coup} alt="" className="img-fluid" />
                  </div>
                  <div className="coupons-right">
                    <p className="coupon-text abc" >Presented Coupons</p>  
                    <p className="coupon-price-text">{dashboardDataa?.coupons}</p>
                  </div>
                </div>
              </div>
              <div className=" col-md-4 col-lg-4 col-sm-12">
                <div className="coupon-wrapper col-orange">
                  <div className="coupons-left">
                    <img src={coup} alt="" className="img-fluid" />
                  </div>
                  <div className="coupons-right">
                    <p className="coupon-text">Redeemed Presented</p>
                    <p className="coupon-price-text">{dashboardDataa?.claimCoupons}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <section className="index-sec-2">
          <div className="container type-2">
            <div className="graph-wrapper">
              <div className="row">
                <div className="col-12 col-md-12 col-lg-7">
                  <div className="graph-inner-wrap">
                    <div className="graph-head graph-wrapped">
                      <div className="input-wrapper">
                        <div className="date-pickers">
                          <select id="selectCountry" className='calendar datepicker' name="selectCountry" onChange={(e) => setGetMonth(e.target.value)} >
                            {monthData?.map((item, i) =>
                              <option key={i} value={item?.value}>{item?.category}</option>
                            )}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="graph-wrap">
                      <div className="lineChartWrap mb-4">
                        <div className="bar">
                          <p className="graphTitle">Total Coupons</p>
                        </div>
                        <div className="chartWrap w-100">
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-12 col-lg-5">
                  <div className="graph-inner-wrap"> 
                    <div className="graph-wrap" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div className="lineChartWrap mb-4">
                        <div className="bar">
                          <p className="graphTitle">Coupons Presented</p>
                        </div>
                        <div style={{ width: 400, height: 400 }}>
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="graph-wraps-two">
                <div className="row">
                  <div className="col-12 col-md-8 col-lg-10">
                    <div className="graph-inner-wrap">
                      <div className="graph-head">
                        <div className="input-wrapper">
                          <div className="date-pickers">
                            <select id="selectCountry" className='calendar datepicker' name="selectCountry" onChange={(e) => setGetRedeemedMonth(e.target.value)} >
                              {monthData?.map((item, i) =>
                                <option key={i} value={item?.value}>{item?.category}</option>
                              )}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="graph-wrap">
                        <div className="lineChartWrap mb-3">
                          <div className="bar">
                            <p className="graphTitle">Redeemed Coupons</p>
                          </div>
                          <div className="chartWrap horizontal-wrap w-100">
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
      </div>
    </>
  )
}

export default Dashboard