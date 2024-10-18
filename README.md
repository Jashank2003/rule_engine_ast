# Rule Engine

## Overview

The Rule Engine is a web-based application designed to facilitate the definition, evaluation, and visualization of logical rules. This application empowers users to create complex rules and understand their structure through visual representation, making it a valuable tool for both developers and non-technical users.

This project utilizes React for the front end and integrates the `react-d3-tree` library for visualizing the rules in a tree-like format. Users can input rules based on specific criteria, and the application will convert these rules into an Abstract Syntax Tree (AST) for visualization.

**Live Demo:** [View the Live Application](YOUR_LIVE_LINK_HERE)

## Features

- **Define Rules**: Create rules based on logical conditions using a simple input format.
- **Combine Rules**: Combine multiple rules using logical operators (AND, OR) to form complex conditions.
- **Evaluate Rules**: Evaluate defined rules against specified data to check their validity.
- **Visualize Rules**: Dynamic visualization of rules in an Abstract Syntax Tree (AST) format for easier comprehension and navigation.
- **Interactive Tree Navigation**: Users can navigate, zoom in, and out of the tree representation of rules.

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/get-npm) (Node package manager)

## Getting Started

Follow these steps to clone the project and run it on your local machine:

1. **Clone the Repository**

   Open your terminal and run the following command to clone the repository:

   ```bash
   git clone https://github.com/Jashank2003/rule_engine_ast.git

   cd YOUR_REPOSITORY_NAME
   
   npm install

   npm run dev

