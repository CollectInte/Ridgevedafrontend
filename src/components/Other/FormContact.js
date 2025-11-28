'use client'

import { useForm } from "react-hook-form";

import ContactInfoItem from "../Pages/Contact/ContactInfoItem";
import contactData from "@/data/pages/contact.json";

const FormContact = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = (data) => console.log(data);

    return (
        <div className="contact">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <h3 className="contact-title">Contact info</h3>
                        {contactData &&
                            contactData.map((item, index) => (
                                <ContactInfoItem
                                    key={index}
                                    iconClass={item.iconClass}
                                    title={item.title}
                                    detail={item.detail}
                                />
                            ))}
                    </div>
                    <div className="col-12 col-md-6">
                        <h3 className="contact-title">Get in touch</h3>
                        <div className="contact-form">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="input-validator">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        {...register('name', { required: true })}
                                    />
                                </div>
                                <div className="input-validator">
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder="Email"
                                        {...register('email', { required: true })}
                                    />
                                </div>
                                <div className="input-validator">
                                    <textarea
                                        name="message"
                                        id=""
                                        cols="30"
                                        rows="3"
                                        placeholder="Message"
                                    />
                                </div>
                                <button className="btn -dark">SEND MESSAGE</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-12">
                        <iframe
                            className="contact-map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26544.761428132653!2d105.83081260286463!3d21.01523825635793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9bd9861ca1%3A0xe7887f7b72ca17a9!2zSMOgIE7hu5lpLCBIb8OgbiBLaeG6v20sIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1594639675485!5m2!1svi!2s"
                            width="100%"
                            height="450"
                            frameBorder="0"
                            allowFullScreen
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FormContact