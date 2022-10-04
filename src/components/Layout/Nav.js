import React, { useContext, useState } from 'react'
import { context } from '../../context/context';
import leftMenu from '../../assets/images/left-menu.png'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout, getProfile } from "../../store/slices/userSlice"
import {
  useNavigate
} from "react-router-dom";
import ChangePassword from '../ChangePassword';
const Nav = () => {
  const { SetToggleButton } = useContext(context);
  const [switchbtn2, setSwitchBtn2] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const profile = useSelector(getProfile)
  const handleLogout = async () => {
    try {
      await dispatch(userLogout()).unwrap()
      navigate("/")
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError)
    }
  }
  return (
    <>
      <div id="content" >
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <div className="left-menu">
              <img src={leftMenu} alt="" onClick={() => SetToggleButton((prev) => !prev)} className="img-fluid mobile-toggle" />
            </div>
            <div className="d-flex align-items-center" >
              <div className="dropdown-wrapper">
                <p className='adminNameDiv'><i class="fa fa-bars" aria-hidden="true"></i> {profile?.email}</p>
                <ul className="drop-down">
                  <li><a style={{ cursor: "pointer" }} >{profile?.name}</a></li>
                  <li  onClick={() => setSwitchBtn2(true)}><a style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target="#exampleModalCenter">Change Password</a></li>
                  <li onClick={() => handleLogout()}><a style={{ cursor: "pointer" }}>Logout</a></li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <ChangePassword switchbtn2={switchbtn2} setSwitchBtn2={setSwitchBtn2} />
    </>
  )
}

export default Nav