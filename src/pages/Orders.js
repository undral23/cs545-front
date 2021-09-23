import { useState, useEffect } from "react";
import axios from 'axios';
import { Table, Button, Row, Col, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

import {
    Link
} from "react-router-dom";

export const Orders = ({ history }) => {
    const [orders, setOrders] = useState([]);
    const loadOrders = async () => {
        const resp = await axios.get('http://localhost:8080/orders');
        setOrders(resp.data);
    }
    useEffect(() => {
        loadOrders();
    }, []);

    const changeStatus = async (id, status) => {
        if (window.confirm("Are you sure to change the status?")) {
            await axios.put(`http://localhost:8080/orders/${id}?status=${status}`);
            await loadOrders();
        }
    }

    const handleStatusChange = (id, status) => {
        changeStatus(id, status);
    }

    return (
        <div>
            <Row>
                <Col>
                    <h2>
                        Orders
                    </h2>
                </Col>
            </Row>

            <hr />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Order #</th>
                        {/* <th>Person</th>
                        <th>Payment</th> */}
                        <th>Items</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(o => (
                        <tr key={o.id}>
                            <td>
                                {o.id}
                            </td>
                            {/* <td>{o.personalInfo.name} ({o.personalInfo.email})</td>
                            <td>{`${o.paymentInfo.cartType} ${o.paymentInfo.number}`}</td> */}
                            <td>{o.lineItems.length}</td>
                            <td>${o.lineItems.map(i => i.product.price * i.quantity).reduce((accumulator, currentValue) => accumulator + currentValue, 0)}</td>
                            <td>
                                <ToggleButtonGroup type="radio" name="statuses" defaultValue={o.orderStatus}
                                    onChange={status => handleStatusChange(o.id, status)}>
                                    <ToggleButton id="tbg-radio-0" variant="outline-success" value={'Pending'}>
                                        Pending
                                    </ToggleButton>
                                    <ToggleButton id="tbg-radio-1" variant="outline-success" value={'PLACED'}>
                                        Placed
                                    </ToggleButton>
                                    <ToggleButton id="tbg-radio-2" variant="outline-success" value={'SHIPPED'}>
                                        Shipped
                                    </ToggleButton>
                                    <ToggleButton id="tbg-radio-3" variant="outline-success" value={'DELIVERED'}>
                                        Delivered
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>


        </div>
    );
}