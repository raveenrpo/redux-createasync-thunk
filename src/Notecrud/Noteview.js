import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletedata, getdata } from "./Noteslice";
import { useNavigate } from "react-router-dom";
const Noteview = () => {
  const nav = useNavigate();
  const notedata = useSelector((state) => state.note.notes);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getdata());
  }, []);
  console.log(notedata);
  const clk = () => {
    nav("/two");
  };
  const edit = (id) => {
    nav(`/two/${id}`);
  };
  const del = (id) => {
    dispatch(deletedata(id));
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button onClick={clk}>ADD</button>
      {notedata.map((v, i) => (
        <div class="card text-center" style={{ width: "50%" }}>
          <div class="card-header">{v.title}</div>
          <div class="card-body" style={{ background: v.color }}>
            <h5 class="card-title">{v.state}</h5>
            <p class="card-text">{v.text}</p>
            <button class="btn btn-primary " onClick={() => del(v.id)}>
              Delete
            </button>
            <button class="btn btn-primary" onClick={() => edit(v.id)}>
              Edit
            </button>
          </div>
          <div class="card-footer text-body-secondary">!</div>
        </div>
      ))}
    </div>
  );
};

export default Noteview;
