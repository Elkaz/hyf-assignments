## Reflection

### Which auth mechanism would you choose for each scenario?

- **A SPA web app with many users:**  
  I would choose **JWT** because it is simple to use in frontend apps and works well when many users are using the system.

- **A microservice-to-microservice communication scenario:**  
  I would also choose **JWT** because the services can verify the token without checking the database every time.

- **An internal admin tool used by a small team:**  
  I would choose **database-stored tokens** because it is easier to manage and revoke access when the team is small.

### Why would you not use the other mechanisms in those scenarios?

- I would not use **database-stored tokens** for a large SPA or microservices because they need a database lookup on each request.
- I would not always use **JWT** for a small internal admin tool because it is harder to invalidate immediately after login.
- I would not use a more complex solution if the app is small and used by only a few people.

### One security improvement I would like to make next

- One security improvement I would like to add next is **refresh tokens**.  
  I think this would make the authentication system safer and more practical for real use.