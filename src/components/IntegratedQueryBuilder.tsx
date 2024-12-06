'use client'

import React, { useState, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { stateCountyData, variableCategoryData, years } from '../data/queryData'

type SparqlResults = {
  head: {
    vars: string[];
  };
  results: {
    bindings: Array<{
      [key: string]: {
        type: string;
        value: string;
      };
    }>;
  };
};

// Full mapping of state names to abbreviations
const stateAbbreviations: Record<string, string> = {
  "Alabama": "AL", "Alaska": "AK", "Arizona": "AZ", "Arkansas": "AR", "California": "CA",
  "Colorado": "CO", "Connecticut": "CT", "Delaware": "DE", "Florida": "FL", "Georgia": "GA",
  "Hawaii": "HI", "Idaho": "ID", "Illinois": "IL", "Indiana": "IN", "Iowa": "IA",
  "Kansas": "KS", "Kentucky": "KY", "Louisiana": "LA", "Maine": "ME", "Maryland": "MD",
  "Massachusetts": "MA", "Michigan": "MI", "Minnesota": "MN", "Mississippi": "MS",
  "Missouri": "MO", "Montana": "MT", "Nebraska": "NE", "Nevada": "NV", "New Hampshire": "NH",
  "New Jersey": "NJ", "New Mexico": "NM", "New York": "NY", "North Carolina": "NC",
  "North Dakota": "ND", "Ohio": "OH", "Oklahoma": "OK", "Oregon": "OR", "Pennsylvania": "PA",
  "Rhode Island": "RI", "South Carolina": "SC", "South Dakota": "SD", "Tennessee": "TN",
  "Texas": "TX", "Utah": "UT", "Vermont": "VT", "Virginia": "VA", "Washington": "WA",
  "West Virginia": "WV", "Wisconsin": "WI", "Wyoming": "WY"
};


export function IntegratedQueryBuilder() {
  const [selectedState, setSelectedState] = useState<string>('')
  const [selectedCounty, setSelectedCounty] = useState<string>('')
  const [selectedVariableCategory, setSelectedVariableCategory] = useState<string>('')
  const [selectedVariableType, setSelectedVariableType] = useState<string>('')
//  const [selectedYear, setSelectedYear] = useState<string>('')
  const [query, setQuery] = useState<string>('')
  const [results, setResults] = useState<SparqlResults | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setSelectedCounty('')
    setSelectedVariableCategory('')
    setSelectedVariableType('')
 //   setSelectedYear('')
  }, [selectedState])

  useEffect(() => {
    setSelectedVariableCategory('')
    setSelectedVariableType('')
 //   setSelectedYear('')
  }, [selectedCounty])

  useEffect(() => {
    setSelectedVariableType('')
  //  setSelectedYear('')
  }, [selectedVariableCategory])

  useEffect(() => {
 //   setSelectedYear('')
  }, [selectedVariableType])


  const getAbbreviation = (fullName: string): string => {
    const abbreviation = stateAbbreviations[fullName];
    if (!abbreviation) {
      throw new Error(`No abbreviation found for state: '${fullName}'`);
    }
    return abbreviation;
  };

  const isValidVariable = (categoryName: string, variableTitle: string): boolean => {
    const variables = variableCategoryData[categoryName];
    if (!variables) {
      throw new Error(`No data found for category: '${categoryName}'`);
    }
    return variables.includes(variableTitle);
  };

  const handleGenerateQuery = () => {

    const stateAbbr = getAbbreviation(selectedState);

    
    let generatedQuery = `PREFIX smw: <http://www.semanticweb.org/raajveer/ontologies/2024/10/SW531-Deliv3#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT ?state ?county ?year ?variableTitle ?percentage
WHERE {
  ?state a smw:State ;
         smw:stateTitle "${stateAbbr}"^^xsd:string ;
         smw:stateHasCounty ?county .
  ?county a smw:County ;
          smw:countyTitle "${selectedCounty}"^^xsd:string ;
          smw:countyHasVariable ?demographic .
  ?demographic a smw:Demographic ;
          smw:individualYear ?year ;`

    if (selectedVariableType) {
      generatedQuery += `
          smw:variableTitle "${selectedVariableType}"^^smw:string ;`
    }

    generatedQuery += `
          smw:variableTitle ?variableTitle ;
          smw:percent ?percentage .`

  //   if (selectedYear) {
  //     generatedQuery += `
  // FILTER(?year = "${selectedYear}"^^xsd:integer)`
  //   }

    generatedQuery += `
}`

    setQuery(generatedQuery)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setResults(null)

    try {
      const response = await fetch('http://localhost:5000/api/sparql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      })

      const data: SparqlResults = await response.json()

      if (!response.ok) {
        throw new Error(data.head?.vars ? 'API error' : 'Something went wrong')
      }

      setResults(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const renderResults = () => {
    if (!results) return null

    const { head, results: queryResults } = results

    return (
      <div className="mt-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Results:</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              {head.vars.map((variable) => (
                <th
                  key={variable}
                  className="border border-gray-300 px-4 py-2 text-left font-medium"
                >
                  {variable}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {queryResults.bindings.map((binding, index) => (
              <tr key={index} className="even:bg-gray-50 hover:bg-gray-100">
                {head.vars.map((variable) => (
                  <td
                    key={variable}
                    className="border border-gray-300 px-4 py-2"
                  >
                    {binding[variable]?.value || 'N/A'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Select value={selectedState} onValueChange={setSelectedState}>
          <SelectTrigger>
            <SelectValue placeholder="Select state" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(stateCountyData).map((state) => (
              <SelectItem key={state} value={state}>
                {state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select 
          value={selectedCounty} 
          onValueChange={setSelectedCounty}
          disabled={!selectedState}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select county" />
          </SelectTrigger>
          <SelectContent>
            {selectedState && stateCountyData[selectedState].map((county) => (
              <SelectItem key={county} value={county}>
                {county}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select 
          value={selectedVariableCategory} 
          onValueChange={setSelectedVariableCategory}
          disabled={!selectedCounty}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select variable category" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(variableCategoryData).map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select 
          value={selectedVariableType} 
          onValueChange={setSelectedVariableType}
          disabled={!selectedVariableCategory}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select variable type" />
          </SelectTrigger>
          <SelectContent>
            {selectedVariableCategory && variableCategoryData[selectedVariableCategory].map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* <Select 
          value={selectedYear} 
          onValueChange={setSelectedYear}
          disabled={!selectedVariableType}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select> */}
      </div>

      <Button onClick={handleGenerateQuery} disabled={!selectedState}>
        Generate SPARQL Query
      </Button>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          placeholder="Generated SPARQL query will appear here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows={10}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">Error: {error}</span>
          </div>
        )}

        <Button type="submit" disabled={isLoading || !query.trim()}>
          {isLoading ? 'Executing...' : 'Run Query'}
        </Button>

        {renderResults()}
      </form>
    </div>
  )
}

