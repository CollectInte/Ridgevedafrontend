'use client'
import LayoutOne from "@/components/Layout/LayoutOne";
import Link from "next/link";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import React, { useState,useEffect } from "react";
import '../../styles/text.css';
import '../../styles/smostyle.css';
import '../../styles/influencestyle.css';
import Head from 'next/head';
import { TextUnderline } from "@phosphor-icons/react";
import RealValueGraph from '../graph/page.js';
import Slider from '../slider/page';
import processSteps from "../../data/slidermobile/imsliderdata.json"; 

// import processSteps from "../../data/slidermobile/imsliderdata.json" assert { type: "json" };
import PopupForm from '../popup/page';
import  SEOHead from "../seometatags/page";
import seoMetadata from "../../components/lib/seo-metadata";

export default function Services() {    
    const sliderData = processSteps; // Get JSON data
    const [isDesktop, setIsDesktop] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showGetPopup, setShowGetPopup] = useState(false);
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
    const meta = seoMetadata.influencermarketing;
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
      <section className="container mx-auto  px- lg:px-10 service-section-one">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="col-span-12 lg:col-span-8 mt-5 pt-5">
            <div className="infor mt-5 pt-2">
              <div className="heading mt-5">
                <h2 className="heading3 mt-4 mx-2">How Influencer Marketing Drive business growth ? </h2>
                <p className="body2 mt-4 mx-2">
                Influencer marketing drives business growth by leveraging trusted voices to reach and engage target audiences authentically. It boosts brand awareness, credibility, and customer trust through relatable content. This strategy leads to increased conversions, customer loyalty, and long-term business growth.
                </p>

              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="col-span-12 lg:col-span-4 flex justify-center lg:justify-end pt-2">
            <img src="images/services/influence-marketing/images/influence_marketing_main.png" alt="SEO Service" className="w-full max-w-xs lg:max-w-sm" />
          </div>
        </div>
      </section>

      {/* Strategies Heading */}
      <div className="heading text-center ">
        <h2 className="heading4 mt-5  text-center">Our Influencer Marketing Strategies That Work</h2>
        <p className="body2 mt-5 text-blue seo-strategy-para">Influencer Strategies That Boost Engagement and Drive Growth</p>
      </div>

      {/* SEO Strategies Section */}
      <section className="flex items-center justify-center min-h-screen px-5 lg:px-20 py-10 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 ">
          {/* Card 1 */}
          <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container ">
            <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg seo-icon-one">
              <img src="images/services/influence-marketing/evaluation.png" alt="Keyword Research Icon" className="w-20 h-20" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-black mb-2">Influencer Identification & Outreach</h2>
              <p className="text-gray-700">
              The foundation of any successful influencer marketing campaign lies in partnering with the right influencers. We go beyond surface-level metrics, conducting in-depth research to identify influencers who not only have a strong following but also align with your brand values, messaging, and target audience.
              </p>
            </div>
          </div>
          <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
            <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg seo-icon-one">
            <img src="images/services/influence-marketing/campaign.png" alt="Keyword Research Icon" className="w-20 h-20" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-black mb-2">Campaign Strategy & Execution</h2>
              <p className="text-gray-700">
              Every influencer marketing campaign is designed to meet your specific business objectives. Our team works closely with you to develop a tailored strategy that outlines the goals, messaging, and deliverables for the campaign. From creative concepts to timeline planning and execution, we manage every detail to ensure a seamless and successful campaign.
              </p>
            </div>
          </div>

          <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
            <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg seo-icon-one">
            <img src="images/services/influence-marketing/product-placement.png" alt="Keyword Research Icon" className="w-20 h-20" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-black mb-2">Product Placements & Sponsorships</h2>
              <p className="text-gray-700">
              Looking to showcase your product in front of an engaged audience? Our product placement and sponsorship services are designed to give your brand maximum exposure in a natural and effective way. We work with influencers to seamlessly integrate your product into their content, whether it’s through social media posts, video content, blog reviews, or other creative formats.
              </p>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
            <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg seo-icon-one">
            <img src="images/services/influence-marketing/performance-metrics.png" alt="Keyword Research Icon" className="w-20 h-20" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-black mb-2">Performance Tracking & Reporting</h2>
              <p className="text-gray-700">
              We believe in data-driven marketing, which is why we track the performance of every influence marketing campaign with precision and accuracy. From reach and engagement to conversions and ROI, we provide detailed performance reports that offer actionable insights. Our team continually analyzes these metrics to optimize current and future campaigns, ensuring that your investment delivers maximum impact.
              </p>
            </div>
          </div>
        </div>
        
      </section>


     
      <h2 className="text-xl text-black mt-5 text-center  heading4">Ridgeveda Influencer Marketing Insight Development</h2>

      {isDesktop ?(
         <section className="influence-section-smm">

            <div className="influence-step-smm influence-one-smm ">
                <div className="influence-sub-image-smm influence-sub-one-smm ">
                <img src="images/services/influence-marketing/insight-icons/target-audience.svg" alt="Keyword Research Icon" className="w-20 h-20" />
               
                </div>
                <h2>Understanding Target Audience </h2>
         
                <p>
                Brands must define their target audience and select influencers based on demographics, interests, and online behavior. Aligning with the right niche ensures relevant content, stronger connections, and higher engagement.
                </p>
               
            </div>

   
            <div className="influence-step-smm influence-two-smm">
            

            <div className="influence-sub-image-smm influence-sub-two-smm">
            <img src="images/services/influence-marketing/insight-icons/influencer.svg" alt="Keyword Research Icon" className="w-20 h-20" />
            
            </div>
            <h2>Right Influencers </h2>
                <p>
                Brands should evaluate influencers based on reach, engagement, authenticity, and audience demographics. While micro-influencers offer higher engagement in niche communities, macro-influencers and celebrities provide broader exposure, making a balanced mix ideal.
                </p>
                
            </div>

    
        <div className="influence-step-smm influence-three-smm">
           
            <div className="influence-sub-image-smm influence-sub-three-smm">
            <img src="images/services/influence-marketing/insight-icons/content-strategy.svg" alt="Keyword Research Icon" className="w-20 h-20" />
           
            </div>
            <h2>Authenticity  & Content Strategy</h2>
            <p>
            Authenticity is key in influencer marketing, making genuine, creative content more impactful. Allowing influencers creative freedom fosters trust through storytelling, behind-the-scenes insights, and user-generated content.            </p>
           
        </div>
        <div className="influence-step-smm influence-four-smm">
            
            <div className="influence-sub-image-smm influence-sub-four-smm">
            <img src="images/services/influence-marketing/insight-icons/optimization.svg" alt="Keyword Research Icon" className="w-20 h-20" />
            
            </div>
            <h2>Mutli-Platform Optimization</h2>
            <p>
            Each social media platform requires a tailored content strategy, with Instagram and TikTok excelling in visuals, YouTube in reviews, and LinkedIn for B2B marketing. Optimizing formats like videos, reels, and live sessions ensures maximum impact across platforms.            </p>
           
        </div>
        <div className="influence-step-smm influence-five-smm">
           
            <div className="influence-sub-image-smm influence-sub-five-smm">
            <img src="images/services/influence-marketing/insight-icons/performance.svg" alt="Keyword Research Icon" className="w-20 h-20" />
           
            </div>
            <h2>Performance Tracking
            </h2>
            <p>
            Tracking campaign performance through KPIs like engagement, reach, and conversions helps refine strategies. Using affiliate links, UTM parameters, and promo codes links influencer efforts directly to sales and ROI.            </p>
            
        </div>
        <div className="influence-step-smm influence-six-smm">
           

            <div className="influence-sub-image-smm influence-sub-six-smm">
            <img src="images/services/influence-marketing/insight-icons/compliance.svg" alt="Keyword Research Icon" className="w-20 h-20" />
            
            </div>
            <h2> Compliance & Transparency</h2>
            <p>
            Adhering to legal guidelines, such as disclosing sponsored content and following platform policies, is essential to maintain trust and avoid regulatory issues. Clear contracts outlining expectations, deliverables, and compensation ensure smooth collaborations between brands and influencers.            </p>
            
        </div>
       
        
      </section>

      ) : <section className="mt-5 pt-5">

      <Slider data={sliderData} />

      </section> }
     
     {/* {isMobile && (
      <section >

      <Slider data={sliderData} />

      </section>
     )} */}


      {/* <section className="process-section-mobile">

          <div className="process-mobile process-mobile-one">
          <div className="process-sub-mobile process-sub-mobile-one">
          <img src="images/services/sub/discover.png" alt="Discover Icon" />
          
          </div>


          <p>
          We collaborate with your team to understand your business goals, conduct an initial site review, and identify KPIs. Through keyword research and conversion path analysis, we gain deep insights into your processes and objectives.
          </p>
   
          </div>


          <div className="process-mobile process-mobile-two">


          <div className="process-sub-mobile process-sub-mobile-three ">
          <img src="images/services/sub/analyse.png" alt="Discover Icon" />
         
          </div>
              <p>
              We analyze business data through competitive benchmarking, site audits, and traffic patterns to assess your digital presence. This helps us identify key factors and craft the best SEO strategy based on analytics and competitor insights.
              </p>
              
          </div>


            <div className="process-mobile  process-mobile-three">

            <div className="process-sub-mobile process-sub-mobile-three">
            <img src="images/services/sub/strategize.png" alt="Discover Icon" />
            
            </div>
            <p>
            We create a 60-day SEO plan outlining goals, outcomes, and timelines, prioritizing critical aspects for quick, targeted results. Our focus in the first month is to ensure immediate impact across key marketing channels.
            </p>

            </div>
          <div className="process-mobile process-mobile-four">

          <div className="process-sub-mobile process-sub-mobile-four">
          <img src="images/services/sub/execute.png" alt="Discover Icon" />
          
          </div>
          <p>
          We execute the SOMP by optimizing web pages, improving site structure, and managing business listings. We also boost SEO with multi-channel strategies, including social media campaigns and outreach to third-party websites.
          </p>

          </div>
          <div className="process-mobile process-mobile-five ">

          <div className="process-sub-mobile process-sub-mobile-five ">
          <img src="images/services/sub/measure.png" alt="Discover Icon"  width="200" height="200" />
         
          </div>
          <p>
             We set up tracking to monitor your SEO progress, analyzing analytics, keyword rankings, and KPIs. This helps us gain insights into traffic, bounce rates, conversions, and CTRs to refine and improve your SEO strategies.
          </p>

          </div>
          <div className="process-mobile process-mobile-six ">


          <div className="process-sub-mobile  process-sub-mobile-six">
          <img src="images/services/sub/report.png" alt="Discover Icon" />
         
          </div>
          <p>
            Our SEO team provides regular consultations and monthly reports, detailing site performance, KPI trends, and rankings. Each month, we create a new 90-day roadmap to keep you informed on campaign progress and expectations.
          </p>

          </div>
        <div className="process-mobile process-mobile-seven ">


        <div className="process-sub-mobile process-sub-mobile-seven">
        <img src="images/services/sub/adjust.png" alt="Discover Icon" />
        </div>
        <p>
          We continuously adjust SEO strategies to keep up with algorithm updates and market trends, ensuring high search rankings. Our proactive approach keeps your website optimized and you informed on campaign progress.
        </p>

        </div>

      </section> */}

     {/* <h2 className="px-5 mt-5 ml-5 graph-head seo-subscribe-content-heading">Monthly Overview of Your Digital Growth with Expert Social Media Management Services</h2> 
           <p className="px-5 mt-1 ml-5 graph-para seo-subscribe-content-para"> Monitor your digital marketing success with our monthly performance graph, including the impact of our expert Social Media Management services. Get clear, data-driven insights on the growth and effectiveness of your campaigns, helping you see real-time results and the powerful boost social media strategies bring to your brand's online presence. </p>
           <RealValueGraph jsonFile="smmgraph" />
      */}

      <section className="seo-subscribe-section text-black flex flex-wrap justify-center items-center mt-20 pt-20" >
      <div className="seo-subscribe-image influence-mar-img">
      <img src="images/services/influence-marketing/images/girl.png" alt="SEO Service"  />
      </div>

  <div className="seo-subscribe-content pt-5">
    <h2 className="pt-5 seo-subscribe-content-heading ">
      Build Your Future with an <span className="seo-text">Influencer Marketing</span> Firm That Produces Results.
    </h2>
    <p className="pt-5 seo-subscribe-content-para">
    Unlocking Business Potential Through Influencers
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

  <section className="seo-paragraph-content-section">
    <div className="seo-paragraph-content-container">
        <h2 className="heading4 mx-3 text-center">Influencer Marketing Support You Can Trust From Ridgeveda</h2>
        <p className="seo-paragraph-content-intro mx-3">
            At <a href="https://ridgeveda.com/" className="collectintel-anchor-text text-blue mx-auto text-center">Ridgeveda</a>, We understand that influencer marketing is not just about partnering with people who have large followings—it’s about creating authentic relationships with influencers who genuinely connect with your brand and audience. Our influencer marketing services are designed to ensure that your campaigns are not only creative and impactful but also data-driven and results-oriented.      </p>

        {[
            " Access to a Wide Network of Influencers: We have access to a diverse network of influencers across various industries and niches, from beauty and fashion to technology and fitness. Whether you need a large-scale campaign with high-reach influencers or a targeted approach with micro-influencers, we have the connections and expertise to make it happen.",
            " Customized Campaigns Tailored to Your Brand: Every brand is unique, and we tailor our campaigns to reflect your distinct voice, values, and business objectives. From influencer selection to content creation, we ensure that every aspect of the campaign aligns with your brand’s identity and goals.",
            " Data-Driven Approach for Maximum Impact: Our influencer marketing campaigns are backed by data. We track performance metrics throughout the campaign to ensure that your efforts are driving the results you need—whether it’s increasing brand awareness, boosting engagement, or driving sales.",
            
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
