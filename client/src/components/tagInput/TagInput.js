import React from "react";
import "./tagInput.scss";

const TagInput = (props) => {
  const [tags, setTags] = React.useState([]);
  const removeTags = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };
  const addTags = (e) => {
    if (e.target.value !== "") {
      let newTags = [...tags, e.target.value];
      setTags(newTags);

      e.target.value = "";

      props.updateTags(props.category, newTags);
      console.log("check tags", newTags);
    }
  };
  // if (props.existingTags) {
  //   let existingTags = tags;
  //   for (let i = 0; i < props.existingTags.length; i++) {
  //     existingTags.push(props.existingTags[i]);
  //   }
  //   setTags(existingTags);
  // }
  return (
    <div className="tag-input">
      <ul id="tags">
        {tags.map((tag, index) => (
          <li key={index} className="tag">
            <span className="tag-title">{tag}</span>
            <i className="tag-close-icon" onClick={() => removeTags(index)}>
              x
            </i>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder={props.categoryHolder}
        className="bob2"
        onKeyUp={(e) => (e.key === "Enter" ? addTags(e) : null)}
      />
    </div>
  );
};

//add allergies dynamic - add medication - add add
export default TagInput;
