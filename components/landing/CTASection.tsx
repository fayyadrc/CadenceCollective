import React from 'react';
import { Link } from 'react-router-dom';

export const CTASection: React.FC = () => {
    return (
        <section className="py-24 px-6 bg-primary-dark text-white text-center">
            <div className="max-w-3xl mx-auto">
                <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6">Ready to find your voice?</h2>
                <p className="text-primary-light/80 text-xl mb-10 font-light">Join a community that champions individuality, shared rhythm, and the courage to create.</p>
                <Link
                    to="/apply"
                    className="inline-block px-10 py-4 bg-accent text-white font-bold rounded-full hover:bg-white hover:text-primary-dark transition-all duration-300 transform hover:-translate-y-1"
                >
                    Apply Now
                </Link>
            </div>
        </section>
    );
};
