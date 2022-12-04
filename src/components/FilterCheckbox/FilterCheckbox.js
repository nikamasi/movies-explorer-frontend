import "./FilterCheckbox.css";

function FilterCheckbox({handleToggle }) {
  function toggle(e) {
    localStorage.setItem('toggleState', e.target.checked)
    handleToggle(e)
  }

  return (
    <div className="checkbox">
      <input type="checkbox" id="toggle-checkbox" className="checkbox__toggle" onChange={toggle} defaultChecked={localStorage.getItem('toggleState') === 'true'}/>
      <label htmlFor="toggle-checkbox" className="checkbox__label">
        Короткометражки
      </label>
    </div>
  );
}

export default FilterCheckbox;
