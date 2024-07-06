import classNames from 'classnames/bind';
import styles from './TravelExp.module.scss';
const cx = classNames.bind(styles);
const datas = [
    {
        topic: 'Cẩm nang du lịch Hà Nội: Những điều thú vị bạn chưa biết về Hà Nội',
        hin1: 'Hà Nội là thủ đô của Việt Nam, nằm ở phía Bắc đất nước. Thành phố này có một lịch sử lâu đời và văn hóa phong phú. Tuy nhiên, nếu bạn chưa đến Hà Nội bao giờ, có lẽ bạn chưa biết những điều thú vị về thành phố này.',
        hin2: 'Những điều thú vị về Hà Nội bao gồm những con phố cổ kính, những ngôi đền và chùa cổ xưa, những quán cà phê đặc trưng và những món ăn đặc sản nổi tiếng. Hà Nội cũng là nơi sinh sống của nhiều tác giả, nhà văn, nhà thơ và nghệ sĩ nổi tiếng.',
    },
    {
        topic: '10 lý do khiến bạn muốn đến Hà Nội ngay lập tức',
        hin1: 'Hà Nội là một điểm đến tuyệt vời cho những ai yêu thích văn hóa và lịch sử. Thành phố này có nhiều điểm đến thú vị, bao gồm Bảo tàng Dân tộc học Việt Nam, Lăng Chủ tịch Hồ Chí Minh, Chùa Một Cột và Hồ Gươm. Ngoài ra, Hà Nội cũng nổi tiếng với những con phố cổ kính như phố Hàng Bạc, phố Hàng Đào, phố Hàng Gai và phố Hàng Mã.',
        hin2: 'Hà Nội cũng là nơi để thưởng thức những món ăn đặc sản nổi tiếng như phở, bún chả, bánh cuốn và nem rán. Điều đặc biệt là bạn có thể thưởng thức những món ăn này ở những quán ăn đường phố vô cùng đơn giản và giá cả phải chăng.',
        hin3: 'Nếu bạn muốn mua sắm, Hà Nội cũng có nhiều chợ đặc trưng như chợ Đồng Xuân, chợ Hàng Đào và chợ Hàng Mã. Bạn có thể tìm thấy những món đồ lưu niệm và quà tặng độc đáo để mang về cho người thân và bạn bè.',
    },
    {
        topic: 'Thời điểm tốt nhất để đến Hà Nội là khi nào?',
        hin1: 'Thời điểm tốt nhất để đến Hà Nội là vào mùa thu, từ tháng 9 đến tháng 11 hoặc mùa xuân, từ tháng 3 đến tháng 5. Trong mùa thu, thời tiết ở Hà Nội mát mẻ và trong mùa xuân, thành phố tràn ngập hoa anh đào và hoa phượng.',
    },
    {
        topic: 'Đặc sản ẩm thực Hà Nội: Những món ăn không thể bỏ qua',
        hin1: 'Hà Nội là một điểm đến tuyệt vời cho những ai yêu thích ẩm thực. Thành phố này có nhiều món ăn đặc sản nổi tiếng như phở, bún chả, bánh cuốn và nem rán. Ngoài ra, bạn cũng nên thử một số món ăn đặc trưng khác như bánh mì pate, bánh gối và chả cá Lã Vọng.',
        hin2: 'Bạn có thể thưởng thức những món ăn này ở những quán ăn đường phố vô cùng đơn giản và giá cả phải chăng. Nếu bạn muốn thưởng thức ẩm thực Hà Nội tại nhà hàng cao cấp, bạn có thể đến nhà hàng Sen Hanoi, nhà hàng 1946 hoặc nhà hàng Quán Ăn Ngon.',
    },
    {
        topic: 'Làm thế nào để đi lại trong Hà Nội?',
        hin1: 'Đi lại trong Hà Nội có thể khá khó khăn nếu bạn không biết cách. Tuy nhiên, có nhiều phương tiện giao thông công cộng để bạn di chuyển đến khắp thành phố. Bạn có thể đi bằng xe buýt, taxi, Grab hoặc xe máy.',
        hin2: 'Nếu bạn muốn trải nghiệm phương tiện giao thông đặc trưng của Hà Nội, bạn có thể thử xe lôi, một loại xe ba bánh được kéo bởi người lái xe. Xe lôi có thể chở được từ 2 đến 4 khách và là một phương tiện di chuyển độc đáo để khám phá thành phố.',
    },
];
function TravelExp() {
    return (
        <div>
            <h1>Kinh nghiệm du lịch Hà Nội</h1>
            {datas.map((data) => (
                <div className={cx('container')}>
                <div className={cx('exp')}>
                    <h2>{data.topic}</h2>
                    <p>{data.hin1}</p>
                    <p>{data.hin2}</p>
                    <p>{data.hin3}</p>
                </div></div>
            ))}
        </div>
    );
}

export default TravelExp;
