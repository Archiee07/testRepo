import React from 'react';
import { useState, useEffect } from 'react';
import { variables } from './Variables.jsx';
import BackendService from '../services/BackendService';
import ProBackendService from "../services/ProBackendService";
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import {
    MDBContainer, MDBRow, MDBTable, MDBTableHead, MDBCard, MDBCardBody, MDBTableBody, MDBCol, MDBBtn, MDBCardText, MDBRipple, MDBIcon,
    MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModal
}
    from 'mdb-react-ui-kit';

export default function ProfileViewPage() {
    
    const [PhotoFileName, setPhotoFileName] = useState('anonymous.png');
    const [UserData, setUserData] = useState([]);
    const [Orders, setOrders] = useState([])
    const [OrderStatus, setOrderStatus] = useState([])
    const [OrderItems, setOrderItems] = useState([])
    const [TotalPay, setTotalPay] = useState("")
    const [StatusName, setStatusName] = useState()
    const [editModal, seteditModal] = useState(false)
    viewOrder = viewOrder.bind(this);

    // get user data on page load
    useEffect(() => {
        const getData = async () => {

            let parmObj = {
                parmName: 'ID',
                paramValue: read_cookie(variables.key_userId).toString()

            };
            console.log('parmObj => ' + JSON.stringify(parmObj));
            // email existence validation
            BackendService.GetUserdataByParameter(JSON.stringify(parmObj)).then(res => {
                setUserData(res.data);
                console.log('sewrver response => ' + JSON.stringify(res.data));
            });
        }

        const getOrder = async () => {

            ProBackendService.getAllOrder().then(res => {
                setOrders(res.data);
            });
        }

        const getOrderStatus = async () => {

            ProBackendService.getOrderStatus().then(res => {
                setOrderStatus(res.data);
            });
        }


        getData();
        getOrder();
        getOrderStatus();
        console.log('Server Response2 => ' + JSON.stringify(UserData));
    }, []);


    function viewOrder(ObjOrder) {

        setStatusName(ObjOrder.statusName);
        console.log('Order ID: ' + ObjOrder.orderId)
        ProBackendService.getOrderItems(ObjOrder.orderId).then(res => {
            setOrderItems(JSON.parse(res.data));
        });
        let GrossTotal = OrderItems.reduce((Total, item) => Total = Total + (item.PricePerItem * item.pQuantity), 0)
        let Discount = OrderItems.reduce((Total, item) => Total = Total + ((item.PricePerItem * item.pQuantity) * item.pDiscountPercentage) / 100, 0)
        setTotalPay(GrossTotal - Discount)

        console.log('Order Items: ' + JSON.stringify(OrderItems))
        seteditModal(!editModal);
    }
    const changeStatus = (e) => {
        // StatusId(e.target.id);
        setStatusName(e.target.value);
    }

    function edit_toggleShow() { seteditModal(!editModal); }


    return (
        <MDBContainer className="py-1">
            <MDBRow>
                <MDBCol lg="3">
                    <MDBCard className="mb-4">
                        <MDBCardBody className="text-center">
                            <MDBRipple rippleTag="a" href="#!" className="bg-image rounded hover-zoom hover-overlay" >
                                <img className='img-fluid shadow-4'
                                    src={variables.PHOTO_URL + UserData.imageName} />
                            </MDBRipple>
                            <p className="text-muted mb-4">{UserData.verified ? 'Verified User' : 'Verifiy?'}
                                <MDBIcon icon="" /></p>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol lg="9">
                    <MDBCard className="mb-4">
                        <MDBCardBody>
                            <MDBRow>
                                <MDBCol sm="3">
                                    <MDBCardText>Name</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                    <MDBCardText className="text-muted">{UserData.name}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="3">
                                    <MDBCardText>Email</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                    <MDBCardText className="text-muted">{UserData.emailID}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="3">
                                    <MDBCardText>Mobile</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                    <MDBCardText className="text-muted">{UserData.mobileNo}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="3">
                                    <MDBCardText>News letter subscribed</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                    <MDBCardText className="text-muted">Yes</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                            <MDBCol sm="3">
                                <MDBCardText>Status</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                                <MDBCardText className="text-muted">{UserData.active? 'Active' : 'Inactive'}</MDBCardText>
                            </MDBCol>
                        </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
            <MDBRow>
            <caption> List of your orders</caption> 
                <MDBCol>
                    <MDBCard className="mb-4">
                        <MDBCardBody>
                        
                            <MDBTable align='middle' class="table table-sm">
                             <MDBTableHead>
                                    <tr>
                                        <th> O. ID </th>
                                        <th>O. Value</th>
                                        <th>Dis. Value</th>
                                        <th>NP. Value</th>
                                        <th>O. Status</th>
                                        <th>Pay. Status</th>
                                        <th >Order Date </th>
                                        <th >Ex. Del. Date </th>
                                        <th >Customer Name </th>
                                        <th >Action </th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    {
                                        Orders.map(item =>
                                            item.uID === UserData.id ?
                                                <tr key={item.orderId} >
                                                    <td> {item.orderId} </td>
                                                    <td> {item.orderValue} </td>
                                                    <td> {item.discountValue}</td>
                                                    <td> {item.netPaidValue}</td>
                                                    <td>{item.statusName}</td>
                                                    <td> {item.paymentStatus.toString() === 'true' ? 'Done' : 'Pending'}</td>
                                                    <td> {item.orderDate.substring(0, 10)} </td>
                                                    <td> {item.expectedDeliveryDate.substring(0, 10)} </td>
                                                    <td> {item.uName} </td>
                                                    <td>
                                                        <MDBBtn color='link' rounded size='sm' onClick={() => viewOrder(item)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                                            </svg>
                                                        </MDBBtn>
                                                    </td>
                                                </tr>
                                                : ''
                                        )
                                    }
                                </MDBTableBody>
                            </MDBTable>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
            <div>
                <MDBModal staticBackdrop show={editModal} setShow={editModal} tabIndex='-1'>
                    <MDBModalDialog size='xl' >
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle>Order Details</MDBModalTitle>
                                <MDBBtn className='btn-close' color='none' onClick={edit_toggleShow}></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody>
                                <div>
                                    <MDBContainer class="d-flex justify-content-center">

                                        <MDBRow>
                                        <MDBCol lg="12" md="12" className="mb-4 mb-lg-0">
                                            <form className="mx-3 grey-text">

                                                    <select className="form-select" id='StatusId' disabled='true'
                                                        onChange={changeStatus}
                                                        value={StatusName}>
                                                        {OrderStatus.map(item =>
                                                            <option key={item.statusId}>
                                                                {item.statusName}
                                                            </option>)}
                                                    </select>
                                               
                                                <MDBBtn className="d-flex justify-content-end" size='md'>Update Order</MDBBtn>
                                            </form>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBContainer>
                                    <MDBRow><MDBCol><hr className="my-4" /></MDBCol></MDBRow>
                                    <MDBContainer class="d-flex justify-content-center">
                                        <MDBCard className='w-100' style={{ borderRadius: '25px' }}>

                                            <MDBCardBody>
                                                <MDBRow>
                                                    <caption>Order Items</caption>
                                                    <div class="table-responsive">
                                                        <MDBTable align='middle' class="table table-sm">
                                                            <MDBTableHead>
                                                                <tr>
                                                                    <th>P. ID </th>
                                                                    <th>P. Name</th>
                                                                    <th>Price</th>
                                                                    <th>Quantity</th>
                                                                    <th>TotalPrice</th>
                                                                    <th>Discount%</th>
                                                                    <th>Discount</th>
                                                                    <th>NetPay</th>
                                                                </tr>
                                                            </MDBTableHead>
                                                            <MDBTableBody>
                                                                {
                                                                    OrderItems.map(
                                                                        OItem =>
                                                                            <tr key={OItem.pId} >
                                                                                <td> {OItem.pId} </td>
                                                                                <td> {OItem.pName} </td>
                                                                                <td> {OItem.PricePerItem}</td>
                                                                                <td>{OItem.pQuantity}</td>
                                                                                <td>{OItem.pQuantity * OItem.PricePerItem}</td>
                                                                                <td> {OItem.pDiscountPercentage}</td>
                                                                                <td>{(((OItem.pQuantity * OItem.PricePerItem)) * OItem.pDiscountPercentage) / 100}</td>
                                                                                <td>{(OItem.pQuantity * OItem.PricePerItem) - (((OItem.pQuantity * OItem.PricePerItem)) * OItem.pDiscountPercentage) / 100}</td>
                                                                            </tr>
                                                                    )
                                                                }
                                                            </MDBTableBody>

                                                            <MDBTableHead>
                                                                <tr>
                                                                    <th></th>
                                                                    <th></th>
                                                                    <th></th>
                                                                    <th></th>
                                                                    <th></th>
                                                                    <th></th>
                                                                    <th>Total net Payment:</th>
                                                                    <th>{TotalPay}</th>
                                                                </tr>
                                                            </MDBTableHead>
                                                        </MDBTable>
                                                    </div>
                                                </MDBRow>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBContainer>

                                </div>
                            </MDBModalBody>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal >
            </div >
        </MDBContainer>
    );
}