import React, { useEffect } from 'react';

const HotjarTracking = () => {
  useEffect(() => {
    if (import.meta.env.VITE_HOTJAR_ENABLED) {
      // Create script element
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = `
        (function(h,o,t,j,a,r){
          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:${import.meta.env.VITE_HOTJAR_ID},hjsv:${import.meta.env.VITE_HOTJAR_SNIPPET_VERSION}};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      `;

      // Append script element to head
      document.head.appendChild(script);
    }
  }, []);

  return null;
};

export default HotjarTracking;
