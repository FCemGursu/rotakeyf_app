// app/page.tsx
"use client";
export default function Home() {
  return (
    <main className="container">
      <div className="logo-area">
      </div>

      <div className="images-area">
        <img src="/rotalogo.png" alt="Resim 1" className="resim" />
        <img src="/rotayazı.png" alt="Resim 2" className="resim" />
      </div>

      <div className="message">
        <h1>Sitemiz şu an bakımdadır</h1>
        <p>Yakında açılacaktır </p>
      </div>

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: #000;
          font-family: sans-serif;
        }

        .logo-area {
          margin-bottom: 48px;
        }

        .logo-placeholder {
          width: 160px;
          height: 60px;
          border: 2px dashed #555;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #555;
          font-size: 14px;
          letter-spacing: 2px;
        }

        .images-area {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          margin-bottom: 48px;
        }

        .resim {
          width: 300px;
          border-radius: 12px;
        }

        .message {
          text-align: center;
        }

        .message h1 {
          font-size: 28px;
          font-weight: 600;
          color: #fff;
          margin: 0 0 12px;
        }

        .message p {
          font-size: 16px;
          color: #888;
          margin: 0;
        }
      `}</style>
    </main>
  );
}