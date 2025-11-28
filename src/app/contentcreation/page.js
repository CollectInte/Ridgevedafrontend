'use client'
import LayoutOne from "@/components/Layout/LayoutOne";
import Link from "next/link";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import React, { useState,useEffect } from "react";
import '../../styles/webdevstyles.css';
import { TextUnderline } from "@phosphor-icons/react";
import RealValueGraph from '../graph/page.js';
import Slider from '../slider/page';
import Head from 'next/head';
import PopupForm from '../popup/page';
import ContentInsight from '../advertisementinsight/page.js';
import processSteps from "../../data/slidermobile/adshootslider.json"; 
import '../../styles/adtext.css';
import '../../styles/smostyle.css';
import  SEOHead from "../seometatags/page";
import seoMetadata from "../../components/lib/seo-metadata";
export default function Services() {    
    const sliderData = processSteps; // Get JSON data
    const [isDesktop, setIsDesktop] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
     const meta = seoMetadata.contentcreation;
      const [showPopup, setShowPopup] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showGetPopup, setShowGetPopup] = useState(false);
    const [formData, setFormData] = useState({
      firstName: '',
      email: '',
      website: '',
      phone: '',
      requirements: '',
      checkbox:false,
    });
    const [urlData,setUrlData]=useState({
      url:''
    });
  const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: type === 'checkbox' ? checked : value,
  }));
};

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
         const timer = setTimeout(() => {
           setShowGetPopup(true); // Show popup after 10 seconds
         }, 10000); // 10000ms = 10s
     
         // Clean up the timer if the component unmounts before 10s
         return () => clearTimeout(timer);
       }, []);

    // useEffect(() => {
    //   const checkWindowSize = () => {
    //     setIsMobile(window.innerWidth <= 767);
    //   };
  
      
    //   checkWindowSize();
  
     
    //   window.addEventListener('resize', checkWindowSize);
  
     
    //   return () => window.removeEventListener('resize', checkWindowSize);
    // }, []);
  
    const handleUrlChange = (e) => {
      setUrlData((prevData) => ({
        ...prevData,
        url: e.target.value
      }));
    };
    
      const handleUrlSubmit = async (e) => {
  e.preventDefault();

  if (!urlData.url) {
    alert("Please enter a valid website URL.");
    return;
  }

  try {
    // Save the URL to the database
    const dbResponse = await fetch(
      process.env.NEXT_PUBLIC_SCRIPT_SERVICES_URL_SUBMISSION,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ websiteUrl: urlData.url }),
      }
    );

    const dbResult = await dbResponse.json();

    if (!dbResult.success) {
      alert(`Database Error: ${dbResult.message}`);
      return;
    }

    // Success message
    alert("Website URL submitted successfully!");

    // Reset form
    setUrlData({ url: "" });

  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while submitting the URL.");
  }
};
  
   const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.checkbox) {
      alert("Please agree to the privacy policy.");
      return;
    }
  
    try {
      // Send form details to the database
      const dbResponse = await fetch(process.env.NEXT_PUBLIC_SCRIPT_SERVICES_SUBMISSION, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const dbResult = await dbResponse.json();
      if (!dbResult.success) {
        alert(`Database Error: ${dbResult.message}`);
        return;
      }
  
      // Send email
      const emailResponse = await fetch(process.env.NEXT_PUBLIC_SCRIPT_SERVICES_SUBMISSION_EMAIL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const emailResult = await emailResponse.json();
      if (emailResult.status !== "success") {
        alert(`Email Error: ${emailResult.message}`);
        return;
      }
  
      // Success message
      alert("Details submitted successfully! Email sent!");
      
      // Reset form
      setFormData({
        firstName: "",
        email: "",
        website: "",
        phone: "",
        requirements: "",
        checkbox: false,
      });
  
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  useEffect(() => {
    const checkWindowSize = () => {
      setIsDesktop(window.innerWidth > 1024);
    };

    // Run only on client
    if (typeof window !== "undefined") {
      checkWindowSize();
      window.addEventListener("resize", checkWindowSize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", checkWindowSize);
      }
    };
  }, []);



    return (
      <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords.join(', ')} />
        <meta name="robots" content="index, follow" />
      </Head>
       <LayoutOne>
         
             {/* Background Section */}
      <div className="bg-subpage absolute top-0 w-full bg-linear-gradient z-[-1]"></div>
      {showGetPopup && <PopupForm onClose={() => setShowGetPopup(false)} />}
      {/* Introduction Section */}
      <section className="container mx-auto  px- lg:px-10 mt-2">
        <div className="grid grid-cols-12 gap-8 pt-5">
          {/* Left Column */}
              <div className="col-span-12 lg:col-span-8 mt-5 pt-5">
                <div className="infor">
                 
                   <div className="heading">
                    <h2 className="heading4 mt-5">Bring Your Brand Story to Life with High-Impact Visuals</h2>
                    <p className="body2 mt-4">
                     At Ridgeveda, we transform your ideas into stunning visual narratives that not only captivate your audience but also drive measurable business results. In an era where video content dominates the digital landscape, standing out requires more than just shooting a video — it demands storytelling excellence, creative vision, technical expertise, and platform-specific strategy.
                    </p>
                    <p className="body2 mt-4">
                     Our end-to-end Ad Shooting Services are designed to help businesses, startups, and influencers create compelling, high-quality video content that connects emotionally with viewers and inspires action. From concept to completion, we handle every aspect of production, ensuring a seamless process and a final product that elevates your brand.
                    </p>
                  </div>
                </div>
              </div>
              
          {/* Right Column */}
              <div className="col-span-12 lg:col-span-4 flex justify-center lg:justify-end">
                  <img src="images/services/adshoot/adshoot.jpg" alt="SEO Service" className="w-full max-w-xs lg:max-w-sm" />  
              </div>
        </div>
      </section>

     {/* Strategies Heading */}
     <div className="heading text-center ">
        <h2 className="heading4 mt-10 text-center mx-2">Our Ad Shooting Services That Work</h2>
        <p className="body2 mt-5 text-blue seo-strategy-para">We Don’t Just Build Websites – We Build Your Vision for Growth.           </p>
      </div>

      {/* SEO Strategies Section */}
      <section className="flex items-center justify-center  px-5 lg:px-20 py-10 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 ">
          {/* Card 1 */}
          <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container ">
            <div className="flex-shrink-0 bg-blue-100 px-3 rounded-lg seo-icon-one">
              <img src="images/services/adshoot/concept-development.png" alt="Keyword Research Icon" className="w-20 h-20" />
            </div>
            <div className="ml-4">
                <h2 className="text-xl font-bold text-black mb-2">Concept Development & Scriptwriting</h2>
                <p className="text-gray-700">
                    Every great ad begins with a strong idea. Our creative team works closely with you to understand your brand, audience, and goals. We then develop compelling concepts and craft custom scripts that deliver your message with clarity, creativity, and impact.
                </p>
                <ul className="list-disc list-inside text-gray-700 mt-2">
                    <li>Market research & audience insights</li>
                    <li>Storyboarding & scripting</li>
                    <li>Brand-aligned tone and messaging</li>
                </ul>
                </div>

          </div>
          <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
            <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg seo-icon-one">
            <img src="images/services/adshoot/videography.png" alt="Keyword Research Icon" className="w-20 h-20" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-black mb-2">Professional Video Shoots</h2>
              <p className="text-gray-700">
              We bring your vision to life using state-of-the-art filming equipment and industry-best production practices. Whether you need a sleek product demo, a cinematic commercial, or an emotional brand film, we ensure top-tier visuals and audio.
            </p>
               <ul className="list-disc list-inside text-gray-700 mt-2">
                    <li>On-location & studio shoots</li>
                    <li>4K/HD camera equipment & drone videography</li>
                    <li>Skilled crew: Directors, DOPs, stylists, makeup artists, and more</li>
                </ul>
            </div>
          </div>

          <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
            <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg seo-icon-one">
            <img src="images/services/adshoot/promotion.png" alt="Keyword Research Icon" className="w-20 h-20" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-black mb-2"> Product & Commercial Ads</h2>
              <p className="text-gray-700">
            We produce attention-grabbing ads tailored for performance across digital and traditional platforms — Instagram Reels, Facebook, YouTube ads, TV commercials, OTT platforms, and more.
              </p>
               <ul className="list-disc list-inside text-gray-700 mt-2">
                    <li>Short-form product highlights</li>
                    <li>Explainer videos</li>
                    <li>Sales-driven commercial ads</li>
                    <li>Lifestyle and testimonial-based product promotions</li>
                </ul>
            </div>
          </div>
            <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
            <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg seo-icon-one">
            <img src="images/services/adshoot/movie-star.png" alt="Keyword Research Icon" className="w-20 h-20" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-black mb-2">Corporate & Brand Films</h2>
              <p className="text-gray-700">
               Tell the world what your brand stands for. We create powerful corporate and brand films that communicate your mission, vision, culture, and story — ideal for investor presentations, internal communications, and brand building.
              </p>
               <ul className="list-disc list-inside text-gray-700 mt-2">
                    <li>Company introduction videos</li>
                    <li>Employee engagement & culture films</li>
                    <li>CSR, recruitment, and testimonial videos</li>
                </ul>
            </div>
          </div>
           <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
            <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg seo-icon-one">
            <img src="images/services/adshoot/post-production.png" alt="Keyword Research Icon" className="w-20 h-20" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-black mb-2">Post-Production & Editing</h2>
              <p className="text-gray-700">
          The real magic happens in post. Our in-house editing team meticulously crafts your footage into a polished masterpiece with modern effects, clean transitions, sound design, and visual enhancements.
              </p>
               <ul className="list-disc list-inside text-gray-700 mt-2">
                    <li>Advanced editing & color grading</li>
                    <li>Animation & motion graphics</li>
                    <li>Voiceovers, background score & subtitles</li>
                    <li>Multi-language support (on request)</li>
                </ul>
               </div>
          </div>
         
          {/* Card 2 */}
          <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
            <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg seo-icon-one">
            <img src="images/services/adshoot/order.png" alt="Keyword Research Icon" className="w-20 h-20" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-black mb-2"> Multi-Platform Delivery & Optimization</h2>
              <p className="text-gray-700">
          We ensure your ad is not only stunning but also optimized for performance across all relevant platforms. From mobile-friendly formats to platform-specific aspect ratios, we tailor your video for maximum reach and impact.
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                    <li>Formats for Facebook, Instagram, YouTube, LinkedIn, OTT, and TV</li>
                    <li>Vertical, square, and horizontal edits</li>
                    <li>Thumbnail design & captioning support</li>
                </ul>
            </div>
          </div>
        </div>


        
        
      </section>
        <h2 className="heading4 mt-10 text-center mx-2">Why Choose Ridgeveda?</h2>

     
    {isDesktop ?  <ContentInsight /> : <section  style={{marginTop:"60px"}}>

    <Slider data={sliderData} />

    </section>}

    


      

      <section className="seo-subscribe-section text-black flex flex-wrap justify-center items-center mt-10 pt-10">
      <div className="seo-subscribe-image web-dev-mobile-img">
      <img src="images/services/web-development/images/web.png" alt="SEO Service"   />  
      </div>

  <div className="seo-subscribe-content pt-5 mt-5">
    <h2 className="pt-1 seo-subscribe-content-heading">
      Build Your Future with <span className="seo-text">Ad Shooting Services</span> Firm That Delivers Real Results..
    </h2>
    <p className="pt-5 seo-subscribe-content-para">
    Innovative Ad Shooting Services for a Stronger Brand Presence.
    </p>
    <div className="seo-subscribe-form pt-5">
      <form className="seo-form" onSubmit={handleUrlSubmit}>
        <input 
          type="url" 
          placeholder="Enter Your Website URL" 
          className="form-control text-left pl-2 w-full border rounded" 
          onChange={handleUrlChange}
          style={{ marginBottom: '10px', padding: '10px' }} 
          value={urlData.url} 
          required />
        <button  
          type="submit"
          className="text-center seo-subscribe-button w-full bg-blue-500 text-white py-2 rounded"
        >
          Reserve Your Strategy Call
        </button>
      </form>
    </div>
  </div>
</section>

  {/* <section className="seo-paragraph-content-section">
    <div className="seo-paragraph-content-container">
        <h2 className="heading4 mx-3 text-center">Tech Services Support You Can Trust From Ridgeveda</h2>
        <p className="seo-paragraph-content-intro mx-3">
            At <a href="https://Ridgeveda.com/" className="Ridgeveda-anchor-text text-blue mx-auto text-center">Ridgeveda</a>, we understand that your website is the backbone of your digital presence. Keeping it updated, functional, and secure is essential to maintaining a strong online presence and ensuring a seamless user experience. Our Web Development Support services are designed to provide ongoing maintenance, updates, and technical assistance, so your website remains at its best.    </p>

        {[
            " Comprehensive Website Maintenance & Security: We handle regular website maintenance, including software updates, plugin installations, and security patches. Our team also provides continuous security monitoring, protecting your site from malware, hacking attempts, and vulnerabilities through SSL installation and regular audits.",
            " Bug Fixes, Performance & Optimization: From fixing broken links and coding errors to optimizing loading speed and image compression, we ensure your website runs smoothly. Our fast response time minimizes disruptions, while performance enhancements provide the best user experience across all devices.",
            " Content Updates & Design Adjustments: Keep your website fresh with content updates, blog additions, and minor design tweaks. We also ensure your website remains fully responsive, offering seamless functionality on all screen sizes, from mobile to desktop.",
            " Backup, Restore & E-Commerce Support: We provide regular data backups with quick restore options to prevent data loss. For e-commerce websites, we support cart functionality, payment gateway integration, product updates, and inventory management, keeping your online store running smoothly.",
            " Custom Enhancements & Analytics: As your business grows, we assist in adding new features, plugins, and third-party integrations to enhance your site’s functionality. Additionally, we provide analytics and reporting services to track key performance metrics, helping you make data-driven improvements.",
        ].map((text, index) => (
          
            
            <p 
                key={index} 
                className='seo-paragraph-content-step'
            >
              <img src="images/services/arrow-right.png"  alt="image not found" ></img>
                {text}
            </p>
           
          
        ))}
    </div>
</section> */}


 
<section class="seo-form-section">
   
   <div class="seo-form-image">
       {/* <img src="images/services/frame1.png" alt="Form Image" /> */}
       <h1 className="w-100 ">
       We help you to <br/>  grow your business <br/> faster & easier.
       </h1>
       <br/>
       <br/>
       <p>
       Accelerate Your Growth, Effortlessly
       </p>
   </div>
<div class="seo-form-container">
   
<form className="seo-form" onSubmit={handleSubmit}>
 <h1 className="text-form-head">Get in touch</h1>
 <p className="text-form-para">Our friendly team would love to hear from you.</p>
 <div className="form-group">
   <label htmlFor="firstName">First Name:</label>
   <input
     type="text"
     name="firstName"
     placeholder="Enter your first name"
     value={formData.firstName}
     onChange={handleChange}
     required
   />
 </div>
 <div className="form-group">
   <label htmlFor="email">Email:</label>
   <input
     type="email"
     name="email"
     placeholder="Enter your email"
     value={formData.email}
     onChange={handleChange}
     required
   />
 </div>
 <div className="form-group">
   <label htmlFor="website">Website:</label>
   <input
     type="text"
     name="website"
     placeholder="Enter your website URL"
     value={formData.website}
     onChange={handleChange}
   />
 </div>
 <div className="form-group">
   <label htmlFor="phone">Phone Number:</label>
   <input
     type="tel"
     name="phone"
     placeholder="Enter your phone number"
     value={formData.phone}
     onChange={handleChange}
   />
 </div>
 <div className="form-group">
   <label htmlFor="requirements">Requirements:</label>
   <textarea
     name="requirements"
     rows="4"
     placeholder="Enter your requirements"
     value={formData.requirements}
     onChange={handleChange}
   ></textarea>
 </div>

 {/* checkbox */}
 <div className="flex items-start gap-3 w-full " >
  <input
    type="checkbox"
    id="agreement"
    name="checkbox"
    checked={formData.checkbox}
    onChange={handleChange}
    className="w-5 h-5 "  
  />
  <p className="text-sm text-gray-500 leading-snug ">
    You agree to our friendly
    <span
      className="text-blue-600 underline cursor-pointer ml-2 text-blue font-bold  "
      onClick={() => setShowPopup(true)}
    >
      privacy policy
    </span>
  </p>
</div>

 <button type="submit" className="submit-button">
   Send message
 </button>
</form>
  </div> 

  <div className={`popup-overlay ${showPopup ? "active" : ""}`}>
   <div className="popup-content">
     <h2>Privacy Policy</h2>
     <p>
       This is our privacy policy. We ensure your data is protected and
       used responsibly.
     </p>
     <button className="close-btn" onClick={() => setShowPopup(false)}>
       Close
     </button>
   </div>
 </div>

</section>

        </LayoutOne>
      </>
       
    );

}
