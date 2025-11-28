'use client';
import LayoutOne from "@/components/Layout/LayoutOne";
import Link from "next/link";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import React, { useState,useEffect} from "react";
import '../../styles/text.css';
import '../../styles/smostyle.css';
import Head from 'next/head';
import { TextUnderline } from "@phosphor-icons/react";
import RealValueGraph from '../graph/page.js';
import ContentInsight from '../telecallinginsight/page.js';
import Slider from '../slider/page';
import processSteps from "../../data/slidermobile/cmsliderdata.json"; // Import JSON file
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
import PopupForm from '../popup/page';
import  SEOHead from "../seometatags/page";
import seoMetadata from "../../components/lib/seo-metadata";

export default function Services() {    
  const [isClient, setIsClient] = useState(false);

    const sliderData = processSteps; 
    const [isDesktop, setIsDesktop] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showGetPopup, setShowGetPopup] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const meta = seoMetadata.telecalling;
    const [isSubmitting, setIsSubmitting] = useState(false);
    
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

      useEffect(() => {
        console.log("✅ useEffect ran");
      }, []);

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
 
       useEffect(() => {
        // Delay until after hydration
        setIsClient(true);
      }, []);
    
      useEffect(() => {
        if (!isClient) return;
    
        const checkWindowSize = () => {
          const width = window.innerWidth;
          const isNowDesktop = width > 1024;
          console.log("📏 Width:", width, "| isDesktop:", isNowDesktop);
          setIsDesktop(isNowDesktop);
        };
    
        checkWindowSize();
    
        const handleResize = () => {
          checkWindowSize();
        };
    
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, [isClient]);
    
     

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
      <section className="container mx-auto  px- lg:px-10 ">
        <div className="grid grid-cols-12 gap-8 pt-5 mt-5">
          {/* Left Column */}
          <div className="col-span-12 lg:col-span-8 pt-5 mt-3">
            <div className="infor">
              <div className="heading">
                <h2 className="heading4 mt-5 mx-2">Driving Growth Through Smart Telecalling Outsourcing </h2>
                <p className="body2 mt-4 mx-2">
                At RidgeVeda Pvt Ltd, we understand that customer communication is the backbone of every successful business. Our Telecalling outsourcing services are designed to help organizations streamline outreach, improve conversions, and enhance customer experience with trained and professional calling teams. Whether you operate in education, healthcare, finance, real estate, retail, or services, we provide end-to-end telecalling support customized to your business objectives.
              </p>

              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="col-span-12 lg:col-span-4 flex justify-center lg:justify-end">
            <img src="images/services/telecalling/telecalling.jpg" alt="SEO Service" className="w-full max-w-xs lg:max-w-sm" />
          </div>
        </div>
      </section>

      {/* Strategies Heading */}
      <div className="heading text-center ">
        <h2 className="heading4 mt-10 text-center mx-2">Telecalling Outsourcing Services</h2>
        {/* <p className="body2 mt-5 text-blue seo-strategy-para mx-2">What We Offer</p> */}
        <p className="body2 mt-5 text-blue seo-strategy-para mx-2">We deliver efficient, performance-driven calling solutions to strengthen customer engagement, boost lead conversions, and increase operational productivity.
</p>
      </div>

      {/* SEO Strategies Section */}
      <section className="flex items-center justify-center min-h-screen px-5 lg:px-20 py-10 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 ">
          {/* Card 1 */}
          <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg seo-icon-one">
    <img
      src="images/services/telecalling/LeadGenerationProspectQualification.png"
      alt="Keyword Research Icon"
      className="w-20 h-20 mt-5"
    />
  </div>

  <div className="ml-4">
    <h2 className="text-xl font-bold text-black mb-2 smm-strategy-one">
      Lead Generation & Prospect Qualification
    </h2>

    <p className="text-gray-700">
      Our Telecalling experts help you build high-quality pipelines through targeted outreach. 
      From cold calling to warm lead nurturing, we ensure meaningful interactions that convert 
      into real opportunities.
    </p>

    {/* ⭐ New 3-Point List Added Here */}
    <ul className="list-disc pl-5 mt-3 text-gray-800 space-y-1">
      <li>Prospect qualification & appointment setting</li>
      <li>CRM-based data management</li>
      <li>Multilingual support across regions</li>
    </ul>
  </div>
</div>

          <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
            <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg seo-icon-one">
            <img src="images/services/telecalling/CustomerSupportEnquiryHandling.png" alt="Keyword Research Icon" className="w-20 h-20" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-black mb-2">Customer Support & Enquiry Handling</h2>
              <p className="text-gray-700">
             Deliver seamless customer experience with dedicated telecallers who manage inbound and outbound support, resolve queries, and maintain brand standards in every conversation.    
              </p>  
              
               <ul className="list-disc pl-5 mt-3 text-gray-800 space-y-1">
      <li>Inbound query handling</li>
      <li>Outbound follow-ups</li>
      <li>Complaint resolution</li>
      <li>Customer relationship management</li>
    </ul>      </div>
          
          </div>

          <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
            <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg seo-icon-one">
            <img src="images/services/telecalling/AdmissionSalesServiceCalling.png" alt="Keyword Research Icon" className="w-20 h-20" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-black mb-2">Admission, Sales & Service Calling</h2>
              <p className="text-gray-700">
             We provide trained callers for education, healthcare, retail, banking, and service-based sectors to boost conversions, handle applications, and support sales operations.              </p>
             
               <ul className="list-disc pl-5 mt-3 text-gray-800 space-y-1">
      <li>Enquiry-to-enrolment calling</li>
      <li>Appointment confirmations</li>
      <li>Product/service education</li>
      <li>Retention & re-engagement calls</li>
    </ul>  
            </div>
          </div>
          
          {/* Card 2 */}
          
        </div>
        
      </section>


     
      <h2 className="text-xl  text-black my-5 text-center heading4 mx-2 ">Why Choose Ridgeveda for Telecalling Outsourcing?</h2>

     
     
      
      {isDesktop ?  <ContentInsight /> : <section  style={{marginTop:"60px"}}>

    <Slider data={sliderData} />

    </section>}
    
   
       {/* { isDesktop &&
      (
        <ContentInsight />
      ) 
      } */}
      {/* { isMobile && 
       (
            <section  style={{marginTop:"60px"}}>

            <Slider data={sliderData} />

            </section>
      )
      } */}

      {/* {isMobile && (
            <section  style={{marginTop:"30px"}}>

            <Slider data={sliderData} />

            </section>
      )} */}

      
     
     
    

          
      
    
        

                  <section className="cmm-subscribe-section text-black mt-10"> 
                <div className="cmm-subscribe-content pt-1">
                <h2 className="pt-1 seo-subscribe-content-heading">
                  Empower Your Business with a <span className="seo-text">Telecalling Outsourcing</span> Partner That Converts.
                </h2>
                <p className="pt-5 seo-subscribe-content-para">
                Creating Meaningful Customer Connections for Long-Term Success.
                </p>
                <div className="cmm-subscribe-form pt-5">
                  <form className="seo-form" onSubmit={handleUrlSubmit}>
                    <input 
                      type="url" 
                      placeholder="Enter Your Website URL" 
                      className="form-control text-left pl-2 w-full border rounded" 
                      onChange={handleUrlChange}
                      style={{ marginBottom: '10px', padding: '10px' }} 
                      value={urlData.url} 
                      required />
                      <br/>
                      <button  
                          type="submit"
                          className="text-center seo-subscribe-button seo-subscribe-button-ppc w-full bg-blue-500 text-white py-2 rounded "
                        >
                          Reserve Your Strategy Call
                        </button>
                  </form>
                </div>
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
