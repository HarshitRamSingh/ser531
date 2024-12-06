export const years = [2010, 2011, 2012, 2013, 2014, 2015];

export const counties = [
  "Hale County",
  "Henry County",
  "Houston County",
  // Add more counties as needed
];

export const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  // Add more states as needed
];

export const nationalities = [
  "White",
  "Black",
  "Hispanic",
  "Asian",
  // Add more nationalities as needed
];

export const generateSparqlQuery = (year: string, county: string, state: string, nationality: string) => {
  return `
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX : <http://example.org/ontology/>

SELECT ?percentage
WHERE {
  ?county a :County ;
          :name "${county}" ;
          :locatedIn ?state .
  ?state a :State ;
         :name "${state}" .
  ?population a :Population ;
              :ofCounty ?county ;
              :inYear "${year}"^^xsd:integer ;
              :hasPercentage ?percentage ;
              :ofNationality "${nationality}" .
}
  `.trim();
};

