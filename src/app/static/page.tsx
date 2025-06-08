import { UnslashImage } from "@/models/unslash-image";
import Image from "next/image";
import Link from "next/link";
import { Alert } from "@/components/bootstrap";

export const metadata = {
  title: "Static Rendering: Nextjs Image Gallery",
};

export default async function Page() {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );

  const image: UnslashImage = await response.json();

  const width: number = Math.min(image.width, 500);
  const height: number = (width / image.width) * image.height;

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <Alert variant="info">
          <h4 className="mb-2">Static Image Page</h4>
          <p className="mb-0">
            This page is <strong>statically rendered</strong> at build time using Next.js.
            The image below is randomly chosen during the build and remains the same until the next deployment.
          </p>
        </Alert>
      </div>

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
