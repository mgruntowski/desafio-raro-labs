import React, { useState } from "react";
import ReactDOM from "react-dom";
import TagsInput from "./TagsInput";
import TagsOutput from './TagsOutput'

function InputFieldWithChip() {
  const [tags, setTags] = useState([])

  function handleSelectedTags(items) {
    console.log(items)
    setTags([...items])
  }

  return (
    <div className="App">
      <TagsInput
        selectedTags={handleSelectedTags}
        fullWidth
        variant="outlined"
        id="tags"
        name="tags"
        placeholder="add Tags"
        label="tags"
      />
      <TagsOutput tags={tags}/>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<InputFieldWithChip />, rootElement);
