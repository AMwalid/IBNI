"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Users, Globe, Lightbulb, Target, Rocket, DollarSign, Award, CheckCircle } from "lucide-react"

export default function InvestInIBNIPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      {/* Hero Section */}
      <div className="relative overflow-hidden mb-20">
        {/* Background Elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-200 rounded-full opacity-20 blur-3xl"></div>

        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:w-1/2 text-left"
            >
              <div className="inline-block px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
                Investment Opportunity
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Shape the Future of <span className="text-green-600">Education</span> with IBNI
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                Join our mission to revolutionize education technology and create meaningful impact for millions of
                learners worldwide.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8">
                  Download Pitch Deck
                </Button>
                <Button size="lg" variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
                  Schedule a Call
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:w-1/2 relative"
            >
              <div className="relative z-10">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-16 flex items-center px-6">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <TrendingUp className="h-8 w-8 text-green-600 mb-2" />
                        <h3 className="font-bold text-lg">32%</h3>
                        <p className="text-sm text-gray-600">Annual Growth</p>
                      </div>
                      <div className="bg-emerald-50 p-4 rounded-lg">
                        <Users className="h-8 w-8 text-emerald-600 mb-2" />
                        <h3 className="font-bold text-lg">1.5M+</h3>
                        <p className="text-sm text-gray-600">Active Users</p>
                      </div>
                      <div className="bg-teal-50 p-4 rounded-lg">
                        <Globe className="h-8 w-8 text-teal-600 mb-2" />
                        <h3 className="font-bold text-lg">12+</h3>
                        <p className="text-sm text-gray-600">Countries</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <DollarSign className="h-8 w-8 text-green-600 mb-2" />
                        <h3 className="font-bold text-lg">404B</h3>
                        <p className="text-sm text-gray-600">Market Size</p>
                      </div>
                    </div>
                    <div className="w-full bg-gradient-to-r from-green-500 to-emerald-500 h-12 rounded-lg flex items-center justify-center text-white font-medium">
                      Join Our Growth Journey
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -z-10 top-8 left-8 w-full h-full border-2 border-green-400 rounded-2xl"></div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Investment Opportunity */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">The Investment Opportunity</h2>
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-2/3">
              <p className="text-gray-700 leading-relaxed mb-4">
                IBNI represents a unique opportunity to invest in the rapidly growing EdTech sector. Our platform
                connects students, parents, teachers, and educational institutions in a seamless ecosystem that
                addresses critical pain points in education delivery and access.
              </p>
              <p className="text-gray-700 leading-relaxed">
                With a scalable business model, proprietary technology, and a growing user base, IBNI is positioned to
                capture significant market share in the $404 billion global EdTech market that is projected to reach
                $605 billion by 2027.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <TrendingUp className="h-20 w-20 text-green-600 mx-auto mb-4" />
                <p className="text-center font-semibold text-green-800">Projected Annual Growth</p>
                <p className="text-center text-3xl font-bold text-green-600">32%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Market Potential */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Market Potential</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-none shadow-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-green-100 rounded-full mb-4">
                  <Globe className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-medium text-gray-800 mb-2">Global EdTech Market</h3>
                <p className="text-3xl font-bold text-green-600 mb-2">404B DZD</p>
                <p className="text-gray-600 text-sm">
                  The global education technology market is valued at 404 billion DZD in 2023 with consistent growth.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-green-100 rounded-full mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-medium text-gray-800 mb-2">Target Users</h3>
                <p className="text-3xl font-bold text-green-600 mb-2">1.5B+</p>
                <p className="text-gray-600 text-sm">
                  Over 1.5 billion students and 70 million teachers worldwide represent our addressable market.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-green-100 rounded-full mb-4">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-medium text-gray-800 mb-2">Growth Rate</h3>
                <p className="text-3xl font-bold text-green-600 mb-2">16.5%</p>
                <p className="text-gray-600 text-sm">
                  The EdTech sector is growing at a CAGR of 16.5%, outpacing many other industries.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Business Model */}
      <div className="mb-24">
        <div className="flex items-center gap-3 mb-2">
          <DollarSign className="h-8 w-8 text-green-600" />
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Our Business Model</h2>
        </div>
        <div className="h-1 w-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mb-8"></div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Card className="bg-white/80 backdrop-blur-md border-none shadow-xl rounded-3xl overflow-hidden px-2 py-2 md:px-8 md:py-8">
            <CardHeader className="bg-gradient-to-r from-green-50/80 to-emerald-50/60 py-8 px-6 md:px-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-green-100">
              <div>
                <CardTitle className="text-2xl md:text-3xl text-green-800 mb-2 font-semibold">A Multi-Stream, Scalable Model</CardTitle>
                <CardDescription className="text-gray-700 max-w-xl text-lg">
                  Our business model is designed for sustainable, high-margin growth—leveraging multiple revenue streams and a data-driven approach to maximize value for all stakeholders.
                </CardDescription>
              </div>
              <div className="flex items-center gap-3 mt-4 md:mt-0">
                <span className="inline-flex items-center px-4 py-1 bg-green-100 text-green-800 rounded-full font-semibold text-base shadow-sm">
                  <TrendingUp className="h-5 w-5 mr-2" /> High Growth
                </span>
                <span className="inline-flex items-center px-4 py-1 bg-emerald-100 text-emerald-800 rounded-full font-semibold text-base shadow-sm">
                  <Award className="h-5 w-5 mr-2" /> Proven Traction
                </span>
              </div>
            </CardHeader>
            <CardContent className="py-10 px-4 md:px-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Revenue Streams */}
                <div>
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-green-700">
                    <DollarSign className="h-5 w-5" /> Revenue Streams
                  </h3>
                  <div className="grid grid-cols-1 gap-5">
                    <div className="flex items-center gap-4 p-5 bg-white/90 rounded-2xl shadow-sm border border-green-50 hover:shadow-md transition-shadow duration-200">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                      <div>
                        <div className="font-medium text-base">Subscription Model</div>
                        <div className="text-gray-500 text-sm">Tiered subscription plans for institutions, teachers, and parents</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-5 bg-white/90 rounded-2xl shadow-sm border border-green-50 hover:shadow-md transition-shadow duration-200">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                      <div>
                        <div className="font-medium text-base">Marketplace Commission</div>
                        <div className="text-gray-500 text-sm">Fee on transactions in our educational resources marketplace</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-5 bg-white/90 rounded-2xl shadow-sm border border-green-50 hover:shadow-md transition-shadow duration-200">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                      <div>
                        <div className="font-medium text-base">Premium Features</div>
                        <div className="text-gray-500 text-sm">Add-on services for advanced analytics, custom integrations, and specialized tools</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-5 bg-white/90 rounded-2xl shadow-sm border border-green-50 hover:shadow-md transition-shadow duration-200">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                      <div>
                        <div className="font-medium text-base">White-label Solutions</div>
                        <div className="text-gray-500 text-sm">Custom branded platforms for large educational institutions</div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Key Metrics */}
                <div>
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-green-700">
                    <Target className="h-5 w-5" /> Key Metrics
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white/90 rounded-2xl shadow-sm border border-green-50 p-6 flex flex-col items-center hover:shadow-md transition-shadow duration-200">
                      <span className="text-xs text-gray-500 mb-1">User Acquisition Cost</span>
                      <span className="text-2xl font-bold text-green-600">$12</span>
                    </div>
                    <div className="bg-white/90 rounded-2xl shadow-sm border border-green-50 p-6 flex flex-col items-center hover:shadow-md transition-shadow duration-200">
                      <span className="text-xs text-gray-500 mb-1">Customer Lifetime Value</span>
                      <span className="text-2xl font-bold text-green-600">$240</span>
                    </div>
                    <div className="bg-white/90 rounded-2xl shadow-sm border border-green-50 p-6 flex flex-col items-center hover:shadow-md transition-shadow duration-200">
                      <span className="text-xs text-gray-500 mb-1">MRR Growth</span>
                      <span className="text-2xl font-bold text-green-600">18%</span>
                    </div>
                    <div className="bg-white/90 rounded-2xl shadow-sm border border-green-50 p-6 flex flex-col items-center hover:shadow-md transition-shadow duration-200">
                      <span className="text-xs text-gray-500 mb-1">User Retention Rate</span>
                      <span className="text-2xl font-bold text-green-600">92%</span>
                    </div>
                  </div>
                  <div className="mt-10 bg-gradient-to-r from-green-100/80 to-emerald-50/80 rounded-2xl p-5 flex items-center gap-3 shadow-sm">
                    <Award className="h-6 w-6 text-green-600" />
                    <span className="font-semibold text-green-800 text-base">Our edge: Data-driven, scalable, and trusted by thousands of users</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Growth Strategy */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Growth Strategy</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-green-50 border-none shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-full">
                  <Rocket className="h-5 w-5 text-green-600" />
                </div>
                <CardTitle>Expansion Plan</CardTitle>
              </div>
              <CardDescription>Our strategic roadmap for market penetration and growth</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-800 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    1
                  </span>
                  <span>
                    <span className="font-medium">Phase 1:</span> Consolidate presence in current markets with enhanced
                    feature set
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-800 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    2
                  </span>
                  <span>
                    <span className="font-medium">Phase 2:</span> Expand to 5 new countries in North Africa and Middle
                    East
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-800 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    3
                  </span>
                  <span>
                    <span className="font-medium">Phase 3:</span> Launch enterprise solutions for large educational
                    networks
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-800 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    4
                  </span>
                  <span>
                    <span className="font-medium">Phase 4:</span> Global expansion with localized offerings and
                    strategic partnerships
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-emerald-50 border-none shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-full">
                  <Lightbulb className="h-5 w-5 text-emerald-600" />
                </div>
                <CardTitle>Innovation Pipeline</CardTitle>
              </div>
              <CardDescription>Upcoming features and technologies in development</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-emerald-100 text-emerald-800 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    1
                  </span>
                  <span>
                    <span className="font-medium">AI-Powered Learning Paths:</span> Personalized education journeys
                    based on student performance
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-emerald-100 text-emerald-800 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    2
                  </span>
                  <span>
                    <span className="font-medium">Advanced Analytics Dashboard:</span> Comprehensive insights for
                    institutions and educators
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-emerald-100 text-emerald-800 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    3
                  </span>
                  <span>
                    <span className="font-medium">Integrated Virtual Classroom:</span> Seamless online learning
                    environment with interactive tools
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-emerald-100 text-emerald-800 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    4
                  </span>
                  <span>
                    <span className="font-medium">Blockchain Credentials:</span> Secure, verifiable academic
                    achievements and certifications
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Financial Projections */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Financial Projections</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Metric</th>
                    <th className="text-right py-3 px-4">Year 1</th>
                    <th className="text-right py-3 px-4">Year 2</th>
                    <th className="text-right py-3 px-4">Year 3</th>
                    <th className="text-right py-3 px-4">Year 4</th>
                    <th className="text-right py-3 px-4">Year 5</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Revenue</td>
                    <td className="text-right py-3 px-4">1.2M DZD</td>
                    <td className="text-right py-3 px-4">4.8M DZD</td>
                    <td className="text-right py-3 px-4">12.5M DZD</td>
                    <td className="text-right py-3 px-4">25M DZD</td>
                    <td className="text-right py-3 px-4">42M DZD</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">User Base</td>
                    <td className="text-right py-3 px-4">50K</td>
                    <td className="text-right py-3 px-4">200K</td>
                    <td className="text-right py-3 px-4">500K</td>
                    <td className="text-right py-3 px-4">1M</td>
                    <td className="text-right py-3 px-4">1.5M</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Gross Margin</td>
                    <td className="text-right py-3 px-4">68%</td>
                    <td className="text-right py-3 px-4">72%</td>
                    <td className="text-right py-3 px-4">75%</td>
                    <td className="text-right py-3 px-4">76%</td>
                    <td className="text-right py-3 px-4">78%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">EBITDA</td>
                    <td className="text-right py-3 px-4">-0.8M DZD</td>
                    <td className="text-right py-3 px-4">0.5M DZD</td>
                    <td className="text-right py-3 px-4">3.2M DZD</td>
                    <td className="text-right py-3 px-4">8.5M DZD</td>
                    <td className="text-right py-3 px-4">14.7M DZD</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">Cash Flow</td>
                    <td className="text-right py-3 px-4">-1.2M DZD</td>
                    <td className="text-right py-3 px-4">0.2M DZD</td>
                    <td className="text-right py-3 px-4">2.8M DZD</td>
                    <td className="text-right py-3 px-4">6.5M DZD</td>
                    <td className="text-right py-3 px-4">12.5M DZD</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 text-sm text-gray-500 italic">
              Note: These projections are based on current growth trends and market analysis. Actual results may vary.
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-none shadow-sm overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center">
              <Users className="h-16 w-16 text-white opacity-50" />
            </div>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold">Leadership Team</h3>
              <p className="text-gray-600 mt-2">
                Our executive team brings together decades of experience in education, technology, and business scaling
                from companies like Google, Coursera, and leading educational institutions.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-emerald-400 to-emerald-500 flex items-center justify-center">
              <Award className="h-16 w-16 text-white opacity-50" />
            </div>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold">Technical Expertise</h3>
              <p className="text-gray-600 mt-2">
                Our development team consists of experienced engineers with backgrounds in AI, machine learning, and
                educational technology, committed to building scalable, innovative solutions.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-teal-400 to-teal-500 flex items-center justify-center">
              <Globe className="h-16 w-16 text-white opacity-50" />
            </div>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold">Advisory Board</h3>
              <p className="text-gray-600 mt-2">
                Our advisors include renowned educators, EdTech investors, and industry leaders who provide strategic
                guidance and open doors to key partnerships and opportunities.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Investment Tiers */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Investment Opportunities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-green-100 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl text-green-700">Seed Investor</CardTitle>
              <CardDescription>Early stage opportunity</CardDescription>
              <p className="text-3xl font-bold text-green-600 mt-2">50K - 250K DZD</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Priority access to future funding rounds</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Quarterly investor updates</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Advisory board consideration</span>
                </li>
              </ul>
              <Button className="w-full bg-green-600 hover:bg-green-700">Request Information</Button>
            </CardContent>
          </Card>

          <Card className="border-green-200 shadow-md relative">
            <div className="absolute top-0 right-0 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
              RECOMMENDED
            </div>
            <CardHeader className="pb-4">
              <CardTitle className="text-xl text-green-700">Growth Partner</CardTitle>
              <CardDescription>Strategic investment tier</CardDescription>
              <p className="text-3xl font-bold text-green-600 mt-2">250K - 1M DZD</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>All Seed Investor benefits</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Monthly strategy calls with leadership</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Product roadmap influence</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Board observer rights</span>
                </li>
              </ul>
              <Button className="w-full bg-green-600 hover:bg-green-700">Request Information</Button>
            </CardContent>
          </Card>

          <Card className="border-green-100 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl text-green-700">Strategic Investor</CardTitle>
              <CardDescription>Lead investment opportunity</CardDescription>
              <p className="text-3xl font-bold text-green-600 mt-2">1M+ DZD</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>All Growth Partner benefits</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Board seat consideration</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Custom partnership opportunities</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>First access to new markets</span>
                </li>
              </ul>
              <Button className="w-full bg-green-600 hover:bg-green-700">Request Information</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ready to Join Our Journey?</h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Schedule a meeting with our team to discuss investment opportunities and how you can be part of IBNI's growth
          story.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-green-600 hover:bg-green-700">
            Schedule Investment Call
          </Button>
          <Button size="lg" variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
            Download Investor Deck
          </Button>
        </div>
      </div>
    </div>
  )
}
