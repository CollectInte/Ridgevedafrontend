// ✅ No need for "use client" because it's a Server Component

import React from "react";
import LayoutOne from "@/components/Layout/LayoutOne";
import Typography from "@mui/material/Typography";
import { Card, CardContent, Box } from "@mui/material";

// Function to revert URL-friendly title back to normal
function revertURLToTitle(urlTitle) {
  return decodeURIComponent(urlTitle.replace(/-/g, " ")); // Replace hyphens with spaces
}

// ✅ Pre-fetch all blog titles at build time
export async function generateStaticParams() {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_SCRIPT_GETBLOGS);
    const data = await res.json();

    console.log("✅ Blogs fetched for static generation:", data.data); // Debugging

    if (!data.success) return [];

    return data.data.map((blog) => ({
      title: encodeURIComponent(blog.title.replace(/\s+/g, "-")),
    }));
  } catch (error) {
    console.error("❌ Error fetching blog list:", error);
    return [];
  }
}



// ✅ Fetch a single blog post at request time
async function fetchBlogData(title) {
  try {
    // Convert encoded URL title back to readable text
    const decodedTitle = revertURLToTitle(title);

    const apiURL = process.env.NEXT_PUBLIC_BLOG_API_URL; 
    const url = `${apiURL}?title=${encodeURIComponent(decodedTitle)}`;

    const res = await fetch(url, {
      method: "GET",
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch blog: ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();

    return data.success ? data.data : null;

  } catch (error) {
    console.error("❌ Error fetching blog:", error);
    return null;
  }
}


// ✅ Server Component - No useEffect, useState, or useSearchParams
export default async function BlogDetails({ params }) {
  const { title } = params;
  const blog = await fetchBlogData(title);

  if (!blog) {
    return (
      <LayoutOne>
        <Typography>Blog not found</Typography>
      </LayoutOne>
    );
  }

  return (
    <LayoutOne>
      <Card sx={{ width: "100%", marginBottom: 2, display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: 1, overflow: "hidden" }}>
          <Box
            component="img"
            src={blog.image}
            alt="Blog Image"
            sx={{ width: "100%", height: "500px", borderRadius: 2 }}
          />
          <Typography variant="h6" className="text-center" sx={{ marginTop: "20px", fontSize: "25px", fontWeight: "bold" }}>
            {blog.title}
          </Typography>
          <div dangerouslySetInnerHTML={{ __html: blog.document }} className="text-justify" />
        </CardContent>
      </Card>
    </LayoutOne>
  );
}
