import React from "react";
import ReactDOM from "react-dom";
import TagsInput from "./TagsInput";

function InputFieldWithChip() {
  function handleSelecetedTags(items) {
    console.log(items);
  }
  return (
    <div className="App">
      <TagsInput
        selectedTags={handleSelecetedTags}
        fullWidth
        variant="outlined"
        id="tags"
        name="tags"
        placeholder="add Tags"
        label="tags"
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<InputFieldWithChip />, rootElement);
