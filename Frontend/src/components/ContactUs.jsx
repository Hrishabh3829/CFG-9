import React, { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 bg-black text-yellow-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Connect With CRY</h2>
          <p className="text-xl text-yellow-200 max-w-2xl mx-auto">
            Whether you have a question, want to volunteer, or are ready to support our cause—we're here for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8 text-yellow-100">
            <div className="flex items-center space-x-4">
              <div className="bg-yellow-400 p-3 rounded-full">
                <Phone className="text-black" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Phone</h3>
                <p>+91 (800) 123-4567</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-yellow-400 p-3 rounded-full">
                <Mail className="text-black" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Email</h3>
                <p>support@cry.org</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-yellow-400 p-3 rounded-full">
                <MapPin className="text-black" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Address</h3>
                <p>CRY Foundation, Mumbai<br />India – 400001</p>
              </div>
            </div>

            {/* Donation Block */}
            <div className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Want to make a difference?</h3>
              <button className="bg-yellow-400 text-black px-6 py-3 rounded-full font-bold hover:bg-yellow-300 transition transform hover:scale-105">
                Donate to CRY
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-yellow-50 text-black p-8 rounded-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Your message"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-400 text-black py-3 px-6 rounded-lg font-bold hover:bg-yellow-300 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;