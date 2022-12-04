import "./FilterCheckbox.css";

function FilterCheckbox({handleToggle }) {
  function toggle(e) {
    handleToggle(e)
  }

  return (
    <div className="checkbox">
      <input type="checkbox" id="checkbox" className="checkbox__toggle" onChange={toggle} defaultChecked={localStorage.getItem('toggleState') === 'true'}/>
      <label htmlFor="checkbox" className="checkbox__label">
        Короткометражки
      </label>
    </div>
  );
}

export default FilterCheckbox;
