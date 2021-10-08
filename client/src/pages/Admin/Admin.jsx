import React, {useContext} from 'react'
import { Redirect } from 'react-router';

import { UserContext } from '../../config/UserContext/UserContext';

import './Admin.css'
import {Table, Dropdown} from 'react-bootstrap'
import NavbarAdmin from '../../components/NavbarAdmin/NavbarAdmin';

import './Admin.css';

const Admin = () => {

    const [state] = useContext(UserContext)

    if(!state.isLogin){
        return <Redirect to="/" />
    }

    return (
        <div>
            <NavbarAdmin/>
            <p className="admin-transaction-title">Incoming Transaction</p>
            <Table className="table-transaction" striped size="sm">
                <thead>
                    <tr>
                        <th className="table-cell align-middle th" style={{color:"#ff0000"}}>No</th>
                        <th className="table-cell align-middle th" style={{color:"#ff0000"}}>Users</th>
                        <th className="table-cell align-middle th" style={{color:"#ff0000"}}>Bukti Transfer</th>
                        <th className="table-cell align-middle th" style={{color:"#ff0000"}}>Remaining Active</th>
                        <th className="table-cell align-middle th" style={{color:"#ff0000"}}>Status User</th>
                        <th className="table-cell align-middle th" style={{color:"#ff0000"}}>Status Payment</th>
                        <th className="table-cell align-middle th" style={{color:"#ff0000"}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="table-cell align-middle">1</td>
                        <td className="table-cell align-middle">Gandha Saputra</td>
                        <td className="table-cell align-middle">bca.jpg</td>
                        <td className="table-cell align-middle">26 / Hari</td>
                        <td className="table-cell align-middle" style={{color:"#0acf83"}}>Active</td>
                        <td className="table-cell align-middle" style={{color:"#0acf83"}}>Approve</td>
                        <td className="table-cell align-middle">
                            <Dropdown className="drop-down">
                                <Dropdown.Toggle className="dropdown-toggle" variant="link" id="dropdown-basic">
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#" className="approved-text">Approved</Dropdown.Item>
                                    <Dropdown.Item href="#" className="text-c">Cancel</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </td>
                    </tr>
                    <tr>
                        <td className="table-cell align-middle">2</td>
                        <td className="table-cell align-middle">Tria Aulia Sari</td>
                        <td className="table-cell align-middle">bni.jpg</td>
                        <td className="table-cell align-middle">26 / Hari</td>
                        <td className="table-cell align-middle" style={{color:"#0acf83"}}>Active</td>
                        <td className="table-cell align-middle" style={{color:"#0acf83"}}>Approve</td>
                        <td className="table-cell align-middle">
                            <Dropdown>
                                <Dropdown.Toggle className="dropdown-toggle" variant="link" id="dropdown-basic">
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#" className="approved-text">Approved</Dropdown.Item>
                                    <Dropdown.Item href="#" className="text-c">Cancel</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </td>
                    </tr>
                    <tr>
                        <td className="table-cell align-middle">3</td>
                        <td className="table-cell align-middle">Angel Natasha</td>
                        <td className="table-cell align-middle">bri.jpg</td>
                        <td className="table-cell align-middle">0 Hari</td>
                        <td className="table-cell align-middle" style={{color:"#ff0000"}}>Not Active</td>
                        <td className="table-cell align-middle" style={{color:"#ff0000"}}>Cancel</td>
                        <td className="table-cell align-middle">
                            <Dropdown>
                                <Dropdown.Toggle className="dropdown-toggle" variant="link" id="dropdown-basic">
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#" className="approved-text">Approved</Dropdown.Item>
                                    <Dropdown.Item href="#" className="text-c">Cancel</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </td>
                    </tr>
                    <tr>
                        <td className="table-cell align-middle">4</td>
                        <td className="table-cell align-middle">Joe Kevin</td>
                        <td className="table-cell align-middle">bsi.jpg</td>
                        <td className="table-cell align-middle">0 Hari</td>
                        <td className="table-cell align-middle" style={{color:"#ff0000"}}>Not Active</td>
                        <td className="table-cell align-middle" style={{color:"#F7941E"}}>Pending</td>
                        <td className="table-cell align-middle">
                            <Dropdown>
                                <Dropdown.Toggle className="dropdown-toggle" variant="link" id="dropdown-basic">
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#" className="approved-text">Approved</Dropdown.Item>
                                    <Dropdown.Item href="#" className="text-c">Cancel</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </td>
                    </tr>
                    <tr>
                        <td className="table-cell align-middle">5</td>
                        <td className="table-cell align-middle">Talita</td>
                        <td className="table-cell align-middle">bkb.jpg</td>
                        <td className="table-cell align-middle">0 Hari</td>
                        <td className="table-cell align-middle" style={{color:"#ff0000"}}>Not Active</td>
                        <td className="table-cell align-middle" style={{color:"#F7941E"}}>Pending</td>
                        <td className="table-cell align-middle">
                            <Dropdown>
                                <Dropdown.Toggle className="dropdown-toggle" variant="link" id="dropdown-basic"></Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#" className="approved-text">Approved</Dropdown.Item>
                                    <Dropdown.Item href="#" className="text-c">Cancel</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </td>
                    </tr>
                    <tr>
                        <td className="table-cell align-middle">6</td>
                        <td className="table-cell align-middle">Rizky Febian</td>
                        <td className="table-cell align-middle">bkp.jpg</td>
                        <td className="table-cell align-middle">0 Hari</td>
                        <td className="table-cell align-middle" style={{color:"#ff0000"}}>Not Active</td>
                        <td className="table-cell align-middle" style={{color:"#F7941E"}}>Pending</td>
                        <td className="table-cell align-middle">
                            <Dropdown>
                                <Dropdown.Toggle className="dropdown-toggle" variant="link" id="dropdown-basic">
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#" className="approved-text">Approved</Dropdown.Item>
                                    <Dropdown.Item href="#" className="text-c">Cancel</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default Admin
