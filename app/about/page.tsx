import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, Globe, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function AboutPage() {
  const values = [
    {
      icon: Award,
      title: "Uncompromising Quality",
      description:
        "Every piece is crafted to the highest standards using only the finest materials and traditional techniques passed down through generations.",
    },
    {
      icon: Users,
      title: "Personal Service",
      description:
        "Our dedicated concierge team provides personalized attention, ensuring each client receives an experience as exceptional as our jewelry.",
    },
    {
      icon: Globe,
      title: "Global Heritage",
      description:
        "Drawing inspiration from cultures worldwide, we create pieces that transcend borders and celebrate the universal language of beauty.",
    },
    {
      icon: Heart,
      title: "Emotional Connection",
      description:
        "We understand that jewelry marks life's most precious moments, and we're honored to be part of your story.",
    },
  ]

  const timeline = [
    {
      year: "1990",
      title: "Foundation",
      description:
        "Edenaire was founded in Geneva by master jeweler Antoine Dubois with a vision to create timeless luxury pieces.",
    },
    {
      year: "1995",
      title: "International Recognition",
      description:
        "Our first international award for excellence in jewelry design, establishing Edenaire as a global luxury brand.",
    },
    {
      year: "2000",
      title: "Bespoke Collection Launch",
      description: "Introduction of our signature bespoke service, allowing clients to create truly unique pieces.",
    },
    {
      year: "2010",
      title: "Heritage Series",
      description:
        "Launch of the Heritage Series, celebrating classical jewelry-making techniques with contemporary design.",
    },
    {
      year: "2020",
      title: "Digital Innovation",
      description:
        "Embracing technology while maintaining our artisanal roots, we launched our digital concierge service.",
    },
    {
      year: "2024",
      title: "Sustainable Luxury",
      description:
        "Commitment to ethical sourcing and sustainable practices, ensuring our legacy for future generations.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center mt-20">
        <div className="absolute inset-0 z-0">
          <Image src="/about-hero.png" alt="Edenaire Atelier" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-light mb-6 tracking-wide">Our Story</h1>
          <p className="text-xl opacity-90">Three decades of crafting dreams into reality</p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-light mb-8 text-gray-900">The Edenaire Legacy</h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Founded in 1990 in the heart of Geneva, Edenaire has been synonymous with uncompromising quality and
            timeless elegance for over three decades. Our journey began with a simple yet profound vision: to create
            jewelry that transcends mere adornment and becomes a cherished part of life's most precious moments.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            From our atelier overlooking Lake Geneva, our master craftsmen combine centuries-old techniques with
            contemporary design sensibilities. Each piece tells a story of passion, precision, and the relentless
            pursuit of perfection that defines the Edenaire experience.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-6 text-gray-900">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide every decision and inspire every creation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="p-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mb-6">
                    <value.icon className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="text-xl font-medium mb-4 text-gray-900">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-6 text-gray-900">Our Journey</h2>
            <p className="text-xl text-gray-600">Milestones that shaped our legacy of excellence</p>
          </div>

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-8 items-start">
                <div className="md:w-32 flex-shrink-0">
                  <div className="text-3xl font-light text-yellow-600 mb-2">{item.year}</div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-medium mb-3 text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-light mb-6 text-gray-900">Master Craftsmanship</h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                Our atelier is home to some of the world's most skilled artisans, each bringing decades of experience
                and an unwavering commitment to excellence.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Every piece undergoes meticulous hand-finishing, ensuring that each creation meets our exacting
                standards. From the initial sketch to the final polish, our craftsmen pour their passion and expertise
                into every detail.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-4" />
                  <span className="text-gray-700">Hand-selected premium materials</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-4" />
                  <span className="text-gray-700">Traditional Swiss craftsmanship techniques</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-4" />
                  <span className="text-gray-700">Rigorous quality control at every stage</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-4" />
                  <span className="text-gray-700">Lifetime warranty on all pieces</span>
                </div>
              </div>
            </div>
            <div className="relative h-96 lg:h-[500px]">
              <Image
                src="/about 2.jpg"
                alt="Master Craftsman at Work"
                fill
                className="object-cover rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Atelier Gallery */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-6 text-gray-900">Inside Our Atelier</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A glimpse into the spaces and details behind every Edenaire creation
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-80">
              <Image
                src="/about 3.jpg"
                alt="Edenaire atelier"
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="relative h-80">
              <Image
                src="/about 4.jpg"
                alt="Edenaire craftsmanship"
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-light mb-6 text-gray-900">Experience Edenaire</h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Discover how our passion for perfection can bring your vision to life. Connect with
            our master jewelers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black px-8 py-4 text-lg"
              >
                Contact Us
              </Button>
            </Link>
            <Link href="/shop">
              <Button
                size="lg"
                variant="outline"
                className="border-gray-300 hover:border-yellow-500 hover:text-yellow-600 px-8 py-4 text-lg bg-transparent"
              >
                View Collections
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
