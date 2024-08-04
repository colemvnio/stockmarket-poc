<br />
<div align="center">

# 📈 Stock Market Order Book PoC

A proof-of-concept implementation of a stock market order book with QLDB-like ledger functionality.
</div>

## 📖 Table of Contents

- [🌟 Features](#-features)
- [🏗️ Project Structure](#-project-structure)
- [📋 Prerequisites](#-prerequisites)
- [🚀 Setup & Installation](#-setup--installation)
    - [🔗 Clone the Repository](#1--clone-the-repository)
    - [📦 Install Dependencies](#2--install-dependencies)
    - [🛠️ Environment Configuration](#3--environment-configuration)
- [🔧 Usage](#-usage)
    - [Building the Project](#building-the-project)
    - [Linting](#linting)
    - [Running Tests](#running-tests)
- [🧪 Testing](#-testing)
- [⭐ Star History](#-star-history)

## 🌟 Features

- QLDB-like ledger system for immutable transaction recording
- Order book structure for managing buy and sell orders
- Matching engine for executing trades
- RESTful API for interacting with the order book
- Real-time updates via WebSocket
- Robust error handling and logging
- Implements SOLID principles and design patterns

## 🏗️ Project Structure

```plaintext
stockmarket-poc/
├── src/
│   ├── config/
│   ├── core/
│   │   ├── interfaces/
│   │   ├── models/
│   │   └── types/
│   ├── modules/
│   ├── shared/
│   ├── app.module.ts
│   └── main.ts
├── test/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .eslintrc.js
├── .prettierrc
├── jest.config.js
├── nest-cli.json
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── README.md
```

## 📋 Prerequisites

- **Node.js (v20 or later)**
    - Visit [Node.js](https://nodejs.org/en/) to install.
    - Confirm installation with `$ node -v`.
    - Select the supported version with `$ nvm use`.
- **PNPM (Package Manager)**
    - Install PNPM globally with `$ npm install -g pnpm`.
    - Confirm installation with `$ pnpm -v`.
- **TypeScript**
    - Install TypeScript globally with `$ npm install -g typescript`.
    - Verify installation with `$ tsc -v`.
- **NestJS CLI**
    - Install NestJS CLI globally with `$ npm install -g @nestjs/cli`.
    - Verify installation with `$ nest -v`.
- An IDE that supports TypeScript (e.g., Visual Studio Code, WebStorm).
- PostgreSQL database (for local development)

## 🚀 Setup & Installation

### 1. 🔗 **Clone the Repository:**

```bash
$ git clone https://github.com/colemvnio/stockmarket-poc.git
$ cd stockmarket-poc
```

### 2. 📦 **Install Dependencies:**

Navigate to the project directory and install the necessary packages:

```bash
$ pnpm install
```

### 3. 🛠️ **Environment Configuration:**

Create a `.env` file in the root directory and add the following variables:

```
DATABASE_URL=postgresql://username:password@localhost:5432/stockmarket_poc
PORT=3000
```

Replace `username`, `password`, and `stockmarket_poc` with your PostgreSQL credentials and desired database name.

### 4. 🚀 **Launch the Project:**

Start the development server:

```bash
$ pnpm run start:dev
```

The server will be running at `http://localhost:3000`.

## 🔧 Usage

### Building the Project

To build the project, run:

```bash
$ pnpm run build
```

This command triggers the TypeScript compiler and outputs the transpiled code to the `dist` directory.

### Linting

To lint the project, use:

```bash
$ pnpm run lint
```

For automated lint fixes:

```bash
$ pnpm run lint:fix
```

### Running Tests

To execute all tests, run:

```bash
$ pnpm run test
```

For running tests in watch mode:

```bash
$ pnpm run test:watch
```

## 🧪 Testing

The project includes unit, integration, and e2e tests. To run a specific type of test:

```bash
$ pnpm run test:unit
$ pnpm run test:integration
$ pnpm run test:e2e
```

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=colemvnio/stockmarket-poc&type=Timeline)](https://star-history.com/#colemvnio/stockmarket-poc&Timeline)
