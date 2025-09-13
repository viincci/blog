// pages/blog.js
import { useState } from 'react'
import BlogList from '../components/BlogList'
import siteMetadata from '../data/siteMetadata'

export default function BlogPage() {
  return (
    <>
      {/* SEO Meta Tags */}
      <head>
        <title>{`Blog - ${siteMetadata.title}`}</title>
        <meta
          name="description"
          content="Explore botanical research, conservation stories, and plant discoveries from across South Africa. Heritage Road Map Foundation's collection of scientific articles and field reports."
        />
        <meta name="keywords" content="South African plants, botanical research, plant conservation, fynbos, karoo, grasslands, endemic species, biodiversity" />
        <meta property="og:title" content={`Plant Articles & Research - ${siteMetadata.title}`} />
        <meta
          property="og:description"
          content="Explore botanical research, conservation stories, and plant discoveries from across South Africa."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteMetadata.siteUrl}/blog`} />
        <meta property="og:image" content={`${siteMetadata.siteUrl}/static/images/blog-social.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Plant Articles & Research - ${siteMetadata.title}`} />
        <meta
          name="twitter:description"
          content="Explore botanical research, conservation stories, and plant discoveries from across South Africa."
        />
        <meta name="twitter:image" content={`${siteMetadata.siteUrl}/static/images/blog-social.jpg`} />
        <link rel="canonical" href={`${siteMetadata.siteUrl}/blog`} />
      </head>

      {/* Blog List Component */}
      <BlogList />
    </>
  )
}

// Optional: Add getStaticProps for SEO and performance
export async function getStaticProps() {
  return {
    props: {
      // You can pass any props here that the BlogList component might need
      // For example, initial data, configuration, etc.
    },
    // Regenerate the page at most once per day (86400 seconds)
    revalidate: 86400,
  }
                          }
