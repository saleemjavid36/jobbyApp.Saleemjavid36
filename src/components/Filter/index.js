import './index.css'

const Filter = props => {
  const renderEmploymentFilter = () => {
    const {employment, etypeValue} = props
    return employment.map(eachEmployment => {
      const {setCheckBoxId} = props
      const onCheckBox = () => setCheckBoxId(eachEmployment.employmentTypeId)

      return (
        <li className="check-box-li" key={eachEmployment.employmentTypeId}>
          <input
            type="checkbox"
            id={eachEmployment.employmentTypeId}
            onClick={onCheckBox}
            value={etypeValue}
          />
          <label htmlFor={eachEmployment.employmentTypeId} className="label">
            {eachEmployment.label}
          </label>
        </li>
      )
    })
  }

  const renderTypeOfEmployeeFilter = () => (
    <>
      <h1 className="filter-heading">Types of Employment</h1>
      <ul className="ul-list">{renderEmploymentFilter()}</ul>
    </>
  )
  const renderSalaryRange = () => {
    const {salaryRangesDetails, salaryValue} = props

    return salaryRangesDetails.map(eachSalaryRange => {
      const {setActiveSalaryId} = props
      const onRadioPoint = () =>
        setActiveSalaryId(eachSalaryRange.salaryRangeId)
      return (
        <li className="radio-point-li">
          <input
            type="radio"
            id={eachSalaryRange.salaryRangeId}
            onClick={onRadioPoint}
            value={salaryValue}
          />
          <label className="label" htmlFor={eachSalaryRange.salaryRangeId}>
            {eachSalaryRange.label}
          </label>
        </li>
      )
    })
  }
  const renderSalarRangeFilter = () => (
    <>
      <h1 className="filter-heading">Salary Range</h1>
      <ul className="ul-list">{renderSalaryRange()}</ul>
    </>
  )
  return (
    <>
      <div className="filters-container">{renderTypeOfEmployeeFilter()}</div>
      <hr className="line" />
      <div className="filters-container">{renderSalarRangeFilter()}</div>
    </>
  )
}
export default Filter
