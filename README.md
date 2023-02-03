# Serverless Framework Polices

This project serves to illustrate the methodology for establishing a controlled access system through the implementation of policies defined by their respective scopes and assigned roles. To facilitate the authorization process via token verification, the utilization of the jasonwebtoken library was employed. This integration enables the validation of access permissions through the utilization of a middleware component that meticulously scrutinizes all incoming requests and returns an appropriate response indicating the allowance or denial of access.

## Usage

### Deployment

In order to deploy the example, you need to run the following command:

```
$ serverless deploy
```

After running deploy, you should see output similar to:

```bash
Deploying jwt-authorizers to stage dev (us-east-1)

✔ Service deployed to stack jwt-authorizers-dev (132s)

endpoints:
  POST - https://yp6u4w2j4j.execute-api.us-east-1.amazonaws.com/dev/login
  GET - https://yp6u4w2j4j.execute-api.us-east-1.amazonaws.com/dev/users
  POST - https://yp6u4w2j4j.execute-api.us-east-1.amazonaws.com/dev/users
functions:
  authorizer: jwt-authorizers-dev-authorizer (1.3 MB)
  login: jwt-authorizers-dev-login (1.3 MB)
  users-list: jwt-authorizers-dev-users-list (1.3 MB)
  users-create: jwt-authorizers-dev-users-create (1.3 MB)

```

### Invocation

To get the authorization token you can run the following command:

```bash
curl -X POST https://yp6u4w2j4j.execute-api.us-east-1.amazonaws.com/dev/login --silent -H 'Content-Type: application/json' --data '{"username":"user", "password":"user"}'
```

Which should result in response similar to the following:

```json
{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJ1c2VybmFtZSI6InVzZXIiLCJzY29wZXMiOlsidXNlcnM6cG9zdCJdfSwiaWF0IjoxNjc1NDY0OTY1LCJleHAiOjE2NzU0NjUyNjV9.2iFqc_XYmrARzPXsVv_0X3Py3sIbbZ03k6YPVgQN5WQ"}
```

with this token you can test the endpoints allowed to this user.
### Local development

You can invoke your function locally using serverless-offline plugin.

```bash
serverless offline
```

Which should result in response similar to the following:

```bash
Starting Offline at stage dev (us-east-1)

Offline [http for lambda] listening on http://localhost:3002
Function names exposed for local invocation by aws-sdk:
           * authorizer: jwt-authorizers-dev-authorizer
           * login: jwt-authorizers-dev-login
           * users-list: jwt-authorizers-dev-users-list
           * users-create: jwt-authorizers-dev-users-create
Configuring Authorization: users authorizer
Configuring Authorization: users authorizer

   ┌────────────────────────────────────────────────────────────────────────────────┐
   │                                                                                │
   │   POST | http://localhost:3000/dev/login                                       │
   │   POST | http://localhost:3000/2015-03-31/functions/login/invocations          │
   │   GET  | http://localhost:3000/dev/users                                       │
   │   POST | http://localhost:3000/2015-03-31/functions/users-list/invocations     │
   │   POST | http://localhost:3000/dev/users                                       │
   │   POST | http://localhost:3000/2015-03-31/functions/users-create/invocations   │
   │                                                                                │
   └────────────────────────────────────────────────────────────────────────────────┘

Server ready: http://localhost:3000 🚀
```
now you can test all endpoints on your local server.