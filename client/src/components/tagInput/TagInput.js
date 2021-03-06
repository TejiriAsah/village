import React from "react";
import "./tagInput.scss";

const TagInput = (props) => {
  const [tags, setTags] = React.useState([]);
  const removeTags = (indexToRemove) => {
    const updatedTags = tags.filter((tag, index) => {
      return index !== indexToRemove;
    });

    setTags(updatedTags);
    props.updateTags(props.category, updatedTags);
  };
  const addTags = (e) => {
    if (e.target.value !== "") {
      let newTags = [...tags, e.target.value];
      setTags(newTags);

      e.target.value = "";

      props.updateTags(props.category, newTags);
    }
  };

  React.useEffect(() => {
    if (props.existingTags) {
      setTags(props.existingTags);
    }
  }, [props.existingTags]);

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

export default TagInput;
