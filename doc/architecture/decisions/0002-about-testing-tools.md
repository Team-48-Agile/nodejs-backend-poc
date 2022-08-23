# 2. About testing tools

Date: 2022-08-20

## Status

Accepted

## Context
Test pyramid

We need to add tests to our app. Our testing strategy consists of:
- Testing the controller endpoints with unit and integration tests
- Testing the services with unit tests
- Testing the client calls and library calls with unit tests mocking the third-party APIs and Libraries
- Testing the app end to end

- For Unit Testing three libraries were evaluated:

###**[Mocha](https://mochajs.org/)**
Unit Testing framework that relies on third-party frameworks for
assertions, mocking and spying. It has been around since 2011 so it
has a widespread community.

- Pros
- Cons

###**[Jest](https://jestjs.io)**
Framework developed and maintained by facebook, focuses on simplicity,
zero configuration, performance by running tests in parallel, and built
in assertion, matchers and mocking tools. It also adds a built in code coverage
collector with no need for extra configuration.

- Pros
- Cons

- Helper libraries for matchers, assertions, spies, mocks and stubs:

###**[Sinon](https://sinonjs.org/)**
Sinon is a standalone library for creating test doubles which
help isolating unit tests from external dependencies. It works
with both Jest and Mocha. 

With Sinon you can do things such as:
- Mock HTTP Requests 
- Stub endpoint responses
- Create spies to check method calls
- Mock database endpoints

- Pros
- Cons

###**[Chai](https://www.chaijs.com/)**
Chai is an assertion library that has an API that
helps the developer create assertions both in the TDD
and BDD style. It can be both used with Jest and Mocha.

- Pros
- Cons

###**[Supertest](https://github.com/visionmedia/supertest)**
Supertest is a library for testing HTTP Calls. It is an abstraction
on top of another library called Superagent. With it you can create
http servers listening on any port and test synchronous/asynchronous
calls. It works with any testing framework.

- Pros
- Cons

## Decision

1. JEST as a standard unit testing library. Because it already
has everything needed as built in and requires minimal configuration. 

2. Even though JEST has built in assertions, Chai provides more semantic
assertions, we can still use it when needed. 

3. Supertest provides an easy way to test asynchronous endpoints, we can
easy test our routes with it.

## Consequences
