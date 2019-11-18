import React from 'react';

const Location = () => {
    return (
        <div className="location_wrapper">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7449.418753999427!2d105.84151262472217!3d21.004283760013493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x5c6c6ff25c1bb3db!2zbmjDoCBDMSDEkeG6oWkgaOG7jWMgQsOhY2ggS2hvYSBIw6AgTuG7mWksIMSQ4bqhaSBD4buTIFZp4buHdCwgSMOgIE7hu5lp!5e0!3m2!1svi!2s!4v1568713489643!5m2!1svi!2s"
                width="100%"
                height="500px"
                frameBorder="0"
                allowFullScreen
            />
            <div className="location_tag">
                <div>Location</div>
            </div>
        </div>
    );
};

export default Location;