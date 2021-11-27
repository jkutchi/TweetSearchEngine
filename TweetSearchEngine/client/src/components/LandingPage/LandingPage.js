import { Component } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Title from '../Title/Title';
import "./LandingPage.css";

function LandingPage() {
    return (
        <div className="flex-center position-ref full-height">
            <div className="title">
            <Title/>
            </div>
            <SearchForm />
        </div>
    );
}

export default LandingPage;
