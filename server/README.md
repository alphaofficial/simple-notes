# notion-clone with DDD

🧅 this is a sample project to demonstrate implements Onion architecture and domain driven design patterns with Typescript. It's a work in progress.

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

### Installing

You should have docker installed locally.
Navigate to the project folder and start the docker containers

```bash
docker-compose up -d
```

This will start the following containers:

- Postgres (Database)

### Running the tests

```bash
npm run test
```

```bash
npm run test:integration
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

### Why use these patterns?

Physicist call it entropy and we Engineers/Developers call it complexity.
Software evolves towards complexity.
As more features are added, as more changes are made, as more bugs are fixed, as more people work on the code, the code becomes more complex.
Examples of such complexities can be obscurity (looking at some code and finding that it’s too hard to understand), rigidity/ripple (When a simple code change means you have to make modifications in several other parts of your code), cognitive load (the mental effort users spend while reading the code - hard to comprehend), and so on.
Minimising complexity is one of the main goals of software architecture patterns. The patterns mentioned above are all about reducing complexity. They are all about making your code more modular and easier to maintain. They are all about making your code more testable, more flexible and easier to change.
The patterns are platform agnostic and are built on fundermental ideas like SOLID, DRY, etc.
