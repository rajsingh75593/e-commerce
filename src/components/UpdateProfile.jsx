import React, { useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

export default function UpdateProfile() {
    let [data, setData] = useState({})
    let navigate = useNavigate()

    function getInputData(e) {
        let { name, value } = e.target
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }
    function getInputFile(e) {
        let { name, files } = e.target
        setData((old) => {
            return {
                ...old,
                [name]: files[0].name
            }
        })
    }
    async function postData(e) {
        e.preventDefault()
        let response = await fetch("/user/"+localStorage.getItem("userid"), {
            method: "put",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({...data})
        })
        response = await response.json()
        if(data.role==="Admin")
        navigate("/admin") 
        else
        navigate("/profile") 
    }
    async function getApiData() {
        let response = await fetch("/user/" + localStorage.getItem("userid"), {
            method: "get",
            headers: {
                "content-type": "application/json"
            }
        })
        response = await response.json()
        setData(response)
    }
    useEffect(() => {
        getApiData()
    }, [])
    return (
        <>
            {/* breadcrumb-section  */}
            <div className="breadcrumb-section breadcrumb-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 text-center">
                            <div className="breadcrumb-text">
                                <h1><Link to="/">Home</Link><i className="fa fa-arrow-right mx-2"></i>{localStorage.getItem("role") === "Admin" ? <Link to="/admin" className='text-light'>Profile</Link> : <Link to="/admin">Profile</Link>}<i className="fa fa-arrow-right mx-2"></i>Update</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* end breadcrumb section  */}
            <div className="container my-5 w-100">
                <div className="w-75 m-auto">
                    <h4 className='text-center text-light p-2 breadcrumb-section '><span className='text-warning'>Update</span> Profile</h4>
                    <form onSubmit={postData}>
                        <div className="row">
                            <div className="col-md-6 mb-2">
                                <label>Name</label>
                                <input type="text" onChange={getInputData} name='name' placeholder='Name :' className='form-control' value={data.name} />
                            </div>
                            <div className="col-md-6 mb-2">
                                <label>Pic</label>
                                <input type="file" onChange={getInputFile} name='pic' className='form-control' />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-2">
                                <label>Email</label>
                                <input type="email" onChange={getInputData} name='email' placeholder='Email :' className='form-control' value={data.email} />
                            </div>
                            <div className="col-md-6 mb-2">
                                <label>Phone</label>
                                <input type="text" onChange={getInputData} name='phone' placeholder='Phone :' className='form-control' value={data.phone} />
                            </div>
                        </div>
                        <div className="mb-2">
                            <label>Address</label>
                            <textarea name="address" onChange={getInputData} rows="4" className='form-control' value={data.address} placeholder='Address...'></textarea>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-2">
                                <label>Pin</label>
                                <input type="text" onChange={getInputData} name='pin' placeholder='Pin :' className='form-control' value={data.pin} />
                            </div>
                            <div className="col-md-6 mb-2">
                                <label>City</label>
                                <input type="text" onChange={getInputData} name='city' placeholder='City :' className='form-control' value={data.city} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-2">
                                <label>State</label>
                                <input type="text" onChange={getInputData} name='state' placeholder='State :' className='form-control' value={data.state} />
                            </div>
                        </div>
                        <div className="mb-2">
                            <button type='submit' className='btn text-light w-100 breadcrumb-section'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
