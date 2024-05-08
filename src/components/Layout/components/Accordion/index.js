import classNames from 'classnames/bind';
import styles from './accordion.module.scss';
import { useState } from 'react';
const cx = classNames.bind(styles);
const questions =[
    {
        question:'Giá trung bình của một khách sạn ở Hà Nội là bao nhiêu?',
        answer:'Giá trung bình cho một khách sạn 3 sao ở Hà Nội là 826.851 VND. Giá trung bình cho một khách sạn 4 sao ở Hà Nội là 1.429.367 VND. Giá trung bình cho một khách sạn 5 sao ở Hà Nội là 2.416.072 VND.',
    }, {
        question:'Đâu là những khách sạn tốt nhất gần Phố Cổ Hà Nội?',
        answer:'La Siesta Premium Hang Be Hotel, La Siesta Classic Ma May và La Siesta Classic Hang Thung là một vài khách sạn nổi tiếng nhất cho khách du lịch muốn lưu trú gần Phố Cổ Hà Nội',
    },
    {
        question:'Đâu là những khách sạn tốt nhất gần Hồ Hoàn Kiếm?',
        answer:'Những khách sạn nổi tiếng gần Hồ Hoàn Kiếm bao gồm La Siesta Premium Hang Be Hotel, The Oriental Jade Hotel và La Siesta Classic Hang Thung.',
    },
    {
        question:'Đâu là những khách sạn phù hợp cho gia đình tại Hà Nội? ',
        answer:'The Oriental Jade Hotel, La Siesta Classic Ma May và Bespoke Trendy Hotel Hanoi đều nhận được những đánh giá tuyệt vời từ các gia đình đi du lịch tại Hà Nội. ',
    },
    {
        question:'Khách sạn nào là lãng mạn nhất ở Hà Nội?',
        answer:'La Siesta Premium Hang Be Hotel, The Oriental Jade Hotel và La Siesta Classic Ma May đã nhận được đánh giá tuyệt vời từ khách du lịch tìm kiếm khách sạn lãng mạn tại Hà Nội.',
    }
]
function Accordion() {
    const [selected, setSelected] = useState(null);
    const toggle =(i)=>{
            if(selected === i ){
                return setSelected(null)
            }
            setSelected(i)
        }
    return (
        
        <div className={cx('ques')}>
            <h1>Câu hỏi thường gặp</h1>
       
            <div className={cx('accordion')} data-aos="fade-right">
                {questions.map((item,i) => (
                    <div className={cx('item_accor')}>
                        <div className={cx('title_accor')} onClick={()=>toggle(i)}>
                            <h2>{item.question}</h2>
                            <span>{selected === i ? '-' : '+'}</span>
                        </div>
                        <div className={cx({ 'content_accor show': selected === i, 'content_accor': selected !== i })}>{item.answer}</div>
                    </div>
                ))}
            </div>
         
        </div>
    );
}

export default Accordion;
