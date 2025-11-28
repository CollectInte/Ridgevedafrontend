'use client'
import LayoutOne from "@/components/Layout/LayoutOne";
import Link from "next/link";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import React, { useState,useEffect } from "react";
import '../../styles/webdevstyles.css';
import Head from 'next/head';
import { TextUnderline } from "@phosphor-icons/react";
import RealValueGraph from '../graph/page.js';
import Slider from '../slider/page';
import processSteps from "../../data/slidermobile/websliderdata.json"; // Import JSON file
import PopupForm from '../popup/page';

import  SEOHead from "../seometatags/page";
import seoMetadata from "../../components/lib/seo-metadata";




export default function Services() {    
    const sliderData = processSteps; // Get JSON data
    const [isDesktop, setIsDesktop] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const meta = seoMetadata.tech;
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


    React.useEffect(() => {
           const timer = setTimeout(() => {
             setShowGetPopup(true); // Show popup after 10 seconds
           }, 10000); // 10000ms = 10s
       
           // Clean up the timer if the component unmounts before 10s
           return () => clearTimeout(timer);
         }, []);

   
  
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
                  {/* <div className="heading">
                    <h2 className="heading4 mt-5">How Tech Services Drive Business Growth ?</h2>
                    <p className="body2 mt-4">
                    Web development services drive business growth by creating a user-friendly, responsive website that enhances customer experience. A well-optimized site improves online visibility, attracts more traffic, and increases conversions. It also supports business scalability with secure, efficient, and tailored digital solutions.
                    </p>

                  </div> */}
                   <div className="heading">
                    <h2 className="heading4 mt-5">Empowering Businesses with Scalable, Smart & Secure Technology Solutions</h2>
                    <p className="body2 mt-4">
                      At Ridgeveda, we blend creativity, technology, and strategy to build intelligent digital solutions that drive innovation and growth. Whether you're a startup, SME, or enterprise, our technology services are designed to simplify your operations, enhance user experience, and future-proof your business in the digital age.

                    </p>
                    <p className="body2 mt-4">
                 From custom software development to AI integrations and IT support, our tech experts work closely with you to deliver scalable and reliable solutions tailored to your unique business needs.
                    </p>
                  </div>
                </div>
              </div>
              
          {/* Right Column */}
              <div className="col-span-12 lg:col-span-4 flex justify-center lg:justify-end">
                  <img src="images/services/web-development/images/web_dev.png" alt="SEO Service" className="w-full max-w-xs lg:max-w-sm" />  
              </div>
        </div>
      </section>

     {/* Strategies Heading */}
     <div className="heading text-center ">
        <h2 className="heading4 mt-10 text-center mx-2">Our Tech Services Strategies That Work</h2>
        <p className="body2 mt-5 text-blue seo-strategy-para">Transforming Your Vision into a Growth-Driven Website              </p>
      </div>

      {/* SEO Strategies Section */}
      <section className="flex items-center justify-center  px-5 lg:px-20 py-10 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 ">
          {/* Card 1 */}
            <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
            <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg seo-icon-one">
              <img
                src="images/services/tech/app-development.png"
                alt="Web Design Icon"
                className="w-20 h-20"
              />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-black mb-2">Web & App Development</h2>
              <p className="text-gray-700 mb-3">
                We design and develop responsive, secure, and high-performing web applications and mobile apps that enhance user engagement and drive conversions.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Custom Web Development</li>
                <li>E-commerce Solutions</li>
                <li>Android & iOS App Development</li>
                <li>UI/UX Design & Optimization</li>
                <li>Website Maintenance & Support</li>
              </ul>
            </div>
          </div>

            <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
            <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg seo-icon-one">
              <img
                src="images/services/tech/web-development.png"
                alt="Software Development Icon"
                className="w-20 h-20"
              />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-black mb-2">Software Development</h2>
              <p className="text-gray-700 mb-3">
                Get tailor-made software that solves your exact business challenges. Our agile development process ensures fast delivery, flexibility, and scalability.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Enterprise Software Solutions</li>
                <li>SaaS Platform Development</li>
                <li>CRM & ERP System Development</li>
                <li>API Integrations</li>
                <li>Custom Dashboard & Analytics Tools</li>
              </ul>
            </div>
          </div>


         <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
        <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg seo-icon-one">
          <img
            src="images/services/tech/cloud-service.png"
            alt="Cloud Services Icon"
            className="w-20 h-20"
          />
        </div>
        <div className="ml-4">
          <h2 className="text-xl font-bold text-black mb-2">Cloud Services & DevOps</h2>
          <p className="text-gray-700 mb-3">
            We help you migrate, manage, and scale your infrastructure on the cloud while ensuring performance, cost-efficiency, and security.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Cloud Migration (AWS, Azure, Google Cloud)</li>
            <li>CI/CD Pipelines & Automation</li>
            <li>DevOps Consulting & Implementation</li>
            <li>Server Management & Monitoring</li>
          </ul>
        </div>
      </div>


        <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
        <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg seo-icon-one">
          <img
            src="images/services/tech/smart-technology.png"
            alt="AI & Data Icon"
            className="w-20 h-20"
          />
        </div>
        <div className="ml-4">
          <h2 className="text-xl font-bold text-black mb-2">AI & Data-Driven Solutions</h2>
          <p className="text-gray-700 mb-3">
            Leverage cutting-edge AI, Machine Learning, and data analytics to improve decision-making, automate tasks, and gain deeper customer insights.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Chatbots & Virtual Assistants</li>
            <li>Predictive Analytics & Reporting</li>
            <li>Natural Language Processing (NLP)</li>
            <li>AI-based Recommendation Systems</li>
          </ul>
        </div>
      </div>

          <div className="lg:col-span-2 flex justify-center">
        <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
          <div className="flex-shrink-0 bg-green-100 p-5 rounded-lg seo-icon-one mt-5 mx-auto">
            <img
              src="images/services/tech/it-department.png"
              alt="Cybersecurity Icon"
              className="w-20 h-20"
            />
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-bold text-black mb-2">Cybersecurity & IT Support</h2>
            <p className="text-gray-700 mb-3">
              Secure your digital assets and ensure business continuity with our robust IT and security services.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Data Encryption & Privacy Controls</li>
              <li>Firewall & Threat Detection</li>
              <li>Regular Security Audits</li>
              <li>Remote IT Support & Helpdesk</li>
            </ul>
          </div>
        </div>
      </div>

         
          {/* Card 2 */}
         
        </div>


        
        
      </section>

     
      {/* <h2 className="text-xl  text-black mt-5 text-center heading4" style={{marginTop:"20px"}}>Ridgeveda Tech Services Insight Development</h2> */}


      {/* {isDesktop ?(
      <section className="process-section process-section-seo">

       <div class="web-container">

        <div className="process-step process-one ">
        <div className="process-sub-image-web process-sub-one ">
        <img src="images/services/web-development/insight-icons/data-collection.svg" alt="Discover Icon" />
      
        </div>

        <h2 className="web-heading">Data Collection</h2>
        <p>
        Gather data from multiple sources, including market research, customer feedback, website analytics, and industry reports.
        Use qualitative (surveys, interviews) and quantitative (sales, engagement rates) methods for comprehensive insights.
        </p>
      
        </div>


        <div className="process-step process-two">
      <div className="process-sub-image-web  process-sub-two">
      <img src="images/services/web-development/insight-icons/trend.svg" alt="Discover Icon" />

      </div>
      <h2 className="web-heading">Trend & Pattern Analysis</h2>
        
          <p className="mt-6">
          Analyze collected data to identify key trends, correlations, and emerging consumer behaviors.
          Use tools like Google Analytics, heatmaps, and social media insights to track engagement and preferences.          </p>
          
      </div>


      <div className="process-step process-three">
      <div className="process-sub-image-web  process-sub-three">
      <img src="images/services/web-development/insight-icons/target.svg" alt="Discover Icon" />
      </div>
      <h2 className="web-heading">Audience Understanding</h2>
      <p className="mt-6">
      Segment audiences based on demographics, interests, and behaviors.Develop customer personas to understand pain points, motivations, and purchasing patterns.      </p>
      </div>


      <div className="process-step process-four">
      <div className="process-sub-image-web process-sub-four">
      <img src="images/services/web-development/insight-icons/idea-generation.svg" alt="Discover Icon" />
      </div>
      <h2 className="web-heading">Idea Generation</h2>
      <p>
      Brainstorm hypotheses based on observed patterns and customer needs.Collaborate with cross-functional teams (marketing, sales, product development) for diverse perspectives.      </p>
      </div>


      <div className="process-step process-five">
        <div className="process-sub-image-web process-sub-five">
        <img src="images/services/web-development/insight-icons/software-testing.svg" alt="Discover Icon" />
        </div>
            <h2 className="web-heading">Validation & Testing</h2>
            <p className="mt-6">
            Conduct A/B testing, focus groups, or pilot campaigns to test insights.
            Use real-time feedback and analytics to refine and confirm assumptions.      
            </p>
      </div>


      <div className="process-step process-six">
         <div className="process-sub-image-web process-sub-six">
         <img src="images/services/web-development/insight-icons/implement.svg" alt="Discover Icon" />
         </div>
         <h2 className="web-heading">Implementation</h2>

           <p>
            Apply insights to business strategies, such as marketing campaigns, product improvements, or customer engagement tactics.
            Align insights with business goals to drive growth and innovation. 
           </p>
      </div>


        <div className="process-step process-seven">
        <div className="process-sub-image-web process-sub-seven">
        <img src="images/services/web-development/insight-icons/monitoring.svg" alt="Discover Icon" />
        </div>
        <h2 className="web-heading">Monitoring & Optimization</h2>
        <p className="mt-6">
        Continuously track key performance indicators (KPIs) to measure the impact of implemented insights.
        Make data-driven refinements for continuous improvement and better decision-making. 
         </p>
        </div>




       </div>

       


      

      </section>
      ):(

        <section className="mt-5 pt-5">

        <Slider data={sliderData} />

        </section>
  )} */}


      {/* {isMobile && (
            <section >

            <Slider data={sliderData} />

            </section>
      )}
 */}

      

      <section className="seo-subscribe-section text-black flex flex-wrap justify-center items-center mt-10 pt-10">
      <div className="seo-subscribe-image web-dev-mobile-img">
      <img src="images/services/web-development/images/web.png" alt="SEO Service"   />  
      </div>

  <div className="seo-subscribe-content pt-5 mt-5">
    <h2 className="pt-1 seo-subscribe-content-heading">
      Build Your Future with <span className="seo-text">Tech Services</span> Firm That Produces Results.
    </h2>
    <p className="pt-5 seo-subscribe-content-para">
    Innovative Web Solutions for a Stronger Online Presence
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
            At <a href="https://Ridgeveda.com/" className="collectintel-anchor-text text-blue mx-auto text-center">Ridgeveda</a>, we understand that your website is the backbone of your digital presence. Keeping it updated, functional, and secure is essential to maintaining a strong online presence and ensuring a seamless user experience. Our Web Development Support services are designed to provide ongoing maintenance, updates, and technical assistance, so your website remains at its best.    </p>

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

 <section className="seo-paragraph-content-section">
    <div className="seo-paragraph-content-container">
        <h2 className="heading4 mx-3 text-center">Why Choose Ridgeveda for Tech Services?</h2>
        {/* <p className="seo-paragraph-content-intro mx-3">
            At <a href="https://Ridgeveda.com/" className="collectintel-anchor-text text-blue mx-auto text-center">Ridgeveda</a>, we understand that your website is the backbone of your digital presence. Keeping it updated, functional, and secure is essential to maintaining a strong online presence and ensuring a seamless user experience. Our Web Development Support services are designed to provide ongoing maintenance, updates, and technical assistance, so your website remains at its best.    </p> */}

        {[
            " Innovative Approach: We stay ahead of tech trends to offer modern and competitive solutions.",
            " Client-Centric: Every project is built with your business objectives at the core.",
            " End-to-End Delivery: From planning to deployment and support — we handle it all.",
            " Custom Solutions: No one-size-fits-all – our solutions are tailor-made for your unique challenges.",
            " Data Security: We prioritize your data integrity and compliance at every stage.",
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
