### Thoughts and considerations
* It could be a challenge to store the information in such a way that makes it easy to select what to include. 
* It would also be of use to include an LLM (not applicable for our execution, but for the overall idea and future development) for executive summaries or similar based on the information provided (not from the open internet).

* Different people focus on different attacks, but they could have overlapping steps, remediation/suggestions, different headers and information provided - redundancy for methods and remediation, order of the attacks in report
* A user interface to upload info about the attacks would be great, but how to cater to different types of attacks with different length/effort required and if they can be completed in one go - enter step by step, have an attack ID and user ID to login and edit entries
* How the database should store information and retrieve it, which rows/headers to use
* How to choose content to include in generated reports - headers, tags, will offensive workers have to write all the information or is there a way to extract it and patch it together in a seamless way (i.e. you don't have to write a step by step AND a short summary AND a longer summary)

### Notes
* Novelty: report for different audiences, different levels of tehcnical details, how data is shown - filters, language, use parsing or a program to select what to include
  - Only include what people need (want) to see (i.e. different types of stakeholders, or even different industries/businesses - non-profit vs bank vs hospital)
* Report should include: what attacks were conducted
  - Think about visuals - i.e. if you want dashboards or a program that generates a report of some sort
  - Elastic search and Kibana suggested (limited time for this execution)
