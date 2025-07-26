"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Camera,
  RotateCcw,
  Download,
  Share2,
  Heart,
  ShoppingBag,
  Settings,
  Sparkles,
  Eye,
  ArrowRight,
} from "lucide-react"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function VirtualTryOnPage() {
  const [selectedProduct, setSelectedProduct] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [cameraActive, setCameraActive] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const products = [
    {
      id: 1,
      name: "Celestial Diamond Necklace",
      price: "$45,000",
      image: "/placeholder.svg?height=400&width=400",
      category: "Necklaces",
      description: "Exquisite diamond necklace with celestial-cut stones",
    },
    {
      id: 2,
      name: "Royal Sapphire Ring",
      price: "$35,800",
      image: "/placeholder.svg?height=400&width=400",
      category: "Rings",
      description: "Magnificent sapphire ring with diamond pavé",
    },
    {
      id: 3,
      name: "Golden Aurora Earrings",
      price: "$18,200",
      image: "/placeholder.svg?height=400&width=400",
      category: "Earrings",
      description: "18k gold earrings with aurora-cut gemstones",
    },
    {
      id: 4,
      name: "Heritage Pearl Bracelet",
      price: "$22,400",
      image: "/placeholder.svg?height=400&width=400",
      category: "Bracelets",
      description: "South Sea pearl bracelet with gold clasp",
    },
  ]

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 1280,
          height: 720,
          facingMode: "user",
        },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      setCameraActive(false)
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      const context = canvas.getContext("2d")

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      if (context) {
        context.drawImage(video, 0, 0)
        // Here you would add the jewelry overlay logic
      }
    }
  }

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-64 flex items-center justify-center mt-20 bg-gradient-to-r from-black via-gray-900 to-black">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-20 w-32 h-32 border border-yellow-400/30 rotate-45 animate-pulse" />
          <div className="absolute bottom-10 right-20 w-24 h-24 border border-yellow-400/20 rotate-12" />
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <Sparkles className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
          <h1 className="text-5xl font-extralight mb-4 tracking-wide">Virtual Try-On</h1>
          <p className="text-xl opacity-90 font-light">Experience our jewelry in augmented reality</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Virtual Try-On Interface */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-gray-900 to-black text-white">
                <CardTitle className="text-2xl font-light flex items-center">
                  <Camera className="mr-3 h-6 w-6" />
                  Virtual Mirror
                </CardTitle>
                <p className="text-gray-300 font-light">See how {products[selectedProduct].name} looks on you</p>
              </CardHeader>

              <CardContent className="p-0 relative">
                <div className="relative aspect-video bg-gray-900 flex items-center justify-center">
                  {cameraActive ? (
                    <>
                      <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                      <canvas
                        ref={canvasRef}
                        className="absolute inset-0 pointer-events-none"
                        style={{ display: "none" }}
                      />

                      {/* AR Overlay Simulation */}
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="w-32 h-32 border-2 border-yellow-400/50 rounded-full animate-pulse" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Image
                              src={products[selectedProduct].image || "/placeholder.svg"}
                              alt="Virtual jewelry"
                              width={80}
                              height={80}
                              className="opacity-80"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center text-white">
                      <Camera className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-xl font-light mb-2">Start Your Virtual Try-On</h3>
                      <p className="text-gray-400 mb-6 font-light">
                        Allow camera access to see how jewelry looks on you
                      </p>
                      <Button
                        onClick={startCamera}
                        size="lg"
                        className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black px-8 py-3"
                      >
                        <Camera className="mr-2 h-5 w-5" />
                        Start Camera
                      </Button>
                    </div>
                  )}
                </div>

                {/* Camera Controls */}
                {cameraActive && (
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-black/80 backdrop-blur-sm rounded-full px-6 py-3">
                    <Button
                      onClick={capturePhoto}
                      size="sm"
                      className="bg-white text-black hover:bg-gray-100 rounded-full w-12 h-12 p-0"
                    >
                      <Camera className="h-5 w-5" />
                    </Button>
                    <Button
                      onClick={() => setIsRecording(!isRecording)}
                      size="sm"
                      variant="outline"
                      className={`rounded-full w-12 h-12 p-0 border-white text-white hover:bg-white hover:text-black ${
                        isRecording ? "bg-red-500 border-red-500" : ""
                      }`}
                    >
                      <div className={`w-3 h-3 ${isRecording ? "bg-white" : "bg-red-500"} rounded-full`} />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full w-12 h-12 p-0 border-white text-white hover:bg-white hover:text-black bg-transparent"
                    >
                      <RotateCcw className="h-5 w-5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full w-12 h-12 p-0 border-white text-white hover:bg-white hover:text-black bg-transparent"
                    >
                      <Settings className="h-5 w-5" />
                    </Button>
                  </div>
                )}

                {/* Action Buttons */}
                {cameraActive && (
                  <div className="absolute top-6 right-6 flex flex-col space-y-2">
                    <Button size="sm" className="bg-white/90 text-black hover:bg-white rounded-full w-12 h-12 p-0">
                      <Download className="h-5 w-5" />
                    </Button>
                    <Button size="sm" className="bg-white/90 text-black hover:bg-white rounded-full w-12 h-12 p-0">
                      <Share2 className="h-5 w-5" />
                    </Button>
                    <Button size="sm" className="bg-white/90 text-black hover:bg-white rounded-full w-12 h-12 p-0">
                      <Heart className="h-5 w-5" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="mt-8 border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-medium mb-4 text-gray-900">How to Use Virtual Try-On</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Camera className="h-6 w-6 text-yellow-600" />
                    </div>
                    <h4 className="font-medium mb-2">1. Enable Camera</h4>
                    <p className="text-sm text-gray-600 font-light">Allow camera access for the best experience</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Eye className="h-6 w-6 text-yellow-600" />
                    </div>
                    <h4 className="font-medium mb-2">2. Position Yourself</h4>
                    <p className="text-sm text-gray-600 font-light">Face the camera with good lighting</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Sparkles className="h-6 w-6 text-yellow-600" />
                    </div>
                    <h4 className="font-medium mb-2">3. Try On Jewelry</h4>
                    <p className="text-sm text-gray-600 font-light">Select different pieces to see how they look</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Selection */}
          <div>
            <Card className="border-0 shadow-2xl sticky top-24">
              <CardHeader>
                <CardTitle className="text-xl font-light">Select Jewelry</CardTitle>
                <p className="text-gray-600 font-light">Choose a piece to try on virtually</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {products.map((product, index) => (
                  <div
                    key={product.id}
                    onClick={() => setSelectedProduct(index)}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                      selectedProduct === index
                        ? "bg-yellow-50 border-2 border-yellow-400"
                        : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{product.name}</h4>
                        <Badge className="bg-gray-200 text-gray-700 text-xs mb-2">{product.category}</Badge>
                        <p className="text-lg font-light text-gray-900">{product.price}</p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="pt-6 border-t">
                  <div className="space-y-4">
                    <Button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black py-3">
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-gray-300 hover:border-yellow-500 hover:text-yellow-600 bg-transparent"
                    >
                      <Heart className="mr-2 h-5 w-5" />
                      Add to Wishlist
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-gray-300 hover:border-yellow-500 hover:text-yellow-600 bg-transparent"
                    >
                      Book Consultation
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
