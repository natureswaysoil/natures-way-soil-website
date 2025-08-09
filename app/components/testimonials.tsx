
import { Star } from 'lucide-react'

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Portland, OR",
      text: "Nature's Way Soil fertilizers have completely transformed my vegetable garden. My tomatoes have never been bigger or more flavorful. The liquid fertilizer is so easy to use and the results are incredible!",
      rating: 5,
      product: "Organic Tomato Liquid Fertilizer"
    },
    {
      name: "Mike Chen",
      location: "Austin, TX",
      text: "As a commercial grower, I need products I can rely on. Nature's Way Soil delivers consistent results every time. Their kelp fertilizer has become essential in my growing operation.",
      rating: 5,
      product: "Liquid Kelp Fertilizer"
    },
    {
      name: "Jennifer Martinez",
      location: "Denver, CO",
      text: "I was struggling with my houseplants until I discovered Nature's Way Soil. Their houseplant fertilizer is gentle but effective - my plants have never looked healthier!",
      rating: 5,
      product: "Organic House Plant Fertilizer"
    },
    {
      name: "David Thompson",
      location: "Nashville, TN",
      text: "The soil amendments from Nature's Way transformed my clay soil into rich, productive garden beds. The results speak for themselves - my entire neighborhood asks for my gardening secrets!",
      rating: 5,
      product: "Soil Booster and Loosener"
    },
    {
      name: "Lisa Rodriguez",
      location: "Phoenix, AZ",
      text: "I love that these products are made fresh weekly. You can really tell the difference in quality compared to products that sit on store shelves for months. My organic garden has never been more productive.",
      rating: 5,
      product: "Organic All-Purpose Fertilizer"
    },
    {
      name: "Robert Kim",
      location: "Atlanta, GA",
      text: "Their customer service and expert advice through the chat system is phenomenal. They helped me choose the right products for my specific growing conditions and the results have been amazing.",
      rating: 5,
      product: "Enhanced Living Compost"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied gardeners who trust Nature's Way Soil for exceptional plant nutrition results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-gray-700 mb-4">
                "{testimonial.text}"
              </blockquote>
              
              <div className="border-t pt-4">
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-600">{testimonial.location}</div>
                <div className="text-sm text-green-600 font-medium mt-1">
                  Used: {testimonial.product}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-green-50 rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Join Our Growing Community</h3>
            <p className="text-gray-700 mb-6">
              Experience the Nature's Way Soil difference and see why gardeners nationwide trust our premium organic fertilizers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/products" 
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Shop Now
              </a>
              <a 
                href="https://natureswaysoil.com/chat" 
                target="_blank" 
                rel="noopener noreferrer"
                className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-colors"
              >
                Get Expert Advice
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
