"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, MapPin, Building, Clock } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const IPINFO_TOKEN = "d953f7bea8639d"

interface IPInfo {
  ip: string
  hostname: string
  city: string
  region: string
  country: string
  loc: string
  org: string
  postal: string
  timezone: string
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  [key: string]: any
}

export default function Home() {
  const [ip, setIp] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [data, setData] = useState<IPInfo | null>(null)

  const handleLookup = async () => {
    if (!ip) return
    setLoading(true)
    setError("")
    setData(null)

    try {
      const res = await fetch(`https://ipinfo.io/${ip}?token=${IPINFO_TOKEN}`)
      if (!res.ok) {
        throw new Error("Failed to fetch IP info.")
      }
      const json = await res.json()
      setData(json)
      /* eslint-disable  @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLookup()
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <main className="container mx-auto p-4 max-w-3xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-zinc-900 rounded-lg p-4 shadow-md">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              IP Lookup
            </h1>
            <p className="text-zinc-400 mt-1">
              Get detailed information about any IP address
            </p>
          </div>
        </div>

        {/* Search input & button */}
        <Card className="mb-6 bg-zinc-900 border-zinc-800">
          <CardContent className="pt-6">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter IP address, e.g. 8.8.8.8"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
              />
              <Button 
                onClick={handleLookup} 
                disabled={loading}
                className="min-w-[100px] bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
              >
                {loading ? "Searching..." : "Search"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Error display */}
        {error && (
          <Alert variant="destructive" className="mb-6 bg-red-900/50 border-red-900">
            <AlertDescription className="text-red-200">{error}</AlertDescription>
          </Alert>
        )}

        {/* Result */}
        {data && (
          <Card className="overflow-hidden bg-zinc-900 border-zinc-800">
            <CardHeader className="border-b border-zinc-800">
              <CardTitle className="flex items-center gap-2 text-zinc-100">
                <Globe className="h-5 w-5" />
                IP Details
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                      <Globe className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400">IP Address</p>
                      <p className="font-medium text-zinc-100">{data.ip}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400">Location</p>
                      <p className="font-medium text-zinc-100">{data.city}, {data.region}, {data.country}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center">
                      <Building className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400">Organization</p>
                      <p className="font-medium text-zinc-100">{data.org}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400">Timezone</p>
                      <p className="font-medium text-zinc-100">{data.timezone}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-zinc-800">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-zinc-400">Hostname</p>
                    <p className="font-medium text-zinc-100">{data.hostname || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400">Postal</p>
                    <p className="font-medium text-zinc-100">{data.postal || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400">Coordinates</p>
                    <p className="font-medium text-zinc-100">{data.loc || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}