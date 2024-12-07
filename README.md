# SER 531 - Team 5
### Raajveer Khattar, Sahil Parwani, Jill Hansalia, Harshit Singh, Arvind Anand

### Hosted Knowledge Graph URL:
```http://74.179.61.231:7200/```

## NextJs App Build Procedure:

1. Clone the repository

   ```git clone https://github.com/HarshitRamSingh/ser531.git```

2. Install the dependencies

   ```npm install```

3. Build the project

   ```npm run build```

4. Start the build

   ```npm run start```

### Wiki
- There are four dropdowns in the app: State, County, Type/Class, Information. All of these have to have some value to generate the query.
- After selecting the dropdowns, click on "Generate Query" to generate a SPARQL query based on the values selected in the dropdowns.
- Next, simply click "Run Query" and it'll hit the knowledge graph API and show the data.
- For information that contains percentage change values, you can additionally click the "Compare Mortality" button to compare the mortality rates from the year 2010-2014, for that particular state and county.
