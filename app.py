from quart import Quart, render_template, request, jsonify
from aijson import Flow
from dotenv import load_dotenv
import asyncio

load_dotenv()

app = Quart(__name__)

async def run_flow(income, expenses, savings_goal):
    flow = Flow.from_file('flow.ai.yaml')
    flow = flow.set_vars(
        income=income,
        expenses=expenses,
        savings_goal=savings_goal,
        total_expenses=sum(expenses.values())
    )
    
    results = await flow.run()
    return results

@app.route('/')
async def index():
    return await render_template('index.html')

@app.route('/analyze', methods=['POST'])
async def analyze():
    data = await request.json
    income = float(data['income'])
    expenses = {k: float(v) for k, v in data['expenses'].items()}
    savings_goal = float(data['savings_goal'])
    
    results = await run_flow(income, expenses, savings_goal)
    
    return jsonify(results)

""" if __name__ == '__main__':
    app.run(debug=True) """