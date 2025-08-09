
import { Leaf, Droplets, Award, Truck, Clock, Shield } from 'lucide-react'

export function Benefits() {
  const benefits = [
    {
      icon: Droplets,
      title: "Made Fresh Weekly",
      description: "Every batch is manufactured fresh to ensure maximum potency and effectiveness. No old inventory sitting on shelves.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Award,
      title: "Professional Grade",
      description: "Trusted by commercial growers and gardening professionals nationwide for consistent, reliable results season after season.",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Leaf,
      title: "100% Organic",
      description: "All our products are made from premium organic ingredients, safe for edible plants and environmentally responsible.",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Truck,
      title: "Fast Shipping",
      description: "Orders ship within 1-2 business days to the lower 48 states only.",
      color: "bg-orange-100 text-orange-600"
    },
    {
      icon: Clock,
      title: "Expert Support",
      description: "Get instant growing advice and product recommendations through our AI-powered expert chat system.",
      color: "bg-red-100 text-red-600"
    },
    {
      icon: Shield,
      title: "Satisfaction Guaranteed",
      description: "We stand behind our products with a satisfaction guarantee. Your success is our priority.",
      color: "bg-indigo-100 text-indigo-600"
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Nature's Way Soil?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're committed to providing the highest quality organic fertilizers and soil amendments, 
            backed by expert knowledge and exceptional customer service.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${benefit.color}`}>
                <benefit.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-green-600 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Garden?</h3>
          <p className="text-lg mb-6 opacity-90">
            Join thousands of satisfied gardeners who trust Nature's Way Soil for their plant nutrition needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/products" 
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Shop Products
            </a>
            <a 
              href="https://natureswaysoil.com/chat" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
            >
              Get Expert Advice
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
