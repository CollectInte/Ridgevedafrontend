'use client'
import LayoutOne from "@/components/Layout/LayoutOne";
import Link from "next/link";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import React, { useState,useEffect } from "react";
import '../../styles/text.css';
import '../../styles/salesstyle.css';
import SeoInsight from '../seoinsight/page.js';
import { TextUnderline } from "@phosphor-icons/react";
import RealValueGraph from '../graph/page.js';
// import processSteps from "../../data/slidermobile/seosliderdata.json";
import GroupIcon from '@mui/icons-material/Group';
import Head from 'next/head';
import processSteps from "../../data/slidermobile/salessliderdata.json"; // Import JSON file
import HouseIcon from '@mui/icons-material/House';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import BusinessIcon from '@mui/icons-material/Business';
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
    const meta = seoMetadata.sales;
     const [isClient, setIsClient] = useState(false);
    
        
        
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
                <h2 className="heading4 mt-4 ">Driving Growth Through Strategic Sales Solutions </h2>
                <p className="body2 mt-4 ">
               At Ridgeveda, we understand that sales are the heartbeat of every business. Our sales services are designed to empower organizations with the tools, expertise, and manpower needed to boost revenue, enhance customer acquisition, and maximize market penetration. Whether you're in banking, finance, real estate, or retail, we provide end-to-end sales support tailored to your unique business goals.
               </p>

              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="col-span-12 lg:col-span-4 flex justify-center lg:justify-end">
            <img src="images/services/sales/sales-intro.png" alt="Sales Service" className="w-full max-w-xs lg:max-w-sm" />
          </div>
        </div>
      </section>

      {/* Strategies Heading */}
      <div className="heading text-center pt-10">
        <h2 className="heading4 mb-5 text-center">What We Offer</h2>
        <p className="body2 mt-5 text-center text-blue seo-strategy-para">We deliver smart, data-driven sales solutions designed to accelerate growth, optimize outreach, and maximize ROI</p>
      </div>
    
      {/* SEO Strategies Section */}
      <section className="flex items-start justify-center px-5 lg:px-20 py-10 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
       

          <div className="flex items-start bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
            <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg  ">
              <img src="images/services/sales/sales/real_estate_sales.png" alt="Keyword Research Icon" className="w-20 h-20" />
            </div>  
            <div className="ml-4">
              <h2 className="text-xl font-bold text-black mb-2 " style={{marginTop:"-5px"}}>Sales Channel Partnership for Financial Products
          </h2>
              <p className="text-gray-700"> 
       Partner with Ridgeveda to expand your reach and boost sales of financial products. As a trusted sales channel partner, we connect banks, NBFCs, and fintech companies with the right audience through targeted marketing, on-ground activations, and digital outreach. Whether it’s credit cards, loans, or prepaid solutions, our scalable sales network ensures faster conversions and higher ROI. Let’s grow together!
                      </p>
                 {/*  <ul className="list-disc list-inside flex flex-col items-left mt-2 space-y-2">
                <li> Freelance agent recruitment and training</li>
                <li> Project-specific sales campaigns</li>
                 <li> End-to-end buyer coordination</li>
               
                </ul> */}
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="flex items-start bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
            <div className="flex-shrink-0 bg-green-100  rounded-lg ">
              <img src="images/services/sales/sales/lead_generation.png" alt="Keyword Research Icon" className="w-20 h-20" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-black mb-2">Lead Generation & Telecalling</h2>
              <p className="text-gray-700">
                   We build strong pipelines through highly targeted lead generation strategies. Our professional telecalling teams nurture leads, qualify prospects, and set appointments that drive results.
              </p>
                <ul className="list-disc list-inside flex flex-col items-left mt-2 space-y-2">
                <li> B2C & B2B calling campaigns</li>
                <li> CRM-based lead management</li>
                  <li> Multilingual support across regions</li>
               
                </ul>
            </div>
          </div>

          {/* 5th container start */}
             {/* <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container" style={{margin:"auto"}}>
            <div className="flex-shrink-0 bg-green-100  rounded-lg seo-icon-one">
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-black mb-2">Education Loans</h2>
              <p className="text-gray-700">
                   Funding for higher studies in India and abroad
              </p>
                <ul className="list-disc list-inside flex flex-col items-left mt-2 space-y-2">
                <li> Collateral-free options available</li>
                <li> Assistance in choosing lenders with lower interest rates</li>
                 <li> Guidance on moratorium period and repayment</li>

               
                </ul>
            </div>
          </div> */}
          {/* 5th container end  */}
        </div>

        
        
      </section>

          <section className="px-5">  
                   <div className="flex items-start justify-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container mb-5" style={{margin:"auto"}}> 
                        <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg ">
                         <img src="images/services/sales/sales/field_sales.png" alt="Keyword Research Icon" className="w-20 h-20" />
                        </div>
                        <div className="ml-4">
                        <h2 className="text-xl font-bold text-black mb-2">Field Sales & On-ground Activation</h2>
                        <p className="text-gray-700">
                           Need feet on the street? We offer trained and verified field executives who can carry out product demos, customer acquisition drives, kiosk setups, and activation campaigns with measurable KPIs.
                        </p>
                          <ul className="list-disc list-inside flex flex-col items-left mt-2 space-y-2">
                        <li> PAN India network of field agents</li>
                        <li> Sales reporting and performance tracking</li>
                        <li> Target-based incentive structures</li>
                       </ul>
                        </div>
                  </div>
          </section>


      {/* <section>
          <div>
             <h2 className="text-xl font-bold text-black mt-5 text-center  heading4 pt-5 ">Credit Card Sales – Choose What Works for You</h2>
             <p className="body2 mt-5 text-center text-blue seo-strategy-para">"With access to top credit cards from all major banks, we guide you to the one that perfectly fits your lifestyle, spending habits, and financial goals."</p>
         <div className="sales-final-box">
  <div className="sales-box1">
    <div className="circle-container">
      <div className="sales-box-center">
        <div className="sales-inner-box-center">
          <h1>Types of Credit Cards We Offer</h1>
        </div>
      </div>

     
      <div className="circle circle1">
        <div className="circle-inner"> Premium & Co-Branded Cards
        <p style={{fontWeight:"700"}}> Extra perks for frequent spenders</p></div>
      </div>
      <div className="circle circle2">
        <div className="circle-inner">Rewards Cards<br /><small>Earn points</small></div>
      </div>
      <div className="circle circle3">
        <div className="circle-inner">Cashback Cards<br /><small>Get money back</small></div>
      </div>
      <div className="circle circle4">
        <div className="circle-inner">Travel Cards<br /><small>Frequent flyers</small></div>
      </div>
      <div className="circle circle5">
        <div className="circle-inner">Fuel Cards<br /><small>Save on fuel</small></div>
      </div>
      <div className="circle circle6">
        <div className="circle-inner">Student Cards<br /><small>Credit for students</small></div>
      </div>
    </div>
  </div>
</div>

             
          </div>
      </section> */}
     
     
      {/* {isDesktop ? <SeoInsight />: 
      <section className="mt-5 pt-5">

      <Slider data={sliderData} />

      </section>
      } */}


    

    

     {/* seo custom graph */}
    

      

      

  {/* <section className="seo-paragraph-content-section">
    <div className="seo-paragraph-content-container">
        <h1 className="heading3 mt-4 mx-5 mb-5 pb-5 text-center pt-5">What We DO</h1>
        <p className="heading4 seo-paragraph-content-intro mx-3 text-left">
           We bridge the gap between financial institutions and customers by offering:        </p>

        {[
            " Expert product recommendations",
            " Transparent comparison of offers",
            " Assistance with documentation & eligibility",
            " End-to-end application & onboarding support",
            " Fast and smooth approval process"
           
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


 {/* prepaidcards start her  */}

 
      <h2 className="text-xl font-bold text-black mt-5 pt-5 text-center heading4  "> Why Choose Ridgeveda for Sales?</h2>

       {isDesktop ? <section className='sales-card-section'>
                <SalesInsight />
       </section>  : <section  style={{marginTop:"60px"}}>

        <Slider data={sliderData} />

    </section>}
    
 {/* prepaidcards end here */}

 {/* how we help section start */}
 {/* <section className="seo-paragraph-content-section">
    <div className="seo-paragraph-content-container">
        <h1 className="heading3 mt-4 mx-5 mb-5 pb-5 text-center pt-5">How We Help</h1>
       

        {[
            " Assess your credit profile and recommend suitable cards",
            " Clarify card features, benefits, charges, and hidden terms",
            " Assist with documentation and eligibility requirements",
            " Ensure fast processing and regular follow-up with partner banks",
        
           
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
 {/* how we help section ends here */}

 {/* sales connect section starts here  */}

 {/* our impacts section starts here  */}
 <section className="py-10 bg-gray-100">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-8">
      Our Reach
    </h2>
    <div className="grid grid-cols-2 md:grid-cols-4 p-5 gap-6" >
      {/* Box 1 */}
      <div className="bg-white shadow-xl rounded-lg p-6 text-center innerbox innerbox-one" >
        <div className="display-sale-icon">

          <GroupIcon style={{ fontSize: 40, color: '#3A5AE3' }}  className="pr-2"/>

        <h2 className="text-2xl font-bold text-blue-600 mt-1">1 Lakh +</h2>
        </div>
        <p className="text-gray-700 text-sm">Credit Card Customers Onboarded</p>
      </div>

      {/* Box 2 */}
      <div className="bg-white shadow-xl rounded-lg p-6 text-center mt-5 innerbox innerbox-two" >
        <div className="display-sale-icon">
            <HouseIcon style={{ fontSize: 40, color: '#3A5AE3' }}  className="pr-2"/>
            <h4 className="text-2xl font-bold text-green-600 mt-1">3000+</h4>
        </div>
       
        <p className="text-gray-700 text-sm">Real Estate Leads Converted</p>
      </div>

      {/* Box 3 */}
      <div className="bg-white shadow-xl rounded-lg p-6 text-center innerbox innerbox-three" >
        <div className="display-sale-icon">
            <BusinessIcon style={{ fontSize: 40, color: '#3A5AE3' }} className="pr-2" />
            <h4 className="text-2xl font-bold text-purple-600 mt-1">500+</h4>
        </div>
       
        <p className="text-gray-700 text-sm">Businesses Served in Loan & Credit Sales</p>
      </div>

      {/* Box 4 */}
      <div className="bg-white shadow-xl rounded-lg p-6 text-center mt-5 innerbox innerbox-four" >
        <div className="display-sale-icon">
           <PhoneInTalkIcon style={{ fontSize: 40, color: '#3A5AE3' }} className="pr-2" />
           <h4 className="text-2xl font-bold text-red-600 mt-1">50+</h4>
        </div>
       
        <p className="text-gray-700 text-sm">Telecalling Campaigns Running Every Month</p>
      </div>
    </div>
  </div>
</section>

  

 {/* our impacts section ends here */}
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
  
<section className="seo-form-section">
   
   <div className="seo-form-image">
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
<div className="seo-form-container">
   
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
