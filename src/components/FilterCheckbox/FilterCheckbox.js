import "./FilterCheckbox.css";

function FilterCheckbox() {
  return (
    <div className="checkbox">
      <input type="checkbox" id="toggle-checkbox" className="checkbox__toggle" />
      <label htmlFor="toggle-checkbox" className="checkbox__label">
        Короткометражки
      </label>
    </div>
  );
}

export default FilterCheckbox;
