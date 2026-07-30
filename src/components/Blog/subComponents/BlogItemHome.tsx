import { IBlogDT } from "@/types/blog-d-t";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function BlogItemHome({
  id,
  delay,
  image,
  category,
  title,
  readTime,
  slug,
}: IBlogDT) {
  return (
    <div className="tp-blog-item p-relative mb-30 wow fadeInUp h-100">
      <div
        data-wow-duration="1s"
        data-wow-delay={delay}
      >
        <div className="tp-blog-item-thumb">
          <Link href={`/blog/${slug || id}`}>
            <Image 
              src={image} 
              alt={title} 
              loading="lazy"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
            />
          </Link>
        </div>
        <div className="tp-blog-item-content">
          <div className="tp-blog-meta d-flex align-items-center">
            <div className="tp-blog-meta-btn">
              <Link href="#">{category}</Link>
            </div>
            <span>{readTime}</span>
          </div>
          <h5 className="tp-blog-item-title">
            <Link href={`/blog/${slug || id}`}>{title}</Link>
          </h5>
        </div>
      </div>
    </div>
  );
}

export default React.memo(BlogItemHome);
