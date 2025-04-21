'use client';

import { useEffect, useState } from 'react';
import styles from "./page.module.css";

export default function Home() {
  const [banner, setBanner] = useState({
    name: '',
    visibility: '',
    headline: '',
    cta_text: '',
    cta_url: '',
    start_date: '',
    end_date: '',
    background_image: [{
      url: '',
    }],
  });

  useEffect(() => {
    (async () => {
      const { bannerData } = await fetch('/api/banner-data').then(res => res.json());
      console.log(bannerData[0].fields);

      setBanner(bannerData[0].fields);
    })();
  }, []);

  return (
    <div className={styles.page}>
      <h1 className={styles.previewTitle}>Preview</h1>
      <div style={{
        backgroundImage: `url(${banner.background_image[0].url})`,
        backgroundPosition: 'cover',
        padding: '60px 40px',
        maxWidth: '1000px',
        borderRadius: '3px',
      }}>
        <div>
          <div style={{
            fontSize: '40px',
            color: '#fff',
            marginBottom: '10px',
          }}>
            {banner.headline}
          </div>
          <a href={banner.cta_url} style={{
            textDecoration: 'none',
            padding: '20px 40px',
            borderRadius: '4px',
            color: '#345',
            backgroundColor: '#fff',
            display: 'inline-block',
          }}>
            {banner.cta_text}
          </a>
        </div>
      </div>
    </div>
  );
}
