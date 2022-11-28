from app.models import db, Review, environment, SCHEMA
from datetime import datetime

def seed_reviews():
    lemonHoodieReview = Review(
        created_at=datetime.now(),
        product_id=1,
        user_id=2,
        ratings=4,
        review="Very comfortable hoodle. Would recommend for anyone looking to feel cozy at home or warm outdoors. The sweater also washes very well without colors fading. I plan to buy more in the future! Thank you for an amazing product!"
    )
    lemonHoodieReview2 = Review(
        created_at=datetime.now(),
        product_id=1,
        user_id=3,
        ratings=5,
        review="Amazing hoodie, planning to buy more for my friends and family!"
    )
    mandarinShirtReview = Review(
        created_at=datetime.now(),
        product_id=2,
        user_id=1,
        ratings=3,
        review="Okay shirt, nothing special about it."
    )
    mandarinShirtReview2 = Review(
        created_at=datetime.now(),
        product_id=2,
        user_id=3,
        ratings=5,
        review="Great shirt! I love wearing it at home."
    )
    limeShirtReview = Review(
        created_at=datetime.now(),
        product_id=3,
        user_id=4,
        ratings=5,
        review="Amazing shirt! Plan to buy more."
    )
    grapefruitShirtReview1 = Review(
        created_at=datetime.now(),
        product_id=4,
        user_id=5,
        ratings=5,
        review="Amazing shirt! Plan to buy more."
    )
    grapefruitShirtReview2 = Review(
        created_at=datetime.now(),
        product_id=4,
        user_id=1,
        ratings=5,
        review="I love this shirt!"
    )
    grapefruitShirt2Review1 = Review(
        created_at=datetime.now(),
        product_id=5,
        user_id=4,
        ratings=5,
        review="I love this shirt!"
    )
    grapefruitShirt2Review2 = Review(
        created_at=datetime.now(),
        product_id=5,
        user_id=3,
        ratings=5,
        review="Please make more shirts like this!"
    )
    limeshirt2Review1 = Review(
        created_at=datetime.now(),
        product_id=6,
        user_id=3,
        ratings=5,
        review="Please make more shirts like this!"
    )
    limeshirt2Review2 = Review(
        created_at=datetime.now(),
        product_id=6,
        user_id=5,
        ratings=5,
        review="I want more of these shirts!"
    )
    orangeshirt2Review1 = Review(
        created_at=datetime.now(),
        product_id=7,
        user_id=5,
        ratings=5,
        review="I want more of these shirts!"
    )
    orangeshirt2Review2 = Review(
        created_at=datetime.now(),
        product_id=7,
        user_id=1,
        ratings=4,
        review="Amazing!"
    )
    lemonshirt2Review1 = Review(
        created_at=datetime.now(),
        product_id=8,
        user_id=5,
        ratings=5,
        review="I want more of these shirts!"
    )
    lemonshirt2Review2 = Review(
        created_at=datetime.now(),
        product_id=8,
        user_id=4,
        ratings=4,
        review="Nice shirts!"
    )

    db.session.add(lemonHoodieReview)
    db.session.add(lemonHoodieReview2)
    db.session.add(mandarinShirtReview)
    db.session.add(mandarinShirtReview2)
    db.session.add(limeShirtReview)
    db.session.add(grapefruitShirtReview1)
    db.session.add(grapefruitShirtReview2)
    db.session.add(grapefruitShirt2Review1)
    db.session.add(grapefruitShirt2Review2)
    db.session.add(limeshirt2Review1)
    db.session.add(limeshirt2Review2)
    db.session.add(orangeshirt2Review1)
    db.session.add(orangeshirt2Review2)
    db.session.add(lemonshirt2Review1)
    db.session.add(lemonshirt2Review2)
    db.session.commit()

def undo_reviews():
    db.session.execute('TRUNCATE products RESTART IDENTITY CASCADE;')
    db.session.commit()
