import React from "react";
import { useState,useEffect } from 'react';
import {
    MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow, MDBTypography, MDBCardHeader,
    MDBRipple, MDBTooltip, MDBListGroup, MDBListGroupItem, MDBCardText
} from "mdb-react-ui-kit";
import { parse } from "qs";

function Cart() {

    const SessionValue = sessionStorage.getItem("cartItems");
    let CartItems = JSON.parse(SessionValue);
    console.log("items on card page: " + SessionValue);


    let GrossTotal = CartItems.reduce((Total, item) => Total = Total + (item.pPrice * item.pQuantity), 0)
    console.log(GrossTotal);
    let Discount = CartItems.reduce((Total, item) => Total = Total + ((item.pPrice * item.pQuantity)*item.pDiscount)/100, 0)
    console.log(Discount);


    function addQuantity(ToUpdateObj) {

        let UpdatedObj = CartItems.map(item =>

            item.pID === ToUpdateObj.pID ? { ...ToUpdateObj, pQuantity: ToUpdateObj.pQuantity + 1 } : item
        );

        sessionStorage.setItem("cartItems", JSON.stringify(UpdatedObj));
        window.location.reload(true);

    }

    function removeQuantity(ToUpdateObj) {

        if (ToUpdateObj.pQuantity > 1) {

            let UpdatedObj = CartItems.map(item =>

                item.pID === ToUpdateObj.pID ? { ...ToUpdateObj, pQuantity: ToUpdateObj.pQuantity - 1 } : item

            );

            sessionStorage.setItem("cartItems", JSON.stringify(UpdatedObj));
            window.location.reload(true);

        }

    }

    function deletItem(ToDeleteObj) {

        let upadetedObj = CartItems.filter(item =>

            item.pID !== ToDeleteObj.pID)
        sessionStorage.setItem("cartItems", JSON.stringify(upadetedObj));
        console.log("newarry" + JSON.stringify(upadetedObj))
        window.location.reload(true);
    }

    function Sum(total, qty, price) {

        setTotalCose(total + (qty * price))

    }

    return (

        <section className="h-100 gradient-custom">
            <MDBContainer className="py-0 h-100">
                <MDBRow className="justify-content-center my-4">
                    <MDBCol md="8">
                        <MDBCard className="mb-4">
                            <MDBCardHeader className="py-1">
                                <MDBTypography tag="h5" className="mb-0">
                                    Cart items
                                </MDBTypography>
                            </MDBCardHeader>
                            <MDBCardBody>
                                {
                                    CartItems.map(
                                        item =>
                                            <MDBRow >
                                                <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
                                                    <MDBRipple rippleTag="div" rippleColor="light"
                                                        className="bg-image rounded hover-zoom hover-overlay">
                                                        <img
                                                            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/12a.webp"
                                                            className="w-100" />
                                                        <a href="#!">
                                                            <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.2)", }}>
                                                            </div>
                                                        </a>
                                                    </MDBRipple>
                                                </MDBCol>

                                                <MDBCol lg="5" md="6" className=" mb-4 mb-lg-0">
                                                    <p><strong>{item.pName}</strong></p>
                                                    <p><strong>Product Type:</strong> {item.pType}</p>
                                                    <p><strong>Discount:</strong> {item.pDiscount}%</p>
                                                    <MDBTooltip wrapperProps={{ size: "sm" }} wrapperClass="me-1 mb-2"
                                                        title="Remove item">
                                                        <MDBIcon fas icon="trash" onClick={() => deletItem(item)} />
                                                    </MDBTooltip>

                                                    <MDBTooltip wrapperProps={{ size: "sm", color: "danger" }} wrapperClass="me-1 mb-2"
                                                        title="Move to the wish list">
                                                        <MDBIcon fas icon="heart" />
                                                    </MDBTooltip>
                                                </MDBCol>
                                                <MDBCol lg="3" sm="6" className="mb-4 mb-lg-0">
                                                    <div className="d-flex mb-4" style={{ maxWidth: "300px" }} >
                                                        <MDBBtn className="px-3 me-2">
                                                            <MDBIcon fas icon="minus" onClick={() => removeQuantity(item)} />
                                                        </MDBBtn>
                                                        <MDBInput defaultValue={item.pQuantity} label="Quantity" />
                                                        <MDBBtn className="px-3 ms-2 ">
                                                            <MDBIcon fas icon="plus" onClick={() => addQuantity(item)} />
                                                        </MDBBtn>
                                                    </div>

                                                    <p className="text-start text-md-center">
                                                        <strong>Price:</strong> €{item.pPrice}
                                                    </p>
                                                </MDBCol>

                                                <MDBRow><MDBCol><hr className="my-4" /></MDBCol></MDBRow>
                                            </MDBRow>

                                    )}
                            </MDBCardBody>
                        </MDBCard>

                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <p>
                                    <strong>Expected shipping delivery</strong>
                                </p>
                                <p className="mb-0">12.10.2020 - 14.10.2020</p>
                            </MDBCardBody>
                        </MDBCard>

                        <MDBCard className="mb-4 mb-lg-0">
                            <MDBCardBody>
                                <p>
                                    <strong>We accept</strong>
                                </p>
                                <MDBCardImage className="me-2" width="45px"
                                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                                    alt="Visa" />
                                <MDBCardImage className="me-2" width="45px"
                                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                                    alt="American Express" />
                                <MDBCardImage className="me-2" width="45px"
                                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                                    alt="Mastercard" />
                                <MDBCardImage className="me-2" width="45px"
                                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
                                    alt="PayPal acceptance mark" />
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="4">
                        <MDBCard className="mb-4">
                            <MDBCardHeader>

                                <MDBTypography tag="h5" className="mb-0">
                                    Summary
                                </MDBTypography>
                            </MDBCardHeader>
                            <MDBCardBody>
                                <MDBRow >
                                    <MDBCol lg="6" md="6" className=" mb-4 mb-lg-0">
                                        <MDBCardText className="text-muted"><strong>Item</strong></MDBCardText>
                                    </MDBCol>
                                    <MDBCol lg="4" md="6" className=" mb-4 mb-lg-0">
                                        <MDBCardText className="text-muted"><strong>Price X Qty</strong></MDBCardText>
                                    </MDBCol>
                                    <MDBCol lg="2" md="6" className=" mb-4 mb-lg-0">
                                        <MDBCardText className="text-muted"><strong>Total</strong></MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                {
                                    CartItems.map(
                                        item =>
                                            <MDBRow >
                                                <MDBCol lg="6" md="6" className="mb-4 mb-lg-0">
                                                    <MDBCardText className="text-muted">{item.pName}</MDBCardText>
                                                </MDBCol>
                                                <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
                                                    <MDBCardText className="text-muted">{item.pPrice} X {item.pQuantity}</MDBCardText>
                                                </MDBCol>
                                                <MDBCol lg="2" md="6" className="mb-4 mb-lg-0">
                                                    <MDBCardText className="text-muted">{item.pPrice * item.pQuantity}</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                    )}
                            </MDBCardBody>

                            <hr className="my-4" />
                            <MDBCardBody>
                                <MDBListGroup flush>
                                    <MDBListGroupItem
                                        className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                        <div>
                                            <MDBCardText className="text-muted"><strong>Gross Amount (including VAT)</strong></MDBCardText>
                                        </div>
                                        <span>
                                            <strong>{GrossTotal}</strong>
                                        </span>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem
                                        className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                        <div>
                                            <MDBCardText className="text-muted"><strong>Gross Discount</strong></MDBCardText>
                                        </div>
                                            <strong>{Discount}</strong>
                                    </MDBListGroupItem>
                                    <hr className="my-4" />
                                    <MDBListGroupItem
                                    className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                    <div>
                                        <MDBCardText className="text-muted"><strong>Net Payment</strong></MDBCardText>
                                    </div>
                                    <span>
                                        <strong>{GrossTotal-Discount}</strong>
                                    </span>
                                </MDBListGroupItem>
                                </MDBListGroup>
                               
                                <MDBBtn block size="lg">Go to checkout </MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}
export default Cart
