# Serverless Template API

A minimal Serverless + TypeScript API template that does not depend on any web framework to work, but start using Middy to structure AWS Lambda handlers and middlewares.

## Key points
- **No framework required:** The project is framework-agnostic — you can use the code as-is in Serverless (AWS Lambda) or adapt it for a conventional server.
- **Middy for handlers:** Middleware and handler composition is implemented using `@middy/core` and the Middy HTTP plugins in `src/main/middy/`.

## Features
- TypeScript-ready structure
- Clean controller/factory separation
- Middy-driven handler composition and middlewares
- S3 client example (`@aws-sdk/client-s3`)

## Quick start

Prerequisites:
- Node.js (v16+ recommended)
- pnpm (optional, you can use npm/yarn)
- Serverless Framework CLI if you want to deploy: `npm i -g serverless`

Install dependencies:

```bash
pnpm install
# or
npm install
# or
yarn install
```

Build TypeScript:

```bash
npx tsc
# or
pnpm exec tsc
```

Deploy (Serverless):

```bash
serverless deploy
```

Run locally

This template doesn't include a local-offline plugin by default; to run Lambda handlers locally consider adding `serverless-offline` or using an AWS Lambda runner of your choice.

## Project structure

Top-level files:
- `serverless.yml` — Serverless Framework configuration
- `tsconfig.json` — TypeScript config

Source layout (important parts):

- `src/main/middy/` — `makeHandler.ts`, `makeRoutesHandler.ts`, and `middlewares/` (where Middy composition lives)
- `src/main/factories/` — factory functions to create controllers
- `src/application/controllers/` — controllers for each route
- `src/application/clients/s3Client.ts` — example S3 client using `@aws-sdk/client-s3`
- `src/application/errors/HttpError.ts` — centralized HTTP error class
- `src/application/types/` — interfaces like `IController`, `IFile`, `IHttp`
- `src/main/functions/` — Lambda function entrypoints wired to handlers

Look at these files to understand how handlers are built and routed. Middy middlewares (parsing, error handling, serialization) are assembled in `src/main/middy/`.

## Where Middy is used (but is optional)

- `src/main/middy/makeHandler.ts` — wraps controller functions with Middy and common middlewares.
- `src/main/middy/makeRoutesHandler.ts` — helper to compose multiple route handlers.
- `src/main/middy/middlewares/errorHandler.ts` — centralized error handling middleware.
