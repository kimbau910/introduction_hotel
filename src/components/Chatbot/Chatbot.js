import React, { useEffect } from 'react';
import axios from 'axios';

const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sf-cdn.coze.com/obj/unpkg-va/flow-platform/chat-app-sdk/0.1.0-beta.4/libs/oversea/index.js';
    script.async = true;
    script.onload = () => {
      if (window.CozeWebSDK) {
        const chatbot = new window.CozeWebSDK.WebChatClient({
          config: {
            bot_id: '7389081212436217872',
          },
          componentProps: {
            title: 'Ciau Hotel',
          },
        });
        console.log('chatbot instance:', chatbot);
        if (typeof chatbot.on === 'function') {
          chatbot.on('message', async (event) => {
            const message = event.text;

            // Trích xuất ID từ tin nhắn
            const detailId = extractDetailIdFromMessage(message);

            if (detailId) {
              try {
                const hotelDetail = await fetchHotelDetail(detailId);
                chatbot.sendMessage(`Thông tin khách sạn: ${hotelDetail}`);
              } catch (error) {
                chatbot.sendMessage(`Không thể tìm thấy thông tin khách sạn: ${error.message}`);
              }
            } else {
              chatbot.sendMessage(`Không thể nhận diện yêu cầu của bạn. Vui lòng thử lại với định dạng: "hotel info {id}"`);
            }
          });
        } else {
          console.error('chatbot.on không phải là một hàm');
        }
      } else {
        console.error('window.CozeWebSDK không có sẵn');
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const extractDetailIdFromMessage = (message) => {
    // Sử dụng regex để trích xuất ID từ tin nhắn
    const match = message.match(/hotel info (\w+)/);
    return match ? match[1] : null;
  };

  const fetchHotelDetail = async (detailId) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/detail/get_details/${detailId}`);
      const data = response.data;
      if (data.status === 'OK') {
        const hotel = data.data;
        return `Name: ${hotel.name}, description: ${hotel.description}`;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error(`Lỗi khi tải chi tiết khách sạn: ${error.message}`);
    }
  };

  return <div></div>;
};

export default Chatbot;
