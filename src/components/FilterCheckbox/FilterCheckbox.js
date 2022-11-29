import "./FilterCheckbox.css";

function FilterCheckbox() {
  return (
    <div className="checkbox">
      <label htmlFor="toggle-checkbox" className="checkbox__label">
        Короткометражки
      </label>
      <input type="checkbox" id="toggle-checkbox" className="checkbox__toggle" />
    </div>
  );
}

export default FilterCheckbox;
