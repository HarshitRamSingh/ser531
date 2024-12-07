# SER 531 - Team 5
### Raajveer Khattar, Sahil Parwani, Jill Hansalia, Harshit Singh, Arvind Anand

### Hosted Knowledge Graph URL:
```http://74.179.61.231:7200/```

### Hosted NextJs App:
```http://74.179.61.231:3000/```

### Wiki
- There are four dropdowns in the app: State, County, Type/Class, Information. All of these have to have some value to generate the query.
- After selecting the dropdowns, click on "Generate Query" to generate a SPARQL query based on the values selected in the dropdowns.
- Next, simply click "Run Query" and it'll hit the knowledge graph API and show the data.
- For information that contains percentage change values, you can additionally click the "Compare Mortality" button to compare the mortality rates from the year 2010-2014, for that particular state and county.


## Changes made to the ontology after the second deliverable:
- We got rid of the Year class. We also made seperate classes for County and State.
- We also added more classes and subclasses to cater to the dataset and the variables in it.
- We added a bunch of data properties to incorporate certain values and units from the dataset.
- We also used the foaf higher level ontology. Specifically, we used the title data property from it.