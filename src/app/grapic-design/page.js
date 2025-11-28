'use client'
import LayoutOne from "@/components/Layout/LayoutOne";
import Link from "next/link";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import React, { useState,useEffect } from "react";
import '../../styles/text.css';
import '../../styles/smostyle.css';
import '../../styles/graphicstyle.css';
import Head from 'next/head';
import { TextUnderline } from "@phosphor-icons/react";
import RealValueGraph from '../graph/page.js';

import Slider from '../slider/page';
import processSteps from "../../data/slidermobile/graphicdata.json"; // Import JSON file
import PopupForm from '../popup/page';
import  SEOHead from "../seometatags/page";
import seoMetadata from "../../components/lib/seo-metadata";
export default function Services() {    
    const sliderData = processSteps; // Get JSON data
    const [isDesktop, setIsDesktop] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showGetPopup, setShowGetPopup] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const meta = seoMetadata.graphicdesign;
    const [formData, setFormData] = useState({
      firstName: '',
      email: '',
      website: '',
      phone: '',
      requirements: '',
      checkbox: false,
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
 
const handleUrlChange = (e) => {
      setUrlData((prevData) => ({
        ...prevData,
        url: e.target.value
      }));
    };

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
        <div className="grid grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="col-span-12 lg:col-span-8 mt-5 pt-5">
            <div className="infor mt-5 pt-1">
              <div className="heading mt-5">
                <h2 className="heading4 mt-5">How Graphic designing services drive business growth ? </h2>
                <p className="body2 mt-4">
                Graphic design services drive business growth by creating visually compelling content that captures attention and strengthens brand identity. High-quality designs enhance marketing materials, improving engagement and communication with potential customers. Consistent, professional visuals build trust and set businesses apart from competitors.                </p>

              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="col-span-12 lg:col-span-4 flex justify-center lg:justify-end">
            <img src="images/services/grapic-design/images/graphic_design.png" alt="SEO Service" className="w-full max-w-xs lg:max-w-sm" />
          </div>
        </div>
      </section>

      {/* Strategies Heading */}
      <div className="heading text-center ">
        <h2 className="heading4 mt-7 text-center">Our graphic designing Strategies That Work</h2>
        <p className="body2 mt-6 text-blue seo-strategy-para text-center">Transforming Ideas into Growth-Driven Designs</p>
      </div>

      {/* SEO Strategies Section */}
      <section className="flex items-center justify-center min-h-screen px-5 lg:px-20 py-10 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 ">
          {/* Card 1 */}
          <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container ">
            <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg seo-icon-one">
              <img src="images/services/grapic-design/icons/logo-design.png" alt="Keyword Research Icon" className="w-20 h-20" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-black mb-2">Logo & Branding Design</h2>
              <p className="text-gray-700">
              Your logo is the cornerstone of your brand’s identity—it’s the first thing people associate with your business. We specialize in crafting logos that are not only visually appealing but also meaningful and memorable. Our design process involves in-depth research into your industry, competitors, and target audience, ensuring that your logo stands out and aligns with your brand values.
              </p>
            </div>
          </div>
          <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
            <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg seo-icon-one">
            <img src="images/services/grapic-design/icons/graphic-design.png" alt="Keyword Research Icon" className="w-20 h-20" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-black mb-2">Social Media Graphics</h2>
              <p className="text-gray-700">
              In the fast-paced world of social media, visuals play a crucial role in capturing attention and driving engagement. Our Social Media Graphics services are designed to help your brand shine on platforms like Instagram, Facebook, LinkedIn, and more. We create striking visuals that not only stand out in crowded feeds but also communicate your message clearly and effectively.
              </p>
            </div>
          </div>

          <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
            <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg seo-icon-one">
            <img src="images/services/grapic-design/icons/landing-page.png" alt="Keyword Research Icon" className="w-20 h-20" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-black mb-2">Website & Landing Page Design</h2>
              <p className="text-gray-700">
              Your website is often the first point of contact between your brand and potential customers. It needs to be visually engaging, easy to navigate, and optimized for conversions. Our Website & Landing Page Design services focus on creating user-friendly, aesthetically pleasing designs that enhance the user experience and encourage visitors to take action.
              </p>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
            <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg seo-icon-one">
            <img src="images/services/grapic-design/icons/digital.png" alt="Keyword Research Icon" className="w-20 h-20" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-black mb-2">Print & Digital Media Designs</h2>
              <p className="text-gray-700">
              From traditional print media to digital campaigns, our design expertise extends across all mediums. Whether you need business cards, brochures, banners, or digital ads, we provide cohesive and high-quality designs that effectively support your marketing efforts. Our team ensures that your brand’s visual identity remains consistent across both print and digital platforms, helping you build brand recognition and trust.
              </p>
            </div>
          </div>
        </div>
        
      </section>


     
      <h2 className="text-xl  text-black mt-5 text-center heading4">Ridgeveda Graphic Designing Insight Development</h2>
      {isDesktop ?(
         <section className=" graphic-section-smm" >

         <div className=" graphic-step-smm graphic-one-smm odd-graphic-design">
             <div className=" graphic-sub-image-smm graphic-sub-one-smm ">
             <img src="images/services/grapic-design/insight-icons/branding.svg" alt="Discover Icon" />
            
             </div>
             <h2>Brand Identity & Consistency</h2>
      
             <p>
             A strong visual identity, including logos, colors, and typography, creates brand recognition and trust, making a business memorable. Consistency across all platforms—websites, social media, and print—reinforces credibility and strengthens customer connections.
             </p>
            
         </div>


         <div className=" graphic-step-smm graphic-two-smm even-graphic-design">
         

         <div className=" graphic-sub-image-smm graphic-sub-two-smm ">
         <img src="images/services/grapic-design/insight-icons/user-experience.svg" alt="Discover Icon" />
         
         </div>
         <h2>User-Centered Design (UCD)</h2>
             <p>
             enhances user experience through intuitive layouts, easy navigation, and visually appealing designs. A well-structured interface improves engagement, reduces bounce rates, and keeps visitors on the platform longer. Prioritizing usability ensures higher customer satisfaction and boosts conversion rates.
             </p>
             
         </div>

 
     <div className=" graphic-step-smm graphic-three-smm odd-graphic-design">
        
         <div className=" graphic-sub-image-smm graphic-sub-three-smm">
         <img src="images/services/grapic-design/insight-icons/design-thinking.svg" alt="Discover Icon" />
        
         </div>
         <h2 className="!mb-4 ">Emotional & Psychological Impact</h2>
         <p className="mt-5" >
         Colors, fonts, and imagery play a key role in shaping customer emotions and perceptions, influencing their buying decisions. Warm tones create excitement, while softer colors build trust, and typography reinforces brand personality.
         </p>
        
     </div>
     <div className=" graphic-step-smm graphic-four-smm even-graphic-design">
         
         <div className=" graphic-sub-image-smm graphic-sub-four-smm ">
         <img src="images/services/grapic-design/insight-icons/visual-communication.svg" alt="Discover Icon" />
         
         </div>
         <h2>Adaptability & Trends</h2>
         <p>
         Staying updated with design trends helps brands remain fresh, modern, and visually appealing. Optimizing designs for web, social media, and print ensures consistency across all platforms. This adaptability strengthens brand relevance and keeps businesses competitive in a dynamic market.       </p>
        
     </div>
     <div className=" graphic-step-smm graphic-five-smm odd-graphic-design">
        
         <div className=" graphic-sub-image-smm graphic-sub-five-smm">
         <img src="images/services/grapic-design/insight-icons/change.svg" alt="Discover Icon" />
        
         </div>
         <h2 >Performance Tracking </h2>
         <p>
         Tracking campaign performance through KPIs like engagement, reach, and conversions helps refine strategies. Using affiliate links, UTM parameters, and promo codes links influencer efforts directly to sales and ROI.        </p>
         
     </div>
    
    
     
     </section>
      ): (
        <section className="mt-5 pt-5">
  
        <Slider data={sliderData} />
  
        </section>
        )}
      
     
    
     
     


      <section className="seo-subscribe-section text-black flex flex-wrap justify-center items-center mt-20 pt-20 graph-margin" style={{marginTop:"95px"}}>
      <div className="seo-subscribe-image">
      <img src="images/services/grapic-design/images/grap.png" alt="SEO Service"  />
      </div>

  <div className="seo-subscribe-content pt-1">
    <h2 className="pt-1 seo-subscribe-content-heading">
      Build Your Future with an <span className="seo-text">Graph Designing</span> Firm That Produces Results.
    </h2>
    <p className="pt-5 seo-subscribe-content-para">
    Designs That Captivate, Inspire, and Convert.    </p>
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

  <section className="seo-paragraph-content-section">
    <div className="seo-paragraph-content-container">
        <h2 className="heading4 text-center mx-2">Graphic Designing Support You Can Trust From Ridgeveda</h2>
        <p className="seo-paragraph-content-intro mx-3">
            At <a href="https://ridgeveda.com/" className="collectintel-anchor-text text-blue mx-auto text-center">Ridgeveda</a>, we don’t believe in one-size-fits-all solutions. Our graphic design process is highly personalized, ensuring that every design we create is tailored to your unique brand and business objectives. Whether you need a fresh logo, a complete rebrand, or ongoing design support for social media and marketing campaigns, we have the expertise to deliver top-notch results.        </p>

        {[
            " Tailored Designs for Your Unique Brand: We take the time to understand your brand, audience, and goals, ensuring that every design we create aligns with your vision and delivers the right message.",
            "  Consistent Visual Identity Across Channels: We ensure that your visual identity remains consistent across all platforms, from your website to social media and print materials, helping you build a cohesive and recognizable brand presence.",
            " Quick Turnaround & Professional Delivery: We pride ourselves on delivering high-quality designs on time, ensuring that your marketing efforts stay on track without compromising on quality.",
            
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
</section>


 
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
