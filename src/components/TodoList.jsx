import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import '../assets/css/todo.css'

export const TodoList = () => {
    const [inputText, setInputText] = useState("");
    const [todos, setTodos] = useState([]);
    const [idCounter, setIdCounter] = useState(0); // Unique ID counter
 
    const [showViewModal, setShowViewModal] = useState(false); // View modal state
    const [selectedTodo, setSelectedTodo] = useState(null); // Selected todo for viewing

   

    const handleViewModalClose = () => setShowViewModal(false);
    const handleViewModalShow = (todo) => {
        setSelectedTodo(todo);
        setShowViewModal(true);
    };

    const addTodo = () => {
        if (inputText.trim()) {
            const newTodo = { id: idCounter, text: inputText };
            setTodos([...todos, newTodo]);
            setInputText("");
            setIdCounter(idCounter + 1); // Increment the counter
        }
    };

    const deleteTodo = (id) => {
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
    };

    return (
        <div style={{ margin: '20px' }}>
            <h1 style={{ color: "green", textAlign: 'center', marginBottom: '20px' }}>Todo List</h1>
            <div className='text-field text-center'>
                <input type='text' placeholder='What needs to be Done??' onChange={(event)=>{setInputText(event.target.value)}}/>
                <button type='Submit' className='but btn btn-primary' onClick={()=>(addTodo())}>ADD</button>
            </div>
            <br/>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <table style={{
                    width: '80%',
                    borderCollapse: 'collapse'
                }}>
                    <thead>
                        <tr style={{ backgroundColor: 'gray', color: 'white' }}>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Added Activity</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map((todo) => (
                            <tr key={todo.id}>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{todo.text}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                    <button
                                        type='button'
                                        onClick={() => deleteTodo(todo.id)}
                                        style={{
                                            padding: '5px 10px',
                                            backgroundColor: 'red',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            margin:"10px"
                                        }}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className='btn btn-info'
                                        onClick={() => handleViewModalShow(todo)}
                                        style={{ marginRight: '10px' }}
                                    >
                                        View
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal show={showViewModal} onHide={handleViewModalClose}>
                <Modal.Header>
                    <Modal.Title>View Todo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedTodo ? (
                        <div>
                            <h5>Todo Details</h5>
                            <br/>
                            <p>{selectedTodo.text}</p>
                        </div>
                    ) : (
                        <p>No details to display</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleViewModalClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};