import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletedata, editdata, setdata } from "./Noteslice";
import { useNavigate, useParams } from "react-router-dom";
const Noteadd = () => {
  const { id } = useParams();
  console.log(id);
  const notes = useSelector((state) => state.note.notes);
  console.log(notes);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [editedcontent, setedite] = useState([]);
  const [formdata, setforemdata] = useState({
    title: "",
    text: "",
    color: "",
    state: "",
  });
  useEffect(() => {
    if (id) {
      const content = notes.find((v) => v.id === id);
      setedite(content);
      setforemdata({
        title: `${content.title}` || "",
        text: `${content.text}` || "",
        color: `${content.color}` || "",
        state: `${content.state}` || "",
      });
      console.log(content);
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setforemdata((pre) => ({ ...pre, [name]: value }));
  };
  console.log(formdata);

  const handleSubmit = (e) => {
    console.log(formdata);
    e.preventDefault();
    if (id) {
      dispatch(editdata({ ...formdata, id }));
    } else {
      dispatch(setdata(formdata));
    }
    setforemdata({ title: "", text: "", color: "", state: "" });

    nav("/");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          name="title"
          value={formdata.title}
        />
        <input
          type="text"
          onChange={handleChange}
          name="text"
          value={formdata.text}
        />
        <input
          type="text"
          onChange={handleChange}
          name="color"
          value={formdata.color}
        />
        <input
          type="text"
          onChange={handleChange}
          name="state"
          value={formdata.state}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Noteadd;
