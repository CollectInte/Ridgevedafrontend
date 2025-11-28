'use client'
import React, { useState, useEffect } from "react";
import LayoutOne from "@/components/Layout/LayoutOne";
import Link from 'next/link';
import Head from 'next/head';
import '@/styles/text.css';
import seoMetadata from "../../components/lib/seo-metadata";

export default function Career() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const meta = seoMetadata.careers;

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

  function handleFileChange(e) {
    const file = e.target.files[0];
    setResumeFile(file);
  }

  async function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.target);
      const file = formData.get("Resume");
      const base64Resume = await fileToBase64(file);

      const payload = {
        Name: formData.get("Name"),
        Email: formData.get("Email"),
        Contact: formData.get("Contact"),
        Role: formData.get("Role"),
        Resume: base64Resume
      };

      const response = await fetch(process.env.NEXT_PUBLIC_SCRIPT_ENQUIRY_POST, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to submit");

      alert("Form submitted successfully!");
      e.target.reset();
      setResumeFile(null);

    } catch (err) {
      console.error(err);
      alert("Error submitting form");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords.join(', ')} />
        <meta name="robots" content="index, follow" />
      </Head>
      
      <LayoutOne className="-style-1">
        <div className="form-login lg:py-5 sm:py-14 py-2 border-b border-outline">
          <div className="container flex items-center justify-center">
            <div className="form-inner w-[470px] max-[510px]:w-full">
              <div className="tag caption1 font-bold uppercase career-text">Careers</div>
              <h3 className="heading3 text-center flex items-center justify-center whitespace-nowrap">
                Join us in our Journey 
              </h3>
              <form className="form mt-6" onSubmit={handleSubmit}>
                {/* Form fields remain the same */}
                <div className="form-group">
                  <label htmlFor="Name">Name*</label>
                  <input id="Name" type="text" name="Name" className="form-control w-full mt-3 border border-outline px-4 h-[50px] rounded" placeholder="Full Name*" required />
                </div>
                <div className="form-group mt-6">
                  <label htmlFor="Email">Email address*</label>
                  <input id="Email" type="email" name="Email" className="form-control w-full mt-3 border border-outline px-4 h-[50px] rounded" placeholder="Email address*" required />
                </div>
                <div className="form-group mt-6">
                  <label htmlFor="Contact">Contact No*</label>
                  <input id="Contact" type="tel" name="Contact" className="form-control w-full mt-3 border border-outline px-4 h-[50px] rounded" placeholder="Contact No*" required />
                </div>
                <div className="form-group mt-6">
                  <label htmlFor="Role">Role*</label>
                  <select id="Role" name="Role" className="form-control w-full mt-3 border border-outline px-4 h-[50px] rounded" required>
                    <option value="">Select Role</option>
                    <option>Field Sales</option>
                    <option>Freelancing</option>
                    <option>TeleSales & TeleCallers</option>
                    <option>Digital Marketing</option>
                    <option>FrontEnd Developer</option>
                    <option>BackEnd Developer</option>
                    <option>FullStack Developer</option>
                    <option>Content Developer/Writer</option>
                    <option>Graphic Designer</option>
                    <option>Business Executive</option>
                    <option>UI/UX Designer</option>
                  </select>
                </div>
                <div className="form-group mt-6">
                  <label htmlFor="Resume">Upload your Resume*</label>
                  <input id="Resume" type="file" name="Resume" className="form-control w-full mt-3 h-[80px] rounded" accept=".pdf,.doc,.docx" required onChange={handleFileChange} />
                </div>
                <div className="sub-input-checkbox flex items-center gap-2 mt-6">
                  <input id="checkbox" type="checkbox" name="checkbox" required />
                  <label htmlFor="checkbox" className="text-surface1">
                    I agree to the <Link href={'#!'} className="text-button text-black hover:underline" scroll={false}>Terms of Use</Link>
                  </label>
                </div>
                <div className="block-button mt-6">
                  <button type="submit" className="button-main bg-blue w-full text-center" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Apply"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </LayoutOne>
    </>
  );
}