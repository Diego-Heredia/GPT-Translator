# ChatGPT-Powered Translation App

## Overview

This project, a clone of Google Translate, is enhanced with the capabilities of ChatGPT's API. It features a front-end built with Vite and TypeScript, and a back-end developed using Node.js and Express. The application integrates ChatGPT's API for an innovative translation experience.

## Screenshots

## Traductor

![Traductor](/Assets/Vite%20_%20React%20_%20TS.jpeg)

### Demo Video

![Video-Traductor](/Assets/GPT%20Translate%20on%20Action.mp4)

## Features

- Real-time translation
- Integration with ChatGPT API for advanced language processing
- Responsive and user-friendly interface

## Environment Setup

In the `Back-end` directory, a `.env` file manages environment variables:

```
PORT='[desired-port]'
OPENAI_API_KEY='[your-openai-api-key]'
```

Replace `[desired-port]` and `[your-openai-api-key]` with your specific configurations.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Diego-Heredia/GPT-Translator
   ```
2. Navigate to the front-end folder and install dependencies:
   ```bash
   cd Front-end
   npm install
   ```
3. Navigate to the back-end folder and install dependencies:
   ```bash
   cd Back-end
   npm install
   ```

### Running the Application

1. Start the front-end server:
   ```bash
   cd Front-end
   npm run dev
   ```
2. Start the back-end server:
   ```bash
   cd Back-end
   npm start
   ```

## Usage

To use the ChatGPT API for translations, send a request to the backend endpoint which utilizes the `translate` function. This function integrates the ChatGPT API to process and translate the text input. Provide the input text and target language as parameters in your request. The backend service then communicates with the ChatGPT API and returns the translated text.

## Contributing

Contributions to this project are welcome. If you have suggestions for improvement or would like to contribute code, please feel free to create a pull request.
