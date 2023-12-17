import React, { useEffect, useState } from 'react'
import OwlCarousel from 'react-owl-carousel';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getProduct } from '../Store/ActionCreators/ProductActionCreators';
import { createCart, getCart } from '../Store/ActionCreators/CartActionCreators';
import { createWishlist, getWishlist } from '../Store/ActionCreators/WishlistActionCreators';

export default function SingleProduct() {
    let [product, setProduct] = useState({
        pic1: "",
        pic2: "",
        pic3: "",
        pic4: "",
    })
    let [qty, setQty] = useState(1)
    let [relatedProducts, setRelatedProducts] = useState([])
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let { id } = useParams()
    let allProductStateData = useSelector(state => state.ProductStateData)
    let allCartStateData = useSelector(state => state.CartStateData)
    let allWishlistStateData = useSelector(state => state.WishlistStateData)

    function addToCart() {
        if (!localStorage.getItem("login")) {
            navigate("/login")
        }
        else {
            let item = allCartStateData.slice(1).find((x) => x.productid === product.id && x.userid === localStorage.getItem("userid"))
            if (!item) {
                item = {
                    userid: localStorage.getItem("userid"),
                    productid: product.id,
                    name: product.name,
                    brand: product.brand,
                    color: product.color,
                    size: product.size,
                    pic: product.pic1,
                    price: product.finalprice,
                    qty: parseInt(qty),
                    total: product.finalprice * qty,  
                }
                dispatch(createCart(item))
            }
            navigate("/cart")
        }
        
    }

    function addToWishlist() {
        if (!localStorage.getItem("login")) {
            navigate("/login")
        }
        else {
            let item = allWishlistStateData.slice(1).find((x) => x.productid === product.id && x.userid === localStorage.getItem("userid"))
            if (!item) {
                item = {
                    userid: localStorage.getItem("userid"),
                    productid: product.id,
                    name: product.name,
                    brand: product.brand,
                    color: product.color,
                    size: product.size,
                    pic: product.pic1,
                    price: product.finalprice,
                }
                dispatch(createWishlist(item))
            }
                navigate("/profile")
        }
    }

    function getAPIData() {
        dispatch(getProduct())
        dispatch(getCart())
        dispatch(getWishlist())
        if (allProductStateData.length) {
            let item = allProductStateData.slice(1).reverse().find((item) => item.id === Number(id))
            if (item)
                setProduct(item)
            setRelatedProducts(allProductStateData.slice(1).reverse().filter((p) => p.maincategory === item.maincategory && p.subcategory === item.subcategory && p.brand === item.brand && p.id !== item.id))
        }
    }

    useEffect(() => {
        getAPIData()
    }, [allProductStateData.length, allCartStateData.length, allWishlistStateData.length])

    return (
        <>
            {/* <!-- breadcrumb-section --> */}
            <div className="breadcrumb-section breadcrumb-bg">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 text-center">
                            <div className="breadcrumb-text">
                                <h1><Link to="/">Home</Link><i className="fa fa-arrow-right mx-2"></i>SingleProduct</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- end breadcrumb section --> */}

            {/* <!-- single product --> */}
            <div className="single-product mt-150 mb-150">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-5">
                            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                                <ol className="carousel-indicators">
                                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                                </ol>
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img src={`/assets/images/${product.pic1}`} className="d-block w-100" height="500px" alt="..." />
                                    </div>
                                    <div className="carousel-item">
                                        <img src={`/assets/images/${product.pic2}`} className="d-block w-100" height="500px" alt="..." />
                                    </div>
                                    <div className="carousel-item">
                                        <img src={`/assets/images/${product.pic3}`} className="d-block w-100" height="500px" alt="..." />
                                    </div>
                                    <div className="carousel-item">
                                        <img src={`/assets/images/${product.pic4}`} className="d-block w-100" height="500px" alt="..." />
                                    </div>
                                </div>
                                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Next</span>
                                </a>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="single-product-content">
                                <h3>{product.name}</h3>
                                <p className="single-product-pricing"><span>{product.maincategory}/{product.subcategory}/{product.brand}</span></p>
                                <p className="single-product-pricing"><span >{product.color}/{product.size}</span></p>
                                <p className="single-product-pricing"><span ><del style={{ color: "red" }}>&#8377;{product.baseprice}</del> &#8377;{product.finalprice} <sup style={{ color: "green" }}>{product.discount}% Off</sup></span></p>
                                <p>{product.description}</p>
                                <div className="single-product-form">
                                    <form action="index.html">
                                        <input type="number" name="qty" onChange={(e) => setQty(e.target.value)} value={qty} min={1} />
                                    </form>
                                    <div className="btn-group">
                                        <button className="btn btn-danger p-2" onClick={addToCart}><i className="fas fa-shopping-cart"></i> Add to Cart</button>
                                        <button className="btn btn-success p-2" onClick={addToWishlist}><i className="fas fa-heart"></i> Add to Wishlist</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- end single product --> */}

            {/* <!-- more products --> */}
            {
                relatedProducts.length ?
                    <div className="more-products mb-15">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 offset-lg-2 text-center">
                                    <div className="section-title">
                                        <h3><span className="orange-text">Related</span> Products</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <OwlCarousel className='owl-theme' loop margin={1} items={3} nav>
                                    {
                                        relatedProducts.map((item, index) => {
                                            return <div key={index} className=" text-center">
                                                <div className="single-product-item">
                                                    <div className="product-image">
                                                        <Link to={"/single-product/" + item.id}><img src={`/assets/images/${item.pic1}`} height="280px" alt="" /></Link>
                                                    </div>
                                                    <h3>{item.name}</h3>
                                                    <p className="product-price"><del className='text-danger'>&#8377;{item.baseprice}</del> &#8377;{item.finalprice} </p>
                                                    <p className="product-price text-success">{item.discount}% Off </p>
                                                    <Link to={"/single-product/" + item.id} className="cart-btn"><i className="fas fa-shopping-cart"></i> Add to Cart</Link>
                                                </div>
                                            </div>
                                        })
                                    }
                                </OwlCarousel>
                            </div>
                        </div>
                    </div> :
                    ""
            }
        </>
    )
}
