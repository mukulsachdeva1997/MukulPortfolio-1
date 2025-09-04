import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Copy, Download, Send } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import emailjs from "@emailjs/browser";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  website?: string; // honeypot field
}

export function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
    website: "",
  });

    const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("Missing VITE_EMAILJS_* env vars. Check .env / Replit Secrets and restart the dev server.");
      }

      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        message: data.message,
      };

      try {
        const res = await emailjs.send(serviceId, templateId, templateParams, { publicKey });
        console.log("EmailJS response:", res);
        return res;
      } catch (err) {
        console.error("EmailJS send error:", err);
        throw err; // will be caught by onError
      }
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "", website: "" });
    },
    onError: (error: any) => {
      console.error("EmailJS error (onError):", error);

      let description = "Failed to send message. Please try again.";
      if (error?.text) description = error.text;
      if (error?.message) description = error.message;

      toast({
        title: "Error",
        description,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot: ignore spam
    if (formData.website) return;

    contactMutation.mutate(formData);
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: `${label} copied to clipboard.`,
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard.",
        variant: "destructive",
      });
    }
    
  };

  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to bring your project to life? Let's discuss how we can create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="space-y-6">
              <a
                href="mailto:mukulsachdeva1997@gmail.com"
                className="flex items-center space-x-4 p-4 bg-card rounded-lg border border-border hover:border-primary transition-colors duration-200 group"
                data-testid="link-email"
              >
                <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">mukulsachdeva1997@gmail.com</p>
                </div>
              </a>

              <a
                href="tel:+4917682407998"
                className="flex items-center space-x-4 p-4 bg-card rounded-lg border border-border hover:border-secondary transition-colors duration-200 group"
                data-testid="link-phone"
              >
                <div className="bg-secondary/10 p-3 rounded-lg group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors duration-200">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-muted-foreground">+49 176 8240 7998</p>
                </div>
              </a>

              <div className="flex items-center space-x-4 p-4 bg-card rounded-lg border border-border" data-testid="info-location">
                <div className="bg-accent p-3 rounded-lg">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-muted-foreground">Paderborn, Germany</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <Button
                onClick={() => copyToClipboard("mukulsachdeva1997@gmail.com", "Email")}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                data-testid="button-copy-email"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Email
              </Button>
              <Button
                onClick={() => copyToClipboard("+49 176 8240 7998", "Phone")}
                variant="outline"
                className="w-full"
                data-testid="button-copy-phone"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Phone
              </Button>
              <Button
                asChild
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                data-testid="button-download-cv"
              >
                <a href="https://msresume12.edgeone.app/MS_Resume%20(1).pdf" download>
                  <Download className="h-4 w-4 mr-2" />
                  Download CV
                </a>
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-card rounded-2xl shadow-lg border border-border">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-6" data-testid="form-contact">
                {/* Honeypot field for spam protection */}
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="honeypot"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div>
                  <Label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Your name"
                    className="w-full"
                    data-testid="input-name"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder="your.email@example.com"
                    className="w-full"
                    data-testid="input-email"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    placeholder="Tell me about your project..."
                    className="w-full resize-none"
                    data-testid="textarea-message"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  data-testid="button-send-message"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {contactMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
    
  );
}