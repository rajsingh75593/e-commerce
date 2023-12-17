import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'


export default function AdminHome() {
    var [user, setUser] = useState({
        pic: ""
    })
    var navigate = useNavigate()

    async function getApiData() {
        var response = await fetch("/user", {
            method: "get",
            headers: {
                "content-type": "application/json",
            }
        })
        response = await response.json()
        var item = response.find((item) => item.username === localStorage.getItem("username"))
        if (item) {
            setUser(item)
        }
        else
            navigate("/login")
    }
    useEffect(() => {
        getApiData()
    }, [])
    return (
        <>
            {/* <!-- breadcrumb-section --> */}
            <div className="breadcrumb-section breadcrumb-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 text-center">
                            <div className="breadcrumb-text">
                                <h1>Admin Sectoin</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- end breadcrumb section --> */}
            <div className="container-fluid my-2">
                <div className="row">
                    <div className="col-md-2">
                        <Sidebar />
                    </div>
                    <div className="col-md-10">
                        <h5 className='bg-primary p-3 text-light text-center rounded'>Admin Home</h5>
                        <div className="row">
                            <div className="col-md-3">
                                {
                                    user.pic ?
                                        <img src={`/assets/img/admin/${user.pic}`} height="235px" width="100%" alt="" /> :
                                        <img src={`/assets/img/admin/noimage-2.jpg`} height="235px" width="100%" alt="" />
                                }
                            </div>
                            <div className="col-md-9">
                                <table className='table table-bordered'>
                                    <tbody>
                                        <tr>
                                            <th>Name</th>
                                            <th>{user.name}</th>
                                        </tr>
                                        <tr>
                                            <th>User Name</th>
                                            <th>{user.username}</th>
                                        </tr>
                                        <tr>
                                            <th>Email</th>
                                            <th>{user.email}</th>
                                        </tr>
                                        <tr>
                                            <th>Phone</th>
                                            <th>{user.phone}</th>
                                        </tr>
                                        <tr>
                                            <th colSpan={2}><Link to="/update-profile" className='btn btn-primary w-100 btn-sm'>Update</Link></th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
