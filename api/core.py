from fastapi import FastAPI, Depends
from sqlalchemy import Integer, VARCHAR, Column, create_engine
from sqlalchemy.orm import sessionmaker, declarative_base,Session
from pydantic import BaseModel
import os

DATABASE_URL = os.environ["DATABASE_URL"]
IS_LOGIN_ENABLED = os.getenv("IS_LOGIN_ENABLED", "false")
engine = create_engine(DATABASE_URL)

LOGIN_ENABLED = "no"

sessionlocal = sessionmaker(autoflush=False, autocommit=False, bind=engine)
base = declarative_base()

class cc_users(base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, nullable=False)

base.metadata.create_all(bind=engine)

class check_data(BaseModel):
    id : int

app = FastAPI()

def get_db():
    db = sessionlocal()
    try:
        yield db
    finally:
        db.close()

@app.post('/k')
async def key():
    return {"key":LOGIN_ENABLED}

@app.post('/p')
async def post(data: check_data, db: Session = Depends(get_db)):
    user_id = data.id

    if_user_exists = db.query(cc_users).filter(cc_users.id == user_id).first()

    if if_user_exists:
        return {"status" : "user already exists"}

    create_user = cc_users(id=user_id)
    db.add(create_user)
    db.commit()

    return {"status" : "successfully created a user"}

@app.delete('/d')
async def delete(data: check_data, db :Session = Depends(get_db)):
    user_id = data.id

    if_user_exists = db.query(cc_users).filter(cc_users.id == user_id).first()
    
    if if_user_exists:
        db.delete(if_user_exists)
        db.commit()

        return {"status" : "succesfully deleted a user"}
    else:
        return {"status" : "user not exists"}

@app.get('/c')
async def CheckConnection():
    return {"status": "success"}

@app.post('/l')
async def login(data: check_data, db: Session = Depends(get_db)):
    user_id = data.id
    
    if_user_exists = db.query(cc_users).filter(cc_users.id == user_id).first()
    if if_user_exists:
        return {"status": "login"}
    else:
        return {"status": "user not exists"}
