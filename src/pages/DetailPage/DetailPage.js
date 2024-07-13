import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HotelDetail from '../HotelDetail';
function DetailPage() {
    const { id } = useParams();
    return (
        <div>
            <HotelDetail idDetail={id} />
        </div>
    );
}

export default DetailPage;
