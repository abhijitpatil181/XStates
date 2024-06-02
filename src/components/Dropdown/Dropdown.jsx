const Dropdown = ({
  placeholder,
  type,
  options,
  onChangeHandler,
  disabled,
  width,
}) => {
  console.log("optiions", options);
  return (
    <>
      <select
        name={type}
        id={type}
        style={{ height: "2rem", width: width, margin: "0 2rem" }}
        disabled={disabled}
        onChange={(e) => onChangeHandler(e)}
      >
        <option value="">{placeholder}</option>
        {options &&
          options.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
      </select>
    </>
  );
};

export default Dropdown;
