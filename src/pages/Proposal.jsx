import React, { useEffect, useState } from 'react';
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

    // add quotes
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

    // handle click
    const handleClick = (e) => {
        const button = e.target;
        // remove previous shaking effect
        button.classList.remove('shake');
        // add quote
        addQuotes();
        // add shaking effect
        button.classList.add('shake');
        // remove shaking effect
        setTimeout(() => {
            button.classList.remove('shake');
        }, 1000);
    };
    

    // effects
    useEffect(() => {
        document.title = `${person} - Be My Wife`;
    }, [person]);

    // preload images
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
                                    Hey <b>{person}</b>
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
        </div>
    );
};

export default Proposal;
