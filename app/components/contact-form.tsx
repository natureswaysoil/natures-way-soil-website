
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    plantType: '',
    experience: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      plantType: '',
      experience: ''
    })
    
    setIsSubmitting(false)
    alert('Thank you for your message! We\'ll get back to you within 24 hours.')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name">Name *</Label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
        />
      </div>

      <div>
        <Label htmlFor="email">Email *</Label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
        />
      </div>

      <div>
        <Label htmlFor="plantType">What are you growing?</Label>
        <select
          id="plantType"
          name="plantType"
          value={formData.plantType}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
        >
          <option value="">Select plant type</option>
          <option value="vegetables">Vegetables</option>
          <option value="houseplants">Houseplants</option>
          <option value="flowers">Flowers</option>
          <option value="herbs">Herbs</option>
          <option value="trees-shrubs">Trees & Shrubs</option>
          <option value="lawn">Lawn</option>
          <option value="hydroponic">Hydroponic</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <Label htmlFor="experience">Gardening Experience</Label>
        <select
          id="experience"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
        >
          <option value="">Select experience level</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
          <option value="professional">Professional/Commercial</option>
        </select>
      </div>

      <div>
        <Label htmlFor="subject">Subject *</Label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          value={formData.subject}
          onChange={handleChange}
          placeholder="e.g., Product recommendation, growing advice, order question"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
        />
      </div>

      <div>
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          name="message"
          required
          value={formData.message}
          onChange={handleChange}
          rows={5}
          placeholder="Tell us about your growing conditions, specific plants, or questions you have..."
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
        />
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Need immediate help?</strong> Our AI-powered expert chat system can provide instant answers 
          to common questions about plant nutrition and product selection.
        </p>
        <Button variant="outline" className="mt-2" asChild>
          <a href="https://natureswaysoil.com/chat" target="_blank" rel="noopener noreferrer">
            Try Expert Chat
          </a>
        </Button>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>

      <p className="text-sm text-gray-600">
        * Required fields. We typically respond within 24 hours during business days.
      </p>
    </form>
  )
}
