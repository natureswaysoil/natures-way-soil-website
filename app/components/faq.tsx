
'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    )
  }

  const faqs = [
    {
      question: "How often should I use liquid fertilizer on my plants?",
      answer: "Most of our liquid fertilizers should be applied every 2-4 weeks during the growing season. However, this varies by product and plant type. Our houseplant fertilizer can be used monthly, while vegetable fertilizers might be applied weekly during peak growing season. Always follow the specific application instructions on each product."
    },
    {
      question: "Are your products safe for vegetables and herbs I plan to eat?",
      answer: "Absolutely! All our organic fertilizers are safe for edible plants. Our products are made from organic ingredients and contain no synthetic chemicals. You can safely use them on vegetables, herbs, and fruit plants. Just follow the application instructions for best results."
    },
    {
      question: "What makes your fertilizers different from store-bought options?",
      answer: "Our fertilizers are made fresh weekly, ensuring maximum potency and effectiveness. Unlike products that sit on store shelves for months, ours maintain their full nutritional value. We use premium organic ingredients and specialized formulations developed for specific plant needs."
    },
    {
      question: "Do you ship nationwide?",
      answer: "We ship to the lower 48 states only. Orders are processed within 1-2 business days. We use reliable shipping methods to ensure your products arrive fresh and ready to use."
    },
    {
      question: "Can I use these products in hydroponic systems?",
      answer: "Yes! Our Organic Hydroponic Fertilizer Concentrate is specifically formulated for soilless growing systems. It's compatible with NFT, DWC, aeroponic setups, and other hydroponic systems. Many of our other liquid fertilizers can also be adapted for hydroponic use."
    },
    {
      question: "How do I know which fertilizer is right for my plants?",
      answer: "Our AI-powered expert chat system can help you choose the perfect products for your specific needs. Simply describe your plants, growing conditions, and goals, and you'll get personalized recommendations. You can also browse our products by category or plant type."
    },
    {
      question: "Are your products environmentally friendly?",
      answer: "Yes, we're committed to environmental sustainability. All our products are made from organic, sustainably sourced ingredients. Our formulations improve soil health, support beneficial microorganisms, and minimize environmental impact while providing excellent plant nutrition."
    },
    {
      question: "What if I'm not satisfied with my purchase?",
      answer: "We stand behind our products with a satisfaction guarantee. If you're not completely satisfied with your purchase, please contact us and we'll work to make it right. Your success is our priority, and we're here to support your gardening journey."
    },
    {
      question: "How should I store the liquid fertilizers?",
      answer: "Store our liquid fertilizers in a cool, dry place away from direct sunlight. Keep containers tightly sealed when not in use. Most products have a shelf life of 2-3 years when stored properly, but since we make them fresh weekly, you're getting maximum potency from day one."
    },
    {
      question: "Can I mix different fertilizers together?",
      answer: "Some of our products can be mixed, but we recommend consulting our expert chat system for specific combinations. Certain products like our Humic & Fulvic Acid are designed to enhance other fertilizers. Always test small amounts first and follow application guidelines."
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get answers to common questions about our organic fertilizers and soil amendments. 
            Need more help? Our expert chat system is always available.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  {openItems.includes(index) ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {openItems.includes(index) && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="bg-green-600 rounded-lg p-8 max-w-2xl mx-auto text-white">
            <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
            <p className="text-lg mb-6 opacity-90">
              Get instant, personalized answers from our AI-powered expert chat system.
            </p>
            <a 
              href="https://natureswaysoil.com/chat" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Chat with Our Experts
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
