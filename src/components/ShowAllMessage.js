import {  List, Drawer, Divider } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useEffect, useState } from 'react';
import { formatTime } from '../common/formtar'
import ActionService from '../services/action.service';

function MessageList(props) {
    const { openDrawer } = props;
    const [data, setData] = useState([]);
    const [err, setErr] = useState("");
    const [open, setOpen] = useState(openDrawer);
    useEffect(() => {
        fetchData();
    }, [])



    const fetchData = async () => {
        try {
            const response = await ActionService.getAllMessagesSendOfCurrentUser();
            setData(response.data);
            if (response.data <= 0) {
                setErr("The system has not sent messages to users yet")
            }
        } catch (error) {
            setErr(error.message);
            console.error('Error fetching driving data:', error);
        }
    };


    // load more messages here and append to loadedMessages state
    // const onLoadMore = () => {
    // };

    const onClose = () => {
        setOpen(false);
    };


    /*const loadMoreButton = (
        <div
            style={{
                textAlign: 'center',
                marginTop: 12,
                height: 32,
                lineHeight: '32px',
            }}
        >
            <Button onClick={onLoadMore}>Load more</Button>
        </div>
    );*/

    return (<>
        <Drawer
            title={<Title level={3} style={{ color: 'blue', textAlign: 'center' }}>All messages sent to you</Title>}
            placement={'right'}
            width={780}
            onClose={onClose}
            open={open}
        >
            <List
                itemLayout="vertical"
                size="large"
                dataSource={data}
                renderItem={(message) => (<>
                    <List.Item key={message.id}>
                        <List.Item.Meta

                            title={<Title level={5} style={{ color: 'red' }}>{message.subject}</Title>}

                            description={
                                <div style={{ color: 'black' }} dangerouslySetInnerHTML={{ __html: message.body }} />
                            }
                        />
                        <Title level={4} style={{ color: 'darkgrey' }}>Sent at: {formatTime(message.sentTime)}</Title>
                    </List.Item>
                    <Divider />
                    {err &&
                        <Title level={3} style={{ color: 'red', textAlign: 'center' }}>No Message! {err}</Title>
                    }
                </>)}

            // loadMore={loadMoreButton}
            />
        </Drawer>





    </>);
}
export default MessageList;