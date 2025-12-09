"use client";
import { useState } from "react";

export default function RidgevedaSolutionsPage() {

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        mobile: "",
        requirements: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_SCRIPT_SERVICES_POPUP_ADD, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const result = await response.json();
            if (response.ok) {
                alert("Form submitted successfully!");
                setForm({ fullName: "", email: "", mobile: "", requirements: "" });
            } else {
                alert(result.error || "Submission failed!");
            }
        } catch (err) {
            console.error("Error submitting form:", err);
            alert("An error occurred while submitting the form.");
        }
    };

    return (
        <main style={{ background: "#f4f7fb" }}>

            {/* HERO */}
            <section
                className="py-5 text-white"
                style={{
                    background: "linear-gradient(135deg, #0d6efd, #0a58ca)",
                }}
            >
                <div className="container text-center py-4">
                    <button
                        className="btn"
                        onClick={() => window.location.href = "/"}
                    >
                        <u><i className="bi bi-arrow-left"></i> Home</u>
                    </button>
                    <h1 className="fw-bold display-4">Ridgeveda – Solutions That Drive Success</h1>
                    <p className="fs-5 mt-3">
                        Empowering businesses with technology, marketing, sales, and customer acquisition solutions.
                    </p>
                </div>
            </section>

            {/* FORM */}
            <section className="py-5" style={{ background: "#eef2f7" }}>
                <div className="container">
                    <p className="text-center fs-5 mb-4">
                        Share your details — our team will reach out shortly.
                    </p>

                    <div className="card shadow-lg border-0 p-4 rounded-4">
                        <form className="row g-4" onSubmit={handleSubmit}>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Name</label>
                                <input name="fullName" type="text" className="form-control form-control-lg"
                                    placeholder="Enter your name" value={form.fullName} onChange={handleChange} />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Email</label>
                                <input name="email" type="email" className="form-control form-control-lg"
                                    placeholder="Enter your email" value={form.email} onChange={handleChange} />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Mobile</label>
                                <input name="mobile" type="text" className="form-control form-control-lg"
                                    placeholder="Enter mobile number" value={form.mobile} onChange={handleChange} />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Requirement</label>
                                <input name="requirements" type="text" className="form-control form-control-lg"
                                    placeholder="What are you looking for?" value={form.requirements} onChange={handleChange} />
                            </div>

                            <div className="col-12 text-center">
                                <button className="btn btn-primary btn-lg px-5 rounded-4">
                                    Submit Details
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* SECTION 1 */}
            <section className="py-5">
                <div className="container">
                    <h2 className="fw-bold text-center mb-4 display-6">
                        Digital & Tech Services
                    </h2>
                    <div className="card shadow border-0 p-4 rounded-4">
                        <p className="fs-5 mb-3">
                            <i className="bi bi-code-slash text-primary fs-4 me-2"></i>
                            We design secure, responsive, scalable applications built for performance and reliability.
                        </p>
                        <p className="fs-5 mb-3">
                            <i className="bi bi-phone text-success fs-4 me-2"></i>
                            Web & mobile apps, SaaS platforms, cloud enablement, AI solutions & UI/UX design.
                        </p>
                        <p className="fs-5 mb-0">
                            <i className="bi bi-shield-check text-info fs-4 me-2"></i>
                            Cybersecurity, DevOps, and full end-to-end maintenance for long-term success.
                        </p>
                    </div>
                </div>
            </section>

            {/* SECTION 2 */}
            <section className="py-4">
                <div className="container">
                    <h2 className="fw-bold text-center mb-4 display-6">
                        Digital Marketing & Brand Growth
                    </h2>
                    <div className="card shadow border-0 p-4 rounded-4">
                        <p className="fs-5 mb-3">
                            <i className="bi bi-bar-chart text-danger fs-4 me-2"></i>
                            Full-service marketing: SEO, content, social media, PPC ads, and branding.
                        </p>
                        <p className="fs-5 mb-0">
                            <i className="bi bi-megaphone text-primary fs-4 me-2"></i>
                            Performance-driven strategies designed to increase visibility & conversions.
                        </p>
                    </div>
                </div>
            </section>

            {/* SECTION 3 */}
            <section className="py-4">
                <div className="container">
                    <h2 className="fw-bold text-center mb-4 display-6">
                        Strategic Sales Solutions
                    </h2>
                    <div className="card shadow border-0 p-4 rounded-4">
                        <p className="fs-5 mb-3">
                            <i className="bi bi-graph-up-arrow text-success fs-4 me-2"></i>
                            Lead generation, sales partnerships, field sales, and appointment-driven conversions.
                        </p>
                        <p className="fs-5 mb-0">
                            <i className="bi bi-kanban text-warning fs-4 me-2"></i>
                            Industry-focused strategies combined with CRM tracking for measurable outcomes.
                        </p>
                    </div>
                </div>
            </section>

            {/* SECTION 4 */}
            <section className="py-4">
                <div className="container">
                    <h2 className="fw-bold text-center mb-4 display-6">
                        Content Creation & Production
                    </h2>
                    <div className="card shadow border-0 p-4 rounded-4">
                        <p className="fs-5 mb-3">
                            <i className="bi bi-camera-reels text-primary fs-4 me-2"></i>
                            Promotional videos, scripts, ad films, editing, and brand storytelling.
                        </p>
                        <p className="fs-5 mb-0">
                            <i className="bi bi-palette text-danger fs-4 me-2"></i>
                            Creative content that builds trust and engages customers emotionally.
                        </p>
                    </div>
                </div>
            </section>

            {/* SECTION 5 */}
            <section className="py-4 pb-5">
                <div className="container">
                    <h2 className="fw-bold text-center mb-4 display-6">
                        Telecalling Outsourcing
                    </h2>
                    <div className="card shadow border-0 p-4 rounded-4">
                        <p className="fs-5 mb-3">
                            <i className="bi bi-telephone text-success fs-4 me-2"></i>
                            Lead qualification, customer support, sales calling, and enquiry follow-ups.
                        </p>
                        <p className="fs-5 mb-0">
                            <i className="bi bi-people text-primary fs-4 me-2"></i>
                            Multilingual trained telecallers + CRM tracking for higher conversions.
                        </p>
                    </div>
                </div>
            </section>

        </main>
    );
}
