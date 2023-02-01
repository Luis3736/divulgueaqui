import os
import sqlite3 as sql
from flask import Flask, render_template, request
from flask_mail import Mail
from email_validator import validate_email

EMAIL = os.getenv('MAIL_EMAIL', 'mail.starlightnetwork@gmail.com')
PASSWORD = os.getenv('MAIL_PASSOWRD', 'oanzzfmgtdvmrlyp')
USERNAME = os.getenv('MAIL_EMAIL', 'mail.starlightnetwork@gmail.com')

app = Flask(__name__)
app.config['MAIL_DEFAULT_SENDER'] = EMAIL
app.config['MAIL_PASSWORD'] = PASSWORD
app.config['MAIL_PORT'] = 587
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = USERNAME
mail = Mail(app)


def conDB(command, p=()):
  db = sql.connect('sites.db', check_same_thread=False)
  db.row_factory = sql.Row
  ret = db.execute(command, p).fetchall()
  db.commit()
  db.close()
  return ret


def get_imgs():
  imgs_path = os.path.join(os.getcwd(), 'static', 'imgs', 'channels')
  imgs = os.listdir(imgs_path)

  dct = {}
  for e in imgs:
    dct[e.upper()] = len(os.listdir(os.path.join(imgs_path, e)))

  return dct


def getURLs():
  rows = conDB('SELECT * FROM url')
  urls = {}
  for e in rows:
    urls[e['name']] = e['url']
  return urls


@app.route('/')
def index():
  return render_template('index.html',
                         active='/',
                         imgs=get_imgs(),
                         urls=getURLs())


@app.route('/pacotes')
def pacotes():
  return render_template('pacotes.html',
                         active='/pacotes',
                         imgs=get_imgs(),
                         urls=getURLs())


@app.route('/comandos')
def comandos():
  return render_template('comandos.html',
                         active='/comandos',
                         imgs=get_imgs(),
                         urls=getURLs())


@app.route('/contato', methods=['GET', 'POST'])
def contato():
  if request.method == 'POST':
    email = request.form.get('email')
    if not email:
      return render_template('contato.html',
                             active='/contato',
                             imgs=get_imgs(),
                             urls=getURLs(),
                             erro='Você precisa informar um email')
    try:
      validation = validate_email(email)
      email = validation.email
    except:
      return render_template('contato.html',
                             active='/contato',
                             imgs=get_imgs(),
                             urls=getURLs(),
                             erro='Email inválido')

    assunto = request.form.get('assunto')
    if not assunto:
      return render_template('contato.html',
                             active='/contato',
                             imgs=get_imgs(),
                             urls=getURLs(),
                             erro='Você precisa informar um assunto')

    mensagem = request.form.get('mensagem')
    if not mensagem:
      return render_template('contato.html',
                             active='/contato',
                             imgs=get_imgs(),
                             urls=getURLs(),
                             erro='Você precisa informar uma mensagem')

    mail.send_message(
      sender=('Equipe Star Light Network', app.config['MAIL_DEFAULT_SENDER']),
      body=
      f'Seu email foi enviado com sucesso! Tentaremos responder o mais rápido possível.',
      subject=f'Contato Divulgue Aqui',
      recipients=[email])

    conDB('INSERT INTO mensagens(email, assunto, mensagem) VALUES(?, ?, ?)', (
      email,
      assunto,
      mensagem,
    ))
    id = dict(conDB('SELECT COUNT(*) FROM mensagens')[0])['COUNT(*)']

    mail.send_message(
      sender=('Equipe Star Light Network', app.config['MAIL_DEFAULT_SENDER']),
      body=f'Email: {email}\n\nAssunto: {assunto}\n\n{mensagem}',
      subject=f'Contato id: {id}',
      recipients=[EMAIL])

    return render_template('contato.html',
                           active='/contato',
                           imgs=get_imgs(),
                           sucesso=True,
                           urls=getURLs())

  return render_template('contato.html',
                         active='/contato',
                         imgs=get_imgs(),
                         urls=getURLs())


@app.route('/sobre')
def sobre():
  return render_template('sobre.html',
                         active='/sobre',
                         imgs=get_imgs(),
                         urls=getURLs())


if __name__ == '__main__':
  app.run(debug=False, host='0.0.0.0', port=int(os.getenv('PORT', 8080)))
