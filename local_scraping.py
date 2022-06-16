from bs4 import BeautifulSoup as BS
from pprint import pprint
from json import dump
from pprint import pprint
from models import Program, db
from random import randint

# etudes/programmes/baccalaureat-en-actuariat

for i in range(70):
    with open('./datas/file' + str(i) + '.html', 'r') as file:
        file_soup = BS(file.read(), 'html.parser')

        subfields = file_soup.select('.programme-etudes')

        program_data = []
        for subfield in subfields:
            href = "https://www.ulaval.ca"  + subfield.attrs.get('href')
            domain = subfield.find(class_='domaines')
            title = subfield.find(class_='titre-programme')
            description = subfield.find(class_='description-programme')
            credits = subfield.find(class_='credits')
            duree = subfield.find(class_='duree')
            print()
            if domain:
                db.session.add(Program(
                    href = href,
                    name = title.getText().strip() if title else ' ',
                    description = description.getText().strip()[100:200] if description else ' ',
                    credits = credits.getText().split()[0].strip() if credits else ' ',
                    domaines =  "-".join([sub.getText() for sub in domain if sub != '\n']),
                    duree = duree.getText().strip() if duree else ' ',
                    university = "Laval",
                    fees = randint(7000, 40000)
                ))


db.session.commit()
                # program_data.append({
                #     'title' : title.getText().strip() if title else ' ',
                #     'description' : description.getText().strip() if description else ' ',
                #     'credits' : credits.getText().split()[0].strip() if credits else ' ',
                #     'domaines' :  "-".join([sub.getText() for sub in domain if sub != '\n']),
                #     'duree' : duree.getText().strip() if duree else ' '
                # })

        # break
