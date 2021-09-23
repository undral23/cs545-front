import { useState, useEffect } from "react";
import { Table, Button, Row, Col } from 'react-bootstrap';

import {
    Link
} from "react-router-dom";
import apiService from "../services/api.service";

export const Reviews = ({ history }) => {
    const [reviews, setReviews] = useState([]);
    const loadReviews = async () => {
        const data = await apiService.get('admin/reviews');
        setReviews(data);
    }
    useEffect(() => {
        loadReviews();
    }, []);

    const deleteSeller = async (id) => {
        if (window.confirm("Are you sure to approve the seller?")) {
            await apiService.put(`reviews/${id}`);
            await loadReviews();
        }
    }

    const handleApprove = (e) => {
        deleteSeller(e.target.value);
    }

    return (
        <div>
            <Row>
                <Col>
                    <h2>
                        Reviews
                    </h2>
                </Col>
            </Row>

            <hr />
            <Table id="tableMain" striped bordered hover>
                <thead>
                    <tr>
                        <th>Seller #</th>
                        <th>Full Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map(p => (
                        <tr key={p.id}>
                            <td>
                                {p.id}
                            </td>
                            <td>{`${p.user.fname} ${p.user.lname}`}</td>
                            <td>{p.user.username}</td>
                            <td>{p.user.email}</td>
                            <td>{p.status}</td>
                            <td><Button
                                id={`btnApprove-${p.id}`}
                                variant="primary"
                                value={p.id}
                                disabled={p.status !== 'Pending'}
                                onClick={handleApprove}>Approve</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>


        </div>
    );
}