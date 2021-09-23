import { useState, useEffect } from "react";
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useSelector } from "react-redux";

import apiService from "../services/api.service";

export const Sellers = ({ history }) => {
    const [sellers, setSellers] = useState([]);
    const userDetails = useSelector(state => state.userDetails);

    const loadFollowedSellers = async () => {
        return await apiService.get(`buyer/${userDetails.username}/follow`);
    }

    const loadSellers = async () => {
        const data = await apiService.get('admin/sellers');

        if (userDetails.roles === 'BUYER') {
            const fws = await loadFollowedSellers();
            
            data.forEach(r => {
                r.followed = !!fws.find(f => f.user.username === r.user.username);
            });
        }

        setSellers(data);
    }

    useEffect(() => {
        loadSellers();
    }, []);

    const approveSeller = async (id) => {
        if (window.confirm("Are you sure to approve the seller?")) {
            await apiService.get(`admin/sellers/${id}`);
            await loadSellers();
        }
    }

    const followSeller = async (sellername) => {
        if (window.confirm("Are you sure to follow the seller?")) {
            await apiService.post(`buyer/${userDetails.username}/follow/${sellername}`);
            await loadSellers();
        }
    }

    const unfollowSeller = async (sellername) => {
        if (window.confirm("Are you sure to unfollow the seller?")) {
            await apiService.post(`buyer/${userDetails.username}/unfollow/${sellername}`);
            await loadSellers();
        }
    }

    const handleApprove = (e) => {
        approveSeller(e.target.value);
    }

    const handleFollow = (e) => {
        followSeller(e.target.value);
    }

    const handleUnfollow = (e) => {
        unfollowSeller(e.target.value);
    }

    return (
        <div>
            <Row>
                <Col>
                    <h2>
                        Sellers
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
                    {sellers.map(p => (
                        <tr key={p.id}>
                            <td>
                                {p.id}
                            </td>
                            <td>{`${p.user.fname} ${p.user.lname}`}</td>
                            <td>{p.user.username}</td>
                            <td>{p.user.email}</td>
                            <td>{p.status}</td>
                            <td>
                                {
                                    userDetails.roles === 'BUYER' ? (
                                        <Button
                                            id={`btnApprove-${p.id}`}
                                            variant="primary"
                                            value={p.user.username}
                                            onClick={p.followed ? handleUnfollow : handleFollow}>{p.followed ? (<>Unfollow</>) : (<>Follow</>)}</Button>
                                    ) : (
                                        <Button
                                            id={`btnApprove-${p.id}`}
                                            variant="primary"
                                            value={p.id}
                                            disabled={p.status !== 'Pending'}
                                            onClick={handleApprove}>Approve</Button>
                                    )
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>


        </div>
    );
}