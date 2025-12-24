import { notification, Table } from 'antd'; // Import Table từ antd
import { useEffect, useState } from 'react';
import { getUserApi } from '../utils/api';

const UserPage = () => {
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await getUserApi();
            console.log("User API Response: ", res);
            if (!res?.messsage) {
                setDataSource(res)
            } else {
                notification.error({
                    message: 'Unauthorized',
                    description: res?.message,
                });
            }
        }
        fetchUser();

    }, [])


    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Role',
            dataIndex: 'role',
        },

    ];


    return (
        <div style={{ marginTop: 50, textAlign: 'center', fontSize: 30, fontWeight: 'bold' }}>
            <Table bordered
                dataSource={dataSource} columns={columns}
                rowKey='_id'
            />
        </div>
    )
}

export default UserPage;