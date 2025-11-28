'use client'
import LayoutOne from "@/components/Layout/LayoutOne";
import Link from "next/link";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import React, { useState,useEffect } from "react";
import '../../styles/text.css';
import '../../styles/smostyle.css';
import Head from 'next/head';
import { TextUnderline } from "@phosphor-icons/react";
import RealValueGraph from '../graph/page.js';
import Slider from '../slider/page';
import processSteps from "../../data/slidermobile/smmsliderdata.json"; // Import JSON file
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
    const sliderData = processSteps; // Get JSON data
    const [isDesktop, setIsDesktop] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showGetPopup, setShowGetPopup] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const meta = seoMetadata.smm;
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
       React.useEffect(() => {
              const timer = setTimeout(() => {
                setShowGetPopup(true); // Show popup after 10 seconds
              }, 10000); // 10000ms = 10s
          
              // Clean up the timer if the component unmounts before 10s
              return () => clearTimeout(timer);
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
        const checkWindowSize = () => {
          setIsDesktop(window.innerWidth >1024);
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
        <div className="grid grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="col-span-12 lg:col-span-8 mt-5">
            <div className="infor">
              <div className="heading mt-5">
                <h2 className="heading4 mt-4 pt-5">How social media marketing drives business growth ?</h2>
                <p className="body2 mt-4 ">
                In today's digital world, social media is an essential platform for building brand awareness, engaging with your audience, and driving business growth. Our Social Media Marketing (SMM) services are designed to help you harness the power of social media, ensuring your business connects with the right people, increases brand loyalty, and converts followers into customers.
                </p>

              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="col-span-12 lg:col-span-4 flex justify-center lg:justify-end mt-5">
            <img src="images/services/smm/social-media-marketing-infographic.png" alt="SEO Service" className="w-full max-w-xs lg:max-w-sm" />
          </div>
        </div>
      </section>

      {/* Strategies Heading */}
      <div className="heading text-center pt-5">
        <h2 className="heading4 mt-10 text-center">Our SMM Strategies That Work</h2>
        <p className="body2 mt-5 text-blue seo-strategy-para">Social Media Marketing That Speaks, Engages, and Sells.             </p>
      </div>

      {/* SEO Strategies Section */}
      <section className="flex items-center justify-center min-h-screen px-5 lg:px-20 py-10 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 ">
          {/* Card 1 */}
          <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container ">
            <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg seo-icon-one">
              <img src="images/services/smm/customized-social-media-management-icon.png" alt="Keyword Research Icon" className="w-20 h-20" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-black mb-2">Customized Social Media Strategies</h2>
              <p className="text-gray-700">
              Every business is unique, which is why we develop personalized social media strategies tailored specifically to your goals, industry, and audience. Our process starts with an in-depth analysis of your brand and competitors.              </p>
            </div>
          </div>
          <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
            <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg seo-icon-one">
            <img src="images/services/smm/platform-management-icon.png" alt="Keyword Research Icon" className="w-20 h-20" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-black mb-2">Platform Management</h2>
              <p className="text-gray-700">
              Managing multiple social media accounts can be overwhelming and time-consuming, especially when trying to maintain a consistent presence across platforms. Our platform management service takes the burden off your shoulders by handling everything related to social media management.     
              </p>       </div>
          </div>

          <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
            <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg seo-icon-one">
            <img src="images/services/smm/paid-social-media-advertising-icon.png" alt="Keyword Research Icon" className="w-20 h-20" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-black mb-2">Paid Social Media Advertising</h2>
              <p className="text-gray-700">
              Paid social media advertising is a highly effective way to reach a wider audience and generate measurable results. Our expert team creates, manages, and optimizes ad campaigns on major platforms like Facebook, Instagram, LinkedIn, and Twitter to help you achieve specific business objectives.              </p>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
            <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg seo-icon-one">
            <img src="images/services/smm/content-creation-community-management-icon.png" alt="Keyword Research Icon" className="w-20 h-20" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-black mb-2">Content Creation and Community Management</h2>
              <p className="text-gray-700">
              In the noisy world of social media, standing out requires captivating content that resonates with your audience. Our content creation team specializes in crafting visually stunning and engaging posts that tell your brand’s story and capture attention.              </p>
            </div>
          </div>
        </div>
        
      </section>


     
      <h2 className="text-xl font-bold text-black mt-5 text-center heading4">Ridgeveda SMM Insight Development</h2>

      {isDesktop ?
      (
              <section className="influence-section-smm " >

              <div className="influence-step-smm influence-one-smm  ">
                  <div className="influence-sub-image-smm influence-sub-one-smm ">
                  <img src="images/services/smm/smmicon/developing.svg" alt="Discover Icon" />
                 
                  </div>
             
                  <h4 className="text-black">Strategy <br/> Development</h4>
                  <p>We begin with client discovery, gaining a clear understanding of the business, goals, target audience, and competitors. Next, we select the most suitable social platforms based on the client’s niche to maximize reach and engagement. </p>         
              </div>
  
     
              <div className="influence-step-smm influence-two-smm  even-smm">
              
  
              <div className="influence-sub-image-smm influence-sub-two-smm ">
              <img src="images/services/smm/smmicon/image26.svg" alt="Discover Icon" />
              
              </div>
                 <h4 className="text-black">Account Setup <br/> &  Optimization</h4>
                  <p>
                  We create or optimize profiles with consistent branding, including bio, profile picture, and contact details. We define content guidelines for voice, tone, and visual style. Lastly, we integrate tools for scheduling, analytics, and engagement.                             </p>
                  
              </div>
  
      
          <div className="influence-step-smm influence-three-smm   ">
             
              <div className="influence-sub-image-smm influence-sub-three-smm">
              <img src="images/services/smm/smmicon/calendar.svg" alt="Discover Icon" />
             
              </div>
              <h4 className="text-black">Content Creation <br/> & Scheduling</h4>
              <p>
              We create engaging content like images, videos, and captions tailored to each platform. Content drafts are shared with the client for approval before posting. Then, we use scheduling tools to plan and automate content publishing.                    </p>
             
          </div>
          <div className="influence-step-smm influence-four-smm  even-smm">
              
              <div className="influence-sub-image-smm influence-sub-four-smm">
              <img src="images/services/smm/smmicon/image27.svg" alt="Discover Icon" />
              
              </div>
              <h4 className="text-black">Community  <br/> Management</h4>
  
              <p>
              We monitor and respond to comments, messages, and mentions to build relationships. We manage both positive and negative feedback professionally to maintain a strong brand image. Additionally, we track relevant trends and hashtags to boost reach.                     </p>
             
          </div>
          <div className="influence-step-smm influence-five-smm ">
             
              <div className="influence-sub-image-smm influence-sub-five-smm">
              <img src="images/services/smm/smmicon/paid-ads.svg" alt="Discover Icon" />
             
              </div>
              <h4 className="text-black">Paid Social  <br/> Campaigns</h4>
  
              <p>
              We plan paid ad campaigns based on client goals, such as brand awareness or conversions. We create tailored ad creatives and copy for the target audience. Then, we monitor performance and optimize to improve ROI                 </p>
              
          </div>
          <div className="influence-step-smm influence-six-smm even-smm">
             
  
              <div className="influence-sub-image-smm influence-sub-six-smm">
              <img src="images/services/smm/smmicon/image10.svg" alt="Discover Icon" />
              
              </div>
              <h4 className="text-black">Reporting  <br/> Analysis</h4>
  
              <p>
              We track key metrics like reach, engagement, follower growth, and conversions. We provide insights on what’s working and suggest areas for improvement. Regular weekly or monthly reports are shared with clients to review progress.                   </p>
              
          </div>
         
          
        </section>
      )  : (<section  className="mt-5 pt-5">

        <Slider data={sliderData} />
  
        </section>
      ) }
    
    {/* {isMobile && ( 

      <section >

      <Slider data={sliderData} />

      </section>
    )} */}


    



      <h2 className="py-5 mt-5  heading4 text-center graph-margin" style={{marginTop:"80px"}}>Monthly Overview of Your Digital Growth with Expert Social Media Management Services</h2> 
      <p className="px-5 mt-1 ml-5 text-center"> Monitor your digital marketing success with our monthly performance graph, including the impact of our expert Social Media Management services. Get clear, data-driven insights on the growth and effectiveness of your campaigns, helping you see real-time results and the powerful boost social media strategies bring to your brand's online presence. </p>
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

      <section className="seo-subscribe-section text-black flex flex-wrap justify-center items-center" style={{marginTop:"-30px"}}>
      <div className="seo-subscribe-image">
        <img src="/images/services/smm/images/smm-social-media-icons.png" alt="Process Image" className="w-full h-full" />
      </div>

  <div className="seo-subscribe-content pt-1" >
    <h2 className="pt-1 seo-subscribe-content-heading">
    Build Your Future with an <span className="seo-text">SMM</span> Firm That Produces Results.
    </h2>
    <p className="pt-5 seo-subscribe-content-para">
    Grow Traffic, Elevate Sales And Enhance Conversions
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
          className="text-center seo-subscribe-button w-full bg-blue-500 text-white py-2 rounded pt-3"
        >                                                    
          Reserve Your Strategy Call
        </button>
      </form>
    </div>
  </div>
</section>

  <section className="seo-paragraph-content-section">
    <div className="seo-paragraph-content-container">
        <h2 className="heading4 mx-3 text-center">SMM Support You Can Trust From Ridgeveda</h2>
        <p className="seo-paragraph-content-intro mx-3">
            At <a href="https://ridgeveda.com/" className="collectintel-anchor-text text-blue mx-auto text-center">Ridgeveda</a>, we provide reliable social media management support to elevate your online presence. Our team delivers tailored strategies to ensure your brand engages effectively and grows across all platforms.        </p>

        {[
            " Data-Driven Strategies: Our decisions are backed by data and analytics, ensuring that every strategy we implement is designed to achieve measurable results.",
            " Creative Expertise: Our team of creative professionals knows how to create content that not only looks great but also resonates with your audience and drives engagement.",
            "Full-Service Approach: From strategy development and content creation to advertising and community management, we handle every aspect of your social media marketing to help you grow your business online.",
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
