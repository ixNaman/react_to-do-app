import { useState } from 'react';
import { Button, Card, Input, Popconfirm } from 'antd';
import axios from 'axios';
import "./card.css";

const Cards = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.title);
  const [editedNotes, setEditedNotes] = useState(props.para);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      // Make a PUT request to the API endpoint with the updated data
      await axios.put(`https://apis-production-145a.up.railway.app/api/todo/${props.id}`, {
        title: editedTitle,
        para: editedNotes,
      }, {
        headers: {
          Authorization: 'baf0b04b-f443-447c-8706-c379963fddc5',
        },
      });
  
      // Update the local state if the request is successful
      setIsEditing(false);
      props.onSuccess(); // Assuming you have a callback to handle any UI updates after saving
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };
  

  const handleCancelClick = () => {
    setIsEditing(false);
    // Reset edited title and notes to the original values
    setEditedTitle(props.title);
    setEditedNotes(props.para);
  };

  const handleDeleteClick = async () => {
    try {
      document.getElementById("dlt-btn").style.color = "red";
      console.log('Deleting todo...');
      await axios.delete(`https://apis-production-145a.up.railway.app/api/todo/${props.id}`, {
        headers: {
          Authorization: 'baf0b04b-f443-447c-8706-c379963fddc5',
        },
      });
      console.log('Todo deleted successfully.');
      props.onSuccess();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };
  

  return (
    <div className="cards">
      <Card
        hoverable
        title={
          isEditing ? (
            <Input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          ) : (
            props.title
          )
        }
        extra={
          isEditing ? (
            <>
              <a onClick={handleSaveClick}>
                Save
              </a>{' '}
              |{' '}
              <a onClick={handleCancelClick}>
                Cancel
              </a>
            </>
          ) : (
            <>
              <Button type='primary' ghost size='small'   onClick={handleEditClick}>
                Edit
              </Button>{' '}
              |{' '}
              <Popconfirm
                title="Are you sure you want to delete?"
                onConfirm={handleDeleteClick}
                okText="Yes"
                cancelText="No"
              >
                <Button  size='small' danger >Delete</Button>
              </Popconfirm>
            </>
          )
        }
        style={{ width: 280, margin: 5 }}
      >
        {isEditing ? (
          <Input.TextArea
            value={editedNotes}
            onChange={(e) => setEditedNotes(e.target.value)}
          />
        ) : (
          <p className='para'>{props.para}</p>
        )}
      </Card>
      
    </div>
  );
};

export default Cards;