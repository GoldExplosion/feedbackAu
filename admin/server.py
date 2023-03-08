# Make sure that flask_login and bcrypt are installed
# from flask_login import login_user, logout_user, current_user, UserMixin
# from werkzeug.security import generate_password_hash, check_password_hash
from flask_bcrypt import Bcrypt
from flask import Flask, redirect, url_for, render_template, request, Response
import io
import xlwt
import psycopg2
import psycopg2.extras

# Position all of this after the db and app have been initialised
app = Flask(__name__)
bcrypt = Bcrypt(app)
user = 'postgres'
password = 'admin'
host = '127.0.0.1'
port = 5432
database = 'testdb'
conn = psycopg2.connect(dbname=database, user=user,
                        password=password, host=host, port=port)
# login_manager = LoginManager()
# login_manager.init_app(app)
# @login_manager.user_loader
# def user_loader(user_id):
#     #TODO change here
#     return User.query.get(user_id)

# A route to display the home page
@app.route('/')
def home():
    #     if request.method=='POST':
    #         # Handle POST Request here
    #         return render_template('index.html')
    return render_template('index.html')

def reverseDate(a):
    date, month, year = a.split('-')
    # print("")
    # print(a, year)
    # print("")
    if len(year)==4:
        return "-".join([year,month,date])
    return a
        

@app.route('/', methods=['POST', 'GET'])
def getData():
    if request.method == 'POST':
        From = request.form['From']
        To = request.form['To']
        # print("\n")
        # print(From, To)
        # print("\n")

        output = io.BytesIO()
        workbook = xlwt.Workbook()
        toiletSh = workbook.add_sheet('toilet feedbacks')
        foodSh = workbook.add_sheet('food feedbacks')
        securitySh = workbook.add_sheet('security feedbacks')
        buildingSh = workbook.add_sheet('building feedbacks')
        cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
        cur.execute("SELECT * from basicInfo INNER JOIN toiletForm on toiletForm.id = basicInfo.id WHERE basicInfo.SubmitTime between \
            '{0}' and '{1}'".format(reverseDate(From), reverseDate(To)))
        toiletF = cur.fetchall()
        cur.execute("SELECT * from basicInfo INNER JOIN foodForm on foodForm.id = basicInfo.id WHERE basicInfo.SubmitTime between \
            '{0}' and '{1}'".format(reverseDate(From), reverseDate(To)))
        foodF = cur.fetchall()
        cur.execute("SELECT * from basicInfo INNER JOIN securityForm on securityForm.id = basicInfo.id WHERE basicInfo.SubmitTime between \
            '{0}' and '{1}'".format(reverseDate(From), reverseDate(To)))

        securityF = cur.fetchall()
        cur.execute("SELECT * from basicInfo INNER JOIN buildingForm on buildingForm.id = basicInfo.id WHERE basicInfo.SubmitTime between \
            '{0}' and '{1}'".format(reverseDate(From), reverseDate(To)))

        buildingF = cur.fetchall()

        toiletSh.write(0, 0, 'Id')
        toiletSh.write(0, 1, 'Building')
        toiletSh.write(0, 2, 'Floor')
        toiletSh.write(0, 3, 'Name')
        toiletSh.write(0, 4, 'Phone')
        toiletSh.write(0, 5, 'Type')
        toiletSh.write(0, 6, 'Cleanliness')
        toiletSh.write(0, 7, 'Complaint')
        toiletSh.write(0, 8, 'Flushworking')
        toiletSh.write(0, 9, 'WashedRegularly')
        toiletSh.write(0, 10, 'WaterLeakage')
        toiletSh.write(0, 11, 'WaterSupply')
        # print(toiletF)
        idx = 0
        for row in toiletF:
            toiletSh.write(idx+1, 0, str(row[0]))
            toiletSh.write(idx+1, 1, str(row[1]))
            toiletSh.write(idx+1, 2, row[2])
            toiletSh.write(idx+1, 3, row[3])
            toiletSh.write(idx+1, 4, row[4])
            toiletSh.write(idx+1, 5, row[5])
            toiletSh.write(idx+1, 6, row[8])
            toiletSh.write(idx+1, 7, row[9])
            toiletSh.write(idx+1, 8, row[10])
            toiletSh.write(idx+1, 9, row[11])
            toiletSh.write(idx+1, 10, row[12])
            toiletSh.write(idx+1, 11, row[13])
            # toiletSh.write(idx+1, 4, row['Phone'])
            idx += 1

        foodSh.write(0, 0, 'Id')
        foodSh.write(0, 1, 'Building')
        foodSh.write(0, 2, 'Floor')
        foodSh.write(0, 3, 'Name')
        foodSh.write(0, 4, 'Phone')
        foodSh.write(0, 5, 'Type')
        foodSh.write(0, 6, 'Ambience')
        foodSh.write(0, 7, 'Cleanliness')
        foodSh.write(0, 8, 'Feedback')
        foodSh.write(0, 9, 'FoodQuality')
        foodSh.write(0, 10, 'FoodTaste')
        foodSh.write(0, 11, 'ServiceQuality')

        idx = 0
        for row in foodF:
            foodSh.write(idx+1, 0, str(row[0]))
            foodSh.write(idx+1, 1, str(row[1]))
            foodSh.write(idx+1, 2, row[2])
            foodSh.write(idx+1, 3, row[3])
            foodSh.write(idx+1, 4, row[4])
            foodSh.write(idx+1, 5, row[5])
            foodSh.write(idx+1, 6, row[8])
            foodSh.write(idx+1, 7, row[9])
            foodSh.write(idx+1, 8, row[10])
            foodSh.write(idx+1, 9, row[11])
            foodSh.write(idx+1, 10, row[12])
            foodSh.write(idx+1, 11, row[13])
            idx += 1

        securitySh.write(0, 0, 'Id')
        securitySh.write(0, 1, 'Building')
        securitySh.write(0, 2, 'Floor')
        securitySh.write(0, 3, 'Name')
        securitySh.write(0, 4, 'Phone')
        securitySh.write(0, 5, 'Type')
        securitySh.write(0, 6, 'SecurityAlertness')
        securitySh.write(0, 7, 'SecurityAvailability')
        securitySh.write(0, 8, 'SecurityDrunk')
        securitySh.write(0, 9, 'SecurityMisbehaving')

        idx = 0
        for row in securityF:
            securitySh.write(idx+1, 0, str(row[0]))
            securitySh.write(idx+1, 1, str(row[1]))
            securitySh.write(idx+1, 2, row[2])
            securitySh.write(idx+1, 3, row[3])
            securitySh.write(idx+1, 4, row[4])
            securitySh.write(idx+1, 5, row[5])
            securitySh.write(idx+1, 6, row[8])
            securitySh.write(idx+1, 7, row[9])
            securitySh.write(idx+1, 8, row[10])
            securitySh.write(idx+1, 9, row[11])
            idx += 1

        buildingSh.write(0, 0, 'Id')
        buildingSh.write(0, 1, 'Building')
        buildingSh.write(0, 2, 'Floor')
        buildingSh.write(0, 3, 'Name')
        buildingSh.write(0, 4, 'Phone')
        buildingSh.write(0, 5, 'Type')
        buildingSh.write(0, 6, 'Cleanliness')
        buildingSh.write(0, 7, 'Feedback')
        buildingSh.write(0, 8, 'CleanlinessFloor')
        buildingSh.write(0, 9, 'Cobwebs')
        buildingSh.write(0, 10, 'Windows')

        idx = 0

        for row in buildingF:
            buildingSh.write(idx+1, 0, str(row[0]))
            buildingSh.write(idx+1, 1, str(row[1]))
            buildingSh.write(idx+1, 2, row[2])
            buildingSh.write(idx+1, 3, row[3])
            buildingSh.write(idx+1, 4, row[4])
            buildingSh.write(idx+1, 5, row[5])
            buildingSh.write(idx+1, 6, row[8])
            buildingSh.write(idx+1, 7, row[9])
            buildingSh.write(idx+1, 8, row[10])
            buildingSh.write(idx+1, 9, row[11])
            buildingSh.write(idx+1, 10, row[12])
            idx += 1

        workbook.save(output)
        output.seek(0)

        return Response(output, mimetype="application/ms-excel", headers={"Content-Disposition": "attachment;filename=feedbacks.xls"})

# TODO preethivi: integrate the QR code function to the server and Generate QR code when they hit sumbit

# TODO preethivi: add a route to display the feedback data

# TODO preethivi: in the feedback display route, add a filter to select feedbacks between selected date

# TODO preethivi: [optional] create a dashboard with visualization for the feedback data

# TODO jivi: connect server with db

# TODO jivi: create route to get specific data from db


if __name__ == '__main__':
    # DEBUG is SET to TRUE. CHANGE FOR PROD
    app.run(port=5001, debug=True)
