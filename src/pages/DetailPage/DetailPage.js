import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProductDetail from '../ProductDetail';
function DetailPage() {
    const {id} = useParams()
    return ( 
        <div><ProductDetail idDetail={id} /></div>
     );
}

export default DetailPage;