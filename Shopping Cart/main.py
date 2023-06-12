from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask_mysqldb import MySQL
import os

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'shopping'
mysql = MySQL(app)

app.secret_key = "12346fyhgq490r8fg7"


@app.route('/')
def home():
    cur = mysql.connection.cursor()
    cur.execute("CREATE TABLE IF NOT EXISTS users (email VARCHAR(30), password VARCHAR(30))")
    cur.execute("CREATE TABLE IF NOT EXISTS sellers (email VARCHAR(30), password VARCHAR(30))")
    cur.execute("CREATE TABLE IF NOT EXISTS product (id INT AUTO_INCREMENT, brand VARCHAR(30), product VARCHAR(30), "
                "quantity INT, price INT, image VARCHAR(30),PRIMARY KEY (id))")
    cur.execute("CREATE TABLE IF NOT EXISTS cart ( email varchar(30),brand VARCHAR(30), product VARCHAR(30), "
                "quantity INT, price INT)")
    cur.execute("SELECT * FROM product")
    data = cur.fetchall()
    cur.close()
    print(data)
    return render_template("index.html", data=data)


@app.route("/user_signup", methods=['POST', 'GET'])
def user_signup():
    if request.method == 'GET':
        return render_template("signup.html")
    elif request.method == 'POST':
        cur = mysql.connection.cursor()
        email = request.form['email']
        password = request.form['password']
        cur.execute("INSERT INTO users (email, password) VALUES (%s, %s)", (email, password))
        mysql.connection.commit()
        cur.close()
        return redirect(url_for("user_signup"))


@app.route("/user_signin", methods=['POST', 'GET'])
def user_signin():
    if request.method == 'GET':
        return render_template("signin.html")
    elif request.method == 'POST':
        cur = mysql.connection.cursor()
        email = request.form['email']
        password = request.form['password']
        cur.execute("SELECT * FROM users where email = %s and password = %s", (email, password))
        data = cur.fetchall()  # Retrieve all rows from the query
        cur.close()
        if len(data) == 0:
            flash("Incorrect username or password")
            return redirect(url_for("user_signin"))
        else:
            session['username'] = email
            if 'username' in session:
                username = session['username']
                return redirect(url_for("home", name=username))
            else:
                return render_template("index.html")


@app.route("/seller_signin", methods=['POST', 'GET'])
def seller_signin():
    if request.method == 'GET':
        return render_template("signin.html")
    elif request.method == 'POST':
        cur = mysql.connection.cursor()
        email = request.form['email']
        password = request.form['password']
        cur.execute("SELECT * FROM sellers where email = %s and password = %s", (email, password))
        data = cur.fetchall()  # Retrieve all rows from the query
        cur.close()
        if len(data) == 0:
            flash("Incorrect username or password")
            return redirect(url_for("user_signin"))
        else:
            session['username'] = email
            if 'username' in session:
                username = session['username']
                return redirect(url_for("home", name=username))
            else:
                return render_template("index.html")


@app.route('/add', methods=['POST', 'GET'])
def add():
    if request.method == 'GET':
        return render_template("add.html")
    elif request.method == 'POST':
        brand = request.form['brand']
        product = request.form['product']
        quantity = request.form['quantity']
        price = request.form['price']

        # Check if the 'file' key is present in the request.files dictionary
        if 'image' not in request.files:
            return 'No file part in the request'

        file = request.files['image']

        # Check if the file is selected and has a valid filename
        if file.filename == '':
            return 'No selected file'

        # Perform any necessary validations on the file (e.g., file extension, file size)

        # Save the file to a desired location
        file.save('static/images/' + file.filename)
        filename = file.filename
        # Perform any necessary database operations to store the image information in MySQL
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO product (brand, product, quantity, price, image) VALUES (%s, %s, %s, %s, %s)",
                    (brand, product, quantity, price, filename))

        mysql.connection.commit()
        cur.close()
        return redirect(url_for("add"))


@app.route('/cart', methods=["POST", "GET"])
def cart():
    if request.method == 'GET':
        if 'username' in session:
            cur = mysql.connection.cursor()
            cur.execute("SELECT * from cart where email = %s", (session['username'],))
            data = cur.fetchall()
            cur.close()
            return render_template("cart.html", data=data)
        else:
            return redirect(url_for("user_signin"))
    elif request.method == 'POST':
        id1 = request.form.get('id')
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM product where id = %s", (id1,))
        data = cur.fetchall()  # Retrieve all rows from the query
        print(data)
        brand = data[0][1]
        model = data[0][2]
        price = data[0][4]
        quantity = data[0][3]
        print(brand, model, price)
        cur.execute("INSERT INTO cart values(%s,%s,%s,1,%s)",
                    (session['username'].encode(), brand.encode(), model.encode(), price))
        mysql.connection.commit()
        cur.execute("UPDATE product SET quantity = quantity - 1 WHERE id = %s", (id1,))
        mysql.connection.commit()
        print(id1)
        print(data)
        if quantity == 1:
            cur.execute("DELETE FROM product WHERE id = %s", (id1,))
            mysql.connection.commit()
        cur.close()
        return render_template("cart.html")


@app.route('/bill')
def bill():
    cur = mysql.connection.cursor()
    cur.execute("SELECT brand, product, SUM(quantity) AS total_quantity, SUM(price) AS total_price FROM cart WHERE "
                "email = %s GROUP BY brand, product",
                (session['username'],))  # Pass the value as a tuple
    data = cur.fetchall()
    cur.execute("select sum(price) from cart where email = %s", (session['username'],))
    data1 = cur.fetchall()
    total_price = int(data1[0][0])
    print(total_price)
    cur.execute("delete from cart where email = %s", (session['username'],))
    mysql.connection.commit()
    return render_template("bill.html", data=data, data1=total_price)


@app.route('/search', methods=['POST'])
def search():
    if request.method == 'POST':
        brand = request.form['brand']
        cur = mysql.connection.cursor()
        print(brand)
        cur.execute("select * from product where brand = %s", (brand,))
        data = cur.fetchall()
        return render_template("index.html", data=data)


@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for("home"))


if __name__ == '__main__':
    app.run(debug=True)
