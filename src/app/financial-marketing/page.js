    'use client'
    import LayoutOne from "@/components/Layout/LayoutOne";
    import Link from "next/link";
    import * as Icon from "@phosphor-icons/react/dist/ssr";
    import React, { useState,useEffect } from "react";
    import '../../styles/text.css';
    import '../../styles/smostyle.css';
    import '../../styles/influencestyle.css';
    import { TextUnderline } from "@phosphor-icons/react";
    import RealValueGraph from '../graph/page.js';
    import Head from 'next/head';
    import Slider from '../slider/page';
    import processSteps from "../../data/slidermobile/financial-marketing.json"; // Import JSON file
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
        const meta = seoMetadata.financialservices;
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
                    <h2 className="heading4 mt-5">Grow Your Business with Expert Financial Services by Ridgeveda </h2>
                    <p className="body2 mt-4">
                  In today’s fast-paced business landscape, sustainable growth hinges on smart financial planning, strategic investments, and access to tailored financial solutions. At Ridgeveda, we offer comprehensive financial services that empower entrepreneurs, startups, and established businesses to scale with confidence.    </p>
    
                  </div>
                </div>
              </div>
              
              {/* Right Column */}
              <div className="col-span-12 lg:col-span-4 flex justify-center lg:justify-end">
                <img src="images/services/financial-marketing/finance.png" alt="SEO Service" className="w-full max-w-xs lg:max-w-sm" />
              </div>
            </div>
          </section>
    
          {/* Strategies Heading */}
          <div className="heading text-center ">
            <h2 className="heading4 mt-7 text-center">Ridgeveda Financial Services Strategies That Work</h2>
            <p className="body2 mt-6 text-blue seo-strategy-para text-center">Trusted financial services for a secure tomorrow</p>
          </div>
    
          {/* SEO Strategies Section */}
          <section className="flex items-center justify-center min-h-screen px-5 lg:px-20 py-10 ">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 ">
              {/* Card 1 */}
              <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container ">
                <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg seo-icon-one">
                  <img src="images/services/financial-marketing/financial_3449291.png" alt="Keyword Research Icon" className="w-20 h-20 mt-5 pt-1 " />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-bold text-black mb-2">Customized Financial Planning</h2>
                  <p className="text-gray-700">
                 We believe that no two businesses are alike. Our first step is understanding your unique business model, financial needs, and growth targets. From there, we create a personalized financial plan that aligns with your vision.
                  </p>
                </div>
              </div>

              <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
                <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg seo-icon-one">
                <img src="images/services/financial-marketing/fintech_12689823.png" alt="Keyword Research Icon" className="w-20 h-20 mt-3" />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-bold text-black mb-2"> Smart Business Banking Integration</h2>
                  <p className="text-gray-700">
               We simplify your financial infrastructure by connecting you with the right banking tools. Whether you're just starting or scaling, our partnerships with top banks and digital platforms like Tide Business Account make managing transactions and expenses effortless.
                  </p>
                </div>
              </div>
    
              <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
                <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg seo-icon-one">
                <img src="images/services/financial-marketing/room-key_4087869.png" alt="Keyword Research Icon" className="w-20 h-20 mt-5 pt-2" />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-bold text-black mb-2">Capital Access & Credit Optimization</h2>
                  <p className="text-gray-700">
               Access to funding is often the fuel for growth. We provide strategic support in securing the right kind of business financing—be it loans, credit cards, or working capital solutions—through our wide network of financial partners.
                  </p>
                </div>
              </div>
              
              {/* Card 2 */}
              <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
                <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg seo-icon-one">
                <img src="images/services/financial-marketing/compensation_12992306.png" alt="Keyword Research Icon" className="w-20 h-20 mt-5 pt-3" />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-bold text-black mb-2">Expense Control & Cash Flow Strategy</h2>
                  <p className="text-gray-700">
               Cash flow is the heartbeat of any business. Our strategies focus on tracking, analyzing, and optimizing your cash flow to ensure you have the liquidity to meet obligations while planning for expansion.
                  </p>
                </div>
              </div>
           


              <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
                <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg seo-icon-one">
                <img src="images/services/financial-marketing/gear_1553794.png" alt="Keyword Research Icon" className="w-20 h-20 mt- pt-5" />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-bold text-black mb-2">Financial Automation & Insights</h2>
                  <p className="text-gray-700">
                  We use digital tools and automation to reduce manual work and give you a clear picture of your financial health. These insights help you make faster, smarter decisions.
                  </p>
                </div>
              </div>



              <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
                <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg seo-icon-one">
                <img src="images/services/financial-marketing/graph_2179270.png" alt="Keyword Research Icon" className="w-20 h-20 mt-5 pt-3" />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-bold text-black mb-2">Strategic Advisory for Sustainable Growth</h2>
                  <p className="text-gray-700">
                With our team of financial experts, we provide ongoing support to guide your business through every financial challenge and opportunity. Our advisory services focus on building a strong foundation and scaling with strategy.
                  </p>
                </div>
              </div>

              
            
                 
              

             </div>
            

          </section>
    
             
         
          <h2 className="text-xl  text-black mt-5 text-center heading4 mb-5 pb-5">Ridgeveda Finance Marketing Insight Development</h2>
              {isDesktop ?   <div style={{margin:"auto",padding:"auto" }} className='seo-process mt-5 pt-5'>
            <div className="process-section process-section-seo mb-5 mx-auto">

<div className="process-step process-one ">
    <div className="process-sub-image-seo process-sub-one ">
    <img src="images/services/financial-marketing/Group77.png" alt="Discover Icon"  style={{width:"150px",height:"50px",marginTop:"100px"}} / >
    
    </div>
    
     <h2 >Business Financial   Health Assessment</h2>
    <p style={{marginTop:"65px"}}>
  We analyze key metrics like cash flow, profit margins, and liabilities to develop actionable insights that improve your financial stability.
   </p>
    
</div>


<div className="process-step process-two">


<div className="process-sub-image-seo process-sub-two">
    <img src="images/services/financial-marketing/loan_7075625.png" alt="Discover Icon"  style={{width:"100px",height:"50px",marginTop:"100px"}} / >
 
</div>
<h2 >Loan & Credit <br/> Utilization Insights</h2>
  
    <p style={{marginTop:"65px"}}>
  Our experts assess your credit usage to guide smarter loan applications, repayments, and credit score improvements.
    </p>
    
</div>


<div className="process-step process-three mb-5 pb-5">

<div className="process-sub-image-seo process-sub-three">
 <img src="images/services/financial-marketing/pattern-recognition_16685506.png" alt="Discover Icon"  style={{width:"100px",height:"50px",marginTop:"100px"}} / >
</div>
<h2 >Spending Pattern Analysis</h2>
<p style={{marginTop:"40px"}}>
By tracking and categorizing your business expenses, we help you identify unnecessary costs and optimize resource allocation.          </p>

</div>
<div className="process-step process-four">

<div className="process-sub-image-seo process-sub-four">
 <img src="images/services/financial-marketing/analysis_18543935.png" alt="Discover Icon"  style={{width:"100px",height:"50px",marginTop:"100px"}} / >

</div>
<h2 >Real-Time  Dashboard Reporting</h2>

<p style={{marginTop:"65px"}}>
With integrated digital tools, we provide live insights into your business’s financial performance through intuitive dashboards.          </p>

</div>
<div className="process-step process-five">

<div className="process-sub-image-seo process-sub-five">
 <img src="images/services/financial-marketing/income_2329066.png" alt="Discover Icon"  style={{width:"100px",height:"50px",marginTop:"100px"}} / >

</div>
<h2 >Revenue Forecasting & Growth Projections</h2>

<p style={{marginTop:"80px"}}>
We use historical data and market trends to create clear financial forecasts, helping you plan for scalability and investment.           </p>

</div>
<div className="process-step process-six">


<div className="process-sub-image-seo process-sub-six">
 <img src="images/services/financial-marketing/asset_3881993.png" alt="Discover Icon"  style={{width:"100px",height:"50px",marginTop:"100px"}} / >

</div>
<h2 >Market-Specific Financial  Strategy Development</h2>

<p style={{marginTop:"80px"}}>
 Tailored financial recommendations based on your industry, business model, and current economic environment.           </p>

</div>
<div className="process-step process-seven">


<div className="process-sub-image-seo process-sub-seven" style={{marginLeft:"25px"}}>
 <img src="images/services/financial-marketing/tax_3408755.png" alt="Discover Icon"  style={{width:"100px",height:"50px",marginTop:"100px"}} / >

</div>
<h2 >Tax & Compliance  Intelligence</h2>

<p style={{marginTop:"65px"}}>
Stay ahead with predictive alerts and recommendations on tax deadlines, deductions, and regulatory requirements.          </p>

</div>

</div>

    </div>
           : 
      <section className="mt-5 pt-5">

      <Slider data={sliderData} />

      </section>
      }

          
         
               <section className="seo-paragraph-content-section mt-5 pt-5">
        <div className="seo-paragraph-content-container">
            <h2 className="heading4 text-center mx-2 mb-5">Our Financial Services: Designed to Accelerate Your Success</h2>
            {/* <p className="seo-paragraph-content-intro mx-3">
             When it comes to reaching your audience offline, trust matters. At <a href="https://collectintel.in/" className="collectintel-anchor-text text-blue mx-auto text-center">COLLECTINTEL</a>, we provide reliable, result-driven support every step of the way.      </p> */}
    
            {[
                "Business Funding Solutions: Access flexible funding options to kickstart or expand your business. From startup capital to working capital loans, we help you connect with the right financial institutions and lenders suited to your business goals.",
                "   Expense & Cash Flow Management: Efficiently track and manage your business expenses with our smart solutions. We provide tools and expert support to help you maintain healthy cash flow and make data-driven financial decisions.",
                " Business Banking Assistance:Open and manage dedicated business accounts with ease. We partner with leading digital banking platforms to ensure your transactions are secure, streamlined, and optimized for business use.",
                "Card Solutions for Businesses:Through our platform Select Cards, we provide businesses with customized card solutions including credit, debit, and prepaid cards for employee and operational use.",
                "Financial Advisory & Support:Navigate your financial journey with confidence. Our experts provide personalized guidance on managing investments, reducing financial liabilities, and optimizing business strategies."
               
                
            ].map((text, index) => (
              
                
                <p 
                    key={index} 
                    className='seo-paragraph-content-step pt-2'
                >
                  <img src="images/services/arrow-right.png"  alt="image not found" ></img>
                    {text}
                </p>
               
              
            ))}
        </div>
    </section>
    
    
      
    
          <section className="seo-subscribe-section text-black flex flex-wrap justify-center items-center mt-20 pt-20 graph-margin" style={{marginTop:"100px"}}>
          <div className=" offline-subscribe-image    ">
          <img src="images/services/financial-marketing/finance_insight.png" alt="SEO Service" />
          </div>
    
      <div className="seo-subscribe-content pt-1 ">
        <h2 className="pt-1 seo-subscribe-content-heading">
         Your goals. Our guidance. Financial services that delivert
        </h2>
        <p className="pt-5 seo-subscribe-content-para text-center">
      Navigate your future with confidence.  </p>
        <div className="seo-subscribe-form pt-5  text-center ml-0 lg:ml-[200px] flex align-center justify-center">
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
            <h2 className="heading4 text-center mx-2">Financial Marketing Support You Can Trust From Ridgeveda</h2>
            {/* <p className="seo-paragraph-content-intro mx-3">
             When it comes to reaching your audience offline, trust matters. At <a href="https://collectintel.in/" className="collectintel-anchor-text text-blue mx-auto text-center">COLLECTINTEL</a>, we provide reliable, result-driven support every step of the way.      </p> */}
    
            {[
                " Reliable Business Funding Assistance : We connect you with trusted banks and NBFCs to secure loans, credit lines, and working capital—tailored to your business needs.",
                "   Secure Banking Partnerships: Through collaborations with reputed institutions like Tide Business Account, we ensure smooth, safe, and efficient banking experiences.",
                " Transparent Card Solutions via Select Cards:Access debit, credit, and prepaid cards from multiple banks with complete clarity, zero hidden charges, and exclusive benefits.",
                "End-to-End Financial Guidance:  From planning and budgeting to compliance and growth, our financial advisors walk with you every step of the way.",
                "Real-Time Support & Updates: Get prompt assistance, periodic reports, and alerts to help you stay in control of your finances at all times.",
                "Customized Financial Tools: Whether you're a startup or scaling business, we provide digital tools and dashboards built for clarity, control, and confidence."
                
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
    