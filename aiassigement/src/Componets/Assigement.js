import React, { useState } from 'react';

const Tag = ({ tag, AddChild, DataChange, NameChange }) => {
  const [closebtn, setclosebtn] = useState(false);
  const [Edit, setEdit] = useState(false);
  const [newName, setNewName] = useState(tag.name);
  console.log("newName" , newName)  
  console.log("tag11" , tag)
   // here the main name root , child1, child1-child1 etc
  
  const handleClosed = () => {
    setclosebtn(!closebtn);
  };

  const handleDataChange = (e) => {
    DataChange(tag, e.target.value);
  };

  return (
    <div>
      <div>
        <button style={{color:"darkblue"}} onClick={handleClosed}>{closebtn ? '>' : 'v'}</button>
        {Edit ? (
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        ) : (
          <span onClick={() => setEdit(true)}>{tag.name}</span>
        )}
      </div>

      {!closebtn && (
        <div>
          {tag.data && (
            <input type="text" value={tag.data} onChange={handleDataChange} />
          )}
          {tag.children &&
            tag.children.map((child) => (
              <Tag
                key={child.name}
                tag={child}
                AddChild={AddChild}
                DataChange={DataChange}
                NameChange={NameChange}
              />
            ))}
        </div>
      )}
      <button style={{ marginLeft: "30%", color: "green" }} onClick={() => AddChild(tag)}>Add Child</button>
    </div>
  );
};

const Assignment = () => {

  const tree = {
    name: 'root',
    children: [
      {
        name: 'child1',
        children: [
          { name: 'child1-child1', data: 'c1-c1 Hello' },
          { name: 'child1-child2', data: 'c1-c2 JS' },
        ],
      },
      { name: 'child2', data: 'c2 World' },
    ],
  };

  const [data, setdata] = useState(tree);
  console.log("data", data)

  const handleAddChild = (currentParent) => {            // currentParent is name , children of the current
console.log("currentParent" , currentParent)
    const newChild = { name: 'New Child', data: 'Data' };

    if (!currentParent.children) {
      currentParent.children = [];
    }
    currentParent.children.push(newChild);
    setdata({ ...data });
  };

  const handleDataChange = (tag, newData) => {
    console.log("dsf" ,tag)
    tag.data = newData;
    setdata({ ...data });
  };

  const handleNameChange = (tag, newName) => {
   
    tag.name = newName;
    setdata({ ...data });
  };

  return (
    <div>
      <Tag
        tag={data}
        AddChild={handleAddChild}
        DataChange={handleDataChange}
        NameChange={handleNameChange}
      />
      <button style={{ color: 'blue' }} onClick={() => console.log(JSON.stringify(data))}>Export</button>
    </div>
  );
};

export default Assignment;
