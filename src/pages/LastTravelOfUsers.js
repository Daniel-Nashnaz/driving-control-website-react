import { Avatar, List, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {formatTimeWithAM_PM} from '../common/formtar'
import TravelService from '../services/travel.service';



const getRandomAvatar = () => {
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    return `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${randomNumber}`;
};


const LastTravelOfUsers = () => {
    const [initLoading, setInitLoading] = useState(true);
    const [data, setData] = useState([]);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await TravelService.getAllLastTravelOfUsers();
        setData(response);
        setInitLoading(false);
    };

    return (
        <List
            header={<div style={{ textAlign:'center' }}>
                <i><h4 style={{color:'gold'}}>Last Travels </h4></i>
                </div>}
            className="demo-loadmore-list"
            style={{ minHeight: '350px' }}
            loading={initLoading}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
                <List.Item
                actions={[
                    <Link to={`/user/${item.id}/${item.fullName}`} key="list-loadmore-more">
                        More Details
                    </Link>
                ]}
                >
                    <Skeleton avatar title={"Last Travels"} loading={item.loading} active>
                        <List.Item.Meta
                            avatar={<Avatar src={getRandomAvatar()} />}
                            title={item.fullName}
                            description={`Time Start: ${formatTimeWithAM_PM(item.timeStart)}, Username: ${item.userName}, Email: ${item.email}, 
                            Phone: ${item.phone}`}
                        />
                    </Skeleton>
                </List.Item>
            )}
        />
    );
};

export default LastTravelOfUsers;