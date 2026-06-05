import { useEffect } from 'react';

/**
 * GoogleAd Component
 * Renders a Google AdSense ad unit.
 * 
 * Defaults to the user's client ID: ca-pub-1228076139445897
 */
export default function GoogleAd({
  adClient = import.meta.env.VITE_GOOGLE_ADSENSE_CLIENT || 'ca-pub-1228076139445897',
  adSlot = import.meta.env.VITE_GOOGLE_ADSENSE_SLOT,
  adFormat = 'auto',
  responsive = 'true',
  style = { display: 'block' }
}) {
  useEffect(() => {
    if (!adClient) return;

    // 1. Inject script dynamically if not already injected
    const scriptId = 'google-adsense-script';
    let script = document.getElementById(scriptId);
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`;
      script.async = true;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }

    // 2. Push ad initialization if we have a slot
    if (adSlot) {
      const pushAd = () => {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
          console.error('AdSense initialization error:', err);
        }
      };

      if (window.adsbygoogle) {
        pushAd();
      } else {
        script.addEventListener('load', pushAd);
        return () => {
          script.removeEventListener('load', pushAd);
        };
      }
    }
  }, [adClient, adSlot]);

  // If slot is not configured, do not show any placeholder
  if (!adSlot) {
    return null;
  }


  return (
    <div className="google-ad-wrap" style={{ margin: '15px auto', width: '100%', minHeight: '90px', overflow: 'hidden' }}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}
