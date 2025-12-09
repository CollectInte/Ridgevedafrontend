"use client";
import React, { useState } from "react";

export default function HospitalsPage() {
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        mobile: '',
        requirements: '',
    });
    const [selectedImage, setSelectedImage] = useState("");
    
        const images = [
            "/images/cli/nightversion.jpg",
            "/images/cli/Dashboardhome.jpg",
            "/images/cli/Attendance.jpg",
            "/images/cli/addappointement.jpg",
            "/images/cli/documents.jpg",
        ];

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(process.env.NEXT_PUBLIC_SCRIPT_SERVICES_POPUP_ADD, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            const result = await response.json();

            if (response.ok) {
                alert('Form submitted successfully!');
                onClose(); // Close popup after successful submission
            } else {
                alert(result.error || 'Submission failed!');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            alert('An error occurred while submitting the form.');
        }
    };
    return (
        <main style={{ background: "#f4f7fb" }}>

            {/* HERO SECTION */}
            <section
                className="py-5"
                style={{
                    background: "linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%)",
                    color: "white"
                }}
            >
                <div className="container text-center py-5">
                    <button
                        className="btn"
                        onClick={() => window.location.href = "/"}
                    >
                        <u><i className="bi bi-arrow-left"></i> Home</u>
                    </button>
                    <h1 className="fw-bold display-4">Digital Solutions for Hospitals & Wellness Centres</h1>
                    <p className="mt-3 fs-5">
                        Build a modern, medical-grade digital presence with Ridgeveda — fast, responsive, secure, and powerful.
                    </p>
                </div>
            </section>

            {/* FORM SECTION */}
            <section className="py-5" style={{ background: "#eef2f7" }}>
                <div className="container">
                    <p className="text-center mb-4 fs-5">
                        Share your details and requirements — our team will contact you shortly.
                    </p>

                    <div className="card shadow-lg border-0 rounded-4 p-4 p-md-5">
                        <div className="card-body">

                            <form className="row g-4" onSubmit={handleSubmit}>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Name</label>
                                    <input type="text" className="form-control form-control-lg rounded-3" name="fullName" placeholder="Enter your name" value={form.fullName} onChange={handleChange} />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Email</label>
                                    <input type="email" className="form-control form-control-lg rounded-3" name="email" placeholder="Enter your email" value={form.email} onChange={handleChange} />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Mobile</label>
                                    <input type="text" className="form-control form-control-lg rounded-3" name="mobile" placeholder="Enter mobile number" value={form.mobile} onChange={handleChange} />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Requirement</label>
                                    <input type="text" className="form-control form-control-lg rounded-3" name="requirements" placeholder="What are you looking for?" value={form.requirements} onChange={handleChange} />
                                </div>

                                <div className="col-12 text-center mt-3">
                                    <button className="btn btn-primary btn-lg px-5 rounded-4">
                                        Submit Details
                                    </button>
                                </div>

                            </form>

                        </div>
                    </div>

                </div>
            </section>

            {/* Web Application Designs */}

             <div className="container-fluid">
                <div className="row p-3">
                    <div className="col-12 text-center p-2">
                        <h1 className="fs-2"><u>Our Designs</u></h1>
                    </div>

                    {images.map((img, index) => (
                        <div
                            key={index}
                            className="col-12 col-sm-6 col-md-4 p-2"
                        >
                            <img
                                src={img}
                                className="img-fluid"
                                style={{ cursor: "pointer", borderRadius: "10px" }}
                                data-bs-toggle="modal"
                                data-bs-target="#imageModal"
                                onClick={() => setSelectedImage(img)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            <div
                className="modal fade"
                id="imageModal"
                tabIndex="-1"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content bg-dark">
                        <div className="modal-body p-0">
                            {selectedImage && (
                                <img
                                    src={selectedImage}
                                    className="img-fluid w-100"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTENT SECTION 1 */}
            <section className="py-5">
                <div className="container">

                    <h2 className="text-center fw-bold mb-4 display-6">
                        Complete Digital Solutions for Healthcare
                    </h2>

                    <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5 mb-5">
                        <div className="card-body fs-5">

                            <p className="mb-3">
                                <i className="bi bi-hospital text-primary me-2 fs-4"></i>
                                Ridgeveda provides comprehensive digital solutions tailored for hospitals, clinics, and wellness centres.
                                We create clean, mobile-friendly, SEO-optimized websites designed to build trust and help patients make informed decisions.
                            </p>

                            <p className="mb-3">
                                <i className="bi bi-layers text-success me-2 fs-4"></i>
                                Your healthcare services are organized into structured pages, including doctor profiles, departments,
                                treatments, and specialties — ensuring a professional digital experience for your patients.
                            </p>

                        </div>
                    </div>

                </div>
            </section>

            {/* CONTENT SECTION 2 */}
            <section className="py-3">
                <div className="container">

                    <h2 className="text-center fw-bold mb-4 display-6">
                        Smart Admin Control & Patient-Friendly Features
                    </h2>

                    <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5 mb-5">
                        <div className="card-body fs-5">

                            <p className="mb-3">
                                <i className="bi bi-speedometer2 text-info me-2 fs-4"></i>
                                Manage doctor details, treatment pages, medical blogs, announcements, reviews, and gallery —
                                all from an easy and user-friendly admin dashboard.
                            </p>

                            <p className="mb-3">
                                <i className="bi bi-calendar-check text-primary me-2 fs-4"></i>
                                Patients can book appointments through forms, WhatsApp, or call, while every inquiry is securely
                                stored and instantly notified to the admin.
                            </p>

                            <p className="mb-2">
                                <i className="bi bi-chat-square-quote text-success me-2 fs-4"></i>
                                Publish blogs, awareness articles, testimonials, and before/after results to build trust and improve engagement.
                            </p>

                        </div>
                    </div>

                </div>
            </section>

            {/* CONTENT SECTION 3 */}
            <section className="py-3">
                <div className="container">

                    <h2 className="text-center fw-bold mb-4 display-6">
                        Marketing Support for Patient Growth
                    </h2>

                    <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5 mb-5">
                        <div className="card-body fs-5">

                            <p className="mb-3">
                                <i className="bi bi-megaphone text-danger me-2 fs-4"></i>
                                Ridgeveda helps your healthcare business grow with digital marketing services —
                                telecalling, WhatsApp outreach, SMS campaigns, email marketing, and service announcements.
                            </p>

                            <p className="mb-3">
                                <i className="bi bi-graph-up-arrow text-warning me-2 fs-4"></i>
                                Our solutions improve conversion rates, increase patient footfall, and strengthen long-term brand visibility.
                            </p>

                            <p className="mb-0">
                                <i className="bi bi-building text-primary me-2 fs-4"></i>
                                Whether you're a clinic or a multi-specialty hospital — we help you digitalize, automate, and scale effortlessly.
                            </p>

                        </div>
                    </div>

                </div>
            </section>

        </main>
    );
}
