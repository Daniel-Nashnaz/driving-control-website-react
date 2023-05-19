import { Avatar, Button, List, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';

const count = 10;
const LastTravelOfUsers = () => {
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    useEffect(() => {
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((res) => {
                setInitLoading(false);
                setData(res.results);
                setList(res.results);
            });
    }, []);
    return (
        <List
            className="demo-loadmore-list"
            loading={initLoading}
            itemLayout="horizontal"
            dataSource={list}
            renderItem={(item) => (
                <List.Item
                    actions={[<a key="list-loadmore-more">more</a>]}
                >
                    <Skeleton avatar title={"Last Travels"} loading={item.loading} active>
                        <List.Item.Meta
                            avatar={<Avatar src={item.picture.large} />}
                            title={<a href="https://ant.design">{item.name?.last}</a>}
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                    </Skeleton>
                </List.Item>
            )}
        />
    );
};
export default LastTravelOfUsers;