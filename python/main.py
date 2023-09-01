from fastapi import FastAPI
from pydantic import BaseModel, Field
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import OperationalError
from sqlalchemy import (
    insert,
    select,
    create_engine,
    Table,
    Column,
    Integer,
    String,
    MetaData,
)

app = FastAPI(title="Test API", version="v1")


# Connect to sqlite and open the users table
engine = create_engine("sqlite:///db.sqlite3")
metadata = MetaData()
Session = sessionmaker(bind=engine)

session = Session()


User = Table(
    "users",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String),
    Column("age", Integer),
)

try:
    User.create(bind=engine)
except OperationalError:
    pass


# Schemas
class UserSchema(BaseModel):
    name: str = Field(max_length=255)
    age: int = Field(ge=1)


# Functions
@app.post("/create", tags=["Create user"])
def create(user: UserSchema):
    stmt = insert(User).values(name=user.name, age=user.age)
    session.execute(stmt)
    session.commit()
    return {"message": "User created successfully."}


@app.get("/list", tags=["Get users"])
def get_users():
    stmt = select(User)
    users = session.execute(stmt)
    response = []
    for user in users.all():
        response.append({"id": user.id, "name": user.name, "age": user.age})
    return {"users": response}
