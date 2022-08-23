# 4. Continuous Integration Tool

Date: 2022-08-20

## Status

Accepted

## Context

We intend to use a CI Tool in order to have a pipeline that guarantees
our application is always in a ready-to-deploy state. Some tools available are:

Evaluation of tools:
1. Travis CI

- Pros
- Cons
1. Free Plan is too basic

2. Circle CI
- Pros
- Cons

3. Github Actions
- Pros 
1. Easy to setup (integrated with GH)

- Cons

## Decision

Tool: GitHub Actions
Why?

Pipeline Steps are:
1. Build
2. Unit Test
3. Integration Test
4. E2E Test
5. Deploy (where? Heroku?)

## Consequences

What becomes easier or more difficult to do and any risks introduced by the change that will need to be mitigated.
