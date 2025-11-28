'use client';
import LayoutOne from "@/components/Layout/LayoutOne";
import Link from "next/link";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import React, { useState,useEffect} from "react";
import Head from 'next/head';
import '../../styles/text.css';
import '../../styles/smostyle.css';
import { TextUnderline } from "@phosphor-icons/react";
import RealValueGraph from '../graph/page.js';
import ContentInsight from '../contentinsight/page.js';
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
    const meta = seoMetadata.contentmarketing;
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
                <h2 className="heading4 mt-5 mx-2">How Content Marketing Services Drive Business Growth ? </h2>
                <p className="body2 mt-4 mx-2">
                Content marketing services drive business growth by attracting and engaging potential customers through valuable, SEO-optimized content. This increases brand awareness, generates qualified leads, and boosts customer trust. By delivering consistent, high-quality content, businesses can enhance your online presence and achieve long-term success.                </p>

              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="col-span-12 lg:col-span-4 flex justify-center lg:justify-end">
            <img src="images/services/content-marketing/images/content_marketing.png" alt="SEO Service" className="w-full max-w-xs lg:max-w-sm" />
          </div>
        </div>
      </section>

      {/* Strategies Heading */}
      <div className="heading text-center ">
        <h2 className="heading4 mt-10 text-center mx-2">Our Content Marketing Strategies That Work</h2>
        <p className="body2 mt-5 text-blue seo-strategy-para mx-2">From Ideas to Impact – Content That Grows Your Business</p>
      </div>

      {/* SEO Strategies Section */}
      <section className="flex items-center justify-center min-h-screen px-5 lg:px-20 py-10 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 ">
          {/* Card 1 */}
          <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
            <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg seo-icon-one">
            <img src="images/services/content-marketing/content-strategy.png" alt="Keyword Research Icon" className="w-20 h-20 mt-5" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-black mb-2 smm-strategy-one">Content Strategy & Creation</h2>
              <p className="text-gray-700">
              Creating impactful content begins with a well-defined strategy. Our approach starts by developing a customized content strategy that is closely aligned with your business goals, industry trends, and audience behavior.
              </p>
            </div>
          </div>
          <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
            <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg seo-icon-one">
            <img src="images/services/content-marketing/desktop-computer.png" alt="Keyword Research Icon" className="w-20 h-20" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-black mb-2">SEO-Optimized Blogs & Articles</h2>
              <p className="text-gray-700">
              Content marketing and SEO go hand in hand. We create high-quality, SEO-optimized content designed to attract organic traffic and improve your website's visibility on search engines. By conducting in-depth keyword research, crafting engaging content, and optimizing on-page elements, we help your business rank higher for relevant search queries.    
              </p>        </div>
          
          </div>

          <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
            <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg seo-icon-one">
            <img src="images/services/content-marketing/video-marketing.png" alt="Keyword Research Icon" className="w-20 h-20" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-black mb-2">Infographics & Video Marketing</h2>
              <p className="text-gray-700">
              Visual content is becoming increasingly important in content marketing, as it enhances user engagement and helps communicate complex ideas in a simple, digestible format. Our team specializes in creating visually compelling infographics and high-quality video content that captivates your audience and drives engagement across platforms.              </p>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
            <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg seo-icon-one">
            <img src="images/services/content-marketing/planning.png" alt="Keyword Research Icon" className="w-20 h-20" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-black mb-2">Editorial Planning & Execution</h2>
              <p className="text-gray-700">
              Consistency is key to building a loyal audience and maintaining an effective content marketing strategy. Our editorial planning and execution services ensure that your content is not only high-quality but also delivered consistently and strategically.              </p>
            </div>
          </div>
        </div>
        
      </section>


     
      <h2 className="text-xl  text-black my-5 text-center heading4 mx-2 ">Ridgeveda Content Marketing Insight Development</h2>

     
     
      
      {isDesktop ?  <ContentInsight /> : <section  style={{marginTop:"60px"}}>

    <Slider data={sliderData} />

    </section>}
    
   

      
     
     
    

            <h2 className="px-5 mt-5  heading4 text-center mx-2" style={{marginTop:"50px"}}>Monthly Overview of Your Digital Growth with Expert Content Marketing Services</h2> 
            <p className="px-5 mt-5   text-center mx-2"> Monitor your Content Marketing performance with our monthly analysis graph. Get insights into engagement, reach, and conversions to measure the effectiveness of your content strategy. Use data-driven analytics to optimize and enhance your brand’s impact. </p>
            <RealValueGraph jsonFile="smmgraph" /> 
      
           <section className="customGraph mx-auto">
           <div className="row">
             <h1 className="mb-3 text-center font-bold text-3xl mb-5 pb-5">
               Estimate Your Views and Conversion Rate
             </h1>
             <form onSubmit={handleGraph}>
               <div className="flex flex-col md:flex-row justify-center items-center text-center space-y-4 md:space-y-0 md:space-x-6" style={{ width: "80%", margin: "auto" }}>
                 <div className="flex flex-col items-center">
                   <label htmlFor="presentviews" className="font-bold text-xl mb-1">Present Views</label>
                   <input
                     type="number"
                     name="presentviews"
                     id="presentviews"
                     className="border border-primary w-64 h-8"
                   />
                 </div>
         
                 <div className="flex flex-col items-center">
                   <label htmlFor="expectedviews" className="font-bold text-xl mb-1">Expected Views</label>
                   <input
                     type="number"
                     name="expectedviews"
                     id="expectedviews"
                     className="border border-primary w-64 h-8"
                   />
                 </div>
               </div>
         
               <div className="text-center pt-5">
                 <button
                   type="submit"
                   className="text-center rounded-2xl font-medium text-lg bg-primary"
                
                   style={{ backgroundColor: "blue", color: "white", width: "100px", height: "40px" }}
                 >
                   Submit
                 </button>
               </div>
             </form>
           </div>
         
           <div className="p-6 w-full max-w-screen-lg mx-auto p-5 ">
              
                    {graphData.length > 0 && (
                       <div className="w-full h-[400px] mb-5 pb-5">
                          <h2 className="text-2xl font-bold pb-4"> Visitors Growth Graph</h2>
                          <h2 className="text-2xl font-medium pb-4 text-center text-blue-400 !important	"> Estimated Months -{months} Months</h2>
         
                         <ResponsiveContainer width="100%" height="90%" className="pb-5 mb-5">
                           <LineChart data={graphData} className="pb-5 mb-5">
                             <CartesianGrid strokeDasharray="3 3" />
                             <XAxis dataKey="name" tick={{ fill: "green", fontSize: 12 }} />
                             <YAxis
                               yAxisId="left"
                               domain={[presentViews, expectedViews]}
                               tick={{ fill: "blue", fontSize: 12 }}
                               label={{
                                 value: "Visitors",
                                 angle: -90,
                                 position: "insideLeft",
                                 fill: "blue",
                                 style: { fontWeight: "bold", fontSize: 12 },
                               }}
                             />
                             <YAxis
                               yAxisId="right"
                               orientation="right"
                               domain={[0, 10]}
                               tick={{ fill: "red", fontSize: 12 }}
                               label={{
                                 value: "Conversion Rate (%)",
                                 angle: -90,
                                 position: "insideRight",
                                 fill: "red",
                                 style: { fontWeight: "bold", fontSize: 12 },
                               }}
                             />
                             <Tooltip />
                             <Legend />
                             <Line
                               yAxisId="left"
                               type="monotone"
                               dataKey="visitors"
                               stroke="#8884d8"
                               strokeWidth={3}
                             />
                             <Line
                               yAxisId="right"
                               type="monotone"
                               dataKey="conversion"
                               stroke="#ff7300"
                               strokeWidth={3}
                             />
                           </LineChart>
         
                         </ResponsiveContainer>
         
                       </div>
                     )}
                   </div>
               </section>
        

                  <section className="cmm-subscribe-section text-black "> 
                <div className="cmm-subscribe-content pt-1">
                <h2 className="pt-1 seo-subscribe-content-heading">
                  Build Your Future with an <span className="seo-text">Content Marking</span> Firm That Produces Results.
                </h2>
                <p className="pt-5 seo-subscribe-content-para">
                Creating Impactful Content for Lasting Brand Success
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
  
  <section className="seo-paragraph-content-section">
    <div className="seo-paragraph-content-container">
        <h2 className="heading4 text-center mx-3">Content Marketing Support You Can Trust From Ridgeveda</h2>
        <p className="seo-paragraph-content-intro mx-3">
            At <a href="https://ridgeveda.com/" className="Collectintel-anchor-text text-blue mx-auto text-center">Ridgeveda</a>, we provide reliable content marketing support to boost your online visibility. Our team delivers tailored strategies to ensure your website ranks higher and performs better.</p>

        {[
            " Tailored Approach: We develop content strategies that are specifically tailored to your business goals and audience, ensuring maximum impact and ROI.",
            " SEO Expertise: Our team of SEO specialists ensures that your content not only engages but also ranks well on search engines, driving organic traffic to your website.",
            " Creative Excellence: With a focus on storytelling and visual appeal, our content captivates audiences and builds meaningful connections with your brand.",
            " Full-Service Solution: From strategy development and content creation to distribution and performance tracking, we offer a complete content marketing solution that drives results."
           
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
