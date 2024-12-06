import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { years, counties, states, nationalities } from '../data/sampleData';

export default function SentenceBuilder() {
  const [year, setYear] = useState<number | null>(null);
  const [county, setCounty] = useState<string | null>(null);
  const [state, setState] = useState<string | null>(null);
  const [nationality, setNationality] = useState<string | null>(null);

  const sentence = year && county && state && nationality
    ? `In ${year}, ${county} in ${state} had X% of its population identifying as ${nationality}.`
    : 'Please select options to build your sentence.';

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sentence Builder</h1>
      <div className="space-y-4">
        <Select onValueChange={(value) => setYear(Number(value))}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((y) => (
              <SelectItem key={y} value={y.toString()}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={setCounty}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select county" />
          </SelectTrigger>
          <SelectContent>
            {counties.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={setState}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select state" />
          </SelectTrigger>
          <SelectContent>
            {states.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={setNationality}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select nationality" />
          </SelectTrigger>
          <SelectContent>
            {nationalities.map((n) => (
              <SelectItem key={n} value={n}>
                {n}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="mt-6 p-4 bg-gray-100 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Generated Sentence:</h2>
          <p>{sentence}</p>
        </div>
      </div>
    </div>
  );
}

