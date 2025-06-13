import { UnslashImage } from "@/models/unslash-image"; 
import Image from "next/image";
import { Alert } from "@/components/bootstrap";
import styles from "./page.module.css";
import { Metadata } from "next";

interface Props {
  params: { topic: string };
}


export function generateMetadata({ params }: Props): Metadata {
  const { topic } = params;
  
  const title = topic.charAt(0).toUpperCase() + topic.slice(1);
  return {
    title: `${title} - Next.js Image Gallery`,
  };
}

export function generateStaticParams() {
  return ["apple", "tree", "coding"].map((topic) => ({ topic }));
}

export const revalidate = 3600;

export const dynamicParams = false;

export default async function Page({ params }: Props) {
  const { topic } = params;

  if (!process.env.UNSPLASH_ACCESS_KEY) {
    throw new Error("Unsplash API key is not configured. Please add UNSPLASH_ACCESS_KEY to your .env.local file.");
  }

  let images: UnslashImage[] = [];
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${topic}&count=10&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch images: ${response.statusText}`);
    }

    images = await response.json();
  } catch (error) {
    console.error("Error fetching images:", error);
    return (
      <div className={styles.container}>
        <Alert variant="danger" className="text-center mb-4">
          <h4>Failed to load images for topic: {topic}</h4>
          <p>This could be due to an API error or a network issue. Please try again later.</p>
        </Alert>
      </div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div className={styles.container}>
        <Alert variant="info" className="text-center mb-4">
          <h4>No images found for topic: {topic}</h4>
          <p>The Unsplash API did not return any images for this query.</p>
        </Alert>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Alert variant="info" className="text-center mb-4">
        <h4>Images for topic: {topic}</h4>
        <p className="mb-0">
          This page is <strong>statically rendered</strong> using Next.js with{" "}
          <code>generateStaticParams</code>. New images are fetched every hour via Incremental
          Static Regeneration (ISR).
        </p>
      </Alert>

      <div className={styles.imageGrid}>
        {images.map((image, index) => (
          <div className={styles.imageCard} key={image.id}>
            <Image
              src={image.urls.regular}
              width={400}
              height={300}
              alt={image.alt_description || image.description || `Image related to ${topic}`}
              className="img-fluid rounded"
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 400px"
              priority={index < 2} // Prioritize first two images for faster LCP
            />
            {/* FIX: Use optional chaining to prevent crashes if 'user' or 'username' is null/undefined */}
            {image.user?.username && (
              <div className={styles.imageInfo}>
                <small className={styles.userLink}>
                  by{" "}
                  <a
                    href={`https://unsplash.com/@${image.user.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fw-bold"
                  >
                    {image.user.username}
                  </a>
                </small>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}