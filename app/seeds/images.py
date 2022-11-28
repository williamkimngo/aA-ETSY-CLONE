from app.models import db, Image, environment, SCHEMA

def seed_images():
    lemonHoodieImg = Image(
        url="https://i.imgur.com/Y6hhFdY.png",
        product_id=1
    )
    lemonHoodieImg2 = Image(
        url="https://i.imgur.com/357idhb.png",
        product_id=1
    )
    mandarinShirtImg = Image(
        url="https://i.imgur.com/ffaPuG0.png",
        product_id=2
    )
    limeShirtImg = Image(
        url="https://i.imgur.com/60ZOvlX.png",
        product_id=3
    )
    grapefruitImg = Image(
        url="https://i.imgur.com/JFL5WSB.png",
        product_id=4
    )
    grapefruitImg2 = Image(
        url="https://i.imgur.com/GEKC0aq.png",
        product_id=5
    )
    limeShirtImg2 = Image(
        url="https://i.imgur.com/u2Phekj.png",
        product_id=6
    )
    orangeImg2 = Image(
        url="https://i.imgur.com/A90TFbS.png",
        product_id=7
    )
    lemonImg2 = Image(
        url="https://i.imgur.com/TZjAoqd.png",
        product_id=8
    )


    db.session.add(lemonHoodieImg)
    db.session.add(lemonHoodieImg2)
    db.session.add(mandarinShirtImg)
    db.session.add(limeShirtImg)
    db.session.add(grapefruitImg)
    db.session.add(grapefruitImg2)
    db.session.add(limeShirtImg2)
    db.session.add(orangeImg2)
    db.session.add(lemonImg2)
    db.session.commit()

def undo_images():
    db.session.execute('TRUNCATE products RESTART IDENTITY CASCADE;')
    db.session.commit()
