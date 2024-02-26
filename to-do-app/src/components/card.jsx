import { useState } from "react";
import { Button, Card, Input, Popconfirm, message } from "antd";
import axios from "axios";
import "./card.css";

const Cards = ({ id, title, para, onSuccess }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedNotes, setEditedNotes] = useState(para);
  const Delete = import.meta.env.VITE_DELETE;
  const Put = import.meta.env.VITE_PUT;
  const Header = import.meta.env.VITE_HEADER;

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      // Make a PUT request to the API endpoint with the updated data
      await axios.put(
        `${Put}${id}`,
        {
          title: editedTitle,
          para: editedNotes,
        },
        {
          headers: {
            Authorization: Header,
          },
        }
      );

      setIsEditing(false);
      onSuccess();
    } catch (error) {
      message.error("Error updating todo:", error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);

    setEditedTitle(title);
    setEditedNotes(para);
  };

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`${Delete}${id}`, {
        headers: {
          Authorization: Header,
        },
      });
      message.success("Error deleteing todo");

      onSuccess();
    } catch (error) {
      message.error("Error deleting todo:", error);
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
            title
          )
        }
        extra={
          isEditing ? (
            <>
              <a onClick={handleSaveClick}>Save</a> |{" "}
              <a onClick={handleCancelClick}>Cancel</a>
            </>
          ) : (
            <>
              <Button
                type="primary"
                ghost
                size="small"
                onClick={handleEditClick}
              >
                Edit
              </Button>{" "}
              |{" "}
              <Popconfirm
                title="Are you sure you want to delete?"
                onConfirm={handleDeleteClick}
                okText="Yes"
                cancelText="No"
              >
                <Button size="small" danger>
                  Delete
                </Button>
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
          <p className="para">{para}</p>
        )}
      </Card>
    </div>
  );
};

export default Cards;
