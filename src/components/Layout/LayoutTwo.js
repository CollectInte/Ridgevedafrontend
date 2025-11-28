"use client";

import React from "react";
import HeaderTwo from "../Header/HeaderTwo";
import FooterOne from "../Footer/FooterOne";
import withScrollFixed from "@/common/withScrollFixed";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Link from "next/link"; // If you're using Next.js's <Link>

let ScrollFixedHeader = withScrollFixed(HeaderTwo);

export default function LayoutTwo(props) {
  return (
    <>
      <ScrollFixedHeader container={props.container} />
      {props.children}

      {/* Floating WhatsApp Icon */}
      <div style={{
        position: "fixed",
        bottom: "30px",
        left: "35px",
        zIndex: 1000,
        backgroundColor: "#25D366",
        borderRadius: "50%",
        padding: "12px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        cursor: "pointer"
      }}>
        <Link href="https://wa.me/1234567890" passHref target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon style={{ color: "#fff", fontSize: 25 }} />
        </Link>
      </div>

      <FooterOne />
    </>
  );
}
