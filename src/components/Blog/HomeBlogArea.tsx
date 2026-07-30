"use client";

import BlogItemHome from "./subComponents/BlogItemHome";
import BlogSlider from "./BlogSlider";
import blogData from "@/data/blogData";
import { useTranslation } from "@/contexts/LanguageContext";

export default function HomeBlogArea({ wrapClass }: { wrapClass?: string }) {
  const { t } = useTranslation();

  return (
    <section
      className={`pt-50 pb-50 ${wrapClass ? wrapClass : "tp-blog-area"}`}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="tp-blog-heading text-center mb-50">
              <h3 className="tp-section-title">{t("home.latestArticleAndNews")}</h3>
            </div>
          </div>
        </div>
        <BlogSlider itemsPerSlide={3} gap={30}>
          {blogData.map((blog) => (
            <BlogItemHome key={blog.id} {...blog} />
          ))}
        </BlogSlider>
      </div>
    </section>
  );
}
