# Credit Card Validator

This is a Next.js application designed to validate credit card flags by country. Users can select a country and input credit card details to check if the card is valid according to the selected country's rules.

## Features

- User-friendly interface for credit card validation.
- Supports multiple countries for validation.
- Built with Next.js for server-side rendering and optimized performance.

## Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

- Node.js (version 14 or later)
- Docker (for containerization)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/credit-card-validator.git
   ```

2. Navigate to the project directory:

   ```bash
   cd credit-card-validator
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

### Running the Application

You can run the application in development mode using the following command:

```bash
npm run dev
```

Alternatively, you can use Docker to run the application:

1. Build the Docker image:

   ```bash
   docker-compose build
   ```

2. Start the application:

   ```bash
   docker-compose up
   ```

The application will be available at `http://localhost:3000`.

## Usage

- Open the application in your browser.
- Select a country from the dropdown menu.
- Enter the credit card details in the form.
- Click on the "Validate" button to check the validity of the credit card.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.