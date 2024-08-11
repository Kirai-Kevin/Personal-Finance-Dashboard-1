# Personal Finance Dashboard

This is a simple personal finance management tool designed for young adults and new graduates(or any other person). It helps users track their income, expenses, and savings goals, providing insights into spending habits and suggesting budget adjustments using AI JSON and AWS Bedrock.

## Features

- Income and expense tracking with categorization
- Financial analysis and insights
- Budget recommendations
- Savings goal progress tracking

## Setup

1. Create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Unix or MacOS
   venv\Scripts\activate     # On Windows
   ```

2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Set up your AWS credentials:
   Create a `.env` file in the project root with the following content:
   ```
   AWS_DEFAULT_REGION=us-west-2
   AWS_ACCESS_KEY_ID=your-access-key-id
   AWS_SECRET_ACCESS_KEY=your-secret-access-key
   ```

4. Run the application:
   ```
   python app.py
   ```

## Usage

Follow the prompts in the terminal to input your financial data and receive insights and recommendations.

## Note

This application uses AI JSON with AWS Bedrock and the Claude model.

## AI JSON Configuration

The `flow.ai.yaml` file contains the AI JSON configuration for this project. It defines the flow of operations, including prompts for financial analysis, budget recommendations, and savings progress calculations.
