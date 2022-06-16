from flask import Flask, jsonify, request, make_response, redirect, url_for
from flask_cors import CORS
from flask_migrate import Migrate
from models import db, Program

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://kaba:ikeecode@localhost/kaba'
app.config['SECRET_KEY'] = "xJxExSxUxIxSxKxAxBxAx"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True

db.init_app(app)
CORS(app)
migrate = Migrate(app, db)



@app.route('/<string:name>/', methods=['GET'])
def university(name):
    data = []
    programs = Program.query.filter_by(university=name)
    for program in programs:
        data.append({
            'href' : program.href,
            'name' : program.name,
            'description' : program.description,
            'credits' : program.credits,
            'duree' : program.duree,
            'domaines' : program.domaines,
            'fees' : program.fees
        })

    return jsonify(data)


# affiche les differents specialites disponible
@app.route('/<string:name>/programs/', methods=['GET'])
def university_programs(name):
    data = []
    programs = Program.query.filter_by(university=name)
    for program in programs:
        data.append(program.domaines)

    data = list(set(data))

    return jsonify(data)



# afficher tous les programmes d'une specialites
@app.route('/<string:name>/programs/<string:xprogram>', methods=['GET'])
def laval_program(name, xprogram):
    data = []
    programs  = Program.query.filter_by(university=name, domaines=xprogram)

    for program in programs:
        data.append({
            'href' : program.href,
            'name' : program.name,
            'description' : program.description,
            'credits' : program.credits,
            'duree' : program.duree,
            'domaines' : program.domaines,
            'fees' : program.fees
        })

    return jsonify(data)

# afficher tous les programmes d'une specialites par ordre
@app.route('/<string:name>/programs/<string:xprogram>/sorted/<string:sorter>', methods=['GET'])
def sorted_program(name, xprogram, sorter):
    data = []
    programs = None
    if sorter.strip() == 'fees':
        programs  = Program.query.filter_by(university=name, domaines=xprogram).order_by(Program.fees)

    elif sorter.strip() == 'duree':
        programs  = Program.query.filter_by(university=name, domaines=xprogram).order_by(Program.duree)

    elif sorter.strip() == 'credits':
        programs  = Program.query.filter_by(university=name, domaines=xprogram).order_by(Program.credits)

    for program in programs:
        data.append({
            'href' : program.href,
            'name' : program.name,
            'description' : program.description,
            'credits' : program.credits,
            'duree' : program.duree,
            'domaines' : program.domaines,
            'fees' : program.fees
        })
    return jsonify(data)

@app.route('/<string:name>/programs/', methods=['POST'])
def post_program(name):
    data = request.get_json()
    # print(data)
    if data:
        db.session.add(Program(
            university = name if name else data.get('university'),
            name = data.get('name'),
            description = data.get('description'),
            credits = data.get('credits'),
            duree = data.get('duree'),
            domaines = data.get('domaines'),
            href = data.get('href')
        ))

        db.session.commit()

        return jsonify({'message': 'posted'})


if __name__ == '__main__':
    app.run(debug=True)
