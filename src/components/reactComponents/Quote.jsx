import React, { useState } from "react";

const Quote = () => {
    const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const onchangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    

    try {
      setLoader(true);
      const response = await fetch("http://localhost:8000/api/v1/quote", {
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
        message: "",
      });
    } catch (error) {
      console.error("Error:", error.message);
    //   alert("Something went wrong. Please try again.");
    } 
    setLoader(false);
  };
  return (
    <div className="ori-service-details-widget ul-li-block">
      <div className="quote-widget">
        <h3 className="widget-title">Get A Quote</h3>
        <form onSubmit={submitHandler}>
          <input type="text" name="name" value={formData.name} onChange={onchangeHandler} placeholder="Enter Your First Name" />
          <input type="email" name="email" value={formData.email} onChange={onchangeHandler} placeholder="Enter Your Email" />
          <textarea name="message" value={formData.message} onChange={onchangeHandler} placeholder="Enter Your Comment"></textarea>
          <button className="ori-submit-btn1 text-uppercase" type="submit">
            {loader ? "Submitting..." : "submit now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Quote;
