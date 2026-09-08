# Calculator Project Documentation

## Overview

This project is a browser-based calculator built with React and TypeScript. It provides a responsive, keyboard-style calculator interface for entering numeric values, performing basic arithmetic, and viewing formatted results.

## Key Features

- Addition, subtraction, multiplication, and division
- Decimal input
- Sign toggle and percentage conversion
- Clear and backspace controls
- A maximum of 10 entered digits per amount
- Temporary input-limit hint that disappears after three seconds
- Space-separated thousands formatting, such as `1 234 567.89`
- Dot (`.`) decimal separator
- Division-by-zero error handling
- Accessible button labels and calculator output
- Circular, responsive keypad layout

## Technical Stack

- React 19
- TypeScript 6
- Vite 8
- Vitest 5
- Testing Library for React
- jsdom for DOM-based tests
- Oxlint
- Native `Intl.NumberFormat` for result formatting

## Project Structure

```text
src/
  components/       React calculator UI components and component specs
  hooks/            Calculator state hook and hook specs
  styles/           Calculator-specific CSS
  utils/            Calculation logic, formatting, constants, and specs
  test/             Shared Vitest setup
  App.tsx           Application view
  main.tsx          React application entry point
```

The main responsibilities are separated as follows:

- `useCalculator` manages display state and user actions.
- `calculatorLogic` performs arithmetic and formats completed numeric results.
- `Display` formats values for presentation while leaving stored values unchanged.
- `Button` and `ButtonGrid` render the keypad and forward button input.
- `Calculator` composes the display and keypad.

## Setup

### Prerequisites

Install Node.js and npm. Verify they are available:

```bash
node --version
npm --version
```

### Install Dependencies

From the repository root, run:

```bash
npm install
```

### Run the Development Server

Start Vite with hot module replacement:

```bash
npm run dev
```

Open the local URL printed by Vite, normally:

```text
http://localhost:5173/
```

### Build for Production

Run TypeScript validation and create a production bundle:

```bash
npm run build
```

### Run Tests

Run the complete Vitest suite once:

```bash
npm test
```

Tests are colocated with the source files and cover utility functions, hook behavior, UI components, application rendering, and the application entry point.

### Run Linting

Check the project with Oxlint:

```bash
npm run lint
```

## Usage Guide

1. Click number buttons to enter the first amount.
2. Click `.` to enter a decimal value.
3. Click an arithmetic operator: `+`, `−`, `×`, or `÷`.
4. Enter the second amount.
5. Click `=` to calculate and display the result.
6. Use `AC` to reset the calculator.
7. Use `⌫` to remove the last entered character.
8. Use `±` to switch the current value between positive and negative.
9. Use `%` to divide the current value by 100 and begin a new entry.

The calculator blocks additional digits after 10 digits have been entered for the current amount. Backspace, clear, operators, and other editing controls remain available. Completed values are displayed with spaces between groups of three digits, but formatting is presentation-only and does not change the numeric values used for calculations.
