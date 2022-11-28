from .db import db, environment, SCHEMA, add_prefix_for_prod

class Image(db.Model):
    __tablename__ = "images"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(2000), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')))
    review_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('reviews.id')))

    product = db.relationship("Product", back_populates="images")
    review = db.relationship("Review", back_populates="images")

    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url,
            'productId': self.product_id,
        }
