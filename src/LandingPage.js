import React, { useState, useRef } from 'react'
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group"
import { Textarea } from "./components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { Camera, Paintbrush, Phone, Mail, Image as ImageIcon, ArrowUpCircle, PaintBucket, Film } from 'lucide-react'

const BeforeAfterSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50)

  const handleMove = (event) => {
    const container = event.currentTarget
    const containerRect = container.getBoundingClientRect()
    const containerWidth = containerRect.width
    let clientX

    if ('touches' in event) {
      clientX = event.touches[0].clientX
    } else {
      clientX = event.clientX
    }

    const position = ((clientX - containerRect.left) / containerWidth) * 100
    setSliderPosition(Math.min(Math.max(position, 0), 100))
  }

  return (
    <div
      className="relative w-full h-[600px] overflow-hidden cursor-ew-resize rounded-lg shadow-lg"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Before-cEDDoXIxIluPRniJieDaDRteocoX4N.jpg"
        alt="Before Restoration"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div
        className="absolute top-0 left-0 h-full overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <div className="relative h-full" style={{ width: `${100 / (sliderPosition / 100)}%` }}>
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/After-NNF53g5N8WDmLqWfqSRnbcGKX6PYY8.jpg"
            alt="After Restoration"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
      </div>
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-red-600 rounded-full shadow-lg flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
            <polyline points="21 18 15 12 21 6"></polyline>
          </svg>
        </div>
      </div>
    </div>
  )
}

const UploadPage = () => {
  const [selectedService, setSelectedService] = useState('restore')
  const [showThankYou, setShowThankYou] = useState(false)
  const uploadSectionRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowThankYou(true)
    setTimeout(() => setShowThankYou(false), 3000)
  }

  const scrollToUpload = () => {
    uploadSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const services = [
    { name: 'Restore', icon: ImageIcon },
    { name: 'Restore + Upscale', icon: ArrowUpCircle },
    { name: 'Restore + Color', icon: PaintBucket },
    { name: 'Restore + Video', icon: Film },
  ]

  return (
    <div className="space-y-12">
      <section id="services" className="mb-20">
        <h2 className="text-4xl font-bold text-red-500 mb-8 text-center">Our Services</h2>
        <div className="flex justify-center space-x-4">
          {services.map((service, index) => (
            <button
              key={index}
              className="group flex flex-col items-center justify-center w-32 h-32 p-4 bg-gray-800 border border-gray-700 rounded-lg transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              onClick={() => {
                setSelectedService(service.name.toLowerCase().replace(' + ', '-'))
                scrollToUpload()
              }}
              aria-label={`Select ${service.name} service`}
            >
              <service.icon className="w-12 h-12 mb-2 text-gray-300 group-hover:text-white transition-colors" />
              <span className="text-sm text-gray-300 group-hover:text-white text-center transition-colors">{service.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section id="upload" ref={uploadSectionRef}>
        <h2 className="text-4xl font-bold text-red-500 mb-8 text-center">Upload Your Photo</h2>
        <Tabs defaultValue="photo-restoration" className="w-full">
          <TabsList className="w-full flex justify-center mb-6 bg-gray-800">
            <TabsTrigger value="photo-restoration" className="px-6 py-3 text-gray-300 data-[state=active]:text-red-500 data-[state=active]:bg-gray-700">
              <Camera className="w-5 h-5 mr-2" />
              Photo Restoration
            </TabsTrigger>
            <TabsTrigger value="product-design" className="px-6 py-3 text-gray-300 data-[state=active]:text-red-500 data-[state=active]:bg-gray-700">
              <Paintbrush className="w-5 h-5 mr-2" />
              Product Design
            </TabsTrigger>
          </TabsList>
          <TabsContent value="photo-restoration">
            <Card className="max-w-2xl mx-auto bg-gray-800 border-red-500 border">
              <CardHeader>
                <CardTitle className="text-2xl text-red-500">Photo Restoration Form</CardTitle>
                <CardDescription className="text-gray-400">Upload your photo for restoration</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-300">Name</Label>
                      <Input id="name" placeholder="Your name" className="w-full bg-gray-700 text-white border-gray-600" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300">Email</Label>
                      <Input id="email" placeholder="Your email" type="email" className="w-full bg-gray-700 text-white border-gray-600" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-300">Phone</Label>
                      <Input id="phone" placeholder="Your phone number" type="tel" className="w-full bg-gray-700 text-white border-gray-600" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service" className="text-gray-300">Service</Label>
                      <RadioGroup defaultValue={selectedService} onValueChange={setSelectedService} className="flex flex-col space-y-2">
                        {services.map((service) => (
                          <div key={service.name} className="flex items-center space-x-2">
                            <RadioGroupItem value={service.name.toLowerCase().replace(' + ', '-')} id={service.name} className="border-red-500 text-red-500" />
                            <Label htmlFor={service.name} className="capitalize text-gray-300">{service.name}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="photo" className="text-gray-300">Upload Photo</Label>
                    <Input id="photo" type="file" accept="image/*" className="w-full bg-gray-700 text-white border-gray-600" />
                  </div>
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white transition-colors">Submit</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="product-design">
            <Card className="max-w-2xl mx-auto bg-gray-800 border-red-500 border">
              <CardHeader>
                <CardTitle className="text-2xl text-red-500">Product Design Form</CardTitle>
                <CardDescription className="text-gray-400">Upload your reference image and provide design requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="design-name" className="text-gray-300">Name</Label>
                      <Input id="design-name" placeholder="Your name" className="w-full bg-gray-700 text-white border-gray-600" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="design-email" className="text-gray-300">Email</Label>
                      <Input id="design-email" placeholder="Your email" type="email" className="w-full bg-gray-700 text-white border-gray-600" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="design-phone" className="text-gray-300">Phone</Label>
                      <Input id="design-phone" placeholder="Your phone number" type="tel" className="w-full bg-gray-700 text-white border-gray-600" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reference-image" className="text-gray-300">Upload Reference Image</Label>
                      <Input id="reference-image" type="file" accept="image/*" className="w-full bg-gray-700 text-white border-gray-600" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="design-requirements" className="text-gray-300">Design Requirements</Label>
                    <Textarea id="design-requirements" placeholder="Describe your design requirements" className="w-full h-32 bg-gray-700 text-white border-gray-600" />
                  </div>
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white transition-colors">Submit</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {showThankYou && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl border border-red-500">
            <h3 className="text-2xl font-bold mb-4 text-red-500">Thank You!</h3>
            <p className="text-gray-300">We've received your submission and will get back to you within 3 days.</p>
            <Button onClick={() => setShowThankYou(false)} className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white transition-colors">Close</Button>
          </div>
        </div>
      )}
    </div>
  )
}

const ContactPage = () => (
  <section id="contact" className="mb-20">
    <h2 className="text-4xl font-bold text-red-500 mb-8 text-center">Contact Us</h2>
    <div className="max-w-2xl mx-auto text-center">
      <p className="text-gray-300 mb-6">For any inquiries, please contact us at:</p>
      <div className="flex items-center justify-center mb-4">
        <Mail className="w-6 h-6 text-red-500 mr-2" />
        <p className="text-gray-100 text-xl">info@pictale.com</p>
      </div>
      <div className="flex items-center justify-center">
        <Phone className="w-6 h-6 text-red-500 mr-2" />
        <p className="text-gray-100 text-xl">+1 (123) 456-7890</p>
      </div>
    </div>
  </section>
)

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-black shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="w-24 h-12 relative">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PIC%20TALE%20LOGO_WHT-mqUCzJDcjxqDFqHDTnozCfHNNkMS7m.png"
              alt="Pic Tale Logo"
              className="w-full h-full object-contain object-left"
            />
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#" onClick={() => setActiveTab('home')} className={`text-gray-300 hover:text-red-500 transition-colors ${activeTab === 'home' ? 'text-red-500' : ''}`}>Home</a></li>
              <li><a href="#" onClick={() => setActiveTab('upload')} className={`text-gray-300 hover:text-red-500 transition-colors ${activeTab === 'upload' ? 'text-red-500' : ''}`}>Upload</a></li>
              <li><a href="#" onClick={() => setActiveTab('contact')} className={`text-gray-300 hover:text-red-500 transition-colors ${activeTab === 'contact' ? 'text-red-500' : ''}`}>Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {activeTab === 'home' && (
          <>
            <section className="text-center mb-16">
              <h1 className="text-5xl font-bold text-red-500 mb-4">Restore Your Memories with Pic Tale</h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">Bring your old photos back to life using traditional restoration techniques. Experience the magic of preserving your cherished moments.</p>
            </section>
            <section className="mb-20">
              <BeforeAfterSlider />
              <p className="text-center text-gray-400 mt-4">Drag the slider to see the before and after comparison</p>
            </section>
          </>
        )}
        {activeTab === 'upload' && <UploadPage />}
        {activeTab === 'contact' && <ContactPage />}
      </main>

      <footer className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2023 Pic Tale. All rights reserved.</p>
          <p className="mt-2 text-gray-400">Bringing your memories back to life, one photo at a time.</p>
        </div>
      </footer>
    </div>
  )
}