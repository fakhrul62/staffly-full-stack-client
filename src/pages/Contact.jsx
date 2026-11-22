import React, { useState } from "react";
import {
  MapPin,
  Mail,
  Clock,
  Send,
  MessageSquare,
  LifeBuoy,
  CheckCircle2,
} from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";

const Contact = () => {
  const [topic, setTopic] = useState("general");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ firstName: "", lastName: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16 md:pb-24">
      {/* Section Header */}
      <div className="max-w-2xl mx-auto text-center mb-10 md:mb-14">
        <Badge variant="default" className="mb-4">
          Customer Care
        </Badge>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
          We&apos;re Here to Help
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
          Whether it&apos;s a question about our services, a request for
          technical assistance, or suggestions for improvement, our team is
          eager to hear from you.
        </p>
      </div>

      {/* Equal-Height 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Map + Direct Info Card */}
        <Card className="lg:col-span-6 overflow-hidden flex flex-col justify-between p-0 bg-white border-slate-200/80 shadow-sm">
          <div className="relative flex-1 min-h-[340px] lg:min-h-[420px] w-full bg-slate-100 overflow-hidden">
            <iframe
              title="Staffly Office Location - London, UK"
              className="absolute inset-0 h-full w-full border-0"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-0.22%2C51.46%2C0.02%2C51.56&layer=mapnik&marker=51.5074%2C-0.1278"
              loading="lazy"
            />
          </div>

          {/* Grounded Contact Metadata Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 sm:p-6 border-t border-slate-100 bg-white">
            <div className="flex items-start gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <MapPin className="h-4 w-4" strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-900">Office</p>
                <p className="text-xs text-slate-500 mt-0.5">London, UK</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <Mail className="h-4 w-4" strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-900">Email</p>
                <p className="text-xs text-slate-500 mt-0.5 truncate">
                  support@staffly.io
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <Clock className="h-4 w-4" strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-900">Hours</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Mon–Fri, 9am–6pm
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Right: Contact Form Card */}
        <Card className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between bg-white border-slate-200/80 shadow-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 h-full">
            <div>
              <Label className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                Select Options for Business Engagement
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant={topic === "general" ? "default" : "outline"}
                  onClick={() => setTopic("general")}
                  className="w-full justify-center h-11"
                >
                  <MessageSquare className="h-4 w-4" strokeWidth={1.75} />
                  General Inquiry
                </Button>
                <Button
                  type="button"
                  variant={topic === "support" ? "default" : "outline"}
                  onClick={() => setTopic("support")}
                  className="w-full justify-center h-11"
                >
                  <LifeBuoy className="h-4 w-4" strokeWidth={1.75} />
                  Product Support
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Jane"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Your Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
              />
            </div>

            <div className="space-y-2 flex-1 flex flex-col">
              <Label htmlFor="message">Your Message</Label>
              <Textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us how we can help your team..."
                className="flex-1 min-h-[130px]"
              />
            </div>

            {submitted && (
              <div className="flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
                <CheckCircle2
                  className="h-4 w-4 shrink-0 text-emerald-600"
                  strokeWidth={2}
                />
                Thanks for reaching out! Our team will get back to you shortly.
              </div>
            )}

            <Button type="submit" size="xl" className="w-full rounded-xl mt-1">
              <Send className="h-4 w-4" strokeWidth={1.75} />
              Send Message
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default Contact;
