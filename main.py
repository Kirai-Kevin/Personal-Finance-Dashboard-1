import secrets
from quart import Quart, render_template, request, redirect, url_for, session
from motor.motor_asyncio import AsyncIOMotorClient
from bson.objectid import ObjectId
from datetime import date
import bcrypt

app = Quart(__name__, static_folder='static', static_url_path='/static')
app.secret_key = secrets.token_hex(16)  # Change this to a random secret key

# Connect to MongoDB
client = AsyncIOMotorClient('mongodb+srv://finance:finance123@finance.o1wni.mongodb.net/?retryWrites=true&w=majority&appName=finance')
db = client['user_database']
users = db.users

@app.route('/')
async def home():
    return redirect(url_for('login'))

@app.route("/current_date")
async def index():
    current_date = date.today().strftime("%A %B %d, %Y")
    return await render_template("index.html", current_date=current_date)

@app.route('/login', methods=['GET', 'POST'])
async def login():
    if request.method == 'POST':
        form = await request.form
        email = form['email']
        password = form['password']
        
        user = await users.find_one({'email': email})
        
        if user and bcrypt.checkpw(password.encode('utf-8'), user['password']):
            session['user_id'] = str(user['_id'])
            return redirect(url_for('dashboard'))
        else:
            return await render_template('login.html', error='Invalid email or password')
    
    return await render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
async def register():
    if request.method == 'POST':
        form = await request.form
        name = form['name']
        email = form['email']
        password = form['password']
        
        existing_user = await users.find_one({'email': email})
        
        if existing_user:
            return await render_template('register.html', error='Email already exists')
        
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        
        user_id = await users.insert_one({
            'name': name,
            'email': email,
            'password': hashed_password
        })
        
        session['user_id'] = str(user_id.inserted_id)
        return redirect(url_for('dashboard'))
    
    return await render_template('register.html')

@app.route('/dashboard')
async def dashboard():
    if 'user_id' in session:
        user = await users.find_one({'_id': ObjectId(session['user_id'])})
        if user:
            current_date = date.today().strftime("%A %B %d, %Y")
            return await render_template('dashboard.html', current_date=current_date, user_name=user['name'])
    return redirect(url_for('login'))

@app.route('/logout', methods=['GET', 'POST'])
async def logout():
    if request.method == 'POST':
        if 'user_id' in session:
            user_id = session['user_id']
            # Delete the user from the database
            await users.delete_one({'_id': ObjectId(user_id)})
            # Clear the session
            session.clear()
        return redirect(url_for('register'))
    return await render_template('logout.html')

@app.route('/update_form')
async def update_form():
    # Add logic for update form
    return await render_template('form.html')

@app.route('/savings')
async def savings():
    # Add logic for savings page
    return await render_template('savings.html')

if __name__ == '__main__':
    app.run(debug=True)