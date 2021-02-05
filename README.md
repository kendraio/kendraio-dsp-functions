Kendraio DSP Functions
---

Serverless functions for DSP backend functionality.

## Configure

~~Create a `.env` file with the following information:~~ 
Add the following secrets to Vercel:

    DSP1_AWS_ACCESS_KEY_ID=***
    DSP1_AWS_SECRET_ACCESS_KEY=***
    ACTION_SECRET_ENV=***
    GRAPHQL_ADMIN_SECRET=***

## Deploy

To deploy:

    vercel .

## Function reference

In the API folder there are functions for each action. These are designed to be deployed
as serverless functions and integrated into the GraphQL API on Hasura using Hasura Actions.

    api/
        upload-track.js

