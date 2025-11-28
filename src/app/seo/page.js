'use client'
import LayoutOne from "@/components/Layout/LayoutOne";
import Link from "next/link";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import React, { useState,useEffect } from "react";
import '../../styles/text.css';
import '../../styles/seostyle.css';
import Head from 'next/head';
import SeoInsight from '../seoinsight/page.js';
import { TextUnderline } from "@phosphor-icons/react";
import RealValueGraph from '../graph/page.js';
import Slider from '../slider/page';
import processSteps from "../../data/slidermobile/seosliderdata.json"; // Import JSON file
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
  const [showPopup, setShowPopup] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
   const [showGetPopup, setShowGetPopup] = useState(false);
  
    const sliderData = processSteps; // Get JSON data
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
    const meta = seoMetadata.seo;

    // useEffect(() => {
    //   const checkWindowSize = () => {
    //     setIsMobile(window.innerWidth <= 767);
    //   };
    //   checkWindowSize();
    //   window.addEventListener('resize', checkWindowSize);
    //   return () => window.removeEventListener('resize', checkWindowSize);
    // }, []);
   
    React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowGetPopup(true); // Show popup after 10 seconds
    }, 10000); // 10000ms = 10s

    // Clean up the timer if the component unmounts before 10s
    return () => clearTimeout(timer);
  }, []);
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
                <h2 className="heading4 mt-4 ">do you Want to grow your bussiness with SEO services? </h2>
                <p className="body2 mt-4 ">
                In today’s competitive digital world, simply having a website is no longer enough. To thrive online, your business must be easily discoverable by potential customers. Our tailored Search Engine Optimization (SEO) services are designed to boost your online visibility, enhance your rankings on search engines like Google, and drive organic traffic to your site, making it easier for customers to find you.
                </p>

              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="col-span-12 lg:col-span-4 flex justify-center lg:justify-end">
            <img src="images/services/sub/SEO_1.png" alt="SEO Service" className="w-full max-w-xs lg:max-w-sm" />
          </div>
        </div>
      </section>

      {/* Strategies Heading */}
      <div className="heading text-center pt-10">
        <h2 className="heading4 mb-5 text-center">Our SEO Strategies That Work</h2>
        <p className="body2 mt-5 text-center text-blue seo-strategy-para">Elevate Your Website's Ranking and Reach More People Online</p>
      </div>
    
      {/* SEO Strategies Section */}
      <section className="flex items-center justify-center min-h-screen px-5 lg:px-20 py-10 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-5 pt-5">
          {/* Card 1 */}
          <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container ">
            <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg seo-icon-one startegy-icon-one">
              <img src="images/services/sub/research.png" alt="Keyword Research Icon" className="w-20 h-20" style={{marginTop:"-10px"}} />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-black mb-2">Keyword Research & Optimization</h2>
              <p className="text-gray-700">
              We conduct in-depth keyword research to find the most relevant and high-traffic keywords for your business. By strategically incorporating these keywords into your website’s content, meta tags, and URLs, we ensure that your site aligns with what your target audience is searching for.
              </p>
            </div>
          </div>
          <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
            <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg seo-icon-one  ">
            <img src="images/services/sub/seo_audits.png" alt="Keyword Research Icon" className="w-20 h-20 " style={{marginTop:"-20px"}} />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-black mb-2" >Technical SEO Audits</h2>
              <p className="text-gray-700">
              We perform thorough technical SEO audits to identify and resolve any issues that may be affecting your site’s performance. This includes improving site speed, fixing broken links, ensuring mobile responsiveness, and optimising crawlability and indexation, ensuring that your site meets all technical requirements for optimal search engine visibility.
              </p>
            </div>
          </div>

          <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
            <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg seo-icon-one ">
            <img src="images/services/sub/link.png" alt="Keyword Research Icon" className="w-20 h-20" style={{marginTop:"-1px"}} />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-black mb-2 " style={{marginTop:"-5px"}}>Link Building Strategies </h2>
              <p className="text-gray-700">
              Our link-building strategies are focused on acquiring high-quality backlinks from relevant, authoritative websites. These backlinks help to establish your website’s authority, improve rankings, and drive more referral traffic. We employ ethical and sustainable link-building practices to ensure long-term success. 
              </p>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
            <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg seo-icon-one">
            <img src="images/services/sub/on-off-page.png" alt="Keyword Research Icon" className="w-20 h-20" style={{marginTop:"-20px"}} />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-black mb-2">On-Page & Off-Page SEO</h2>
              <p className="text-gray-700">
              Our on-page SEO services involve optimizing the structure and content of your website to make it more search-engine friendly. This includes improving title tags, meta descriptions, headings, and content quality. For off-page SEO, we focus on building high-quality backlinks from authoritative sites to increase your domain authority and improve your site’s ranking in search results.

              </p>
            </div>
          </div>
        </div>
        
      </section>


     
      <h2 className="text-xl font-bold text-black mt-5 text-center  heading4 mt-4">Ridgeveda SEO Insight Development</h2>

      {isDesktop ? <SeoInsight />: 
      <section className="mt-5 pt-5">

      <Slider data={sliderData} />

      </section>
      }


    

       <section>
        <div>
          <h2 className="py-4 mt-5  mx-2  mb-5  heading4  text-center  graph-margin " >
          Monthly Overview of Your Digital Growth with Expert SEO Services
          </h2>
          <p className="px-5 mt-1 ml-5 py-3 seo-subscribe-content-para text-center"> Monitor your digital marketing success with our monthly performance graph, including the impact of our expert SEO services. Get clear, data-driven insights on the growth and effectiveness of your campaigns, helping you see real-time results and the powerful boost SEO brings to your online visibility. </p>
          <RealValueGraph jsonFile="smmgraph" />
        </div>
       </section>
     

     {/* seo custom graph */}
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
          

      

      <section className="seo-subscribe-section text-black flex flex-wrap justify-center items-center">
      <div className="seo-subscribe-image">
        <img src="/images/services/seo-graph.png" alt="Process Image"   />
      </div>

  <div className="seo-subscribe-content pt-1">
    <h2 className="pt-1 seo-subscribe-content-heading text-center">
      Build Your Future with an <span className="seo-text">SEO</span> Firm That Produces Results.
    </h2>
    <p className="pt-5 seo-subscribe-content-para">
      Grow Traffic, Elevate Sales And Enhance Conversions
    </p>
    <div className="seo-subscribe-form">
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

  <section className="seo-paragraph-content-section">
    <div className="seo-paragraph-content-container">
        <h2 className="heading4 mt-4 mx-5 mb-5 pb-5 text-center pt-5">SEO Support You Can Trust From Ridgeveda</h2>
        <p className="seo-paragraph-content-intro mx-3">
            At <a href="https://ridgeveda.com/" className="collectintel-anchor-text text-blue mx-auto text-center">Ridgeveda</a>, we provide reliable SEO support to boost your online visibility. Our team delivers tailored strategies to ensure your website ranks higher and performs better.        </p>

        {[
            " Customized SEO Strategies:  We create tailored SEO plans that align with your unique business goals.",
            " Transparent Reporting:  Regular updates and detailed reports ensure you're always informed about your SEO progress.",
            " Continuous Optimization: Our team continuously monitors and adjusts strategies to stay ahead of search engine algorithms.",
            " Comprehensive On-Page & Off-Page SEO: We optimize your website’s structure, content, and build quality backlinks to enhance authority.",
            " Technical SEO Expertise: We tackle any technical issues to ensure your site runs smoothly and ranks effectively.",
            " Industry Best Practices: We follow proven strategies and stay updated with the latest SEO trends and algorithm changes.",
            " Dedicated SEO Experts: Our team works closely with you, providing ongoing support and guidance throughout your campaign."
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
