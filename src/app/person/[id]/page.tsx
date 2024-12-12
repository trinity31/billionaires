import { Billionaire } from "@/types/billionaire";
import styles from "./page.module.css";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const billionaire = await getBillionaire(id);
  return {
    title: `${billionaire.name}`,
  };
}

async function getBillionaire(id: string): Promise<Billionaire> {
  const response = await fetch(
    `https://billions-api.nomadcoders.workers.dev/person/${id}`,
    { next: { revalidate: 3600 } }
  );
  return response.json();
}

export default async function PersonDetail({
    params,
}: {
    params: Promise<{ id: string }>
  }) {
  const { id } = await params;
  const billionaire = await getBillionaire(id);

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backButton}>
        ← 목록으로
      </Link>
      <div className={styles.profile}>
        <img
          src={billionaire.squareImage}
          alt={billionaire.name}
          className={styles.image}
        />
        <h1>{billionaire.name}</h1>
        <div className={styles.info}>
          <p>
            <span className={styles.label}>Networth:</span>{" "}
            {Math.round(billionaire.netWorth / 1000)} Billion
          </p>
          {billionaire.country && (
            <p>
              <span className={styles.label}>Country:</span> {billionaire.country}
            </p>
          )}
          <p>
            <span className={styles.label}>Industry:</span>{" "}
            {billionaire.industries[0]}
          </p>
        </div>
        {billionaire.bio && (
          <div className={styles.bio}>
            {billionaire.bio.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </div>
        )}
        
        {billionaire.financialAssets && (
          <div className={styles.assets}>
            <h2>Financial Assets</h2>
            <div className={styles.assetsList}>
              {billionaire.financialAssets.map((asset, index) => (
                <div key={index} className={styles.assetCard}>
                  <div className={styles.assetInfo}>
                    <p>Ticker: {asset.ticker}</p>
                    <p>Shares: {asset.numberOfShares.toLocaleString()}</p>
                          {asset.exerciseOptionPrice && <p>Excersie Price: ${asset.exerciseOptionPrice}</p>}
               
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}