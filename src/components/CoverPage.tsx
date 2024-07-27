import { useNavigate } from 'react-router-dom';
import {useEffect} from "react";
import '../css/CoverPage.css';

const CoverPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/menu'); // Replace with your main page route
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="cover-content">
            {/*使用一张图片*/}
            <img src="/images/cover2.jpg" width="100%" height="100%" alt="Cover Image"/>
            {/*<h1>Welcome to My app!</h1>*/}
        </div>
    );
};
export default CoverPage;