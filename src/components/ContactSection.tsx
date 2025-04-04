
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useForm, ValidationError } from '@formspree/react';

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  
  // Replace 'YOUR_FORM_ID' with your actual Formspree form ID
  const [state, handleSubmit] = useForm("mvgkwwnn");
  const isSubmitting = state.submitting;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Call the Formspree handler
await handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    
    // If submission was successful, clear the form
    if (state.succeeded) {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({
        name: '',
        email: '',
        company: '',
        message: '',
      });
    } else if (state.errors && Object.keys(state.errors).length > 0) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-theme-blue/20 to-transparent"></div>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Contact</span> Us
          </h2>
          <p className="text-theme-light/70">
            Ready to transform your business with AI automation? Get in touch with our team to discuss how we can help.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="p-8">
              <h3 className="text-2xl font-semibold mb-6">Get In Touch</h3>
              
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-theme-light/70">Name</label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="bg-white/5 border-white/10 focus:border-theme-blue/50 text-theme-light"
                    />
                    <ValidationError prefix="Name" field="name" errors={state.errors} />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-theme-light/70">Email</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email"
                      required
                      className="bg-white/5 border-white/10 focus:border-theme-blue/50 text-theme-light"
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium text-theme-light/70">Company</label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company"
                    className="bg-white/5 border-white/10 focus:border-theme-blue/50 text-theme-light"
                  />
                  <ValidationError prefix="Company" field="company" errors={state.errors} />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-theme-light/70">Message</label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    rows={5}
                    required
                    className="bg-white/5 border-white/10 focus:border-theme-blue/50 text-theme-light"
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full text-white bg-theme-blue hover:bg-theme-blue/90 animated-button"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
                <ValidationError errors={state.errors} />
              </form>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-theme-blue/20 to-theme-cyan/20 rounded-xl blur-2xl"></div>
            <div className="glass-card rounded-xl h-full p-8 relative">
              <h3 className="text-2xl font-semibold mb-6">Why Choose Us</h3>
              
              <div className="space-y-8">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-theme-blue/20 flex items-center justify-center">
                      <svg className="h-6 w-6 text-theme-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium mb-2">Enterprise-Grade Security</h4>
                    <p className="text-theme-light/70">
                      We implement the highest standards of data protection and security in all our solutions.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-theme-blue/20 flex items-center justify-center">
                      <svg className="h-6 w-6 text-theme-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium mb-2">Rapid Implementation</h4>
                    <p className="text-theme-light/70">
                      Get up and running quickly with our streamlined deployment process and dedicated support.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-theme-blue/20 flex items-center justify-center">
                      <svg className="h-6 w-6 text-theme-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium mb-2">Measurable Results</h4>
                    <p className="text-theme-light/70">
                      Our solutions deliver tangible ROI with comprehensive analytics and reporting.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 p-6 bg-white/5 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-theme-blue/20 flex items-center justify-center mr-4">
                    <svg className="h-5 w-5 text-theme-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Schedule a Call</h4>
                    <p className="text-theme-light/70 text-sm">Book a free consultation with our experts</p>
                  </div>
                </div>
                <Button className="w-full bg-white/10 hover:bg-white/20 text-theme-light">
                  Book Appointment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
