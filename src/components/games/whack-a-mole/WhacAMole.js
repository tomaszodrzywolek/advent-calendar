// src/components/WhacAMoleEmbed/WhacAMoleEmbed.js

import React from 'react';
import './WhacAMole.css';

const WhacAMoleEmbed = () => {
  return (
    <div className="whac-a-mole-embed">
      <iframe
        height="300"
        style={{ width: '100%' }}
        title="Whac-a-Mole w/ React && GSAP 😎🔨"
        src="https://codepen.io/smashingmag/embed/JjWdLPO?default-tab=html%2Cresult"
        loading="lazy"
        allowFullScreen={true}
      >
        {/* Fallback content for browsers that do not support iframes */}
        See the Pen{' '}
        <a href="https://codepen.io/smashingmag/pen/JjWdLPO">
          Whac-a-Mole w/ React && GSAP 😎🔨
        </a>{' '}
        by Smashing Magazine (<a href="https://codepen.io/smashingmag">@smashingmag</a>) on{' '}
        <a href="https://codepen.io">CodePen</a>.
      </iframe>
    </div>
  );
};

export default WhacAMoleEmbed;
