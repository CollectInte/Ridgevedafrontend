'use client'
import LayoutOne from "@/components/Layout/LayoutOne";
import Link from "next/link";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import React, { useState,useEffect} from "react";
import '../../styles/text.css';
import '../../styles/smostyle.css';
import Head from 'next/head';
import { TextUnderline } from "@phosphor-icons/react";
import RealValueGraph from '../graph/page.js';
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
    const [isSubmitting, setIsSubmitting] = useState(false);
      const [showPopup, setShowPopup] = useState(false);
     const [showGetPopup, setShowGetPopup] = useState(false);
     const meta = seoMetadata.ppc;
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

    React.useEffect(() => {
           const timer = setTimeout(() => {
             setShowGetPopup(true); // Show popup after 10 seconds
           }, 10000); // 10000ms = 10s
       
           // Clean up the timer if the component unmounts before 10s
           return () => clearTimeout(timer);
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
        <div className="grid grid-cols-12 gap-8 mt-5">
          {/* Left Column */}
          <div className="col-span-12 lg:col-span-8 mt-5 pt-5">
            <div className="infor mt-5">
              <div className="heading mt-5">
                <h2 className="heading4 mt-5 mx-2">How  pay Per click Advertising services drive business growth ? </h2>
                <p className="body2 mt-4 mx-2">
                PPC advertising drives business growth by delivering immediate, targeted traffic to your website, increasing brand visibility and conversions. It offers cost-effective, measurable results with real-time performance tracking. By targeting high-intent audiences, PPC helps generate qualified leads and boost sales efficiently.                             </p>

              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="col-span-12 lg:col-span-4 flex justify-center lg:justify-end">
            <img src="images/services/ppc/images/pay_per_click.png" alt="SEO Service" className="w-full max-w-xs lg:max-w-sm" />
          </div>
        </div>
      </section>

      {/* Strategies Heading */}
      <div className="heading text-center ">
        <h2 className="heading4 mt-10 text-center mx-2">Our PPC  Strategies That Work</h2>
        <p className="body2 mt-4 text-blue seo-strategy-para mx-2">Strategic PPC to Accelerate Your Business Growth</p>
      </div>

      {/* SEO Strategies Section */}
      <section className="flex items-center justify-center min-h-screen px-5 lg:px-20 py-10 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 ">
          {/* Card 1 */}
          <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container ">
            <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg seo-icon-one">
            <img src="images/services/ppc/ppc-icons/advertise.png" alt="SEO Service" className="w-20 h-20" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-black mb-2">Google Ads & Social Media Ads</h2>
              <p className="text-gray-700">
              Our PPC experts specialize in creating and managing targeted ad campaigns across a variety of platforms, including Google Ads, Facebook, Instagram, LinkedIn, and more. Whether you’re looking to increase brand awareness, generate leads, or boost e-commerce sales, we craft tailored PPC strategies designed to achieve your business goals.
              </p>
            </div>
          </div>
          <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
            <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg seo-icon-one">
            <img src="images/services/ppc/ppc-icons/bid.png" alt="SEO Service" className="w-20 h-20" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-black mb-2">Keyword Research & Bid Management</h2>
              <p className="text-gray-700">
              The Success of a PPC campaign hinges on effective keyword research and smart bid management. At Ridgeveda, we conduct thorough keyword research to identify high-value, relevant keywords that attract the right audience while keeping your costs under control.              </p>
            </div>
          </div>

          <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
            <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg seo-icon-one">
            <img src="images/services/ppc/ppc-icons/underline-button.png" alt="Keyword Research Icon" className="w-20 h-20" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-black mb-2">Remarketing Campaigns</h2>
              <p className="text-gray-700">
              Remarketing is one of the most powerful tools in digital advertising, allowing you to re-engage users who have already interacted with your brand but haven’t yet converted. Our remarketing campaigns help you stay top-of-mind with your audience and increase your chances of converting lost leads into customers.
              </p>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
            <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg seo-icon-one">
            <img src="images/services/ppc/ppc-icons/optimization.png" alt="Keyword Research Icon" className="w-20 h-20" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-black mb-2">Performance Tracking & Optimization</h2>
              <p className="text-gray-700">
              Successful PPC advertising is all about continuous monitoring, testing, and optimization. We provide detailed performance tracking and data-driven insights to ensure that your campaigns are always delivering the best possible results.
              </p>
            </div>
          </div>
        </div>
        
      </section>


     
      {/* <h2 className="text-xl font-bold text-black mt-5 text-center">Collectintel SEO Insight Development</h2> */}

      {/* <section className="process-section">

            <div className="process-step process-one ">
                <div className="process-sub-image process-sub-one ">
                <img src="images/services/sub/discover.png" alt="Discover Icon" />
               
                </div>
           
         
                <p>
                We collaborate with your team to understand your business goals, conduct an initial site review, and identify KPIs. Through keyword research and conversion path analysis, we gain deep insights into your processes and objectives.
                </p>
               
            </div>

   
            <div className="process-step process-two">
            

            <div className="process-sub-image process-sub-two">
            <img src="images/services/sub/analyse.png" alt="Discover Icon" />
            
            </div>
                <p>
                We analyze business data through competitive benchmarking, site audits, and traffic patterns to assess your digital presence. This helps us identify key factors and craft the best SEO strategy based on analytics and competitor insights.
                </p>
                
            </div>

    
        <div className="process-step process-three">
           
            <div className="process-sub-image process-sub-three">
            <img src="images/services/sub/strategize.png" alt="Discover Icon" />
           
            </div>
            <p>
            We create a 60-day SEO plan outlining goals, outcomes, and timelines, prioritizing critical aspects for quick, targeted results. Our focus in the first month is to ensure immediate impact across key marketing channels.
            </p>
           
        </div>
        <div className="process-step process-four">
            
            <div className="process-sub-image process-sub-four">
            <img src="images/services/sub/execute.png" alt="Discover Icon" />
            
            </div>
            <p>
            We execute the SOMP by optimizing web pages, improving site structure, and managing business listings. We also boost SEO with multi-channel strategies, including social media campaigns and outreach to third-party websites.
            </p>
           
        </div>
        <div className="process-step process-five">
           
            <div className="process-sub-image process-sub-five">
            <img src="images/services/sub/measure.png" alt="Discover Icon"  width="200" height="200" />
           
            </div>
            <p>
            We set up tracking to monitor your SEO progress, analyzing analytics, keyword rankings, and KPIs. This helps us gain insights into traffic, bounce rates, conversions, and CTRs to refine and improve your SEO strategies.
            </p>
            
        </div>
        <div className="process-step process-six">
           

            <div className="process-sub-image process-sub-six">
            <img src="images/services/sub/report.png" alt="Discover Icon" />
            
            </div>
            <p>
            Our SEO team provides regular consultations and monthly reports, detailing site performance, KPI trends, and rankings. Each month, we create a new 90-day roadmap to keep you informed on campaign progress and expectations.
            </p>
            
        </div>
        <div className="process-step process-seven">
          

            <div className="process-sub-image process-sub-seven">
            <img src="images/services/sub/adjust.png" alt="Discover Icon" />
           
            </div>
            <p>
            We continuously adjust SEO strategies to keep up with algorithm updates and market trends, ensuring high search rankings. Our proactive approach keeps your website optimized and you informed on campaign progress.
            </p>
            
        </div>
        
      </section> */}
     
     
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

      <h2 className=" mt-5   heading4 text-center mx-2">Monthly Overview of Your Digital Growth with Expert PPC  Services</h2> 
      <p className="  text-center mx-2 mt-5 pt-5"> Monitor your PPC campaign performance with our monthly analysis graph. Get clear insights into clicks, conversions, and ROI to measure your advertising success. Use data-driven insights to refine your strategy and maximize results. </p>
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
      
      <h2 className=" mt-3 mx-2  text-center heading4">Ridgeveda PPC Advertising Insight Development</h2> 
      <p className=" mt-5 mx-2  text-center">The Pay-Per-Click (PPC) process starts with research and strategy development, identifying business goals, target audiences, and keywords. Competitor analysis and platform selection ensure effectiveness. Campaigns are then structured with engaging ads and strong CTAs. Optimized landing pages enhance user experience and conversions. After launch, performance is monitored through key metrics like CTR, CPC, and conversions, with A/B testing for improvements. Continuous optimization includes bid adjustments and targeting refinements.</p>
       
     
      <section className="ppm-arrow-section">
  <img
    src="/images/services/ppc/graph-ppc.png"
    alt="Process Image"
    className="ppm-arrow-img"
  />
</section>



      <section className="seo-subscribe-section text-black ml-5"> 
    <div className="cmm-subscribe-content pt-1">
    <h2 className="pt-1 seo-subscribe-content-heading">
      Build Your Future with an <span className="seo-text">PPC</span> Firm That Produces Results.
    </h2>
    <p className="pt-5 seo-subscribe-content-para">
    Increase Brand Recognition and Attract Targeted Leads
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
        <h2 className="text-center heading4 mx-3">PPC Support You Can Trust From Ridgeveda</h2>
        <p className="seo-paragraph-content-intro mx-3">
            At <a href="https://ridgeveda.com/" className="collectintel-anchor-text text-blue mx-auto text-center">Ridgeveda</a>, we understand that every click counts. Our PPC advertising services are designed to deliver measurable results, helping you reach your target audience, increase conversions, and achieve a high ROI. Here’s why businesses trust us with their PPC campaigns. </p>

        {[
            " Data-Driven Approach: We use advanced analytics and data-driven insights to inform every decision, ensuring that your PPC campaigns are optimized for maximum performance.",
            " Proven Results: With years of experience managing PPC campaigns across various industries, we have a proven track record of delivering high-quality traffic, leads, and sales for our clients.",
            " Customized Solutions: We don’t believe in one-size-fits-all strategies. Each PPC campaign we create is tailored to your business’s unique needs and goals, ensuring that your ads resonate with your target audience.",
            " Full Transparency: We provide detailed reports and performance metrics so you can see exactly how your PPC campaigns are performing. Our transparent approach gives you full control over your ad spend and results."
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
