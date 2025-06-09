import { Card } from "@/components/ui/card"

interface AdBannerProps {
  title?: string
  description?: string
  ctaText?: string
  ctaLink?: string
}

export function AdBanner({
  title = "Advertise with IBNI",
  description = "Reach thousands of parents and educators looking for educational resources",
  ctaText = "Learn More",
  ctaLink = "#",
}: AdBannerProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="overflow-hidden bg-green-50 border-green-200">
        <div className="flex flex-col items-center text-center p-6">
          <h3 className="text-2xl font-semibold text-green-800 mb-4">Promote Your Institution</h3>
          <p className="text-lg text-gray-600 mb-5 max-w-2xl">Get your school or teaching services in front of thousands of parents and students</p>
          <a
            href={ctaLink}
            className="inline-flex items-center text-lg text-green-600 hover:text-green-700 font-medium"
          >
            Start Advertising
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </Card>

      <Card className="overflow-hidden bg-green-50 border-green-200">
        <div className="flex flex-col items-center text-center p-6">
          <h3 className="text-2xl font-semibold text-green-800 mb-4">Join Our Network</h3>
          <p className="text-lg text-gray-600 mb-5 max-w-2xl">Connect with top educational institutions and expand your reach in the education sector</p>
          <a
            href="/join"
            className="inline-flex items-center text-lg text-green-600 hover:text-green-700 font-medium"
          >
            Get Started
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </Card>
    </div>
  )
} 