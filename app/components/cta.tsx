
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'

export function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-green-600 via-green-700 to-blue-600">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Garden?
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Join thousands of successful gardeners who trust Nature's Way Soil for premium organic fertilizers. 
            Made fresh weekly for maximum results.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-4" asChild>
              <Link href="/products">
                Shop Premium Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-green-600 text-lg px-8 py-4" 
              asChild
            >
              <Link href="/expert-advice">
                <MessageCircle className="mr-2 h-5 w-5" />
                Get Expert Advice
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">Fresh Weekly</div>
              <div className="opacity-90">Manufacturing Guarantee</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">48 States</div>
              <div className="opacity-90">Fast Shipping Coverage</div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/20">
            <h3 className="text-2xl font-bold mb-4">Why Choose Nature's Way Soil?</h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-semibold mb-2">✓ Professional Grade Quality</h4>
                <p className="opacity-90 text-sm">Trusted by commercial growers nationwide</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">✓ 100% Organic Ingredients</h4>
                <p className="opacity-90 text-sm">Safe for edible plants and environmentally responsible</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">✓ Made Fresh Weekly</h4>
                <p className="opacity-90 text-sm">Maximum potency guaranteed in every bottle</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">✓ Expert Support Available</h4>
                <p className="opacity-90 text-sm">AI-powered chat system for instant growing advice</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
