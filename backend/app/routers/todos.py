from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional
from .. import models, schemas
from ..database import get_db

router = APIRouter(prefix="/api/todos", tags=["todos"])


@router.get("", response_model=list[schemas.Todo])
def get_todos(
    category_id: Optional[int] = Query(None),
    priority: Optional[schemas.PriorityEnum] = Query(None),
    completed: Optional[bool] = Query(None),
    sort_by: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(models.Todo)

    if category_id is not None:
        query = query.filter(models.Todo.category_id == category_id)
    if priority is not None:
        query = query.filter(models.Todo.priority == priority.value)
    if completed is not None:
        query = query.filter(models.Todo.completed == completed)

    if sort_by == "due_date":
        query = query.order_by(models.Todo.due_date.asc().nullslast())
    elif sort_by == "priority":
        priority_order = {"high": 1, "medium": 2, "low": 3}
        query = query.order_by(models.Todo.priority)
    elif sort_by == "created_at":
        query = query.order_by(models.Todo.created_at.desc())
    else:
        query = query.order_by(models.Todo.created_at.desc())

    return query.all()


@router.get("/{todo_id}", response_model=schemas.Todo)
def get_todo(todo_id: int, db: Session = Depends(get_db)):
    todo = db.query(models.Todo).filter(models.Todo.id == todo_id).first()
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo


@router.post("", response_model=schemas.Todo)
def create_todo(todo: schemas.TodoCreate, db: Session = Depends(get_db)):
    db_todo = models.Todo(**todo.model_dump())
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo


@router.put("/{todo_id}", response_model=schemas.Todo)
def update_todo(
    todo_id: int, todo_update: schemas.TodoUpdate, db: Session = Depends(get_db)
):
    db_todo = db.query(models.Todo).filter(models.Todo.id == todo_id).first()
    if not db_todo:
        raise HTTPException(status_code=404, detail="Todo not found")

    update_data = todo_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_todo, key, value)

    db.commit()
    db.refresh(db_todo)
    return db_todo


@router.delete("/{todo_id}")
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    db_todo = db.query(models.Todo).filter(models.Todo.id == todo_id).first()
    if not db_todo:
        raise HTTPException(status_code=404, detail="Todo not found")

    db.delete(db_todo)
    db.commit()
    return {"message": "Todo deleted successfully"}


@router.patch("/{todo_id}/toggle", response_model=schemas.Todo)
def toggle_todo(todo_id: int, db: Session = Depends(get_db)):
    db_todo = db.query(models.Todo).filter(models.Todo.id == todo_id).first()
    if not db_todo:
        raise HTTPException(status_code=404, detail="Todo not found")

    db_todo.completed = not db_todo.completed
    db.commit()
    db.refresh(db_todo)
    return db_todo
