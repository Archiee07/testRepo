import React from "react";
import { useNavigate } from 'react-router-dom';
import { variables } from './Variables';
import { MDBAnimation, MDBView, MDBMask } from "mdbreact";
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import ProBackendService from "../services/ProBackendService";
import {
    MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow, MDBTypography, MDBCardHeader,
    MDBRipple, MDBTooltip, MDBListGroup, MDBListGroupItem, MDBCardText
   } from "mdb-react-ui-kit";

function Cart() {

    const navigate = useNavigate();
    const SessionValue = sessionStorage.getItem("cartItems");
    let CartItems = JSON.parse(SessionValue);

    let GrossTotal = CartItems.reduce((Total, item) => Total = Total + (item.PricePerItem * item.pQuantity), 0)
    let Discount = CartItems.reduce((Total, item) => Total = Total + ((item.PricePerItem * item.pQuantity) * item.pDiscountPercentage) / 100, 0)

    // get date expected delivery date
    var ExpectedDeliveryDate = new Date()
    ExpectedDeliveryDate.setDate(ExpectedDeliveryDate.getDate() + 3)      // Add a 3 days




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


    function CreateOrder(e) {
        e.preventDefault();

        let ProductOrder = {
            OrderValue: GrossTotal,
            DiscountValue: Discount,
            NetPaidValue: (GrossTotal - Discount).toFixed(2),
            ExpectedDeliveryDate: ExpectedDeliveryDate.toLocaleDateString("fr-CA", { year: "numeric", month: "2-digit", day: "2-digit" }),
            CustomerId: read_cookie('userId'),
            orderItems: CartItems
        };

        // call api
        ProBackendService.CreateOrder(JSON.stringify(ProductOrder)).then(res => {
            sessionStorage.setItem("cartItems", "[]");
            alert('Order has been placed successfull. Your order Id is:' + res.data);
            navigate('/Menu');

        });


    }


    return (

        <section className="h-100 gradient-custom">
            <MDBContainer className="py-0 h-100">
                <MDBRow className="justify-content-center my-2">
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
                                                    <MDBRipple rippleTag="a" href="#!" className="bg-image rounded hover-zoom hover-overlay"                        >
                                                        <img className='img-fluid shadow-4'
                                                            src={variables.PHOTO_URL + item.pImageName} />
                                                    </MDBRipple>
                                                </MDBCol>
                                                <MDBCol lg="9" md="12" className="mb-4 mb-lg-0">
                                                    <MDBRow >
                                                        <MDBCol lg="6" md="6" className=" mb-4 mb-lg-0">
                                                            <MDBCardText><strong>Product Name:</strong> {item.pName}</MDBCardText>
                                                            <MDBCardText><strong>Product Type:</strong> {item.pType}</MDBCardText>
                                                            <MDBCardText><strong>Price Per Item:</strong> €{item.PricePerItem}</MDBCardText>
                                                        </MDBCol>
                                                        <MDBCol lg="6" sm="6" className="mb-4 mb-lg-0">
                                                            <p className="text-danger text-md-center">
                                                                <MDBAnimation type="pulse" infinite>
                                                                    <MDBCardText><strong>Discount Offer:</strong> {item.pDiscountPercentage}%</MDBCardText>
                                                                </MDBAnimation>
                                                            </p>
                                                            <div className="d-flex flex-row align-items-center mb-3" style={{ maxWidth: "300px", height: "45px" }} >
                                                                <MDBBtn className="d-flex justify-content-center" color='link' rounded size='sm' onClick={() => removeQuantity(item)}  >
                                                                    <div style={{ maxWidth: "300px", height: "45px" }} >
                                                                        <MDBTooltip wrapperProps={{ size: "sm" }} wrapperClass="me-4 mb-5"
                                                                            title="Remove Quantity">
                                                                            <MDBIcon fas icon="minus" />
                                                                        </MDBTooltip>
                                                                    </div>
                                                                </MDBBtn>
                                                                <MDBInput defaultValue={item.pQuantity} label="Quantity" />
                                                                <MDBBtn className="d-flex justify-content-center" color='link' rounded size='sm' onClick={() => addQuantity(item)} >
                                                                    <div style={{ maxWidth: "300px", height: "45px" }} >
                                                                        <MDBTooltip wrapperProps={{ size: "sm" }} wrapperClass="me-4 mb-5"
                                                                            title="Add Quantity">
                                                                            <MDBIcon fas icon="plus" />
                                                                        </MDBTooltip>
                                                                    </div>
                                                                </MDBBtn>
                                                            </div>
                                                        </MDBCol>
                                                    </MDBRow>
                                                    <MDBRow>
                                                        <MDBCol lg="12" sm="6" className="mb-4 mb-lg-0">
                                                            <MDBTooltip wrapperProps={{ size: "sm" }} wrapperClass="me-1 mb-2"
                                                                title="Remove item">
                                                                <MDBIcon fas icon="trash" onClick={() => deletItem(item)} />
                                                            </MDBTooltip>
                                                            <MDBTooltip wrapperProps={{ size: "sm", color: "danger" }} wrapperClass="me-1 mb-2"
                                                                title="Move to the wish list">
                                                                <MDBIcon fas icon="heart" />
                                                            </MDBTooltip>
                                                        </MDBCol>
                                                    </MDBRow>
                                                </MDBCol>
                                                <MDBRow><MDBCol><hr className="my-4" /></MDBCol></MDBRow>
                                            </MDBRow>

                                    )}
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
                                    <MDBListGroup style={{ minWidth: '22rem' }} light small>
                                        <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                                            <div>
                                                <MDBCardText className="text-muted"><strong>Item Name:</strong>Price x Quantity</MDBCardText>
                                            </div>
                                            <span>
                                                <strong>Total Price</strong>
                                            </span>
                                        </MDBListGroupItem>
                                    </MDBListGroup>
                                </MDBRow>
                                {
                                    CartItems.map(
                                        item =>
                                            <MDBRow >
                                                <MDBListGroup style={{ minWidth: '22rem' }} light small>
                                                    <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                                                        <div>
                                                            <MDBCardText className="text-muted"><strong>{item.pName} </strong> :{item.PricePerItem} x  {item.pQuantity}</MDBCardText>
                                                        </div>
                                                        <span>
                                                            €{(item.PricePerItem * item.pQuantity).toFixed(2)}
                                                        </span>
                                                    </MDBListGroupItem>
                                                </MDBListGroup>
                                            </MDBRow>
                                    )}
                                <hr className="my-4" />
                                <MDBListGroup style={{ minWidth: '22rem' }} light small>
                                    <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                                        <div>
                                            <MDBCardText className="text-muted">Gross Total (including VAT)</MDBCardText>
                                        </div>
                                        <span>
                                            €{GrossTotal.toFixed(2)}
                                        </span>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                                        <div>
                                            <MDBCardText className="text-muted">Gross Discount</MDBCardText>
                                        </div>
                                        <span>
                                            €{Discount.toFixed(2)}
                                        </span>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                                        <div>
                                            <MDBCardText className="text-muted"><strong>Net Payment</strong></MDBCardText>
                                        </div>
                                        <span>
                                            <strong>€{(GrossTotal - Discount).toFixed(2)}</strong>
                                        </span>
                                    </MDBListGroupItem>
                                </MDBListGroup>
                            </MDBCardBody>
                        </MDBCard>
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <p>
                                    <strong>Expected shipping delivery</strong>
                                </p>
                                <p className="mb-0">{ExpectedDeliveryDate.toLocaleDateString("fr-CA", { year: "numeric", month: "2-digit", day: "2-digit" })}</p>
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
                            <MDBBtn block size="lg" onClick={CreateOrder}>
                                <div className="justify-content-center">
                                    <span>Pay Now €{(GrossTotal - Discount).toFixed(2)}</span>
                                </div>
                            </MDBBtn>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}
export default Cart
