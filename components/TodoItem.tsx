
import React, { useState, useRef, useEffect } from 'react';
import { Todo } from '../types';
import { EditIcon, DeleteIcon, SaveIcon } from './Icons';
import { Button } from './ui/Button';
import { Checkbox } from './ui/Checkbox';
import { Input } from './ui/Input';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    const trimmedText = editText.trim();
    if (trimmedText && trimmedText !== todo.text) {
      onEdit(todo.id, trimmedText);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  const checkboxId = `todo-${todo.id}`;

  return (
    <li className="group flex items-center p-2 rounded-lg transition-colors hover:bg-accent">
      <Checkbox
        id={checkboxId}
        checked={todo.completed}
        onCheckedChange={() => onToggle(todo.id)}
        aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
      />
      <div className="flex-grow ml-4">
        {isEditing ? (
          <Input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            className="h-8"
          />
        ) : (
          <label
            htmlFor={checkboxId}
            className={`cursor-pointer transition-colors ${
              todo.completed ? 'line-through text-muted-foreground' : ''
            }`}
          >
            {todo.text}
          </label>
        )}
      </div>
      <div className="flex items-center space-x-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {isEditing ? (
          <Button
            onClick={handleSave}
            variant="ghost"
            size="icon"
            aria-label="Save task"
          >
            <SaveIcon className="w-5 h-5 text-green-500" />
          </Button>
        ) : (
          <>
            <Button
              onClick={() => setIsEditing(true)}
              variant="ghost"
              size="icon"
              aria-label="Edit task"
            >
              <EditIcon className="w-5 h-5" />
            </Button>
            <Button
              onClick={() => onDelete(todo.id)}
              variant="ghost"
              size="icon"
              aria-label="Delete task"
            >
              <DeleteIcon className="w-5 h-5 text-destructive" />
            </Button>
          </>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
