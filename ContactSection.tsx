import React, { useState } from 'react';
import { Mail } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("https://formspree.io/f/xjkyprpo", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _subject: `New Contact Request: ${formData.subject}`,
          _replyto: formData.email
        })
      });

      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: 'Message sent successfully! We will contact you shortly.'
        });
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'Failed to send message. Please try again or contact us directly at rohan150907@gmail.com'
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
      <section id="contact" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 section-title">
              <span className="text-cyan-400">//</span> CONTACT US
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto"></div>
            <p className="text-gray-300 mt-6 max-w-2xl mx-auto">
              Ready to secure your digital assets? Get in touch with our team of cybersecurity experts.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-lg blur opacity-30"></div>
                <div className="relative bg-gray-900 p-8 rounded-lg border border-cyan-800/30 h-full">
                  <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>

                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="subject" className="block text-gray-300 mb-2">Subject</label>
                      <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                      >
                        <option value="">Select a subject</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Cybersecurity Consultation">Cybersecurity Consultation</option>
                        <option value="Penetration Testing">Penetration Testing</option>
                        <option value="AI Solutions">AI Solutions</option>
                        <option value="Partnership Opportunity">Partnership Opportunity</option>
                      </select>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
                      <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                      ></textarea>
                    </div>

                    {submitStatus && (
                        <div className={`mb-6 p-4 rounded-md ${
                            submitStatus.success
                                ? 'bg-green-900/20 text-green-400 border border-green-800/50'
                                : 'bg-red-900/20 text-red-400 border border-red-800/50'
                        }`}>
                          {submitStatus.message}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn-primary w-full flex items-center justify-center"
                        disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                      ) : (
                          'Send Message'
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div>
              <div className="relative h-full">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-lg blur opacity-30"></div>
                <div className="relative bg-gray-900 p-8 rounded-lg border border-cyan-800/30 h-full">
                  <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-cyan-400 font-bold mb-2">Headquarters</h4>
                      <p className="text-gray-300">Cyber Defense Tower</p>
                      <p className="text-gray-300">1337 Secure Street</p>
                      <p className="text-gray-300">Tech District, TX 75001</p>
                    </div>

                    <div>
                      <h4 className="text-cyan-400 font-bold mb-2">Contact</h4>
                      <p className="text-gray-300">contact@tacticalzero.com</p>
                      <p className="text-gray-300">+1 (555) 123-4567</p>
                    </div>

                    <div>
                      <h4 className="text-cyan-400 font-bold mb-2">Hours of Operation</h4>
                      <p className="text-gray-300">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-300">24/7 Emergency Response Available</p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="relative w-full h-64 rounded-lg overflow-hidden border border-cyan-800/30">
                      <div className="absolute inset-0 bg-cyan-900/20"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <Mail className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                          <p className="text-gray-300">Interactive map would be displayed here</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default ContactSection;