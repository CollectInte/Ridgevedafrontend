const CounterTwo = () => {
  return (
    <section className="section-couter style-two lg:py-[100px] md:py-20 sm:py-14 py-12">
      <div className="container" >
        <div className="flex max-lg:flex-col gap-y-10 text-white">
          <div className="lg:w-6/12">
            <h3 className="heading3 text-white">Join us for a transformative journey!</h3>
            <div className="mt-4">At CollectIntel, we're here to amplify your growth. Our expert consultants drive innovation, enhance processes, and accelerate success. Let's shape your prosperous future together!</div>
          </div>
          <div className="lg:w-6/12">
            <div className="lg:pl-[55px]">
              <div className="flex flex-wrap gap-y-6">
                <div className="w-6/12">
                  <div className="counter-item border-l-2 border-blue sm:pl-5 pl-3">
                    <div className="heading3 text-white count-number">5</div>
                    <div className="body1 mt-1 text-white">Years experience</div>
                  </div>
                </div>
                <div className="w-6/12">
                  <div className="counter-item border-l-2 border-blue sm:pl-5 pl-3">
                    <div className="flex items-center">
                      <div className="heading3 text-white count-number">20</div>
                      <span className="heading3 text-white">+</span>
                    </div>
                    <div className="body1 mt-1 text-white">Clients</div>
                  </div>
                </div>
                <div className="w-6/12">
                  <div className="counter-item border-l-2 border-blue sm:pl-5 pl-3">
                    <div className="heading3 text-white count-number">50k+</div>
                    
                    <div className="body1 mt-1 text-white"> Customers acquired</div>
                  </div>
                </div>
                <div className="w-6/12">
                  <div className="counter-item border-l-2 border-blue sm:pl-5 pl-3">
                    <div className="heading3 text-white count-number">2</div>
                    <div className="body1 mt-1 text-white">Awards achievement</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default CounterTwo