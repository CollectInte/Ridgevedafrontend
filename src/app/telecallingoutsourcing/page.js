"use client";
import React, { useState } from "react";

export default function TelecallingPage() {
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
        // Replace URL with your backend endpoint
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

            {/* Hero */}
            <section
                className="py-5 text-white text-center"
                style={{
                    background: "linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%)",
                }}
            >
                <div className="container py-5">
                    <button
                        className="btn"
                        onClick={() => window.location.href = "/"}
                    >
                        <u><i className="bi bi-arrow-left"></i> Home</u>
                    </button>
                    <h1 className="display-4 fw-bold">
                        Telecalling Outsourcing Services
                    </h1>
                    <p className="mt-3 fs-5">
                        Scale your business without building an in-house calling team.
                        Ridgeveda provides trained telecallers who manage lead generation,
                        customer follow-ups, service calls, admissions & sales conversations
                        on your behalf.
                    </p>
                </div>
            </section>

            {/* Contact / Inquiry Form */}
            <section className="py-5">
                <div className="container">
                    <p className="text-center mb-4 fs-5">
                        Share your details and requirements — we will contact you soon.
                    </p>

                    <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5">
                        <div className="card-body">
                            <form className="row g-4" onSubmit={handleSubmit}>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        className="form-control form-control-lg rounded-3"
                                        placeholder="Enter your name"
                                        value={form.fullName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control form-control-lg rounded-3"
                                        placeholder="Enter your email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Mobile</label>
                                    <input
                                        type="text"
                                        name="mobile"
                                        className="form-control form-control-lg rounded-3"
                                        placeholder="Enter mobile number"
                                        value={form.mobile}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Requirement / Message</label>
                                    <input
                                        type="text"
                                        name="requirements"
                                        className="form-control form-control-lg rounded-3"
                                        placeholder="Tell us your requirement"
                                        value={form.requirements}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-12 text-center mt-3">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg px-5 rounded-4"
                                    >
                                        Submit
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>

                </div>
            </section>

            {/* What We Do */}
            <section className="py-5">
                <div className="container">
                    <h2 className="fw-bold mb-4 display-6 text-center">
                        What We Do
                    </h2>
                    <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5 mb-5">
                        <div className="card-body fs-5">
                            <p className="mb-3">
                                <i className="bi bi-telephone-forward text-primary me-2 fs-4"></i>
                                Our outsourced calling team handles lead nurturing, prospect
                                qualification, appointment bookings, enquiry support and
                                re-engagement for better conversions.
                            </p>
                            <p className="mb-3">
                                <i className="bi bi-arrow-repeat text-success me-2 fs-4"></i>
                                We work with CRM-based tracking, manage both inbound and
                                outbound calls, and support multilingual communication to match
                                your target audience.
                            </p>
                            <p className="mb-2">
                                <i className="bi bi-people-fill text-info me-2 fs-4"></i>
                                We also assist with sales, admission calling, application
                                follow-ups, and continuous customer support to maintain steady
                                business flow.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-5 bg-light">
                <div className="container">
                    <h2 className="fw-bold mb-4 display-6 text-center">
                        Why Brands Choose Ridgeveda
                    </h2>
                    <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5 mb-5">
                        <div className="card-body fs-5">
                            <p className="mb-3">
                                <i className="bi bi-check-circle text-success me-2 fs-4"></i>
                                Get a trained telecalling workforce without hiring, infrastructure
                                or management costs.
                            </p>
                            <p className="mb-3">
                                <i className="bi bi-briefcase text-primary me-2 fs-4"></i>
                                Focus on your core business — we handle calling, follow-ups,
                                complaint resolution, and customer engagement.
                            </p>
                            <p className="mb-2">
                                <i className="bi bi-bar-chart-line text-warning me-2 fs-4"></i>
                                Receive performance analytics, transparent reporting and
                                optimization to drive real conversions, not just calls.
                            </p>
                            <p className="mb-2">
                                <i className="bi bi-graph-up text-info me-2 fs-4"></i>
                                Ideal for businesses wanting faster results, scalability, and
                                higher productivity without overheads.
                            </p>
                        </div>
                    </div>
                </div>
            </section>



        </main>
    );
}
