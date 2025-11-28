    'use client'
    import LayoutOne from "@/components/Layout/LayoutOne";
    import Link from "next/link";
    import * as Icon from "@phosphor-icons/react/dist/ssr";
    import React, { useState,useEffect } from "react";
    import Head from 'next/head';
    import '../../styles/text.css';
    import '../../styles/smostyle.css';
    import '../../styles/influencestyle.css';

    import { TextUnderline } from "@phosphor-icons/react";
    import RealValueGraph from '../graph/page.js';
    
    import Slider from '../slider/page';
    import processSteps from "../../data/slidermobile/offline-marketing.json"; // Import JSON file
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
        const meta = seoMetadata.offlinemarketing;
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
    const handleUrlChange = (e) => {
      setUrlData((prevData) => ({
        ...prevData,
        url: e.target.value
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

    React.useEffect(() => {
           const timer = setTimeout(() => {
             setShowGetPopup(true); // Show popup after 10 seconds
           }, 10000); // 10000ms = 10s
       
           // Clean up the timer if the component unmounts before 10s
           return () => clearTimeout(timer);
         }, []);

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
          <section className="container mx-auto  px- lg:px-10 mt-2">
            <div className="grid grid-cols-12 gap-8">
              {/* Left Column */}
              <div className="col-span-12 lg:col-span-8 mt-5 pt-5">
                <div className="infor mt-5 pt-1">
                  <div className="heading mt-5">
                    <h2 className="heading4 mt-5">How Do You Grow Your Business with Offline Marketing </h2>
                    <p className="body2 mt-4">
                   While digital marketing grabs headlines, offline marketing still plays a powerful and often underrated role in building local presence, trust, and customer engagement. At Ridgeveda, we help businesses grow by crafting strategic, personalized offline campaigns that bring your brand directly to your audience—face-to-face, where real decisions happen.    </p>
    
                  </div>
                </div>
              </div>
              
              {/* Right Column */}
              <div className="col-span-12 lg:col-span-4 flex justify-center lg:justify-end">
                <img src="images/services/offline-marketing/offline-marketing.png" alt="SEO Service" className="w-full max-w-xs lg:max-w-sm" />
              </div>
            </div>
          </section>
    
          {/* Strategies Heading */}
          <div className="heading text-center ">
            <h2 className="heading4 mt-7 text-center">Ridgeveda Financial Services Strategies That Work</h2>
            <p className="body2 mt-6 text-blue seo-strategy-para text-center">Speak Locally, Rank Globally – Offline Marketing that Clicks!</p>
          </div>
    
          {/* SEO Strategies Section */}
          <section className="flex items-center justify-center min-h-screen px-5 lg:px-20 py-10 ">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 ">
              {/* Card 1 */}
              <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container ">
                <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg seo-icon-one">
                  <img src="images/services/offline-marketing/target-audience.png" alt="Keyword Research Icon" className="w-20 h-20" />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-bold text-black mb-2">Location-Based Targetingn</h2>
                  <p className="text-gray-700">
                 We carefully choose high-footfall and relevant venues such as corporate offices, gated communities, universities, retail areas, and public hotspots. This ensures your message reaches the right people, at the right time, in the right place.
                  </p>
                </div>
              </div>

              <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
                <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg seo-icon-one">
                <img src="images/services/offline-marketing/active.png" alt="Keyword Research Icon" className="w-20 h-20 mt-3" />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-bold text-black mb-2">Experiential Activations</h2>
                  <p className="text-gray-700">
                 People remember experiences, not just ads. Our on-ground activations include interactive stalls, demos, contests, games, and product sampling—creating a memorable brand experience that boosts awareness and trust.
                  </p>
                </div>
              </div>
    
              <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
                <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg seo-icon-one">
                <img src="images/services/offline-marketing/participation.png" alt="Keyword Research Icon" className="w-20 h-20 mt-5 pt-2" />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-bold text-black mb-2">Community Engagement Campaigns</h2>
                  <p className="text-gray-700">
                 We run tailored campaigns in gated communities and residential clusters to reach families and decision-makers directly. These permission-based promotions ensure quality engagement and higher ROI.
                  </p>
                </div>
              </div>
              
              {/* Card 2 */}
              <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
                <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg seo-icon-one">
                <img src="images/services/offline-marketing/control.png" alt="Keyword Research Icon" className="w-20 h-20 mt-5 pt-2" />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-bold text-black mb-2">Expense Control & Cash Flow Strategy</h2>
                  <p className="text-gray-700">
                  Our student-focused campaigns use ambassadors, events, and creative offline stunts to connect with the youth. It’s a great way to create long-term brand affinity with tomorrow’s consumers.
                  </p>
                </div>
              </div>
           


              <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
                <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg seo-icon-one">
                <img src="images/services/offline-marketing/point-of-sale.png" alt="Keyword Research Icon" className="w-20 h-20 mt-5 pt-4" />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-bold text-black mb-2">Retail & POS Visibility</h2>
                  <p className="text-gray-700">
                  From in-store branding to roadside kiosks, we make your brand visible where people shop and spend time. This boosts spontaneous interest and walk-ins—especially for FMCG, healthcare, and lifestyle brands.
                  </p>
                </div>
              </div>



              <div className="flex items-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container">
                <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg seo-icon-one">
                <img src="images/services/offline-marketing/roadshow.png" alt="Keyword Research Icon" className="w-20 h-20 mt-5 pt-3" />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-bold text-black mb-2">BTL Roadshows & Fleets</h2>
                  <p className="text-gray-700">
                 We mobilize your brand with mobile display vans, street teams, and branded vehicles that move across your target zones, creating buzz and broad awareness across neighborhoods and districts.
                  </p>
                </div>
              </div>

              
            
                 
              

             </div>
            

          </section>
    
                <section className="mt-0">  
                     <div className="flex items-center justify-center bg-white shadow-md rounded-lg p-5 w-full max-w-md combined-container " style={{margin:"10px auto"}}> 
                        <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg seo-icon-one">
                        <img src="images/services/offline-marketing/flyer.png" alt="Keyword Research Icon" className="w-20 h-20 mt-5 pt-2" />
                        </div>
                        <div className="ml-4">
                        <h2 className="text-xl font-bold text-black mb-2">Flyer & Pamphlet Distribution with a Purpose</h2>
                        <p className="text-gray-700">
                            Unlike generic distributions, we execute targeted flyer campaigns near educational institutions, office zones, or residential complexes with clear messaging and call-to-action that drives response.
                        </p>
                        </div>
                    </div>
                </section>
                 
         
          <h2 className="text-xl  text-black mt-5  text-center heading4">Ridgeveda Offline Marketing Insight Development</h2>
           {isDesktop ?
               (
                       <section className="influence-section-smm flex align-item justify-center" >
         
                       <div className="influence-step-smm influence-one-smm  ">
                           <div className="influence-sub-image-smm influence-sub-one-smm ">
                           <img src="images/services/offline-marketing/insight/pn.png" alt="Discover Icon" />
                          
                           </div>
                      
                           <h4 className="text-black"> Audience Profiling & <br/> Location Mapping</h4> 
                           <p >We analyze demographics, behavior patterns, and lifestyle data to identify where your ideal customers are most active—be it gated communities, corporates, or campuses. </p>         
                       </div>
           
              
                       <div className="influence-step-smm influence-two-smm  ">
                       
           
                       <div className="influence-sub-image-smm influence-sub-two-smm">
                       <img src="images/services/offline-marketing/insight/feedback-loop.png" alt="Discover Icon" />
                       
                       </div>
                          <h4 className="text-black">Campaign Testing  <br/> &  Feedback Loops</h4>
                           <p>
                          Pilot campaigns and real-time consumer feedback help refine messaging, visuals, and offers—ensuring your strategy is not just creative, but also effective.
                        </p>
                           
                       </div>
           
               
                   <div className="influence-step-smm influence-three-smm   ">
                      
                       <div className="influence-sub-image-smm influence-sub-three-smm">
                       <img src="images/services/offline-marketing/insight/competitor-analysis.png" alt="Discover Icon" />
                      
                       </div>
                       <h4 className="text-black">Industry <br/> & Competitor Research</h4>
                       <p>
                       Understanding your industry and studying offline moves of competitors helps us identify opportunity gaps and position your brand uniquely.                   </p>
                      
                   </div>
                   <div className="influence-step-smm influence-four-smm  ">
                       
                       <div className="influence-sub-image-smm influence-sub-four-smm">
                       <img src="images/services/offline-marketing/insight/cultural-sensitivity.png" alt="Discover Icon" />
                       
                       </div>
                       <h4 className="text-black">Regional  <br/> Cultural Relevance</h4>
           
                       <p>
                     We incorporate local customs, languages, and events into our strategies to make your offline campaigns feel familiar and relatable to the audience.                    </p>
                      
                   </div>
                   <div className="influence-step-smm influence-five-smm ">
                      
                       <div className="influence-sub-image-smm influence-sub-five-smm">
                       <img src="images/services/offline-marketing/insight/real-time-monitoring.png" alt="Discover Icon" />
                      
                       </div>
                       <h4 className="text-black">Real-World  <br/> Behavior Tracking</h4>
           
                       <p>
                      We gather insights from footfall data, peak timings, and engagement behavior at previous activations to choose the right time, place, and messaging for your campaign.               </p>
                       
                   </div>
                   <div className="influence-step-smm influence-six-smm ">
                      
           
                       <div className="influence-sub-image-smm influence-sub-six-smm">
                       <img src="images/services/offline-marketing/insight/pr.png" alt="Discover Icon" />
                       
                       </div>
                       <h4 className="text-black">Post-Campaign Analysis  for  Learning </h4>
           
                       <p>
                      After each activation, we provide detailed reports and performance insights—helping you understand what worked, what didn’t, and how to improve for the next round.
            </p>
                       
                   </div>
                  
                   
                 </section>
               )  : (<section >
         
                 <Slider data={sliderData} />
           
                 </section>
               ) }
          
         
          
    
      
    
          <section className="seo-subscribe-section text-black flex flex-wrap justify-center items-center mt-20 pt-20 graph-margin" style={{marginTop:"100px"}}>
          <div className=" offline-subscribe-image    ">
          <img src="images/services/offline-marketing/offline.png" alt="SEO Service" />
          </div>
    
      <div className="seo-subscribe-content pt-1 ">
        <h2 className="pt-1 seo-subscribe-content-heading">
          Grow Your Online Future, Starting from the Street
        </h2>
        <p className="pt-5 seo-subscribe-content-para text-center">
      Grow Traffic, Elevate Sales And Enhance Conversions  </p>
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
            <h2 className="heading4 text-center mx-2">Offline Marketing Support You Can Trust From Ridgeveda</h2>
            <p className="seo-paragraph-content-intro mx-3">
             When it comes to reaching your audience offline, trust matters. At <a href="https://ridgeveda.com/" className="collectintel-anchor-text text-blue mx-auto text-center">Ridgeveda</a>, we provide reliable, result-driven support every step of the way.      </p>
    
            {[
                " End-to-End Campaign Execution:From planning to permissions, staffing to reporting—we handle the entire process so you can focus on your business.",
                "   Experienced Field Teams: Our on-ground professionals are trained to represent your brand with professionalism, energy, and clarity.",
                " Transparent Reporting & Insights:Get real-time updates, photo documentation, and post-campaign analytics to track every rupee spent and result earned..",
                "Strong Vendor & Location Network: We’ve built trusted relationships across corporates, residential communities, universities, and public spaces to get your brand in the right places faster.",
                "Custom Strategies for Every Brand: Whether you’re a local startup or a national brand, we tailor offline marketing plans that align with your goals, budget, and audience.",
                "Quick Turnaround & Scalable Execution: Need a fast activation? No problem. Our agile support team can scale quickly without compromising quality."
                
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
    