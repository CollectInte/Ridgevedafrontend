import HeadingSubpage from "@/components/HeadingSubpage/HeadingSubpage";

const CounterAbout = () => {
  return (
    <section className="section-couter">
      <div className="container">
        
        <div className="main lg:py-0 sm:py-14 py-10 ">

          <HeadingSubpage classname={'lg:pt-1 0 sm:pt-14 pt-10 lg:pb-[60px] sm:pb-12 pb-8'} title={'about us'} desc={'Discover our story, our mission, and our passion for creativity and innovation.'} />
          <div className="flex max-md:flex-col gap-y-6 ">
            
            <div className="md:w-1/2 pr-[45px] ">
              <h4 className="heading4">Our mission</h4>
              {/* <div className="body2 mt-3">Our mission at Ridgeveda is to empower businesses by providing innovative, data-driven customer acquisition solutions that seamlessly integrate both offline and online channels. We aim to help our clients connect with the right audience, build lasting relationships, and achieve sustainable growth. By delivering personalized strategies and measurable results, we are committed to driving success and unlocking new opportunities for our clients in today’s dynamic market.
              </div> */}
              <div className="body2 mt-3">Our mission at Ridgeveda is to empower businesses by providing innovative, data-driven customer acquisition solutions that seamlessly integrate both offline and online channels. We aim to help our clients connect with the right audience, build lasting relationships, and achieve sustainable growth. By delivering personalized strategies and measurable results, we are committed to driving success and unlocking new opportunities for our clients in today’s dynamic market.
              </div>
              <div className="body2 mt-3"></div>
            </div>
            <div className="md:w-1/2 md:pl-[45px]">
              <h4 className="heading4">Our Vision</h4>
              {/* <div className="body2 mt-3">In 2018, Ridgeveda was founded to transform how businesses connect with customers. Our mission is to bridge offline and online acquisition channels through innovative, data-driven solutions that deliver real results. With years of experience, our team has helped numerous clients attract and retain loyal customers through strategic, personalized approaches that engage the right audience.</div>
              <div className="body2 mt-3">We prioritize building strong customer relationships and are dedicated to helping your business grow in today’s competitive market. Trust Ridgeveda to bring in new customers and drive positive results for your business.</div>
               */}
               <div className="body2 mt-3">At Ridgeveda, our vision is to be a global leader in technology-driven business growth solutions, transforming the way companies acquire, engage, and retain customers. We aspire to create a future where AI, cloud, and digital innovation empower organizations of every size to scale smarter, connect seamlessly across channels, and achieve sustainable success. By continuously evolving with technology and market trends, we aim to be the trusted partner that helps businesses unlock new possibilities and thrive in the digital-first world.</div>
              
            </div>
          </div>
         <br/>
         <br/>
          </div>
        </div>
    </section>
  )
}
export default CounterAbout