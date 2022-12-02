from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, IntegerField, SubmitField, TextAreaField, SelectField
from wtforms.validators import DataRequired, Length, NumberRange, InputRequired

ZESTY = ["Orange", "Lemon", "Lime", "Grapefruit"]

class ProductForm(FlaskForm):
    category = SelectField('category', choices=ZESTY, validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired(), Length(min=5, max=255, message="Name must be between 5 and 255 characters long")])
    details = TextAreaField('details', validators=[DataRequired(), Length(min=5, max=2000, message="Details must be between 5 and 2000 characters long")])
    price = DecimalField('price', places=2, validators=[InputRequired(), NumberRange(min=0.10, max=5000, message="Price must be between $0.10 and $5,000")])
    quantity = IntegerField('quantity', validators=[InputRequired(), NumberRange(min=1, max=100, message="Quantity must be between 1 and 100")])
