import {
  Phone,
  MessageCircle,
  CheckCircle,
  Users,
  Globe,
  Award,
  MapPin,
  Mail,
  Facebook,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Globe className="h-8 w-8 text-emerald-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Mumriz & Brothers
              </h1>
              <p className="text-sm text-gray-600">Licensed Travel Agency</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Phone className="h-4 w-4 mr-2" />
              Call Now
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" size="sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-50 to-teal-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Trusted Gateway to
              <span className="text-emerald-600"> Saudi Arabia</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Licensed travel agency providing fast, reliable Saudi visa
              processing and air ticket services. Trusted by thousands of
              customers worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                <CheckCircle className="h-5 w-5 mr-2" />
                Get Your Visa Now
              </Button>
              <Button size="lg" variant="outline">
                <Phone className="h-5 w-5 mr-2" />
                Free Consultation
              </Button>
            </div>
            <div className="mt-12">
              <img
                src="/placeholder.svg?height=400&width=800"
                alt="Saudi Arabia landmarks including Kaaba and modern skyline"
                className="rounded-lg shadow-xl mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Our Services
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Complete travel solutions for Saudi Arabia with government
              approval and expert guidance
            </p>
          </div>

          {/* Visa Services */}
          <div className="mb-16">
            <h4 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
              Saudi Arabian Visas
            </h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-emerald-600" />
                  </div>
                  <CardTitle className="text-lg">Work Visa</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Professional work permits for employment opportunities in
                    Saudi Arabia
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-teal-600" />
                  </div>
                  <CardTitle className="text-lg">Visit Visa</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Tourist and family visit visas for exploring Saudi Arabia
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-amber-600" />
                  </div>
                  <CardTitle className="text-lg">Umrah & Hajj</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Sacred pilgrimage visas for Umrah and Hajj journeys
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">Business & Others</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Business, medical, student, and family reunion visas
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Partner Service */}
          <div className="bg-gray-50 rounded-lg p-8">
            <div className="text-center mb-8">
              <h4 className="text-2xl font-semibold text-gray-900 mb-4">
                Air Ticket Services
              </h4>
              <p className="text-lg text-gray-600">
                In partnership with <strong>Alsudais Travel</strong>
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <img
                  src="/placeholder.svg?height=300&width=400"
                  alt="Airplane and travel booking"
                  className="rounded-lg shadow-md"
                />
              </div>
              <div>
                <h5 className="text-xl font-semibold text-gray-900 mb-4">
                  Complete Flight Solutions
                </h5>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3" />
                    International flight tickets
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3" />
                    Domestic Saudi Arabia flights
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3" />
                    Competitive pricing
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3" />
                    24/7 booking support
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                About Mumriz & Brothers
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                We are a licensed and government-approved travel agency
                specializing in Saudi Arabian visa services. With years of
                experience and thousands of satisfied customers, we provide
                fast, reliable, and expert guidance for all your travel needs.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mr-3" />
                  <span className="text-gray-700">Government Licensed</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mr-3" />
                  <span className="text-gray-700">Fast Processing</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mr-3" />
                  <span className="text-gray-700">Expert Guidance</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mr-3" />
                  <span className="text-gray-700">Multilingual Support</span>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Languages We Speak:
                </h4>
                <p className="text-gray-600">English • Urdu • Arabic</p>
              </div>
            </div>
            <div>
              <img
                src="/placeholder.svg?height=500&width=600"
                alt="Happy customers with passports and travel documents"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h3>
            <p className="text-lg text-gray-600">
              Trusted by thousands of travelers worldwide
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">{'★'.repeat(5)}</div>
                </div>
                <p className="text-gray-600 mb-4">
                  "Excellent service! Got my work visa processed in just 3 days.
                  The team was very helpful and professional."
                </p>
                <div className="font-semibold text-gray-900">Ahmed Hassan</div>
                <div className="text-sm text-gray-500">Work Visa Client</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">{'★'.repeat(5)}</div>
                </div>
                <p className="text-gray-600 mb-4">
                  "Made my Umrah journey possible with their quick visa
                  processing. Highly recommended for religious travel."
                </p>
                <div className="font-semibold text-gray-900">Fatima Ali</div>
                <div className="text-sm text-gray-500">Umrah Visa Client</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">{'★'.repeat(5)}</div>
                </div>
                <p className="text-gray-600 mb-4">
                  "Professional service from start to finish. They handled
                  everything and kept me updated throughout the process."
                </p>
                <div className="font-semibold text-gray-900">Mohammad Khan</div>
                <div className="text-sm text-gray-500">
                  Business Visa Client
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Get Started Today
            </h3>
            <p className="text-lg text-gray-600">
              Contact us for fast visa processing and expert guidance
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-6">
                Send us a Message
              </h4>
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Your first name" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Your last name" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+1 (555) 000-0000" />
                </div>
                <div>
                  <Label htmlFor="service">Service Needed</Label>
                  <Input
                    id="service"
                    placeholder="e.g., Work Visa, Umrah Visa, Air Tickets"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your travel plans..."
                    rows={4}
                  />
                </div>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  Send Message
                </Button>
              </form>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-6">
                Contact Information
              </h4>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-emerald-600 mt-1" />
                  <div>
                    <h5 className="font-semibold text-gray-900">Phone</h5>
                    <p className="text-gray-600">+92 XXX XXXXXXX</p>
                    <p className="text-gray-600">Available 24/7</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MessageCircle className="h-6 w-6 text-green-600 mt-1" />
                  <div>
                    <h5 className="font-semibold text-gray-900">WhatsApp</h5>
                    <p className="text-gray-600">+92 XXX XXXXXXX</p>
                    <p className="text-gray-600">Quick responses guaranteed</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-emerald-600 mt-1" />
                  <div>
                    <h5 className="font-semibold text-gray-900">Email</h5>
                    <p className="text-gray-600">info@mumrizbrothers.com</p>
                    <p className="text-gray-600">We reply within 2 hours</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-emerald-600 mt-1" />
                  <div>
                    <h5 className="font-semibold text-gray-900">
                      Office Address
                    </h5>
                    <p className="text-gray-600">123 Business District</p>
                    <p className="text-gray-600">City, Country</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Facebook className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h5 className="font-semibold text-gray-900">Facebook</h5>
                    <p className="text-gray-600">@MumrizBrothersTravel</p>
                    <p className="text-gray-600">Follow for updates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Globe className="h-8 w-8 text-emerald-400" />
                <div>
                  <h3 className="text-xl font-bold">Mumriz & Brothers</h3>
                  <p className="text-sm text-gray-400">
                    Licensed Travel Agency
                  </p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Your trusted partner for Saudi Arabian visas and travel
                services.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Work Visas</li>
                <li>Visit Visas</li>
                <li>Umrah & Hajj Visas</li>
                <li>Business Visas</li>
                <li>Air Tickets</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Services</li>
                <li>Contact</li>
                <li>FAQ</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Phone: +92 XXX XXXXXXX</li>
                <li>Email: info@mumrizbrothers.com</li>
                <li>WhatsApp: +92 XXX XXXXXXX</li>
                <li>Facebook: @MumrizBrothersTravel</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; 2024 Mumriz & Brothers. All rights reserved. Licensed
              Travel Agency.
            </p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          className="bg-green-500 hover:bg-green-600 rounded-full w-16 h-16 shadow-lg"
        >
          <MessageCircle className="h-8 w-8" />
        </Button>
      </div>
    </div>
  );
}
