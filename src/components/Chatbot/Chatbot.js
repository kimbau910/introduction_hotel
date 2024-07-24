import React, { useEffect } from 'react';
import axios from 'axios';

const Chatbot = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src =
            'https://sf-cdn.coze.com/obj/unpkg-va/flow-platform/chat-app-sdk/0.1.0-beta.5/libs/oversea/index.js';
        script.async = true;
        script.onload = () => {
            if (window.CozeWebSDK) {
                const chatbot = new window.CozeWebSDK.WebChatClient({
                    config: {
                        bot_id: '7394395897511673863',
                    },
                    componentProps: {
                        title: 'Ciau Hotel',
                    },
                });
            } else {
                console.error('window.CozeWebSDK không có sẵn');
            }
        };

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);
};

export default Chatbot;
