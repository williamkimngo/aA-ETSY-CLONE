from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, NumberRange


class CartForm(FlaskForm):
  quantity = IntegerField('quantity', validators=[DataRequired(), NumberRange(min=1, max=100, message="Quantity must be between 1 and 100")])
