import React, { useState } from "react";

const NewsLetter = () => {
    const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });
  const onchangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const response = await fetch("https://devliqly-backend.onrender.com/api/v1/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send message");

      setFormData({
        email: "",
      });
    } catch (error) {
      console.error("Error:", error.message);
      alert("Something went wrong. Please try again.");
    }
    setLoader(false);
};
  return (
    <div className="col-lg-3 col-md-6">
      <div className="ori-footer-widget">
        <div className="newslatter-widget ul-li-block">
          <h2 className="widget-title text-uppercase">Newsletter</h2>
          <div className="newslatter-form">
            <form onSubmit={submitHandler}>
              <input type="email" name="email" value={formData.email} onChange={onchangeHandler} placeholder="Enter your email address" required />
              <button type="submit" >
                {loader ? "Subscribing..." : "Subscribe"} <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
