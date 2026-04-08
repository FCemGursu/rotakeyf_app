// app/page.tsx
"use client";
export default function Home() {
  return (
    <main className="container">
      <div className="content">
        <div className="images-area">
          <img src="/rotalogo.png" alt="Rota Logo" className="resim" />
          <img src="/rotayazı.png" alt="Rota Yazı" className="resim" />
        </div>

        <div className="message">
          <h1>Sitemiz şu an bakımdadır</h1>
          <p>Yakında açılacaktır.</p>
        </div>
      </div>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .container {
          min-height: 100dvh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #000;
          font-family: sans-serif;
          padding: clamp(20px, 3vw, 44px);
          overflow-x: hidden;
        }

        .content {
          width: min(96vw, 1200px);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .images-area {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(14px, 2.6vw, 28px);
          margin-bottom: clamp(28px, 5vw, 56px);
          width: 100%;
          max-width: 980px;
        }

        .resim {
          width: min(100%, clamp(260px, 40vw, 560px));
          height: auto;
          display: block;
        }

        .message {
          text-align: center;
          width: 100%;
          max-width: 900px;
        }

        .message h1 {
          font-size: clamp(22px, 2.7vw, 40px);
          font-weight: 600;
          color: #fff;
          margin: 0 0 10px;
          line-height: 1.2;
        }

        .message p {
          font-size: clamp(14px, 1.5vw, 20px);
          color: #888;
          margin: 0;
        }

        @media (min-width: 1700px) {
          .resim {
            width: min(100%, 620px);
          }

          .message h1 {
            font-size: 44px;
          }

          .message p {
            font-size: 22px;
          }
        }
      `}</style>
    </main>
  );
}