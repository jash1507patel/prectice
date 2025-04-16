import React, { useEffect } from "react";
import { useState } from "react";
import { useAddUserMutation, useUpdateUserMutation } from "./services/UserData";

function AddData({ editId, data , setEditId }) {
  const [addUser] = useAddUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [adduser, setAddUser] = useState({
    name: "",
    age: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (isEditing) {
      // updateUser({ name: adduser.name, age: adduser.age, id: editId });
      await updateUser({
        endpoint : `user/${editId}`,
        payloads : { name: adduser.name, age: adduser.age, id: editId },
        tags : ["user"]
      })
      setEditId(null)
      setIsEditing(false)
    } else {
      // addUser({ name: adduser.name, age: adduser.age });
      await addUser({
        endpoint : "user",
        payloads : { name: adduser.name, age: adduser.age },
        tags : ["user"],
      })
    }
    setAddUser({
      name: "",
      age: "",
    });
  }

  useEffect(() => {
    if (editId) {
      setIsEditing(true);
      let dataForEdit = data.find((user) => editId === user.id);
      setAddUser({
        id: editId,
        name: dataForEdit.name,
        age: dataForEdit.age,
      });
    }
  }, [editId]);

  // addUser({
  //   enpoint:"",
  //   query:{
  //     user_id:1,
  //     person_id:1
  //   },
  //  payload:payload
  //   tags:[]
  // toastify:false
  // })
  return (
    <div>
      <h1>Add User </h1>
      <form onSubmit={handleSubmit}>
        <label>Name :</label>&nbsp;
        <input
          type="text"
          name="name"
          value={adduser.name}
          onChange={(e) => setAddUser({ ...adduser, name: e.target.value })}
          required
        />
        <br />
        <br />
        <label>Age :</label>&nbsp;
        <input
          type="number"
          name="age"
          value={adduser.age}
          onChange={(e) => setAddUser({ ...adduser, age: e.target.value })}
          required
        />
        <br />
        <br />
        {/* <button type="submit">Submit</button> */}
        <button type="submit">{isEditing ? "update" : "Submit"}</button>
      </form>
    </div>
  );
}

export default AddData;
