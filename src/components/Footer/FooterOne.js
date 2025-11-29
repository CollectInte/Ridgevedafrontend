import Image from "next/image";
import Link from "next/link";
import * as Icon from '@phosphor-icons/react/dist/ssr';
import serviceData from "@/data/service/data.json";
import { convertToSlug } from "@/common/utils";
import "@/styles/text.css"; 
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import React, { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function FooterOne({ classname }) {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  return (
    <footer id="footer">

      <div className={`footer-block ${classname}`}>
        <div className="container py-[60px]">
          <div className="flex justify-between gap-y-8 max-xl:flex-wrap">
       <div className="xl:w-1/4 md:w-1/2">
  <div className="footer-company-infor flex flex-col items-start gap-3 w-full">

    <Link href="/" className="block self-start footer-logo -ml-5" >
      <img
        src="/images/logos/RV_logo_white.png"
        width={5000}
        height={100}
        alt="logo"
        className="w-[148px] block !m-0 !p-0"
      />
    </Link>

    <p className="caption1 text-left !m-0 !p-0 !ml-0 !pl-0">
      At Ridgeveda, we set out on a mission to seamlessly bridge the gap between
      offline and online customer acquisition channels, providing our clients with
      innovative, data-driven solutions that drive real results
    </p>

    <p className="caption1 text-left !m-0 !p-0 !ml-0 !pl-0">
      Mon - Fri: 9:00 - 19:00 <br /> Closed on Weekends
    </p>
  </div>
</div>



            <div className="w-full md:w-1/2">
              
                <div className="footer-nav-item flex flex-col md:flex-row md:justify-evenly  ">
                  <div>
                  <div className="item-heading text-button">Company</div>
                  <ul className="list-nav mt-3 flex flex-row gap-10" >
                    <li className="mt-2">
                      <Link className={`caption1 hover-underline  no-underline visited:text-black `} href="/contact-us">Contact Us</Link>
                    </li>
                    <li className="mt-2">
                      <Link className={`caption1 hover-underline  no-underline visited:text-black ` } href="/careers">Careers</Link>
                    </li>
                    
                    
                  </ul>
                </div>
                </div>
                {console.log("classname value of footer"+classname)}

                {/* <div className="footer-nav-item">
                  <div className="item-heading text-button">Solutions</div>
                  <ul className="list-nav mt-3">
                    <li className="mt-2">
                      <Link className={`caption1 hover-underline ${classname && 'underline-white'}`} href="/company/about-us">About us</Link>
                    </li>
                    <li className="mt-2">
                      <Link className={`caption1 hover-underline ${classname && 'underline-white'}`} href="/company/our-teams">Our Team</Link>
                    </li>
                    
                    <li className="mt-2">
                      <Link className={`caption1 hover-underline ${classname && 'underline-white'}`} href="/pages/contact-us">Contact</Link>
                    </li>
                  </ul>
                </div> */}
                {/* <div className="footer-nav-item">
                  <div className="item-heading text-button">Solutions</div>
                  <ul className="list-nav mt-3">
                    {serviceData.slice(0, 6).map(item => (
                      <li className="mt-2" key={item.id}>
                        <Link className={`caption1 hover-underline ${classname && 'underline-white'}`}
                          href={process.env.PUBLIC_URL + "/services/[slug]"}
                          as={
                            process.env.PUBLIC_URL + "/services/" + convertToSlug(item.title) + "?id=" + item.id
                          }
                        >
                          {item.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div> */}
              
            </div>
            <div className="xl:w-1/4 w-full">
              <div className="company-contact max-xl:w-1/2 max-sm:w-full">
                <div className="heading text-button">Connect with Us!</div>
                {/* <div className="send-block mt-4 flex items-center w-full relative">
                  <Icon.Envelope className="text-lg absolute top-1/2 left-0 -translate-y-1/2" />
                  <input className={`caption1 w-full h-[50px] pl-7 pr-9 bg-transparent border-b ${classname ? 'border-white focus:border-white' : 'border-black'}`} type="text" placeholder="Your email address" />
                  <button className="absolute right-0 top-1/2 -translate-y-1/2">
                    <Icon.PaperPlaneTilt className="text-2xl" />
                  </button>
                </div> */}
                <div className="list-social flex items-center flex-wrap gap-2.5 mt-7">
                  <Link className={`item rounded-full w-10 h-10 flex items-center justify-center duration-300 border border-surface2 no-underline hover:text-white hover:bg-black caption1 border-black text-black footer-icon ` } href="https://www.facebook.com/profile.php?id=61583992647403" target="_blank">
                    <i className="icon-facebook text-base"></i>
                  </Link>
                  <Link className={`item rounded-full w-10 h-10 flex items-center justify-center duration-300 border border-surface2 no-underline hover:text-white hover:bg-black caption1 border-black text-black footer-icon `}  href="https://www.linkedin.com/company/109917971/admin/dashboard/" target="_blank">
                    <i className="icon-linkedin text-base"></i>
                  </Link>
                  <Link className={`item rounded-full w-10 h-10 flex items-center justify-center duration-300 border border-surface2 no-underline hover:text-white hover:bg-black caption1 border-black text-black footer-icon `} href="https://x.com/RidgeVeda18911" target="_blank">
                    <i className="icon-twitter text-base"></i>
                  </Link>
   
                  <Link className={`item rounded-full w-10 h-10 flex items-center justify-center duration-300 border border-surface2 no-underline hover:text-white hover:bg-black caption1 border-black text-black footer-icon`} href="https://www.instagram.com/ridgeveda/" target="_blank">
                    <i className="icon-instagram text-sm"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="flex items-center sm:justify-between max-sm:flex-col gap-y-2 justify-center py-2 border-t border-outline">
              <div className="left-block flex items-center">
                <div className="copy-right text-surface1 caption1">©2025 Ridgeveda. All Rights Reserved.</div>
              </div>
              <div className="nav-link flex items-center gap-2.5">
<Link
  className="text-surface1 caption1 hover-underline cursor-pointer"
  href=""
  onClick={handleOpen}
>
  Terms and Conditions
</Link>
                <span className="text-surface1 caption1">|</span>
                <Link className="text-surface1 caption1 hover-underline" href="#!">Privacy Policy</Link>
                <span className="text-surface1 caption1">|</span>
                <Link className="text-surface1 caption1 hover-underline" href="#!">Cookie Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
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
        <Link href="https://wa.me/+918977108950" passHref target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon style={{ color: "#fff", fontSize: 25 }} />
        </Link>
      </div>
     
     {openModal && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[9999]">
    <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-[700px] max-h-[80vh] overflow-y-auto p-6 relative">
      
      {/* Close Button */}
      <button
        className="absolute top-3 right-3 text-black text-xl font-bold"
        onClick={handleClose}
      >
        ✕
      </button>

      <h2 className="text-xl font-semibold mb-4">Terms and Conditions</h2>
            <h2 className="text-xl font-semibold mb-4">Terms of Use</h2>

      <div className="text-sm leading-relaxed space-y-3 pr-2">
        <p>
          These Terms and Conditions (“Terms of Use”) outline important requirements regarding your access to and use of this website, our services, and your relationship with us. Please read these Terms carefully, as they contain essential information including service limitations, user responsibilities, privacy protections, dispute resolution methods, and conditions under which services may be modified, suspended, or terminated.
        </p>
        <p>
         By accessing or using this website or any of our services, you acknowledge that you have read, understood, and agreed to these Terms. If you do not agree with these Terms, you must discontinue use of the website and all related services.
        </p>
        <p>
          Your acceptance of these Terms constitutes a binding agreement applicable to all services you use or subscribe to from us, including any existing or future service plans.
        </p>
        <p>
          Agreement
        </p>
        <p>These Terms and Conditions, along with any additional terms communicated to you through service orders, subscription plans, privacy policies, or written communications, collectively form the complete agreement (“Agreement”) between you and our company.</p>
        <p>
          The Agreement becomes effective once:
        </p>
        <p>
          You access or use our website or services,
        </p>
        <p>
          You subscribe to any plan or service, or
        </p>
        <p>
          A service order is acknowledged by us via email, digital acknowledgment, or written confirmation.
        </p>
        <p>
          You agree to comply with all rules, guidelines, and policies made available to you through the website or through direct communication.
        </p>
        <p>
          Use of Services
        </p>
        <p>
          You agree to use our website and services only for lawful purposes. You shall not:
        </p>
        <p>
          Engage in fraudulent, abusive, or malicious activities
        </p>
        <p>
          Attempt to gain unauthorized access to systems or data
        </p>
        <p>
          Copy, distribute, republish, or misuse website content without written permission
        </p>
        <p>
          Post or transmit harmful code, bots, or disruptive software

        </p>
        <p>
          We reserve the right to restrict or terminate access if misuse or violation of terms is detected.
        </p>
        <p>
          Modification of Terms
        </p>
        <p>
          We reserve the right to update, modify, or replace any part of these Terms at any time. Updated Terms will be posted on this page with a revised effective date. Continued use of the website after such changes constitutes acceptance of the updated Terms.
        </p>
        <p>
          Service Availability & Changes
        </p>
        <p>
          We may modify, update, suspend, or discontinue any service features or content at any time without prior notice, including:
        </p>
        <p>
          Service plans
        </p>
        <p>
          Pricing
        </p>
        <p>
          Features
        </p>
        <p>
          Operational hours
        </p>
        <p>
          Data processing systems
        </p>
        <p>
          We will make reasonable efforts to inform users of major changes.
        </p>
        <p>
          User Responsibilities
        </p>
        <p>
          By using our website and services, you agree to:

        </p>
        <p>
          Provide accurate and complete information
        </p>
        <p>
          Maintain the confidentiality of your login credentials
        </p>
        <p>
          Notify us immediately in case of unauthorized access
        </p>
        <p>
          Use the services in compliance with all applicable laws

        </p>
        <p>
          You are responsible for all activity that occurs under your account.
        </p>
        <p>
          Limitation of Liability
        </p>
        <p>
          To the maximum extent permitted by law:
        </p>
        <p>
          We are not liable for any indirect, incidental, or consequential damages

        </p>
        <p>
          We do not guarantee uninterrupted or error-free service
        </p>
        <p>
          We are not responsible for loss of data, revenue, or business opportunities

        </p>
        <p>
          Service outcomes depend on multiple factors and are not guaranteed
        </p>
        <p>
          Our total liability shall not exceed the amount paid by you for the services in the last billing cycle.
        </p>
        <p>
          Privacy Policy
        </p>
        <p>
          Your use of our services is also governed by our Privacy Policy, which describes how we collect, use, store, and protect your personal information. By using our website, you consent to our data handling practices.
        </p>
        <p>
          Dispute Resolution
        </p>
        <p>
          In the event of any disagreement, both parties agree first to attempt an informal resolution. If unresolved, disputes shall be settled through:
        </p>
        <p>
          Arbitration (if applicable), or
        </p>
        <p>
          Courts with jurisdiction in [Your City/State]
        </p>
        <p>
          You waive any right to participate in class-action lawsuits.
        </p>
        <p>
          Termination

        </p>
        <p>
          We reserve the right to terminate or suspend access to services without notice if:
        </p>
        <p>
          You violate any terms
        </p>
        <p>
          Fraudulent or harmful activity is detected
        </p>
        <p>
          Required by law or legal authorities
        </p>
        <p>
          Upon termination, all outstanding payments remain due.
        </p>
        <p>
          Contact Information

        </p>
        <p>
          For questions, concerns, or support, you may contact us at:
        </p>
        <div className="flex items-center gap-2 mt-2">
      <EmailIcon className="text-primary" />
      <span>Email:info@ridgeveda.com</span>
    </div>

    <div className="flex items-center gap-2 mt-2">
      <PhoneIcon className="text-primary" />
      <span>Phone: +91 8977108950</span>
    </div>

    <div className="flex items-center gap-2 mt-2">
      <LocationOnIcon className="text-primary" />
      <span>Plot no. 40, Green Hills, Kaithalapur Flyover Rd, Bhagyanagar Colony, Madhapur, Hyderabad, Telangana 500072</span>
    </div>

      </div>

      <div className="mt-5 flex justify-end">
        <button
          onClick={handleClose}
          className="px-4 py-2 border border-black rounded-md hover:bg-black hover:text-white transition"
        >
          Close
        </button>
      </div>

    </div>
  </div>
)}

    </footer>
  );
}
