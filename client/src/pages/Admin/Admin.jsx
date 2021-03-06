import React, { useState, useEffect } from 'react';
import './Admin.css';
import { Table, Dropdown, Container } from 'react-bootstrap'
import NavbarAdmin from '../../components/NavbarAdmin/NavbarAdmin';
import ModalImage from 'react-modal-image';
import { API } from '../../config/api/api';

import './Admin.css';

const Admin = () => {

    const [transactions, setTransactions] = useState([]);

    const getTransactions = async () => {
        try {
            const response = await API.get("/transactions");
            setTransactions(response.data.data.transactions);
        } catch (error) {
            console.log(error);
        }
    };

    const handleApproved = async (id) => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }
            const data = {
                paymentStatus: "Approved",
                id
            }
            const body = JSON.stringify(data);
            await API.patch("/transaction/" + id, body, config);
            getTransactions();
        } catch (error) {
            console.log(error)
        }
    }

    const handleCancel = async (id) => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }
            const data = {
                paymentStatus: "Cancel",
                id
            }
            const body = JSON.stringify(data);
            await API.patch("/transaction/" + id, body, config);
            getTransactions();
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getTransactions();
    }, []);
    // if(!state.isLogin){
    //     return <Redirect to="/" />
    // }

    return (
        <Container>
            <NavbarAdmin />
            <p className="admin-transaction-title">Incoming Transaction</p>
            <Table className="table-transaction mb-5" striped size="sm">
                <thead>
                    <tr>
                        <th className="table-cell align-middle th" style={{ color: "#ff0000" }}>No</th>
                        <th className="table-cell align-middle th" style={{ color: "#ff0000" }}>Users</th>
                        <th className="table-cell align-middle th" style={{ color: "#ff0000" }}>Bukti Transfer</th>
                        <th className="table-cell align-middle th" style={{ color: "#ff0000" }}>Remaining Active</th>
                        <th className="table-cell align-middle th" style={{ color: "#ff0000" }}>Status User</th>
                        <th className="table-cell align-middle th" style={{ color: "#ff0000" }}>Status Payment</th>
                        <th className="table-cell align-middle th" style={{ color: "#ff0000" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((item, index) => (
                        <tr key={index}>
                            <td className="table-cell align-middle">{index + 1}</td>
                            <td className="table-cell align-middle">{item?.user?.name}</td>
                            <td className="table-cell align-middle">
                                {item?.transferProof === "http://localhost:5000/uploads/-"
                                    ? (
                                        <div style={{ marginTop: "15px" }}>
                                            <p>No Transactions</p>
                                        </div>
                                    ) : (
                                        <div className="image-transaction-wrapper">
                                            <ModalImage
                                                small={item?.transferProof}
                                                large={item?.transferProof}
                                            />
                                        </div>
                                    )
                                }
                            </td>
                            <td className="table-cell align-middle">{item?.remainingActive} / Hari</td>

                            {item?.userStatus === "Active" ? <td className="table-cell align-middle" style={{ color: "#0acf83" }}>{item?.userStatus}</td> : <td className="table-cell align-middle" style={{ color: "#ff0000" }}>{item?.userStatus}</td>}

                            {item?.paymentStatus === "Approved" ?
                                <td className="table-cell align-middle" style={{ color: "#0acf83" }}>{item?.paymentStatus}</td>
                                : item?.paymentStatus === "Pending" ?
                                    <td className="table-cell align-middle" style={{ color: "#F7941E" }}>{item?.paymentStatus}</td>
                                    : <td className="table-cell align-middle" style={{ color: "#ff0000" }}>{item?.paymentStatus}</td>}

                            <td className="table-cell align-middle">
                                <Dropdown className="drop-down">
                                    <Dropdown.Toggle className="dropdown-toggle" variant="link" id="dropdown-basic">
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item className="approved-text" onClick={() => handleApproved(item?.id)}>Approved</Dropdown.Item>
                                        <Dropdown.Item className="text-c" onClick={() => handleCancel(item?.id)}>Cancel</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className="space">

            </div>
        </Container>
    )
}

export default Admin
