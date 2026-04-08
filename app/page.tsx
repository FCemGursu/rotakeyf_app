// app/page.tsx
"use client";

export default function Home() {
  return (
    <main className="container">
      <div className="images-area">
        <img src="/rotalogo.png" alt="Rotakeyf Logo" className="resim" />
        <img src="/rotayazı.png" alt="Rotakeyf" className="resim" />
      </div>

      <div className="message">
        <h1>Sitemiz şu an bakımdadır</h1>
        <p>Yakında açılacaktır.</p>
      </div>

      <style jsx>{`
        .container {
          min-height: 100vh;
          min-height: 100dvh;
          width: 100vw;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: #000;
          padding: 2rem 1rem;
        }

        .images-area {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          margin-bottom: 40px;
          width: 100%;
        }

        .resim {
          width: clamp(200px, 30vw, 480px);
          height: auto;
          display: block;
        }

        .message {
          text-align: center;
        }

        .message h1 {
          font-size: clamp(20px, 2.5vw, 36px);
          font-weight: 600;
          color: #fff;
          margin-bottom: 10px;
        }

        .message p {
          font-size: clamp(14px, 1.4vw, 20px);
          color: #888;
        }
      `}</style>
    </main>
  );
}