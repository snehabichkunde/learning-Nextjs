import { UnslashImage } from "@/models/unslash-image";
import Image from "next/image";
import Link from "next/link";
import { Alert } from "@/components/bootstrap";

export const metadata = {
  title: "Incremental Static Regeneration: Nextjs Image Gallery",
};

export default async function Page() {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}`,
    { next: { revalidate: 30 } } 
  );

  const image: UnslashImage = await response.json();
  const width = Math.min(image.width, 500);
  const height = (width / image.width) * image.height;

  return (
    <div className="container py-4">
      <Alert variant="success" className="text-center mb-4">
        <h4 className="mb-2">Incremental Static Regeneration (ISR)</h4>
        <p className="mb-0">
          This page is statically generated but revalidated every <strong>30 seconds</strong>.
          If 30 seconds have passed, a new image will be fetched and served to the next visitor.
        </p>
      </Alert>

      <div className="d-flex justify-content-center">
        <Alert variant="light" className="text-center shadow p-3 rounded">
          <Image
            src={image.urls.regular}
            width={width}
            height={height}
            alt={image.description || "Unsplash Image"}
            className="img-fluid rounded mb-2"
            unoptimized
          />
          <div>
            <small>
              Photo by{" "}
              <Link href={`/users/${image.user.username}`} className="fw-bold">
                {image.user.username}
              </Link>{" "}
              on Unsplash
            </small>
          </div>
        </Alert>
      </div>
    </div>
  );
}
