import React, { useEffect, useState, useRef } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import GenQoutes from '../components/GenQoutes';
import { images } from '../data/preload-image-list.json';
import { propose, qoutes } from '../data/quotes.json';

const Proposal = ({ className = '' }) => {
    const { id } = useParams();
    const person = id.split('-').join(' ');

    const [texts, setTexts] = useState([]);
    const [currentText, setCurrentText] = useState({
        image: 'https://res.cloudinary.com/codedfingers/image/upload/v1725282809/propose/13b7ef97-1543-44cf-b55b-b8ab8751b14c_2_c4ijjk.jpg',
        subtext: '',
    });
    const [currentIndex, setCurrentIndex] = useState(0);
    const audioRef = useRef(null);

    // Add quotes
    const addQuotes = () => {
        let nextQuote;
        if (currentIndex < qoutes.length) {
            nextQuote = qoutes[currentIndex];
        } else {
            nextQuote = propose;
        }

        setCurrentText((prevData) => ({ ...prevData, ...nextQuote }));
        setTexts((prevData) => [...prevData, nextQuote]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };

    // Handle click
    const handleClick = (e) => {
        const button = e.target;
        // Remove previous shaking effect
        button.classList.remove('shake');
        // Add quote
        addQuotes();
        // Add shaking effect
        button.classList.add('shake');
        // Remove shaking effect
        setTimeout(() => {
            button.classList.remove('shake');
        }, 1000);

        // Play audio on button click
        if (audioRef.current) {
            audioRef.current.play().catch((error) => console.log('Error playing audio:', error));
        }
    };

    // Effects
    useEffect(() => {
        document.title = `${person} - Be My Wife`;
    }, [person]);

    // Preload images
    useEffect(() => {
        images.forEach((image) => {
            const img = new Image();
            img.src = image;
        });
    }, []);

    return (
        <div
            className={`proposal ${className}`}
            style={{
                '--image': `url(${currentText.image})`,
            }}
        >
            <div className="proposal_media bg-dark d-none d-md-block" />
            <Container>
                <Row>
                    <Col md={6} className="ms-auto">
                        <div className="proposal_content py-5">
                            <div className="proposal_header">
                                <h1 className="proposal_title h4">
                                    Hey <b>Esther</b>
                                </h1>
                            </div>

                            <GenQoutes texts={texts} className="main-content" />
                            <p className="proposal_subtitle">{currentText.subtext}</p>

                            {currentText.id !== 'finished' ? (
                                <Button variant="danger" onClick={handleClick}>
                                    {texts.length ? 'Next' : 'Continue'}
                                </Button>
                            ) : (
                                ''
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
            {/* Replace with your Cloudinary audio URL */}
            <audio ref={audioRef} src="https://res.cloudinary.com/codedfingers/video/upload/v1725462064/marry_you_yyuyek.mp3" loop />
        </div>
    );
};

export default Proposal;
