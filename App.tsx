
import React, { useState, useEffect } from 'react';
import { Todo } from './types';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import { Button } from './components/ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/Card';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const savedTodos = localStorage.getItem('todos');
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (error) {
      console.error("Could not parse todos from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: number, newText: string) => {
    setTodos(
      todos.map(todo => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <div className="min-h-screen font-sans flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight text-center">
            Todo List
          </CardTitle>
          <CardDescription className="text-center">
             Stay organized, one task at a time.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TodoInput onAddTodo={addTodo} />
          <TodoList
            todos={todos}
            onToggleTodo={toggleTodo}
            onDeleteTodo={deleteTodo}
            onEditTodo={editTodo}
          />
        </CardContent>
        {todos.some(todo => todo.completed) && (
             <CardFooter className="flex justify-end">
                <Button
                    onClick={clearCompleted}
                    variant="link"
                    className="text-muted-foreground"
                >
                    Clear Completed
                </Button>
             </CardFooter>
          )}
      </Card>
      <footer className="text-center mt-8 text-sm text-muted-foreground">
        <p>Built with React & Tailwind CSS.</p>
      </footer>
    </div>
  );
};

export default App;
