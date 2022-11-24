from flask_wtf import FlaskForm
from wtforms.validators import InputRequired
from wtforms.fields.html5 import URLField

class ImageForm(FlaskForm):
    url = URLField('url', validators=[InputRequired()])
