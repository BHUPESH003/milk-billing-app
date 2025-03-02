"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function BillsFilter() {
  const [searchTerm, setSearchTerm] = useState("")
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("2023")
  const [status, setStatus] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Filter applied:", { searchTerm, month, year, status })
    // Apply filters to the bills list
  }

  const clearFilters = () => {
    setSearchTerm("")
    setMonth("")
    setYear("2023")
    setStatus("")
  }

  return (
    <Card>
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2 md:grid-cols-5">
          <div className="relative md:col-span-2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customer name or phone..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={month} onValueChange={setMonth}>
            <SelectTrigger>
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Months</SelectItem>
              <SelectItem value="January">January</SelectItem>
              <SelectItem value="February">February</SelectItem>
              <SelectItem value="March">March</Select

