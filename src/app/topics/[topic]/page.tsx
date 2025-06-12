import { UnslashImage } from "@/models/unslash-image";
import Image from "next/image";
import { Alert } from "@/components/bootstrap";
import styles from "./page.module.css";

interface Props {
  params: Promise<{ topic: string }>;
}

export function generateStaticParams() {
  return ["apple", "tree", "coding"].map((topic) => ({ topic }));
}

// Revalidate page every 1 hour for fresh content
export const revalidate = 3600;

export default async function Page({ params }: Props) {
  const { topic } = await params;

  if (!process.env.UNSPLASH_ACCESS_KEY) {
    throw new Error("Unsplash API key is not configured");
  }

  let images: UnslashImage[] = [];
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${topic}&count=10&client_id=${process.env.UNSPLASH_ACCESS_KEY}`,
      { next: { revalidate: 3600 } } // Cache API response for 1 hour
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch images: ${response.statusText}`);
    }

    images = await response.json();

    // Sanitize usernames to handle malformed data
    images = images.map((image) => ({
      ...image,
      user: {
        ...image.user,
        username: image.user.username.replace(/[^a-zA-Z0-9_-]/g, ""), // Remove invalid characters
      },
    }));
  } catch (error) {
    console.error("Error fetching images:", error);
    return (
      <div className={styles.container}>
        <Alert variant="danger" className="text-center mb-4">
          <h4>Failed to load images for topic: {topic}</h4>
          <p>Please try again later.</p>
        </Alert>
      </div>
    );
  }

  if (!images.length) {
    return (
      <div className={styles.container}>
        <Alert variant="info" className="text-center mb-4">
          <h4>No images found for topic: {topic}</h4>
        </Alert>
      </div>
    );
  }

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
              alt={image.alt_description || image.description || `Image related to ${topic}`}
              className="img-fluid rounded"
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 400px"
              priority={images.indexOf(image) < 2} // Prioritize first two images
            />
            <div className={styles.imageInfo}>
              <small className={styles.userLink}>
                by{" "}
                <a
                  href={`https://unsplash.com/@${image.user.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fw-bold"
                >
                  {image.user.username || "Unknown"}
                </a>
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}