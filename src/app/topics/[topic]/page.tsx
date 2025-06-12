import { UnslashImage } from "@/models/unslash-image";
import Link from "next/link";
import Image from "next/image";
import { Alert } from "@/components/bootstrap";
import styles from "./page.module.css";

interface Props {
  params: Promise<{ topic: string }>;
}

export default async function Page({ params }: Props) {
  const { topic } = await params;

  if (!process.env.UNSPLASH_ACCESS_KEY) {
    throw new Error("Unsplash API key is not configured");
  }

  const response = await fetch(
    `https://api.unsplash.com/photos/random?query=${topic}&count=10&client_id=${process.env.UNSPLASH_ACCESS_KEY}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch images from Unsplash");
  }

  const images: UnslashImage[] = await response.json();

  return (
    <div className={styles.container}>
      <Alert variant="info" className="text-center mb-4">
        <h4>Images for topic: {topic}</h4>
      </Alert>

      <div className={styles.imageGrid}>
        {images.map((image) => (
          <div className={styles.imageCard} key={image.id}>
            <Image
              src={image.urls.regular}
              width={400}
              height={300}
              alt={image.description || "Unsplash Image"}
              className="img-fluid"
              unoptimized
            />
            <div className={styles.imageInfo}>
              <small>
                by{" "}
                <Link href={`/users/${image.user.username}`}>
                  {image.user.username}
                </Link>
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}