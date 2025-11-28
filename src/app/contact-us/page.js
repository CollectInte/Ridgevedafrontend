'use client'
import LayoutOne from "@/components/Layout/LayoutOne";
import Link from "next/link";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import React, { useState,useEffect } from "react";
import Head from 'next/head';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SEOHead from "../seometatags/page";
import seoMetadata from "../../components/lib/seo-metadata";

export default function ContactUs() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const meta = seoMetadata.contactus;
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
    async function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitting(true);

        const formElement = e.target;
        const formData = new FormData(formElement);

        // Convert FormData to JSON
        const payload = {
            Name: formData.get("Name"),
            Subject: formData.get("Subject"),
            Email: formData.get("Email"),
            Phone: formData.get("Phone"),
            Message: formData.get("Message"),
        };

        console.log("Submitting Payload:", payload);

        try {
            const response = await fetch(process.env.NEXT_PUBLIC_SCRIPT_ENQUIRY, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            console.log("Response:", data);

            alert("Form submitted successfully!");
            formElement.reset();
        } catch (error) {
            console.error("There was an error submitting the form:", error);
            alert("An error occurred while submitting the form.");
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

         <LayoutOne>
            {/* <SEOHead
                title={meta.title}
                description={meta.description}
                keywords={meta.keywords}
            /> */}
            <div className="bg-subpage absolute top-0 w-full h-[740px] bg-linear-gradient z-[-1]"></div>

            <section className="form-contact-us pt-20">
                <div className="container">
                    <div className="flex max-lg:flex-col lg:items-center justify-between gap-y-8">
                        <div className="w-full lg:w-1/2 lg:pr-3">
                            <div className="infor">
                                <div className="heading">
                                    <div className="tag caption1 font-bold uppercase">Contact Us</div>
                                    <h2 className="heading5 mt-4">We’d Love to Help You Grow</h2>
                                    <p className="body2 mt-4">Thank you for choosing Ridgeveda Pvt Ltd as your trusted partner. We’re excited to connect with you and explore how our comprehensive services — spanning Online marketing, technology solutions, and sales support — can elevate your business.</p>
                                    <p className="body2 mt-4">Whether you're looking to boost your online presence, streamline operations with smart tech, or increase conversions through strategic sales efforts, our team is here to make it happen.</p>
                                    <p className="body2 mt-4">Let’s collaborate to unlock new opportunities, drive measurable growth, and take your brand to the next level.</p>
                                </div>

                                <div className="list-social flex items-center gap-5 mt-7">
                                    <Link className="item rounded-full w-12 h-12 flex items-center justify-center bg-white border-outline hover:bg-blue hover:text-white duration-300" href="https://www.facebook.com/profile.php?id=61583992647403" target="_blank">
                                        <i className="icon-facebook"></i>
                                    </Link>
                                    <Link className="item rounded-full w-12 h-12 flex items-center justify-center bg-white border-outline hover:bg-blue hover:text-white duration-300" href="https://www.linkedin.com/company/109917971/admin/dashboard/" target="_blank">
                                        <i className="icon-linkedin"></i>
                                    </Link>
                                    <Link className="item rounded-full w-12 h-12 flex items-center justify-center bg-white border-outline hover:bg-blue hover:text-white duration-300" href="https://x.com/RidgeVeda18911" target="_blank">
                                        <i className="icon-twitter"></i>
                                    </Link>
                                    <Link className="item rounded-full w-12 h-12 flex items-center justify-center bg-white border-outline hover:bg-blue hover:text-white duration-300" href="https://www.instagram.com/ridgeveda/" target="_blank">
                                        <i className="icon-instagram text-sm"></i>
                                    </Link>
                                </div>

                                <div className="list-more-infor lg:mt-10 mt-7">
                                    <div className="item flex items-center gap-6">
                                        <div className="icon flex items-center justify-center w-12 h-12 bg-blue text-white rounded-full">
                                            <Icon.Phone weight="bold" className="text-xl" />
                                        </div>
                                        <div className="text h-full flex-1 pl-6 border-l border-outline">
                                            <span className="body2">+91 89771 08950</span>
                                        </div>
                                    </div>
                                    <div className="item flex items-center gap-6 mt-5">
                                        <div className="icon flex items-center justify-center w-12 h-12 bg-blue text-white rounded-full">
                                            <Icon.EnvelopeSimple weight="bold" className="text-xl" />
                                        </div>
                                        <div className="text h-full flex-1 pl-6 border-l border-outline">
                                            <span className="body2">info@ridgeveda.com</span>
                                        </div>
                                    </div>
                                    <div className="item flex items-center gap-6 mt-5">
                                        <div className="icon flex items-center justify-center w-12 h-12 bg-blue text-white rounded-full">
                                            <Icon.MapPin weight="bold" className="text-xl" />
                                        </div>
                                        <div className="text h-full flex-1 pl-6 border-l border-outline">
                                            <span className="body2">Plot no. 40, Green Hills, Kaithalapur Flyover Rd, Bhagyanagar Colony, Madhapur, Hyderabad, Telangana 500072</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-1/2 lg:pl-12">
                            <form className="form-block bg-white rounded-2xl p-10 shadow-xl" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="max-xl:col-span-2 max-lg:col-span-1 max-sm:col-span-2">
                                        <input className="w-full bg-surface caption1 px-4 py-3 rounded-lg" id="Name" type="text" name="Name" placeholder="Name" required />
                                    </div>
                                    <div className="max-xl:col-span-2 max-lg:col-span-1 max-sm:col-span-2">
                                        <input className="w-full bg-surface caption1 px-4 py-3 rounded-lg" id="Subject" type="text" name="Subject" placeholder="Subject" required />
                                    </div>
                                    <div className="col-span-2">
                                        <input className="w-full bg-surface caption1 px-4 py-3 rounded-lg" id="Email" type="email" name="Email" placeholder="Email" required />
                                    </div>
                                    <div className="col-span-2">
                                        <input className="w-full bg-surface caption1 px-4 py-3 rounded-lg" name="Phone" type="number" placeholder="Phone No." required />
                                    </div>
                                    <div className="col-span-2">
                                        <textarea className="w-full bg-surface caption1 px-4 py-3 rounded-lg" name="Message" rows="4" placeholder="Your Questions..." required></textarea>
                                    </div>
                                    <div className="col-span-2">
                                        <input type="checkbox"/> <b>I agree to data processing as per the Terms & Conditions</b>
                                    </div>
                                </div>
                                <button className="button-main lg:mt-10 mt-7" disabled={isSubmitting}>
                                    {isSubmitting ? "Submitting..." : "Send Message"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <section className="our-location lg:py-20 sm:py-14 py-10 border-b border-outline"></section>
        </LayoutOne>
        </>
       
    );
}
