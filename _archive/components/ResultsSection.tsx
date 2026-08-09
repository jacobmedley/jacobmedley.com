// Ports the inline "Designing for Results" banner from _archive/index.html
// (lines 116-170), not components/section-results.html — that partial is
// unused on the legacy homepage.
export default function ResultsSection() {
  return (
    <section className="bg-prime-light">
      <div className="content">
        <div className="container pb-5">
          <div className="row text-center">
            <div className="col-24 mt-5">
              <h3 className="display-3 font-bold text-prime-dark">Designing for Results</h3>
              <hr className="solid-center my-5 w-1/2 m-auto" />
            </div>

            <div className="col-24 self-center text-prime-dark">
              <div className="row row-cols-2 row-cols-lg-4 text-center justify-center g-3">
                <div className="col">
                  <h4 className="result mb-0 display-4 fw-bolder">
                    47%
                    <small>
                      <i
                        className="display-2 text-prime-dark fa-regular fa-long-arrow-up"
                        aria-hidden="true"
                      />
                    </small>
                  </h4>
                  <p className="light result-label mt-0">New Sales</p>
                </div>

                <div className="col">
                  <h4 className="result mb-0 display-4 fw-bolder">
                    20%
                    <small>
                      <i
                        className="display-2 text-prime-dark fa-regular fa-long-arrow-up"
                        aria-hidden="true"
                      />
                    </small>
                  </h4>
                  <p className="light result-label mt-0">
                    <span className="hidden lg:inline">Company</span> Revenue
                  </p>
                </div>

                <div className="col">
                  <h4 className="result mb-0 display-4 fw-bolder">
                    27%
                    <small>
                      <i
                        className="display-2 text-prime-dark fa-regular fa-long-arrow-up"
                        aria-hidden="true"
                      />
                    </small>
                  </h4>
                  <p className="light result-label mt-0">
                    Lead Gen<span className="hidden lg:inline">eration</span>
                  </p>
                </div>

                <div className="col">
                  <h4 className="result mb-0 display-4 fw-bolder">
                    66%
                    <small>
                      <i
                        className="display-2 text-prime-dark fa-regular fa-long-arrow-down"
                        aria-hidden="true"
                      />
                    </small>
                  </h4>
                  <p className="light result-label mt-0">Reduction Project Timelines</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
