import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
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
            <img src="/images/cover.png" alt="Cover Image"/>
        </div>
    );
};

export default CoverPage;
