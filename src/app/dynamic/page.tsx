import { UnslashImage } from "@/models/unslash-image";
import Image from "next/image";
import Link from "next/link";
import { Alert } from "@/components/bootstrap";

export const metadata = {
  title: "Dynamic Rendering: Nextjs Image Gallery",
};

export default async function Page() {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}`,
    { cache: 'no-store' } 
  );

  const image: UnslashImage = await response.json();
  const width = Math.min(image.width, 500);
  const height = (width / image.width) * image.height;

  return (
    <div className="container py-4">
      <Alert variant="warning" className="text-center mb-4">
        <h4 className="mb-2">Dynamic Image Page</h4>
        <p className="mb-0">
          This page uses <strong>Server-Side Rendering (SSR)</strong>. A new random image is fetched from Unsplash on every request.
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
