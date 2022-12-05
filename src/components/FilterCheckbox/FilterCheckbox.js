import "./FilterCheckbox.css";

function FilterCheckbox({handleToggle }) {


  return (
    <div className="checkbox">
      <input type="checkbox" id="checkbox" className="checkbox__toggle" onChange={handleToggle} defaultChecked={localStorage.getItem('checked') === 'true'}/>
      <label htmlFor="checkbox" className="checkbox__label">
        Короткометражки
      </label>
    </div>
  );
}

export default FilterCheckbox;
