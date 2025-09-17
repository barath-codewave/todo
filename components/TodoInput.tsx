
import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

interface TodoInputProps {
  onAddTodo: (text: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedText = text.trim();
    if (trimmedText) {
      onAddTodo(trimmedText);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 items-center mb-6">
      <Input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add a new task..."
        className="flex-grow"
      />
      <Button
        type="submit"
        disabled={!text.trim()}
      >
        Add Task
      </Button>
    </form>
  );
};

export default TodoInput;
