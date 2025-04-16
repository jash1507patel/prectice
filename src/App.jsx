import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  useDeleteUserMutation,
  useLazyGetUserQuery,
} from "./services/UserData";
import AddData from "./AddData";

function App() {
  const notify = () => toast("Wow so easy!");
  const [editId, setEditId] = useState(null);
  const [getData, { data, isLoading, isError }] = useLazyGetUserQuery();
  const [deleteData] = useDeleteUserMutation();

  function handleUpdate(id) {
    setEditId(id);
  }

  async function handleDelete(id) {
    try {
      const message = confirm("Are you sure to delete data ? ");
      if (message === true) {
        await deleteData({
          endpoint: `user/${id}`,
          tags: ["user"],
        });
      }
    } catch (err) {
      console.log(err);
    }
    
  }
  const handleGetData = async () => {
    try {
//
      // get Data
      await getData({
        endpoint: "user",
        tags: ["user"],
      });
    } catch (err) {
      console.log("Errot", err);
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <>
          <AddData editId={editId} data={data} setEditId={setEditId} />
          <ul>
            <>
              <h1>User Information</h1>
              {data?.length ? (
                data?.map((data, index) => (
                  <li key={index}>
                    {data.name} - {data.age}&nbsp;&nbsp;
                    <button onClick={() => handleUpdate(data.id)}>
                      update
                    </button>
                    &nbsp; &nbsp;
                    <button onClick={() => handleDelete(data.id)}>
                      delete
                    </button>
                  </li>
                ))
              ) : (
                <p>Data not found.</p>
              )}
            </>
          </ul>
        </>
      )}
      <ToastContainer />
    </div>
  );
}

export default App;




// 