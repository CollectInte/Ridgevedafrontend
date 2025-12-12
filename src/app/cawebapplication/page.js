"use client";
import {
    FaUserTie,
    FaTasks,
    FaFileInvoice,
    FaBell,
    FaShieldAlt,
    FaUsers
} from "react-icons/fa";
import React, { useState } from 'react';

export default function CAConsultancyPage() {
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
        "/images/cli/service.jpg",
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
        <div>
            {/* Hero Section */}
            <section className="bg-primary text-white text-center py-5 px-3">
                <button
                    className="btn"
                    onClick={() => window.location.href = "/"}
                >
                    <u><i className="bi bi-arrow-left"></i> Home</u>
                </button>
                <h1 className="fw-bold display-5">
                    Web Application for CA, CS & Tax Consultants
                </h1>
                <p className="mt-3 mx-auto fs-5" style={{ maxWidth: "800px" }}>
                    Digitize your consultancy operations with a powerful, modern, and
                    professional web application tailored for financial, taxation, and
                    compliance experts.
                </p>
            </section>

            {/* Contact Form */}
            <section className="py-5 bg-white">
                <div className="container">
                    <div className="card shadow p-5 mx-auto" style={{ maxWidth: "600px" }}>
                        <h3 className="text-center fw-bold mb-4">
                            Request a Demo / Contact Us
                        </h3>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label fw-semibold">Name</label>
                                <input type="text" className="form-control" name="fullName" placeholder="Enter your name" value={form.fullName} onChange={handleChange} required />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-semibold">Email</label>
                                <input type="email" className="form-control" name="email" placeholder="Enter your email" value={form.email} onChange={handleChange} required />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-semibold">Mobile</label>
                                <input type="tel" className="form-control" name="mobile" placeholder="Enter mobile number" value={form.mobile} onChange={handleChange} required />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-semibold">Requirement</label>
                                <textarea className="form-control" rows="4" name="requirements" placeholder="Tell us your requirement" value={form.requirements} onChange={handleChange} required></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary w-100 py-2 fs-5">
                                Submit Request
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Feature Cards */}
            <section className="container py-5">
                <h2 className="text-center fw-semibold mb-5 fs-2">
                    A Smart & Professional Platform for Finance Firms
                </h2>

                <div className="row g-4">
                    {/* Card 1 */}
                    <div className="col-md-4">
                        <div className="card h-100 shadow-sm p-4 text-center">
                            <FaUserTie className="text-primary mb-3" size={40} />
                            <h5 className="fw-bold">Client & Employee Management</h5>
                            <p className="text-muted">
                                Manage clients, employees, tasks, documents, and workflow with full transparency.
                            </p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="col-md-4">
                        <div className="card h-100 shadow-sm p-4 text-center">
                            <FaTasks className="text-primary mb-3" size={40} />
                            <h5 className="fw-bold">Task Allocation System</h5>
                            <p className="text-muted">
                                Assign GST, ITR, Audit & Compliance tasks to employees easily.
                            </p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="col-md-4">
                        <div className="card h-100 shadow-sm p-4 text-center">
                            <FaFileInvoice className="text-primary mb-3" size={40} />
                            <h5 className="fw-bold">Billing & Invoice Management</h5>
                            <p className="text-muted">
                                Generate invoices, track payments, and maintain billing history.
                            </p>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="col-md-4">
                        <div className="card h-100 shadow-sm p-4 text-center">
                            <FaBell className="text-primary mb-3" size={40} />
                            <h5 className="fw-bold">Compliance Notifications</h5>
                            <p className="text-muted">
                                Send GST updates, deadlines, and other compliance alerts.
                            </p>
                        </div>
                    </div>

                    {/* Card 5 */}
                    <div className="col-md-4">
                        <div className="card h-100 shadow-sm p-4 text-center">
                            <FaShieldAlt className="text-primary mb-3" size={40} />
                            <h5 className="fw-bold">Secure Document Storage</h5>
                            <p className="text-muted">
                                Upload and store documents safely with restricted access.
                            </p>
                        </div>
                    </div>

                    {/* Card 6 */}
                    <div className="col-md-4">
                        <div className="card h-100 shadow-sm p-4 text-center">
                            <FaUsers className="text-primary mb-3" size={40} />
                            <h5 className="fw-bold">Dedicated Client Dashboard</h5>
                            <p className="text-muted">
                                Clients can upload files, track progress & make payments.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* web Application Images */}

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

            {/* Everything You Need Section */}
            <section className="py-5" style={{
                background: "linear-gradient(135deg, #f8f9fa 0%, #eef2f7 100%)"
            }}>
                <div className="container">

                    <h2 className="text-center fw-bold mb-5 display-6">
                        Everything You Need to Run a Successful Consultancy
                    </h2>

                    <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5">
                        <div className="card-body">

                            <ol className="list-unstyled fs-5">
                                <li className="mb-3 d-flex align-items-start">
                                    <i className="bi bi-speedometer2 text-primary fs-4 me-3"></i>
                                    <span>Admin Dashboard with complete controls</span>
                                </li>

                                <li className="mb-3 d-flex align-items-start">
                                    <i className="bi bi-people-fill text-success fs-4 me-3"></i>
                                    <span>Employee performance tracking & workflow automation</span>
                                </li>

                                <li className="mb-3 d-flex align-items-start">
                                    <i className="bi bi-calendar-check text-danger fs-4 me-3"></i>
                                    <span>Appointment booking & management</span>
                                </li>

                                <li className="mb-3 d-flex align-items-start">
                                    <i className="bi bi-list-check text-warning fs-4 me-3"></i>
                                    <span>Task tracking with real-time status updates</span>
                                </li>

                                <li className="mb-3 d-flex align-items-start">
                                    <i className="bi bi-calculator text-info fs-4 me-3"></i>
                                    <span>Integrated financial calculators</span>
                                </li>

                                <li className="mb-2 d-flex align-items-start">
                                    <i className="bi bi-receipt-cutoff text-primary fs-4 me-3"></i>
                                    <span>Service history, invoices, notifications & more</span>
                                </li>
                            </ol>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
