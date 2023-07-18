import React, { useContext, useEffect, useState } from 'react'
import { userRequest } from '../../requestMethods'
import { localDateStringToDDMMYYYY } from '../../utils/util'
import { Modal, Select, Spin, message } from 'antd'
import { json } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
const Manage = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null)
    const [selectIsAdmin, setSelectedIsAdmin] = useState(null)
    const [selectedRole, setSelectedRole] = useState(null)
    const { user } = useContext(AuthContext)
    const [messageApi, contextHolder] = message.useMessage();
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = async () => {
        setConfirmLoading(true);
        try {
            const res = await userRequest.post("/auth/change/role", {
                role: selectedRole,
                isAdmin: selectIsAdmin,
                email: selectedUser?.email,
                approvedBy: user?.email
            })
            if (res.data) {
                messageApi.open({
                    type: 'success',
                    content: 'Action Done',
                });
                getAllUsers()
            }
        } catch (error) {
            messageApi.open({
                type: 'error',
                content: 'there is some error, please try again later',
            });
        }
        setConfirmLoading(false)
        setOpen(false)
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const getAllUsers = async () => {
        setLoading(true)
        const res = await userRequest.get("/auth/users")
        setUsers(res.data)
        setLoading(false)
    }
    useEffect(() => {
        getAllUsers()
    }, [])

    const deleteUser = async (user) => {
        try {
            const res = await userRequest.delete(`/auth/user/${user?.email}`)
            if (res.data) {
                messageApi.open({
                    type: 'success',
                    content: 'Action Done',
                });
                getAllUsers()
            }

        } catch (error) {
            messageApi.open({
                type: 'error',
                content: 'There is some error, please try again later',
            });
        }
    }
    const changeRole = async (user) => {
        try {
            setSelectedUser(user)
            setOpen(true)
        } catch (error) {

        }
    }
    const handleChangeOfSelectRole = (value) => {
        console.log(`selected ${value}`);
        setSelectedRole(value)
    };
    const handleChangeOfSelectIsAdmin = (value) => {
        console.log(value)
        setSelectedIsAdmin(value)
    }
    console.log(users)
    return (
        <>
            <div className='d-flex justify-content-center'>
                {contextHolder}
                <Spin spinning={loading} size='large'>
                    {users.length > 0 && !loading == true ? <div className='tableWrapper mt-2'>
                        <table className='table text-center table-striped table-hover table-bordered'>
                            <tbody>
                                <tr className='thead-dark'>
                                    <th>
                                        _id
                                    </th>
                                    <th>email</th>
                                    <th>isAdmin</th>
                                    <th>role</th>
                                    <th>createdAt</th>
                                    <th>Approved By</th>
                                    <th>Actions</th>
                                </tr>
                                {
                                    users?.map(user => {
                                        return (
                                            <tr key={user._id}>
                                                <td>{user._id}</td>
                                                <td>{user.email}</td>
                                                <td>{user.isAdmin === true ? 'yes' : 'no'}</td>
                                                <td>{user.role}</td>
                                                <td>{localDateStringToDDMMYYYY(user.createdAt)}</td>
                                                <td>{user.approvedBy ? `${user.approvedBy}` : 'not approved'}</td>
                                                <td>{user.email !== 'ankushgupta365@gmail.com' ? <div className='d-flex'><button className='btn btn-primary m-1' onClick={() => deleteUser(user)}>delete</button>
                                                    <button className='btn btn-danger m-1' onClick={() => changeRole(user)}>approve</button></div> : null}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>

                        </table>
                    </div> : null}
                </Spin>
                <Modal
                    title="Approve User"
                    open={open}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                    okButtonProps={{
                        disabled: selectIsAdmin !== null && selectedRole !== null ? false : true,
                    }}
                >
                    <div className='d-flex'>
                        <label className='font-weight-normal'><mark>Present role:</mark></label>
                        <p className='ml-1'><mark>{selectedUser?.role}</mark></p>
                    </div>
                    <div className='d-flex'>
                        <label className='font-weight-normal'><mark>isAdmin:</mark></label>
                        <p className='ml-1'>{selectedUser?.isAdmin === true ? <mark>'yes'</mark> : <mark>'no'</mark>}</p>
                    </div>
                    <div className='d-flex align-items-center mt-3'>
                        <label className='font-weight-bold mr-2'>Select new role</label>
                        <Select
                            style={{
                                width: 120,
                            }}
                            onChange={handleChangeOfSelectRole}
                            options={[
                                {
                                    value: 'admin',
                                    label: 'admin',
                                },
                                {
                                    value: 'visitor',
                                    label: 'visitor',
                                },
                            ]}
                        />
                    </div>
                    <div className='d-flex align-items-center mt-3'>
                        <label className='font-weight-bold mr-2'>Select isAdmin</label>
                        <Select
                            style={{
                                width: 120,
                            }}
                            onChange={handleChangeOfSelectIsAdmin}
                            options={[
                                {
                                    value: 'no',
                                    label: 'false',
                                },
                                {
                                    value: 'yes',
                                    label: 'true',
                                },
                            ]}
                        />
                    </div>
                </Modal>
            </div>
        </>
    )
}

export default Manage