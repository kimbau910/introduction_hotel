import CardComponent from '~/components/CardComponent/CardComponent';
import classNames from 'classnames/bind';
import styles from './style.module.scss';
import { useLocation } from 'react-router-dom';
import * as DetailService from '~/services/DetailService'
import { useState ,useEffect} from 'react';
import { useSelector } from 'react-redux'

const cx = classNames.bind(styles);
function TypeDetailPage() {
    const searchDetail = useSelector((state) => state?.detail?.search)
    const { state} = useLocation();
   
    const [details, setDetails] = useState([])
    const [panigate, setPanigate] = useState({
        page: 0,
        limit: 10,
        total: 1,
    })
    const fetchDetailType = async (type) => {
        const res = await DetailService.getDetailType(type)
        
        console.log('res',res)
       
            setDetails(res?.data)
            setPanigate({...panigate, total: res?.totalPage})
        
    }
    useEffect(() => {
        if(state){
            fetchDetailType(state, panigate.page, panigate.limit)
        }
    }, [state,panigate.page, panigate.limit])

    useEffect(() => {
        console.log('Current state:', state);
    }, [state]);
    

    return (
        <div>
          
            <h2> Khách sạn gần</h2>
            <div className={cx('container')}>
                <CardComponent />
                <CardComponent />
                <CardComponent />
                <CardComponent />
                <CardComponent />
            </div>
        </div>
    );
}

export default TypeDetailPage;
