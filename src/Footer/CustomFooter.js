import React from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Footer.css';

const { Footer } = Layout;

const CustomFooter = () => {
    return (
        <Footer className="custom-footer">
            <div className="footer-content">
                <span className="footer-text">To Do List Website ©2024</span>
                <nav className="footer-nav">
                    <Link to="/privacy" className="footer-link" aria-label="Privacy Policy">Privacy Policy</Link>
                    <Link to="/terms" className="footer-link" aria-label="Terms of Service">Terms of Service</Link>
                    <Link to="/contact" className="footer-link" aria-label="Contact Us">Contact Us</Link>
                </nav>
            </div>
        </Footer>
    );
};

export default CustomFooter;
