from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from marshmallow import Schema, fields

# from dotenv import load_dotenv

from config import db, bcrypt

class User(db.Model, SerializerMixin):
  __tablename__ = "user"
  id = db.Column(db.Integer, primary_key=True)
  first_name = db.Column(db.String, nullable=False)
  last_name = db.Column(db.String, nullable=False)
  email = db.Column(db.String, unique=True, nullable=False)
  phone_number = db.Column(db.String)
  _password_hash = db.Column(db.String)
  admin = db.Column(db.String, default = False)

  @hybrid_property
  def password_hash(self):
    raise Exception("You cannot view the password hash.")
    return self._password_hash

  #user.password_haseh('cow')
  @password_hash.setter
  def password_hash(self, password):
    if len(password) < 8:
      raise ValueError("Passwords must be 8 or more characters")
    password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
    self._password_hash = password_hash.decode('utf-8') 

  def authenticate(self, password):
    return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
  
  race_signups = db.relationship('RaceSignup', back_populates='user', uselist=False)
  credit_card_info = db.relationship('CreditCardInfo', back_populates='user') 

  serialize_rules = ('-_password_hash')

  def __repr__(self):
    return f'<User id={self.id} first_name={self.first_name} last_name={self.last_name} email={self.email}>'
  
class UserSchema(Schema):
  id = fields.Int()
  first_name = fields.Str(required=True)
  last_name = fields.Str(required=True)
  email = fields.Email(required=True)
  phone_number = fields.Str()
  password = db.Column(db.String)
  
# user_schema = UserSchema()