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
        url="https://i.imgur.com/TZjAoqd.png",
        product_id=7
    )
    lemonImg2 = Image(
        url="https://i.imgur.com/A90TFbS.png",
        product_id=8
    )
    Orangechain1 = Image(
        url="https://i.etsystatic.com/16699213/r/il/db59d0/4232249730/il_794xN.4232249730_igqc.jpg",
        product_id=9
    )
    Orangechain2 = Image(
        url="https://i.etsystatic.com/16699213/r/il/dfa379/2519846820/il_794xN.2519846820_tc27.jpg",
        product_id=9
    )
    Orangekeychain = Image(
        url="https://i.etsystatic.com/8663998/r/il/02ee1c/875148860/il_794xN.875148860_g6qa.jpg",
        product_id=10
    )
    Orangekeychain2 = Image(
        url="https://i.etsystatic.com/8663998/r/il/a3e1a2/874920931/il_794xN.874920931_id7o.jpg",
        product_id=10
    )
    lemoncup1 = Image(
        url="https://i.etsystatic.com/23586425/r/il/996e00/2948914141/il_794xN.2948914141_c3s7.jpg",
        product_id=11
    )
    lemoncup2 = Image(
        url="https://i.etsystatic.com/23586425/r/il/69a68d/2948913957/il_794xN.2948913957_igl2.jpg",
        product_id=11
    )
    lemonplush1 = Image(
        url="https://i.etsystatic.com/9341142/r/il/0746bd/4027061661/il_794xN.4027061661_jkis.jpg",
        product_id=12
    )
    lemonplush2 = Image(
        url="https://i.etsystatic.com/9341142/r/il/034c8b/3979405276/il_794xN.3979405276_7rp1.jpg",
        product_id=12
    )
    limechain1 = Image(
        url="https://i.etsystatic.com/8663998/r/il/e41c8a/874920163/il_794xN.874920163_fzyt.jpg",
        product_id=13
    )
    limechain2 = Image(
        url="https://i.etsystatic.com/8663998/r/il/25265e/874920037/il_794xN.874920037_lqcm.jpg",
        product_id=13
    )
    limeearring1 = Image(
        url="https://i.etsystatic.com/25393405/r/il/8b2a98/3781140645/il_794xN.3781140645_iog9.jpg",
        product_id=14
    )
    limeearring2 = Image(
        url="https://i.etsystatic.com/25393405/r/il/cf1334/3781140747/il_794xN.3781140747_gjwp.jpg",
        product_id=14
    )
    grapesoap1 = Image(
        url="https://i.etsystatic.com/29240110/r/il/1018df/3685234645/il_794xN.3685234645_gcsg.jpg",
        product_id=15
    )
    grapesoap2 = Image(
        url="https://i.etsystatic.com/29240110/r/il/e138c1/3637617046/il_794xN.3637617046_nunn.jpg",
        product_id=15
    )
    grapepic1 = Image(
        url="https://i.etsystatic.com/23256673/r/il/a0b40a/3360348042/il_794xN.3360348042_3p6p.jpg",
        product_id=16
    )
    grapepic2 = Image(
        url="https://i.etsystatic.com/23256673/r/il/734cec/3360339790/il_794xN.3360339790_afd8.jpg",
        product_id=16
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

    db.session.add(Orangechain1)
    db.session.add(Orangechain2)
    db.session.add(Orangekeychain)
    db.session.add(Orangekeychain2)
    db.session.add(lemoncup1)
    db.session.add(lemoncup2)
    db.session.add(lemonplush1)
    db.session.add(lemonplush2)
    db.session.add(limechain1)
    db.session.add(limechain2)
    db.session.add(limeearring1)
    db.session.add(limeearring2)
    db.session.add(grapesoap1)
    db.session.add(grapesoap2)
    db.session.add(grapepic1)
    db.session.add(grapepic2)

    db.session.commit()

def undo_images():
    db.session.execute('TRUNCATE products RESTART IDENTITY CASCADE;')
    db.session.commit()
