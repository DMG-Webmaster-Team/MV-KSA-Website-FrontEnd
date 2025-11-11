# Mountain View KAS - Next.js Application

This is a Next.js application for Mountain View KAS. Follow the steps below to set up and run the project locally.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 16 or higher is recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) (npm comes bundled with Node.js)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd mountain-view-kas
   ```

3. Install dependencies:

   Use the node version specified in the .nvmrc file:
   ```bash
   nvm use
   ```

   Install dependencies:
   ```bash
   npm install
   ```

   Or using yarn:
   ```bash
   yarn install
   ```

## Running the Development Server

To start the development server, run the following command:

Using npm:
```bash
npm run dev
```

Or using yarn:
```bash
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Building for Production

To build the application for production, use the following command:

Using npm:
```bash
npm run build
```

Or using yarn:
```bash
yarn build
```

This will create an optimized production build in the `.next` directory.

## Running the Production Build

After building the application, you can start the production server:

Using npm:
```bash
npm run start
```

Or using yarn:
```bash
yarn start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Environment Variables

Ensure you have the required environment variables set up. Create a `.env.local` file in the root directory and add the necessary variables. Refer to the project documentation or team for the required variables.

## Linting and Formatting

To run linting:

Using npm:
```bash
npm run lint
```

Or using yarn:
```bash
yarn lint
```

To format code:

Using npm:
```bash
npm run format
```

Or using yarn:
```bash
yarn format
```

## Folder Structure

The project structure is as follows:

```
├── app/                # Application pages and components
├── public/             # Public assets like images and fonts
├── utils/              # Utility functions
├── messages/           # Localization files
├── styles/             # Global styles
├── next.config.mjs     # Next.js configuration
├── package.json        # Project dependencies and scripts
└── README.md           # Project documentation
```

## Contributing

If you wish to contribute to this project, please follow the standard Git workflow:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

**Important:** Copy the correct values from `.env.example` into your `.env.local` file.  
Make sure `NEXT_PUBLIC_API_BASE_URL` is set to the proper **API base URL** provided in `.env.example`.
