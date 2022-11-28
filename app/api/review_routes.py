from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Review
from app.forms import ReviewForm
from .auth_routes import validation_errors_to_error_messages


review_routes = Blueprint('reviews', __name__)

@review_routes.route("/account")
@login_required
def get_my_reviews():
  """
  shows reviews of the account
  """
  filtered_reviews = Review.query.filter(Review.user_id == current_user.id).all()

  if filtered_reviews is not None:
    return {"Reviews": [review.to_dict_my_reviews()
                        for review in filtered_reviews]}, 200


@review_routes.route("/<int:review_id>", methods=["PUT"])
@login_required
def edit_review(review_id):
  form = ReviewForm()
  form['csrf_token'].data = request.cookies["csrf_token"]
  review = Review.query.filter(Review.id == review_id).first()
  if review.user_id == current_user.id:
    if form.validate_on_submit():
      review.review = form.data['review']
      review.ratings = form.data['rating']

      db.session.commit()

      return review.to_dict_my_reviews(), 201
    else:
      return {'errors': validation_errors_to_error_messages(form.errors)}, 400
  else:
    return {'errors': ['Unauthorized! This is not your review']}, 403


@review_routes.route("/<int:review_id>", methods=["DELETE"])
@login_required
def delete_review(review_id):
  """
  logged in user can delete a review by review_id
  """
  review = Review.query.get(review_id)

  if review.user_id is not current_user.id:
    return {
      "errors": "Unauthorized! You are not the owner of this review!"
    }, 403

  if review is None:
    return {"errors":"Review couldn't be found"}, 404

  else:
    db.session.delete(review)
    db.session.commit()
    return {"message":"Successfully deleted"}, 200
