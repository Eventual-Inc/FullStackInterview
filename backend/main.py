from fastapi import FastAPI
from pydantic import BaseModel
import uuid

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

data_store = {"0": {"name": "Test", "description": "This is a test item"}}


class Item(BaseModel):
    name: str
    description: str


@app.post("/create-item/")
def create_item(item: Item):
    item_id = str(uuid.uuid4())
    data_store[item_id] = item
    return {"item_id": item_id, "item": item}


@app.get("/items/{item_id}")
def get_items(item_id: str):
    item = data_store.get(item_id)
    if item:
        return {"item_id": item_id, "item": item}
    return {"error": "Item not found"}, 404
