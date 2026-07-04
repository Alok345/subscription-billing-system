<p align="center">
  <a href="https://github.com/Alok345/subscription-billing-system" target="_blank">
    <img src="https://img.shields.io/badge/Subscription%20Billing%20System-Alok345-blueviolet?style=for-the-badge&logo=nestjs&logoColor=white" alt="Subscription Billing System by Alok345">
  </a>
</p>

<h1 align="center">🚀 Subscription Billing System</h1>

<p align="center">
  A robust and scalable backend system for managing user subscriptions, billing cycles, and payment processing, built with NestJS and MySQL.
</p>

<p align="center">
  <a href="https://github.com/Alok345/subscription-billing-system/blob/main/LICENSE" target="_blank">
    <img src="https://img.shields.io/github/license/Alok345/subscription-billing-system?style=for-the-badge&color=blueviolet" alt="License">
  </a>
  <a href="https://github.com/Alok345/subscription-billing-system/issues" target="_blank">
    <img src="https://img.shields.io/github/issues/Alok345/subscription-billing-system?style=for-the-badge&color=blueviolet" alt="Issues">
  </a>
  <a href="https://github.com/Alok345/subscription-billing-system/stargazers" target="_blank">
    <img src="https://img.shields.io/github/stars/Alok345/subscription-billing-system?style=for-the-badge&color=blueviolet" alt="Stars">
  </a>
</p>

---

## ✨ Project Overview

Welcome to the **Subscription Billing System**, a powerful and efficient backend application designed to streamline the management of recurring subscriptions and billing processes. Developed by Alok345 using the progressive [NestJS framework](https://nestjs.com/), this system provides a robust foundation for handling various aspects of a subscription-based service.

This project offers a clear, modular architecture, comprehensive API documentation via Swagger, and a scalable database design leveraging TypeORM with MySQL. It's engineered to be a reliable and easily extensible solution for businesses aiming to build a solid and automated billing infrastructure.

## 🌟 Key Features

This system is built with a focus on core billing functionalities, offering:

-   **Subscription Plan Management**: Define, update, and manage various subscription tiers and pricing models.
-   **User Subscription Lifecycle**: Efficiently track user subscriptions from activation to renewal and cancellation.
-   **Billing Cycle Automation**: Automate the processing of billing periods and trigger payment events (integration-ready).
-   **RESTful API**: A well-structured and documented API to seamlessly integrate with frontend applications or other microservices.
-   **Data Validation & Transformation**: Robust input validation and data transformation using `class-validator` and `class-transformer` for data integrity.
-   **Database Persistence**: Reliable and performant data storage powered by `TypeORM` and `MySQL2`.
-   **Interactive API Documentation**: Explore and test all API endpoints effortlessly with built-in `Swagger UI`.
-   **Configurable Environment**: Flexible environment management using `@nestjs/config` for easy setup across different stages.
-   **TypeScript-first Development**: Enhanced code quality and developer experience through strong typing.

## 🛠️ Technology Stack

This project leverages a modern and robust technology stack to ensure performance, scalability, and maintainability.

| Category          | Technologies                                                                                                                                                                                                    |
| :---------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Backend Core**  | ![NestJS](https://img.shields.io/badge/NestJS-EE4C4C?style=for-the-badge&logo=nestjs&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) |
| **Database**      | ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white) ![TypeORM](https://img.shields.io/badge/TypeORM-FF4400?style=for-the-badge&logo=typeorm&logoColor=white)     |
| **API Docs**      | ![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)                                                                                                        |
| **Utilities**     | ![Day.js](https://img.shields.io/badge/Day.js-F5DA52?style=for-the-badge&logo=day.js&logoColor=black) ![Class Validator](https://img.shields.io/badge/Class--Validator-blue.svg?style=for-the-badge)            |
| **Development**   | ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-F7BA3E?style=for-the-badge&logo=prettier&logoColor=black) ![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)   |

## 📂 Project Structure

The project follows a standard NestJS modular architecture, promoting maintainability, scalability, and clear separation of concerns.

```
.
├── .gitignore
├── .prettierrc
├── .vscode/                 # VS Code specific settings
├── database/                # Database schema and seed scripts
│   ├── schema.sql           # Defines database tables and relationships
│   └── seed.sql             # Populates the database with initial data
├── eslint.config.mjs        # ESLint configuration for code quality
├── nest-cli.json            # NestJS CLI configuration
├── package-lock.json
├── package.json             # Project dependencies and scripts
├── src/                     # Source code of the NestJS application
│   ├── main.ts              # Application entry point
│   ├── app.module.ts        # Root application module
│   ├── ...                  # Feature modules (e.g., users, subscriptions, billing)
│   └── ...                  # Services, controllers, entities, DTOs, etc.
├── test/                    # Test files (unit and end-to-end tests)
├── tsconfig.build.json
└── tsconfig.json            # TypeScript configuration
```

## 🚀 Getting Started

Follow these steps to get your local development environment up and running.

### Prerequisites

Ensure you have the following installed on your machine:

-   **Node.js**: `^18.13.0` or higher (LTS recommended)
-   **npm** or **Yarn**: npm comes with Node.js; Yarn can be installed separately.
-   **MySQL Server**: A running instance of MySQL.

### Installation

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/Alok345/subscription-billing-system.git
    cd subscription-billing-system
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    # or
    yarn install
    ```

### Configuration

The project uses `@nestjs/config` for environment variable management.

1.  **Create `.env` file**:
    Duplicate the provided example environment file:

    ```bash
    cp .env.example .env
    ```

2.  **Edit `.env` variables**:
    Open the newly created `.env` file and adjust the configuration variables, especially for your database connection:

    ```dotenv
    # Application Configuration
    APP_PORT=3000

    # Database Configuration (MySQL)
    DATABASE_TYPE=mysql
    DATABASE_HOST=localhost
    DATABASE_PORT=3306
    DATABASE_USERNAME=root
    DATABASE_PASSWORD=your_mysql_root_password
    DATABASE_NAME=subscription_billing
    ```
    > **Note**: For production environments, it is highly recommended to create a dedicated MySQL user with minimal necessary privileges instead of using the `root` user.

### Database Setup

This project uses MySQL for data persistence. You'll need to create the database and, optionally, seed it with initial data.

1.  **Create Database Schema**:
    Run the following script to create the `subscription_billing` database and its necessary tables as defined in `database/schema.sql`:

    ```bash
    npm run db:create
    ```
    This command uses the `mysql` client directly. Ensure `mysql` is installed and added to your system's PATH. If you encounter permission errors, verify your `root` user's password in the `.env` file and that the `root` user has appropriate privileges to create databases.

2.  **Seed Initial Data (Optional)**:
    If you wish to populate your database with initial data (e.g., default subscription plans, example users), run:

    ```bash
    npm run db:seed
    ```
    This command executes `database/seed.sql`.

## 🚀 Running the Application

Choose the mode that fits your needs:

### Development Mode

This mode is ideal for development, featuring hot-reloading for rapid iteration.

```bash
npm run start:dev
```
The application will be accessible at `http://localhost:3000` (or `APP_PORT` from your `.env`). Any changes to your source code will automatically recompile and restart the server.

### Production Mode

For deployment and production environments, build the application first and then run the compiled JavaScript.

```bash
npm run build
npm run start:prod
```
The `build` command compiles the TypeScript code into JavaScript in the `dist` directory. The `start:prod` command then runs the optimized application.

### API Documentation (Swagger UI)

Once the application is running (in any mode), you can access the interactive API documentation provided by Swagger UI at:

👉 [http://localhost:3000/api](http://localhost:3000/api)

This interface allows you to explore all available endpoints, their required parameters, and expected responses, making API integration and testing straightforward.

## 🧪 Running Tests

This project includes a comprehensive test suite to ensure functionality and prevent regressions.

-   **Unit Tests**:
    ```bash
    npm run test
    ```
    Executes unit tests using Jest.

-   **End-to-End (E2E) Tests**:
    ```bash
    npm run test:e2e
    ```
    Runs end-to-end tests to verify full system flows and API interactions.

-   **Test Coverage**:
    ```bash
    npm run test:cov
    ```
    Generates a detailed test coverage report.

## 🤝 Contributing

Contributions are always welcome! If you have suggestions for improvements, new features, or bug fixes, please feel free to:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes and ensure tests pass.
4.  Commit your changes (`git commit -m 'feat: Add new feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

Please ensure your code adheres to the project's coding style and includes relevant tests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

This project is developed and maintained by:

**Alok345**

-   GitHub: [@Alok345](https://github.com/Alok345)

---