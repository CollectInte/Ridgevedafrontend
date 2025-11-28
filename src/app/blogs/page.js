"use client"; // Ensure it's a client component

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Correct import for App Router
import LayoutOne from "@/components/Layout/LayoutOne";
import Head from 'next/head';
import { Card, CardContent, Grid, Box, Button, Typography } from "@mui/material";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import  SEOHead from "../seometatags/page";
import seoMetadata from "../../components/lib/seo-metadata";

export default function BlogData() {
    const [blogdata, setBlogdata] = useState([]);
    const router = useRouter(); // ✅ Now this will work!
    const meta = seoMetadata.blogs;
     // Manually update document meta tags
  useEffect(() => {
    document.title = meta.title;
    
    const updateMeta = (name, content) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.name = name;
        document.head.appendChild(element);
      }
      element.content = content;
    };

    updateMeta('description', meta.description);
    updateMeta('keywords', meta.keywords.join(', '));
    updateMeta('robots', 'index, follow');
  }, [meta]);
    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_SCRIPT_GETBLOGS)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setBlogdata(data.data);
                }
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

        const handleReadMore = (title) => {
        // Convert spaces to `-` but leave special characters intact
        const slug = encodeURIComponent(
            title.trim().replace(/\s+/g, "-").replace(/-+$/, "")
        );
        router.push(`/seperateblog?slug=${slug}`);
        };


    return (
        <>
       <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords.join(', ')} />
        <meta name="robots" content="index, follow" />
      </Head>
         <LayoutOne>
          

            <div className="container mx-auto mt-10">
                <div className="row justify-content-center">
                    {blogdata.length > 0 ? (
                        <Grid container spacing={2}>
                            {blogdata.map((value, index) => (
                                <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                                    <Card sx={{ width: "100%", marginBottom: 2, display: "flex", flexDirection: "column" }}>
                                        <CardContent sx={{ flex: 1, overflow: "hidden" }}>
                                            <Box
                                                component="img"
                                                src={value.image}
                                                alt="Blog Image"
                                                sx={{ width: "100%", height: "280px", borderRadius: 2 }}
                                            />
                                            <Typography
                                                variant="h6"
                                                sx={{ paddingTop: "10px", fontSize: "20px", fontWeight: "bold" }}
                                            >
                                                {value.title}
                                            </Typography>
                                            <div
                                                dangerouslySetInnerHTML={{ __html: value.document.substring(0, 140) + "..." }}
                                                style={{ maxHeight: "95px", overflow: "hidden" }}
                                            />
                                        </CardContent>
                                        <div className="text-right p-2">
                                            <Button variant="text" sx={{ fontSize: "12px", color: "blue" }} onClick={() => handleReadMore(value.title)}>
                                                Read More
                                            </Button>
                                        </div>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Typography variant="h6">No blogs available</Typography>
                    )}
                </div>
            </div>

           
        </LayoutOne>
        </>
       
    );
}
