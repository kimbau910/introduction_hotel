import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

const datas = [
    {
        h1: 'Tổng quan',
        ques1: 'Thông tin về khách sạn',
        ques2: 'Các tiện nghi chính',
        answer1:
        [ 'Khách sạn JW Marriott Hà Nội tọa lạc tại Khu Thương mại Trung tâm mới của Hà Nội. Khách sạn của chúng tôi ở Hà Nội nằm gần Sân bay Hà Nội và chỉ cách Trung tâm Hội nghị Quốc gia vài bước chân. Các điểm tham quan đáng chú ý khác như Khu Phố Cổ và Hồ Hoàn Kiếm gần đó.',]
           
       , answer2: [
            'Tổ chức hội nghị chuyên nghiệp',
            'Du lịch gia đình',
            'Trung tâm thể dục thể thao',
            'Truy cập Internet miễn phí',
            'Dịch vụ Spa',
            'Dịch vụ Internet tốc độ cao có tính phí',
            'Tổ chức đám cưới chuyên nghiệp',
            'Ứng dụng Dịch vụ Hội nghị',
            'Không gian tổ chức sự kiện hội nghị',
            'Bãi đậu xe',
            'Bể bơi trong nhà',
            'Các nhà hàng và quán Bar đẳng cấp',
            'Dịch vụ ẩm thực tại phòng',
            'Bồn tắm sục trong phòng',
            'Phòng xông hơi',
        ],
    },
    {
        h1: 'Tiện nghi',
        ques2: 'Nhà hàng & Lounge',
        ques1: 'Các tiện nghi chính',
        answer2: [
            'Kumihimo',

            'Ẩm thực Nhật Bản',

            ' Kumihimo là nhà hàng và quán bar Nhật Bản hiện đại, nơi các di sản gặp gỡ những kết nối có ý nghĩa để mang lại trải nghiệm ăn uống khó quên.',

            ' Mở cửa phục vụ bữa trưa và bữa tối',

            ' Trang phục: Lịch sự',

            ' Điện thoại: +84 243 8335 588',

            ' JW Lakeside Gardens',

            ' Đa dạng ẩm thực',

            ' Hãy đến với khu vườn ven hồ yên tĩnh của chúng tôi để tìm thấy sự bình yên ở Hà Nội. Từ trà chiều và trải nghiệm dã ngoại đến thực đơn gọi món lành mạnh, cùng với BBQ & Lều cho bữa tiệc ngoài trời tuyệt vời nhất.',

            '  Mở cửa phục vụ bữa trưa và bữa tối',

            ' Trang phục: Lịch sự',

            ' Điện thoại: +84 243 8335 588',

            ' JW Café',

            ' Ẩm Thực Quốc tế',

            'Đắm mình trong khung cảnh ven hồ tuyệt đẹp trong khi thưởng thức ẩm thực quốc tế tại JW Café, nhà hàng buffet thân thiện với gia đình của chúng tôi ở Hà Nội. Cung cấp các lựa chọn ăn tự chọn và gọi món dọc theo các khu nấu ăn mở, nhà hàng cung cấp đủ loại đặc sản. ',

            ' Mở cửa phục vụ bữa sáng, bữa trưa và bữa tối',

            ' Trang phục: Lịch sự',

            ' Điện thoại: +84 243 8335 588',

            ' John Anthony Thịt nướng Quảng Đông & Dim Sum',

            ' Ẩm thực Quảng Đông hiện đại',

            ' John Anthony Cantonese Grill & Dim Sum thúc đẩy sự kết hợp ngày càng đa dạng của ẩm thực với Vịt quay Bắc Kinh đặc trưng 42 ngày, thịt nướng nướng than, món dim sum thủ công và hải sản tươi sống. ',

            ' Mở cửa phục vụ bữa trưa và bữa tối',

            '  Trang phục: Lịch sự',

            ' Điện thoại: +84 243 8335 588',

            ' French Grill',

            ' Ẩm thực Pháp',

            ' Tìm ẩm thực Pháp hiện đại với thực đơn lập sẵn phù hợp, bảng chia sẻ và tuyển chọn các loại rượu vang ngon nhất. Trải nghiệm ẩm thực đáng nhớ tại nhà hàng Pháp cao cấp ở Hà Nội này.',

            'Mở cửa phục vụ bữa trưa và bữa tối',

            ' Trang phục: Lịch sự',

            ' Điện thoại: +84 243 8335 588',

            ' Cool Cats Jazz Club',

            ' Ẩm Thực Quốc tế',

            ' Hãy để quán bar cocktail Hà Nội của chúng tôi, Cool Cats Jazz Club, đưa bạn trở lại những năm 1920. Thưởng thức các buổi biểu diễn độc quyền từ các nhạc sĩ địa phương và quốc tế trong khi nếm thử các loại cocktail đặc trưng và tuyển chọn các món ăn nhẹ để bổ sung cho đồ uống của bạn.',

            ' Mở cửa phục vụ bữa tối',

            ' Trang phục: Lịch sự',

            '  Điện thoại: +84 243 8335 588',

            ' The Lounge',

            ' Ẩm Thực Quốc tế',

            ' Không gian ấm cúng như ở nhà tại Hà Nội, phục vụ trà chiều, cà phê đặc trưng với nhạc sống và ẩm thực địa phương.',

            ' Mở cửa phục vụ bữa sáng, bữa trưa và bữa tối',

            'Trang phục: Lịch sự',

            ' Điện thoại: +84 243 8335 588',

            ' Sữa & Co. ',

            ' Ẩm Thực Quốc tế ',

            ' Cung cấp thực phẩm, đồ uống lành mạnh, bổ dưỡng với nhiều loại sản phẩm từ sữa khác nhau. Hành trình khám phá và trải nghiệm tại Wellbeing on 8 sẽ được hoàn thiện cùng Milk & Co. ',

            ' Mở cửa phục vụ bữa trưa và bữa tối ',

            ' Trang phục: Lịch sự ',

            ' Điện thoại: +84 243 8335 588 ',

            '  JW Patisserie ',

            ' Ẩm Thực Quốc tế ',

            ' Đắm chìm trong thế giới ngọt ngào của những chiếc bánh nướng tuyệt ngon từ JW Patisserie tại quầy bánh của The Lounge. Được lấy cảm hứng và sáng tạo bởi đội ngũ bếp bánh đầy nhiệt huyết, JW Patisserie mang đến cho thực khách hương vị bánh Pháp tại Hà Nội. ',

            ' Mở cửa phục vụ bữa sáng, bữa trưa và bữa tối ',

            ' Trang phục: Lịch sự ',

            'Điện thoại: +84 243 8335 588 ',
        ],
        answer1: [
            'Các tiện nghi chính',
            'Nhận phòng: 03:00 PM',
            'Trả phòng: 12:00 PM',
            'Dịch vụ nhận phòng nhanh',
            'Dịch vụ trả phòng nhanh',
            'Truy cập Internet miễn phí',
            'Miễn phí Internet tốc độ cao: kiểm tra email và truy cập web.',
            'Miễn phí Sử dụng khu vực công cộng',
            'Bãi đậu xe',
            'Bãi đậu xe miễn phí trong khách sạn',
            'Chi tiết về khách sạn',
            '8 tầng , 394 phòng tiêu chuẩn , 56 phòng suite',
            '17 phòng họp, 2.258 m² tổng không gian hội họp',
            'Dịch vụ & Tiện nghi khách sạn',
            'Điều hòa nhiệt độ',
            'Đồng hồ báo thức',
            'Tất cả các khu vực chung đều cấm hút thuốc',
            'Bar-B-Q và/hoặc khu vực dã ngoại',
            'Nước đóng chai',
            'Bữa sáng tự chọn, phí từ 690.000,00 VND',
            'Máy rút tiền/ATM',
            'Sảnh cocktail có đồ ăn nhẹ',
            'Dịch vụ pha cà phê/trà',
            'Cà phê/trà trong phòng',
            'Phòng chờ Hạng đặc biệt',
            'Quầy lễ tân',
            'Cũi/Tấm quây cũi',
        ],
    },
    {
        h1: 'Phòng khách',
        answer: '',
    },
];

function ProductDetail() {
    const [selected, setSelected] = useState(null);

    const toggle = (i) => {
        if (selected === i) {
            return setSelected(null);
        }
        setSelected(i);
    };

    return (
        <div>
            <h1>The Oriental Jade Hotel</h1>
            <h5>Số 8 Đường Đỗ Đức Dục, Phường Mễ Trì, Quận Nam Từ Liêm Hà Nội, Việt Nam +84 243 8335 588</h5>
            
            <div className={cx('slideBar')}></div>

            {datas.map((item, i) => (
                <div key={i} className={cx('item_accor')}>
                    <div className={cx('overview')}>
                        <div className={cx('title_accor')} onClick={() => toggle(i)}>
                            <h1>{item.h1}</h1>
                            <span>{selected === i ? '-' : '+'}</span>
                        </div>
                        <div className={cx({ 'content_accor show': selected === i, content_accor: selected !== i })}>
                            <div className={cx('content_card')}>
                                {selected === i && (
                                    <>
                                        {item.ques1 && (
                                            <div className={cx('card')}>
                                                <h2>{item.ques1}</h2>
                                                <ul>
                                                    {item.answer1.map((en, index) => (
                                                        <li key={index}>{en}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {item.ques2 && (
                                            <div className={cx('card1')}>
                                                <h2>{item.ques2}</h2>
                                                <ul>
                                                    {item.answer2.map((en, index) => (
                                                        <li key={index}>{en}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductDetail;
