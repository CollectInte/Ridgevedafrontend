'use client'
import LayoutOne from "@/components/Layout/LayoutOne";
import Link from "next/link";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import React, { useState,useEffect } from "react";
import Head from 'next/head';
import '../../styles/text.css';
import '../../styles/salesstyle.css';
import SeoInsight from '../seoinsight/page.js';
import { TextUnderline } from "@phosphor-icons/react";
import RealValueGraph from '../graph/page.js';
// import processSteps from "../../data/slidermobile/seosliderdata.json";
import processSteps from "../../data/slidermobile/salessliderdata.json"; // Import JSON file

import SalesInsight from '../salesinsight/page.js';
import Slider from '../slider/page';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import '../../styles/sales.css';
import PopupForm from '../popup/page';
import  SEOHead from "../seometatags/page";
import seoMetadata from "../../components/lib/seo-metadata";
export default function Services() {    
  const [showPopup, setShowPopup] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
   const [showGetPopup, setShowGetPopup] = useState(false);
  
    const sliderData = processSteps; // Get JSON data
    const [isSubmitting, setIsSubmitting] = useState(false);
    
     const [isClient, setIsClient] = useState(false);
    const meta = seoMetadata.marketing;
        
        
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

    const [presentViews, setPresentViews] = useState(0);
    const [expectedViews, setExpectedViews] = useState(0);
    const [months,setMonths]=useState(0);
    const [graphData, setGraphData] = useState([]);

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


    React.useEffect(() => {
           const timer = setTimeout(() => {
             setShowGetPopup(true); // Show popup after 10 seconds
           }, 10000); // 10000ms = 10s
       
           // Clean up the timer if the component unmounts before 10s
           return () => clearTimeout(timer);
         }, []);

    const handleGraph = (e) => {
      e.preventDefault(); // Prevent page reload
    
      // Get form values
      let present = Number(e.target.presentviews.value);
      let expected = Number(e.target.expectedviews.value);
    
      // Calculate months required
      let total = present + present * 0.3;
      let count = 1;
    
      while (total <= expected) {
        total = total + total * 0.3;
        count++;
      }
    
      // Set state
      setMonths(count);
      setPresentViews(present);
      setExpectedViews(expected);
    
      // ✅ Generate Graph Data Right Here
      let data = [];
      let visitors = present;
      let conversionRate = 2; // Starting at 2%
      let duration = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
      for (let i = 0; i < count; i++) {
        data.push({
          name: duration[i],
          visitors: Math.round(visitors),
          conversion: conversionRate.toFixed(1),
        });
    
        visitors += visitors * 0.3;
        conversionRate += (10 - 2) / (count - 1);
      }
    
      setGraphData(data);
    };
    
    const handleGenerateGraph = () => {
      let data = [];
      let visitors = Number(presentViews);
      let conversionRate = 2; // Start from 2%
      let duration=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];
      for (let i = 0; i < months; i++) {
        data.push({
          name: duration[i],
          visitors: Math.round(visitors), // Round visitors for readability
          conversion: conversionRate.toFixed(1), // Format conversion rate
        });
  
        visitors += visitors * 0.3; // Increase by 30%
        conversionRate += (10 - 2) / (months - 1); // Linear increase
      }
  
      setGraphData(data);
    };
    
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
      const dbResponse = await fetch(process.dev.NEXT_PUBLIC_SCRIPT_SERVICES_SUBMISSION, {
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
  
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkWindowSize, 150); // delay to avoid rapid firing
    };
  
    let timeoutId;
    if (typeof window !== "undefined") {
      checkWindowSize();
      window.addEventListener("resize", handleResize);
    }
  
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
      clearTimeout(timeoutId);
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
      <section className="container mx-auto   lg:px-10 ">
        <div className="grid grid-cols-12 gap-8 pt-5">
          {/* Left Column */}
          <div className="col-span-12 lg:col-span-8 mt-5 pt-5">
            <div className="infor pt-5">
              <div className="heading mt-5">
                <h2 className="heading4 mt-4 ">Digital Marketing Services at Ridgeveda </h2>
                <p className="body2 mt-4 ">
               In the digital age, your online presence is key to unlocking growth. At Ridgeveda, we offer comprehensive digital marketing services designed to drive results. Our expertise helps businesses attract, engage, and convert their target audience, ensuring long-term success              </p>

              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="col-span-12 lg:col-span-4 flex justify-center lg:justify-end">
            <img src="images/services/marketing/marketing-home.png" alt="Sales Service" className="w-full max-w-xs lg:max-w-sm" />
          </div>
        </div>
      </section>

      {/* Strategies Heading */}
      <div className="heading text-center pt-10">
        <h2 className="heading4 mb-5 text-center">Our Services</h2>
        <p className="body2 mt-5 text-center text-blue seo-strategy-para">"The right loan isn't just about money—it's about unlocking opportunity at the right time."</p>
      </div>
    


    <section className="flex items-start justify-center min-h-screen px-5 lg:px-20 py-10">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">

    {/* <!-- Card 1 --> */}
    <div>
      <div className="flex items-start bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
        {/* <!-- Content --> */}
        <div className="ml-4">
              <h2 className="text-xl font-bold text-black mb-2">Search Engine Optimization (SEO)</h2>
              <p className="text-gray-700">
               In the digital age, your online presence is key to unlocking growth. At Ridgeveda, we offer comprehensive digital marketing services designed to drive results. Our expertise helps businesses attract, engage, and convert their target audience, ensuring long-term success             </p>

                  {[
            " Keyword research and optimization",
            " On-page and off-page SEO",
            " Technical SEO audits",
            " Link building strategies",
        ].map((text, index) => (
          
            
            <h5
                key={index} 
                className='seo-paragraph-content-step'
            >
              <img src="images/services/arrow-right.png"  alt="image not found" ></img>
                {text}
            </h5>
           
          
        ))}
       <div className="flex justify-center items-center ">
  {/* <a
    href="/seo"
    className="bg-[#3A5AE3] text-white w-[150px] h-[50px] flex justify-center items-center rounded-[25px]"
  >
    Learn More
  </a> */}
  <Link href="/seo">
  <button className="bg-[#3A5AE3] text-white w-[150px] h-[50px] flex justify-center items-center rounded-[25px]">
     Learn More
  </button>
</Link>

</div>

            </div>
      </div>
    </div>

    {/* <!-- Card 2 - apply mt-200px --> */}
    <div className="mt-0 md:mt-[200px]">
      <div className="flex items-start bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
      <div className="ml-4">
              <h2 className="text-xl font-bold text-black mb-2"> Content Marketing</h2>
              <p className="text-gray-700">
              Engage and inform your audience with high-quality content. From blog posts and articles to videos and infographics, we craft content that builds trust, improves SEO, and drives meaningful engagement.            </p>

                  {[
            " Content strategy and creation",
            " SEO-optimized blogs and articles",
            " Infographics and video marketing",
            " Editorial planning and execution",
        ].map((text, index) => (
          
            
            <h5
                key={index} 
                className='seo-paragraph-content-step'
            >
              <img src="images/services/arrow-right.png"  alt="image not found" ></img>
                {text}
            </h5>
           
          
        ))}
                <div className="flex justify-center items-center ">
        {/* <a
            href="/content-marketing"
            className="bg-[#3A5AE3] text-white w-[150px] h-[50px] flex justify-center items-center rounded-[25px]"
        >
            Learn More
        </a> */}

      <Link href="/content-marketing">
      <button className="bg-[#3A5AE3] text-white w-[150px] h-[50px] flex justify-center items-center rounded-[25px]">
        Learn More
      </button>
     </Link>
        </div>

            </div>
      </div>
    </div>

    {/* <!-- Card 3 --> */}
    <div>
      <div className="flex items-start bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
        <div className="ml-4">
              <h2 className="text-xl font-bold text-black mb-2">Graphic Designing</h2>
              <p className="text-gray-700">
              Visuals play a crucial role in building your brand’s identity. Our graphic design services deliver compelling and creative designs that capture attention and reinforce your message across all digital channels.
             </p>

                  {[
            "Logo and branding design",
            " Social media graphics",
            " Website and landing page design",
            " Print and digital media designs",
        ].map((text, index) => (
          
            
            <h5
                key={index} 
                className='seo-paragraph-content-step'
            >
              <img src="images/services/arrow-right.png"  alt="image not found" ></img>
                {text}
            </h5>
           
          
        ))}
       <div className="flex justify-center items-center ">
            {/* <a
                href="/grapic-design"
                className="bg-[#3A5AE3] text-white w-[150px] h-[50px] flex justify-center items-center rounded-[25px]"
            >
                Learn More
            </a> */}
              <Link href="/grapic-design">
                 <button className="bg-[#3A5AE3] text-white w-[150px] h-[50px] flex justify-center items-center rounded-[25px]">
                 Learn More
                 </button>
             </Link>
            </div>

            </div>
      </div>
    </div>

    {/* <!-- Card 4 - apply mt-200px --> */}
    <div className="mt-0 md:mt-[200px]">
      <div className="flex items-start bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
        <div className="ml-4">
              <h2 className="text-xl font-bold text-black mb-2">Pay-Per-Click Advertising (PPC)</h2>
              <p className="text-gray-700">
             Generate immediate traffic and leads with targeted PPC campaigns. We create high-converting ads on platforms like Google and social media to drive the right audience to your website and maximize your ROI.             </p>

                  {[
            " Google Ads and social media ads",
            " Keyword research and bid management",
            " Remarketing campaigns",
            " Performance tracking and optimization",
        ].map((text, index) => (
          
            
            <h5
                key={index} 
                className='seo-paragraph-content-step'
            >
              <img src="images/services/arrow-right.png"  alt="image not found" ></img>
                {text}
            </h5>
           
          
        ))}
         <div className="flex justify-center items-center ">
        {/* <a
            href="/ppc"
            className="bg-[#3A5AE3] text-white w-[150px] h-[50px] flex justify-center items-center rounded-[25px]"
        >
            Learn More
        </a> */}
             <Link href="/ppc">
                 <button className="bg-[#3A5AE3] text-white w-[150px] h-[50px] flex justify-center items-center rounded-[25px]">
                 Learn More
                 </button>
             </Link>
        </div>

            </div>

      </div>
    </div>

    {/* <!-- Card 5 --> */}
    <div>
      <div className="flex items-start bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
        {/* <!-- Content --> */}
        <div className="ml-4">
              <h2 className="text-xl font-bold text-black mb-2"> Influencer Marketing</h2>
              <p className="text-gray-700">
            Leverage the power of influencers to promote your brand and reach new audiences. We connect you with the right influencers to amplify your message, increase brand awareness, and drive conversions.
            </p>

                  {[
            " Influencer identification and outreach",
            " Campaign strategy and execution",
            " Product placements and sponsorships",
            " Performance tracking and reporting",
        ].map((text, index) => (
          
            
            <h5
                key={index} 
                className='seo-paragraph-content-step'
            >
              <img src="images/services/arrow-right.png"  alt="image not found" ></img>
                {text}
            </h5>
           
          
        ))}
        <div className="flex justify-center items-center ">
            {/* <a
                href="/influence-marketing"
                className="bg-[#3A5AE3] text-white w-[150px] h-[50px] flex justify-center items-center rounded-[25px]"
            >
                Learn More
            </a> */}

            <Link href="/influencer-marketing">
                 <button className="bg-[#3A5AE3] text-white w-[150px] h-[50px] flex justify-center items-center rounded-[25px]">
                 Learn More
                 </button>
             </Link>
            </div>

            </div>
      </div>
    </div>

    {/* <!-- Card 6 - apply mt-200px --> */}
    <div className="mt-0 md:mt-[200px]">
      <div className="flex items-start bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
        {/* <!-- Content --> */}
          <div className="ml-4">
              <h2 className="text-xl font-bold text-black mb-2">Social Media Marketing (SMM)</h2>
              <p className="text-gray-700">
              Harness the power of social media to build your brand and connect with your audience. Our tailored social media strategies help you engage followers, promote your business, and increase conversions across platforms.            </p>

                  {[
            " Customized social media strategies",
            " Platform management (Facebook, Instagram, LinkedIn, etc.)",
            " Paid social media advertising",
            "Content creation and community management",
        ].map((text, index) => (
          
            
            <h5
                key={index} 
                className='seo-paragraph-content-step'
            >
              <img src="images/services/arrow-right.png"  alt="image not found" ></img>
                {text}
            </h5>
           
          
        ))}
        <div className="flex justify-center items-center ">
            {/* <a
                href="/smm"
                className="bg-[#3A5AE3] text-white w-[150px] h-[50px] flex justify-center items-center rounded-[25px]"
            >
                Learn More
            </a> */}

             <Link href="/smm">
                 <button className="bg-[#3A5AE3] text-white w-[150px] h-[50px] flex justify-center items-center rounded-[25px]">
                 Learn More
                 </button>
             </Link>
            </div>

            </div>
      </div>
    </div>


     <div className="mt-0 md:mt-[-20px]">
      <div className="flex items-start bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
        {/* <!-- Content --> */}
          <div className="ml-4">
              <h2 className="text-xl font-bold text-black mb-2">Offline Marketing</h2>
              <p className="text-gray-700">
            Strengthen your digital presence through impactful offline marketing strategies designed for tech-driven brands. We help IT companies connect with target audiences beyond the screen—building trust, driving leads, and boosting visibility.     
                </p>

                  {[
            " Branded Print Collateral",
            " Event Marketing & Tech Exhibitions",
            " Telemarketing & Lead Outreach",
        ].map((text, index) => (
          
            
            <h5
                key={index} 
                className='seo-paragraph-content-step'
            >
              <img src="images/services/arrow-right.png"  alt="image not found" ></img>
                {text}
            </h5>
           
          
        ))}
        <div className="flex justify-center items-center ">
            {/* <a
                href="/smm"
                className="bg-[#3A5AE3] text-white w-[150px] h-[50px] flex justify-center items-center rounded-[25px]"
            >
                Learn More
            </a> */}

             <Link href="/offline-marketing">
                 <button className="bg-[#3A5AE3] text-white w-[150px] h-[50px] flex justify-center items-center rounded-[25px]">
                 Learn More
                 </button>
             </Link>
            </div>

            </div>
      </div>
    </div>

  

      {/* <div className="mt-0 md:mt-[200px]">
      <div className="flex items-start bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
      
          <div className="ml-4">
              <h2 className="text-xl font-bold text-black mb-2">Ad Shooting</h2>
              <p className="text-gray-700">
           We offer professional ad shooting services to help brands visually communicate their message with creativity and impact.                </p>

                  {[
            " Tech-powered ad shoots that tell your story",
            " Creative visuals, delivered with precision",
            " Where innovation meets compelling content",
        ].map((text, index) => (
          
            
            <h5
                key={index} 
                className='seo-paragraph-content-step'
            >
              <img src="images/services/arrow-right.png"  alt="image not found" ></img>
                {text}
            </h5>
           
          
        ))}
        <div className="flex justify-center items-center ">
           

             <Link href="/adshoot">
                 <button className="bg-[#3A5AE3] text-white w-[150px] h-[50px] flex justify-center items-center rounded-[25px]">
                 Learn More
                 </button>
             </Link>
            </div>

            </div>
      </div>
    </div> */}
  </div>
</section>

      



      <section>
          <div>
             <h2 className="text-xl font-bold text-black mt-5 text-center  heading4 pt-5 ">Why Choose Ridgeveda</h2>
             <p className="text-center p-5 m-5 text-lg">At Ridgeveda, we offer data-driven digital marketing solutions designed for businesses of all sizes. Whether you're looking to grow your social media presence, improve your search engine rankings, or create a stunning website, our team of experts is here to help. We focus on delivering measurable results that align with your business goals.</p>
      

             
          </div>
      </section>

 {/* sales connect section starts here  */}
   <section className="seo-subscribe-section text-black flex flex-wrap justify-center items-center m-5 p-5">
      <div className="sales-subscribe-image">
        <img src="/images/services/sales/sales-online.png" alt="Process Image"   />
      </div>

  <div className="seo-subscribe-content pt-1">
    <h2 className="pt-1 seo-subscribe-content-heading text-center">
     Grow Your Online Future, Starting from the Street
    </h2>
    <p className="pt-5 seo-subscribe-content-para">
      Grow Traffic, Elevate Sales And Enhance Conversions
    </p>
    <div className="seo-subscribe-form text-center">
      <form className="seo-form" onSubmit={handleUrlSubmit}>
        <input
          type="url"
          placeholder="Enter Your Website URL"
          className="form-control"
          onChange={handleUrlChange}
          value={urlData.url} 
          required  
        />
        <button type="submit" className="seo-subscribe-button pt-5">
          Reserve Your Strategy Call
        </button>
      </form>
     </div>


  </div>
</section>
 {/* sales connect section ends here  */}

  
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
