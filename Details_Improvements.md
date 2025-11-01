# General Information and Future Improvements
## General Infomration
### Types of reports - stakeholders/audience
1. Technical
2. Managerial / Executive
3. Compliance Officers
4. Legal Counsel
5. Insurance / Risk
### Industry
1. Banking/finance
2. Healthcare
3. Retail / ecommerce
4. Government
5. Non-profit / volunteer
### Documentation phases/steps
1. Basics
2. Attack steps
3. Evidence
4. Impact
5. Remediation
6. Report


Only administrators are able to add new projects - selecting industry (compliance)

## Improvements
* Download all reports
* Upload images (evidence)
* Visual report - improve aesthetics and readability
* Evidence is directly linked to specific steps
  - Add evidence with dropdown menu of steps
* Remediation as its own step/on own page
* Add other types of attacks for variety - filter by category (web application/network etc)
* Implement actual database
* Admin page
* Refine UI / CSS to be aligned with business vision
* User ID from pool to only access your own when registering attacks or provide login page
* Use of LLM/AI to generate summaries for various report types
* Make report templates available without needing to add attack steps
* Visual dashboard showing key stats or a visual represenation
* Download reports as PDF
* Able to select content based on filters or checkboxes (database reliant)


## Other
### Details
Roles
* Admin
  - Create project
  - Configure industry context
  - Project settings
  - Assign testers
* Tester
  - Select project
  - Document steps
 
1. Attack type - severity - target - tools
2. Add step (number + real-time) - reorder/delete/edit steps as required
3. Upload screenshots - add evidence notes - commands used, linked to specific step
4. Assess technical and business impact - summary
5. Rememdiation - add suggestions/recommendations - status (complete, incomplete)

Reporting
* Report type - fill information (checkboxes alternative) - preview - download
Dashboard
* View statistics - filter by project, author, finding, severity

### Ideas
#### General
* Deliverable is a report
* Provide attacks and remediation steps
Speciality
* Reports and attacks are customised for different systems and industries
* Reports for different audiences/stakeholders
* Educational step-by-step walkthrough (mainly available in full report or for technical stakeholders)

***A single test provides an overview for everyone***

#### Tools/tech and functionality
* JSON / yaml - database storing attack information
* Selection filters - industry, audience
* Jinja2 report templates
* Convert html to PDF - python pipeline
* User input (GUI) for attack data, dashboard showing attacks in progress or attack surface (Kibana?) - multiuser
* Use LLM to summarise sections

#### Report filtering
* All data is stored in the same place - attacks, remediation steps, regulations and law
* Generating report - check boxes/filters for which information to include/print, either by category or customised selection
