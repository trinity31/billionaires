import styles from "./page.module.css";
import Link from "next/link";
import { Billionaire } from "@/types/billionaire";

async function getBillionaires(): Promise<Billionaire[]> {
  const response = await fetch(
    "https://billions-api.nomadcoders.workers.dev/",
    { next: { revalidate: 3600 } }
  );
  return response.json();
}

export default async function Home() {
  const billionaires = await getBillionaires();
  
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>세계 억만장자 목록</h1>
      <div className={styles.grid}>
        {billionaires.map((billionaire) => (
          <Link
            href={`/person/${billionaire.id}`}
            key={billionaire.id}
            className={styles.card}
          >
            <img
              src={billionaire.squareImage}
              alt={billionaire.name}
              className={styles.image}
            />
            <div className={styles.cardContent}>
              <h2>{billionaire.name}</h2>
              <p className={styles.cardInfo}>
                {Math.round(billionaire.netWorth / 1000)} Billion / {billionaire.industries[0]}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
