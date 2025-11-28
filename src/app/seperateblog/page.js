"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Using useRouter() instead of useSearchParams()
import LayoutOne from "@/components/Layout/LayoutOne";
import { Typography, Card, CardContent, Box, CircularProgress } from "@mui/material";
import '../../styles/text.css';

// Function to fetch blog data based on slug
async function fetchBlogData(slug) {
  try {
    // Convert URL slug back to readable title
    const decodedSlug = decodeURIComponent(slug.replace(/-/g, " "));
    console.log("Fetching blog for:", decodedSlug);

    // Read API URL from .env
    const apiURL = process.env.NEXT_PUBLIC_BLOG_API_URL;

    // Build final request URL
    const url = `${apiURL}?title=${encodeURIComponent(decodedSlug)}`;

    const res = await fetch(url, { cache: "no-cache" });

    if (!res.ok) {
      throw new Error(`Failed to fetch blog: ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();

    return data.success ? data.data : null;

  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}


export default function SeperateBlog() {
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [slug, setSlug] = useState(null);

  // Extract slug from URL on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const slugParam = params.get("slug");
      if (slugParam) {
        setSlug(slugParam);
      }
    }
  }, []);

  useEffect(() => {
    if (!slug) return;

    async function loadBlog() {
      const blogData = await fetchBlogData(slug);
      if (blogData) {
        setBlog(blogData);
      } else {
        setError("Blog not found");
      }
      setLoading(false);
    }

    loadBlog();
  }, [slug]);

  if (loading) {
    return (
      <LayoutOne>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <CircularProgress />
        </Box>
      </LayoutOne>
    );
  }

  if (error) {
    return (
      <LayoutOne>
        <Typography sx={{ textAlign: "center", marginTop: "20px", fontSize: "20px", color: "red" }}>
          {error}
        </Typography>
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
          <Typography
            variant="h6"
            sx={{
              paddingTop: "10px",
              fontSize: "25px",
              fontWeight: "bold",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            {blog.title}
          </Typography>
          {/* <div>
            <p
              dangerouslySetInnerHTML={{ __html: blog.document }}
              style={{ textAlign: "justify", marginTop: "20px"}}
              className="justify-center a:text-blue-600 a:underline"
            ></p>
          </div> */}
          <div className="blog-content">
            <p dangerouslySetInnerHTML={{ __html: blog.document }} style={{ textAlign: "justify", marginTop: "20px" }}></p>
          </div>
        </CardContent>
      </Card>
    </LayoutOne>
  );
}