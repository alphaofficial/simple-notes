# Server

A nodejs application that exposes a REST API

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before we get started, we're going to need to make sure we have a few things installed and available on our machine.

#### Node >= 12

##### MacOS

```bash
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

##### Other

See the installation guides available @ nodejs.org:

https://nodejs.org/en/download/package-manager/

### Running the tests

```bash
npm run test
```

### Running the application

```bash
npm run start:dev
```

## General notes about the patterns used

- Onion architecture: The Onion Architecture is a popular architectural pattern that enables maintainable and evolvable software by providing principles and practices for creating modular, testable, and layered applications. It uses the concept of dependency inversion principle.
- Dependency inversion principle: The Dependency Inversion Principle (DIP) is the idea that high level modules should not depend on low level modules; both should depend on abstractions (in our case this can be interfaces or abstract classes). Abstractions should not depend on details. Details should depend upon abstractions. DIP is built on 2 other principles: the Dependency Injection Principle and the Inversion of Control Principle.
- Inversion of control: IoC is the idea that you should not have one part of your code controlling another part. Instead, you should have a third part that controls both. This makes your code more modular and easier to maintain.
- Dependency injection: Dependency injection is the idea that a class should not instantiate its dependencies but should be provided with its dependencies from an external source (for example, a configuration file). This makes your code more modular and easier to maintain.
- Domain Driven Design: Domain-driven design (DDD) is the concept that the structure and language of software code (class names, class methods, class variables) should match the business domain.
