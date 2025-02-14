import React, { useState } from "react";

const ContactForm = () => {
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const onchangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    

    try {
      setLoader(true);
      const response = await fetch("https://devliqly-backend.onrender.com/api/v1/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send message");

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error:", error.message);
      alert("Something went wrong. Please try again.");
    } 
    setLoader(false);
  };

  return (
    <div className="col-lg-6">
      <div className="ori-contact-form-wrap">
        <form onSubmit={submitHandler}>
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            placeholder="John Doe"
            onChange={onchangeHandler}
            required
          />

          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={onchangeHandler}
            placeholder="devliqly@example.com"
            required
          />

          <label htmlFor="phone">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={onchangeHandler}
            placeholder="(629) 555-0129"
            required
          />

          <label htmlFor="subject">Subject *</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={onchangeHandler}
            placeholder="Web Development"
            required
          />

          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={onchangeHandler}
            placeholder="Write your message here..."
            required
          ></textarea>

          <button type="submit" disabled={loader}>
            {loader ? "Submitting..." : "Submit Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
