import React from "react";
import "./tagInputPurple.scss";

const TagInputPurple = (props) => {
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

  return (
    <div className="tag-inputPurple">
      <ul id="tags">
        {tags.map((tag, index) => (
          <li key={index} className="tagPurple">
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
        className="bob3"
        onKeyUp={(e) => (e.key === "Enter" ? addTags(e) : null)}
      />
    </div>
  );
};

export default TagInputPurple;
