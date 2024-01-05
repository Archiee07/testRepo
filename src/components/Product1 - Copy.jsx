
import ProBackendService from '../services/ProBackendService';
import { useState } from 'react'
import React, { useEffect } from 'react';

import {
    MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBCol, MDBCardImage, MDBCardText, MDBCardTitle, MDBTable, MDBTableBody
} from 'mdb-react-ui-kit';



function Product1() {

    const [Product, setProduct] = useState([])

    useEffect(() => {
        const getData = async () => {

            ProBackendService.GetAllProduct().then(res => {
                setProduct(res.data);
                console.log('server response1 => ' + JSON.stringify(res.data));
                console.log('server response data => ' + JSON.stringify(Product));
            });
        }
        getData();
        console.log('Server Response2 =>' + JSON.stringify(Product));
    }, []);




    return (


        <MDBContainer className="py-1">
            <MDBTable align='middle' class="table table-sm">
                <MDBTableBody>
                    {
                        Product.map(
                            Product =>
                                <tr key={Product.pID} >
                                <td> <MDBRow className='g-0'>
                                <MDBCol md='4'>
                                    <MDBCard style={{ maxWidth: '540px' }}>
                                        <MDBRow className='g-0'>
                                            <MDBCol md='4'>
                                                <MDBCardImage src='https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.webp'
                                                    style={{ width: '200px', height: '250px' }} alt='...' fluid />
                                            </MDBCol>
                                            <MDBCol md='8'>
                                                <MDBCardBody>
                                                    <MDBCardTitle>Product Details</MDBCardTitle>
                                                    <MDBCardText>
                                                        <p className="text-muted mb-1">{Product.pID} </p>
                                                    </MDBCardText>
                                                    <MDBCardText>
                                                        <small className='text-muted'>{Product.pDestcription}</small>
                                                    </MDBCardText>
                                                </MDBCardBody>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBCard>
                                </MDBCol>
                            </MDBRow></td>
                              
                            <td> <MDBRow className='g-0'>
                            <MDBCol md='4'>
                                <MDBCard style={{ maxWidth: '540px' }}>
                                    <MDBRow className='g-0'>
                                        <MDBCol md='4'>
                                            <MDBCardImage src='https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.webp'
                                                style={{ width: '200px', height: '250px' }} alt='...' fluid />
                                        </MDBCol>
                                        <MDBCol md='8'>
                                            <MDBCardBody>
                                                <MDBCardTitle>Product Details</MDBCardTitle>
                                                <MDBCardText>
                                                    <p className="text-muted mb-1">{Product.pID} </p>
                                                </MDBCardText>
                                                <MDBCardText>
                                                    <small className='text-muted'>{Product.pDestcription}</small>
                                                </MDBCardText>
                                            </MDBCardBody>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow> </td>
                                    
                                </tr>
                        )
                    }
                </MDBTableBody>
            </MDBTable>

        </MDBContainer>
    );
} export default Product1
